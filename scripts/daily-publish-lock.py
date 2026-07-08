#!/usr/bin/env python3
"""Acquire or release the cross-site daily publishing lock.

This lock prevents two daily automation runs from selecting subjects and
generating art for the same publish date at the same time. Sketcha.day and
Doodlea.day use the same lock directory in their shared parent folder.
"""

from __future__ import annotations

import argparse
import json
import os
import secrets
import shutil
import socket
import sys
from datetime import datetime, timedelta, timezone
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
LOCK_DIR = ROOT.parent / ".daily-sketch-doodle-lessons.lock"
META_FILE = LOCK_DIR / "owner.json"


def utc_now() -> datetime:
    return datetime.now(timezone.utc)


def parse_time(value: str | None) -> datetime | None:
    if not value:
        return None
    try:
        return datetime.fromisoformat(value.replace("Z", "+00:00"))
    except ValueError:
        return None


def read_owner() -> dict:
    try:
        return json.loads(META_FILE.read_text(encoding="utf-8"))
    except FileNotFoundError:
        return {}
    except json.JSONDecodeError:
        return {"unreadable": True}


def write_owner(owner: dict) -> None:
    META_FILE.write_text(json.dumps(owner, indent=2) + "\n", encoding="utf-8")


def lock_is_stale(owner: dict, stale_after_hours: float) -> tuple[bool, str]:
    if owner.get("unreadable"):
        return True, "metadata is unreadable"

    acquired_at = parse_time(owner.get("acquired_at"))
    if acquired_at is None:
        return True, "metadata is missing acquired_at"

    age = utc_now() - acquired_at
    if age > timedelta(hours=stale_after_hours):
        return True, f"lock is older than {stale_after_hours:g} hours"

    return False, ""


def acquire(args: argparse.Namespace) -> int:
    token = secrets.token_urlsafe(18)
    owner = {
        "token": token,
        "current_date": args.current_date,
        "site": args.site,
        "pid": os.getpid(),
        "host": socket.gethostname(),
        "cwd": str(ROOT),
        "acquired_at": utc_now().isoformat().replace("+00:00", "Z"),
        "stale_after_hours": args.stale_after_hours,
    }

    for attempt in range(2):
        try:
            LOCK_DIR.mkdir(mode=0o700)
        except FileExistsError:
            existing = read_owner()
            stale, reason = lock_is_stale(existing, args.stale_after_hours)
            if stale and (args.break_stale or attempt == 0):
                print(f"NOTICE: removing stale daily publish lock ({reason}).")
                shutil.rmtree(LOCK_DIR)
                continue

            print("STOP: another daily lesson run already owns the publish lock.")
            if existing:
                print(
                    "Owner: "
                    + json.dumps(
                        {
                            "site": existing.get("site"),
                            "current_date": existing.get("current_date"),
                            "host": existing.get("host"),
                            "pid": existing.get("pid"),
                            "acquired_at": existing.get("acquired_at"),
                            "cwd": existing.get("cwd"),
                        },
                        indent=2,
                    )
                )
            print("Do not choose subjects or generate art until that run finishes.")
            return 1
        else:
            write_owner(owner)
            print(f"OK acquired daily publish lock for {args.current_date}.")
            print(f"Lock token: {token}")
            print(f"Release with: python3 scripts/daily-publish-lock.py release --token {token}")
            return 0

    print("FAIL could not acquire daily publish lock.")
    return 1


def verify(args: argparse.Namespace) -> int:
    owner = read_owner()
    stale, reason = lock_is_stale(owner, args.stale_after_hours)
    if stale:
        print(f"FAIL daily publish lock is stale or invalid: {reason}.")
        return 1
    if owner.get("token") != args.token:
        print("FAIL daily publish lock token does not match the active run.")
        return 1
    if args.current_date and owner.get("current_date") != args.current_date:
        print(
            "FAIL daily publish lock is for "
            f"{owner.get('current_date')}, not {args.current_date}."
        )
        return 1
    print(f"OK daily publish lock verified for {owner.get('current_date')}.")
    return 0


def release(args: argparse.Namespace) -> int:
    if not LOCK_DIR.exists():
        print("OK no daily publish lock is present.")
        return 0

    owner = read_owner()
    if not args.force and owner.get("token") != args.token:
        print("FAIL daily publish lock token does not match. Use --force only after checking owner state.")
        return 1

    shutil.rmtree(LOCK_DIR)
    print("OK released daily publish lock.")
    return 0


def status(args: argparse.Namespace) -> int:
    if not LOCK_DIR.exists():
        print("No daily publish lock is present.")
        return 0
    owner = read_owner()
    stale, reason = lock_is_stale(owner, args.stale_after_hours)
    print(json.dumps({"lock_dir": str(LOCK_DIR), "stale": stale, "stale_reason": reason, "owner": owner}, indent=2))
    return 1 if stale else 0


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--stale-after-hours",
        type=float,
        default=8,
        help="Treat an unreleased lock as stale after this many hours. Defaults to 8.",
    )
    subparsers = parser.add_subparsers(dest="command", required=True)

    acquire_parser = subparsers.add_parser("acquire", help="Acquire the daily publishing lock.")
    acquire_parser.add_argument("--current-date", required=True, help="Current lesson date in YYYY-MM-DD format.")
    acquire_parser.add_argument("--site", default=ROOT.name, help="Site or automation name for metadata.")
    acquire_parser.add_argument("--break-stale", action="store_true", help="Remove a stale lock before acquiring.")

    verify_parser = subparsers.add_parser("verify", help="Verify an existing lock token.")
    verify_parser.add_argument("--token", required=True, help="Token printed by the acquire command.")
    verify_parser.add_argument("--current-date", help="Require the lock to match this date.")

    release_parser = subparsers.add_parser("release", help="Release the daily publishing lock.")
    release_parser.add_argument("--token", help="Token printed by the acquire command.")
    release_parser.add_argument("--force", action="store_true", help="Release without a token after manual inspection.")

    subparsers.add_parser("status", help="Print current lock state.")

    args = parser.parse_args()
    if args.command == "acquire":
        return acquire(args)
    if args.command == "verify":
        return verify(args)
    if args.command == "release":
        return release(args)
    if args.command == "status":
        return status(args)
    raise AssertionError(args.command)


if __name__ == "__main__":
    sys.exit(main())
