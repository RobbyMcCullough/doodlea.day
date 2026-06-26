import { mkdir, writeFile } from "node:fs/promises";

const siteUrl = (process.env.SITE_URL || "https://doodlea.day").replace(/\/$/, "");
const siteName = "Doodlea.day";
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
    slug: "cartoon-coconut-drink",
    day: "007",
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
    materials: ["Drawing paper", "Black marker", "Brown, teal, pink, yellow, and green markers", "Optional white gel pen"],
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
        name: "Punch up the coconut drink",
        text: "Go back over the black outlines, strengthen the brown and bright marker fills, and clean only the edges you already drew.",
        tip: "Do not add extra fruit or background props. The final pass is for bolder marker energy.",
        image: true
      }
    ]
  },
  {
    slug: "smiling-pizza-slice-doodle",
    day: "006",
    date: "Thursday, June 25",
    isoDate: "2026-06-25",
    subject: "a smiling pizza slice doodle",
    headlineSubject: "a smiling<br>pizza slice",
    shortSubject: "a smiling pizza slice",
    lessonTitle: "Let's doodle a pizza slice",
    description: "Learn how to draw a smiling pizza slice doodle with a bold black marker outline, puffy crust, cute face, pepperoni circles, cheese stretch, and bright marker fills.",
    intro: "Turn one simple triangle into a cheerful marker doodle with thick outlines, saturated color, and a face that stays easy to draw.",
    time: 15,
    difficulty: "Easy",
    accent: "#f6b72f",
    finished: "smiling-pizza-slice-doodle-finished-v1.jpg",
    finishedAlt: "Bold marker doodle of a smiling pizza slice with yellow cheese, orange crust, red pepperoni, thick black outline, and a small cheese stretch",
    materials: ["Drawing paper", "Black marker", "Yellow, orange, and red markers", "Optional white gel pen"],
    materialNote: "Use scrap paper underneath; the yellow fill looks better when you let marker streaks show.",
    tipLabel: "Doodle tip",
    steps: [
      {
        name: "Start the slice shape",
        text: "Draw a wide triangle that points down. Round the lower point slightly so the slice feels soft instead of sharp.",
        tip: "Make the top edge wider than you think. The crust needs room to sit on it."
      },
      {
        name: "Round the crust",
        text: "Add a puffy band across the top of the triangle with a few rounded bumps along the outer edge.",
        tip: "Keep the crust attached to the triangle. It should feel like one piece of pizza, not a cloud on top."
      },
      {
        name: "Thicken the outline",
        text: "Trace the triangle sides, lower point, and crust with a bold black marker line.",
        tip: "Move slowly around the crust bumps. The handmade wobble is good, but the outline should stay confident."
      },
      {
        name: "Add the face and toppings",
        text: "Draw two simple eyes, a small smile, and a few round pepperoni circles around the face.",
        tip: "Leave breathing room around the eyes. If a pepperoni touches the face, the expression gets harder to read."
      },
      {
        name: "Fill the marker color",
        text: "Add one little cheese stretch near the bottom, fill the cheese yellow, color the crust orange-brown, and fill the pepperoni red.",
        tip: "Color with short strokes in one direction. The streaks make the doodle feel marker-made."
      },
      {
        name: "Punch up the pizza doodle",
        text: "Go back over the black outline, strengthen the yellow, orange, and red fills, and clean only the edges you already drew.",
        tip: "Do not add more toppings at the end. The final pass is for bolder marker energy, not a new design.",
        image: true
      }
    ]
  },
  {
    slug: "hot-rod-marker-flames",
    day: "005",
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
        name: "Punch up the doodle",
        text: "Go back over the black outline, strengthen the orange and yellow fill, and clean only the edges you already drew.",
        tip: "Do not add new flame shapes at the end. The final pass should make the marker drawing louder.",
        image: true
      }
    ]
  },
  {
    slug: "firework-burst-doodle",
    day: "004",
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
    materials: ["Drawing paper", "Black marker", "Red, blue, and yellow markers", "Optional white gel pen"],
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
        name: "Punch up the firework",
        text: "Go back over the black outline, strengthen the red, blue, and yellow fills, and add small white highlight marks inside the shapes.",
        tip: "Do not add new burst arms at the end. This pass should only make the shapes you already drew brighter.",
        image: true
      }
    ]
  },
  {
    slug: "trophy-cup-sticker",
    day: "003",
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
    materials: ["Drawing paper", "Black marker", "Yellow and orange markers", "Optional white gel pen"],
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
        name: "Punch up the trophy",
        text: "Go back over the black outline, strengthen the gold and orange fills, and clean only the edges you already drew.",
        tip: "Do not add new decorations in the final pass. The sticker should stay bold and simple.",
        image: true
      }
    ]
  },
  {
    slug: "watermelon-wedge-doodle",
    day: "001",
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
    materials: ["Drawing paper", "Black marker", "Red, light green, and dark green markers", "Optional white gel pen"],
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
        name: "Punch up the watermelon",
        text: "Go back over the black outline, seeds, face, and red-green fills without adding new seeds or background props.",
        tip: "Let the final outline be thick and confident. That is what makes the slice read as a sticker-like doodle.",
        image: true
      }
    ]
  },
  {
    slug: "silly-robot-head",
    day: "002",
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
    materials: ["Drawing paper", "Black marker", "Blue, yellow, and red markers", "Optional white gel pen"],
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
        name: "Punch up the robot",
        text: "Go back over the black outlines, strengthen the marker fills, and add small white highlight marks to the head and antenna ball.",
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
      <div class="card-art"><img src="../assets/${lesson.finished}" alt=""></div>
      <p>${lesson.time} min · ${lesson.difficulty}</p>
      <h3>How to draw ${lesson.shortSubject}</h3>
    </a>`)
  .join("");

const materialIcon = (material) => {
  const normalized = material.toLowerCase();
  if (normalized.includes("paper")) return "paper-icon";
  if (normalized.includes("black marker")) return "marker-icon";
  if (normalized.includes("marker") || normalized.includes("gel pen")) return "markers-icon";
  return "marker-icon";
};
const titleCase = (value) => value.replace(/\b\w/g, (character) => character.toUpperCase());
const headlineHtml = (value) => String(value)
  .split(/<br\s*\/?>/i)
  .map((line) => `<span>${line.trim()}</span>`)
  .join(" ");
const escapeXml = (value) => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&apos;");
const lessonUrl = (lesson) => `${siteUrl}/tutorials/${lesson.slug}.html`;
const lessonImageUrl = (lesson) => `${siteUrl}/assets/${lesson.finished}`;
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
  description: "One bold marker doodle prompt and practical step-by-step tutorial every day.",
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
        image: `${siteUrl}/assets/${lesson.finished}`,
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
                ? `<img src="../assets/${lesson.finished}" alt="${lesson.finishedAlt}" width="1254" height="1254">`
                : `<img src="../assets/${lesson.slug}-step-${index + 1}.jpg" alt="${step.name} stage for how to draw ${lesson.shortSubject}" width="627" height="627">`}
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
  <meta property="og:image" content="${lessonImageUrl(lesson)}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="theme-color" content="${lesson.accent}">
${iconLinks}
  <link rel="alternate" type="application/rss+xml" title="${siteName} daily doodle feed" href="${siteUrl}/feed.xml">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Caveat+Brush&family=DM+Sans:opsz,wght@9..40,400;9..40,600;9..40,700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../styles.css">
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
      <a href="../#about">How it works</a>
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
        <img src="../assets/${lesson.finished}" alt="${lesson.finishedAlt}" width="1254" height="1254">
        <figcaption>Finished doodle <span>About ${lesson.time} minutes</span></figcaption>
      </figure>
    </section>
    <article class="lesson" id="lesson">
      <header class="section-heading">
        <p class="kicker">Felt-tip marker mode</p>
        <h2>${lesson.lessonTitle}</h2>
        <p>Use loose curves first, then switch to confident marker outlines and bright fills.</p>
      </header>
      <div class="lesson-layout">
        <aside class="materials paper-panel" aria-labelledby="materials-title">
          <div class="pushpin" aria-hidden="true"></div>
          <p class="hand-note">Grab your stuff</p>
          <h3 id="materials-title">Materials</h3>
          <ul>${lesson.materials.map((material, index) => `<li><span class="material-icon ${materialIcon(material)}" aria-hidden="true"></span><div><strong>${material}</strong><small>${index === 0 ? "Smooth paper helps marker lines" : index === 1 ? "Fine tip or felt tip" : index === 2 ? "Main flame colors" : "For edge accents"}</small></div></li>`).join("")}</ul>
          <p class="materials-note">${lesson.materialNote}</p>
        </aside>
        <ol class="steps">${steps}
        </ol>
      </div>
    </article>
    <section class="library related-library" id="related" aria-labelledby="related-title">
      <header class="section-heading library-heading"><div><p class="kicker">Keep the marker moving</p><h2 id="related-title">More daily doodles</h2></div><a href="../library.html">Browse the full library <span aria-hidden="true">→</span></a></header>
      <div class="library-grid">${relatedCards(lesson.slug)}
      </div>
    </section>
  </main>
  <footer class="site-footer">
    <a class="brand footer-brand" href="../"><span class="brand-name">${brandWordmark}</span></a>
    <p>Make a bold mark. See what happens. Want quieter pencil lessons? Visit <a href="https://sketcha.day/">Sketcha.day</a>.</p>
    <nav aria-label="Footer navigation"><a href="../">Today</a><a href="../library.html">Library</a><a href="../#about">About</a><a href="https://sketcha.day/">Sketcha.day</a><a href="mailto:hello@doodlea.day">Say hello</a></nav>
    <small>© 2026 ${siteName}</small>
  </footer>
  <script src="../script.js"></script>
</body>
</html>`;
};

