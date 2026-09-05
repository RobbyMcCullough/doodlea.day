#!/usr/bin/env python3
"""Crop a reviewed process contact sheet into Sketcha.day lesson assets."""

from __future__ import annotations

import argparse
import sys
from pathlib import Path

try:
    from PIL import Image, ImageOps
except ModuleNotFoundError as error:  # pragma: no cover - environment message
    raise SystemExit(
        "Pillow is required for contact-sheet cropping. Install it in the "
        "active Python environment, then rerun this script."
    ) from error


ROOT = Path(__file__).resolve().parents[1]


def parse_size(value: str) -> tuple[int, int]:
    if "x" in value.lower():
        width, height = value.lower().split("x", 1)
    else:
        width = height = value
    try:
        parsed = (int(width), int(height))
    except ValueError as error:
        raise argparse.ArgumentTypeError(
            "size must be an integer or WIDTHxHEIGHT"
        ) from error
    if parsed[0] < 100 or parsed[1] < 100:
        raise argparse.ArgumentTypeError("size must be at least 100 pixels")
    return parsed


def panel_box(
    index: int,
    image_size: tuple[int, int],
    cols: int,
    rows: int,
    trim: int,
) -> tuple[int, int, int, int]:
    width, height = image_size
    cell_width = width / cols
    cell_height = height / rows
    col = index % cols
    row = index // cols
    left = round(col * cell_width) + trim
    top = round(row * cell_height) + trim
    right = round((col + 1) * cell_width) - trim
    bottom = round((row + 1) * cell_height) - trim
    if left >= right or top >= bottom:
        raise ValueError(
            f"trim {trim}px is too large for {cell_width:.1f}x{cell_height:.1f} cells"
        )
    return left, top, right, bottom


def output_path(args: argparse.Namespace, panel_number: int, step_number: int) -> Path:
    if panel_number == args.final_panel:
        return args.out_dir / f"{args.slug}-finished-v{args.finished_version}.jpg"
    return args.out_dir / f"{args.slug}-step-{step_number}.jpg"


def save_panel(
    source: Image.Image,
    box: tuple[int, int, int, int],
    destination: Path,
    output_size: tuple[int, int],
    quality: int,
) -> None:
    panel = source.crop(box).convert("RGB")
    if panel.size != output_size:
        # Fit without stretching: generated grids sometimes have rectangular cells.
        panel = ImageOps.pad(panel, output_size, method=Image.Resampling.LANCZOS,
                             color=(247, 241, 230))
    destination.parent.mkdir(parents=True, exist_ok=True)
    panel.save(destination, quality=quality, optimize=True)


def main() -> int:
    parser = argparse.ArgumentParser(
        description=(
            "Crop an approved process contact sheet into per-step JPG assets. "
            "Panels are read left-to-right, top-to-bottom."
        )
    )
    parser.add_argument("contact_sheet", type=Path, help="Reviewed contact sheet image")
    parser.add_argument("slug", help="Lesson slug, for example cozy-teacup")
    parser.add_argument("--cols", type=int, default=3, help="Grid columns")
    parser.add_argument("--rows", type=int, default=2, help="Grid rows")
    parser.add_argument(
        "--panels",
        type=int,
        help="Number of panels to export. Defaults to cols * rows.",
    )
    parser.add_argument(
        "--final-panel",
        type=int,
        help="1-based panel number to save as the finished image. Defaults to the last exported panel.",
    )
    parser.add_argument(
        "--finished-version",
        type=int,
        default=1,
        help="Version number for {slug}-finished-vN.jpg.",
    )
    parser.add_argument(
        "--trim",
        type=int,
        default=8,
        help="Pixels trimmed from each side of each panel to remove gutters.",
    )
    parser.add_argument(
        "--size",
        type=parse_size,
        default=(1254, 1254),
        help="Output size as one integer or WIDTHxHEIGHT. Default: 1254.",
    )
    parser.add_argument(
        "--quality",
        type=int,
        default=92,
        help="JPEG quality, 1-95. Default: 92.",
    )
    parser.add_argument(
        "--out-dir",
        type=Path,
        default=ROOT / "assets",
        help="Output directory. Default: assets/",
    )
    parser.add_argument(
        "--overwrite",
        action="store_true",
        help="Allow replacing existing output files.",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Print planned crops without writing files.",
    )
    args = parser.parse_args()

    if args.cols < 1 or args.rows < 1:
        parser.error("--cols and --rows must be positive")
    total_cells = args.cols * args.rows
    args.panels = args.panels or total_cells
    if args.panels < 2 or args.panels > total_cells:
        parser.error("--panels must be between 2 and cols * rows")
    args.final_panel = args.final_panel or args.panels
    if args.final_panel < 1 or args.final_panel > args.panels:
        parser.error("--final-panel must be within the exported panel range")
    if args.finished_version < 1:
        parser.error("--finished-version must be positive")
    if args.trim < 0:
        parser.error("--trim must be zero or positive")
    if not 1 <= args.quality <= 95:
        parser.error("--quality must be between 1 and 95")

    args.contact_sheet = args.contact_sheet.resolve()
    args.out_dir = args.out_dir if args.out_dir.is_absolute() else ROOT / args.out_dir
    if not args.contact_sheet.exists():
        parser.error(f"contact sheet does not exist: {args.contact_sheet}")

    planned: list[tuple[int, int, tuple[int, int, int, int], Path]] = []
    step_number = 1
    with Image.open(args.contact_sheet) as image:
        image = image.convert("RGB")
        for index in range(args.panels):
            panel_number = index + 1
            current_step = step_number
            destination = output_path(args, panel_number, current_step)
            planned.append(
                (
                    panel_number,
                    current_step,
                    panel_box(index, image.size, args.cols, args.rows, args.trim),
                    destination,
                )
            )
            if panel_number != args.final_panel:
                step_number += 1

        existing = [path for *_, path in planned if path.exists()]
        if existing and not args.overwrite:
            print("Refusing to overwrite existing files:", file=sys.stderr)
            for path in existing:
                print(f"  {path.relative_to(ROOT)}", file=sys.stderr)
            print("Pass --overwrite only after confirming the outputs are intentional.", file=sys.stderr)
            return 1

        for panel_number, current_step, box, destination in planned:
            label = "final" if panel_number == args.final_panel else f"step {current_step}"
            rel = destination.relative_to(ROOT) if destination.is_relative_to(ROOT) else destination
            print(f"panel {panel_number}: {label} -> {rel} crop={box}")
            if not args.dry_run:
                save_panel(image, box, destination, args.size, args.quality)

    exported_steps = args.panels - 1
    print(
        f"{args.slug}: exported {exported_steps} step image(s) plus "
        f"finished v{args.finished_version}"
    )
    if args.final_panel != args.panels:
        print(
            "Note: final panel was not last; verify the written step order "
            "matches the cropped assets."
        )
    return 0


if __name__ == "__main__":
    sys.exit(main())
