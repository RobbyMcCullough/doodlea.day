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
LEDGER = ROOT / "drafts" / "LEDGER.json"

STAGE_ROLE_ORDER = {
    "construction": 1,
    "silhouette": 2,
    "major_parts": 3,
    "appendages": 4,
    "features": 5,
    "details": 6,
    "ink_and_color_map": 7,
}
FIRST_FRAME_FINISHING_WORDS = re.compile(
    r"\b(?:ink|color|fill|shade|shadow|highlight|texture|clean|trace|darken|"
    r"thicken|finish)(?:s|ed|ing)?\b",
    re.IGNORECASE,
)


class StepParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.in_step = False
        self.in_h3 = False
        self.in_instruction = False
        self.current_name: list[str] = []
        self.steps: list[dict[str, str]] = []
        self.images: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        values = dict(attrs)
        classes = set((values.get("class") or "").split())
        if tag == "li" and "step-card" in classes:
            self.in_step = True
            self.current_name = []
            self.steps.append({"name": "", "image": "", "instruction": ""})
            return
        if self.in_step:
            if tag == "p" and "artist-tip" not in classes:
                self.in_instruction = True
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
        if self.in_step and self.in_instruction:
            self.steps[-1]["instruction"] += data
        if self.in_step and self.in_h3:
            self.current_name.append(data)

    def handle_endtag(self, tag: str) -> None:
        if tag == "p":
            self.in_instruction = False
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


