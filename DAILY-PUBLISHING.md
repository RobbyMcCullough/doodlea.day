# Daily Publishing Guide

This is the quality contract for Doodlea.day lessons.

## Principle

The tutorial must convincingly produce the finished marker doodle. The final
image should not add major shape, color, contour, lettering, props, or rendering
that did not appear in a prior process frame.

Late-stage actions must work only on elements that are already present. A frame
that thickens, inks, darkens, fills, colors, shades, cleans, or clarifies a
shape may not be the first frame where that shape appears. For example, a pizza
lesson cannot add a cheese stretch in the color step after an earlier step
already told the reader to thicken the full outline.

## Doodle Direction

- Favor cartoons, comic-style marks, icons, expressive symbols, playful
  lettering forms, and bold abstract shapes.
- Avoid "sticker" and "badge" framing (owner direction, 2026-07-04): no
  sticker/badge lesson titles, die-cut borders, badge frames, or sticker-style
  outlines around the subject. Existing published sticker lessons stay, but new
  lessons should draw the subject itself.
- Do not append "doodle" to the public lesson name, H1 search phrase, or page
  title by default. The site and art direction already communicate Doodlea's
  marker-doodle focus; use direct names such as "how to draw a fried chicken
  drumstick" unless "doodle" is truly part of the subject being searched.
- Use thick black marker outlines and saturated marker fills.
- Keep the process fast: usually 10-20 minutes and 5-7 steps.
- Calibrate the public difficulty label to the actual drawing load; do not
  default every lesson to Easy. Use **Easy** for a single dominant silhouette
  with a few forgiving additions, **Intermediate** for multiple interacting
  forms, layering, expressions, repeating details, or coordinated color areas,
  and **Challenge** for perspective or ellipse control, lettering, complex
  overlap, or several precise feature relationships. Before choosing a new
  current lesson, check the last five current Doodlea lessons: when the last
  two share a tier, prefer a viable subject in a different tier. Across a
  rolling seven current lessons, include at least two tiers and aim to use all
  three when the available subjects support them. Never inflate a simple idea
  or force a hard one just to satisfy the pattern; the actual drawing load still
  decides the final label.
- Treat each tutorial as a suggested path, not a fixed design. Doodlea should
  encourage playful changes to faces, colors, patterns, accents, expressions,
  and small props when those changes keep the drawing clear and teachable.
- Include creative-permission language naturally in some lesson intros, tips, or
  closing steps. The tone should say "try it this way, then make it yours"
  without weakening the step-by-step instruction.
- Include practical art technique in the written steps and tips, not only
  object assembly. Each new lesson should teach at least one transferable
  marker or drawing skill that helps the reader improve: ghosting a long curve
  before touching the marker down, drawing a light construction pass before the
  bold outline, rotating the page for a smoother stroke, pulling marker strokes
  in the direction of the form, leaving intentional highlight gaps, letting wet
  marker areas dry before a second pass, comparing negative spaces, or varying
  pressure and line weight.
- Technique advice must be actionable and tied to the current step. Prefer
  specific coaching such as "ghost the swoop twice, then pull the marker in one
  confident pass" or "fill from the edge inward so the streaks follow the
  noodle curve" over generic encouragement like "take your time" or "add
  details."
- Let marker streaks and imperfect outlines show. Avoid glossy vector-perfect
  symmetry, airbrush gradients, photorealism, and quiet pencil-sketch finishes.
- Use color as part of the lesson, not as a decorative final-only surprise.
- Vary the materials list to fit the actual doodle. Do not add "Optional white
  gel pen" by default; include a white gel pen only when the steps explicitly
  use white highlights, shine, sparkles, or crisp eye details. When a lesson
  needs both outline and fill colors, it is fine to list "Black and colored
  markers" instead of repeating separate black-marker and color-marker rows.
- Give each lesson's final step subject-specific wording. The technique can
  stay consistent, usually reinforcing existing black outlines, marker fills,
  small highlights, and edge cleanup, but avoid repeating generic titles like
  "Punch up..." or copy that starts every final step with the same phrase.
  Make the final step feel like it belongs to that doodle: a firework can
  sparkle, a trophy can polish, a robot can bolt down, and a monster can wake up
  its expression.
