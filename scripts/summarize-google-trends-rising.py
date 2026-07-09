#!/usr/bin/env python3
"""Summarize Google Trends rising "how to draw" queries from copied/exported text.

Google Trends does not provide a stable public API for the Related queries card.
For daily subject research, use the rendered Trends page or its CSV export, then
pipe the visible/exported text into this helper.
"""

from __future__ import annotations

import argparse
import csv
import io
import json
import re
import sys
from dataclasses import asdict, dataclass
from pathlib import Path


CHANGE_RE = re.compile(r"^(?:\+[\d,]+%|Breakout)$", re.IGNORECASE)
RANK_RE = re.compile(r"^\d+$")
DRAW_RE = re.compile(r"\bhow\s+to\s+draw\b", re.IGNORECASE)
UI_LINES = {
    "code",
    "file_download",
    "help_outline",
    "more_vert",
    "query",
    "related queries",
    "rising",
    "share",
    "top",
}
NON_LESSON_TERMS = (
    "after blood draw",
    "bandage",
    "blood draw",
    "bow draw",
    "cash app",
    "driver",
    "golf",
    "hit a draw",
    "how long",
    "lottery",
    "powerball",
)


@dataclass
class RisingQuery:
    rank: int | None
    query: str
    change: str
    lesson_candidate: bool
    reason: str


def normalize_line(line: str) -> str:
    return " ".join(line.replace("\u00a0", " ").split())


def is_change(value: str) -> bool:
    return bool(CHANGE_RE.match(normalize_line(value)))


def is_ui_line(value: str) -> bool:
    return normalize_line(value).lower() in UI_LINES


def candidate_reason(query: str) -> tuple[bool, str]:
    lowered = query.lower()
    if not DRAW_RE.search(query):
        return False, "does not contain drawing intent"
    for term in NON_LESSON_TERMS:
        if term in lowered:
            return False, f"non-lesson use of draw: {term}"
    return True, "drawing-intent query"


def query_from_cells(cells: list[str]) -> str | None:
    for cell in cells:
        value = normalize_line(cell)
        if DRAW_RE.search(value) and not is_change(value):
            return value
    return None


def change_from_cells(cells: list[str]) -> str | None:
    for cell in cells:
        value = normalize_line(cell)
        if is_change(value):
            return value
    return None


def parse_csvish(text: str) -> list[RisingQuery]:
    rows: list[list[str]] = []
    for dialect in ("excel", "excel-tab"):
        try:
            rows = list(csv.reader(io.StringIO(text), dialect=dialect))
        except csv.Error:
            rows = []
        if any(len(row) > 1 for row in rows):
            break

    results: list[RisingQuery] = []
    rank = 1
    in_rising = False
    for row in rows:
        cells = [normalize_line(cell) for cell in row if normalize_line(cell)]
        if not cells:
            continue
        joined = " ".join(cells).lower()
        if "rising" == joined or joined.endswith(" rising"):
            in_rising = True
            continue
        if in_rising and ("top" == joined or joined.startswith("related topics")):
            break
        if not in_rising and "related queries" not in joined:
            continue
        query = query_from_cells(cells)
        change = change_from_cells(cells)
        if query and change:
            ok, reason = candidate_reason(query)
            results.append(RisingQuery(rank, query, change, ok, reason))
            rank += 1
    return dedupe(results)


def parse_visible_text(text: str) -> list[RisingQuery]:
    lines = [normalize_line(line) for line in text.splitlines()]
    lines = [line for line in lines if line]
    related_indexes = [
        index for index, line in enumerate(lines) if line.lower() == "related queries"
    ]
    if related_indexes:
        lines = lines[related_indexes[-1] + 1 :]
    rising_indexes = [index for index, line in enumerate(lines) if line.lower() == "rising"]
    if rising_indexes:
        lines = lines[rising_indexes[0] + 1 :]

    results: list[RisingQuery] = []
    index = 0
    while index < len(lines):
        line = lines[index]
        if line.lower().startswith("showing "):
            break
        if not RANK_RE.match(line):
            index += 1
            continue

        rank = int(line)
        query: str | None = None
        change: str | None = None
        cursor = index + 1
        while cursor < len(lines) and not RANK_RE.match(lines[cursor]):
            value = lines[cursor]
            if value.lower().startswith("showing "):
                break
            if not is_ui_line(value) and query is None:
                query = value
            elif query and is_change(value):
                change = value
                break
            cursor += 1

        if query and change:
            ok, reason = candidate_reason(query)
            results.append(RisingQuery(rank, query, change, ok, reason))
        index = max(cursor, index + 1)
    return dedupe(results)


def dedupe(items: list[RisingQuery]) -> list[RisingQuery]:
    seen: set[str] = set()
    unique: list[RisingQuery] = []
    for item in items:
        key = item.query.lower()
        if key in seen:
            continue
        seen.add(key)
        unique.append(item)
    return unique


def parse_queries(text: str) -> list[RisingQuery]:
    csv_results = parse_csvish(text)
    if csv_results:
        return csv_results
    return parse_visible_text(text)


def render_markdown(items: list[RisingQuery], limit: int) -> str:
    candidates = [item for item in items if item.lesson_candidate][:limit]
    ignored = [item for item in items if not item.lesson_candidate][:limit]
    output = ["# Google Trends rising queries", ""]
    if candidates:
        output.append("## Drawing candidates")
        for item in candidates:
            rank = item.rank if item.rank is not None else "-"
            output.append(f"- {rank}. {item.query} ({item.change})")
    else:
        output.extend(["## Drawing candidates", "- None found in the supplied text."])
    if ignored:
        output.extend(["", "## Ignored"])
        for item in ignored:
            rank = item.rank if item.rank is not None else "-"
            output.append(f"- {rank}. {item.query} ({item.change}) - {item.reason}")
    return "\n".join(output)


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Parse copied/exported Google Trends Rising related queries."
    )
    parser.add_argument(
        "input",
        nargs="?",
        help="Text or CSV export path. Reads stdin when omitted.",
    )
    parser.add_argument(
        "--format",
        choices=("markdown", "json"),
        default="markdown",
        help="Output format.",
    )
    parser.add_argument("--limit", type=int, default=10, help="Rows per section.")
    args = parser.parse_args()

    if args.input:
        text = Path(args.input).read_text(encoding="utf-8")
    else:
        text = sys.stdin.read()

    items = parse_queries(text)
    if args.format == "json":
        print(json.dumps([asdict(item) for item in items], indent=2))
    else:
        print(render_markdown(items, args.limit))
    return 0 if items else 1


if __name__ == "__main__":
    raise SystemExit(main())
