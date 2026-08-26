# Process Image Workflow

This workflow is for generating Doodlea.day marker-tutorial process images. It
is separate from lesson writing, SEO copy, page generation, and daily
publishing.

## Progression Law

A Doodlea contact sheet must teach a blank-page drawing sequence, not show the
finished drawing several times at different line weights.

- Panel 1 is a sparse construction scaffold. Use only simple primitives,
  centerlines, gesture routes, attachment ticks, and rough envelopes. It should
  contain roughly 20-30% of the final structure.
- A pale line is still a line. Do not draw the complete outer contour, closed
  fins, finished leaves, a full window, facial features, highlight shapes, or a
  finished shadow in Panel 1 and call them guides because they are light gray.
- Each later panel gets one exclusive, visible drawing job. It must add a form,
  relationship, feature group, ink pass, or color pass that was genuinely
  absent before. Merely tracing the same contours darker does not count as
  progress more than once in a sequence.
- Keep future work absent. If the written job is "add the window," no closed
  window contour may be visible in an earlier panel; use a center point or
  crossed placement ticks if location must be reserved.
- The penultimate panel must already show every major final contour and every
  major color decision. The final may complete marker fills, reinforce existing
  outlines, and add small highlights or shadow accents; it may not reveal the
  palette or a major feature for the first time.

Use this blank-page test before approving a sheet: cover every panel except the
first. Could a beginner copy Panel 1 in under two minutes using only circles,
ellipses, boxes, axes, arcs, gesture lines, and placement ticks? If not, the
first panel is too complete.

## Anchor Continuity Law

Sparse construction must still be spatially meaningful. A process sheet fails
when a later feature is merely in the same general area as its earlier guide:
the reader must be able to see what each guide becomes and where it attaches.

- Make an **anchor map** before writing the prompt. List each relation that
  must remain fixed: `apple keychain hangs from right pocket zipper pull`,
  `top flap sits inside the upper third of the bag body`, or `two straps run
  behind the left and right outer shoulders` are useful relations. “Apple on
  the right” is not specific enough.
- A simple *closed primitive* is allowed in Panel 1 when it is visibly a
  construction box, ellipse, or rounded rectangle—not a finished contour—and
  it makes the main proportion teachable. Do not force a useful guide to be
  disconnected just to avoid a finished silhouette. The later silhouette must
  still add the finished corners, handle, contour confidence, and final shape.
- A future attached object may use a pale circle, box, or center point in
  Panel 1 only at its final attachment position. Include its attachment tick
  or hanging route in the same place. Never place a prop several inches away
  as a generic “later” symbol and move it onto the object in a later panel.
- A route must have an assigned destination. Do not draw free U-curves, arcs,
  or ticks that never become a named feature. For every construction route,
  state the later form it becomes and its two endpoints or attachment points.
- Compare every early mark against the next panel, not only against the final:
  its position, direction, connection, and overlap must persist unless a
  documented established foreground form covers it.

Before cropping, do the four-point anchor review at thumbnail size:

1. Can you trace each Panel 1 primitive or route to one named later feature?
2. Does every future prop occupy its final attachment point from its first
   appearance onward?
3. Do each pair of strap, flap, handle, seam, or other paired curves connect
   to the same surfaces and face the same direction in every later panel?
4. Does the Panel 1 main construction shape form a readable usable guide,
   rather than disconnected contour fragments with no construction purpose?

Any “no” is a rejection. Pixel deltas and schema validation do not override
this spatial review.

## Recommended Workflow

