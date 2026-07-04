#!/usr/bin/env python3
"""Generate WebP derivatives for lesson art in assets/.

The JPG files remain the reviewed masters; pages serve the smaller WebP
derivatives. Idempotent: a derivative is regenerated only when it is missing
or older than its JPG source. Run after adding or replacing lesson art and
before building pages.

Usage:
  python3 scripts/build-image-derivatives.py           # convert all lesson art
  python3 scripts/build-image-derivatives.py --slug X  # one lesson's art only
  python3 scripts/build-image-derivatives.py --check   # fail if any are stale
"""

from __future__ import annotations

import argparse
import re
import sys
from multiprocessing import Pool
from pathlib import Path

try:
    from PIL import Image
except ImportError:  # pragma: no cover
    sys.exit("Pillow is required. Install it in the active Python environment.")

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "assets"
LESSON_ART = re.compile(r"-(step-\d+|finished-v\d+)\.jpe?g$")
QUALITY = 82
METHOD = 6


def sources(slug: str | None) -> list[Path]:
    files = sorted(
        path for path in ASSETS.glob("*.jp*g") if LESSON_ART.search(path.name)
    )
    if slug:
        files = [path for path in files if path.name.startswith(f"{slug}-")]
    return files


def target(source: Path) -> Path:
    return source.with_suffix(".webp")


def is_stale(source: Path) -> bool:
    out = target(source)
    return not out.exists() or out.stat().st_mtime < source.stat().st_mtime


def convert(source: Path) -> tuple[str, int, int]:
    out = target(source)
    with Image.open(source) as image:
        image.save(out, "WEBP", quality=QUALITY, method=METHOD)
    return out.name, source.stat().st_size, out.stat().st_size


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--slug", help="Limit to one lesson slug")
    parser.add_argument(
        "--check",
        action="store_true",
        help="Fail (exit 1) if any derivative is missing or stale; convert nothing.",
    )
    args = parser.parse_args()

    files = sources(args.slug)
    if not files:
        print(f"OK no lesson art found{f' for slug {args.slug}' if args.slug else ''}")
        return 0

    stale = [path for path in files if is_stale(path)]
    if args.check:
        for path in stale:
            print(f"STALE {target(path).relative_to(ROOT)} (source {path.name})")
        if stale:
            print(f"FAIL {len(stale)} WebP derivative(s) missing or stale")
            return 1
        print(f"OK {len(files)} WebP derivative(s) up to date")
        return 0

    if not stale:
        print(f"OK {len(files)} WebP derivative(s) already up to date")
        return 0

    with Pool() as pool:
        results = pool.map(convert, stale)
    total_in = sum(src for _, src, _ in results)
    total_out = sum(out for _, _, out in results)
    for name, src, out in results:
        print(f"WROTE assets/{name} ({src // 1024}KB -> {out // 1024}KB)")
    print(
        f"OK converted {len(results)} image(s); "
        f"{total_in // 1024}KB JPG -> {total_out // 1024}KB WebP"
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
