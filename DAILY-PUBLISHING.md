# Daily Publishing Guide

This is the quality contract for Doodle.day lessons.

## Principle

The tutorial must convincingly produce the finished marker doodle. The final
image should not add major shape, color, contour, lettering, props, or rendering
that did not appear in a prior process frame.

## Doodle Direction

- Favor cartoons, comic-style marks, icons, badges, expressive symbols, playful
  lettering forms, and bold abstract shapes.
- Use thick black marker outlines and saturated marker fills.
- Keep the process fast: usually 10-20 minutes and 5-7 steps.
- Let marker streaks and imperfect outlines show. Avoid glossy vector-perfect
  symmetry, airbrush gradients, photorealism, and quiet pencil-sketch finishes.
- Use color as part of the lesson, not as a decorative final-only surprise.

## Routine

1. Pick one specific marker doodle subject, e.g. "how to draw hot rod marker
   flames", "how to draw a comic speech bubble", or "how to draw a goofy monster
   face."
2. Back-check existing Doodle.day lessons and avoid repeating shape/category
   problems too closely.
3. Write `lesson-plans/{slug}.json` from the template pattern before publishing.
4. Generate one raster process contact sheet first. No labels, arrows, numbers,
   signatures, watermarks, or fake UI.
5. Save the approved contact sheet under `drafts/`, crop it into `assets/`, and
   use the final panel as the finished image.
6. Rate the saved finished image. It must be at least 8/10 for readability,
   character, marker quality, tutorial fit, composition, and difficulty balance.
7. Add lesson data to `scripts/build-tutorials.mjs`, run the generator, and run:

```sh
python3 scripts/check-tutorial-readiness.py {slug}
```

8. QA `https://doodle.localhost/`, `https://doodle.localhost/library.html`, and
   `https://doodle.localhost/tutorials/{slug}.html` at desktop and mobile widths.
9. Commit when checks pass. Once the GitHub/Cloudflare deployment path is
   connected, routine daily Doodle.day lessons may push after all quality gates
   pass.

## Stop Conditions

Stop instead of publishing when image generation is unavailable, the contact
sheet changes subject/pose between panels, the final introduces major elements,
the saved final scores below 8/10, generated images do not load, JSON-LD is
invalid, `lab.html` loses `noindex,nofollow`, or validation fails.
