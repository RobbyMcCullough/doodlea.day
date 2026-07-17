# Agent Instructions

## Project

Doodlea.day is the marker-based sister site to Sketcha.day. It should feel
nearly identical in structure and interaction, but the lesson style is bolder:
thick black marker outlines, saturated color, cartoon/comic energy, and fast
doodle subjects rather than quiet pencil sketches of objects.

## Sister Site Parity

Doodlea.day and Sketcha.day are sister sites. Unless the project owner explicitly
says otherwise, any style or structure change made to this site should also be
applied to Sketcha.day. Keep the two sites near mirror images in layout,
components, navigation, responsive behavior, build structure, and interaction
patterns; the main difference is editorial focus and art direction:
Doodlea.day is doodle/marker focused, while Sketcha.day is drawing/sketch
focused.

Before finishing style or structure work, check the sibling repository at
`/Users/mybbor/Library/CloudStorage/Dropbox/websites/sketcha.day` and either
apply the matching change there or clearly report why it was intentionally
skipped.

## Local Development

This local prototype is dependency-free. Use the Cove URL when available:

```text
https://doodlea.localhost/
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

Before choosing subjects or creating art, acquire the cross-site daily run lock
from this repo. The lock is shared with Sketcha.day through the sibling parent
folder, so a second automation run will stop before it can create rogue art:

```sh
python3 scripts/daily-publish-lock.py acquire --current-date YYYY-MM-DD
```

Save the printed lock token for every preflight command in this run, and release
the lock after commit/push or after any stop condition:

```sh
python3 scripts/daily-publish-lock.py release --token LOCK_TOKEN
```

Then run the duplicate-slot guard:

```sh
python3 scripts/check-daily-publish-slots.py --current-date YYYY-MM-DD
```

If the current date is already occupied, stop instead of creating or validating
another daily pair. For an explicit correction to an existing lesson, rerun the
guard with the matching `--allow-existing-current-slug` or
`--allow-existing-backfill-slug` flag and keep the correction scoped to that
slug.

Then, before generating ANY lesson art, lock the slug with the pre-flight gate
(this is mandatory, not advisory):

```sh
python3 scripts/preflight-image-generation.py --slug {slug} --current-date YYYY-MM-DD --lock-token LOCK_TOKEN
```

It fails when unresolved generated art exists anywhere in `drafts/`
(see `drafts/LEDGER.json`), when the slug is already published, or when the
daily slot is taken, and it also fails if the run-level daily publishing lock is
missing or owned by another process. An explicit published-lesson correction is
the sole exception: pass the matching current or backfill date and exact
`--allow-existing-*-slug` flag so the duplicate-slot guard can verify that same
slug before preflight locks it. Every draft folder must carry a ledger status;
resolve pending art (promote it, record a rejection, or get owner direction)
before generating a different subject. `scripts/check-drafts-ledger.py`
validates the ledger and runs inside the readiness check.

Then create the planned marker-based doodle lessons, rebuild, run readiness
checks, QA homepage/library/tutorial pages, and commit when the quality gates
pass. Normal daily Doodlea.day lessons may push after QA under the same
standard as Sketcha.day.

## Conventions

- Keep Doodlea.day visually close to Sketcha.day: same layout system, archive
  structure, generated pages, JSON-LD pattern, and QA workflow.
- Differentiate by subject and medium: cartoon shapes, comic details, icons,
  hand lettering, expressive faces, marker fills, and thick outlines.
- Do not append "doodle" to public lesson names, H1 search phrases, or page
  titles by default; the site brand already supplies that context.
- Owner direction (2026-07-04): avoid "sticker" and "badge" framing. Do not
  title lessons as stickers/badges or add die-cut borders, badge frames, or
  sticker outlines around the subject — draw the subject itself.
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

### Images: JPG masters, WebP delivery (July 2026)

- `assets/*-step-*.jpg` and `assets/*-finished-v*.jpg` are the reviewed masters.
  Pages serve same-name `.webp` derivatives built by
  `python3 scripts/build-image-derivatives.py` (idempotent, mtime-based).
- 1200×630 Open Graph cards live at `assets/social/{slug}-og.jpg`, built by
  `python3 scripts/make-social-cards.py` from each page's declared finished JPG.
- Both scripts run automatically inside `check-tutorial-readiness.py` after the
  page build. Never hand-edit derivatives or cards; fix the master and rerun.
- Process plans and gates keep naming the `.jpg` masters;
  `check-process-plan.py` maps page `.webp` references back to `.jpg`.
- `sitemap.xml` carries image-sitemap entries (finished + step WebP per lesson)
  for Google Images — generated by the build, nothing to maintain by hand.
- Tutorial pages include prev/next daily-lesson links (`lessonPagination()`), a
  preloaded hero image with `fetchpriority="high"`, and lazy below-fold images.

### Deployment

See `DEPLOYMENT.md`: Caddy on the DigitalOcean droplet serves the repository
root directly — there is no `dist/` step in production. Run the build locally
and commit the generated files. (`scripts/build-public.mjs` and `dist/` remain
for local packaging experiments only.) The deploy workflow also pings IndexNow
(Bing/Yandex) with changed pages via `scripts/submit-indexnow.py`; the
ownership key file `f023b31d5eb90985c733e9c445dd2289.txt` at the site root must
stay committed.

### GitHub pushes use 1Password SSH

- For every GitHub push from this project, use the 1Password SSH agent rather
  than the default system agent. Run this from an interactive terminal after
  commit and QA so 1Password can show its normal authorization prompt:

```sh
export SSH_AUTH_SOCK="$HOME/Library/Group Containers/2BUA8C4S2C.com.1password/t/agent.sock"
git push origin main
```

- Do not retry a plain `git push` after a public-key failure; it commonly uses
  the empty system agent. Verify the branch is clean and aligned with
  `origin/main` after the 1Password-backed push.
