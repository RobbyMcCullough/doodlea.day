#!/usr/bin/env python3
"""Submit recently changed public pages to IndexNow after a deploy.

IndexNow notifies Bing, Yandex, and other participating engines the moment a
page changes, so new daily lessons get crawled the same day. (Google does not
use IndexNow; it discovers changes via the sitemap.) The key file at the site
root proves ownership and is public by design.

Called from .github/workflows/deploy.yml with the commit range that was just
deployed. Safe to run anywhere: it exits 0 when nothing relevant changed.

Usage:
  python3 scripts/submit-indexnow.py --since HEAD^
"""

from __future__ import annotations

import argparse
import json
import subprocess
import sys
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SITE = "https://doodlea.day"
HOST = "doodlea.day"
KEY = "f023b31d5eb90985c733e9c445dd2289"
ENDPOINT = "https://api.indexnow.org/indexnow"


def changed_files(since: str) -> list[str]:
    result = subprocess.run(
        ["git", "diff", "--name-only", "--diff-filter=ACMR", since, "HEAD"],
        cwd=ROOT,
        capture_output=True,
        text=True,
        check=True,
    )
    return [line.strip() for line in result.stdout.splitlines() if line.strip()]


def to_url(path: str) -> str | None:
    if path == "index.html":
        return f"{SITE}/"
    if path in {"library.html", "about.html"}:
        return f"{SITE}/{path}"
    if path.startswith("tutorials/") and path.endswith(".html"):
        return f"{SITE}/{path}"
    return None


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--since", default="HEAD^", help="Base commit for the diff")
    parser.add_argument(
        "--dry-run", action="store_true", help="Print the payload without submitting"
    )
    args = parser.parse_args()

    try:
        files = changed_files(args.since)
    except subprocess.CalledProcessError as error:
        print(f"WARN could not diff {args.since}..HEAD: {error}")
        return 0

    urls = sorted({url for url in (to_url(path) for path in files) if url})
    if not urls:
        print("OK no public page changes to submit")
        return 0

    payload = {
        "host": HOST,
        "key": KEY,
        "keyLocation": f"{SITE}/{KEY}.txt",
        "urlList": urls,
    }
    if args.dry_run:
        print(json.dumps(payload, indent=2))
        return 0

    request = urllib.request.Request(
        ENDPOINT,
        data=json.dumps(payload).encode("utf-8"),
        headers={"Content-Type": "application/json; charset=utf-8"},
        method="POST",
    )
    try:
        with urllib.request.urlopen(request, timeout=15) as response:
            print(f"OK IndexNow accepted {len(urls)} URL(s): HTTP {response.status}")
    except Exception as error:  # deploy should not fail on a ping problem
        print(f"WARN IndexNow submission failed: {error}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
