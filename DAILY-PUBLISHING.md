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

- Favor cartoons, comic-style marks, icons, badges, expressive symbols, playful
  lettering forms, and bold abstract shapes.
- Use thick black marker outlines and saturated marker fills.
- Keep the process fast: usually 10-20 minutes and 5-7 steps.
- Treat each tutorial as a suggested path, not a fixed design. Doodlea should
  encourage playful changes to faces, colors, patterns, accents, expressions,
  and small props when those changes keep the drawing clear and teachable.
- Include creative-permission language naturally in some lesson intros, tips, or
  closing steps. The tone should say "try it this way, then make it yours"
  without weakening the step-by-step instruction.
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

## Routine

1. Until the owner says otherwise, create two Doodlea.day tutorials per run:
   one new current daily tutorial and one honest backdated archive tutorial.
   Coordinate with the Sketcha.day sister track, which should also create one
   current daily tutorial and one backdated tutorial in the same run. Keep
   backdated lessons honest in public copy: no invented traffic, comments,
   popularity, or fake community activity.
2. Do a quick source check for timely hooks before choosing the subject:
   current news, major sports, holidays, seasons, cultural moments, and daily
   observances. Use a timely idea only when it naturally fits Doodlea.day's bold
   marker style, can be taught as an attainable doodle, and does not duplicate
   the sister Sketcha.day subject for the same run. Do not force a weak trend.
3. Pick one specific marker doodle subject, e.g. "how to draw hot rod marker
   flames", "how to draw a comic speech bubble", or "how to draw a goofy monster
   face."
4. Back-check existing Doodlea.day lessons and avoid repeating shape/category
   problems too closely.
5. Write `lesson-plans/{slug}.json` from the template pattern before publishing.
   Any frame that darkens, inks, fills, colors, shades, cleans, or clarifies
   existing parts must list those parts in `requires_prior_elements`, and each
   listed part must have an earlier `introduced_by_step`.
6. Generate one raster process contact sheet first. No labels, arrows, numbers,
   signatures, watermarks, or fake UI.
7. Save the approved contact sheet under `drafts/`, crop it into `assets/`, and
   use the final panel as the finished image.
8. Rate the saved finished image. It must be at least 8/10 for readability,
   character, marker quality, tutorial fit, composition, and difficulty balance.
9. Add lesson data to `scripts/build-tutorials.mjs`, run the generator, and run:

```sh
python3 scripts/check-tutorial-readiness.py {slug}
```

10. QA `https://doodlea.localhost/`, `https://doodlea.localhost/library.html`, and
   `https://doodlea.localhost/tutorials/{slug}.html` at desktop and mobile widths.
11. Rate the rendered homepage and tutorial page layout at desktop and mobile
   widths. It must score at least 8/10 before publishing.
12. Commit when checks pass. Once the GitHub/Cloudflare deployment path is
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
underline misses its target word, or validation fails.