1. Start with a process plan, not a finished image.
   - Choose one subject, one pose, one crop, and one scale.
   - List the final drawing's major visible elements before generating art.
   - Make an occlusion map before assigning panels: note which regions remain
     visible in the finish and which will be covered by a later element. Reserve
     the footprint of any covering element early, and do not render finished
     detail underneath it. Pale construction may be erased; detailed lines
     should not be drawn only to disappear in a later frame.
   - Make the anchor map from the law above. For each early primitive, route,
     or prop footprint, record its final relationship, destination, and
     attachment point. Add this relationship map to the prompt; it is separate
     from a list of elements and a list of omissions.
   - Use plan schema v2 and complete `transition_audit` for every adjacent pair,
     including the last process frame to the finish. List every previously
     introduced element under `must_persist`, keep `keeper_lines_removed`
     empty, and describe any newly created physical overlap in
     `new_occlusions`.
   - Once a major element or route appears, it must remain visible in every
     later panel unless another established form physically covers it. A
     periscope, handle, limb, prop, or other landmark may not disappear for one
     panel and return later.
   - For containers, compartments, folded paper, architecture, or any subject
     with foreground objects over internal lines, fill `overlap_reservations`
     before generating. Draw dividers and seams only up to the reserved
     foreground silhouettes; never teach a keeper line that the reader must
     erase to add food, props, or other later forms.
   - For any frame that will darken, ink, fill, color, shade, clean, or clarify
     existing parts, list those parts in `requires_prior_elements`; they must
     first appear in an earlier frame.
   - Use schema v4 for new plans. Fill `progression_contract`, `anchor_map`,
     `stage_role`, `completion_target_percent`, `construction_primitives`, and
     `must_not_show` before generating. These fields force the plan to state
     what is still absent from every panel and where each early guide must
     connect, rather than describing only what is present.
   - Decide whether the subject needs 5, 6, 7, or 8 stages.
   - Generate only for a locked tutorial slug. Acquire the daily run lock first,
     then lock the slug with the mandatory gate, which fails while any
     unresolved generated art exists in `drafts/LEDGER.json`:

     ```sh
     python3 scripts/daily-publish-lock.py acquire --current-date YYYY-MM-DD
     python3 scripts/preflight-image-generation.py --slug {slug} --current-date YYYY-MM-DD --lock-token LOCK_TOKEN
     ```

     Do not create speculative sheets for backup subjects, alternate
     directions, or ideas that are not intended to become the next validated
     lesson.

2. Generate one contact sheet first.
   - Ask for all stages in one grid so the model sees the whole process as one
     artifact.
   - Use no captions, numbers, arrows, UI chrome, signatures, or watermarks.
   - Keep every panel centered at the same scale and angle.
   - Include the panel-by-panel omission contract in the prompt. A model asked
     only what to add will often preview later features too early.

3. Review the contact sheet before cropping.
   - Reject sheets where the subject, pose, or proportions drift.
   - Reject sheets where an introduced landmark disappears from any later
     panel and then returns, even if the first and final panels match.
   - Reject sheets where a later foreground element requires erasing an earlier
     keeper line. Repair the earlier panel so its background lines stop at a
     reserved silhouette.
   - Reject sheets where adjacent panels are nearly identical.
   - Reject sheets where Panel 1 is a faint tracing of the later silhouette.
     Light line weight does not turn finished contours into construction.
   - Reject sheets where two or more consecutive transitions only darken or
     clean the same geometry.
   - Reject sheets where the final introduces major structure, color, markings,
     props, or perspective that was not present earlier.
   - Reject sheets where an outline, color, fill, shading, or cleanup stage is
     also the first appearance of the shape being outlined, colored, shaded, or
     cleaned.
   - Reject sheets where a connected construction box is inexplicably broken
     into contour fragments, where a future prop shifts to a new attachment
     point, or where an early curve does not become the named flap, strap,
     handle, seam, or other later feature in the same direction.

4. Repair before publishing.
   - If one panel fails, regenerate or edit only that panel using the nearest
     good panel and the final panel as visual references when the tool supports
     it.
   - If several panels fail, regenerate the full contact sheet with tighter
     stage instructions.
   - If the contact sheet is promising but not publishable, crop panels only
     after the repaired sheet passes QA.
   - If a generated sheet will not be used, do not generate another subject
     until the unused sheet is resolved in `drafts/LEDGER.json`: promoted into
     a tutorial (`published`), documented as `rejected-quality` or
     `rejected-duplicate` with a note, held as `scheduled` with a
     `release_date`, or explicitly set aside by the owner. The pre-flight gate
     enforces this; an unresolved `pending` entry blocks all new generation.

5. Convert the approved sheet into lesson assets.
   - Crop non-final panels into `{slug}-step-1.jpg` through
     `{slug}-step-n.jpg`.
   - Crop the final panel or a faithful cleaned derivative into
     `{slug}-finished-v{n}.jpg`.
   - Fill `lesson-plans/{slug}.json` before publishing so the frame assets,
     final elements, visible jobs, and final-only changes stay in sync.
   - The cropped `.jpg` files are the reviewed masters. Build the delivery
     images the pages actually serve:

     ```sh
     python3 scripts/build-image-derivatives.py --slug {slug}
     python3 scripts/make-social-cards.py --slug {slug}
     ```

