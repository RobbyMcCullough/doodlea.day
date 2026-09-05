# Process Image Workflow

## Teaching contract (schema v5)

Each panel is the next state of ONE drawing on the learner's page. Approve the
teaching sequence separately from the finish. A high finish score never overrides
a missing landmark, unexplained erasure, movement, or an unteachable transition.

1. Start with one or two simple, useful shapes at their final positions.
   A recognizable partial outline is allowed. Do not scatter detached body parts
   or introduce facial ticks several steps before they are useful.
2. Each step has one concrete job, expressed as a small group of drawable strokes.
   Describe where a line starts, its direction, and where it meets existing work.
   A learner must understand the addition without seeing future panels.
3. Use as many steps as the drawing needs, usually 5–7, within 4–8 total.
   Repeated stage types are allowed. Do not invent percentage-completion targets
   or pad the sequence with multiple texture/darkening/cleanup passes.
4. Keeper lines persist. Reserve gaps before adding overlapping arms, paws,
   stems, handles, or props. Draw the foreground first when that is simpler.
   Never teach a dark line only to erase it silently in the next panel.
5. Optional temporary guides have a name, introduction step, replacement/removal
   step, and an explicit reader instruction for that removal. Until then, they
   persist at the same anchors. Do not mix guide names with final landmarks.
6. Every structural contour must appear before the final step. A final coloring
   step may introduce the palette on established outlines. Color and texture
   should usually take one useful step, not several nearly identical panels.
7. Simplify decorative requirements before complicating construction. Count only
   intentional landmarks; specify each vulnerable landmark separately (left ear,
   right ear, head tuft), not a giant bundled "face and fur and highlights" entry.

## Site-specific starting point

Doodlea defaults to direct drawing: recognizable dark marker contours from the
first step, a small number of useful additions, then saturated felt-tip color.
Temporary pencil scaffolding is optional, never mandatory. Avoid sticker borders,
badge framing, glossy rendering, and a finished illustration in the first panel.

## Plan before generation

Use `lesson-plans/TEMPLATE.json` and schema v5 for every new or corrected lesson.
Existing v1–v4 plans remain readable for historical lessons; they are not templates
for new work. Do not rename stage labels or adjust estimated percentages merely
to make a validator pass.

Write the actual reader instructions before making art. Declare each final
landmark and when it appears, frame assets, visible additions, and any guide
lifecycle. For each attached feature, state its fixed connection and reserve any
overlap gap in the preceding step. The first-step test must explain why a beginner
can copy it, not merely assert that it takes two minutes.

The same-slug correction workflow retains valid finish/later panels where
possible. If simplifying the design requires a new finish, review that finish
again and keep the old sheet privately for comparison.

## Lock and preflight

Inspect both worktrees before acquiring the shared run lock. Preserve unrelated
work; do not mix another run's uncommitted integration into this one.
Acquire using `python3 scripts/daily-publish-lock.py acquire --current-date YYYY-MM-DD`.
Then run the duplicate-slot guard and preflight-image-generation for the exact
slug with that date and lock token. Existing-lesson repairs require the matching
`--allow-existing-current-slug` or `--allow-existing-backfill-slug` flag.
Release the token after completion or a stop. No speculative alternate subjects.

## Generation prompt

Use generated or human-made raster art. Generate a contact sheet first, with all
panels at identical scale, pose, crop, and landmark positions. A square cell must
remain square when cropped; never stretch a rectangular cell into a square.

Use this compact prompt, adapting panel count to the lesson:

> Make [N] cumulative panels teaching [subject], using [medium]. Every panel
> continues the same drawing. Keep the same pose, scale, framing, and landmarks.
> Panel 1: [one or two useful shapes and exact location].
> Panel 2: keep [existing shapes]; add [specific strokes and attachment points].
> Repeat this explicit keep/add instruction for every remaining panel.
> Final: [color/shade the established contours; no new structure].
> Temporary guides: [none, or exact introduction/removal instructions].
> Reserved gaps: [locations and future foreground forms].
> Future features remain absent until their assigned step.
> No captions, numbers, arrows, borders, signatures, or watermarks.
> Handmade raster texture; no vector-perfect or glossy rendering.

Do not bury this contract under long lists of optional details. If the character
drifts, use an approved master as a reference and repair the failing panel against
its adjacent neighbors. Do not lower the opacity of a finished drawing to invent
earlier stages.

## Visual approval: observations, not declarations

Inspect the actual saved images, not just a prompt or plan. First view the whole
sheet, then each adjacent pair at readable size, including the final transition.
For each pair record:

- The specific visible addition and whether it is substantial enough for a step.
- Each individual landmark visible in the later frame.
- Every removed or moved mark. Only explicitly instructed guide removal is allowed.
- How the written instruction matches what the learner actually has to draw.

Inspect Step 1 without later panels: are the shapes useful and their positions
clear? Then do a draw-through: read one instruction at a time and examine only
its before/after images. Reject guesswork, moving parts, hidden erasures, unexplained
new contours, and any step whose real job is only redrawing an earlier picture.
Check anchors: origin, attachment, overlap order, and final position.

Rate teaching quality and finished-art quality separately, each at least 8/10.
Continuity failures are hard failures even if an overall score would exceed 8.
A failed iteration stays private under `drafts/{slug}/rejected-progressions/`.
Repair and re-review the entire sequence; do not approve merely because the most
recently reported defect was fixed.

After crop and copy integration, fill `visual_review` in the plan with actual
observations and SHA-256 values for every saved JPG, plus the contract hash from
`process_review.contract_digest`. Hashes tie approval to the reviewed artifacts:
a later image, instruction, or plan change invalidates approval and requires review.
The script verifies evidence completeness and freshness; it does NOT see or certify
the truth of the visual observations. Never auto-fill positive review findings.

## Crop, integrate, and verify

Use `scripts/crop-contact-sheet.py` after visual approval. Check crop boundaries
and aspect ratio; use square padded cells when needed, never geometric distortion.
Keep the raw approved sheet in the lesson's private draft folder.

Update the lesson plan and `scripts/build-tutorials.mjs` together. The written
instructions must match the saved crops. Build the pages, mark the ledger
`published`, and record the review only after the images and copy are stable.

Run process-plan validation, step-delta checks, and tutorial readiness. Pixel
differences are a duplicate-image heuristic: removed lines and shifted drawings
also change pixels, so a passing result is never semantic approval.
Run desktop/mobile rendered QA of homepage, library, and tutorial, including
lazy images and overflow. Commit only intended changes, push using 1Password SSH,
and verify deployment, live pages, and image hashes. Update HUMANS.md and release
the lock. The current-only daily cadence remains unchanged.
