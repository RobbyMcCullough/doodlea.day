# Human Notes

## Last Accessed
- Date: 2026-07-10
- Agent harness: Codex
- Harness project/session name: Daily sketch and doodle lessons
- Local path: `/Users/mybbor/Library/CloudStorage/Dropbox/websites/doodlea.day`
- Previous: 2026-07-09 / Codex / Daily sketch and doodle lessons

### 2026-07-04 — Mirrored Sketcha.day workflow + SEO upgrades (Cowork)
- Mirrored the same-day Sketcha.day changes per the sister-site parity rule.
- New hard gates against unused generated art: `drafts/LEDGER.json` (27
  entries, all published), `scripts/check-drafts-ledger.py` (runs inside
  readiness), and `scripts/preflight-image-generation.py` (mandatory before
  ANY image generation; locks the slug, blocks while unresolved art exists).
- Images: pages serve WebP derivatives of the JPG masters
  (`scripts/build-image-derivatives.py`, ~36MB -> ~10MB) plus 1200x630 Open
  Graph cards at `assets/social/` (`scripts/make-social-cards.py`).
  `check-process-plan.py` maps page `.webp` back to `.jpg` masters.
- SEO: image-sitemap entries per lesson, prev/next daily-doodle links on
  tutorial pages, hero preload + `fetchpriority="high"`, og:image
  width/height/alt, IndexNow ping in `deploy.yml`
  (`scripts/submit-indexnow.py`, key file at site root).
- Also fixed a stretched library archive-sheet bug both sites shared
  (`.archive-sheet img` needed `height: auto` once width/height attributes
  were added) and updated AGENTS.md's stale Cloudflare/dist deployment note
  to match `DEPLOYMENT.md` (Caddy serves the repo root).
- Full readiness passed: `check-tutorial-readiness.py
  cartoon-barbecue-grill-doodle` (fallback server QA).
- Owner-requested polish: pagination links restyled to the ink-border/
  hard-shadow button language, newsletter margin, and a `fitHeadlineLines()`
  routine in `script.js` that shrinks hero headline lines that would overlap
  the hero art (the barbecue grill page was overlapping).
- Owner direction (2026-07-04): avoid "sticker"/"badge" framing for new
  lessons — no sticker titles, die-cut borders, or badge frames. Recorded in
  `AGENTS.md` and `DAILY-PUBLISHING.md`; existing sticker lessons stay.

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
- 2026-07-11 difficulty calibration: replaced the catalog-wide default `Easy`
  metadata with 12 Easy, 23 Intermediate, and 7 Challenge lessons. The
  Challenge tier now covers the pool float, barbecue grill, bubble-letter WOW,
  whoopee cushion, arcade joystick, cassette tape, and skateboard; the
  whoopee cushion was specifically reclassified for its asymmetrical form,
  face, puffs, wrinkles, layered color, and highlight work. The new Doodlea
  publishing rule explains how future lessons should choose a tier rather than
  defaulting to Easy. Rebuilt pages and verified the labels through Cove.
- 2026-07-11 daily automation prepared two Doodlea lessons: current
  `cartoon-surfboard` (July 11 / Day 042) and honest archive
  `cartoon-popcorn-bucket` (May 31 / Day 001). Existing day labels shifted
  forward by one for the archive insertion. Both use reviewed six-panel raster
  marker contact sheets; final ratings: surfboard 8.8/10 (bold, legible
  silhouette with staged leash/waves/color) and popcorn 8.6/10 (clean bucket →
  kernels → ink/stripes → color sequence with visible marker texture).
- The normal duplicate guard, contact-sheet crop, process-plan/delta checks,
  image derivatives, social cards, readiness checks, Cove link checks, JSON-LD,
  unused-assets check, and desktop/mobile no-overflow checks passed. Hero WebP
  images were confirmed at 1254×1254 in the local browser. The temporary
  two-tutorial-per-site backfill cadence remains active.