6. Run the normal daily gates only after image QA.
   - `python3 scripts/check-process-plan.py {slug}`
   - `python3 scripts/check-step-deltas.py {slug} --contact-sheet /tmp/{slug}-steps.jpg`
   - `python3 scripts/check-tutorial-readiness.py {slug}`

## Stage Pattern

Use seven stages by default for a colored marker lesson:

1. **Construction, 20-30% complete:** two to five simple primitives, an axis or
   gesture, and small placement ticks. No finished silhouette, feature contour,
   black ink, color, highlight, or shadow.
2. **Primary silhouette, 35-45% complete:** connect only the main body or
   dominant outer form. Keep secondary attachments and internal features absent.
3. **Major parts, 50-60% complete:** add the large attached forms or overlapping
   components, such as fins, limbs, handles, petals, or a brim.
4. **Features, 65-75% complete:** add windows, face construction, inner shapes,
   folds, or other identity-defining landmarks.
5. **Details, 75-85% complete:** add small markings, expression details,
   texture routes, and highlight reservations.
6. **Ink and color map, 85-95% complete:** ink the established contours and show
   every major planned color region. This is the only transition that may rely
   primarily on darker line weight.
7. **Finish, 100%:** complete the established marker fills, strengthen selected
   keeper lines, and add only small highlights or shadow accents.

A very simple subject may use six panels by combining features and details. A
complex subject may use eight by splitting major parts or features. Never save
panels by collapsing construction and silhouette into one faint finished
drawing.

## Cropping Contact Sheets

The site already treats the final image as the art for the last written step.
That means an approved six-panel sheet normally becomes five step images plus
one finished image:

- Panel 1 -> `assets/{slug}-step-1.jpg`
- Panel 2 -> `assets/{slug}-step-2.jpg`
- Panel 3 -> `assets/{slug}-step-3.jpg`
- Panel 4 -> `assets/{slug}-step-4.jpg`
- Panel 5 -> `assets/{slug}-step-5.jpg`
- Panel 6 -> `assets/{slug}-finished-v1.jpg`

Crop panels only after the full sheet passes QA or after failed panels have been
repaired. Keep a copy of the raw approved sheet somewhere outside public
navigation, such as `drafts/{slug}/{slug}-contact-sheet.png`.

Use the cropper for regular grid sheets:

```sh
python3 scripts/crop-contact-sheet.py drafts/{slug}/{slug}-contact-sheet.png {slug} \
  --cols 3 --rows 2 --panels 6 --final-panel 6 --finished-version 1
```

Rules:

- Panels are read left-to-right, top-to-bottom.
- `--final-panel` is the 1-based panel number that becomes the finished image.
- Every other exported panel becomes a numbered step image in reading order.
- The default output size is `1254x1254`, matching the current square asset
  convention.
- The default `--trim 8` removes the faint gutters between generated panels.
  Lower it if the drawing sits close to the panel edge.
- The script refuses to overwrite existing assets unless `--overwrite` is
  passed intentionally.

For a seven- or eight-panel process, use a matching grid, for example:

```sh
python3 scripts/crop-contact-sheet.py drafts/{slug}/{slug}-contact-sheet.png {slug} \
  --cols 4 --rows 2 --panels 8 --final-panel 8 --finished-version 1
```

## Master Contact Sheet Prompt Template

