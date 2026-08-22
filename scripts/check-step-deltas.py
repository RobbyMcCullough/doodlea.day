#!/usr/bin/env python3
"""Check that tutorial step frames make visible cumulative progress.

This is a guardrail for Doodlea.day publishing QA. It catches exact or nearly
unchanged pixels, but it cannot tell whether a pale early contour is the same
finished contour retraced darker later. The schema-v3 plan and semantic visual
review remain mandatory.
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from dataclasses import dataclass
from html.parser import HTMLParser
from pathlib import Path

try:
    from PIL import Image, ImageChops, ImageDraw, ImageStat
except ModuleNotFoundError as error:  # pragma: no cover - environment message
    raise SystemExit(
        "Pillow is required for step-delta checks. Install it in the active "
        "Python environment, then rerun this script."
    ) from error


ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "assets"
TUTORIALS = ROOT / "tutorials"
EXCEPTIONS = ROOT / "lesson-plans" / "exceptions.json"


@dataclass
class Delta:
    label: str
    mean: float
    rms: float
    changed_pct: float
    changed_pct_strong: float


class ImageParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.images: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        if tag != "img":
            return
        values = dict(attrs)
        src = values.get("src")
        if src:
            self.images.append(src)


def tutorial_slugs() -> list[str]:
    return sorted(path.stem for path in TUTORIALS.glob("*.html"))


def legacy_exception(slug: str) -> str | None:
    if not EXCEPTIONS.exists():
        return None
    with EXCEPTIONS.open(encoding="utf-8") as file:
        try:
            data = json.load(file)
        except json.JSONDecodeError as error:
            raise ValueError(f"invalid JSON in {EXCEPTIONS.relative_to(ROOT)}: {error}") from error
    for item in data.get("legacy_without_steps", []):
        if isinstance(item, dict) and item.get("slug") == slug:
            reason = item.get("reason")
            return reason.strip() if isinstance(reason, str) and reason.strip() else "legacy exception"
    return None


def numeric_step(path: Path) -> int:
    match = re.search(r"-step-(\d+)\.jpe?g$", path.name)
    if not match:
        raise ValueError(f"Cannot read step number from {path}")
    return int(match.group(1))


def referenced_final(slug: str) -> Path | None:
    page = TUTORIALS / f"{slug}.html"
    if not page.exists():
        return None
    parser = ImageParser()
    parser.feed(page.read_text(encoding="utf-8"))
    for src in parser.images:
        if f"{slug}-finished-" in src:
            return (page.parent / src).resolve()
    return None


def lesson_images(slug: str) -> tuple[list[Path], Path | None]:
    steps = sorted(ASSETS.glob(f"{slug}-step-*.jpg"), key=numeric_step)
    return steps, referenced_final(slug)


def delta_between(first: Path, second: Path, sample_size: int) -> Delta:
    a = Image.open(first).convert("L").resize(
        (sample_size, sample_size), Image.Resampling.LANCZOS
    )
    b = Image.open(second).convert("L").resize(
        (sample_size, sample_size), Image.Resampling.LANCZOS
    )
    diff = ImageChops.difference(a, b)
    stat = ImageStat.Stat(diff)
    histogram = diff.histogram()
    total = sum(histogram)
    changed_pct = sum(histogram[10:]) / total * 100
    changed_pct_strong = sum(histogram[20:]) / total * 100
    return Delta(
        label=f"{first.name} -> {second.name}",
        mean=stat.mean[0],
        rms=stat.rms[0],
        changed_pct=changed_pct,
        changed_pct_strong=changed_pct_strong,
    )


def contact_sheet(slug: str, files: list[Path], output: Path) -> None:
    thumb = 270
    label_height = 34
    cell_width = 290
    cell_height = thumb + label_height + 16
    cols = 2
    rows = (len(files) + cols - 1) // cols
    sheet = Image.new("RGB", (cell_width * cols, cell_height * rows), (248, 242, 228))
    for index, path in enumerate(files):
        image = Image.open(path).convert("RGB").resize(
            (thumb, thumb), Image.Resampling.LANCZOS
        )
        card = Image.new("RGB", (cell_width, cell_height), (248, 242, 228))
        card.paste(image, (10, label_height))
        draw = ImageDraw.Draw(card)
        label = "Final" if index == len(files) - 1 else f"Step {index + 1}"
        draw.text((12, 8), label, fill=(40, 37, 32))
        x = index % cols * cell_width
        y = index // cols * cell_height
        sheet.paste(card, (x, y))
    output.parent.mkdir(parents=True, exist_ok=True)
    sheet.save(output, quality=92)
    print(f"{slug}: wrote contact sheet {output}")


def check_slug(slug: str, args: argparse.Namespace) -> bool:
    steps, final = lesson_images(slug)
    if not steps:
        message = f"{slug}: no step images found"
        reason = legacy_exception(slug)
        if reason:
            print(f"SKIP {message} - documented legacy exception: {reason}")
            return True
        print(f"FAIL {message}")
        return False
    if final is None or not final.exists():
        print(f"FAIL {slug}: referenced finished image is missing")
        return False

    files = [*steps, final]
    failed = False
    print(f"{slug}: checking {len(steps)} step frames plus final")
    for delta in (
        delta_between(first, second, args.sample_size)
        for first, second in zip(files, files[1:])
    ):
        ok = (
            delta.changed_pct >= args.min_changed_pct
            and delta.rms >= args.min_rms
        )
        status = "OK" if ok else "FAIL"
        print(
            f"  {status} {delta.label}: "
            f"mean={delta.mean:.2f} rms={delta.rms:.2f} "
            f"changed>10={delta.changed_pct:.2f}% "
            f"changed>20={delta.changed_pct_strong:.2f}%"
        )
        failed = failed or not ok

    print(
        f"{slug}: pixel deltas do not prove tutorial progression; confirm Panel 1 "
        "is sparse construction and later frames add new geometry, not only darker tracing"
    )

    if args.contact_sheet:
        if len(args.slugs) != 1:
            print("FAIL --contact-sheet can only be used with one slug")
            return False
        contact_sheet(slug, files, Path(args.contact_sheet))

    return not failed


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Validate that tutorial step images visibly change."
    )
    parser.add_argument("slugs", nargs="*", help="Tutorial slug(s) to check")
    parser.add_argument("--strict-missing", action="store_true")
    parser.add_argument("--sample-size", type=int, default=160)
    parser.add_argument("--min-changed-pct", type=float, default=1.0)
    parser.add_argument("--min-rms", type=float, default=4.0)
    parser.add_argument(
        "--contact-sheet",
        help="Optional output path for a two-column contact sheet. Use with one slug.",
    )
    args = parser.parse_args()
    if not args.slugs:
        args.slugs = tutorial_slugs()
    ok = True
    for slug in args.slugs:
        ok = check_slug(slug, args) and ok
    return 0 if ok else 1


if __name__ == "__main__":
    sys.exit(main())