- The shared preflight script now supports an exact
  `--allow-existing-current-slug` escape hatch, forwarded to the duplicate
  guard, so the same run can safely generate its archive lesson after its
  validated current lesson. The matching change was mirrored in Sketcha.day.
- Owner approved the combined local work for deployment. It was committed and
  pushed to `main` as `5caaf56` (`Publish July 11 doodle lessons and site
  polish`), so the site's normal production deploy should now run.
- 2026-07-10 About-story refresh: replaced the generated About copy with the
  owner's more personal version about the cowboy-hat birthday-card origin,
  Robby and Tracie's roles, the sister-site distinction, and the family joy
  signoff. Rebuilt the site; changes remain local pending owner review.
- 2026-07-10 public brand-casing pass: normalized every public `doodlea.day`
  and `sketcha.day` reference to lowercase in the generator, production-build
  log, and static lab, then rebuilt all 40 tutorials plus homepage, library,
  About, feed, sitemap, and robots output. A zero-uppercase audit and JSON-LD/
  XML validation passed; internal documentation and history remain unchanged.
- 2026-07-10 local review work: mirrored the Sketcha.day library-grid polish.
  Owner feedback softened the reveal to an 8px rise, +/-1deg swing, 1px
  overshoot, 620ms settle, and overlapping 35ms stagger. Hover now uses a
  gentler 6px lift and art/arrow response with no shadow change. Reduced-motion
  and no-JavaScript fallbacks remain intact. Changes are intentionally
  uncommitted pending owner review. A follow-up moved resting card tilts into a
  CSS custom property so every fourth card now receives the same hover and
  keyboard-focus transform as its neighbors.
- 2026-07-10 daily automation added two Doodlea lessons:
  `cartoon-french-fries` as July 10, 2026 / Day 040 and
  `cartoon-pencil-shavings` as June 1, 2026 / Day 001 honest archive backfill.
  Existing day labels shifted forward by one.
- July 10 Doodlea QA used the cross-site daily lock, duplicate-slot guard,
  preflight slug locks, contact-sheet cropping, `node scripts/build-tutorials.mjs`,
  and `python3 scripts/check-tutorial-readiness.py` for both new slugs. Cove
  HTTPS still hit `ERR_CERT_DATE_INVALID` in the browser, so rendered desktop/
  mobile QA used `http://127.0.0.1:4174/`; screenshots are under
  `/tmp/daily-sketch-doodle-qa-2026-07-10/`.
- Finished image ratings: cartoon french fries 8.8/10 for bold face-free carton
  readability, stable fry/carton process, and strong marker texture; cartoon
  pencil with shavings 8.6/10 for clear pencil/eraser/shaving readability,
  corrected wide-grid process cropping, and no sticker/badge framing. The
  temporary two-tutorial-per-site backfill cadence is still active until the
  owner says otherwise.
- 2026-07-09 owner-directed correction: rebuilt `cartoon-stapler` from a new
  reviewed six-panel raster marker contact sheet. Step 1 is now explicitly a
  pale, doubled construction guide and step 2 traces that same silhouette;
  the dark staple slot introduced in step 4 remains visible in steps 5 and 6.
  Kept the prior raw sheet as
  `drafts/cartoon-stapler/cartoon-stapler-contact-sheet-original-2026-07-09.png`.
  Readiness, process-plan, step-delta, Cove, and desktop/mobile QA passed;
  the new finished image is rated 8.8/10 for marker readability, a stable
  construction-to-finish sequence, and a clearly retained slot.
- 2026-07-09 daily automation added two Doodlea lessons:
  `soccer-whistle` as July 9, 2026 / Day 038 and `cartoon-stapler` as June 2,
  2026 / Day 001 honest archive backfill. Existing day labels shifted forward
  by one.