- Vary character faces aggressively across recent lessons. Before accepting a
  new face-bearing doodle, compare it against the last several face-bearing
  lessons and change at least two visible expression features: eye shape, eye
  size, eye spacing, pupil direction, eyebrows, cheek marks, mouth shape, teeth,
  tongue, wink, asymmetry, or head tilt. Avoid repeatedly using the same two-dot
  eyes plus small U-smile, especially on simple objects such as chat
  bubbles, controllers, envelopes, cameras, clouds, and food.

## Routine

1. Until the owner says otherwise, create two Doodlea.day tutorials per run:
   one new current daily tutorial and one honest backdated archive tutorial.
   Coordinate with the Sketcha.day sister track, which should also create one
   current daily tutorial and one backdated tutorial in the same run. Keep
   backdated lessons honest in public copy: no invented traffic, comments,
   popularity, or fake community activity.
2. Before choosing subjects or making art, acquire the cross-site daily run lock.
   This is the mutex that prevents two automation runs from both passing the
   duplicate-slot guard before either has committed:

```sh
python3 scripts/daily-publish-lock.py acquire --current-date YYYY-MM-DD
```

   Save the printed lock token and pass it to every
   `preflight-image-generation.py` call in this run. Release the lock after the
   successful commit/push, or immediately when the run stops:

```sh
python3 scripts/daily-publish-lock.py release --token LOCK_TOKEN
```

3. Run the duplicate-slot guard:

```sh
python3 scripts/check-daily-publish-slots.py --current-date YYYY-MM-DD
```

   If the current date is already occupied, stop. Do not validate, replace, or
   add another same-day pair unless the owner explicitly asked for a correction.
   For a correction, rerun the guard with the matching
   `--allow-existing-current-slug` or `--allow-existing-backfill-slug` flag and
   keep the work scoped to that existing slug.
4. Do a quick source check for timely hooks before choosing the subject:
   current news, major sports, holidays, seasons, cultural moments, and daily
   observances. Use a timely idea only when it naturally fits Doodlea.day's bold
   marker style, can be taught as an attainable doodle, and does not duplicate
   the sister Sketcha.day subject for the same run. Do not force a weak trend.
   Include the Google Trends "how to draw" rising-query check when the browser
   is available:

```text
https://trends.google.com/trends/explore?date=now%201-d&geo=US&q=how%20to%20draw&hl=en-US
```

   Stay on Classic Explore if prompted, use the United States / past day /
   Related queries / Rising card, and capture the visible or exported query
   text. To normalize it, save or pipe that text into:

```sh
python3 scripts/summarize-google-trends-rising.py /path/to/trends-text-or-export.txt
```

   Treat Trends as subject-research evidence, not as an automatic assignment.
   Keep only true drawing-intent queries (for example, reject medical, golf, or
   finance uses of "draw"), then still run the duplicate, sister-site fit, and
   preflight gates before generating art. If Google Trends blocks direct API or
   CSV access, the rendered page text is acceptable evidence for this source
   check.
5. Pick one specific marker-friendly subject, e.g. "how to draw hot rod marker
   flames", "how to draw a comic speech bubble", or "how to draw a goofy monster
   face." Do not append "doodle" to the public search phrase just because the
   lesson appears on Doodlea.day.
6. Back-check existing Doodlea.day lessons and avoid repeating shape/category
   problems too closely.
7. For face-bearing lessons, write the planned face variation into the prompt,
   lesson copy, and process plan. If the nearby archive already uses small dot
   eyes and a U-smile, pick a visibly different expression such as a wink,
   tongue-out grin, toothy smile, side-eye, raised brows, mismatched eyes, or
   cheeky smirk.
8. Lock the exact publish slugs before generating any image by running the
   mandatory pre-flight gate for each approved slug:

```sh
python3 scripts/preflight-image-generation.py --slug {slug} --current-date YYYY-MM-DD --lock-token LOCK_TOKEN
```

   The gate fails when unresolved generated art exists in `drafts/`
   (`drafts/LEDGER.json`), when the slug is already published, or when the
   daily slot is taken, or when the run-level daily publishing lock is missing
   or owned by another process. It records the slug lock in the ledger. A normal
   run generates art only for the locked current slug and locked backfill slug.
   Do not create speculative contact sheets, backup subjects, or alternate
   directions. If generated art ends up unused, resolve its ledger entry
   before any new generation: promote it into a validated tutorial, set a
   `rejected-quality`/`rejected-duplicate` status with a note (and mirror the
   reasoning in `HUMANS.md`), set a `scheduled` status with a `release_date`,
   or get owner direction. Prefer repairing a failed panel (see
   `PROCESS-IMAGE-WORKFLOW.md`) over replacing the whole subject; a subject
   swap after failed art is itself a rejection that must be recorded.
9. Write `lesson-plans/{slug}.json` from the template pattern before publishing.
   Any frame that darkens, inks, fills, colors, shades, cleans, or clarifies
   existing parts must list those parts in `requires_prior_elements`, and each
   listed part must have an earlier `introduced_by_step`.
10. Generate one raster process contact sheet first. No labels, arrows, numbers,
   signatures, watermarks, or fake UI.
11. Save the approved contact sheet under `drafts/`, crop it into `assets/`, and
   use the final panel as the finished image.
12. Rate the saved finished image. It must be at least 8/10 for readability,
   character, marker quality, tutorial fit, composition, and difficulty balance.
13. Add lesson data to `scripts/build-tutorials.mjs`, run the generator, then
   build the delivery images: `python3 scripts/build-image-derivatives.py`
   (WebP served by pages; the JPGs stay as reviewed masters) and
   `python3 scripts/make-social-cards.py` (1200x630 Open Graph cards). Both
   are idempotent and also run inside the readiness check. Commit them with
   the lesson, then run:

```sh
python3 scripts/check-tutorial-readiness.py {slug}
```

   That command also validates `drafts/LEDGER.json`; after a lesson publishes,
   its ledger entry must read `published` (the next pre-flight heals this
   automatically when the tutorial page exists).

14. QA `https://doodlea.localhost/`, `https://doodlea.localhost/library.html`, and
   `https://doodlea.localhost/tutorials/{slug}.html` at desktop and mobile widths.
15. Rate the rendered homepage and tutorial page layout at desktop and mobile
   widths. It must score at least 8/10 before publishing.
16. Commit when checks pass. Once the GitHub/Cloudflare deployment path is
   connected, routine daily Doodlea.day lessons may push after all quality gates
   pass.

## Page Layout Rating Gate

Before a lesson can be committed or published, rate the rendered homepage and
tutorial page layout on a 10-point scale at desktop and mobile widths. The page
layout must score at least 8/10. If it scores below 8, fix the layout or
headline data before continuing.

Score the layout against these criteria:

- The hero heading is readable and intentional at both breakpoints.
- No line breaks after a single letter or stranded article such as "a".
- Manual headline lines do not wrap internally; reduce the headline line size
  or choose a better `headlineSubject` break instead.
- The marker underline lands under a real word, not under whitespace,
  punctuation, or a weak connector such as "on", "in", "of", or "a".
- The hero art, CTA, date, time, difficulty, and intro sit in a balanced
  composition without overlap or awkward empty space.
- The page has no horizontal overflow, clipped headline text, broken navigation,
  missing images, or obvious mobile crowding.

Reject pages with broken display type, lonely one-character lines, underlines
that miss the intended word, image/card collisions, clipped hero art, or any
layout that makes the lesson feel less polished than the current site standard.

## Stop Conditions

Stop instead of publishing when image generation is unavailable, the contact
sheet changes subject/pose between panels, a later outline/color/cleanup frame
introduces a shape that was not visible earlier, the final introduces major
elements, the saved final scores below 8/10, generated images do not load,
JSON-LD is invalid, `lab.html` loses `noindex,nofollow`, the rendered layout
scores below 8/10, a headline breaks after a single character, the marker
underline misses its target word, the duplicate-slot guard fails, a new face
repeats a recent default two-dot/U-smile expression without a clear reason, or
validation fails.
