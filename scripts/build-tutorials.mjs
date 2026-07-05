import { mkdir, writeFile } from "node:fs/promises";

const siteUrl = (process.env.SITE_URL || "https://doodlea.day").replace(/\/$/, "");
const siteName = "Doodlea.day";
const styleVersion = "20260704-library-compact";
// Self-hosted Plausible (analytics.robbymccullough.com). data-domain follows SITE_URL
// so a production build (SITE_URL=https://doodlea.day) reports under "doodlea.day".
const plausibleDomain = process.env.PLAUSIBLE_DOMAIN || siteUrl.replace(/^https?:\/\//, "");
const plausibleTag = `  <script defer data-domain="${plausibleDomain}" src="https://analytics.robbymccullough.com/js/script.js"></script>`;
const siteSlug = "doodle";
const brandWordmark = `${siteSlug}<span class="brand-accent">a</span><span class="brand-domain">.day</span>`;
const iconLinks = `  <link rel="icon" href="/favicon.ico">
  <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="48x48" href="/assets/favicon-48x48.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon-16x16.png">
  <link rel="apple-touch-icon" sizes="180x180" href="/assets/apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="512x512" href="/assets/site-icon.png">`;

const lessons = [
  {
    slug: "cartoon-pool-float-doodle",
    day: "001",
    date: "Saturday, June 6",
    isoDate: "2026-06-06",
    subject: "a cartoon pool float doodle",
    headlineSubject: "a cartoon<br>pool float doodle",
    shortSubject: "a cartoon pool float doodle",
    lessonTitle: "Let's doodle a cartoon pool float",
    description: "Learn how to draw a cartoon pool float doodle with a tilted inflatable ring, inner hole, soft thickness, curved stripe panels, water ripples, shine gaps, bright marker fills, and thick black outlines.",
    intro: "Build the float from two tilted ellipses, inflate the edge, then wrap stripes around the ring before adding water and marker color. You can swap the colors later; keep the hole and outer ring lined up first.",
    time: 15,
    difficulty: "Easy",
    accent: "#16aeb7",
    finished: "cartoon-pool-float-doodle-finished-v1.jpg",
    finishedAlt: "Bold marker doodle of a tilted inflatable pool float with aqua, coral, and yellow stripe panels, inner hole, thick black outlines, white shine gaps, blue water ripples, and visible marker texture",
    materials: ["Drawing paper", "Black and colored markers", "White gel pen"],
    materialNote: "Use black for the outline, aqua, coral, and yellow for the float panels, blue for water ripples, and the gel pen only for shine gaps.",
    tipLabel: "Doodle tip",
    steps: [
      {
        name: "Block the float ring",
        text: "Draw a large tilted ellipse for the outside of the float, then add a smaller matching ellipse for the hole.",
        tip: "Match the tilt of both ellipses. The float looks inflated only if the hole follows the outer ring."
      },
      {
        name: "Inflate the edge",
        text: "Add a soft lower edge around the ring so the float feels thick and puffy.",
        tip: "Think of the float as a rounded tube, not a flat donut. The lower edge gives it volume."
      },
      {
        name: "Wrap the stripes",
        text: "Divide the ring into curved stripe panels that follow the float's round surface.",
        tip: "Curve each stripe across the tube. Straight cuts can make the float look like a flat target."
      },
      {
        name: "Add ripples and shine",
        text: "Draw blue water ripples around the float and through the hole, then leave a few shine gaps on the tube.",
        tip: "Place the shine gaps on the existing panels. They should not create new stripe shapes."
      },
      {
        name: "Fill the pool colors",
        text: "Fill the stripe panels with aqua, coral, and yellow marker, then color the water ripples blue.",
        tip: "Let marker streaks show. They help the inflated ring feel handmade and sunny."
      },
      {
        name: "Make the float bob",
        text: "Thicken the black outlines, even the marker fills, sharpen the shine gaps, and clarify the same water ripples.",
        tip: "Stop before adding faces, words, or beach props. The ring, stripes, shine, and water are enough.",
        image: true
      }
    ]
  },
  {
    slug: "graham-cracker-smore-doodle",
    day: "030",
    date: "Sunday, July 5",
    isoDate: "2026-07-05",
    subject: "a graham cracker s'more doodle",
    headlineSubject: "a graham cracker<br>s'more doodle",
    shortSubject: "a graham cracker s'more doodle",
    lessonTitle: "Let's doodle a graham cracker s'more",
    description: "Learn how to draw a graham cracker s'more doodle with stacked crackers, puffy marshmallow, visible chocolate slab, cracker holes, melty edges, bold black outlines, marker fills, and shine gaps.",
    intro: "Build the s'more as a stack first, then tuck in the marshmallow and chocolate before adding cracker dots, melty edges, and warm marker color. Keep the layers clear, then change the cracker tilt or marshmallow squish when you make another one.",
    time: 15,
    difficulty: "Easy",
    accent: "#c98232",
    finished: "graham-cracker-smore-doodle-finished-v1.jpg",
    finishedAlt: "Bold marker doodle of a graham cracker s'more with tan top and bottom crackers, puffy white marshmallow, dark chocolate layer, cracker holes, center break line, thick black outlines, shine gaps, and small gray shadow",
    materials: ["Drawing paper", "Black and colored markers", "White gel pen"],
    materialNote: "Use black for the outline and cracker dots, tan for the crackers, dark brown for chocolate, pale gray or cream for marshmallow shadows, and the gel pen only for small shine gaps.",
    tipLabel: "Doodle tip",
    steps: [
      {
        name: "Block the cracker stack",
        text: "Draw the top and bottom graham crackers as two slightly tilted squares with a little space between them.",
        tip: "Keep the corners simple and chunky. A square stack reads faster than a perfectly measured box."
      },
      {
        name: "Squash in the marshmallow",
        text: "Add a puffy marshmallow layer between the crackers, letting the soft edge bulge past the straight cracker sides.",
        tip: "Round the marshmallow edge generously. That contrast against the crackers makes the s'more fun to draw."
      },
      {
        name: "Slide in chocolate",
        text: "Draw a visible chocolate slab under the marshmallow so it peeks out along the front and side.",
        tip: "Place the chocolate before you color. That keeps the dark layer from becoming a surprise at the end."
      },
      {
        name: "Dot the cracker",
        text: "Add graham cracker holes and a center break line on the top cracker, then begin thickening the black outlines.",
        tip: "Use a few bigger dots instead of lots of tiny specks. They will stay readable after marker fill."
      },
      {
        name: "Melt and color",
        text: "Add melty marshmallow edges, fill the crackers tan, color the chocolate dark brown, add pale marshmallow shadows, and leave shine gaps.",
        tip: "Let the marker strokes show. Slight streaks make the s'more feel hand-doodled."
      },
      {
        name: "Toast the s'more finish",
        text: "Thicken the existing black outlines, even the marker fills, clarify the cracker holes and melty edges, and strengthen the small gray shadow.",
        tip: "Stop before adding a campfire, plate, face, or border. The cracker, marshmallow, and chocolate layers are enough.",
        image: true
      }
    ]
  },
  {
    slug: "cartoon-cactus-sticker",
    day: "002",
    date: "Sunday, June 7",
    isoDate: "2026-06-07",
    subject: "a cartoon cactus sticker",
    headlineSubject: "a cartoon<br>cactus sticker",
    shortSubject: "a cactus sticker",
    lessonTitle: "Let's doodle a cartoon cactus sticker",
    description: "Learn how to draw a cartoon cactus sticker with a squat flower pot, tall rounded cactus stem, side arms, spine dashes, top flower, bright marker fills, shine gaps, and a gray sticker shadow.",
    intro: "Start with the pot, grow the cactus upward, then add arms, spines, a tiny flower, and bold marker color. This version stays face-free, but you can change the flower color or pot stripe once the cactus shape is clear.",
    time: 15,
    difficulty: "Easy",
    accent: "#75b83c",
    finished: "cartoon-cactus-sticker-finished-v1.jpg",
    finishedAlt: "Bold marker doodle of a potted cactus sticker with terracotta flower pot, green rounded cactus stem and arms, black spine dashes, pink flower, white shine gaps, thick black outline, and gray sticker shadow",
    materials: ["Drawing paper", "Black and colored markers", "White gel pen"],
    materialNote: "Use black for the outline and spines, green for the cactus, terracotta orange for the pot, pink for the flower, gray for the shadow, and the gel pen only for shine gaps.",
    tipLabel: "Doodle tip",
    steps: [
      {
        name: "Block the pot",
        text: "Draw a squat flower pot with a thick rim, tapered sides, and a simple base line.",
        tip: "Keep the pot wide enough to hold the cactus. A tiny pot makes the sticker feel top-heavy."
      },
      {
        name: "Grow the main stem",
        text: "Add a tall rounded cactus stem rising from behind the pot rim.",
        tip: "Round the top generously. The soft shape keeps the cactus friendly without needing a face."
      },
      {
        name: "Add cactus arms",
        text: "Draw two rounded side arms attached to the main stem, keeping them a little uneven.",
        tip: "Mismatched arm heights look more handmade. Just keep both arms clearly attached to the stem."
      },
      {
        name: "Dot spines and flower",
        text: "Add short black spine dashes on the cactus, then place a small flower at the top.",
        tip: "Use fewer, bigger spine marks. Tiny spikes can vanish once the green marker goes in."
      },
      {
        name: "Fill the desert colors",
        text: "Fill the cactus green, the pot terracotta, the flower pink, then leave shine gaps and add a gray sticker shadow.",
        tip: "Color inside the shapes you already built. Visible marker streaks make the cactus feel hand-doodled."
      },
      {
        name: "Pop the cactus sticker",
        text: "Reinforce the existing black outlines, deepen the marker fills, sharpen the shine gaps, and strengthen the sticker shadow.",
        tip: "Stop before adding sunglasses, eyes, or a desert scene. The pot, arms, flower, and spines are enough.",
        image: true
      }
    ]
  },
  {
    slug: "beach-bucket-doodle",
    day: "003",
    date: "Monday, June 8",
    isoDate: "2026-06-08",
    subject: "a beach bucket doodle",
    headlineSubject: "a beach<br>bucket doodle",
    shortSubject: "a beach bucket",
    lessonTitle: "Let's doodle a beach bucket",
    description: "Learn how to draw a beach bucket doodle with a tilted bucket body, thick rim, arched handle, small shovel, stripe, sand dots, bright marker fills, shine gaps, and a gray sticker shadow.",
    intro: "Build the bucket as a tilted cup, swing the handle over it, then tuck a little shovel beside it before adding beachy marker color. Change the bucket colors if you want; keep the rim, handle, and shovel readable.",
    time: 15,
    difficulty: "Easy",
    accent: "#16aeb7",
    finished: "beach-bucket-doodle-finished-v1.jpg",
    finishedAlt: "Bold marker doodle of a turquoise beach bucket with orange handle and stripe, yellow shovel, sand dots, white shine gaps, marker texture, thick black outline, and gray sticker shadow",
    materials: ["Drawing paper", "Black and colored markers", "White gel pen"],
    materialNote: "Use black for the outline, turquoise for the bucket, orange for the handle and stripe, yellow for the shovel, gray for the shadow, and the gel pen only for small shine gaps.",
    tipLabel: "Doodle tip",
    steps: [
      {
        name: "Block the bucket",
        text: "Draw a tilted bucket body with a wide top ellipse, tapered sides, and a curved lower edge.",
        tip: "Set the tilt early. A slight lean makes the bucket feel playful instead of like a plain flowerpot."
      },
      {
        name: "Add rim and base",
        text: "Wrap a thick rounded rim around the opening and clean up the bucket base.",
        tip: "Let the rim follow the same ellipse as the opening. Matching curves make the bucket feel round."
      },
      {
        name: "Swing the handle",
        text: "Draw a tall arched handle over the bucket and add small side attachment circles.",
        tip: "The handle should attach near the rim on both sides. Keep it open enough that it does not crowd the bucket."
      },
      {
        name: "Tuck in beach details",
        text: "Add a small shovel leaning beside the bucket, a simple stripe around the middle, sand dots, and thick black outlines.",
        tip: "Keep the shovel smaller than the bucket. It should support the doodle, not become the main object."
      },
      {
        name: "Fill the beach colors",
        text: "Fill the bucket turquoise, the handle and stripe orange, the shovel yellow, then leave shine gaps and add a gray sand shadow.",
        tip: "Marker streaks are fine. Color inside the shapes you already built so the doodle stays crisp."
      },
      {
        name: "Pop the beach bucket",
        text: "Reinforce the existing black outlines, deepen the marker fills, sharpen the shine gaps, and strengthen the sand shadow.",
        tip: "Stop before adding waves or lettering. The bucket, handle, shovel, and sand dots already tell the beach story.",
        image: true
      }
    ]
  },
  {
    slug: "parade-drum-doodle",
    day: "004",
    date: "Tuesday, June 9",
    isoDate: "2026-06-09",
    subject: "a parade drum doodle",
    headlineSubject: "a parade<br>drum doodle",
    shortSubject: "a parade drum",
    lessonTitle: "Let's doodle a parade drum",
    description: "Learn how to draw a parade drum doodle with a round drum shell, top and bottom rims, side lugs, crossed drumsticks, center star, bold marker fills, shine gaps, and a sticker shadow.",
    intro: "Start with a simple drum cylinder, stack on the rims and lugs, then cross the sticks and drop a star on the front before coloring it like a parade badge. Keep the shapes big and graphic so the marker finish stays readable.",
    time: 15,
    difficulty: "Easy",
    accent: "#e2a322",
    finished: "parade-drum-doodle-finished-v1.jpg",
    finishedAlt: "Bold marker doodle of a blue parade drum with gold rims and star, red side straps, crossed tan drumsticks, white shine gaps, thick black outline, marker texture, and gray sticker shadow",
    materials: ["Drawing paper", "Black and colored markers", "White gel pen"],
    materialNote: "Use black for the outline, blue for the shell, gold or yellow for the rims and star, red for the straps, tan for the sticks, gray for the shadow, and the gel pen only for shine gaps.",
    tipLabel: "Doodle tip",
    steps: [
      {
        name: "Block the drum body",
        text: "Draw a short drum cylinder with a broad top ellipse, straight side edges, and a curved lower edge.",
        tip: "Keep the drum squat and wide. A tall tube will not feel as much like a marching drum."
      },
      {
        name: "Band the rims",
        text: "Add thick top and bottom rim bands that follow the curve of the drum body.",
        tip: "Curve the bands with the ellipse. Straight bands flatten the drum."
      },
      {
        name: "Mark straps and lugs",
        text: "Place round lugs around the rims and connect them with simple vertical straps.",
        tip: "Use fewer, bigger lugs. Tiny dots disappear once the marker color goes in."
      },
      {
        name: "Cross the sticks",
        text: "Add two rounded drumsticks crossing over the top rim, then draw a big star badge on the front.",
        tip: "Let the sticks sit above the top ellipse. That overlap makes them feel like real objects on the drum."
      },
      {
        name: "Fill the parade colors",
        text: "Fill the shell blue, the rims and star gold, the straps red, the sticks tan, then leave shine gaps and add a sticker shadow.",
        tip: "Color in broad strokes. The doodle should look bold from across the room."
      },
      {
        name: "Make the drum march",
        text: "Reinforce the existing black outlines, deepen the marker colors, sharpen the highlights, and darken the sticker shadow.",
        tip: "Stop before adding words, flags, or extra confetti. The star, sticks, and bright rims already carry the parade energy.",
        image: true
      }
    ]
  },
  {
    slug: "comic-firecracker-doodle",
    day: "028",
    date: "Friday, July 3",
    isoDate: "2026-07-03",
    subject: "a comic firecracker doodle",
    headlineSubject: "a comic<br>firecracker doodle",
    shortSubject: "a firecracker doodle",
    lessonTitle: "Let's doodle a comic firecracker",
    description: "Learn how to draw a comic firecracker doodle with a tilted cylinder body, wrapper bands, curved fuse, spark bursts, thick black outline, red and yellow marker fills, shine gaps, and a gray sticker shadow.",
    intro: "Build the firecracker as one tilted cylinder, bend the fuse, pop in a few sparks, then add loud marker color. Keep it text-free so the simple shape and fuse do the work.",
    time: 15,
    difficulty: "Easy",
    accent: "#e34132",
    finished: "comic-firecracker-doodle-finished-v1.jpg",
    finishedAlt: "Bold marker doodle of a tilted red firecracker with yellow bands, curved fuse, star sparks, white shine gaps, thick black outline, marker texture, and gray sticker shadow",
    materials: ["Drawing paper", "Black and colored markers", "White gel pen"],
    materialNote: "Use black for the outline, red for the body, yellow for the bands and sparks, gray for the shadow, and the gel pen only for small shine gaps.",
    tipLabel: "Doodle tip",
    steps: [
      {
        name: "Tilt the firecracker",
        text: "Draw a short diagonal cylinder with rounded end caps, leaving room above one end for the fuse.",
        tip: "Set the angle first. A diagonal firecracker feels more comic and less like a plain tube."
      },
      {
        name: "Wrap the bands",
        text: "Add a cap and two wrapper bands around the cylinder, curving the lines with the body.",
        tip: "Do not add words or tiny labels. Big simple bands are easier to color and read."
      },
      {
        name: "Bend the fuse",
        text: "Draw a curved fuse from the top end, then thicken the main outside line with black marker.",
        tip: "Let the fuse bend like a candy cane. The curve makes the spark area clear."
      },
      {
        name: "Pop the sparks",
        text: "Add a few star bursts and dot sparks near the fuse tip, keeping them close to the curve.",
        tip: "Use two or three bursts, not a full fireworks show. The firecracker should stay the main shape."
      },
      {
        name: "Fill the fuse colors",
        text: "Fill the body red, color the bands and sparks yellow, leave white shine gaps, and add a gray sticker shadow.",
        tip: "Color with visible marker strokes. A little streakiness makes the doodle feel handmade."
      },
      {
        name: "Crackle the final doodle",
        text: "Reinforce the existing outlines, deepen the marker fills, sharpen the highlights, and darken the shadow already on the page.",
        tip: "Stop before adding extra rockets or text. This last pass should make the same firecracker louder.",
        image: true
      }
    ]
  },
  {
    slug: "cartoon-barbecue-grill-doodle",
    day: "029",
    date: "Saturday, July 4",
    isoDate: "2026-07-04",
    subject: "a cartoon barbecue grill doodle",
    headlineSubject: "a cartoon barbecue<br>grill doodle",
    shortSubject: "a grill doodle",
    lessonTitle: "Let's doodle a cartoon barbecue grill",
    description: "Learn how to draw a cartoon barbecue grill doodle with an open kettle bowl, thick rim, side handles, short legs, wheels, grate, flames, smoke curls, red marker fill, shine gaps, and a sticker shadow.",
    intro: "Build the grill as an open bowl, stand it on short legs, then add the rim, grate, little flames, smoke, and bright marker color. Keep it text-free and face-free so the simple barbecue shape does the work.",
    time: 15,
    difficulty: "Easy",
    accent: "#e33f32",
    finished: "cartoon-barbecue-grill-doodle-finished-v1.jpg",
    finishedAlt: "Bold marker doodle of an open red kettle barbecue grill with thick rim, side handles, short legs, two wheels, black grate, orange flames, gray smoke curls, white shine gaps, thick black outline, and gray sticker shadow",
    materials: ["Drawing paper", "Black and colored markers", "White gel pen"],
    materialNote: "Use black for the outline, rim, grate, legs, and wheels; red for the grill bowl; orange for the flames; gray for smoke and shadow; and the gel pen only for shine gaps.",
    tipLabel: "Doodle tip",
    steps: [
      {
        name: "Block the grill bowl",
        text: "Draw a wide open bowl with an oval top opening and a rounded lower curve.",
        tip: "Keep the top opening clear. This is an open grill, so do not add a lid behind the fire."
      },
      {
        name: "Set legs and wheels",
        text: "Add short angled legs under the bowl, a small crossbar, and two little wheels on one side.",
        tip: "Make the wheels bigger than tiny dots. Bold wheel shapes hold up better after marker color."
      },
      {
        name: "Add rim and handles",
        text: "Thicken the top rim around the open bowl, then add small side handles attached to the left and right edges.",
        tip: "Keep the handles on the bowl sides. The whole top should stay open for the grate and flames."
      },
      {
        name: "Add grate and smoke",
        text: "Draw a simple grate across the open top, place small flame shapes above it, and curl a few smoke lines to the side.",
        tip: "Let the flames sit on the grate, not in front of a lid. Two or three smoke curves are enough."
      },
      {
        name: "Fill the grill colors",
        text: "Fill the bowl red, the legs and grate charcoal, the flames orange, the smoke gray, then leave shine gaps and add a sticker shadow.",
        tip: "Color in broad marker strokes. The streaks make the grill feel handmade instead of printed."
      },
      {
        name: "Make the grill sizzle",
        text: "Reinforce the existing black outlines, deepen the marker fills, sharpen the shine gaps, and strengthen the smoke, flames, and shadow already on the page.",
        tip: "Stop before adding a lid, burgers, words, or a full backyard. The open bowl, grate, flames, and smoke tell the barbecue story.",
        image: true
      }
    ]
  },
  {
    slug: "beach-umbrella-badge",
    day: "005",
    date: "Wednesday, June 10",
    isoDate: "2026-06-10",
    subject: "a beach umbrella badge",
    headlineSubject: "a beach<br>umbrella badge",
    shortSubject: "a beach umbrella",
    lessonTitle: "Let's doodle a beach umbrella badge",
    description: "Learn how to draw a beach umbrella badge with a rounded canopy, scalloped edge, center pole, top knob, curved panel seams, thick black outline, bright marker fills, shine gaps, and a gray sticker shadow.",
    intro: "Start with one big canopy arc, scallop the bottom, then add the pole, panel seams, and sunny marker fills. Change the panel colors if you want; keep the seams clear before coloring.",
    time: 15,
    difficulty: "Easy",
    accent: "#12aeb1",
    finished: "beach-umbrella-badge-finished-v1.jpg",
    finishedAlt: "Bold marker doodle of a beach umbrella badge with scalloped canopy, curved panel seams, turquoise coral and yellow fills, white shine gaps, center pole, thick black outline, and gray sticker shadow",
    materials: ["Drawing paper", "Black and colored markers", "White gel pen"],
    materialNote: "Use black for the outline, turquoise, coral, and yellow for the panels, brown for the pole, gray for the shadow, and the gel pen only for shine gaps.",
    tipLabel: "Doodle tip",
    steps: [
      {
        name: "Arc the canopy",
        text: "Draw a broad half-circle canopy guide, tilting it slightly so it feels like a sticker badge.",
        tip: "Make the arc wide and simple. The umbrella needs room for colored panels later."
      },
      {
        name: "Scallop the edge",
        text: "Add soft scallops along the lower edge, then begin tracing the outside with a thick black line.",
        tip: "Keep the scallops rounded. Sharp points can make the umbrella look like a crown."
      },
      {
        name: "Drop the pole",
        text: "Add a small top knob and a simple pole dropping from the middle of the canopy.",
        tip: "Place the pole under the knob. That alignment keeps the umbrella balanced."
      },
      {
        name: "Divide the panels",
        text: "Draw curved panel seams from the top knob down to the scalloped edge.",
        tip: "Curve the seams instead of drawing straight spokes. The canopy will feel rounder."
      },
      {
        name: "Fill the beach colors",
        text: "Fill alternating panels with bright marker colors, leave white shine gaps, color the pole, and add a gray sticker shadow.",
        tip: "Pick any cheerful panel order, but color inside the seams you already drew."
      },
      {
        name: "Snap the umbrella badge into place",
        text: "Reinforce the existing outlines, deepen the marker fills, sharpen the shine gaps, and darken the shadow already on the page.",
        tip: "Stop before adding sand, waves, or faces. The canopy shape is strong enough on its own.",
        image: true
      }
    ]
  },
  {
    slug: "red-white-blue-popsicle-badge",
    day: "006",
    date: "Thursday, June 11",
    isoDate: "2026-06-11",
    subject: "a red white and blue popsicle badge",
    headlineSubject: "a red white and blue<br>popsicle badge",
    shortSubject: "a popsicle badge",
    lessonTitle: "Let's doodle a red white and blue popsicle badge",
    description: "Learn how to draw a red white and blue popsicle badge with a rounded body, wooden stick, thick black outline, horizontal bands, wavy melt edge, shine marks, marker texture, and sticker shadow.",
    intro: "Block in the popsicle first, then add the stick, band lines, wavy melt edge, and bold marker color. Keep the middle band open as white paper so the red and blue sections stay bright.",
    time: 15,
    difficulty: "Easy",
    accent: "#df3f34",
    finished: "red-white-blue-popsicle-badge-finished-v1.jpg",
    finishedAlt: "Bold marker doodle of a red white and blue popsicle badge with thick black outline, wooden stick, shine marks, wavy blue melt edge, marker streaks, and gray sticker shadow",
    materials: ["Drawing paper", "Black and colored markers", "White gel pen"],
    materialNote: "Use black for the outline, red and blue for the popsicle bands, tan for the stick, gray for the shadow, and the gel pen only for tiny shine marks if you do not leave white gaps.",
    tipLabel: "Doodle tip",
    steps: [
      {
        name: "Block the popsicle",
        text: "Draw a tall rounded popsicle body with a soft top and a flatter bottom edge.",
        tip: "Make the body wide enough for color bands. Rounded corners are what make it feel sticker-like."
      },
      {
        name: "Add stick and outline",
        text: "Place a small centered stick under the body, then trace the outside with a thicker black marker line.",
        tip: "Keep the stick tucked into the middle. A centered stick makes the badge feel balanced."
      },
      {
        name: "Split the bands",
        text: "Draw horizontal bands across the popsicle so the top can be red, the middle can stay white, and the bottom can turn blue.",
        tip: "Let the band lines curve slightly with the rounded body instead of making them ruler-straight."
      },
      {
        name: "Wave the melt edge",
        text: "Add a small wavy melt edge along the lower color area and clean up the band shapes.",
        tip: "A few soft waves are enough. Do not redraw the whole popsicle at this stage."
      },
      {
        name: "Fill with marker",
        text: "Fill the top band red and the lower section blue, leave the middle band white, add shine gaps, marker streaks, and a little sticker shadow.",
        tip: "Let some marker texture show. It keeps the badge handmade instead of flat."
      },
      {
        name: "Freeze the badge finish",
        text: "Reinforce the existing outline, smooth the marker fills, sharpen the shine marks, and deepen the shadow already on the page.",
        tip: "Stop before adding stars, faces, or extra props. The simple bands and wavy edge are enough.",
        image: true
      }
    ]
  },
  {
    slug: "cartoon-paint-splat-doodle",
    day: "007",
    date: "Friday, June 12",
    isoDate: "2026-06-12",
    subject: "a cartoon paint splat doodle",
    headlineSubject: "a cartoon paint<br>splat doodle",
    shortSubject: "a paint splat doodle",
    lessonTitle: "Let's doodle a cartoon paint splat",
    description: "Learn how to draw a cartoon paint splat doodle with a central blob, uneven splat arms, small droplets, thick black outline, bright marker fill, highlights, and a sticker shadow.",
    intro: "Start with one soft blob, pull out uneven arms, then add droplets, thick marker outline, bright fill, and shine gaps. Your splat can wobble differently as long as the droplets stay clear.",
    time: 15,
    difficulty: "Easy",
    accent: "#198bd8",
    finished: "cartoon-paint-splat-doodle-finished-v1.jpg",
    finishedAlt: "Bold blue marker doodle of a cartoon paint splat with uneven arms, small droplets, thick black outline, white highlight gaps, marker streaks, and a soft sticker shadow",
    materials: ["Drawing paper", "Black and colored markers", "White gel pen"],
    materialNote: "Use black for the outline, one bright marker for the fill, gray or purple for the shadow, and the gel pen only for highlight gaps if needed.",
    tipLabel: "Doodle tip",
    steps: [
      {
        name: "Start with a blob",
        text: "Draw a soft rounded blob in the middle of the page as the anchor for the splat.",
        tip: "This first shape does not need to be perfect. It just gives the splat a center."
      },
      {
        name: "Pull out splat arms",
        text: "Add uneven arms around the blob, mixing rounded bumps with a few longer stretched shapes.",
        tip: "Rotate the page if it helps. The arms should feel random but still connect smoothly."
      },
      {
        name: "Drop little dots",
        text: "Place a few small paint droplets around the main splat, leaving space between them and the center.",
        tip: "Use different droplet sizes so the splash feels lively instead of patterned."
      },
      {
        name: "Ink the splat edge",
        text: "Trace the splat and droplets with a thick black marker line, following only the shapes you already drew.",
        tip: "Do not invent new arms while inking. The marker should make the existing splash bolder."
      },
      {
        name: "Fill the color splash",
        text: "Fill the splat and droplets with bright marker color, leave small shine gaps, show marker streaks, and add a soft sticker shadow.",
        tip: "Color in the same direction across the big splat so the streaks feel intentional."
      },
      {
        name: "Make the splat pop",
        text: "Reinforce the existing outline, clean the marker fill, sharpen the highlights, and deepen the shadow already on the page.",
        tip: "The finish should still look like the same splash from step five, just louder and cleaner.",
        image: true
      }
    ]
  },
  {
    slug: "sunscreen-bottle-sticker",
    day: "027",
    date: "Thursday, July 2",
    isoDate: "2026-07-02",
    subject: "a sunscreen bottle sticker",
    headlineSubject: "a sunscreen<br>bottle sticker",
    shortSubject: "a sunscreen bottle",
    lessonTitle: "Let's doodle a sunscreen bottle sticker",
    description: "Learn how to draw a sunscreen bottle sticker with a rounded bottle body, flip cap, blank label panel, wink expression, sun badge, thick black outline, yellow marker fill, blue accents, white highlights, and gray sticker shadow.",
    intro: "Build a rounded bottle first, add the cap and blank label, then give it a wink, a sun badge, and bright marker color. Keep the label text-free so the face and shape stay playful.",
    time: 15,
    difficulty: "Easy",
    accent: "#f7c933",
    finished: "sunscreen-bottle-sticker-finished-v1.jpg",
    finishedAlt: "Bold marker doodle of a yellow sunscreen bottle sticker with blue cap, blank label panel, wink expression, cheek dots, small sun badge, white highlights, gray shadow, and thick black outline",
    materials: ["Drawing paper", "Black and colored markers", "White gel pen"],
    materialNote: "Use black for the outline, yellow for the bottle, blue for the cap and label edge, gray for the sticker shadow, and the gel pen only for small shine marks.",
    tipLabel: "Doodle tip",
    steps: [
      {
        name: "Shape the bottle",
        text: "Draw a squat rounded bottle body with a slight sticker tilt and room for a face and label.",
        tip: "Round the bottom corners more than the top corners. That gives the bottle a soft cartoon shape."
      },
      {
        name: "Add cap and label",
        text: "Add a flip cap on top and a blank rounded label panel across the front.",
        tip: "Keep the label empty. A simple sun symbol later will read cleaner than tiny words."
      },
      {
        name: "Give it a wink",
        text: "Draw one open eye, one wink eye, raised brows, cheek dots, and a sideways grin above the label.",
        tip: "This expression should feel different from a basic smiley face. Push the wink and cheek dots."
      },
      {
        name: "Ink the sun badge",
        text: "Add a small sun badge on the label, then trace the bottle, cap, label, and face with thick black marker.",
        tip: "Ink only the shapes you already placed. The outline should make the sticker bolder, not redesign it."
      },
      {
        name: "Fill the sunny colors",
        text: "Fill the bottle yellow, add blue to the cap and label edge, leave white shine gaps, and add a gray sticker shadow.",
        tip: "Let marker strokes show. A little streakiness keeps the bottle handmade."
      },
      {
        name: "Seal the sunny sticker",
        text: "Reinforce the existing outlines, deepen the marker fills, and sharpen the highlights and shadow already on the page.",
        tip: "Stop before adding text or extra beach props. The wink, sun badge, and bright fill do the work.",
        image: true
      }
    ]
  },
  {
    slug: "bubble-letter-wow-doodle",
    day: "008",
    date: "Saturday, June 13",
    isoDate: "2026-06-13",
    subject: "a bubble-letter WOW doodle",
    headlineSubject: "a bubble-letter<br>WOW doodle",
    shortSubject: "a WOW doodle",
    lessonTitle: "Let's doodle a bubble-letter WOW",
    description: "Learn how to draw a bubble-letter WOW doodle with light letter guides, rounded bubble outlines, thick black marker, comic burst marks, pink and orange fill, white shine gaps, and a purple drop shadow.",
    intro: "Start with loose letter guides, puff them into bubble letters, then add comic bursts, loud marker color, shine gaps, and a drop shadow. Keep the letters chunky and readable before you decorate.",
    time: 15,
    difficulty: "Easy",
    accent: "#f04f9a",
    finished: "bubble-letter-wow-doodle-finished-v1.jpg",
    finishedAlt: "Bold marker doodle of the word WOW in pink and orange bubble letters with thick black outline, white shine gaps, purple drop shadow, comic burst marks, and visible marker texture",
    materials: ["Drawing paper", "Black and colored markers", "White gel pen"],
    materialNote: "Use black for the outline and burst marks, pink and orange for the letters, purple for the drop shadow, and the gel pen only for shine gaps if you do not leave them white.",
    tipLabel: "Doodle tip",
    steps: [
      {
        name: "Sketch the WOW",
        text: "Write a light W O W guide across one baseline, leaving extra space around every letter.",
        tip: "The guide can be loose. You are drawing a scaffold for bubble letters, not final handwriting."
      },
      {
        name: "Bubble the letters",
        text: "Wrap rounded outlines around each letter and keep the center of the O open.",
        tip: "Make the W corners soft and puffy. Sharp zigzags will make the word feel less bubbly."
      },
      {
        name: "Ink the word",
        text: "Trace the bubble letters with a thick black marker, following the rounded outlines already on the page.",
        tip: "Pause around the O center so the hole stays clear after the outline gets thicker."
      },
      {
        name: "Pop the burst marks",
        text: "Add small comic burst marks around the word without touching the letter shapes.",
        tip: "Keep the bursts outside the word. They should make the WOW louder, not harder to read."
      },
      {
        name: "Fill the loud color",
        text: "Fill the W letters pink and the O orange, leave white shine gaps, and add a purple drop shadow behind the word.",
        tip: "Color inside the black outline first, then add the shadow so it tucks behind the letters."
      },
      {
        name: "Make the WOW shout",
        text: "Reinforce the existing outline and burst marks, deepen the marker fills, and clean up the shine gaps and drop shadow.",
        tip: "Do not add more words. One bold WOW with a few burst marks is easier to read.",
        image: true
      }
    ]
  },
  {
    slug: "whoopee-cushion-sticker",
    day: "026",
    date: "Wednesday, July 1",
    isoDate: "2026-07-01",
    subject: "a whoopee cushion sticker",
    headlineSubject: "a whoopee<br>cushion sticker",
    shortSubject: "a whoopee cushion",
    lessonTitle: "Let's doodle a whoopee cushion sticker",
    description: "Learn how to draw a whoopee cushion sticker with a squashed cushion body, side nozzle, multiple puff clouds, tongue-out goofy face, thick black outline, red marker fill, and white highlights.",
    intro: "Build one squashed cushion from the outside shape first, point the nozzle, add puff clouds and a tongue-out face, then finish it with bold red marker. Keep the joke visual and text-free so the shape does the work.",
    time: 15,
    difficulty: "Easy",
    accent: "#e63832",
    finished: "whoopee-cushion-sticker-finished-v1.jpg",
    finishedAlt: "Bold marker doodle of a red whoopee cushion sticker with side nozzle, multiple pink puff clouds, tongue-out goofy face, pink sticker shadow, thick black outline, white highlights, and marker texture",
    materials: ["Drawing paper", "Black and colored markers", "White gel pen"],
    materialNote: "Use black for the outline, red for the cushion, gray for the shadow, and the gel pen only for small shine marks.",
    tipLabel: "Doodle tip",
    steps: [
      {
        name: "Squash the cushion",
        text: "Draw a rounded flattened cushion body and a small nozzle guide on one side, keeping any inside guide lines pale enough to ignore later.",
        tip: "If you are drawing straight in marker, skip the inside guide marks and draw only the outside cushion shape."
      },
      {
        name: "Bump the soft edge",
        text: "Make the cushion edge a little lumpy and pinch the side nozzle into a short open tube.",
        tip: "Keep the bumps gentle. The cushion should look soft, not spiky."
      },
      {
        name: "Ink the prank shape",
        text: "Trace the cushion body and nozzle with a thick black marker outline, following the shapes already on the page.",
        tip: "Ink the existing shapes only. The outline should make the cushion bolder, not change its pose."
      },
      {
        name: "Add face and puffs",
        text: "Draw two wide eyes, a big open smile, a tongue, wrinkle folds, and two small puff clouds coming from the nozzle.",
        tip: "Keep the puff clouds separate from the face. The cushion should read as one clear shape with the joke happening off to the side."
      },
      {
        name: "Fill the cushion red",
        text: "Color the cushion and nozzle red, color the tongue and puff clouds pink, deepen the mouth, and leave a few highlight gaps.",
        tip: "Use short marker strokes that follow the cushion curve so the fill keeps a handmade texture."
      },
      {
        name: "Land the prank finish",
        text: "Retrace the existing outlines, deepen the red fill, and sharpen the tongue, puff clouds, folds, shadow, and highlights already on the page.",
        tip: "Stop before adding extra symbols. The cushion, face, tongue, and puff clouds are enough for the joke.",
        image: true
      }
    ]
  },
  {
    slug: "retro-arcade-joystick-sticker",
    day: "009",
    date: "Sunday, June 14",
    isoDate: "2026-06-14",
    subject: "a retro arcade joystick sticker",
    headlineSubject: "a retro arcade<br>joystick sticker",
    shortSubject: "a retro arcade joystick",
    lessonTitle: "Let's doodle a retro arcade joystick sticker",
    description: "Learn how to draw a retro arcade joystick sticker with a rounded base, joystick stem, red ball top, yellow buttons, cute face, star accent, thick black outline, teal marker fill, and gray shadow.",
    intro: "Build the controller base first, add the stick and buttons, then turn it into a bright arcade sticker with a tiny face, star, and marker color. Change the button colors if you want your own cabinet vibe.",
    time: 15,
    difficulty: "Easy",
    accent: "#0f9fa4",
    finished: "retro-arcade-joystick-sticker-finished-v1.jpg",
    finishedAlt: "Bold marker doodle of a retro arcade joystick sticker with teal rounded base, red ball top, yellow buttons, cute face, star accent, thick black outline, gray shadow, white highlights, and marker texture",
    materials: ["Drawing paper", "Black and colored markers", "White gel pen"],
    materialNote: "Use black for the outline, teal for the base, red for the joystick ball, yellow for the buttons, gray for the shadow, and the gel pen only for small shine marks.",
    tipLabel: "Doodle tip",
    steps: [
      {
        name: "Set the arcade base",
        text: "Draw a rounded rectangle base, then place a short joystick stem near one side.",
        tip: "Tilt the base just a little. That makes the sticker feel more playful than a flat diagram."
      },
      {
        name: "Add ball and buttons",
        text: "Add a round ball on top of the stem, then draw two button circles on the open side of the base.",
        tip: "Leave space between the buttons. Clear gaps make the controller readable after the thick outline goes on."
      },
      {
        name: "Ink the controls",
        text: "Trace the base, joystick, ball, and buttons with a thick black marker outline.",
        tip: "Follow the shapes you already placed. This pass should make the controller bolder, not rearrange it."
      },
      {
        name: "Give it a face",
        text: "Add two little eyes, a small smile, and one star accent on the base.",
        tip: "Keep the face low on the base so it does not compete with the joystick ball."
      },
      {
        name: "Fill the arcade colors",
        text: "Fill the base teal, the joystick ball red, and the buttons yellow, then add a gray sticker shadow and small highlight gaps.",
        tip: "Marker streaks are fine here. They make the controller feel hand-doodled instead of printed."
      },
      {
        name: "Power up the sticker",
        text: "Retrace the existing outlines, deepen the marker fills, and sharpen the face, star, shadow, and highlights already on the page.",
        tip: "Do not add a screen or logo at the end. The base, stick, buttons, and face are enough to sell the arcade idea.",
        image: true
      }
    ]
  },
  {
    slug: "cartoon-asteroid-doodle",
    day: "025",
    date: "Tuesday, June 30",
    isoDate: "2026-06-30",
    subject: "a cartoon asteroid doodle",
    headlineSubject: "a cartoon<br>asteroid<br>doodle",
    shortSubject: "an asteroid doodle",
    lessonTitle: "Let's doodle a cartoon asteroid",
    description: "Learn how to draw a cartoon asteroid doodle with a lumpy rock body, flame trail, crater spots, cute face, star puffs, thick black outline, and bright marker fills.",
    intro: "Build one lumpy space rock, trail it with comic flames, then add craters, a happy face, and bold marker color. The exact face, crater count, and flame shape are yours to play with.",
    time: 15,
    difficulty: "Easy",
    accent: "#f28b24",
    finished: "cartoon-asteroid-doodle-finished-v1.jpg",
    finishedAlt: "Bold marker doodle of a smiling cartoon asteroid with gray-brown cratered rock, orange and yellow flame trail, small star puffs, thick black outline, white highlights, and marker texture",
    materials: ["Drawing paper", "Black and colored markers", "White gel pen"],
    materialNote: "Use black for the outline, gray-brown for the rock, yellow and orange for the flame, and the gel pen only for small shine marks.",
    tipLabel: "Doodle tip",
    steps: [
      {
        name: "Aim the asteroid",
        text: "Draw a tilted oval or bean shape for the asteroid body, then sketch simple flame guide lines behind it.",
        tip: "Set the angle first. A diagonal pose makes the asteroid feel like it is streaking across the page."
      },
      {
        name: "Bump out the rock",
        text: "Turn the oval into a lumpy rock body and wrap a rough flame trail around the guide lines.",
        tip: "Make the bumps uneven. A perfect potato shape will feel less like a space rock."
      },
      {
        name: "Ink the flight path",
        text: "Trace the asteroid and flame trail with a thick black outline, keeping the same diagonal shape.",
        tip: "Use one confident edge around the outside, then leave the inner flame lines a little lighter."
      },
      {
        name: "Add craters and a face",
        text: "Draw three crater spots, two eyes, a smiling mouth, and a few small star puffs around the asteroid.",
        tip: "Place the face on the front half of the rock so the flame still reads as the tail. Try a grin, wink, or surprised mouth if you want a different personality."
      },
      {
        name: "Fill the space colors",
        text: "Fill the rock gray-brown, color the flame yellow and orange, and leave small white gaps for shine.",
        tip: "Follow each shape with your marker strokes. Visible streaks make the doodle feel handmade."
      },
      {
        name: "Launch the final glow",
        text: "Retrace the existing outlines, deepen the rock and flame colors, and sharpen the highlights on the craters, eyes, and flame shapes you already drew.",
        tip: "Do not add extra planets or trails at the end. This last pass should make the asteroid brighter, not busier.",
        image: true
      }
    ]
  },
  {
    slug: "comic-chat-bubble-doodle",
    day: "010",
    date: "Monday, June 15",
    isoDate: "2026-06-15",
    subject: "a comic chat bubble doodle",
    headlineSubject: "a comic chat<br>bubble doodle",
    shortSubject: "a chat bubble doodle",
    lessonTitle: "Let's doodle a comic chat bubble",
    description: "Learn how to draw a comic chat bubble doodle with a rounded bubble, tail, notification heart, cute face, drop shadow, thick black outline, and teal marker fill.",
    intro: "Turn one rounded speech bubble into a bright marker sticker with a friendly face, tiny badge, chunky outline, and comic-style shadow. Use the heart idea, or swap in a star, dot, or lightning mark.",
    time: 15,
    difficulty: "Easy",
    accent: "#12aeb1",
    finished: "comic-chat-bubble-doodle-finished-v1.jpg",
    finishedAlt: "Bold marker doodle of a teal comic chat bubble with tail, cute face, heart notification badge, gray shadow, white highlights, thick black outline, and marker texture",
    materials: ["Drawing paper", "Black and colored markers", "White gel pen"],
    materialNote: "Use teal for the bubble, pink for the heart, gray for the shadow, and the gel pen only for tiny shine marks.",
    tipLabel: "Doodle tip",
    steps: [
      {
        name: "Round the bubble",
        text: "Draw a wide rounded chat bubble with a little tail, then place a small circle badge on the upper corner.",
        tip: "Keep the corners soft and roomy. The doodle needs space for a face and color."
      },
      {
        name: "Ink the bubble edge",
        text: "Trace the bubble, tail, and badge with a thick black marker outline.",
        tip: "Turn the paper as you draw the corners. A confident outline is the main personality of this doodle."
      },
      {
        name: "Add face and heart",
        text: "Add two simple eyes, a small smile, and a heart inside the badge circle.",
        tip: "Leave a little breathing room around the face so the bubble still feels like one clean shape."
      },
      {
        name: "Drop in the shadow",
        text: "Add a gray offset shadow behind the lower and right edges of the bubble.",
        tip: "Keep the shadow tucked close to the outline. A small shadow reads more like a sticker."
      },
      {
        name: "Fill the message colors",
        text: "Fill the bubble with teal marker, color the heart pink, and add tiny white shine marks on the bubble and badge.",
        tip: "Color in short strokes that follow the bubble shape. Visible marker streaks keep it handmade."
      },
      {
        name: "Send the final pop",
        text: "Retrace the existing outline, smooth the teal and pink fills, and sharpen the face, heart, shadow, and shine marks already on the page.",
        tip: "Do not add extra icons at the end. If you want a different badge symbol, choose it earlier and then make that version bolder here.",
        image: true
      }
    ]
  },
  {
    slug: "smiling-envelope-sticker",
    day: "011",
    date: "Tuesday, June 16",
    isoDate: "2026-06-16",
    subject: "a smiling envelope sticker",
    headlineSubject: "a smiling<br>envelope<br>sticker",
    shortSubject: "an envelope sticker",
    lessonTitle: "Let's doodle a smiling envelope sticker",
    description: "Learn how to draw a smiling envelope sticker with rounded corners, folded flap lines, cute face, heart stamp, gray shadow, thick black outline, and yellow marker fill.",
    intro: "Start with one rounded rectangle, fold it into an envelope, then add a friendly face, stamp, sticker shadow, and warm marker color. The stamp and expression can change to fit your doodle.",
    time: 15,
    difficulty: "Easy",
    accent: "#f3b63c",
    finished: "smiling-envelope-sticker-finished-v1.jpg",
    finishedAlt: "Bold marker doodle of a smiling yellow envelope sticker with folded flap lines, heart stamp, cute face, gray shadow, white highlights, thick black outline, and marker texture",
    materials: ["Drawing paper", "Black and colored markers", "White gel pen"],
    materialNote: "Use yellow for the envelope, coral or red for the heart stamp, gray for the shadow, and the gel pen only for small shine marks.",
    tipLabel: "Doodle tip",
    steps: [
      {
        name: "Block the envelope",
        text: "Draw a wide rounded rectangle for the envelope sticker body.",
        tip: "Round the corners more than a real envelope. Sticker shapes look friendlier when the edges are soft."
      },
      {
        name: "Fold the flap",
        text: "Add the diagonal flap lines, bring them to a soft point near the middle, and thicken the outer edge with black marker.",
        tip: "Let the flap point sit a little below center so the face has room under it."
      },
      {
        name: "Add face and stamp",
        text: "Draw two simple eyes, a small smile, and a tiny coral heart stamp in the upper corner.",
        tip: "Keep the stamp small. It should be a cute accent, not a second main subject."
      },
      {
        name: "Set the sticker shadow",
        text: "Add a gray offset shadow behind the lower and right edges of the envelope.",
        tip: "Follow the same rounded rectangle shape so the shadow feels attached to the sticker."
      },
      {
        name: "Fill the happy mail",
        text: "Fill the envelope with warm yellow marker and add small white shine marks on the existing envelope and stamp shapes.",
        tip: "Color around the eyes and smile carefully so the expression stays crisp."
      },
      {
        name: "Seal the sticker finish",
        text: "Retrace the existing outline, even the marker fill, and clarify the face, flap, heart stamp, shadow, and shine marks already in place.",
        tip: "Skip extra letters or postage marks. A simple face plus one small stamp shape is enough, whether yours is a heart, star, dot, or tiny flower.",
        image: true
      }
    ]
  },
  {
    slug: "comic-camera-flash-doodle",
    day: "024",
    date: "Monday, June 29",
    isoDate: "2026-06-29",
    subject: "a comic camera flash doodle",
    headlineSubject: "a comic camera<br>flash doodle",
    shortSubject: "a camera flash doodle",
    lessonTitle: "Let's doodle a camera flash",
    description: "Learn how to draw a comic camera flash doodle with a rounded camera body, big lens, starburst flash, cute face, strap, thick black outline, and bright marker fills.",
    intro: "Turn a simple camera shape into a cheerful marker doodle with one big lens, a pop of flash, and bold color that fits Camera Day.",
    time: 15,
    difficulty: "Easy",
    accent: "#12aeb1",
    finished: "comic-camera-flash-doodle-finished-v1.jpg",
    finishedAlt: "Bold marker doodle of a cute teal comic camera with large lens, yellow flash burst, pink strap, face, buttons, thick black outline, and marker texture",
    materials: ["Drawing paper", "Black and colored markers", "White gel pen"],
    materialNote: "Use black for the outline, teal and pink for the camera body and strap, yellow for the flash, and the gel pen only for tiny shine marks.",
    tipLabel: "Doodle tip",
    steps: [
      {
        name: "Block the camera body",
        text: "Draw a wide rounded rectangle for the camera, then add a small bump along the top edge.",
        tip: "Round the corners more than a real camera. A soft body shape makes the doodle friendlier."
      },
      {
        name: "Pop in the lens",
        text: "Place a big circle in the middle of the body, then add a smaller circle inside it for the lens ring.",
        tip: "Keep the lens large. It is the anchor that makes the camera read quickly."
      },
      {
        name: "Spark the flash",
        text: "Add a starburst flash shape from the upper corner, letting it overlap the camera body a little.",
        tip: "Use uneven points on the flash. A hand-drawn burst feels livelier than a perfect star."
      },
      {
        name: "Add face and buttons",
        text: "Draw two small eyes, a tiny smile, a shutter button, and a few simple top controls.",
        tip: "Leave clear space around the lens so the face does not crowd the main camera shape."
      },
      {
        name: "Fill the snapshot colors",
        text: "Add the side strap, then fill the body teal, the flash yellow, the strap pink, and the lens gray and black.",
        tip: "Color with short strokes that follow each shape. Visible marker texture helps the doodle feel handmade."
      },
      {
        name: "Snap the final shine",
        text: "Retrace the existing edges, deepen the marker fills, and add tiny highlights to the lens and flash shapes you already drew.",
        tip: "Do not add extra camera parts at the end. This pass should make the snapshot brighter, not busier.",
        image: true
      }
    ]
  },
  {
    slug: "cassette-tape-sticker",
    day: "023",
    date: "Sunday, June 28",
    isoDate: "2026-06-28",
    subject: "a cassette tape sticker doodle",
    headlineSubject: "a cassette<br>tape sticker",
    shortSubject: "a cassette tape sticker",
    lessonTitle: "Let's doodle a cassette tape sticker",
    description: "Learn how to draw a cassette tape sticker doodle with a rounded body, blank label window, tape reels, bottom stripe, screw dots, thick black outline, and bright marker fills.",
    intro: "Turn one rounded rectangle into a retro marker sticker with blank label space, two tape reels, and a chunky black outline.",
    time: 15,
    difficulty: "Easy",
    accent: "#12aeb1",
    finished: "cassette-tape-sticker-finished-v1.jpg",
    finishedAlt: "Bold marker doodle of a retro cassette tape sticker with teal body, blank label window, tape reels, red bottom stripe, screw dots, thick black outline, and marker texture",
    materials: ["Drawing paper", "Black marker", "Teal, pink, yellow, red, and gray markers", "White gel pen"],
    materialNote: "Keep the cassette label blank; the shape should read without tiny words.",
    tipLabel: "Doodle tip",
    steps: [
      {
        name: "Round the cassette body",
        text: "Draw a wide rounded rectangle for the cassette sticker body.",
        tip: "Soften the corners before you ink them. Rounded corners make the cassette feel sticker-like."
      },
      {
        name: "Frame the label window",
        text: "Add a blank rounded label window near the top of the cassette body.",
        tip: "Skip lettering. A clean blank label keeps the doodle readable at small size."
      },
      {
        name: "Place the tape reels",
        text: "Draw two even circles below the label, then connect the middle with simple tape-window shapes.",
        tip: "Keep the reels level with each other. The cassette looks tidier when the circles share one centerline."
      },
      {
        name: "Add stripe and screws",
        text: "Add the bottom stripe, tiny screw dots in the corners, and a few small cassette details.",
        tip: "Use dots and short dashes only. This is a doodle, not a real cassette diagram."
      },
      {
        name: "Fill the retro color",
        text: "Thicken the black outline, fill the body teal, color the bottom stripe red, and add yellow, pink, and gray accents.",
        tip: "Let marker streaks show inside the big teal body. They make the sticker feel hand colored."
      },
      {
        name: "Tune up the sticker",
        text: "Retrace the existing cassette, reel, window, and stripe edges, then deepen the marker fills and add tiny highlights only to shapes you already drew.",
        tip: "Do not add words at the end. The blank label is part of the simple retro look.",
        image: true
      }
    ]
  },
  {
    slug: "skateboard-sticker-doodle",
    day: "022",
    date: "Saturday, June 27",
    isoDate: "2026-06-27",
    subject: "a skateboard sticker doodle",
    headlineSubject: "skateboard<br>sticker",
    shortSubject: "a skateboard sticker",
    lessonTitle: "Let's doodle a skateboard sticker",
    description: "Learn how to draw a skateboard sticker doodle with a rounded deck, trucks, wheels, cute face, star sticker, diagonal stripes, thick black outline, and bright marker fills.",
    intro: "Turn one rounded deck into a cheerful sticker-style skateboard with bold marker edges, simple wheels, and a tiny face.",
    time: 15,
    difficulty: "Easy",
    accent: "#16aeb2",
    finished: "skateboard-sticker-doodle-finished-v1.jpg",
    finishedAlt: "Bold marker doodle of a cute teal skateboard sticker with wheels, trucks, face, yellow star, red stripes, thick black outline, and marker texture",
    materials: ["Drawing paper", "Black marker", "Teal, yellow, red, and gray markers", "White gel pen"],
    materialNote: "Use scrap paper underneath; the teal fill looks best when a little marker streaking stays visible.",
    tipLabel: "Doodle tip",
    steps: [
      {
        name: "Draw the deck",
        text: "Draw a long rounded skateboard deck at a slight angle, like a stretched capsule.",
        tip: "Round both ends generously. That soft sticker shape is easier to outline with marker."
      },
      {
        name: "Add trucks and wheels",
        text: "Place one truck bar near each end, then add two small wheels on each bar.",
        tip: "Keep the wheels simple circles or short cylinders. They only need to read clearly at small size."
      },
      {
        name: "Give it a face",
        text: "Add two oval eyes and a small curved smile in the open middle of the deck.",
        tip: "Center the face between the trucks so it does not fight with the wheels."
      },
      {
        name: "Place the stickers",
        text: "Draw one star near the top and two diagonal stripe bands across the lower half of the deck.",
        tip: "Let the stripes follow the deck angle. Parallel bands feel cleaner than random slashes."
      },
      {
        name: "Fill the marker color",
        text: "Thicken the black outline, fill the deck teal, color the star yellow, the stripes red, and the wheels and trucks gray.",
        tip: "Color around the face slowly so the expression stays crisp."
      },
      {
        name: "Add sticker shine",
        text: "Trace the deck and wheel edges one last time, even out the teal, red, yellow, and gray fills, and add tiny highlights only to shapes you already drew.",
        tip: "Keep the shine small. A few crisp marks make the skateboard feel like a sticker without adding new decorations.",
        image: true
      }
    ]
  },
  {
    slug: "cartoon-coconut-drink",
    day: "021",
    date: "Friday, June 26",
    isoDate: "2026-06-26",
    subject: "a cartoon coconut drink doodle",
    headlineSubject: "a cartoon<br>coconut<br>drink",
    shortSubject: "a cartoon coconut drink",
    lessonTitle: "Let's doodle a coconut drink",
    description: "Learn how to draw a cartoon coconut drink doodle with a round coconut body, top opening, cute face, bendy straw, tiny umbrella, thick black outline, and bright marker fills.",
    intro: "Turn a round coconut into a cheerful tropical marker doodle with one face, one straw, and a small umbrella that stays easy to build.",
    time: 15,
    difficulty: "Easy",
    accent: "#1aa6aa",
    finished: "cartoon-coconut-drink-finished-v1.jpg",
    finishedAlt: "Bold marker doodle of a cartoon coconut drink with brown coconut body, smiling face, striped teal straw, tiny colorful umbrella, thick black outline, and marker texture",
    materials: ["Drawing paper", "Black marker", "Brown, teal, pink, yellow, and green markers"],
    materialNote: "Use scrap paper underneath; the brown fill looks best when a little marker streaking stays visible.",
    tipLabel: "Doodle tip",
    steps: [
      {
        name: "Start the coconut",
        text: "Draw a big round coconut body with a slightly flattened base so it can sit firmly on the page.",
        tip: "Keep the shape simple. The face, straw, and umbrella will bring the personality later."
      },
      {
        name: "Cut the top opening",
        text: "Add a wide oval near the top and thicken its lower edge to make the dark drink rim.",
        tip: "Place the oval inside the coconut, not on the outside edge. That keeps the top from looking like a hat."
      },
      {
        name: "Add the face",
        text: "Draw two simple eyes and a small curved smile on the front of the coconut.",
        tip: "Leave room above the face for the straw. A low face makes the coconut look rounder."
      },
      {
        name: "Add straw and umbrella",
        text: "Draw a striped bendy straw leaning out of the top opening, then tuck a tiny triangle umbrella behind it.",
        tip: "Let the umbrella overlap the rim a little. That overlap makes the drink pieces feel connected."
      },
      {
        name: "Fill the marker color",
        text: "Fill the coconut brown, color the straw stripes teal, and add bright pink, yellow, and green sections to the umbrella.",
        tip: "Color around the face slowly. Clean white eye highlights make the marker doodle feel crisp."
      },
      {
        name: "Brighten the vacation colors",
        text: "Retrace the coconut rim, straw, umbrella, and face, then deepen the brown and bright marker fills only inside the shapes you already drew.",
        tip: "Stop before adding extra fruit or beach props. The tiny umbrella already gives the drink its tropical personality.",
        image: true
      }
    ]
  },
  {
    slug: "smiling-pizza-slice-doodle",
    day: "020",
    date: "Thursday, June 25",
    isoDate: "2026-06-25",
    subject: "a smiling pizza slice doodle",
    headlineSubject: "a smiling<br>pizza slice",
    shortSubject: "a smiling pizza slice",
    lessonTitle: "Let's doodle a pizza slice",
    description: "Learn how to draw a smiling pizza slice doodle with a bold black marker outline, puffy crust, cute face, pepperoni circles, cheese stretch, and bright marker fills.",
    intro: "Turn one simple triangle into a cheerful marker doodle with thick outlines, saturated color, and a face that stays easy to draw. Toppings are a chance to make the slice your own.",
    time: 15,
    difficulty: "Easy",
    accent: "#f6b72f",
    finished: "smiling-pizza-slice-doodle-finished-v2.jpg",
    finishedAlt: "Bold marker doodle of a smiling pizza slice with yellow cheese, orange crust, red pepperoni, thick black outline, and a small cheese stretch",
    materials: ["Drawing paper", "Black marker", "Yellow, orange, and red markers"],
    materialNote: "Use scrap paper underneath; the yellow fill looks better when you let marker streaks show.",
    tipLabel: "Doodle tip",
    steps: [
      {
        name: "Start the slice shape",
        text: "Draw a wide triangle that points down. Round the lower point slightly so the slice feels soft instead of sharp.",
        tip: "Make the top edge wider than you think. The crust needs room to sit on it."
      },
      {
        name: "Round the crust and drip",
        text: "Add a puffy band across the top of the triangle, then sketch one small cheese stretch hanging from the lower edge.",
        tip: "Put the drip in before the marker outline. Later steps should only strengthen shapes you already planned."
      },
      {
        name: "Thicken the outline",
        text: "Trace the triangle sides, lower point, cheese stretch, and crust with a bold black marker line.",
        tip: "Move slowly around the crust bumps and drip. The handmade wobble is good, but every dark line should follow an existing contour."
      },
      {
        name: "Add the face and toppings",
        text: "Draw two simple eyes, a small smile, and a few round pepperoni circles around the face.",
        tip: "Leave breathing room around the eyes. If a pepperoni touches the face, the expression gets harder to read."
      },
      {
        name: "Fill the marker color",
        text: "Fill the cheese and cheese stretch yellow, color the crust orange-brown, and fill the pepperoni red.",
        tip: "Color with short strokes in one direction. The streaks make the doodle feel marker-made."
      },
      {
        name: "Crisp the slice edges",
        text: "Retrace the crust, drip, face, and pepperoni edges, then deepen the yellow, orange, and red marker fills you already placed.",
        tip: "Skip brand-new toppings in the final pass. Choose your pepperoni, mushroom, or veggie shapes earlier, then use this step to make that recipe warmer and cleaner.",
        image: true
      }
    ]
  },
  {
    slug: "hot-rod-marker-flames",
    day: "019",
    date: "Wednesday, June 24",
    isoDate: "2026-06-24",
    subject: "hot rod marker flames",
    headlineSubject: "hot rod<br>marker flames",
    shortSubject: "hot rod marker flames",
    lessonTitle: "Let's doodle flames",
    description: "Learn how to draw hot rod-style marker flames with bold black outlines, orange fill, yellow inner flames, red edge accents, and handmade marker texture.",
    intro: "Try a bolder Doodlea.day mode: black felt-tip outlines, bright marker fill, and a simple flame shape that feels more comic panel than pencil sketch.",
    time: 15,
    difficulty: "Easy",
    accent: "#f05a28",
    finished: "hot-rod-marker-flames-finished-v1.jpg",
    finishedAlt: "Bold marker doodle of hot rod-style flames with black outline, orange fill, yellow inner flames, and red edge accents",
    materials: ["Drawing paper", "Black marker", "Orange and yellow markers", "Optional red marker"],
    materialNote: "Use scrap paper underneath; marker can bleed through.",
    tipLabel: "Doodle tip",
    steps: [
      {
        name: "Sweep the flame paths",
        text: "Draw a low curved baseline, then pull three tall swooping paths upward like stretched S-curves.",
        tip: "Let the middle path be tallest. The side paths can lean outward to make the shape feel fast."
      },
      {
        name: "Connect the outside shape",
        text: "Use the guide paths to make one connected flame outline with pointed tips and rounded dips between them.",
        tip: "Keep the valleys round. Sharp valleys make the flames look thorny instead of hot rod-style."
      },
      {
        name: "Thicken the outline",
        text: "Trace the outside shape with a bold black marker, pressing slowly around the curves and points.",
        tip: "A slightly uneven marker edge is fine. Aim for energy, not perfect symmetry."
      },
      {
        name: "Add inner flames",
        text: "Draw two smaller flame tongues inside the big shape, letting them rise from the baseline and curve with the outer flames.",
        tip: "Leave enough orange space around the inner flames so the yellow fill will stand out."
      },
      {
        name: "Fill with marker color",
        text: "Fill the outer flame with orange, color the inner shapes yellow, and add a few red accents along the outside edges.",
        tip: "Color in short strokes and let a few streaks show. Marker texture makes the doodle feel handmade."
      },
      {
        name: "Turn up the heat",
        text: "Retrace the flame tips and valleys, deepen the orange and yellow fills, and sharpen the red accents you already placed.",
        tip: "No new flame tongues here. The heat comes from stronger edges and hotter color, not more shapes.",
        image: true
      }
    ]
  },
  {
    slug: "firework-burst-doodle",
    day: "018",
    date: "Tuesday, June 23",
    isoDate: "2026-06-23",
    subject: "a firework burst doodle",
    headlineSubject: "a firework<br>burst",
    shortSubject: "a firework burst",
    lessonTitle: "Let's doodle a firework burst",
    description: "Learn how to draw a firework burst doodle with a bright center, bold black burst shapes, red and blue marker fills, small sparks, and comic-style energy.",
    intro: "Build a patriotic firework from one center dot and repeated burst shapes, then make it pop with thick outlines and bright marker color.",
    time: 15,
    difficulty: "Easy",
    accent: "#d94234",
    finished: "firework-burst-doodle-finished-v1.jpg",
    finishedAlt: "Bold marker doodle of a red and blue firework burst with thick black outlines, yellow center, and small colorful sparks",
    materials: ["Drawing paper", "Black marker", "Red, blue, and yellow markers", "White gel pen"],
    materialNote: "Use scrap paper underneath; the repeated burst shapes are easier if you rotate the page.",
    tipLabel: "Doodle tip",
    steps: [
      {
        name: "Draw the burst guides",
        text: "Draw a small center circle, then place light spoke guides around it like a simple starburst.",
        tip: "Leave gaps between the spokes. Those gaps will keep the colored bursts from touching each other."
      },
      {
        name: "Shape the star tips",
        text: "Turn each guide into a long rounded diamond or kite shape, alternating tall and short bursts.",
        tip: "Vary the lengths a little. A perfect clock shape can look stiff."
      },
      {
        name: "Thicken the burst outline",
        text: "Trace the center circle and every burst shape with a confident black marker line.",
        tip: "Slow down at the points. Rounded tips are friendlier and easier to color than sharp spikes."
      },
      {
        name: "Add little sparks",
        text: "Scatter small dots and short dash marks around the outside of the burst.",
        tip: "Keep the sparks away from the main shapes so the firework still has a clean silhouette."
      },
      {
        name: "Fill the firework color",
        text: "Color the center yellow, then alternate red and blue marker fill through the burst shapes and tiny sparks.",
        tip: "Let marker streaks show inside each burst. The texture makes the doodle feel handmade."
      },
      {
        name: "Make the burst sparkle",
        text: "Strengthen the burst outlines, brighten the red, blue, and yellow fills, and add small white highlight marks inside the existing shapes.",
        tip: "Do not add new burst arms at the end. This pass should only make the shapes you already drew brighter.",
        image: true
      }
    ]
  },
  {
    slug: "trophy-cup-sticker",
    day: "017",
    date: "Monday, June 22",
    isoDate: "2026-06-22",
    subject: "a trophy cup sticker",
    headlineSubject: "a trophy<br>cup",
    shortSubject: "a trophy cup",
    lessonTitle: "Let's doodle a trophy cup",
    description: "Learn how to draw a trophy cup sticker with a rounded cup, side handles, thick black outline, gold marker fill, orange shadow, shine marks, and small confetti dots.",
    intro: "Use one big cup shape and two loop handles to make a celebratory marker doodle that feels like a sticker.",
    time: 15,
    difficulty: "Easy",
    accent: "#f2b12d",
    finished: "trophy-cup-sticker-finished-v1.jpg",
    finishedAlt: "Bold marker doodle of a gold trophy cup sticker with black outline, orange shadow, shine marks, and confetti dots",
    materials: ["Drawing paper", "Black marker", "Yellow and orange markers"],
    materialNote: "Use a broad yellow marker for the cup and a narrower black marker for tightening the outline.",
    tipLabel: "Doodle tip",
    steps: [
      {
        name: "Block the trophy",
        text: "Draw a wide oval rim, curve the cup sides inward, then add a short stem and rectangular base underneath.",
        tip: "Keep the cup wider than the base. That top-heavy shape is what reads as a trophy."
      },
      {
        name: "Add the handles",
        text: "Draw one loop handle on each side, attaching them near the rim and the lower cup.",
        tip: "Make the handles almost mirror each other, but do not worry about perfect symmetry."
      },
      {
        name: "Thicken the trophy outline",
        text: "Trace the rim, cup, handles, stem, and base with a bold black marker line.",
        tip: "Use the thick outline to simplify any wobbly construction lines."
      },
      {
        name: "Add shine and confetti",
        text: "Draw one white shine shape on the cup and scatter a few small confetti dots around the trophy.",
        tip: "Keep the shine on one side so the cup still feels rounded."
      },
      {
        name: "Fill the gold marker",
        text: "Color the trophy yellow, then add orange marker along one side and across the base for shadow.",
        tip: "Leave a few marker streaks and the shine shape uncolored. That keeps the cup bright."
      },
      {
        name: "Polish the trophy shine",
        text: "Tighten the cup, handle, and base outlines, deepen the gold and orange marker fills, and keep the shine shape clean.",
        tip: "Leave the confetti count alone. The trophy should feel polished, not crowded.",
        image: true
      }
    ]
  },
  {
    slug: "goofy-monster-face",
    day: "014",
    date: "Friday, June 19",
    isoDate: "2026-06-19",
    subject: "a goofy monster face",
    headlineSubject: "a goofy<br>monster face",
    shortSubject: "a goofy monster face",
    lessonTitle: "Let's doodle a goofy monster face",
    description: "Learn how to draw a goofy monster face with a round head, little horns, uneven eyes, toothy grin, cheek spots, thick black outline, and bright marker fills.",
    intro: "Start with one friendly blob shape, then add horns, mismatched eyes, and a big toothy grin before the marker color goes in. Monster faces are especially good for playful detours.",
    time: 15,
    difficulty: "Easy",
    accent: "#76c943",
    finished: "goofy-monster-face-finished-v1.jpg",
    finishedAlt: "Bold marker doodle of a goofy green monster face with purple horns, uneven eyes, toothy grin, yellow cheek spots, thick black outline, and marker texture",
    materials: ["Drawing paper", "Black marker", "Green, purple, yellow, and gray markers", "White gel pen"],
    materialNote: "Use scrap paper underneath; bright green marker often needs a second light pass.",
    tipLabel: "Doodle tip",
    steps: [
      {
        name: "Start the head",
        text: "Draw a round blobby head shape with a slightly flat bottom so the monster feels friendly.",
        tip: "Keep the outline simple. The expression will make it goofy."
      },
      {
        name: "Add the horns",
        text: "Place two small rounded horns on top of the head and add a couple of curved bands inside them.",
        tip: "Make the horns short and chunky. Long sharp horns will make the face feel scarier."
      },
      {
        name: "Make the eyes uneven",
        text: "Draw one large eye and one smaller eye, then fill the pupils with black marker.",
        tip: "The uneven sizes are the joke. Do not try to make them perfectly symmetrical."
      },
      {
        name: "Draw the toothy grin",
        text: "Add a wide curved mouth and break the smile into a few simple square teeth.",
        tip: "Leave white paper inside the teeth. Clean tooth shapes help the grin read fast."
      },
      {
        name: "Add spots and color",
        text: "Add round cheek spots, thicken the black outline, fill the head green, color the horns purple, and make the spots yellow.",
        tip: "Color in one direction where you can. Visible marker streaks are part of the Doodlea look."
      },
      {
        name: "Wake up the expression",
        text: "Thicken the head, horn, eye, and grin lines, deepen the green and purple fills, and add tiny highlights to the eyes and teeth.",
        tip: "Do not add a body or background in the final pass. Change the horns, teeth, or colors if you like, but keep the finish focused on the face.",
        image: true
      }
    ]
  },
  {
    slug: "rainbow-lightning-bolt-badge",
    day: "012",
    date: "Wednesday, June 17",
    isoDate: "2026-06-17",
    subject: "a rainbow lightning bolt badge",
    headlineSubject: "a rainbow lightning<br>bolt badge",
    shortSubject: "a lightning bolt badge",
    lessonTitle: "Let's doodle a lightning bolt badge",
    description: "Learn how to draw a rainbow lightning bolt badge with a rounded sticker shape, central bolt, rainbow bands, accent dots, thick black outline, and bright marker fills.",
    intro: "Build a bold badge from one rounded square, then add a lightning bolt and rainbow bands for a fast marker doodle with sticker energy.",
    time: 15,
    difficulty: "Easy",
    accent: "#f6b72f",
    finished: "rainbow-lightning-bolt-badge-finished-v1.jpg",
    finishedAlt: "Bold marker doodle of a rounded blue badge with a yellow lightning bolt, red orange and green rainbow bands, accent dots, thick black outline, and marker texture",
    materials: ["Drawing paper", "Black and colored markers", "White gel pen"],
    materialNote: "Use blue for the badge, yellow for the bolt, warm and green marker bands for the rainbow, and the gel pen only for the final tiny highlights.",
    tipLabel: "Doodle tip",
    steps: [
      {
        name: "Draw the badge shape",
        text: "Draw a rounded square badge, like a soft sticker tile.",
        tip: "Round every corner before you darken the outline. A badge should feel sturdy but not stiff."
      },
      {
        name: "Zap in the bolt",
        text: "Add one angular lightning bolt down the middle of the badge.",
        tip: "Make the bolt wide enough to color later. Tiny bolt points disappear once marker outlines get thick."
      },
      {
        name: "Color the rainbow",
        text: "Curve three rainbow bands behind the bolt, then fill them red, orange, and green.",
        tip: "Let the bands tuck behind the bolt. That overlap keeps the badge from looking flat."
      },
      {
        name: "Dot the badge",
        text: "Add small accent dots in the open corners around the bolt and rainbow.",
        tip: "Keep the dots away from the bolt edges so the main shape stays bold."
      },
      {
        name: "Fill the badge color",
        text: "Fill the bolt yellow, the badge field blue, and the dots with small bright marker colors.",
        tip: "Color around the rainbow edges slowly. Clean color boundaries make the sticker shape pop."
      },
      {
        name: "Charge up the badge",
        text: "Retrace the existing outlines, deepen the blue, yellow, and rainbow fills, and add tiny highlights only to shapes you already drew.",
        tip: "Keep the finish punchy but simple. Extra symbols would fight the bolt and rainbow.",
        image: true
      }
    ]
  },
  {
    slug: "smiling-cloud-doodle",
    day: "013",
    date: "Thursday, June 18",
    isoDate: "2026-06-18",
    subject: "a smiling cloud doodle",
    headlineSubject: "a smiling<br>cloud",
    shortSubject: "a smiling cloud",
    lessonTitle: "Let's doodle a smiling cloud",
    description: "Learn how to draw a smiling cloud doodle with puffy bumps, a cute face, cheek circles, three raindrops, a tiny sun peek, thick black outline, and bright marker fills.",
    intro: "Mix rainy and sunny shapes in one cheerful marker doodle, using a puffy cloud as the anchor for every detail.",
    time: 15,
    difficulty: "Easy",
    accent: "#31a6df",
    finished: "smiling-cloud-doodle-finished-v1.jpg",
    finishedAlt: "Bold marker doodle of a smiling blue cloud with pink cheeks, three blue raindrops, a tiny yellow sun peeking out, thick black outline, and marker texture",
    materials: ["Drawing paper", "Black marker", "Blue, yellow, pink, and darker-blue markers", "White gel pen"],
    materialNote: "Use scrap paper underneath; the blue fill can stay a little streaky and handmade.",
    tipLabel: "Doodle tip",
    steps: [
      {
        name: "Draw the cloud bumps",
        text: "Draw a puffy cloud outline with a row of rounded bumps and a flatter bottom edge.",
        tip: "Vary the bump sizes a little. The cloud looks friendlier when it is not perfectly symmetrical."
      },
      {
        name: "Add the smile",
        text: "Place two simple eyes, a curved smile, and two tiny cheek circles on the cloud front.",
        tip: "Keep the face low enough that the top bumps still read as the main cloud shape."
      },
      {
        name: "Hang the raindrops",
        text: "Add three rounded raindrops under the cloud, spacing them evenly across the bottom.",
        tip: "Make the middle drop a touch lower to keep the row from feeling stiff."
      },
      {
        name: "Peek in the sun",
        text: "Tuck a tiny half sun behind the upper-right cloud edge and add a few short rays.",
        tip: "Hide part of the sun behind the cloud. That overlap makes the two weather shapes belong together."
      },
      {
        name: "Fill the weather colors",
        text: "Thicken the black outline, fill the cloud blue, the sun yellow, the cheeks pink, and the drops a darker blue.",
        tip: "Color around the eyes and smile slowly so the expression stays crisp."
      },
      {
        name: "Freshen the forecast",
        text: "Retrace the existing cloud, face, drops, and sun, deepen the marker fills, and add tiny highlights only to shapes you already drew.",
        tip: "Stop before adding extra lightning or stars. The three drops and little sun already carry the idea.",
        image: true
      }
    ]
  },
  {
    slug: "watermelon-wedge-doodle",
    day: "015",
    date: "Saturday, June 20",
    isoDate: "2026-06-20",
    subject: "a watermelon wedge doodle",
    headlineSubject: "a watermelon<br>wedge",
    shortSubject: "a watermelon wedge",
    lessonTitle: "Let's doodle a watermelon wedge",
    description: "Learn how to draw a watermelon wedge doodle with a wide triangle slice, curved rind bands, tiny smiling face, black seed drops, thick black outline, and red-green marker fills.",
    intro: "Use one triangle and one curved rind to make a bright summer marker doodle with a tiny face and bold seed shapes.",
    time: 15,
    difficulty: "Easy",
    accent: "#ef3f3c",
    finished: "watermelon-wedge-doodle-finished-v1.jpg",
    finishedAlt: "Bold marker doodle of a smiling watermelon wedge with red fruit, green rind bands, black seed drops, thick black outline, and visible marker texture",
    materials: ["Drawing paper", "Black marker", "Red, light green, and dark green markers"],
    materialNote: "Use scrap paper underneath; broad red marker fill can bleed through thin paper.",
    tipLabel: "Doodle tip",
    steps: [
      {
        name: "Start the wedge",
        text: "Draw a wide triangle with a curved bottom edge, like a big slice sitting upright.",
        tip: "Make the bottom curve gentle. A too-flat edge will look like a road sign instead of fruit."
      },
      {
        name: "Add the rind",
        text: "Draw two curved bands along the bottom edge to separate the fruit, light rind, and dark outer rind.",
        tip: "Echo the same curve three times. Matching bands make the wedge feel solid."
      },
      {
        name: "Draw the face",
        text: "Add two dot eyes and a small curved smile in the red fruit area.",
        tip: "Keep the face below the middle so there is still room for seeds above it."
      },
      {
        name: "Place the seeds",
        text: "Scatter small teardrop seed shapes around the face, with a few high and a few low.",
        tip: "Leave gaps between seeds. Crowding them together can hide the smile."
      },
      {
        name: "Fill the marker color",
        text: "Fill the fruit red, color the upper rind light green, and fill the outer rind dark green.",
        tip: "Use long strokes that follow the triangle. Visible marker texture is part of the charm."
      },
      {
        name: "Give it sticker edges",
        text: "Thicken the wedge outline, seeds, face, and rind bands, then smooth the red and green fills without adding new seeds or props.",
        tip: "Let the final outline be thick and confident. That is what makes the slice read as a sticker-like doodle.",
        image: true
      }
    ]
  },
  {
    slug: "silly-robot-head",
    day: "016",
    date: "Sunday, June 21",
    isoDate: "2026-06-21",
    subject: "a silly robot head",
    headlineSubject: "a silly<br>robot head",
    shortSubject: "a silly robot head",
    lessonTitle: "Let's doodle a robot head",
    description: "Learn how to draw a silly robot head with a rounded blue face, spring antenna, side bolts, mismatched eyes, toothy grin, bottom button panel, and bold marker color.",
    intro: "Build a goofy robot from one rounded rectangle, then add mismatched eyes, a big grin, an antenna, and saturated marker color.",
    time: 15,
    difficulty: "Easy",
    accent: "#1697c8",
    finished: "silly-robot-head-finished-v1.jpg",
    finishedAlt: "Bold marker doodle of a silly blue robot head with mismatched eyes, toothy grin, spring antenna, yellow side bolts, and red buttons",
    materials: ["Drawing paper", "Black marker", "Blue, yellow, and red markers", "White gel pen"],
    materialNote: "Use scrap paper underneath; the blue fill looks best when marker streaks stay visible.",
    tipLabel: "Doodle tip",
    steps: [
      {
        name: "Start the head shape",
        text: "Draw a wide rounded rectangle for the robot head, then add a light center guide down the middle.",
        tip: "Round the corners generously. A boxy shape with soft corners feels friendlier than a perfect square."
      },
      {
        name: "Add antenna and bolts",
        text: "Place a zigzag spring antenna on top with a circle at the end, then add short bolt shapes on both sides.",
        tip: "Keep the side bolts level with each other. That little alignment makes the silly face easier to read."
      },
      {
        name: "Build the robot face",
        text: "Draw one big round eye, one square eye, small pupils, and a wide curved smile with simple tooth divisions.",
        tip: "Let the eyes mismatch on purpose. The contrast is what gives this robot its personality."
      },
      {
        name: "Add the button panel",
        text: "Attach a small rectangle under the head, then draw three round buttons across it.",
        tip: "Keep the panel narrower than the head so it reads like a small control strip, not a second face."
      },
      {
        name: "Fill the robot color",
        text: "Fill the head and panel blue, color the antenna and side bolts yellow, and make the three buttons red.",
        tip: "Color around the eyes and teeth carefully. Leaving those areas white keeps the expression crisp."
      },
      {
        name: "Bolt down the finish",
        text: "Retrace the head, antenna, bolts, grin, and button panel, deepen the marker fills, and add small white highlights to the head and antenna ball.",
        tip: "Do not add new parts at the end. The final pass should make the robot bolder, not busier.",
        image: true
      }
    ]
  }
];

const archiveLessons = [...lessons]
  .sort((first, second) => new Date(second.isoDate) - new Date(first.isoDate));
const latestLesson = archiveLessons[0];

const relatedCards = (currentSlug) => lessons
  .filter(({ slug }) => slug !== currentSlug)
  .slice(0, 3)
  .map((lesson) => `
    <a class="sketch-card" href="${lesson.slug}.html">
      <div class="card-art"><img src="../assets/${webpName(lesson.finished)}" alt="${lesson.finishedAlt}" width="1254" height="1254" loading="lazy"></div>
      <p>${lesson.time} min · ${lesson.difficulty}</p>
      <h3>How to draw ${lesson.shortSubject}</h3>
    </a>`)
  .join("");

// Previous/next daily-lesson links (by publish date) for crawl depth and
// session length. archiveLessons is newest-first, so index-1 is the newer
// lesson and index+1 is the older one.
const lessonPagination = (lesson) => {
  const index = archiveLessons.findIndex(({ slug }) => slug === lesson.slug);
  if (index === -1) return "";
  const newer = index > 0 ? archiveLessons[index - 1] : null;
  const older = index < archiveLessons.length - 1 ? archiveLessons[index + 1] : null;
  if (!newer && !older) return "";
  const link = (item, rel, label) => (item
    ? `<a class="pagination-link pagination-${rel}" rel="${rel}" href="${item.slug}.html">
          <span class="pagination-label">${label}</span>
          <span class="pagination-title">${rel === "prev" ? '<span aria-hidden="true">&larr;</span> ' : ""}How to draw ${escapeHtml(item.shortSubject)}${rel === "next" ? ' <span aria-hidden="true">&rarr;</span>' : ""}</span>
        </a>`
    : '<span class="pagination-link pagination-empty" aria-hidden="true"></span>');
  return `
    <nav class="lesson-pagination" aria-label="Nearby daily doodles">
        ${link(older, "prev", "Previous doodle")}
        ${link(newer, "next", "Next doodle")}
    </nav>`;
};

const materialIcon = (material) => {
  const normalized = material.toLowerCase();
  if (normalized.includes("gel pen")) return "gel-pen-icon";
  if (normalized.includes("paper")) return "paper-icon";
  if (normalized.includes("colored") || normalized.includes("markers")) return "markers-icon";
  if (normalized.includes("black marker")) return "marker-icon";
  if (normalized.includes("marker")) return "markers-icon";
  return "marker-icon";
};
const materialDetail = (material) => {
  const normalized = material.toLowerCase();
  if (normalized.includes("paper")) return "Smooth paper helps marker lines";
  if (normalized.includes("black and colored")) return "Outlines plus bright fills";
  if (normalized.includes("black marker")) return "Bold outlines and small details";
  if (normalized.includes("gel pen")) return "Tiny shine marks when needed";
  if (normalized.includes("red marker")) return "For hot edge accents";
  if (normalized.includes("marker")) return "Use the listed fill colors";
  return "Whatever you already have";
};
const titleCase = (value) => value.replace(/\b\w/g, (character) => character.toUpperCase());
const escapeHtml = (value) => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#39;");
const headlineHtml = (value) => String(value)
  .split(/<br\s*\/?>/i)
  .map((line, lineIndex, lines) => {
    const words = line.trim().split(/\s+/).filter(Boolean);
    const letterCount = words.join("").length;
    const sizeClass = letterCount >= 14 ? " headline-line-compact" : letterCount >= 11 ? " headline-line-tight" : "";
    const wordHtml = words
      .map((word, wordIndex) => {
        const isUnderlineWord = lineIndex === lines.length - 1 && wordIndex === words.length - 1;
        return `<span class="headline-word${isUnderlineWord ? " headline-underline" : ""}">${escapeHtml(word)}</span>`;
      })
      .join(" ");
    return `<span class="headline-line${sizeClass}">${wordHtml}</span>`;
  })
  .join(" ");
const escapeXml = (value) => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&apos;");
const lessonUrl = (lesson) => `${siteUrl}/tutorials/${lesson.slug}.html`;
const lessonImageUrl = (lesson) => `${siteUrl}/assets/${lesson.finished}`;
// Pages serve WebP derivatives (built by scripts/build-image-derivatives.py);
// the JPGs stay in assets/ as the reviewed masters and feed og/RSS/social cards.
const webpName = (file) => file.replace(/\.jpe?g$/i, ".webp");
// 1200x630 landscape Open Graph card, built by scripts/make-social-cards.py.
const socialCardUrl = (lesson) => `${siteUrl}/assets/social/${lesson.slug}-og.jpg`;
// Raster step frames follow the step's 1-based position in lesson.steps.
const stepImageUrls = (lesson) => lesson.steps
  .map((step, index) => (step.svg || step.image
    ? null
    : `${siteUrl}/assets/${lesson.slug}-step-${index + 1}.webp`))
  .filter(Boolean);
const rssPubDate = (isoDate) => new Date(`${isoDate}T12:00:00-07:00`).toUTCString();

const orgNode = {
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  name: siteName,
  url: `${siteUrl}/`,
  logo: `${siteUrl}/assets/site-icon.png`
};
const siteNode = {
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  name: siteName,
  url: `${siteUrl}/`,
  description: "Daily marker doodle lessons that build drawing confidence through small, playful art practice.",
  publisher: { "@id": `${siteUrl}/#organization` }
};

const page = (lesson) => {
  const titleSubject = titleCase(lesson.shortSubject.replace(/^a /, ""));
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      orgNode,
      siteNode,
      {
        "@type": "HowTo",
        "@id": `${lessonUrl(lesson)}#howto`,
        name: `How to Draw ${titleSubject}`,
        description: lesson.description,
        image: [`${siteUrl}/assets/${lesson.finished}`, socialCardUrl(lesson)],
        datePublished: lesson.isoDate,
        dateModified: lesson.updated || lesson.isoDate,
        author: { "@id": `${siteUrl}/#organization` },
        publisher: { "@id": `${siteUrl}/#organization` },
        totalTime: `PT${lesson.time}M`,
        supply: lesson.materials.map((name) => ({ "@type": "HowToSupply", name })),
        step: lesson.steps.map(({ name, text }) => ({ "@type": "HowToStep", name, text }))
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
          { "@type": "ListItem", position: 2, name: "Doodle library", item: `${siteUrl}/library.html` },
          { "@type": "ListItem", position: 3, name: `How to draw ${lesson.subject}`, item: lessonUrl(lesson) }
        ]
      }
    ]
  };

  const steps = lesson.steps.map((step, index) => `
          <li class="step-card${step.image ? " final-step" : ""}">
            <button class="step-check" type="button" aria-label="Mark step ${index + 1} complete"><span></span></button>
            <div class="step-number">${String(index + 1).padStart(2, "0")}</div>
            <div class="step-art${step.image ? " finished-mini" : ""}">
              ${step.image
                ? `<img src="../assets/${webpName(lesson.finished)}" alt="${lesson.finishedAlt}" width="1254" height="1254" loading="lazy">`
                : `<img src="../assets/${lesson.slug}-step-${index + 1}.webp" alt="${step.name} stage for how to draw ${lesson.shortSubject}" width="627" height="627" loading="lazy">`}
            </div>
            <div class="step-copy">
              <h3>${step.name}</h3>
              <p>${step.text}</p>
              <p class="artist-tip"><strong>${lesson.tipLabel ?? "Doodle tip"}:</strong> ${step.tip}</p>
            </div>
          </li>`).join("");

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>How to Draw ${titleSubject} Step by Step | ${siteName}</title>
  <meta name="description" content="${lesson.description}">
  <link rel="canonical" href="${lessonUrl(lesson)}">
  <meta property="og:type" content="article">
  <meta property="og:title" content="How to Draw ${titleSubject}, Step by Step">
  <meta property="og:description" content="${lesson.description}">
  <meta property="og:url" content="${lessonUrl(lesson)}">
  <meta property="og:image" content="${socialCardUrl(lesson)}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="${lesson.finishedAlt}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="theme-color" content="${lesson.accent}">