- July 9 Doodlea QA used the cross-site daily lock, duplicate-slot guard,
  preflight slug locks, contact-sheet cropping, `node scripts/build-tutorials.mjs`,
  and `python3 scripts/check-tutorial-readiness.py` for both new slugs. Cove
  HTTPS responded but browser QA hit the local certificate issue, so rendered
  desktop/mobile QA used `http://localhost:4174/`; screenshots are under
  `/tmp/daily-sketch-doodle-qa-2026-07-09/`.
- Finished image ratings: soccer whistle 8.7/10 for bold face-free whistle
  readability, mouthpiece/window/loop/sound marks, and marker texture; cartoon
  stapler 8.6/10 for clear stacked body, hinge, staple slot, feet, bright
  marker fill, and no sticker/badge framing. The temporary
  two-tutorial-per-site backfill cadence is still active until the owner says
  otherwise.
- 2026-07-08 concurrency fix: added `scripts/daily-publish-lock.py`, a
  cross-site atomic lock shared through the sibling parent folder. Future daily
  runs must acquire it before subject selection, pass the printed token to every
  `scripts/preflight-image-generation.py --lock-token ...` call, and release it
  after commit/push or any stop condition. Preflight now fails before art
  generation when the token is missing or owned by another run.
- 2026-07-08 daily automation added two Doodlea lessons:
  `cartoon-alarm-clock` as July 8, 2026 / Day 036 and
  `cartoon-toothbrush` as June 3, 2026 / Day 001 honest archive backfill.
  Existing day labels shifted forward by one.
- July 8 Doodlea QA used `python3 scripts/check-daily-publish-slots.py
  --current-date 2026-07-08`, preflight slug locks, contact-sheet cropping, and
  `python3 scripts/check-tutorial-readiness.py` for both new slugs. Cove
  rendered desktop/mobile QA passed at `https://doodlea.localhost/`; screenshots
  are under `/tmp/daily-sketch-doodle-qa-2026-07-08/`.
- Finished image ratings: cartoon alarm clock 8.8/10 for bold face-free clock
  readability, clear bells/hands/ticks, marker fills, and stable process;
  cartoon toothbrush 8.6/10 for clear handle/head/bristles, droplets, bright
  marker color, and no face/sticker framing. A generated `soccer-cleat` draft
  sheet was recorded as rejected-duplicate because the July 8 current slot was
  already occupied by `cartoon-alarm-clock` before publication. The temporary
  two-tutorial-per-site backfill cadence is still active until the owner says
  otherwise.
- 2026-07-08 trend-source update: `DAILY-PUBLISHING.md` now requires the
  Google Trends "how to draw" / United States / past day / Rising related
  queries check when the browser is available. Use
  `scripts/summarize-google-trends-rising.py` to normalize copied or exported
  Trends text, keep only true drawing-intent rows, and still run duplicate,
  sister-site fit, and preflight gates before generating art.
- 2026-07-07 owner guidance update: `DAILY-PUBLISHING.md` now requires future
  written lesson steps/tips to include actionable marker/drawing techniques
  such as ghosting, light construction passes, page rotation, directional
  marker strokes, intentional highlight gaps, drying/layering behavior,
  negative-space checks, and line-weight control.
- 2026-07-07 daily automation added two Doodlea lessons:
  `bowl-of-macaroni` as July 7, 2026 / Day 034 and `magic-wand-sparkle` as
  June 4, 2026 / Day 001 honest archive backfill. Existing day labels shifted
  forward by one.
- July 7 Doodlea QA used `python3 scripts/check-daily-publish-slots.py
  --current-date 2026-07-07`, preflight slug locks, contact-sheet cropping,
  `python3 scripts/check-tutorial-readiness.py` for both new slugs, and Cove
  rendered desktop/mobile QA at `https://doodlea.localhost/`. Screenshots are
  under `/tmp/daily-sketch-doodle-qa-2026-07-07/`.
- Finished image ratings: bowl of macaroni 8.7/10 for bold marker readability,
  clear elbow-noodle construction, and no face/sticker framing; magic wand
  sparkle 8.5/10 for clean star/wand/sparkle progression and strong marker
  color. The temporary two-tutorial-per-site backfill cadence is still active
  until the owner says otherwise.
