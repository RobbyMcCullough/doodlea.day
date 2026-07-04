#!/usr/bin/env python3
"""Validate that a lesson process plan matches generated tutorial assets."""

from __future__ import annotations

import argparse
import json
import re
import sys
from html.parser import HTMLParser
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
PLANS = ROOT / "lesson-plans"
TUTORIALS = ROOT / "tutorials"
ASSETS = ROOT / "assets"
EXCEPTIONS = PLANS / "exceptions.json"


class StepParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.in_step = False
        self.in_h3 = False
        self.current_name: list[str] = []
        self.steps: list[dict[str, str]] = []
        self.images: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        values = dict(attrs)
        classes = set((values.get("class") or "").split())
        if tag == "li" and "step-card" in classes:
            self.in_step = True
            self.current_name = []
            self.steps.append({"name": "", "image": ""})
            return
        if self.in_step:
            if tag == "h3":
                self.in_h3 = True
            if tag == "img" and values.get("src"):
                src = normalize_src(values["src"] or "")
                self.steps[-1]["image"] = src
                self.images.append(src)
        elif tag == "img" and values.get("src"):
            src = normalize_src(values["src"] or "")
            self.images.append(src)

    def handle_data(self, data: str) -> None:
        if self.in_step and self.in_h3:
            self.current_name.append(data)

    def handle_endtag(self, tag: str) -> None:
        if not self.in_step:
            return
        if tag == "h3":
            self.in_h3 = False
        if tag == "li":
            self.steps[-1]["name"] = normalize_text("".join(self.current_name))
            self.in_step = False


def normalize_src(src: str) -> str:
    # Pages serve WebP derivatives, but process plans (and the reviewed
    # masters in assets/) stay JPG. Map a page .webp back to its .jpg master
    # so plan/page comparisons keep working.
    normalized = re.sub(r"^\.\./", "", src.strip())
    return re.sub(r"\.webp$", ".jpg", normalized)


def normalize_text(value: str) -> str:
    return re.sub(r"\s+", " ", value).strip()


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


def load_plan(slug: str) -> dict[str, Any]:
    path = PLANS / f"{slug}.json"
    if not path.exists():
        raise ValueError(f"{slug}: missing lesson plan {path.relative_to(ROOT)}")
    with path.open(encoding="utf-8") as file:
        try:
            plan = json.load(file)
        except json.JSONDecodeError as error:
            raise ValueError(f"{slug}: invalid JSON in {path}: {error}") from error
    if not isinstance(plan, dict):
        raise ValueError(f"{slug}: plan root must be a JSON object")
    return plan


def parse_page(slug: str) -> StepParser:
    page = TUTORIALS / f"{slug}.html"
    if not page.exists():
        raise ValueError(f"{slug}: missing generated tutorial page {page}")
    parser = StepParser()
    parser.feed(page.read_text(encoding="utf-8"))
    return parser


def require_text(plan: dict[str, Any], field: str, slug: str) -> str:
    value = plan.get(field)
    if not isinstance(value, str) or not value.strip():
        raise ValueError(f"{slug}: `{field}` must be a non-empty string")
    return value.strip()


def require_asset(path_value: str, slug: str, label: str) -> str:
    path = ROOT / path_value
    if not path.exists():
        raise ValueError(f"{slug}: missing {label} asset {path_value}")
    if not path.is_file():
        raise ValueError(f"{slug}: {label} asset is not a file: {path_value}")
    return path_value


def string_list(value: Any, slug: str, label: str) -> list[str]:
    if not isinstance(value, list) or not value:
        raise ValueError(f"{slug}: `{label}` must be a non-empty array")
    items: list[str] = []
    for index, item in enumerate(value, start=1):
        if not isinstance(item, str) or not item.strip():
            raise ValueError(
                f"{slug}: `{label}` item {index} must be a non-empty string"
            )
        items.append(item.strip())
    return items


def numeric_step(path: Path) -> int:
    match = re.search(r"-step-(\d+)\.jpe?g$", path.name)
    if not match:
        raise ValueError(f"Cannot read step number from {path}")
    return int(match.group(1))