```text
Use case: scientific-educational
Asset type: Doodlea.day marker tutorial process contact sheet
Primary request: Create a {panel_count}-panel contact sheet showing how to draw
{subject_phrase} from a blank page to a finished marker doodle.

Subject: one consistent {specific_subject_description}. Include these final
elements: {final_elements}.

Style/medium: handmade felt-tip marker tutorial art on warm off-white paper;
pale graphite construction only in early panels; thick, slightly imperfect
black marker keeper lines later; visible directional marker-fill texture;
bright color without vector-perfect fills or glossy poster rendering.

Composition/framing: a neat {grid_layout} grid of equal panels, each panel
showing the same subject centered at the same scale, crop, and angle. No
captions and no embedded text. Subtle panel spacing only, no decorative border.

Stage logic:
Panel 1 — construction, 20-30%: {construction_stage}
Panel 2 — primary silhouette, 35-45%: {rough_silhouette_stage}
Panel 3 — major parts, 50-60%: {major_parts_stage}
Panel 4 — features, 65-75%: {main_features_stage}
Panel 5 — details, 75-85%: {secondary_details_stage}
Panel 6 — ink and color map, 85-95%: {ink_and_color_map_stage}
Panel 7 — finish, 100%: {final_stage}
{optional_extra_panels}

Panel omission contract:
Panel 1 must NOT show: {panel_1_forbidden_future_features}. Use placement dots,
single gesture routes, axes, or open envelopes instead of their closed contours.
Panel 2 must NOT show: {panel_2_forbidden_future_features}.
Panel 3 must NOT show: {panel_3_forbidden_future_features}.
Panel 4 must NOT show: {panel_4_forbidden_future_features}.
Panel 5 must NOT show: final black cleanup, completed marker fills, or final
highlights/shadow accents.
Panel 6 must show every major color decision before the final panel.

Anchor continuity contract: {for every Panel 1 primitive, route, and prop
footprint, name the final feature it becomes; give its fixed relationship and
attachment point. State which closed primitive is deliberately allowed as a
construction guide, which routes become named later parts, and that no prop may
shift location, direction, or connection after it first appears.}

Occlusion and line-economy contract: {name each final element that covers part
of another form; state the footprint that must be reserved before drawing the
surrounding structure; list the hidden detail that must never be rendered; and
require every dark pre-final line to remain visible in the finished panel unless
it is explicitly a pale erasable construction guide}.

Constraints: every panel must be a plausible next human drawing step;
construction lines must support the final drawing; each step must add visible
information; the final panel must clearly result from prior panels; the subject
must not change type, pose, scale, viewpoint, or major proportions. Any panel
that darkens, inks, colors, fills, shades, cleans, or clarifies an element must
only work on elements that appeared in an earlier panel; do not introduce a new
major contour and finish it in the same late-stage panel. Earlier panels must
omit future contours rather than previewing the whole finished drawing in pale
gray. Do not use a sequence of progressively darker tracings.

Avoid: photorealism, glossy illustration style, vector-icon finish, airbrush
gradients, generic decorative art, fake UI, labels, arrows, numbers, signatures,
watermarks, decorative borders, extra props, changing viewpoint, changing
silhouette, a detailed first panel, repeated faint-to-dark tracings, and any new
major final detail or color decision not established in an earlier panel.
```

## Single-Panel Repair Prompt Template

Use this when one stage fails but the contact sheet is otherwise usable.

```text
Use case: scientific-educational
Asset type: replacement panel for a Doodlea.day marker tutorial process sheet
Primary request: Regenerate only panel {panel_number} for the {subject_phrase}
process sequence.

Input images:
- Good previous panel: use as the exact pose, crop, scale, and construction
  state to continue from.
- Good next/final panel: use only for destination proportions and elements.

Panel job: {panel_number} should show {visible_change}. It must be a plausible
next step between the previous panel and the next panel.

Keep absent: {future_features_that_must_not_appear_yet}. Do not copy these
contours from the next/final reference, even as faint guides.

Keep unchanged: subject type, pose, angle, crop, scale, proportions, paper
color, line style, and all already-established construction marks.

Change only: add {specific_new_lines_or_details}. Do not clean up, shade, color,
or introduce elements scheduled for later panels.

Avoid: labels, arrows, numbers, text, watermark, decorative border, new props,
changed perspective, changed anatomy/object design, and final-level rendering.
```

If the tool cannot use reference images, paste a short visual description of the
previous and next panels and explicitly state the locked pose, scale, and
elements.

## QA Checklist

A generated process set passes only when all of these are true:

- The same subject is recognizable in every panel.
- The subject does not change species, object type, pose, viewpoint, scale, or
  key proportions.
- The construction marks logically support the final drawing.
- The first panel is sparse primitives and routes, not a pale finished contour.
- The first panel contains no closed secondary-feature contours, facial
  details, black ink, marker fill, highlights, texture, or finished shadow.
- Each adjacent panel adds information that is visible at thumbnail size.
- No two transitions in a row merely retrace the same geometry darker.
- No panel redraws a different image of the same subject.
- The final panel could plausibly result from the prior panels.
- Every major final element appears before the final panel.
- The final panel adds only cleanup, line confidence, texture, restrained
  shading, or small finishing marks.
