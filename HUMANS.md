# Human Notes

## Last Accessed
- Date: 2026-06-30
- Agent harness: Codex
- Harness project/session name: Daily sketch and doodle lessons
- Local path: `/Users/mybbor/Library/CloudStorage/Dropbox/websites/doodlea.day`

### 2026-06-26 — Doodlea.day went live on Andromeda/Caddy + Plausible
- Final domain chosen: **doodlea.day** (doodle.day was the earlier name; the local
  folder was renamed doodle.day -> doodlea.day, remote is the `doodlea.day` repo).
- Deploy is **Andromeda droplet + Caddy** (NOT Cloudflare Pages — that workflow was
  replaced). `.github/workflows/deploy.yml` now SSHes in and `git pull`s
  `/var/www/doodlea.day` on push to main, exactly like sketcha.day. Caddy serves the
  repo root. See `DEPLOYMENT.md` and `~/Dropbox/AI/andromeda/AGENTS.md`.
- GitHub secrets set: SSH_HOST/SSH_USER/SSH_PRIVATE_KEY (deploy key
  `github-actions-doodlea.day`, authorized in the server's authorized_keys).
- DNS: doodlea.day + www A records -> 138.68.248.95, **grey-cloud** (optional future:
  set zone SSL to Full (strict) then orange-cloud, per andromeda proxy policy).
- Analytics: self-hosted Plausible. Tag added to every page in
  `scripts/build-tutorials.mjs` (`data-domain` follows SITE_URL). Site registered in
  Plausible (site_id 13, owner mybbor@gmail.com); ingestion verified in ClickHouse.
  One test pageview from setup may show in stats.

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
- Updated the daily automation guidance: until the owner says otherwise, each
  scheduled run should create two tutorials per sister site: one current daily
  tutorial and one honest backdated archive tutorial for Doodlea.day, plus the
  same current/backdated pair for Sketcha.day.
- Added the cartoon coconut drink as the June 26, 2026 / Day 007 tutorial from
  a reviewed six-panel generated marker contact sheet. Finished image rating:
  8.7/10. The desktop headline was split across three lines after browser QA
  caught right-edge clipping.
- Added the watermelon wedge doodle as the June 20, 2026 / Day 001 backdated
  archive tutorial. Existing Doodlea day labels shifted forward, so the June 26
  coconut drink is Day 007. Finished image rating: 8.6/10.
- June 26 QA used `python3 scripts/check-tutorial-readiness.py
  cartoon-coconut-drink` and `python3 scripts/check-tutorial-readiness.py
  watermelon-wedge-doodle`, reviewed step sheets at
  `/tmp/cartoon-coconut-drink-steps.jpg` and
  `/tmp/watermelon-wedge-doodle-steps.jpg`, and captured Cove browser QA
  screenshots at `/tmp/doodlea-*-rerun.png` plus
  `/tmp/doodlea-home-desktop-headline-fixed.png`.
- The temporary two-tutorial-per-site backfill cadence is still active until the
  owner says otherwise.
- Heading-fit follow-up on June 27, 2026: tutorial hero headings now render
  word-level spans inside non-wrapping manual lines, with the marker underline
  attached to the final meaningful word rather than the whole line. The
  generator appends `?v=20260627-heading-fit` to `styles.css` so deployed pages
  load the corrected headline CSS.
- The skateboard sticker hero now renders as `skateboard` / `sticker` instead
  of breaking after the letter `a`; the underline lands under `sticker`.
- `DAILY-PUBLISHING.md` now requires a rendered page-layout rating of at least
  8/10 before publishing. The gate specifically rejects one-character headline
  breaks, stranded articles, bad underline placement, overflow, clipped type,
  and awkward mobile hero composition.
- June 27 heading QA checked every generated tutorial on Doodlea.day and
  Sketcha.day at desktop and mobile widths: 60 page/viewport combinations, zero
  heading failures. Screenshot examples live under
  `/tmp/heading-fit-qa-2026-06-27/`.
- Added two Doodlea.day lessons on June 26, 2026: `cartoon-coconut-drink` as
  the current June 26 / Day 007 marker tutorial, and
  `watermelon-wedge-doodle` as an honest backdated June 20 / Day 001 archive
  tutorial. Existing Doodlea day labels shifted forward by one.
- Finished image ratings: coconut drink 8.8/10 for strong marker texture,
  readable face/straw/umbrella, and clear process fit; watermelon wedge 8.9/10
  for bold sticker-like shape, bright color, and simple teachable steps.
- June 26 QA used `python3 scripts/check-tutorial-readiness.py
  cartoon-coconut-drink` and `python3 scripts/check-tutorial-readiness.py
  watermelon-wedge-doodle`, reviewed `/tmp/cartoon-coconut-drink-steps.jpg` and
  `/tmp/watermelon-wedge-doodle-steps.jpg`, and saved Cove desktop/mobile
  screenshots under `/tmp/daily-sketch-doodle-qa-final/`.
- The temporary two-tutorial-per-site cadence remains active until the owner
  says otherwise.
- Standing instruction added June 26, 2026: Doodlea.day and Sketcha.day should
  stay near mirror images for style and structure. Unless the owner explicitly
  says otherwise, apply layout, component, navigation, responsive, build-structure,
  and interaction-pattern changes to both sibling repos.
- Shared styling update on June 26, 2026: both sites now use the split
  `How to draw...` headline treatment, a subject-colored underline stroke,
  matched CTA hover movement/shadows, animated nav-link hover underlines, and a
  fixed library-card hover rule that also applies to the final card.
- Added generated cartoon material icons on June 26, 2026 under
  `assets/material-icons/`. The pages use compressed WebP icons for pencil,
  paper, eraser, colored pencils, marker, and marker sets; Doodlea's generator
  maps black marker to the marker icon and colored/optional markers to the
  marker-set icon.
- Search/favicon follow-up on June 26, 2026: `scripts/build-tutorials.mjs` now
  emits a plain `/favicon.ico` fallback plus explicit 16x16, 32x32, 48x48, 180x180
  Apple, and 512x512 site-icon links. Google Search Console may still lag until
  Google recrawls the home page and favicon.
- Newsletter follow-up on June 26, 2026: Doodlea.day now mirrors Sketcha.day's
  manual-interest newsletter section. The disabled form remains a placeholder,
  and the public interest link is
  `mailto:hello@doodlea.day?subject=Doodlea.day%20daily%20email%20interest`.
- Added the skateboard sticker doodle as the June 27, 2026 / Day 009 marker
  tutorial from a reviewed six-panel generated contact sheet. Finished image
  rating: 8.8/10.
- Added the goofy monster face as the June 19, 2026 / Day 001 backdated archive
  tutorial. Existing Doodlea day labels shifted forward by one. Finished image
  rating: 9.0/10.
- June 27 QA used `python3 scripts/check-tutorial-readiness.py
  skateboard-sticker-doodle` and `python3 scripts/check-tutorial-readiness.py
  goofy-monster-face`, reviewed step sheets at
  `/tmp/skateboard-sticker-doodle-steps.jpg` and
  `/tmp/goofy-monster-face-steps.jpg`, and saved Cove browser desktop/mobile
  screenshots under `/tmp/daily-sketch-doodle-qa-2026-06-27/`.
- The temporary two-tutorial-per-site backfill cadence is still active until the
  owner says otherwise.
- Added three private `lab.html` Doodlea.day logo color variations for review:
  button-magenta wordmark, newsletter-green wordmark, and a hard-shadow badge
  treatment using the button shadow language. This was intentionally not mirrored
  to Sketcha.day because it is a Doodlea-only brand-color experiment.
- Recreated the `smiling-pizza-slice-doodle` lesson art as a v2 generated
  contact sheet because the previous sequence introduced the cheese stretch too
  late. The new step 2 introduces the cheese stretch before step 3 inks the
  full outline, and step 5 now only fills existing shapes.
- Added a shared process-plan guardrail: frames that darken, ink, fill, color,
  shade, clean, or clarify existing elements may use `requires_prior_elements`,
  and `scripts/check-process-plan.py` now fails when those elements were not
  introduced in earlier frames.
- Varied the final-step wording across all active Doodlea.day lessons so the
  tutorials no longer repeat "Punch up..." or the same "Go back over..." phrasing.
  The final-step technique remains the same, but titles and copy now fit each
  subject, such as "Make the burst sparkle," "Polish the trophy shine," and
  "Bolt down the finish." `DAILY-PUBLISHING.md` now asks future lessons to keep
  final-step language subject-specific.
- Added the cassette tape sticker as the June 28, 2026 / Day 011 marker tutorial
  from a reviewed six-panel generated marker contact sheet. Finished image
  rating: 8.8/10.
- Added the smiling cloud doodle as the June 18, 2026 / Day 001 backdated archive
  tutorial. Existing Doodlea day labels shifted forward by one. Finished image
  rating: 8.7/10.
- June 28 QA used `python3 scripts/check-tutorial-readiness.py
  cassette-tape-sticker` and `python3 scripts/check-tutorial-readiness.py
  smiling-cloud-doodle`, reviewed step sheets at
  `/tmp/cassette-tape-sticker-steps.jpg` and
  `/tmp/smiling-cloud-doodle-steps.jpg`, and saved browser QA screenshots under
  `/tmp/daily-sketch-doodle-qa-2026-06-28/`.
- The temporary two-tutorial-per-site backfill cadence is still active until the
  owner says otherwise.
- Added the comic camera flash doodle as the June 29, 2026 / Day 013 marker
  tutorial from a reviewed six-panel generated marker contact sheet. Finished
  image rating: 8.7/10.
- Added the rainbow lightning bolt badge as the June 17, 2026 / Day 001
  backdated archive tutorial. Existing Doodlea day labels shifted forward by
  one. Finished image rating: 8.8/10.
- June 29 QA used `python3 scripts/check-tutorial-readiness.py
  comic-camera-flash-doodle` and `python3 scripts/check-tutorial-readiness.py
  rainbow-lightning-bolt-badge`, reviewed step sheets at
  `/tmp/comic-camera-flash-doodle-steps.jpg` and
  `/tmp/rainbow-lightning-bolt-badge-steps.jpg`, and saved Cove browser QA
  screenshots under `/tmp/daily-sketch-doodle-qa-2026-06-29/`.
- The temporary two-tutorial-per-site backfill cadence is still active until the
  owner says otherwise.
- Refined Doodlea material cards on June 29, 2026: replaced the cropped black
  marker icon, added `assets/material-icons/white-gel-pen-v1.webp`, mapped
  gel-pen supplies to their own icon, and updated `DAILY-PUBLISHING.md` so
  future lessons do not list an optional white gel pen by default.
- Promoted the cartoon asteroid doodle as the June 30, 2026 / Day 016 marker
  tutorial from a reviewed six-panel generated marker contact sheet. Finished
  image rating: 8.9/10.
- Moved the comic chat bubble doodle into the honest backfill sequence as
  June 15, 2026 / Day 001 after the owner chose the asteroid/meteor as today's
  doodle. Existing Doodlea day labels shifted forward by one.
- The smiling envelope sticker is now the June 16, 2026 / Day 002 honest
  backdated archive tutorial after the chat bubble moved into the June 15 slot.
  Finished image rating: 8.6/10.
- June 30 QA used `python3 scripts/check-tutorial-readiness.py
  cartoon-asteroid-doodle`, `python3 scripts/check-tutorial-readiness.py
  comic-chat-bubble-doodle`, and `python3 scripts/check-tutorial-readiness.py
  smiling-envelope-sticker`, reviewed step sheets at
  `/tmp/cartoon-asteroid-doodle-steps.jpg`,
  `/tmp/comic-chat-bubble-doodle-steps.jpg` and
  `/tmp/smiling-envelope-sticker-steps.jpg`, and saved Cove browser
  desktop/mobile screenshots under `/tmp/doodlea-meteor-switch-qa-2026-06-30/`
  for the switch.
- Mobile QA caught and fixed the envelope headline by splitting it as
  `a smiling` / `envelope` / `sticker`.
- Mobile QA also caught and fixed the asteroid headline by splitting it as
  `a cartoon` / `asteroid` / `doodle`.
- The temporary two-tutorial-per-site backfill cadence is still active until the
  owner says otherwise.