- 2026-07-06 s'more art correction: replaced the
  `graham-cracker-smore-doodle` contact sheet and cropped step/finished art
  because the prior panel 2 -> panel 3 transition required erasing part of the
  marshmallow to add chocolate. The new sequence draws the cracker stack, lays
  in the chocolate slab, then adds the marshmallow above it. The previous
  contact sheet is preserved under `drafts/graham-cracker-smore-doodle/`.
- 2026-07-06 earlier copy-only correction: updated `graham-cracker-smore-doodle` so
  the written steps reserve a chocolate strip before adding the chocolate
  layer, instead of asking the reader to draw chocolate under a completed
  marshmallow. This was superseded the same day by the art replacement above,
  which now draws chocolate before marshmallow. Updated
  `fried-chicken-drumstick-doodle` so the first curve is framed as a light
  guide that gets replaced by the bumpy crust, and so the late rectangular
  support is described as a paper wrapper rather than only a ground shadow.
- 2026-07-06 follow-up: removed the default "doodle" suffix from the public
  lesson names/search phrases for the newest lessons. `fried-chicken-drumstick-doodle`
  now titles as "How to Draw Fried Chicken Drumstick"; `cartoon-magnifying-glass-doodle`
  now titles as "How to Draw Magnifying Glass".
  Updated `AGENTS.md` and `DAILY-PUBLISHING.md` so future Doodlea lessons
  should not append "doodle" to public lesson names, H1s, or page titles unless
  it is truly part of the searched subject. Internal slugs can remain unchanged.
- 2026-07-06 daily automation added two Doodlea lessons:
  `fried-chicken-drumstick-doodle` as July 6, 2026 / Day 032 and
  `cartoon-magnifying-glass-doodle` as June 5, 2026 / Day 001 honest archive
  backfill. Existing day labels shifted forward by one.
- July 6 Doodlea QA used `python3 scripts/check-daily-publish-slots.py
  --current-date 2026-07-06`, an explicit allowed-current/backfill slot check
  for June 5 after the current lesson passed readiness, and
  `python3 scripts/check-tutorial-readiness.py` for both new slugs. Cove HTTPS
  returned 200 to curl but the in-app browser rejected the local certificate,
  so rendered desktop/mobile QA used the existing fallback server on
  `http://localhost:4174/`; screenshots are under
  `/tmp/daily-sketch-doodle-qa-2026-07-06/`.
- Finished image ratings: fried chicken drumstick doodle 8.8/10 for bold
  marker readability, crunchy texture, and no face/sticker framing; cartoon
  magnifying glass doodle 8.6/10 for clear rim/handle construction, bright
  marker fill, and mobile headline fit after a manual line-break fix. The
  temporary two-tutorial-per-site backfill cadence is still active until the
  owner says otherwise.
- 2026-07-05 daily automation added two Doodlea lessons:
  `graham-cracker-smore-doodle` as July 5, 2026 / Day 030 and
  `cartoon-pool-float-doodle` as June 6, 2026 / Day 001 honest archive
  backfill. Existing day labels shifted forward by one.
- July 5 Doodlea QA used `python3 scripts/check-daily-publish-slots.py
  --current-date 2026-07-05`, `python3 scripts/check-tutorial-readiness.py
  graham-cracker-smore-doodle`, and `python3 scripts/check-tutorial-readiness.py
  cartoon-pool-float-doodle`. Cove/internal checks passed, but the in-app
  browser rejected `https://doodlea.localhost/` with `ERR_CERT_DATE_INVALID`, so
  rendered desktop/mobile QA used the existing fallback server on
  `http://localhost:4174/`; screenshots are under
  `/tmp/daily-sketch-doodle-qa-2026-07-05/`.
