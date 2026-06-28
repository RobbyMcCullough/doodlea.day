# Process Image Workflow

This workflow is for generating Sketcha.day tutorial process images. It is
separate from lesson writing, SEO copy, page generation, and daily publishing.

## Recommended Workflow

1. Start with a process plan, not a finished image.
   - Choose one subject, one pose, one crop, and one scale.
   - List the final drawing's major visible elements before generating art.
   - For any frame that will darken, ink, fill, color, shade, clean, or clarify
     existing parts, list those parts in `requires_prior_elements`; they must
     first appear in an earlier frame.
   - Decide whether the subject needs 5, 6, 7, or 8 stages.

2. Generate one contact sheet first.
   - Ask for all stages in one grid so the model sees the whole process as one
     artifact.
   - Use no captions, numbers, arrows, UI chrome, signatures, or watermarks.
   - Keep every panel centered at the same scale and angle.

3. Review the contact sheet before cropping.
   - Reject sheets where the subject, pose, or proportions drift.
   - Reject sheets where adjacent panels are nearly identical.
   - Reject sheets where the final introduces major structure, color, markings,
     props, or perspective that was not present earlier.
   - Reject sheets where an outline, color, fill, shading, or cleanup stage is
     also the first appearance of the shape being outlined, colored, shaded, or
     cleaned.

4. Repair before publishing.
   - If one panel fails, regenerate or edit only that panel using the nearest
     good panel and the final panel as visual references when the tool supports
     it.
   - If several panels fail, regenerate the full contact sheet with tighter
     stage instructions.
   - If the contact sheet is promising but not publishable, crop panels only
     after the repaired sheet passes QA.

5. Convert the approved sheet into lesson assets.
   - Crop non-final panels into `{slug}-step-1.jpg` through
     `{slug}-step-n.jpg`.
   - Crop the final panel or a faithful cleaned derivative into
     `{slug}-finished-v{n}.jpg`.
   - Fill `lesson-plans/{slug}.json` before publishing so the frame assets,
     final elements, visible jobs, and final-only changes stay in sync.

6. Run the normal daily gates only after image QA.
   - `python3 scripts/check-process-plan.py {slug}`
   - `python3 scripts/check-step-deltas.py {slug} --contact-sheet /tmp/{slug}-steps.jpg`
   - `python3 scripts/check-tutorial-readiness.py {slug}`

## Stage Pattern

Use this six-stage pattern by default:

1. Basic construction shapes: circles, ellipses, boxes, axes, gesture lines.
2. Rough silhouette: simple outside contour over the construction.
3. Refined contour: cleaner outer shape and main proportions.
4. Main features: eyes, handles, windows, wheels, folds, or other landmarks.
5. Secondary details: texture, small forms, line weight, internal shapes.
6. Final sketch: cleanup, selective shading, and restrained color if needed.

Use seven or eight stages for subjects where one of those stages would hide too
much work. Split complex construction, silhouette, features, or details instead
of asking the final panel to make a large leap.

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
Asset type: Sketcha.day tutorial process contact sheet
Primary request: Create a {panel_count}-panel contact sheet showing how to draw
{subject_phrase} from construction to finished sketch.

Subject: one consistent {specific_subject_description}. Include these final
elements: {final_elements}.

Style/medium: clean pencil or ink sketchbook tutorial art on warm off-white
paper; handmade lines; light blue or pale graphite construction lines in early
panels; clear dark drawing lines in later panels; restrained color only if
listed in the subject.

Composition/framing: a neat {grid_layout} grid of equal panels, each panel
showing the same subject centered at the same scale, crop, and angle. No
captions and no embedded text. Subtle panel spacing only, no decorative border.

Stage logic:
Panel 1: {construction_stage}
Panel 2: {rough_silhouette_stage}
Panel 3: {refined_contour_stage}
Panel 4: {main_features_stage}
Panel 5: {secondary_details_stage}
Panel 6: {final_stage}
{optional_extra_panels}

Constraints: every panel must be a plausible next human drawing step;
construction lines must support the final drawing; each step must add visible
information; the final panel must clearly result from prior panels; the subject
must not change type, pose, scale, viewpoint, or major proportions. Any panel
that darkens, inks, colors, fills, shades, cleans, or clarifies an element must
only work on elements that appeared in an earlier panel; do not introduce a new
major contour and finish it in the same late-stage panel.

Avoid: photorealism, glossy illustration style, generic decorative art,
watercolor wash unless specifically requested, fake UI, labels, arrows,
numbers, signatures, watermarks, decorative borders, extra props, changing
viewpoint, changing silhouette, and any new major final detail not established
in an earlier panel.
```

## Single-Panel Repair Prompt Template

Use this when one stage fails but the contact sheet is otherwise usable.

```text
Use case: scientific-educational
Asset type: replacement panel for a Sketcha.day tutorial process sheet
Primary request: Regenerate only panel {panel_number} for the {subject_phrase}
process sequence.

Input images:
- Good previous panel: use as the exact pose, crop, scale, and construction
  state to continue from.
- Good next/final panel: use only for destination proportions and elements.

Panel job: {panel_number} should show {visible_change}. It must be a plausible
next step between the previous panel and the next panel.

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
- Each adjacent panel adds information that is visible at thumbnail size.
- No panel redraws a different image of the same subject.
- The final panel could plausibly result from the prior panels.
- Every major final element appears before the final panel.
- The final panel adds only cleanup, line confidence, texture, restrained
  shading, or small finishing marks.
- No late-stage outline, fill, color, shading, cleanup, or clarification panel
  is the first appearance of the feature it modifies.
- The sequence is usable without explanatory captions.
- No embedded text, labels, arrows, fake UI, signatures, or watermarks appear.
- The style matches Sketcha.day: warm paper, handmade sketch lines, clear
  readable subject, not photorealistic or glossy.

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

3. Generate final art first, then build process overlays.
   - Use generated or human-made final raster art as the master.
   - Create earlier frames by tracing construction, silhouette, contour, and
     detail passes from that same master.
   - Export those derived frames as textured raster images.

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
