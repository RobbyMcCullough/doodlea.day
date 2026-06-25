# Human Notes

## Last Accessed
- Date: 2026-06-24
- Agent harness: Codex
- Harness project/session name: Doodle.day local sister site
- Local path: `/Users/mybbor/Library/CloudStorage/Dropbox/websites/doodle.day`

## Project Context
- Parent project: Daily drawing prompt/tutorial websites
- Sister project: `/Users/mybbor/Library/CloudStorage/Dropbox/websites/sketcha.day`
- Domain: `doodle.day`
- Local Cove URL: `https://doodle.localhost/`

## Return Notes
- Doodle.day is a local sibling to Sketcha.day with the same generated-page
  structure and visual system.
- The difference is lesson medium and subject direction: Doodle.day should focus
  on thick-stroke, colorful, marker-based cartoon/comic doodles.
- First local lesson is `hot-rod-marker-flames`, promoted from the Sketcha.day
  private marker-flames draft.
- Build with `node scripts/build-tutorials.mjs`.
- Production build with `npm run build:production`; Cloudflare Pages should
  deploy `dist/`.
- QA with `python3 scripts/check-tutorial-readiness.py hot-rod-marker-flames`.
- Prefer `https://doodle.localhost/` for local Cove QA; fallback server is
  `python3 -m http.server 4174`.
- Future automation should create one Sketcha lesson and one Doodle lesson each
  day. Once the GitHub/Cloudflare deployment path is connected, normal daily
  Doodle lessons may push after passing the Doodle quality gates.