${iconLinks}
  <link rel="alternate" type="application/rss+xml" title="${siteName} daily doodle feed" href="${siteUrl}/feed.xml">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="preload" as="image" href="../assets/${webpName(lesson.finished)}" fetchpriority="high">
  <link href="https://fonts.googleapis.com/css2?family=Caveat+Brush&family=DM+Sans:opsz,wght@9..40,400;9..40,600;9..40,700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../styles.css?v=${styleVersion}">
  <script type="application/ld+json">${JSON.stringify(schema, null, 2)}</script>
${plausibleTag}
</head>
<body class="archive-tutorial doodle-site" style="--lesson-accent: ${lesson.accent}">
  <a class="skip-link" href="#lesson">Skip to the doodle</a>
  <header class="site-header">
    <div class="brand">
      <img class="brand-mark" src="../assets/logo-marker-raster-v2.png" alt="" width="72" height="72">
      <a class="brand-wordmark" href="../" aria-label="${siteName} home"><span class="brand-name">${brandWordmark}</span></a>
    </div>
    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-nav"><span></span><span></span><span></span><span class="sr-only">Open menu</span></button>
    <nav class="site-nav" id="site-nav" aria-label="Main navigation">
      <a href="../">Today's doodle</a>
      <a href="../library.html">Doodle library</a>
      <a href="../about.html">About</a>
      <a href="https://sketcha.day/">sketcha.day</a>
      <a class="nav-button" href="#lesson">Start doodling</a>
    </nav>
  </header>
  <main>
    <section class="hero" aria-labelledby="hero-title">
      <div class="doodle doodle-star" aria-hidden="true">✦</div>
      <div class="hero-copy">
        <p class="eyebrow">${lesson.date}</p>
        <h1 id="hero-title" aria-label="How to draw ${lesson.subject}"><span class="headline-lead">How to draw...</span> <em aria-hidden="true">${headlineHtml(lesson.headlineSubject ?? lesson.subject)}</em></h1>
        <p class="hero-intro">${lesson.intro}</p>
        <div class="hero-meta" aria-label="Lesson details"><span><strong>${lesson.time}</strong> min</span><span><strong>${lesson.difficulty}</strong></span></div>
        <a class="nav-button hero-button" href="#lesson">Start doodling <svg viewBox="0 0 30 15" aria-hidden="true"><path d="M1 7.5h26M20 1l7 6.5-7 6.5"/></svg></a>
      </div>
      <figure class="hero-art">
        <div class="tape tape-top" aria-hidden="true"></div>
        <img src="../assets/${webpName(lesson.finished)}" alt="${lesson.finishedAlt}" width="1254" height="1254" fetchpriority="high">
        <figcaption>Finished doodle <span>About ${lesson.time} minutes</span></figcaption>
      </figure>
    </section>
    <article class="lesson" id="lesson">
      <header class="section-heading">
        <p class="kicker">Felt-tip marker mode</p>
        <h2>${lesson.lessonTitle}</h2>
        <p>Treat this as one playful practice round: sketch the idea loosely, simplify the shapes, then commit with confident marker outlines and bright fills.</p>
      </header>
      <div class="lesson-layout">
        <aside class="materials paper-panel" aria-labelledby="materials-title">
          <div class="pushpin" aria-hidden="true"></div>
          <p class="hand-note">Grab your stuff</p>
          <h3 id="materials-title">Materials</h3>
          <ul>${lesson.materials.map((material) => `<li><span class="material-icon ${materialIcon(material)}" aria-hidden="true"></span><div><strong>${material}</strong><small>${materialDetail(material)}</small></div></li>`).join("")}</ul>
          <p class="materials-note">${lesson.materialNote}</p>
        </aside>
        <ol class="steps">${steps}
        </ol>
      </div>
    </article>${lessonPagination(lesson)}
    <section class="library related-library" id="related" aria-labelledby="related-title">
      <header class="section-heading library-heading"><div><p class="kicker">Another page of practice</p><h2 id="related-title">More daily doodles</h2></div><a href="../library.html">Browse the full library <span aria-hidden="true">→</span></a></header>
      <div class="library-grid">${relatedCards(lesson.slug)}
      </div>
    </section>
  </main>
  <footer class="site-footer">
    <div class="footer-bar">
      <div class="footer-identity">
        <a class="brand footer-brand" href="../"><span class="brand-name">${brandWordmark}</span></a>
        <p class="footer-tagline">Bold marker practice, one daily doodle at a time.</p>
      </div>
      <nav aria-label="Footer navigation"><a href="../">Today</a><a href="../library.html">Library</a><a href="../about.html">About</a><a href="https://sketcha.day/">Sketcha.day</a><a href="mailto:hello@doodlea.day">Say hello</a></nav>
    </div>
    <small class="footer-copyright">© 2026 ${siteName}</small>
  </footer>
  <script src="../script.js"></script>
