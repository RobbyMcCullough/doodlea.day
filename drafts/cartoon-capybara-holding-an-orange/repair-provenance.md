# September 5 teaching repair

Built-in image generation/editing was used with the former capybara finish as
the character/style reference. The working prompt is in repair-plan.md: six
additive stages, fixed positions, direct marker contours, no temporary guides,
no fur tufts or shadow, and a single final color pass.

The primary prompt asked for head/ears, back/feet, face, paws/orange,
leaf/details, then color, preserving all prior strokes. Subsequent targeted
edits reserved the front chest gap, connected the back to the right foot, and
reserved the orange's top gap for the future stem. A stem-alignment edit failed
and an edit of the fruit gap altered the final panel, so valid source panels
were retained independently and assembled through the repository cropper.

- repair-early-panels-source.png supplies panels 1–5 ONLY. Its final panel is
  rejected because a local edit removed the leaf/stem there.
- repair-color-source.png supplies panel 6 ONLY. Its panel 4 has a mismatched
  stem and is not used as a lesson crop.
- repaired-approved-review.jpg is the authoritative review sheet assembled
  from all six final saved assets. Do not recrop it; it includes private labels.
- The lesson plan contains observed pairwise evidence and SHA-256 hashes for
  the exact public JPGs, plus the reviewed instruction/plan contract hash.
- Previous public images and rejected iterations remain in rejected-progressions.

The two sources were cropped with the aspect-preserving cropper at 1254 square,
3 columns, 2 rows, trim 8. Panel 6 from repair-color-source.png replaced the
rejected final from the early-panel source. No drawn geometry was synthesized
by code; only raster cropping, fitting/padding and file selection were used.

Visual review: the head stays readable, the face remains after introduction,
the paws occupy a reserved gap, and the fruit stem/leaf add into reserved space.
There is minor raster contour variation, but no landmark dropout or changed
attachment. Teaching 8.5/10; finish 8.5/10. Full readiness, 10 regression tests,
and desktop/mobile homepage/library/tutorial QA passed.