- Finished image ratings: graham cracker s'more doodle 8.7/10 for bold marker
  layer readability and chocolate introduced before color/final cleanup;
  cartoon pool float doodle 8.8/10 for clear ring thickness, bright marker
  texture, and no sticker/badge framing. The temporary two-tutorial-per-site
  backfill cadence is still active until the owner says otherwise.
- 2026-07-04 owner-requested correction: replaced
  `cartoon-barbecue-grill-doodle` art and copy because the original looked like
  a domed lid was sitting behind the grate and flames. The revised lesson uses
  an open grill bowl, top rim, side handles, grate, flames, smoke, legs, wheels,
  and marker fill with no lid behind the fire.
- Correction QA used `python3 scripts/check-daily-publish-slots.py
  --current-date 2026-07-04 --allow-existing-current-slug
  cartoon-barbecue-grill-doodle`, `python3 scripts/check-tutorial-readiness.py
  cartoon-barbecue-grill-doodle --base-url http://localhost:4174/`, reviewed
  `/tmp/cartoon-barbecue-grill-doodle-steps.jpg`, and ran focused desktop/mobile
  browser QA under `/tmp/bbq-doodle-fix-qa-2026-07-04/`.
- Revised barbecue finished image rating: 9.0/10 for clear open-bowl structure,
  correct grate/flame placement, bold marker texture, and no misleading lid.
- 2026-07-04 daily automation added two Doodlea lessons:
  `cartoon-barbecue-grill-doodle` as July 4, 2026 / Day 028 and
  `cartoon-cactus-sticker` as June 7, 2026 / Day 001 honest archive backfill.
  Existing day labels shifted forward by one.
- July 4 Doodlea QA used `python3 scripts/check-daily-publish-slots.py
  --current-date 2026-07-04`, `python3 scripts/check-tutorial-readiness.py
  cartoon-barbecue-grill-doodle`, and `python3 scripts/check-tutorial-readiness.py
  cartoon-cactus-sticker`. The in-app browser rejected the Cove cert as
  `ERR_CERT_DATE_INVALID`, so rendered desktop/mobile QA used the existing
  fallback server on `http://localhost:4174/`; screenshots are under
  `/tmp/daily-sketch-doodle-qa-2026-07-04/`.
- Finished image ratings: cartoon barbecue grill doodle 8.9/10 for strong
  marker readability, stable kettle-grill process, and clear July 4 seasonal
  fit; cartoon cactus sticker 8.8/10 for bold face-free sticker shape, clean
  pot/stem/arm progression, and bright marker texture.
- The temporary two-tutorial-per-site backfill cadence is still active until
  the owner says otherwise.
- 2026-07-03 owner-requested image promotion: restored two previously unused
  cached generated contact sheets and published them as honest Doodlea archive
  backfills, with no new image generation: `beach-bucket-doodle` as June 8,
  2026 / Day 001 and `parade-drum-doodle` as June 9, 2026 / Day 002. Existing
  day labels shifted forward by two, so July 3 is now Day 026.
- The source sheets are preserved under `drafts/{slug}/`; cropped public
  assets are `assets/{slug}-step-1.jpg` through `step-5.jpg` and
  `assets/{slug}-finished-v1.jpg`. Finished image ratings: beach bucket doodle
  8.7/10; parade drum doodle 8.8/10.
- The generated card templates now use each lesson's `finishedAlt` for related
  and archive-strip thumbnails, fixing the empty-alt issue caught during
  browser QA. Desktop/mobile Cove QA for homepage, library, and the two new
  pages passed with no broken images, no horizontal overflow, valid JSON-LD,
  and no missing thumbnail alt text.
- The temporary two-tutorial-per-site backfill cadence is still active until
  the owner says otherwise. Future runs should treat generated but unused image
  sheets as a stop condition: promote them, document a rejection, or get owner
  direction before generating replacement subjects.
- 2026-07-03 unused-asset follow-up: removed stale public asset images that were
  not referenced by lesson data, generated pages, CSS, JSON, XML, or docs:
  `marker-flames-contact-sheet.png`, `smiling-pizza-slice-doodle-finished-v1.jpg`,
  and inherited `logo-pencil.svg`.