def validate_plan(slug: str, strict_missing: bool) -> bool:
    try:
        plan = load_plan(slug)
    except ValueError as error:
        reason = legacy_exception(slug)
        if reason:
            print(f"SKIP {slug}: documented legacy exception - {reason}")
            return True
        print(f"FAIL {error}")
        return False

    failures: list[str] = []
    page = parse_page(slug)
    try:
        if plan.get("slug") != slug:
            failures.append(f"`slug` must be {slug!r}")

        finished = require_text(plan, "finished", slug)
        require_asset(finished, slug, "finished")
        if finished not in page.images:
            failures.append(
                f"finished asset {finished} is not used by the generated page"
            )

        require_text(plan, "process_strategy", slug)
        source = plan.get("source")
        if not isinstance(source, dict) or not source.get("type"):
            failures.append("`source.type` is required")

        frames = plan.get("frames")
        if not isinstance(frames, list) or not frames:
            failures.append("`frames` must be a non-empty array")
            frames = []

        final_step = plan.get("final_step")
        if not isinstance(final_step, dict):
            failures.append("`final_step` must be an object")
            final_step = {}

        final_elements = plan.get("final_elements")
        element_names: set[str] = set()
        element_first_steps: dict[str, int] = {}
        if not isinstance(final_elements, list) or len(final_elements) < 3:
            failures.append(
                "`final_elements` must contain at least 3 major visible elements"
            )
            final_elements = []
        for element_index, element in enumerate(final_elements, start=1):
            if not isinstance(element, dict):
                failures.append(f"final element {element_index} must be an object")
                continue
            try:
                name = require_text(element, "name", slug)
                description = require_text(element, "description", slug)
            except ValueError as error:
                failures.append(str(error))
                continue
            if len(description.split()) < 5:
                failures.append(f"final element {name!r} description is too vague")
            if name in element_names:
                failures.append(f"duplicate final element name {name!r}")
            element_names.add(name)
            step = element.get("introduced_by_step")
            if not isinstance(step, int) or step < 1:
                failures.append(
                    f"final element {name!r} must have a positive integer `introduced_by_step`"
                )
            elif frames and step > len(frames):
                failures.append(
                    f"final element {name!r} is introduced by step {step}, "
                    f"but only {len(frames)} non-final frames exist"
                )
            else:
                element_first_steps[name] = step

        expected_step_count = len(frames) + 1
        if len(page.steps) != expected_step_count:
            failures.append(
                f"generated page has {len(page.steps)} steps, "
                f"plan expects {expected_step_count}"
            )

        planned_assets: list[str] = []
        introduced_by_frame: dict[int, list[str]] = {}

        for index, frame in enumerate(frames, start=1):
            if not isinstance(frame, dict):
                failures.append(f"frame {index} must be an object")
                continue
            if frame.get("step") != index:
                failures.append(f"frame {index} has incorrect `step` value")
            asset = require_text(frame, "asset", slug)
            require_asset(asset, slug, f"frame {index}")
            planned_assets.append(asset)
            expected_asset = f"assets/{slug}-step-{index}.jpg"
            if asset != expected_asset:
                failures.append(
                    f"frame {index} asset should be {expected_asset}, got {asset}"
                )
            step_name = require_text(frame, "step_name", slug)
            visible_job = require_text(frame, "visible_job", slug)
            if len(visible_job.split()) < 8:
                failures.append(f"frame {index} visible_job is too vague")
            try:
                introduces = string_list(
                    frame.get("introduces"), slug, f"frames[{index}].introduces"
                )
            except ValueError as error:
                failures.append(str(error))
                introduces = []
            introduced_by_frame[index] = introduces
            for name in introduces:
                if element_names and name not in element_names:
                    failures.append(
                        f"frame {index} introduces {name!r}, "
                        "`final_elements` does not list that element"
                    )
            if "requires_prior_elements" in frame:
                try:
                    required_prior = string_list(
                        frame.get("requires_prior_elements"),
                        slug,
                        f"frames[{index}].requires_prior_elements",
                    )
                except ValueError as error:
                    failures.append(str(error))
                    required_prior = []
                for name in required_prior:
                    if element_names and name not in element_names:
                        failures.append(
                            f"frame {index} requires prior element {name!r}, "
                            "`final_elements` does not list that element"
                        )
                        continue
                    first_step = element_first_steps.get(name)
                    if first_step is None:
                        continue
                    if first_step >= index:
                        failures.append(
                            f"frame {index} requires {name!r} to appear before this "
                            f"frame, but it is first introduced at step {first_step}"
                        )
            if index <= len(page.steps):
                page_step = page.steps[index - 1]
                if page_step["name"] != step_name:
                    failures.append(
                        f"frame {index} name mismatch: plan {step_name!r}, "
                        f"page {page_step['name']!r}"
                    )
                if page_step["image"] != asset:
                    failures.append(
                        f"frame {index} image mismatch: plan {asset}, "
                        f"page {page_step['image']}"
                    )

        actual_assets = [
            f"assets/{path.name}"
            for path in sorted(ASSETS.glob(f"{slug}-step-*.jpg"), key=numeric_step)
        ]
        if actual_assets != planned_assets:
            failures.append(
                "step asset files do not match planned frames: "
                f"actual {actual_assets}, planned {planned_assets}"
            )

        for name, expected_step in element_first_steps.items():
            actual_steps = [
                step for step, names in introduced_by_frame.items() if name in names
            ]
            if not actual_steps:
                failures.append(f"final element {name!r} is never introduced by a frame")
                continue
            first_step = min(actual_steps)
            if first_step != expected_step:
                failures.append(
                    f"final element {name!r} first appears in frame {first_step}, "
                    f"but plan says step {expected_step}"
                )

        final_name = require_text(final_step, "step_name", slug)
        final_asset = require_text(final_step, "asset", slug)
        require_asset(final_asset, slug, "final step")
        if final_asset != finished:
            failures.append("`final_step.asset` must match `finished`")
        final_job = require_text(final_step, "visible_job", slug)
        if len(final_job.split()) < 8:
            failures.append("final_step visible_job is too vague")
        if final_step.get("introduces"):
            failures.append(
                "`final_step` must not introduce major elements; "
                "list structural elements in non-final frames instead"
            )
        try:
            allowed_changes = string_list(
                final_step.get("allowed_changes"), slug, "final_step.allowed_changes"
            )
        except ValueError as error:
            failures.append(str(error))
            allowed_changes = []
        for index, change in enumerate(allowed_changes, start=1):
            if len(change.split()) < 2:
                failures.append(f"final_step allowed change {index} is too vague")
        if page.steps:
            page_final = page.steps[-1]
            if page_final["name"] != final_name:
                failures.append(
                    f"final step name mismatch: plan {final_name!r}, "
                    f"page {page_final['name']!r}"
                )
            if page_final["image"] != final_asset:
                failures.append(
                    f"final step image mismatch: plan {final_asset}, "
                    f"page {page_final['image']}"
                )

        rejection_checks = plan.get("rejection_checks")
        if not isinstance(rejection_checks, list) or len(rejection_checks) < 3:
            failures.append("`rejection_checks` must contain at least 3 items")
        elif any(
            not isinstance(item, str) or not item.strip()
            for item in rejection_checks
        ):
            failures.append("all rejection_checks must be non-empty strings")
    except ValueError as error:
        failures.append(str(error))

    if failures:
        print(f"FAIL {slug}: process plan does not match tutorial")
        for failure in failures:
            print(f"  - {failure}")
        return False

    print(f"OK {slug}: process plan matches generated tutorial and assets")
    return True


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Validate lesson-plans/{slug}.json against generated tutorial assets."
    )
    parser.add_argument("slugs", nargs="*", help="Tutorial slug(s) to check")
    parser.add_argument("--strict-missing", action="store_true")
    args = parser.parse_args()
    slugs = args.slugs or tutorial_slugs()
    ok = True
    for slug in slugs:
        ok = validate_plan(slug, args.strict_missing) and ok
    return 0 if ok else 1


if __name__ == "__main__":
    sys.exit(main())
