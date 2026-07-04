#!/usr/bin/env python3
"""Generate 1200x630 Open Graph social cards for published tutorials.

Each card places the square finished sketch on a 1200x630 canvas whose
background is sampled from the artwork's own paper tone, so link previews on
Slack, X, Facebook, and iMessage render a full landscape image instead of a
cropped square. Cards are written to assets/social/{slug}-og.jpg.

Idempotent: a card is regenerated only when missing or older than its source
finished image. Run after adding or replacing a finished image and before
building pages.

Usage:
  python3 scripts/make-social-cards.py            # all published tutorials
  python3 scripts/make-social-cards.py --slug X   # one lesson only
  python3 scripts/make-social-cards.py --check    # fail if any are stale
"""

from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path

try:
    from PIL import Image, ImageStat
except ImportError:  # pragma: no cover
    sys.exit("Pillow is required. Install it in the active Python environment.")

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "assets"
SOCIAL = ASSETS / "social"
TUTORIALS = ROOT / "tutorials"
CARD_SIZE = (1200, 630)
ART_HEIGHT = 630  # the square art fills the card height edge to edge
FINISHED = re.compile(r"^(?P<slug>.+)-finished-v(?P<version>\d+)\.jpe?g$")


def finished_image(slug: str) -> Path | None:
    # Prefer the master JPG declared in the built page's HowTo JSON-LD
    # (first image entry), which also covers legacy names like
    # curious-fox -> fox-finished-v2.jpg.
    page = TUTORIALS / f"{slug}.html"
    if page.exists():
        match = re.search(
            r'"image":\s*\[\s*"https://doodlea\.day/assets/([^"]+\.jpe?g)"',
            page.read_text(encoding="utf-8"),
        )
        if match:
            path = ASSETS / match.group(1)
            return path if path.exists() else None
    # Fallback for pre-build use: newest {slug}-finished-v{n}.jpg in assets/.
    candidates = []
    for path in ASSETS.glob(f"{slug}-finished-v*.jp*g"):
        match = FINISHED.match(path.name)
        if match and match.group("slug") == slug:
            candidates.append((int(match.group("version")), path))
    if not candidates:
        return None
    return max(candidates)[1]


def published_slugs() -> list[str]:
    return sorted(page.stem for page in TUTORIALS.glob("*.html"))


def paper_tone(image: Image.Image) -> tuple[int, int, int]:
    """Sample the artwork's outer border so the card background matches its paper."""
    edge = 12
    width, height = image.size
    strips = [
        image.crop((0, 0, width, edge)),
        image.crop((0, height - edge, width, height)),
        image.crop((0, 0, edge, height)),
        image.crop((width - edge, 0, width, height)),
    ]
    totals = [0.0, 0.0, 0.0]
    for strip in strips:
        mean = ImageStat.Stat(strip.convert("RGB")).mean
        for index in range(3):
            totals[index] += mean[index]
    return tuple(round(value / len(strips)) for value in totals)  # type: ignore[return-value]


def make_card(source: Path, out: Path) -> None:
    with Image.open(source) as image:
        art = image.convert("RGB")
        background = Image.new("RGB", CARD_SIZE, paper_tone(art))
        scale = ART_HEIGHT / max(art.size)
        resized = art.resize(
            (round(art.width * scale), round(art.height * scale)), Image.LANCZOS
        )
        background.paste(
            resized,
            ((CARD_SIZE[0] - resized.width) // 2, (CARD_SIZE[1] - resized.height) // 2),
        )
        out.parent.mkdir(parents=True, exist_ok=True)
        background.save(out, "JPEG", quality=88, optimize=True)


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--slug", help="Limit to one lesson slug")
    parser.add_argument(
        "--check",
        action="store_true",
        help="Fail (exit 1) if any card is missing or stale; generate nothing.",
    )
    args = parser.parse_args()

    slugs = [args.slug] if args.slug else published_slugs()
    ok = True
    stale: list[tuple[str, Path, Path]] = []
    for slug in slugs:
        source = finished_image(slug)
        if source is None:
            print(f"FAIL no finished image found in assets/ for slug {slug}")
            ok = False
            continue
        out = SOCIAL / f"{slug}-og.jpg"
        if not out.exists() or out.stat().st_mtime < source.stat().st_mtime:
            stale.append((slug, source, out))

    if args.check:
        for slug, _source, out in stale:
            print(f"STALE {out.relative_to(ROOT)}")
        if stale or not ok:
            print(f"FAIL {len(stale)} social card(s) missing or stale")
            return 1
        print(f"OK {len(slugs)} social card(s) up to date")
        return 0

    for slug, source, out in stale:
        make_card(source, out)
        print(f"WROTE {out.relative_to(ROOT)} (from {source.name})")
    if not stale:
        print(f"OK {len(slugs)} social card(s) already up to date")
    else:
        print(f"OK generated {len(stale)} social card(s)")
    return 0 if ok else 1


if __name__ == "__main__":
    sys.exit(main())