</body>
</html>`;
};

const aboutPage = () => {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      orgNode,
      siteNode,
      {
        "@type": "AboutPage",
        "@id": `${siteUrl}/about.html#aboutpage`,
        name: `About ${siteName}`,
        description: "Learn how Doodlea.day turns quick marker prompts into playful practice for bolder lines, clearer cartoon shapes, and brighter ideas.",
        url: `${siteUrl}/about.html`,
        image: `${siteUrl}/assets/doodlea-family-doodle-v1.webp`,
        isPartOf: { "@id": `${siteUrl}/#website` },
        publisher: { "@id": `${siteUrl}/#organization` }
      },
      {
        "@type": "Person",
        "@id": `${siteUrl}/about.html#robby`,
        name: "Robby McCullough",
        description: "A lifelong doodler, designer, and web builder who creates marker-friendly prompts for playful cartoon drawing practice."
      },
      {
        "@type": "Person",
        "@id": `${siteUrl}/about.html#tracie`,
        name: "Tracie",
        description: "A mom and early childhood educator whose perspective helps keep the doodles welcoming, clear, and easy to jump into."
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
          { "@type": "ListItem", position: 2, name: "About", item: `${siteUrl}/about.html` }
        ]
      }
    ]
  };

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>About ${siteName} | Daily Marker Doodle Practice</title>
  <meta name="description" content="Meet the family behind Doodlea.day and learn why the site focuses on quick marker prompts, cartoon shapes, bold outlines, and daily doodle practice.">
  <link rel="canonical" href="${siteUrl}/about.html">
  <meta property="og:type" content="website">
  <meta property="og:title" content="About ${siteName}">
  <meta property="og:description" content="A family-made marker playground for building drawing confidence through bright, repeatable doodle practice.">
  <meta property="og:url" content="${siteUrl}/about.html">
  <meta property="og:image" content="${siteUrl}/assets/doodlea-family-doodle-v1.webp">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="theme-color" content="#f05a28">
