#!/usr/bin/env python3
"""Guard daily automation against publishing duplicate Doodlea lessons."""

from __future__ import annotations

import argparse
import json
import re
import sys
from dataclasses import dataclass
from datetime import date, timedelta
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
BUILD_FILE = ROOT / "scripts" / "build-tutorials.mjs"


@dataclass(frozen=True)
class Lesson:
    slug: str
    day: str
    iso_date: date
    subject: str


def read_lessons() -> list[Lesson]:
    text = BUILD_FILE.read_text(encoding="utf-8")
    match = re.search(r"const lessons = \[(.*?)]\;\n\nconst archiveLessons", text, re.S)
    if not match:
        raise ValueError("Could not locate `const lessons = [...]` in scripts/build-tutorials.mjs")

    body = match.group(1).strip()
    if not body:
        return []

    chunks = re.split(r"\n  \},\n  \{", body)
    lessons: list[Lesson] = []
    for index, chunk in enumerate(chunks, start=1):
        normalized = chunk
        if not normalized.startswith("{"):
            normalized = "{" + normalized
        if not normalized.endswith("}"):
            normalized = normalized + "}"

        fields: dict[str, str] = {}
        for name in ("slug", "day", "isoDate", "subject"):
            field = re.search(rf"\b{name}:\s*\"([^\"]+)\"", normalized)
            if not field:
                raise ValueError(f"Lesson object {index} is missing `{name}`")
            fields[name] = field.group(1)

        lessons.append(
            Lesson(
                slug=fields["slug"],
                day=fields["day"],
                iso_date=date.fromisoformat(fields["isoDate"]),
                subject=fields["subject"],
            )
        )
    return lessons


def lessons_on(lessons: list[Lesson], target: date) -> list[Lesson]:
    return [lesson for lesson in lessons if lesson.iso_date == target]


def lesson_summary(lesson: Lesson) -> str:
    return f"{lesson.iso_date.isoformat()} / Day {lesson.day} / {lesson.slug} / {lesson.subject}"


def allowed(existing: list[Lesson], allowed_slug: str | None) -> bool:
    return bool(allowed_slug) and len(existing) == 1 and existing[0].slug == allowed_slug


def main() -> int:
    parser = argparse.ArgumentParser(
        description=(
            "Fail before daily publishing if the current or requested backfill "
            "date is already occupied. Use --allow-existing-*-slug only for an "
            "explicit correction to an existing lesson."
        )
    )
    parser.add_argument(
        "--current-date",
        default=date.today().isoformat(),
        help="Intended current lesson date in YYYY-MM-DD format. Defaults to today.",
    )
    parser.add_argument(
        "--backfill-date",
        help=(
            "Intended honest archive date in YYYY-MM-DD format. If omitted, "
            "the script reports the next open date before the earliest lesson."
        ),
    )
    parser.add_argument(
        "--allow-existing-current-slug",
        help="Allow the current date only when it already contains this exact slug.",
    )
    parser.add_argument(
        "--allow-existing-backfill-slug",
        help="Allow the backfill date only when it already contains this exact slug.",
    )
    parser.add_argument("--json", action="store_true", help="Emit machine-readable output.")
    args = parser.parse_args()

    lessons = read_lessons()
    current_date = date.fromisoformat(args.current_date)
    backfill_date = date.fromisoformat(args.backfill_date) if args.backfill_date else None
    earliest = min((lesson.iso_date for lesson in lessons), default=current_date)
    next_open_backfill = earliest - timedelta(days=1)

    failures: list[str] = []
    current_existing = lessons_on(lessons, current_date)
    backfill_existing = lessons_on(lessons, backfill_date) if backfill_date else []

    if current_existing and not allowed(current_existing, args.allow_existing_current_slug):
        failures.append(
            "current date already has lesson(s): "
            + "; ".join(lesson_summary(lesson) for lesson in current_existing)
        )

    if backfill_date and backfill_existing and not allowed(
        backfill_existing, args.allow_existing_backfill_slug
    ):
        failures.append(
            "backfill date already has lesson(s): "
            + "; ".join(lesson_summary(lesson) for lesson in backfill_existing)
        )

    duplicate_dates = sorted(
        target for target in {lesson.iso_date for lesson in lessons} if len(lessons_on(lessons, target)) > 1
    )
    for target in duplicate_dates:
        failures.append(
            "multiple lessons share one publish date: "
            + "; ".join(lesson_summary(lesson) for lesson in lessons_on(lessons, target))
        )

    payload = {
        "ok": not failures,
        "current_date": current_date.isoformat(),
        "current_existing": [lesson.__dict__ | {"iso_date": lesson.iso_date.isoformat()} for lesson in current_existing],
        "requested_backfill_date": backfill_date.isoformat() if backfill_date else None,
        "backfill_existing": [lesson.__dict__ | {"iso_date": lesson.iso_date.isoformat()} for lesson in backfill_existing],
        "next_open_backfill_date": next_open_backfill.isoformat(),
        "failures": failures,
    }

    if args.json:
        print(json.dumps(payload, indent=2))
    elif failures:
        print("STOP: daily publish slot guard failed.")
        for failure in failures:
            print(f"- {failure}")
        print()
        print("For an intentional correction, rerun with the matching --allow-existing-*-slug flag.")
    else:
        print(f"OK: no duplicate current lesson for {current_date.isoformat()}.")
        if backfill_date:
            print(f"OK: no duplicate backfill lesson for {backfill_date.isoformat()}.")
        else:
            print(f"Next open backfill date appears to be {next_open_backfill.isoformat()}.")

    return 0 if not failures else 1


if __name__ == "__main__":
    sys.exit(main())