- Added `scripts/check-unused-assets.py` and wired it into
  `scripts/check-tutorial-readiness.py`, so future daily readiness checks fail
  if public `assets/` images are left unused. Draft contact sheets remain
  intentionally retained under `drafts/` as reviewed process sources.
- 2026-07-03 daily automation added two Doodlea lessons:
  `comic-firecracker-doodle` as July 3, 2026 / Day 024 and
  `beach-umbrella-badge` as June 10, 2026 / Day 001. Existing day labels
  shifted forward by one.
- July 3 Doodlea QA used `python3 scripts/check-daily-publish-slots.py
  --current-date 2026-07-03`, `python3 scripts/check-tutorial-readiness.py
  comic-firecracker-doodle --base-url http://localhost:4174/`, and
  `python3 scripts/check-tutorial-readiness.py beach-umbrella-badge --base-url
  http://localhost:4174/`. Browser screenshots are under
  `/tmp/daily-sketch-doodle-qa-2026-07-03/`.
- Finished image ratings: comic firecracker doodle 8.9/10 for strong marker
  readability, clean no-text fuse/spark sequence, and bold color; beach umbrella
  badge 8.8/10 for clear canopy construction, bright marker panels, and a
  simple teachable sequence.
- The temporary two-tutorial-per-site backfill cadence is still active until
  the owner says otherwise.
- 2026-07-02 cleanup follow-up promoted two previously unused generated images
  into Doodlea backfills: `red-white-blue-popsicle-badge` as June 11, 2026 /
  Day 001 and `cartoon-paint-splat-doodle` as June 12, 2026 / Day 002. Existing
  day labels shifted forward by two.
- Updated `DAILY-PUBLISHING.md` and `PROCESS-IMAGE-WORKFLOW.md` so future runs
  must lock exact slugs before image generation, must not generate speculative
  backup sheets, and must resolve any unused generated sheet before generating a
  different subject.
- Cleanup QA used `python3 scripts/check-tutorial-readiness.py
  red-white-blue-popsicle-badge --base-url http://localhost:4174/` and
  `python3 scripts/check-tutorial-readiness.py cartoon-paint-splat-doodle
  --base-url http://localhost:4174/`, plus rendered desktop/mobile browser QA
  under `/tmp/generated-image-cleanup-qa-2026-07-02/`. Finished image ratings:
  popsicle badge 8.5/10 for bold readable bands and simple process; paint splat
  8.8/10 for strong marker texture, clean silhouette, and clear step sequence.
- 2026-07-02 daily automation added two Doodlea lessons:
  `sunscreen-bottle-sticker` as July 2, 2026 / Day 020 and
  `bubble-letter-wow-doodle` as June 13, 2026 / Day 001. Existing day labels
  shifted forward by one.
- July 2 Doodlea QA used `python3 scripts/check-daily-publish-slots.py
  --current-date 2026-07-02`, `python3 scripts/check-tutorial-readiness.py
  sunscreen-bottle-sticker --base-url http://localhost:4174/`, and
  `python3 scripts/check-tutorial-readiness.py bubble-letter-wow-doodle
  --base-url http://localhost:4174/`. Cove HTTPS opened for script probes but
  the in-app browser rejected the local certificate, so rendered browser QA used
  the existing fallback server on `http://localhost:4174/`.
- Finished image ratings: sunscreen bottle sticker 8.8/10 for bold marker
  readability and varied wink expression; bubble-letter WOW doodle 8.7/10 for
  readable lettering, strong color, and teachable step progression.
- Browser QA screenshots for July 2 live under
  `/tmp/daily-sketch-doodle-qa-2026-07-02/`; mobile and desktop layouts passed
  with no horizontal overflow and valid JSON-LD. The temporary
  two-tutorial-per-site backfill cadence is still active until the owner says
  otherwise.
