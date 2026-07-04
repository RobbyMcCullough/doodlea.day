#!/usr/bin/env python3
"""Run the Doodlea.day tutorial readiness checks for one lesson slug."""

from __future__ import annotations

import argparse
import json
import ssl
import subprocess
import sys
import urllib.request
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urldefrag, urljoin


ROOT = Path(__file__).resolve().parents[1]


class PageParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.in_ld = False
        self.ld_buffer: list[str] = []
        self.json_ld: list[dict] = []
        self.links: list[str] = []
        self.images: list[tuple[str, str | None]] = []
        self.robots: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        values = dict(attrs)
        if tag == "script" and values.get("type") == "application/ld+json":
            self.in_ld = True
            self.ld_buffer = []
        elif tag == "a" and values.get("href"):
            self.links.append(values["href"] or "")
        elif tag == "img" and values.get("src"):
            self.images.append((values["src"] or "", values.get("alt")))
        elif tag == "meta" and values.get("name") == "robots":
            self.robots.append(values.get("content") or "")

    def handle_data(self, data: str) -> None:
        if self.in_ld:
            self.ld_buffer.append(data)

    def handle_endtag(self, tag: str) -> None:
        if tag == "script" and self.in_ld:
            self.json_ld.append(json.loads("".join(self.ld_buffer)))
            self.in_ld = False


def run(command: list[str]) -> bool:
    print("$ " + " ".join(command))
    result = subprocess.run(command, cwd=ROOT)
    return result.returncode == 0


def parse_page(path: Path) -> PageParser:
    parser = PageParser()
    parser.feed(path.read_text(encoding="utf-8"))
    return parser


def visible_step_count(path: Path) -> int:
    text = path.read_text(encoding="utf-8")
    return text.count('<li class="step-card')


def json_ld_nodes(items: list[dict]) -> list[dict]:
    nodes: list[dict] = []
    for item in items:
        if not isinstance(item, dict):
            continue
        graph = item.get("@graph")
        if isinstance(graph, list):
            nodes.extend(node for node in graph if isinstance(node, dict))
        else:
            nodes.append(item)
    return nodes


def check_json_and_privacy(slug: str) -> bool:
    ok = True
    pages = [
        ROOT / "index.html",
        ROOT / "library.html",
        ROOT / "tutorials" / f"{slug}.html",
        ROOT / "lab.html",
    ]
    for page in pages:
        parser = parse_page(page)
        missing_alt = [src for src, alt in parser.images if alt is None]
        if missing_alt:
            ok = False
            print(f"FAIL {page.relative_to(ROOT)} missing alt attributes: {missing_alt}")
        nodes = json_ld_nodes(parser.json_ld)
        if not nodes:
            ok = False
            print(f"FAIL {page.relative_to(ROOT)} JSON-LD has no object nodes")
            continue
        types = [item.get("@type") for item in nodes]
        print(f"{page.relative_to(ROOT)} JSON-LD types: {types}")

    tutorial = ROOT / "tutorials" / f"{slug}.html"
    tutorial_parser = parse_page(tutorial)
    howto = next(
        (item for item in json_ld_nodes(tutorial_parser.json_ld) if item.get("@type") == "HowTo"),
        None,
    )
    if howto is None:
        ok = False
        print(f"FAIL tutorials/{slug}.html missing HowTo JSON-LD")
    else:
        schema_steps = howto.get("step")
        step_count = visible_step_count(tutorial)
        if not isinstance(schema_steps, list) or len(schema_steps) != step_count:
            ok = False
            print(
                f"FAIL tutorials/{slug}.html HowTo step count "
                f"{len(schema_steps) if isinstance(schema_steps, list) else 'invalid'} "
                f"does not match visible step count {step_count}"
            )

    lab = parse_page(ROOT / "lab.html")
    if "noindex, nofollow" not in [value.strip().lower() for value in lab.robots]:
        ok = False
        print("FAIL lab.html missing noindex, nofollow robots meta")

    public_pages = [ROOT / "index.html", ROOT / "library.html", *sorted((ROOT / "tutorials").glob("*.html"))]
    public_lab_links = [
        page.relative_to(ROOT)
        for page in public_pages
        if "lab.html" in page.read_text(encoding="utf-8")
    ]
    if public_lab_links:
        ok = False
        print(f"FAIL public lab links found in {public_lab_links}")

    return ok


def check_cove_links(slug: str, base_url: str) -> bool:
    context = ssl._create_unverified_context()
    pages = ["index.html", "library.html", f"tutorials/{slug}.html"]
    urls: list[str] = []
    for page in pages:
        parser = parse_page(ROOT / page)
        for value in [*parser.links, *(src for src, _alt in parser.images)]:
            if value.startswith(("mailto:", "tel:")):
                continue
            full = urldefrag(urljoin(urljoin(base_url, page), value))[0]
            if full.startswith(base_url) and full not in urls:
                urls.append(full)

    failures: list[tuple[str, str | int]] = []
    for url in urls:
        try:
            with urllib.request.urlopen(
                urllib.request.Request(url, method="GET"),
                timeout=5,
                context=context,
            ) as response:
                if response.status >= 400:
                    failures.append((url, response.status))
        except Exception as error:  # pragma: no cover - network/runtime guard
            failures.append((url, f"{type(error).__name__}: {error}"))

    print(f"Cove/internal URL check: checked {len(urls)}, failures {len(failures)}")
    for failure in failures:
        print(f"FAIL {failure[0]} -> {failure[1]}")
    return not failures


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Run build, process, delta, HTML, link, and diff checks for a tutorial."
    )
    parser.add_argument("slug", help="Tutorial slug to check")
    parser.add_argument(
        "--base-url",
        default="https://doodlea.localhost/",
        help="Local site base URL for link/asset probes.",
    )
    parser.add_argument(
        "--contact-sheet",
        help="Path for the generated step contact sheet.",
    )
    args = parser.parse_args()
    slug = args.slug
    contact_sheet = args.contact_sheet or f"/tmp/{slug}-steps.jpg"
    base_url = args.base_url if args.base_url.endswith("/") else f"{args.base_url}/"

    checks = [
        run(["node", "scripts/build-tutorials.mjs"]),
        # Derivatives and social cards run after the build so a new lesson's
        # tutorial page exists; both are idempotent and only write when a
        # source JPG is newer than its output.
        run(["python3", "scripts/build-image-derivatives.py"]),
        run(["python3", "scripts/make-social-cards.py"]),
        run(["python3", "scripts/check-drafts-ledger.py", "--allow-pending", slug]),
        run(["python3", "scripts/check-process-plan.py", slug]),
        run([
            "python3",
            "scripts/check-step-deltas.py",
            slug,
            "--contact-sheet",
            contact_sheet,
        ]),
        check_json_and_privacy(slug),
        check_cove_links(slug, base_url),
        run(["python3", "scripts/check-unused-assets.py"]),
        run(["git", "diff", "--check"]),
    ]
    if all(checks):
        print(f"OK {slug}: tutorial readiness checks passed")
        return 0
    print(f"FAIL {slug}: tutorial readiness checks failed")
    return 1


if __name__ == "__main__":
    sys.exit(main())
