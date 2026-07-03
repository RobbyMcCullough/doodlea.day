#!/usr/bin/env python3
"""Fail when public asset images are not referenced by the site."""

from __future__ import annotations

import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
ASSET_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg", ".ico"}
TEXT_EXTENSIONS = {".html", ".mjs", ".js", ".css", ".json", ".md", ".xml", ".txt"}
SKIP_DIRS = {".git", "node_modules"}


def walk_files(start: Path) -> list[Path]:
    files: list[Path] = []
    for path in start.rglob("*"):
        if any(part in SKIP_DIRS for part in path.parts):
            continue
        if path.is_file():
            files.append(path)
    return files


def main() -> int:
    assets_dir = ROOT / "assets"
    assets = sorted(
        path
        for path in assets_dir.rglob("*")
        if path.is_file() and path.suffix.lower() in ASSET_EXTENSIONS
    )
    text_files = [
        path
        for path in walk_files(ROOT)
        if path.suffix.lower() in TEXT_EXTENSIONS and path.is_file()
    ]
    haystack = "\n".join(path.read_text(encoding="utf-8", errors="ignore") for path in text_files)

    unused = []
    for asset in assets:
        relative = asset.relative_to(ROOT).as_posix()
        if relative not in haystack and asset.name not in haystack:
            unused.append(relative)

    if unused:
        print("FAIL unused public asset images:")
        for item in unused:
            print(f"- {item}")
        print()
        print("Remove the asset or wire it into generated lesson/page data before publishing.")
        return 1

    print(f"OK checked {len(assets)} public asset image(s); no unused files found")
    return 0


if __name__ == "__main__":
    sys.exit(main())
