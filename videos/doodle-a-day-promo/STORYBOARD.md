---
format: 1080x1080
duration: 30s
message: "Doodle a Day makes drawing approachable through a new step-by-step tutorial every day"
arc: "Personal-origin BAB → product reveal → tutorial proof → creative benefit → invitation"
audience: "Robby's social following and people curious about drawing, creativity, and AI-assisted projects"
mode: collaborative
music: none
captions: yes
---

## Video direction

- Palette system: warm paper `white` and `offwhite` are the base canvases; `black` is ink, borders, and structural type; `yellow` is the recurring focal accent and CTA; `cream` is used sparingly for a marker-red emphasis; the remaining captured pastels rotate only as supporting fields and card fills.
- Type system: Caveat Brush carries the human, hand-drawn display moments; DM Sans carries labels, supporting copy, counters, captions, and button chrome.
- Motion grammar: smooth long-tail `power3` settles, tactile paper-and-marker movement, and one clearly motivated signature move per frame. Reveals follow the actual voiceover cue-by-cue across the full shot; holds use stillness or one finite marker-texture jitter at most. No lazy breathing or perpetual drift.
- Rhythm and holds: Frames 1 and 2 move from personal detail to product context; Frame 3 is the energetic tutorial cascade and holds on the finished result; Frame 4 slows into the human benefit; Frame 5 holds the URL and final drawing as the longest clean read.
- Caption keep-out: compose all essential copy, faces, drawings, buttons, and URLs inside the top 83% of the square; reserve the bottom 17% for styled captions.
- Negative list: no generic AI gradients, glossy SaaS chrome, stock browser frames, bokeh, floating decorative clutter, die-cut sticker outlines, badge framing, slideshow front-loading, or screensaver motion where everything floats independently.

## Frame 1 — I needed a cowboy hat

- scene: Open close on the finished cowboy hat, then reveal the birthday-card problem and the real cowboy-hat tutorial around it.
- voiceover: "I was making my girlfriend a birthday card and I wanted to draw a cowboy hat."
- duration: 6.4s
- poster: 4.2s
- transition_in: cut
- status: animated
- src: compositions/frames/01-cowboy-hat-origin.html
- type: hook
- persuasion: Relatable personal origin
- beat: curiosity + recognition
- blueprint: zoom-out-workspace-reveal (Adapt)
- asset_candidates: assets/cowboy-hat-finished.webp — completed warm-paper marker drawing; assets/cowboy-tutorial-top.webp — captured published cowboy-hat tutorial hero
- focal: assets/cowboy-hat-finished.webp
- roles: cowboy-hat-finished = cutout · cowboy-tutorial-top = supporting containing surface
- sfx: paper-rustle-soft, marker-stroke-short

Adapt: keep the single outward reveal as the signature move, compress the close-up dwell for a six-second social opener, and land in the approved asymmetric 60/40 copy-and-art layout rather than a software workspace.
Scene 1 (0.0–1.3s): extreme close-up on the real finished cowboy hat filling the frame; a short marker-texture wipe traces across the brim as the VO begins with the birthday card — full-bleed detail, one dominant focal layer (`css-marker-patterns`).
Scene 2 (1.3–3.8s): the camera makes its ONE decelerating zoom-out (`viewport-change`, `coordinate-target-zoom`), revealing the hat already nested over the real tutorial page on the right while the warm-paper world resolves around it — approved asymmetric 60/40, 3 depth layers; no second camera move.
Scene 3 (3.8–5.2s): with the camera locked, the left copy builds in spoken order — `THE BEGINNING`, then “I needed to draw a cowboy hat.” — via short masked rises (`dynamic-content-sequencing`); the tutorial surface stays legible on the right.
Scene 4 (5.2–6.4s): “A handmade birthday card became the first tutorial.” settles beneath the headline as the real hat receives one finite marker underline; hold the completed wide composition still for the transition.

narrativeRole: Turn a small, familiar creative problem into the viewer's reason to keep watching.
keyMessage: This project began with an ordinary desire to make something by hand.

## Frame 2 — That experiment became a site

- scene: The real Doodle a Day homepage settles into a bold framed surface while the logo and daily promise become legible.
- voiceover: "So I used ChatGPT to create a step-by-step drawing tutorial and that gave me the idea for Doodle a Day."
- duration: 8.08s
- poster: 4.6s
- transition_in: zoom-through
- status: animated
- src: compositions/frames/02-doodle-a-day-reveal.html
- type: product_intro
- persuasion: Personal bridge to product
- beat: clarity + delight
- blueprint: device-surface-showcase (Adapt)
- asset_candidates: assets/homepage-top.webp — captured live homepage with the current daily lesson; assets/logo-marker-raster-v2.png — real marker logo artwork
- focal: assets/homepage-top.webp
- roles: homepage-top = cutout hero surface · logo-marker-raster-v2 = supporting brand mark
- sfx: paper-slide-soft, marker-tap-soft