- No late-stage outline, fill, color, shading, cleanup, or clarification panel
  is the first appearance of the feature it modifies.
- No panel spends finished linework on detail that a later element permanently
  covers. Covering shapes have their footprints reserved early, and only the
  surrounding structure that survives in the finish is rendered.
- The sequence is usable without explanatory captions.
- No embedded text, labels, arrows, fake UI, signatures, or watermarks appear.
- Every major final color region is visible before the final panel.
- The style matches Doodlea.day: warm paper, bold handmade marker lines, visible
  fill texture, clear cartoon energy, not a vector icon or glossy poster.

## Fallback Strategy

Use the least invasive fallback that fixes the failure:

1. Tighten the contact-sheet prompt.
   - Add a locked pose sentence.
   - Add a final-elements list.
   - State which panel first introduces each major element.
   - Remove optional color or background details until the process is stable.

2. Regenerate or edit failed panels.
   - Use the previous good panel plus the final panel as references where the
     image tool supports reference conditioning or image-to-image editing.
   - Keep the repair prompt narrow: one visible job, no final rendering.

3. Use the final art as an alignment reference, not as a tracing template.
   - A generated or human-made final may lock pose, crop, and proportions.
   - Reconstruct earlier stages by removing future contours entirely. Do not
     create earlier frames by merely lowering the opacity or line weight of the
     finished drawing.
   - Panel 1 must be redrawn as primitives and routes; later panels may derive
     their geometry from the master only after their scheduled stage.
   - Export the genuinely deconstructed stages as textured raster images.

4. Use a hybrid manual method for hard subjects.
   - Keep the generated final only if it scores at least 8/10.
   - Manually or programmatically create construction overlays from the same
     final drawing.
   - Do not publish clean vector-looking frames unless the lesson intentionally
     uses a diagram style.

5. Stop when the saved asset cannot be reviewed.
   - Do not substitute a nicer unsaved preview for the repository file.
   - Do not recreate generated art with SVG, canvas, or PIL just to finish a
     daily run.

## Test Results

Test sheets were generated with the contact-sheet workflow on 2026-06-19 and
saved under `workflow-tests/process-image-contact-sheets/`.

| Subject | Category | Result | Notes |
| --- | --- | --- | --- |
| Teapot | simple object | Pass for workflow test | Strong construction-to-finish logic. Viewpoint, body, spout, handle, lid, and base stay consistent. Useful candidate for crop-and-repair publishing. |
| Red fox | animal | Conditional pass | The pose stays consistent and the fox remains recognizable, but panels 3-5 jump quickly into polished anatomy and fur. For publication, split facial features, paws, tail, markings, and fur texture into more explicit stages. |
| Hand saw | tool | Pass for workflow test | Geometric object holds consistency well. The tooth row appears early and stays coherent. Final changes are mostly shading and cleanup. |
| Lighthouse | building/place | Conditional pass | Tower and rocks stay consistent, but the sequence jumps from construction to detailed lantern room and then to finished windows/door. For publication, use 7-8 panels and introduce windows, door, rocks, railing, and waves earlier. |
| Sunflower | organic object/plant | Conditional pass | Overall subject, stem, leaves, and flower head are consistent, but the petal count and disk texture become highly detailed late. For publication, add an intermediate petal-overlap stage and a separate seed-texture stage. |

### Recommended Refinements From Tests

- Use the contact-sheet method as the first pass for approval, especially for
  geometric subjects.
- For animals and plants, prefer seven or eight panels so anatomy, markings,
  petals, and texture do not appear as a late jump.
- For places and scenes, list each final element in the prompt and assign it to
  a panel before generation.
- Keep color out of early tests unless color is part of subject recognition.
- Do not rely on a passing contact sheet alone for daily publishing. Crop,
  inspect, repair, and run the existing lesson-plan gates before a lesson ships.

## Saved Test Sheets

- `workflow-tests/process-image-contact-sheets/teapot-contact-sheet.png`
- `workflow-tests/process-image-contact-sheets/red-fox-contact-sheet.png`
- `workflow-tests/process-image-contact-sheets/hand-saw-contact-sheet.png`
- `workflow-tests/process-image-contact-sheets/lighthouse-contact-sheet.png`
- `workflow-tests/process-image-contact-sheets/sunflower-contact-sheet.png`
