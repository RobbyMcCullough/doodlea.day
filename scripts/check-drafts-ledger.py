#!/usr/bin/env python3
"""Validate drafts/LEDGER.json against the drafts/ folders and tutorials/.

This is the machine-enforced version of the "no unresolved generated art"
rule: every generated-but-unpublished art set must be explicitly accounted
for before a run may generate images for a new subject.

Rules:
- Every folder under drafts/ must have a ledger entry.
- "published" entries must have a matching tutorials/{slug}.html.
- "pending" entries fail unless --allow-pending {slug} is passed (used by the
  readiness check while a lesson is mid-run).
- A pending entry whose tutorial page exists should be flipped to
  "published" (scripts/preflight-image-generation.py does this
  automatically).
- "scheduled" entries need a release_date; a past release_date fails so a
  stashed lesson cannot silently rot.
- "rejected-quality", "rejected-duplicate", and "transferred" entries are
  resolved states and always pass.
"""

from __future__ import annotations

import argparse
import json
import sys
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DRAFTS = ROOT / "drafts"
TUTORIALS = ROOT / "tutorials"
LEDGER = DRAFTS / "LEDGER.json"
RESOLVED = {"rejected-quality", "rejected-duplicate", "transferred"}
VALID = RESOLVED | {"published", "pending", "scheduled"}


def load_ledger() -> dict:
    if not LEDGER.exists():
        sys.exit(f"FAIL missing {LEDGER.relative_to(ROOT)}")
    return json.loads(LEDGER.read_text(encoding="utf-8"))


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--allow-pending",
        action="append",
        default=[],
        metavar="SLUG",
        help="Slug(s) allowed to be pending during the current run.",
    )
    parser.add_argument(
        "--today",
        default=date.today().isoformat(),
        help="Override today's date (YYYY-MM-DD) for testing.",
    )
    args = parser.parse_args()

    entries: dict = load_ledger().get("entries", {})
    folders = sorted(
        path.name for path in DRAFTS.iterdir() if path.is_dir()
    )
    failures: list[str] = []
    warnings: list[str] = []

    for slug in folders:
        entry = entries.get(slug)
        if entry is None:
            failures.append(
                f"drafts/{slug}/ has no ledger entry. Add one to drafts/LEDGER.json "
                "(pending, scheduled, published, rejected-quality, rejected-duplicate, "
                "or transferred)."
            )
            continue
        status = entry.get("status")
        published_page = (TUTORIALS / f"{slug}.html").exists()
        if status not in VALID:
            failures.append(f"drafts/{slug}/ has unknown status {status!r}.")
        elif status == "published" and not published_page:
            failures.append(
                f"drafts/{slug}/ is marked published but tutorials/{slug}.html does not exist."
            )
        elif status == "pending":
            if published_page:
                failures.append(
                    f"drafts/{slug}/ is pending but its tutorial page exists; "
                    "flip the ledger entry to published."
                )
            elif slug not in args.allow_pending:
                failures.append(
                    f"drafts/{slug}/ holds unresolved generated art (status pending). "
                    "Promote it into a validated tutorial, record a rejection, or get "
                    "owner direction before generating art for a new subject."
                )
        elif status == "scheduled":
            release = entry.get("release_date")
            if not release:
                failures.append(f"drafts/{slug}/ is scheduled but has no release_date.")
            elif release < args.today and not published_page:
                failures.append(
                    f"drafts/{slug}/ was scheduled for {release} and is now overdue. "
                    "Publish it or update the ledger."
                )
            elif published_page:
                warnings.append(
                    f"drafts/{slug}/ is scheduled but already published; flip it to published."
                )

    for slug, entry in entries.items():
        if slug in folders:
            continue
        status = entry.get("status")
        if status == "pending":
            # A locked slug is binding even before its drafts/ folder exists.
            if (TUTORIALS / f"{slug}.html").exists():
                failures.append(
                    f"ledger entry {slug!r} is pending but its tutorial page exists; "
                    "flip it to published."
                )
            elif slug not in args.allow_pending:
                failures.append(
                    f"ledger entry {slug!r} is a pending slug lock with unresolved art. "
                    "Promote, reject, or remove it before generating art for a new subject."
                )
        elif status != "published":
            warnings.append(
                f"ledger entry {slug!r} has no drafts/{slug}/ folder (folder cleaned up?)."
            )

    for warning in warnings:
        print(f"WARN {warning}")
    if failures:
        for failure in failures:
            print(f"FAIL {failure}")
        return 1
    print(f"OK drafts ledger: {len(folders)} draft folder(s) all accounted for")
    return 0


if __name__ == "__main__":
    sys.exit(main())