Adapt: keep the persistent real product surface and its operated-on-face signature, using one captured homepage with a deliberate internal pan/highlight instead of cycling several app screens; preserve the approved headline-over-surface layout.
Scene 1 (0.0–1.5s): on “So I used ChatGPT,” the `ONE SMALL EXPERIMENT` label and real marker logo establish in the upper field while the homepage surface begins to rise from below — stacked editorial header over a full-width hero surface, 3 depth layers (`spring-pop-entrance`, low drama).
Scene 2 (1.5–4.6s): as the VO says “step-by-step drawing tutorial,” the real homepage settles squarely into its hard-bordered paper frame; its inner screenshot makes a short clipped page-pan from the masthead toward today’s tutorial (`3d-page-scroll` in flat static-tour form), with no browser chrome.
Scene 3 (4.6–7.4s): on “gave me the idea for Doodle a Day,” the headline completes beside the real logo while a yellow marker highlight lands behind the product name (`css-marker-patterns`); the homepage remains the dominant lower visual.
Scene 4 (7.4–8.08s): the inner page motion stops on the current daily tutorial; the full approved layout holds clean and legible with no camera drift.

narrativeRole: Land the product name and the core value claim by the second beat.
keyMessage: One useful drawing experiment grew into Doodle a Day.

## Frame 3 — Simple shapes become a drawing

- scene: Five real cowboy-hat tutorial steps assemble in sequence, progressing from a loose gesture to confident marker color.
- voiceover: "Every day there's a new kid- and family-friendly drawing tutorial."
- duration: 5s
- poster: 4.4s
- transition_in: push-slide LEFT
- status: animated
- src: compositions/frames/03-tutorial-progression.html
- type: feature_showcase
- persuasion: Show-don't-tell proof
- beat: confidence + satisfaction
- blueprint: grid-card-assemble (Reproduce)
- asset_candidates: assets/cowboy-hat-step-1.webp — loose gesture; assets/cowboy-hat-step-2.webp — Western silhouette; assets/cowboy-hat-step-3.webp — refined crown and brim; assets/cowboy-hat-step-4.webp — hatband details; assets/cowboy-hat-step-5.webp — marker color finish; assets/cowboy-hat-finished.webp — completed drawing
- focal: assets/cowboy-hat-finished.webp
- roles: cowboy-hat-step-1 = supporting · cowboy-hat-step-2 = supporting · cowboy-hat-step-3 = supporting · cowboy-hat-step-4 = supporting · cowboy-hat-step-5 = supporting · cowboy-hat-finished = cutout payoff
- sfx: marker-tap-sequence, marker-swipe-short

Reproduce: keep the low-drama staggered self-assemble into the approved 3×2 tutorial grid; each real step enters only when its part of the VO is spoken, and the colored finished drawing is the payoff card.
Scene 1 (0.0–1.0s): on “Every day,” the headline “Simple shapes become a drawing.” begins in the upper field while Step 01 seats into the first grid slot — dense 3×2 process grid beneath a dominant display line (`center-outward-expansion`, short-path form).
Scene 2 (1.0–2.2s): on “there's a new,” Steps 02 and 03 arrive directly into their slots with short masked rises; the earlier cards remain visible so the process accumulates rather than swaps.
Scene 3 (2.2–3.5s): on “kid- and family-friendly,” Steps 04 and 05 join across the lower row, with the fifth card wiping from line art to its real marker color (`css-marker-patterns`); the grid remains camera-locked.
Scene 4 (3.5–5.0s): on “drawing tutorial,” the real finished cowboy hat completes the sixth card with a firm low-overshoot settle (`spring-pop-entrance`) and the yellow `REAL TUTORIAL STEPS` label lands; all six cards hold as one readable transformation.

narrativeRole: Prove that the promise is practical by showing the transformation rather than describing features.
keyMessage: The tutorial breaks a finished drawing into approachable visual steps.

## Frame 4 — Out of the digital realm