${iconLinks}
  <link rel="alternate" type="application/rss+xml" title="${siteName} daily doodle feed" href="${siteUrl}/feed.xml">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Caveat+Brush&family=DM+Sans:opsz,wght@9..40,400;9..40,600;9..40,700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="styles.css?v=${styleVersion}">
  <script type="application/ld+json">${JSON.stringify(schema, null, 2)}</script>
${plausibleTag}
</head>
<body class="about-page doodle-site">
  <a class="skip-link" href="#about-main">Skip to about ${siteName}</a>
  <header class="site-header">
    <div class="brand">
      <img class="brand-mark" src="assets/logo-marker-raster-v2.png" alt="" width="72" height="72">
      <a class="brand-wordmark" href="/" aria-label="${siteName} home"><span class="brand-name">${brandWordmark}</span></a>
    </div>
    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-nav"><span></span><span></span><span></span><span class="sr-only">Open menu</span></button>
    <nav class="site-nav" id="site-nav" aria-label="Main navigation">
      <a href="/">Today's doodle</a>
      <a href="library.html">Doodle library</a>
      <a href="about.html" aria-current="page">About</a>
      <a href="https://sketcha.day/">sketcha.day</a>
      <a class="nav-button" href="/#lesson">Start doodling</a>
    </nav>
  </header>
  <main id="about-main" class="about-page-main">
    <section class="about-page-hero" aria-labelledby="about-title">
      <figure class="about-portrait">
        <img src="assets/doodlea-family-doodle-v1.webp" alt="Marker doodle portrait of Robby, Tracie, and their baby in a home kitchen" width="1024" height="1536">
      </figure>
      <div class="about-story">
        <p class="kicker">A small marker playground</p>
        <h1 id="about-title">Daily doodles for bolder marks and brighter ideas.</h1>
        <p>Doodlea.day is made by Robby McCullough, a lifelong doodler, designer, and web guy who loves the scrappy joy of drawing in the margins. This site is for quick marker prompts that turn simple shapes into characters, stickers, badges, bursts, and comic little details.</p>
        <p>Robby brings doodle habit, design instincts, and web craft to the lessons: readable pages, bold visual examples, and prompts that are easy to finish before they get overworked. Tracie, a mom and early childhood educator, helps keep the tone welcoming and the steps easy to jump into for kids, parents, teachers, and grown-ups who want a playful creative break.</p>
        <p>The goal is a growing stash of doodle moves you can reuse anywhere: thicker outlines, expressive faces, bright fills, motion marks, tiny highlights, and enough confidence to make the next blank corner less blank.</p>
      </div>
    </section>
    <section class="about-credentials" aria-labelledby="about-credentials-title">
      <h2 id="about-credentials-title">Why these doodles are built this way</h2>
      <div class="about-credential-grid">
        <article><strong>Marker-first energy</strong><span>Each doodle favors confident outlines, simple silhouettes, and color choices that read fast.</span></article>
        <article><strong>Built for quick scanning</strong><span>The lessons are made to be easy to follow on a regular webpage without needing a video, app, or long setup.</span></article>
        <article><strong>Friendly creative breaks</strong><span>Tracie's background helps us value simple starts, playful pacing, and encouragement over perfect results.</span></article>
        <article><strong>Reusable doodle language</strong><span>Every prompt adds a small cartoon trick: a face, burst, badge edge, color pop, shadow, or shine mark.</span></article>
      </div>
    </section>
  </main>
  <footer class="site-footer">
    <div class="footer-bar">
      <div class="footer-identity">
        <a class="brand footer-brand" href="/"><span class="brand-name">${brandWordmark}</span></a>
        <p class="footer-tagline">Bold marker practice, one daily doodle at a time.</p>
      </div>
      <nav aria-label="Footer navigation"><a href="/">Today</a><a href="library.html">Library</a><a href="about.html" aria-current="page">About</a><a href="https://sketcha.day/">Sketcha.day</a><a href="mailto:hello@doodlea.day">Say hello</a></nav>
    </div>
    <small class="footer-copyright">© 2026 ${siteName}</small>
  </footer>
  <script src="script.js"></script>
