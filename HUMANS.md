# Human Notes

## Last Accessed
- Date: 2026-06-25
- Agent harness: Codex
- Harness project/session name: Daily sketch and doodle lessons
- Local path: `/Users/mybbor/Library/CloudStorage/Dropbox/websites/doodlea.day`

## Project Context
- Parent project: Daily drawing prompt/tutorial websites
- Sister project: `/Users/mybbor/Library/CloudStorage/Dropbox/websites/sketcha.day`
- Domain: `doodlea.day`
- Local Cove URL: `https://doodlea.localhost/`

## Return Notes
- Doodlea.day is a local sibling to Sketcha.day with the same generated-page
  structure and visual system.
- The difference is lesson medium and subject direction: Doodlea.day should focus
  on thick-stroke, colorful, marker-based cartoon/comic doodles.
- First local lesson is `hot-rod-marker-flames`, promoted from the Sketcha.day
  private marker-flames draft.
- Build with `node scripts/build-tutorials.mjs`.
- Production build with `npm run build:production`; Cloudflare Pages should
  deploy `dist/`.
- QA with `python3 scripts/check-tutorial-readiness.py hot-rod-marker-flames`.
- Prefer `https://doodlea.localhost/` for local Cove QA; fallback server is
  `python3 -m http.server 4174`.
- Future automation should create one Sketcha lesson and one Doodlea lesson each
  day. Once the GitHub/Cloudflare deployment path is connected, normal daily
  Doodlea lessons may push after passing the Doodlea quality gates.
- Added the smiling pizza slice doodle as the June 25, 2026 / Day 002 Doodlea.day
  tutorial from a reviewed six-panel generated contact sheet. Finished image
  rating: 8.7/10.
- Day 002 QA used `python3 scripts/check-tutorial-readiness.py
  smiling-pizza-slice-doodle`, a step contact-sheet review at
  `/tmp/smiling-pizza-slice-doodle-steps.jpg`, Cove desktop/mobile screenshots
  saved as `/tmp/doodle-pizza-*.png`, and a compact QA sheet saved as
  `/tmp/doodle-pizza-qa-sheet.png`.
- During the June 25 run, a separate robot-head draft was generated but removed
  after the pizza slice lesson was confirmed as the active Day 002 lesson. Do not
  assume robot-head assets exist in the repo.
- Backfilled two older Doodlea.day lessons on June 25, 2026: `trophy-cup-sticker`
  as June 22 / Day 001, and `firework-burst-doodle` as June 23 / Day 002.
  Existing day labels shifted forward by two, so hot rod flames is Day 003 and
  the June 25 pizza slice is Day 004.
- The backfill used a quick timely-event check: FIFA World Cup 2026 informed the
  trophy subject, and upcoming Independence Day informed the firework burst.
  `DAILY-PUBLISHING.md` now requires checking timely hooks before choosing a
  daily subject, while avoiding weak trends and sister-site duplication.
- Backfill QA used `python3 scripts/check-tutorial-readiness.py
  trophy-cup-sticker`, `python3 scripts/check-tutorial-readiness.py
  firework-burst-doodle`, step contact-sheet reviews at
  `/tmp/trophy-cup-sticker-steps.jpg` and
  `/tmp/firework-burst-doodle-steps.jpg`, Cove/Chrome desktop and mobile
  screenshots saved under `/tmp/sketcha-doodle-backfill-qa/`, and a compact QA
  sheet at `/tmp/sketcha-doodle-backfill-qa/qa-contact-sheet.jpg`.
- Promoted the cached silly robot head contact sheet into a real backdated
  Doodlea.day lesson on June 25, 2026: `silly-robot-head`, June 21 / Day 001.
  Existing Doodlea day labels shifted forward by one, so the June 25 pizza slice
  is now Day 005. Finished image rating: 9.1/10.
- Robot QA used `python3 scripts/check-tutorial-readiness.py silly-robot-head`,
  a step contact-sheet review at `/tmp/silly-robot-head-steps.jpg`, Cove/Chrome
  desktop and mobile screenshots saved under `/tmp/doodle-robot-qa/`, and a
  compact QA sheet at `/tmp/doodle-robot-qa/qa-contact-sheet.jpg`.
- Updated the public brand target from Doodle.day to Doodlea.day and changed
  the logo glyph from the inherited pencil to a sharpie-style marker. The
  active source mark is `assets/logo-marker-raster-v2.png`; generated browser icons are
  `assets/site-icon.png`, `assets/favicon-32x32.png`,
  `assets/favicon-16x16.png`, `assets/apple-touch-icon.png`, and `favicon.ico`.
- Matched the Sketcha.day wordmark structure: Doodlea now renders `doodle` and
  `.day` in raspberry-magenta, with the final `a` in yellow, while keeping the
  marker glyph.
- Wired the repo remote/deploy docs toward
  `https://github.com/RobbyMcCullough/doodlea.day`, added a generated
  transparent chisel-tip marker glyph at `assets/logo-marker-raster-v2.png`,
  changed site/home links to use `/` instead of `index.html`, and added
  sister-site links back to Sketcha.day.
- Renamed the local Cove hostname from `https://doodle.localhost/` to
  `https://doodlea.localhost/`.
- Renamed the local repository folder from
  `/Users/mybbor/Library/CloudStorage/Dropbox/websites/doodle.day` to
  `/Users/mybbor/Library/CloudStorage/Dropbox/websites/doodlea.day`; Cove's
  `doodlea.localhost` public symlink points at the new folder.