- 2026-07-01 follow-up: replaced the live `whoopee-cushion-sticker` art and
  steps with the preferred tongue-out/multiple-puff generated contact sheet,
  removing the disappearing pinched-center instruction. Also replaced the June
  14 backfill `cartoon-party-balloon-doodle` with
  `retro-arcade-joystick-sticker` after the owner preferred the generated game
  controller/joystick direction.
- Follow-up QA used `python3 scripts/check-tutorial-readiness.py
  whoopee-cushion-sticker` and `python3 scripts/check-tutorial-readiness.py
  retro-arcade-joystick-sticker`, plus Cove desktop/mobile title, image, and
  heading checks. Both passed.
- 2026-07-01 daily automation found the requested Doodlea current/backfill pair
  already present on `main` and matching `origin/main`: `whoopee-cushion-sticker`
  as July 1, 2026 / Day 018 and `cartoon-party-balloon-doodle` as June 14,
  2026 / Day 001. The run validated those lessons and did not add a duplicate
  whoopee or extra backfill subject.
- July 1 Doodlea QA used `python3 scripts/check-tutorial-readiness.py
  whoopee-cushion-sticker` and `python3 scripts/check-tutorial-readiness.py
  cartoon-party-balloon-doodle`, reviewed the saved contact sheets under
  `drafts/`, and captured Cove desktop/mobile screenshots under
  `/tmp/doodlea-july1-*`.
- Finished image ratings: whoopee cushion sticker 8.8/10 for bold marker
  readability and strong joke-day fit; cartoon party balloon doodle 8.7/10 for
  clear shapes, bright color, and a simple teachable sequence.
- The temporary two-tutorial-per-site backfill cadence is still active until the
  owner says otherwise.
- July 1, 2026 follow-up: added `scripts/check-daily-publish-slots.py` and
  updated `AGENTS.md`/`DAILY-PUBLISHING.md` so the daily automation stops before
  choosing subjects or generating art when the current publish date is already
  occupied. Intentional corrections must pass the exact
  `--allow-existing-current-slug` or `--allow-existing-backfill-slug` gate.
- Doodlea's daily publishing contract now also requires face-bearing lessons to
  vary expression details across recent doodles, avoiding repeated two-dot eyes
  plus a small U-smile unless there is a clear reason.
- The temporary two-tutorial-per-site backfill cadence is still active until the
  owner says otherwise.
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
- Added the whoopee cushion sticker as the July 1, 2026 / Day 018 marker
  tutorial and the cartoon party balloon doodle as the June 14, 2026 / Day 001
  honest backdated archive tutorial. Finished image ratings: whoopee cushion
  8.9/10, party balloons 8.7/10.
- July 1 QA used `python3 scripts/check-tutorial-readiness.py
  whoopee-cushion-sticker` and `python3 scripts/check-tutorial-readiness.py
  cartoon-party-balloon-doodle`, reviewed step sheets at
  `/tmp/whoopee-cushion-sticker-steps.jpg` and
  `/tmp/cartoon-party-balloon-doodle-steps.jpg`, and saved Cove browser
  desktop/mobile screenshots under `/tmp/daily-sketch-doodle-qa-2026-07-01/`.
- The temporary two-tutorial-per-site backfill cadence is still active until the
  owner says otherwise.
- Added creative-permission guidance to `DAILY-PUBLISHING.md` so future
  Doodlea lessons frame the steps as a suggested path and encourage playful
  personal choices.
- Sprinkled that tone into five existing lessons:
  `cartoon-asteroid-doodle`, `comic-chat-bubble-doodle`,
  `smiling-envelope-sticker`, `smiling-pizza-slice-doodle`, and
  `goofy-monster-face`.
- July 1 copy QA used `python3 scripts/check-tutorial-readiness.py {slug}
  --base-url http://localhost:4174/` for those five slugs after Cove was
  unreachable; all passed, and `git diff --check` passed.
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