</body>
</html>`;
};

const homePage = (lesson) => {
  const homeOnlySections = `
    <section class="newsletter" id="newsletter" aria-labelledby="newsletter-title">
      <div class="newsletter-pencil" aria-hidden="true"></div>
      <p class="hand-note">A tiny creative nudge</p>
      <h2 id="newsletter-title">A fresh doodle in your inbox.</h2>
      <p>Coming soon: one prompt, one marker-friendly tutorial, and a cheerful reason to doodle again tomorrow. Want it first? <a href="mailto:hello@doodlea.day?subject=Doodlea.day%20daily%20email%20interest">Email us to say you're interested</a>.</p>
      <form class="signup-form">
        <label class="sr-only" for="email">Email address</label>
        <input id="email" name="email" type="email" autocomplete="email" placeholder="Newsletter coming soon" disabled>
        <button type="submit" disabled>Coming soon</button>
      </form>
      <small>The daily email list is not open yet. A quick note helps us decide when to build it.</small>
      <p class="form-message" role="status" aria-live="polite"></p>
    </section>
`;

  const homeSchema = {
    "@context": "https://schema.org",
    "@graph": [orgNode, siteNode]
  };

  let html = page(lesson)
    .replace('<body class="archive-tutorial doodle-site"', '<body class="home-page archive-tutorial doodle-site"')
    .replaceAll(`href="../styles.css?v=${styleVersion}"`, `href="styles.css?v=${styleVersion}"`)
    .replaceAll('src="../script.js"', 'src="script.js"')
    .replaceAll("../assets/", "assets/")
    .replaceAll("../library.html", "library.html")
    .replaceAll("../about.html", "about.html")
    .replaceAll('href="../"', 'href="/"')
    .replaceAll("Skip to the doodle", "Skip to today's doodle")
    .replaceAll("Felt-tip marker mode", "Marker ready?")
    .replace("  </main>", `${homeOnlySections}  </main>`);

  for (const item of archiveLessons) {
    if (item.slug) {
      html = html.replaceAll(`href="${item.slug}.html"`, `href="tutorials/${item.slug}.html"`);
    }
  }

  html = html.replace(
    /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
    `<script type="application/ld+json">${JSON.stringify(homeSchema, null, 2)}</script>`
  );

  return html;
};

const archiveCard = (lesson, index) => {
  const cardColors = ["card-orange", "card-yellow", "card-red", "card-blue"];
  return `
        <a class="sketch-card ${cardColors[index % cardColors.length]}" href="tutorials/${lesson.slug}.html">
          <div class="card-art">
            <img src="assets/${webpName(lesson.finished)}" alt="${lesson.finishedAlt}" width="1254" height="1254" loading="${index === 0 ? "eager" : "lazy"}">
          </div>
          <p><time datetime="${lesson.isoDate}">${lesson.date.replace(/^[^,]+, /, "")}</time> · ${lesson.time} min · ${lesson.difficulty}</p>
          <h2>How to draw ${lesson.subject}</h2>
          <span class="card-link">Open tutorial <span aria-hidden="true">→</span></span>
        </a>`;
};

const archivePage = () => {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      orgNode,
      siteNode,
      {
        "@type": "ItemList",
        name: `${siteName} Doodle Tutorial Library`,
        numberOfItems: archiveLessons.length,
        itemListElement: archiveLessons.map((lesson, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: `How to draw ${lesson.subject}`,
          url: lessonUrl(lesson)
        }))
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
          { "@type": "ListItem", position: 2, name: "Doodle library", item: `${siteUrl}/library.html` }
        ]
      }
    ]
  };

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Doodle Tutorial Library | Marker-Based Step-by-Step Doodles | ${siteName}</title>
  <meta name="description" content="Browse every Doodlea.day tutorial. Find daily marker doodle lessons that help you practice shape, line weight, expression, color, and cartoon drawing.">
  <link rel="canonical" href="${siteUrl}/library.html">
  <meta property="og:type" content="website">
  <meta property="og:title" content="The ${siteName} Doodle Tutorial Library">
  <meta property="og:description" content="A growing library of daily marker doodle lessons for building drawing confidence one bold mark at a time.">
  <meta property="og:url" content="${siteUrl}/library.html">
  <meta property="og:image" content="${lessonImageUrl(latestLesson)}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="theme-color" content="#f05a28">
${iconLinks}
  <link rel="alternate" type="application/rss+xml" title="${siteName} daily doodle feed" href="${siteUrl}/feed.xml">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Caveat+Brush&family=DM+Sans:opsz,wght@9..40,400;9..40,600;9..40,700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="styles.css?v=${styleVersion}">
  <script type="application/ld+json">${JSON.stringify(schema, null, 2)}</script>
${plausibleTag}
</head>
<body class="library-page doodle-site">
  <a class="skip-link" href="#tutorial-library">Skip to the doodle library</a>
  <header class="site-header">
    <div class="brand">
      <img class="brand-mark" src="assets/logo-marker-raster-v2.png" alt="" width="72" height="72">
      <a class="brand-wordmark" href="/" aria-label="${siteName} home"><span class="brand-name">${brandWordmark}</span></a>
    </div>
    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-nav"><span></span><span></span><span></span><span class="sr-only">Open menu</span></button>
    <nav class="site-nav" id="site-nav" aria-label="Main navigation">
      <a href="/">Today's doodle</a>
      <a href="library.html" aria-current="page">Doodle library</a>
      <a href="about.html">About</a>
      <a href="https://sketcha.day/">sketcha.day</a>
      <a class="nav-button" href="/#lesson">Start doodling</a>
    </nav>
  </header>
  <main>
    <section class="archive-hero" aria-labelledby="archive-title">
      <div class="archive-intro">
        <p class="eyebrow"><span>${archiveLessons.length} step-by-step lesson${archiveLessons.length === 1 ? "" : "s"}</span> New marker doodles added daily</p>
        <h1 id="archive-title">Doodle tutorial library</h1>
        <p>Browse easy step-by-step doodle tutorials for quick marker practice. Each Doodlea.day lesson breaks cartoon objects, comic marks, expressive faces, and playful drawing ideas into approachable frames for simple shapes, bold outlines, bright color, and a finished doodle.</p>
      </div>
    </section>
    <section class="library archive-library" id="tutorial-library" aria-labelledby="tutorial-library-title">
      <header class="section-heading library-heading">
        <div>
          <p class="kicker">All tutorials</p>
          <h2 id="tutorial-library-title">Step-by-step doodle lessons</h2>
        </div>
      </header>
      <div class="library-grid archive-grid">
        ${archiveLessons.map(archiveCard).join("")}
      </div>
    </section>
  </main>
  <footer class="site-footer">
    <div class="footer-bar">
      <div class="footer-identity">
        <a class="brand footer-brand" href="/"><span class="brand-name">${brandWordmark}</span></a>
        <p class="footer-tagline">Bold marker practice, one daily doodle at a time.</p>
      </div>
      <nav aria-label="Footer navigation"><a href="/">Today</a><a href="library.html" aria-current="page">Library</a><a href="about.html">About</a><a href="https://sketcha.day/">Sketcha.day</a><a href="mailto:hello@doodlea.day">Say hello</a></nav>
    </div>
    <small class="footer-copyright">© 2026 ${siteName}</small>
  </footer>
  <script src="script.js"></script>
</body>
</html>`;
};