const homePage = (lesson) => {
  const homeOnlySections = `
    <section class="about" id="about">
      <div class="about-drawing">
        <img src="assets/${lesson.finished}" alt="${lesson.finishedAlt}" width="780" height="780">
      </div>
      <div class="about-copy">
        <p class="kicker">One small doodle, every day</p>
        <h2>A daily marker habit for playful hands.</h2>
        <p>Doodlea.day is the louder sibling to Sketcha.day: simple shapes, bold outlines, bright marker color, and small comic-style drawing ideas you can finish in one sitting.</p>
        <p class="sister-note">Want a calmer pencil-sketch practice? Visit <a href="https://sketcha.day/">Sketcha.day</a> for step-by-step sketch lessons.</p>
        <div class="about-points">
          <p><strong>Made for markers</strong><span>Most lessons use black outlines plus 2-3 colors.</span></p>
          <p><strong>Cartoon-first</strong><span>Expect flames, characters, lettering shapes, icons, and comic details.</span></p>
          <p><strong>Fast enough to repeat</strong><span>Most doodles should fit into 10-20 minutes.</span></p>
        </div>
      </div>
    </section>

    <section class="newsletter" id="newsletter" aria-labelledby="newsletter-title">
      <div class="newsletter-pencil" aria-hidden="true"></div>
      <p class="hand-note">A tiny creative nudge</p>
      <h2 id="newsletter-title">A fresh doodle in your inbox.</h2>
      <p>Coming soon: one prompt, one marker-friendly tutorial, zero pressure. Want it first? <a href="mailto:hello@doodlea.day?subject=Doodlea.day%20daily%20email%20interest">Email us to say you're interested</a>.</p>
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
    .replaceAll('href="../styles.css"', 'href="styles.css"')
    .replaceAll('src="../script.js"', 'src="script.js"')
    .replaceAll("../assets/", "assets/")
    .replaceAll("../library.html", "library.html")
    .replaceAll("../#about", "#about")
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
            <img src="assets/${lesson.finished}" alt="${lesson.finishedAlt}" loading="${index === 0 ? "eager" : "lazy"}">
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
  <meta name="description" content="Browse every Doodlea.day tutorial. Find bold marker-based lessons for colorful cartoon, comic, and doodle drawing ideas.">
  <link rel="canonical" href="${siteUrl}/library.html">
  <meta property="og:type" content="website">
  <meta property="og:title" content="The ${siteName} Doodle Tutorial Library">
  <meta property="og:description" content="A growing collection of practical, playful step-by-step marker doodle lessons.">
  <meta property="og:url" content="${siteUrl}/library.html">
  <meta property="og:image" content="${lessonImageUrl(latestLesson)}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="theme-color" content="#f05a28">
${iconLinks}
  <link rel="alternate" type="application/rss+xml" title="${siteName} daily doodle feed" href="${siteUrl}/feed.xml">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Caveat+Brush&family=DM+Sans:opsz,wght@9..40,400;9..40,600;9..40,700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="styles.css">
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
      <a href="/#about">How it works</a>
      <a class="nav-button" href="/#lesson">Start doodling</a>
    </nav>
  </header>
  <main>
    <section class="archive-hero" aria-labelledby="archive-title">
      <div class="archive-intro">
        <p class="eyebrow"><span>${archiveLessons.length} tutorial</span> Marker-first and cartoon-friendly</p>
        <h1 id="archive-title" aria-label="The doodle library"><span class="headline-lead">The doodle</span> <em aria-hidden="true"><span>library</span></em></h1>
        <p>Start anywhere. Every lesson favors bold shapes, thick outlines, bright color, and an approachable marker process.</p>
        <a class="nav-button hero-button" href="#tutorial-library">Choose a doodle <span aria-hidden="true">↓</span></a>
      </div>
      <div class="archive-stack" aria-hidden="true">
        ${archiveLessons.slice(0, 3).map((lesson) => `<div class="archive-sheet"><img src="assets/${lesson.finished}" alt=""></div>`).join("")}
      </div>
    </section>
    <section class="library archive-library" id="tutorial-library" aria-labelledby="tutorial-library-title">
      <header class="section-heading library-heading">
        <div>
          <p class="kicker">Pick a page</p>
          <h2 id="tutorial-library-title">Draw your way through the days</h2>
        </div>
        <p class="archive-count">Newest first · ${archiveLessons.length} lesson</p>
      </header>
      <div class="library-grid archive-grid">
        ${archiveLessons.map(archiveCard).join("")}
      </div>
    </section>
  </main>
  <footer class="site-footer">
    <a class="brand footer-brand" href="/"><span class="brand-name">${brandWordmark}</span></a>
    <p>Make a bold mark. See what happens. Want quieter pencil lessons? Visit <a href="https://sketcha.day/">Sketcha.day</a>.</p>
    <nav aria-label="Footer navigation"><a href="/">Today</a><a href="library.html" aria-current="page">Library</a><a href="/#about">About</a><a href="https://sketcha.day/">Sketcha.day</a><a href="mailto:hello@doodlea.day">Say hello</a></nav>
    <small>© 2026 ${siteName}</small>
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
    <description>One bold marker doodle prompt and practical step-by-step tutorial every day.</description>
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
  { loc: `${siteUrl}/library.html`, lastmod: latestLesson.isoDate, changefreq: "daily", priority: "0.8" },
  ...archiveLessons.map((lesson) => ({
    loc: lessonUrl(lesson),
    lastmod: lesson.isoDate,
    changefreq: "monthly",
    priority: "0.7"
  }))
];

const sitemap = () => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls.map((url) => `  <url>
    <loc>${escapeXml(url.loc)}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
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
await writeFile(new URL("../library.html", import.meta.url), archivePage());
await writeFile(new URL("../feed.xml", import.meta.url), feed());
await writeFile(new URL("../sitemap.xml", import.meta.url), sitemap());
await writeFile(new URL("../robots.txt", import.meta.url), robots());

console.log(`Built ${lessons.length} doodle tutorial page, the homepage, the tutorial library, feed.xml, sitemap.xml, and robots.txt.`);