def string_array(value: Any, slug: str, label: str) -> list[str]:
    if not isinstance(value, list):
        raise ValueError(f"{slug}: `{label}` must be an array")
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
    legacy_slugs = json.loads((PLANS / "legacy-schema-slugs.json").read_text())["slugs"]
    if plan.get("schema_version", 1) < 5 and slug not in legacy_slugs:
        print(f"FAIL {slug}: new and migrated lessons require schema v5")
        return False
    if plan.get("schema_version", 1) >= 5:
        from process_review import validate
        failures = validate(plan, ROOT, page)
        print(f"{'FAIL' if failures else 'OK'} {slug}: schema v5 artifact review")
        for failure in failures:
            print(f"  - {failure}")
        return not failures
    try:
        if LEDGER.exists():
            ledger = json.loads(LEDGER.read_text(encoding="utf-8"))
            ledger_entry = ledger.get("entries", {}).get(slug, {})
            ledger_status = ledger_entry.get("status")
            if ledger_status in {"rejected-quality", "rejected-duplicate"}:
                failures.append(
                    f"draft ledger status is {ledger_status!r}; rejected art cannot "
                    "pass process-plan validation"
                )
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

        schema_version = plan.get("schema_version", 1)
        if not isinstance(schema_version, int) or schema_version < 1:
            failures.append("`schema_version` must be a positive integer")
            schema_version = 1

        first_frame_max_completion = 30
        minimum_completion_increase = 10
        if schema_version >= 3:
            progression = plan.get("progression_contract")
            if not isinstance(progression, dict):
                failures.append("schema v3 requires `progression_contract` as an object")
                progression = {}
            first_frame_max_completion = progression.get(
                "first_frame_max_structural_completion_percent", 0
            )
            if (
                not isinstance(first_frame_max_completion, int)
                or first_frame_max_completion < 15
                or first_frame_max_completion > 30
            ):
                failures.append(
                    "schema v3 first-frame structural completion must be an integer "
                    "from 15 through 30 percent"
                )
                first_frame_max_completion = 30
            minimum_completion_increase = progression.get(
                "minimum_completion_increase_percent", 0
            )
            if (
                not isinstance(minimum_completion_increase, int)
                or minimum_completion_increase < 8
                or minimum_completion_increase > 20
            ):
                failures.append(
                    "schema v3 minimum completion increase must be an integer "
                    "from 8 through 20 percent"
                )
                minimum_completion_increase = 10
            if progression.get("maximum_darkening_only_transitions") != 1:
                failures.append(
                    "schema v3 `maximum_darkening_only_transitions` must be 1"
                )
            try:
                blank_page_test = require_text(
                    progression, "blank_page_test", slug
                )
                if "two minute" not in blank_page_test.lower() and "two-minute" not in blank_page_test.lower():
                    failures.append(
                        "schema v3 blank-page test must require a two-minute sparse construction"
                    )
            except ValueError as error:
                failures.append(str(error))

        if schema_version >= 4:
            anchor_map = plan.get("anchor_map")
            if not isinstance(anchor_map, list) or not anchor_map:
                failures.append(
                    "schema v4 requires a non-empty `anchor_map` for spatial continuity"
                )
            else:
                for anchor_index, anchor in enumerate(anchor_map, start=1):
                    if not isinstance(anchor, dict):
                        failures.append(f"anchor map item {anchor_index} must be an object")
                        continue
                    for field in (
                        "early_mark",
                        "becomes",
                        "fixed_relationship",
                        "construction_note",
                    ):
                        try:
                            value = require_text(anchor, field, slug)
                            if len(value.split()) < 4:
                                failures.append(
                                    f"anchor map item {anchor_index} `{field}` is too vague"
                                )
                        except ValueError as error:
                            failures.append(str(error))

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
        element_established_steps: dict[str, int] = {}
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
            if schema_version >= 3:
                established_step = element.get("established_by_step")
                if not isinstance(established_step, int) or established_step < 1:
                    failures.append(
                        f"final element {name!r} must have a positive integer "
                        "`established_by_step`"
                    )
                elif frames and established_step > len(frames):
                    failures.append(
                        f"final element {name!r} is established by step "
                        f"{established_step}, but only {len(frames)} non-final frames exist"
                    )
                elif isinstance(step, int) and established_step < step:
                    failures.append(
                        f"final element {name!r} cannot be established before it is introduced"
                    )
                else:
                    element_established_steps[name] = established_step

        expected_step_count = len(frames) + 1
        if len(page.steps) != expected_step_count:
            failures.append(
                f"generated page has {len(page.steps)} steps, "
                f"plan expects {expected_step_count}"
            )

        planned_assets: list[str] = []
        introduced_by_frame: dict[int, list[str]] = {}
        established_by_frame: dict[int, list[str]] = {}
        previous_stage_rank = 0
        previous_completion = 0

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
            if schema_version >= 3:
                stage_role = require_text(frame, "stage_role", slug)
                stage_rank = STAGE_ROLE_ORDER.get(stage_role)
                if stage_rank is None:
                    failures.append(
                        f"frame {index} has unknown stage_role {stage_role!r}; "
                        f"expected one of {sorted(STAGE_ROLE_ORDER)}"
                    )
                    stage_rank = previous_stage_rank
                if index == 1 and stage_role != "construction":
                    failures.append("schema v3 frame 1 must use stage_role `construction`")
                if stage_rank <= previous_stage_rank:
                    failures.append(
                        f"frame {index} stage_role {stage_role!r} does not advance "
                        "the construction-to-color sequence"
                    )
                previous_stage_rank = stage_rank

                completion = frame.get("completion_target_percent")
                if not isinstance(completion, int) or completion < 1 or completion > 95:
                    failures.append(
                        f"frame {index} completion_target_percent must be an integer "
                        "from 1 through 95"
                    )
                    completion = previous_completion
                if index == 1 and completion > first_frame_max_completion:
                    failures.append(
                        f"frame 1 completion target {completion}% exceeds the "
                        f"{first_frame_max_completion}% construction maximum"
                    )
                if index > 1 and completion - previous_completion < minimum_completion_increase:
                    failures.append(
                        f"frame {index} advances only {completion - previous_completion} "
                        f"percentage points; schema v3 requires at least "
                        f"{minimum_completion_increase}"
                    )
                previous_completion = completion

                try:
                    adds = string_list(frame.get("adds"), slug, f"frames[{index}].adds")
                    must_not_show = string_list(
                        frame.get("must_not_show"),
                        slug,
                        f"frames[{index}].must_not_show",
                    )
                except ValueError as error:
                    failures.append(str(error))
                    adds = []
                    must_not_show = []
                if set(adds) & set(must_not_show):
                    failures.append(
                        f"frame {index} lists the same work under `adds` and `must_not_show`"
                    )
                if index == 1:
                    try:
                        construction_primitives = string_list(
                            frame.get("construction_primitives"),
                            slug,
                            "frames[1].construction_primitives",
                        )
                    except ValueError as error:
                        failures.append(str(error))
                        construction_primitives = []
                    if len(construction_primitives) < 2:
                        failures.append(
                            "schema v3 frame 1 needs at least two explicit construction primitives"
                        )
                    if len(must_not_show) < 4:
                        failures.append(
                            "schema v3 frame 1 must forbid at least four groups of future work"
                        )
                    if FIRST_FRAME_FINISHING_WORDS.search(visible_job):
                        failures.append(
                            "schema v3 frame 1 visible_job contains finishing work; "
                            "use only primitives, routes, axes, envelopes, and placement ticks"
                        )
            try:
                list_reader = string_array if schema_version >= 3 else string_list
                introduces = list_reader(
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
            if schema_version >= 3:
                try:
                    establishes = string_array(
                        frame.get("establishes"),
                        slug,
                        f"frames[{index}].establishes",
                    )
                except ValueError as error:
                    failures.append(str(error))
                    establishes = []
                established_by_frame[index] = establishes
                for name in establishes:
                    if element_names and name not in element_names:
                        failures.append(
                            f"frame {index} establishes {name!r}, "
                            "`final_elements` does not list that element"
                        )
                if index == 1 and establishes:
                    failures.append(
                        "schema v3 construction frame may guide elements but must not "
                        "establish finished contours or color regions"
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

        if schema_version >= 3 and frames:
            last_role = frames[-1].get("stage_role") if isinstance(frames[-1], dict) else None
            if last_role != "ink_and_color_map":
                failures.append(
                    "schema v3 last non-final frame must use stage_role "
                    "`ink_and_color_map` so every major color decision precedes the finish"
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

        if schema_version >= 3:
            for name, expected_step in element_established_steps.items():
                actual_steps = [
                    step for step, names in established_by_frame.items() if name in names
                ]
                if not actual_steps:
                    failures.append(
                        f"final element {name!r} is never established by a non-final frame"
                    )
                    continue
                first_step = min(actual_steps)
                if first_step != expected_step:
                    failures.append(
                        f"final element {name!r} is first established in frame "
                        f"{first_step}, but plan says step {expected_step}"
                    )

        if schema_version >= 2:
            overlap_reservations = plan.get("overlap_reservations")
            if not isinstance(overlap_reservations, list):
                failures.append("schema v2 requires `overlap_reservations` as an array")
                overlap_reservations = []
            for reservation_index, reservation in enumerate(
                overlap_reservations, start=1
            ):
                if not isinstance(reservation, dict):
                    failures.append(
                        f"overlap reservation {reservation_index} must be an object"
                    )
                    continue
                foreground = require_text(reservation, "foreground_element", slug)
                if foreground not in element_names:
                    failures.append(
                        f"overlap reservation {reservation_index} names unknown "
                        f"foreground element {foreground!r}"
                    )
                reserved_by_step = reservation.get("reserved_by_step")
                if (
                    not isinstance(reserved_by_step, int)
                    or reserved_by_step < 1
                    or (frames and reserved_by_step > len(frames))
                ):
                    failures.append(
                        f"overlap reservation {foreground!r} has invalid "
                        "`reserved_by_step`"
                    )
                elif (
                    foreground in element_first_steps
                    and reserved_by_step > element_first_steps[foreground]
                ):
                    failures.append(
                        f"overlap reservation {foreground!r} is declared after the "
                        "foreground element first appears"
                    )
                stop_rule = require_text(
                    reservation, "background_lines_stop_before", slug
                )
                if len(stop_rule.split()) < 4:
                    failures.append(
                        f"overlap reservation {foreground!r} stop rule is too vague"
                    )

            transition_audit = plan.get("transition_audit")
            if not isinstance(transition_audit, list):
                failures.append("schema v2 requires `transition_audit` as an array")
                transition_audit = []
            if len(transition_audit) != len(frames):
                failures.append(
                    "schema v2 `transition_audit` must contain one entry for every "
                    "adjacent transition, including the last frame to the finish"
                )
            for transition_index, transition in enumerate(
                transition_audit, start=1
            ):
                if not isinstance(transition, dict):
                    failures.append(
                        f"transition audit {transition_index} must be an object"
                    )
                    continue
                if transition.get("from_step") != transition_index:
                    failures.append(
                        f"transition audit {transition_index} has incorrect `from_step`"
                    )
                if transition.get("to_step") != transition_index + 1:
                    failures.append(
                        f"transition audit {transition_index} has incorrect `to_step`"
                    )
                try:
                    must_persist = string_list(
                        transition.get("must_persist"),
                        slug,
                        f"transition_audit[{transition_index}].must_persist",
                    )
                    new_occlusions = string_array(
                        transition.get("new_occlusions"),
                        slug,
                        f"transition_audit[{transition_index}].new_occlusions",
                    )
                    keeper_lines_removed = string_array(
                        transition.get("keeper_lines_removed"),
                        slug,
                        f"transition_audit[{transition_index}].keeper_lines_removed",
                    )
                except ValueError as error:
                    failures.append(str(error))
                    continue
                unknown_persistent = set(must_persist) - element_names
                if unknown_persistent:
                    failures.append(
                        f"transition audit {transition_index} lists unknown persistent "
                        f"elements: {sorted(unknown_persistent)}"
                    )
                expected_persistent = {
                    name
                    for name, first_step in element_first_steps.items()
                    if first_step <= transition_index
                }
                missing_persistent = expected_persistent - set(must_persist)
                if missing_persistent:
                    failures.append(
                        f"transition audit {transition_index} omits previously introduced "
                        f"elements: {sorted(missing_persistent)}"
                    )
                if keeper_lines_removed:
                    failures.append(
                        f"transition audit {transition_index} removes keeper lines: "
                        f"{keeper_lines_removed}; revise the earlier frame instead"
                    )
                for occlusion_index, note in enumerate(new_occlusions, start=1):
                    if len(note.split()) < 4:
                        failures.append(
                            f"transition audit {transition_index} new occlusion "
                            f"{occlusion_index} is too vague"
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