const feed = () => `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>${siteName} Daily Doodles</title>
    <link>${siteUrl}/</link>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml" />
    <description>Daily marker doodle lessons that build drawing confidence through small, playful art practice.</description>
    <language>en-us</language>
    <lastBuildDate>${rssPubDate(latestLesson.isoDate)}</lastBuildDate>
${archiveLessons.map((lesson) => `    <item>
      <title>${escapeXml(`How to draw ${lesson.subject}`)}</title>
      <link>${lessonUrl(lesson)}</link>
      <guid isPermaLink="true">${lessonUrl(lesson)}</guid>
      <pubDate>${rssPubDate(lesson.isoDate)}</pubDate>
      <description>${escapeXml(lesson.description)}</description>
      <media:content url="${lessonImageUrl(lesson)}" medium="image" />
    </item>`).join("\n")}
  </channel>
</rss>
`;

const sitemapUrls = [
  { loc: `${siteUrl}/`, lastmod: latestLesson.isoDate, changefreq: "daily", priority: "1.0" },
  { loc: `${siteUrl}/about.html`, lastmod: latestLesson.isoDate, changefreq: "monthly", priority: "0.7" },
  { loc: `${siteUrl}/library.html`, lastmod: latestLesson.isoDate, changefreq: "daily", priority: "0.8" },
  ...archiveLessons.map((lesson) => ({
    loc: lessonUrl(lesson),
    lastmod: lesson.updated || lesson.isoDate,
    changefreq: "monthly",
    priority: "0.7",
    // Image-sitemap entries for Google Images: the finished art plus each
    // raster step frame, exactly as served on the page.
    images: [`${siteUrl}/assets/${webpName(lesson.finished)}`, ...stepImageUrls(lesson)]
  }))
];