- scene: The finished hat, chicken, bee, and traffic cone gather around a large two-part statement that shifts from the digital realm to the real world.
- voiceover: "It's been a fun way for me to bring AI out of the digital realm and into the real world."
- duration: 5.8s
- poster: 4.5s
- transition_in: push-slide LEFT
- status: animated
- src: compositions/frames/04-creative-benefit.html
- type: benefit_highlight
- persuasion: Feature-to-benefit translation
- beat: warmth + creative possibility
- blueprint: kinetic-type-beats (Adapt)
- asset_candidates: assets/cowboy-hat-finished.webp — completed cowboy hat; assets/lets-draw-a-cartoon-chicken.webp — completed current chicken; assets/cartoon-bumblebee-finished-v1.webp — completed bee; assets/cartoon-traffic-cone-finished-v1.webp — completed traffic cone; assets/markers-v2.webp — real marker artwork
- focal: assets/lets-draw-a-cartoon-chicken.webp
- roles: cowboy-hat-finished = supporting · lets-draw-a-cartoon-chicken = cutout · cartoon-bumblebee-finished-v1 = supporting · cartoon-traffic-cone-finished-v1 = supporting · markers-v2 = supporting foreground prop
- sfx: paper-pop-soft, marker-swipe-short

Adapt: keep the centered in-place phrase relay as the signature move, but retain the approved central message card while the four real finished doodles gather around it; the marker artwork appears only for the physical-making payoff.
Scene 1 (0.0–1.6s): on “It's been a fun way for me,” `A FUN WAY TO MAKE` seats in the central bordered message card; the real cowboy hat and chicken arrive into the approved upper-left and upper-right positions with short direct-to-slot pops — centered hierarchy with four-corner supporting art (`dynamic-content-sequencing`, `center-outward-expansion`).
Scene 2 (1.6–3.9s): on “bring AI out of the digital realm,” the large phrase `OUT OF THE DIGITAL REALM` resolves in place while the bee and traffic cone seat into the two lower art positions; the first phrase does not drift away.
Scene 3 (3.9–5.2s): on “into the real world,” the emphasis shifts in the same center anchor to `INTO THE REAL WORLD.` in marker red; a yellow hand-drawn highlight sweeps behind the words and the real marker set tucks behind the central card as a foreground prop (`discrete-text-sequence`, `css-marker-patterns`).
Scene 4 (5.2–5.8s): hold the completed four-doodle composition and emphasized benefit line still; only the finite marker stroke finishes its tail, leaving the viewer a warm reading beat.

narrativeRole: Translate the daily tutorial system into the human outcome the viewer should want.
keyMessage: The project brings an AI-assisted idea into a physical act of drawing.

## Frame 5 — Happy doodling

- scene: The Doodle a Day identity resolves into a warm “Happy doodling!” sign-off, with the URL and finished origin drawing held clearly through the final frame.
- voiceover: "Happy doodling!"
- duration: 4.719333s
- poster: 3.5s
- transition_in: zoom-through
- status: animated
- src: compositions/frames/05-try-one-today.html
- type: brand_outro
- persuasion: Warm personal sign-off
- beat: delight + completion
- blueprint: kinetic-type-beats (Adapt)
- asset_candidates: assets/logo-marker-raster-v2.png — real Doodle a Day marker logo; assets/cowboy-hat-finished.webp — finished origin drawing
- focal: assets/logo-marker-raster-v2.png
- roles: logo-marker-raster-v2 = cutout brand mark · cowboy-hat-finished = supporting payoff drawing
- sfx: paper-tap-soft, marker-swipe-short

Adapt: keep the blueprint's centered beat-to-brand resolution as the signature move, but preserve the approved left-copy/right-art layout; the brief spoken sign-off resolves immediately and leaves the URL and finished origin drawing as the longest still hold.
Scene 1 (0.0–0.7s): on the spoken “Happy doodling!”, the real Doodle a Day logo and hand-drawn sign-off spring into the left copy column while the finished cowboy hat seats into its bordered paper panel on the right — approved asymmetric 60/40 close frame, strong black field, 3 depth layers (`spring-pop-entrance`).
Scene 2 (0.7–1.7s): a short yellow marker underline draws beneath `Happy doodling!` and resolves toward the brand lockup (`css-marker-patterns`); the URL builds once beneath it via `dynamic-content-sequencing`.
Scene 3 (1.7–4.719s): `doodlea.day`, the real logo, and the finished cowboy hat hold dead still through the final frame; no cursor, click, breathing, or exit motion.

narrativeRole: End on the maker's voice and leave the destination legible without adding a sales pitch.
keyMessage: Doodle a Day is a cheerful invitation to make something by hand.
