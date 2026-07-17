#!/usr/bin/env python3
"""Run this BEFORE generating any lesson art. It locks the slug first.

Enforces the generation contract from DAILY-PUBLISHING.md:
1. No unresolved (pending) generated art may exist anywhere in drafts/.
2. The slug must not already be published, unless the owner explicitly directs
   a correction and the occupied current slot matches that exact slug.
3. The daily slot must be free (when --current-date is given).
4. The caller must own the run-level daily publishing lock when --current-date
   is given.
5. The slug is locked by writing a pending entry to drafts/LEDGER.json, so a
   later run can never claim the art was speculative or unaccounted for.

It also prints the published-subject list for the mandatory duplicate
back-check, and auto-heals ledger entries whose tutorials now exist.

Usage:
  python3 scripts/preflight-image-generation.py --slug cozy-mushroom \
      --current-date 2026-07-05 --lock-token LOCK_TOKEN
"""

from __future__ import annotations

import argparse
import json
import subprocess
import sys
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DRAFTS = ROOT / "drafts"
TUTORIALS = ROOT / "tutorials"
LEDGER = DRAFTS / "LEDGER.json"


def load() -> dict:
    return json.loads(LEDGER.read_text(encoding="utf-8"))


def save(ledger: dict) -> None:
    ledger["entries"] = dict(sorted(ledger["entries"].items()))
    LEDGER.write_text(json.dumps(ledger, indent=2) + "\n", encoding="utf-8")


def heal_published(ledger: dict) -> int:
    """Flip pending/scheduled entries to published when their tutorial exists."""
    healed = 0
    for slug, entry in ledger["entries"].items():
        if entry.get("status") in {"pending", "scheduled"} and (
            TUTORIALS / f"{slug}.html"
        ).exists():
            ledger["entries"][slug] = {"status": "published"}
            healed += 1
            print(f"HEALED ledger: {slug} -> published")
    return healed


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--slug", required=True, help="Exact publish slug to lock")
    parser.add_argument(
        "--current-date",
        help="Run the duplicate-slot guard for this date (YYYY-MM-DD) too.",
    )
    parser.add_argument(
        "--lock-token",
        help="Token from scripts/daily-publish-lock.py acquire. Required with --current-date.",
    )
    parser.add_argument(
        "--allow-existing-current-slug",
        help="Allow the current date only when it already contains this exact validated slug.",
    )
    args = parser.parse_args()
    slug = args.slug

    ledger = load()
    if heal_published(ledger):
        save(ledger)

    # 1. Slug must not already be published unless this is an exact owner-
    # directed current-slot correction. The slot guard below still verifies
    # that the supplied date is occupied by this slug and no other.
    tutorial_exists = (TUTORIALS / f"{slug}.html").exists()
    correction_mode = bool(
        tutorial_exists
        and args.current_date
        and args.allow_existing_current_slug == slug
    )
    if tutorial_exists and not correction_mode:
        print(
            f"FAIL tutorials/{slug}.html already exists. Corrections must be "
            "explicitly owner-directed; do not regenerate published art."
        )
        return 1

    # 2. No unresolved drafts (this slug's own pending entry is allowed on retry).
    result = subprocess.run(
        [
            sys.executable,
            str(ROOT / "scripts" / "check-drafts-ledger.py"),
            "--allow-pending",
            slug,
        ],
        cwd=ROOT,
    )
    if result.returncode != 0:
        print("FAIL resolve the drafts ledger before generating new art.")
        return 1

    # 3. Daily run lock.
    if args.current_date:
        if not args.lock_token:
            print(
                "FAIL acquire the run-level daily publish lock first, then pass "
                "--lock-token to preflight. Run: python3 scripts/daily-publish-lock.py "
                f"acquire --current-date {args.current_date}"
            )
            return 1
        lock = subprocess.run(
            [
                sys.executable,
                str(ROOT / "scripts" / "daily-publish-lock.py"),
                "verify",
                "--current-date",
                args.current_date,
                "--token",
                args.lock_token,
            ],
            cwd=ROOT,
        )
        if lock.returncode != 0:
            print("FAIL the daily publish lock did not verify; stop before generating art.")
            return 1

    # 4. Daily slot guard.
    if args.current_date:
        slot_command = [
            sys.executable,
            str(ROOT / "scripts" / "check-daily-publish-slots.py"),
            "--current-date",
            args.current_date,
        ]
        if args.allow_existing_current_slug:
            slot_command.extend(
                ["--allow-existing-current-slug", args.allow_existing_current_slug]
            )
        slot = subprocess.run(slot_command, cwd=ROOT)
        if slot.returncode != 0:
            print("FAIL the daily slot guard did not pass; stop before generating art.")
            return 1

    # 5. Duplicate back-check reminder: the human/agent judgment step.
    published = sorted(page.stem for page in TUTORIALS.glob("*.html"))
    print(f"\nPublished subjects ({len(published)}) for the duplicate back-check:")
    for name in published:
        print(f"  - {name}")
    print(
        "\nReject the candidate if it repeats an existing lesson's core shape, "
        "category, or drawing problem (see DAILY-PUBLISHING.md)."
    )

    # 6. Lock the slug.
    entry = ledger["entries"].get(slug)
    if correction_mode or entry is None or entry.get("status") == "pending":
        ledger["entries"][slug] = {
            "status": "pending",
            "date": date.today().isoformat(),
            "note": (
                "Published slug locked for an explicit current-slot correction; "
                "resolve before any new subject."
                if correction_mode
                else "Slug locked for image generation by preflight; resolve before any new subject."
            ),
        }
        save(ledger)
        print(f"\nOK locked slug {slug!r} as pending in drafts/LEDGER.json.")
    else:
        print(
            f"FAIL drafts/LEDGER.json already has a non-pending entry for {slug!r} "
            f"({entry.get('status')}); pick a different slug or resolve that entry."
        )
        return 1

    print("OK preflight passed: generate art for this slug only.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
