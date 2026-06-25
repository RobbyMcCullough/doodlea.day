# Agent Instructions

## Project

Doodle.day is the marker-based sister site to Sketcha.day. It should feel
nearly identical in structure and interaction, but the lesson style is bolder:
thick black marker outlines, saturated color, cartoon/comic energy, and fast
doodle subjects rather than quiet pencil sketches of objects.

## Local Development

This local prototype is dependency-free. Use the Cove URL when available:

```text
https://doodle.localhost/
```

If Cove is unreachable, use the fallback server from this folder:

```sh
python3 -m http.server 4174
```

Then open `http://localhost:4174`.

Generated pages come from:

```sh
node scripts/build-tutorials.mjs
```

## Daily Automation Entry Point

For daily doodle work, read these files in order:

1. `AGENTS.md`
2. `HUMANS.md`
3. `DAILY-PUBLISHING.md`
4. `PROCESS-IMAGE-WORKFLOW.md`

Then create one marker-based doodle lesson, rebuild, run readiness checks, QA
homepage/library/tutorial pages, and commit when the quality gates pass. Once
the GitHub/Cloudflare deployment path is connected, normal daily Doodle.day
lessons may push after QA under the same standard as Sketcha.day.

## Conventions

- Keep Doodle.day visually close to Sketcha.day: same layout system, archive
  structure, generated pages, JSON-LD pattern, and QA workflow.
- Differentiate by subject and medium: cartoon shapes, comic details, icons,
  stickers, hand lettering, expressive faces, marker fills, and thick outlines.
- Avoid quiet graphite-only sketch subjects unless they are deliberately adapted
  into a marker doodle.
- Use generated or human-made raster art. Do not substitute SVG/canvas/vector
  exports for finished marker art.
- Use contact-sheet-first process art and make sure every final element appears
  before the final frame.
- Keep `lab.html` private and noindex.

## Build Internals

`scripts/build-tutorials.mjs` is the single source of truth. It regenerates
`index.html`, `library.html`, `feed.xml`, `sitemap.xml`, `robots.txt`, and every
page under `tutorials/`.

The `lessons` array owns all public tutorials. Add new daily doodles there.
Current local seed: Day 001, `hot-rod-marker-flames`.

For production, run:

```sh
npm run build:production
```

That sets `SITE_URL=https://doodle.day`, rebuilds the site, and writes a clean
Cloudflare Pages output folder to `dist/`. Deploy `dist/`, not the repository
root, so drafts, process plans, scripts, and agent notes stay out of production.