const sitemapImages = (images = []) => images
  .map((image) => `    <image:image>
      <image:loc>${escapeXml(image)}</image:loc>
    </image:image>`)
  .join("\n");

const sitemap = () => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${sitemapUrls.map((url) => `  <url>
    <loc>${escapeXml(url.loc)}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>${url.images?.length ? `\n${sitemapImages(url.images)}` : ""}
  </url>`).join("\n")}
</urlset>
`;

const robots = () => `User-agent: *
Allow: /
Disallow: /drafts/

Sitemap: ${siteUrl}/sitemap.xml
`;

await mkdir(new URL("../tutorials/", import.meta.url), { recursive: true });
for (const lesson of lessons) {
  await writeFile(new URL(`../tutorials/${lesson.slug}.html`, import.meta.url), page(lesson));
}
await writeFile(new URL("../index.html", import.meta.url), homePage(latestLesson));
await writeFile(new URL("../about.html", import.meta.url), aboutPage());
await writeFile(new URL("../library.html", import.meta.url), archivePage());
await writeFile(new URL("../feed.xml", import.meta.url), feed());
await writeFile(new URL("../sitemap.xml", import.meta.url), sitemap());
await writeFile(new URL("../robots.txt", import.meta.url), robots());

console.log(`Built ${lessons.length} doodle tutorial page, the homepage, the tutorial library, feed.xml, sitemap.xml, and robots.txt.`);
