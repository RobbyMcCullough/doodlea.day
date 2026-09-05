import { mkdir, writeFile } from "node:fs/promises";

const siteUrl = (process.env.SITE_URL || "https://doodlea.day").replace(/\/$/, "");
const siteName = "doodlea.day";
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
  {"slug":"cartoon-capybara-holding-an-orange","day":"116","date":"Saturday, September 5","isoDate":"2026-09-05","subject":"a capybara","headlineSubject":"a capybara","shortSubject":"a cartoon capybara","lessonTitle":"Let's draw a capybara","description":"Learn how to draw a capybara holding an orange in six clear steps: a simple head, seated body, expressive face, paws, details, and marker color.","intro":"Start with a long rounded head, then add the body, face, and two paws holding an orange. Each of these six steps adds something you can see and copy. Finish with warm brown, bright orange, and teal marker strokes.","time":20,"difficulty":"Easy","accent":"#f58220","finished":"cartoon-capybara-holding-an-orange-finished-v2.jpg","finishedAlt":"Handmade marker drawing of a seated brown capybara with two small ears, a wide left eye, half-lidded right eye, raised brow, oval nose, curved smile, three cheek dots, two paws holding one orange, two oval feet, one teal leaf, four fruit dimples, and white highlights on its body and fruit.","materials":["Drawing paper","Black felt-tip marker","Brown, orange, teal, and coral markers"],"materialNote":"Begin with simple dark outlines and leave the planned gaps for the arms and fruit stem. Let the outlines dry before adding color. Keep the two highlight ovals white.","tipLabel":"Marker tip","steps":[{"name":"Draw the head and ears","text":"Near the top of your page, draw a long rounded head with a blunt left end. Add two small ear bumps along the upper-right edge. Leave the lower-right side open for the body.","tip":"Make the head wider than it is tall. The empty space underneath is where the body will go."},{"name":"Add the back and feet","text":"Continue the right edge of the head down into a large curved back. Draw two flat oval feet near the bottom and join them with a short belly curve. Leave the front of the body open for the arms.","tip":"Place the feet about one head-height below the chin. The back curve meets the right foot."},{"name":"Give it a sideways grin","text":"Draw an oval nose near the left end of the muzzle and a short line below it. Add one wide oval eye, one half-closed eye, a small brow over each, and three cheek dots. Extend the lower head line upward into a smile.","tip":"Keep the wide eye on the left and the sleepy eye on the right. These features stay in place for the rest of the drawing."},{"name":"Draw the paws and orange","text":"In the open front of the body, draw two short bent arms ending in rounded paws. Add the small finger curves. Draw a large round orange between the paws, stopping its edge behind each paw and leaving a small gap at the top for its stem. Connect the left paw down toward the left foot.","tip":"Draw the paws first so the orange fits behind them. Keep the fruit above the belly curve and between the feet."},{"name":"Add the leaf and small details","text":"Put a short stem in the gap at the top of the orange, then attach one pointed leaf with a center vein and short side veins. Add four small dimples to the fruit, two toe marks on each foot, and one oval highlight on both the fruit and body.","tip":"Leave the two highlight ovals empty when you color. Arrange the four fruit dimples in two rows."},{"name":"Color your capybara","text":"Fill the body warm brown, the fruit orange, and the leaf teal. Color the nose and pupils dark, and add coral inside the ears and on the cheek. Leave the eye whites and both highlight ovals uncolored. Follow the curved shapes with short marker strokes.","tip":"Let the outlines dry first. Use one coloring pass over the shapes you have already drawn.","image":true}]},
  {slug:"cartoon-hourglass-with-flowing-sand",day:"115",date:"Friday, September 4",isoDate:"2026-09-04",subject:"an hourglass",headlineSubject:"an hourglass",shortSubject:"a cartoon hourglass",lessonTitle:"Let's draw an hourglass",description:"Learn how to draw an hourglass with two caps, two frame pillars, flowing sand, glass highlights, thick marker outlines, and bright handmade color.",intro:"Start with one center axis and open frame guides, then build exactly two matched caps, two side pillars, and one pinched glass vessel before drawing the sand in motion. This easy 20-minute marker lesson practices bilateral symmetry, attached supports, transparent forms, and bold color that keeps its felt-tip grain.",time:20,difficulty:"Easy-medium",accent:"#12a6a6",finished:"cartoon-hourglass-with-flowing-sand-finished-v1.jpg",finishedAlt:"Handmade felt-tip marker drawing of one face-free upright cartoon hourglass with exactly two rounded teal caps, exactly two attached coral side pillars, one pale-aqua pinched glass vessel, one curved upper golden-yellow sand bed, one centered falling sand stream, one rounded lower sand pile, exactly two open-paper glass highlights, exactly three yellow four-point sparkles, exactly four deep-navy cap notches, thick imperfect black outlines, visible directional marker texture, and one broken deep-navy ground shadow",materials:["Pencil","Drawing paper","Black felt-tip marker","Teal, coral, golden-yellow, pale-aqua, and deep-navy markers"],materialNote:"Use pale pencil for the center axis, two open cap guides, glass route, two pillar anchors, three sand placements, and shadow. Let the black felt tip dry before mapping every color with directional strokes and leaving the two glass highlights open.",tipLabel:"Marker tip",steps:[
    {name:"Map the timer",text:"Use pale pencil to place one upright center axis, two open wide cap guides, one open pinched-waist glass route, exactly two pillar ticks, three sand placements, and one broken shadow route.",tip:"Keep both cap guides open and light. Match their widths on the same axis, then place the upper bed, falling stream, and lower pile along the centerline."},
    {name:"Shape both caps",text:"Wrap the two wide guides into equal rounded top and bottom caps centered on the same axis while preserving every glass, pillar, sand, and shadow placement.",tip:"Compare the left and right ends before closing each cap. Keep both widths equal and the top and bottom edges parallel."},
    {name:"Connect glass and pillars",text:"Shape one pinched two-chamber glass vessel and wrap exactly two outer side pillars between their reserved cap anchors.",tip:"Bring both glass sides to one narrow centered waist. Attach each pillar firmly to the same cap ends instead of letting it float beside the frame."},
    {name:"Draw the flowing sand",text:"Turn the three placements into one curved upper sand bed, one narrow centered falling stream, and one rounded lower sand pile inside the glass.",tip:"Keep the stream thin at the waist and aim it at the peak of the lower pile. Leave open glass around all three sand forms."},
    {name:"Add shine sparkle and frame detail",text:"Reserve exactly two open-paper glass highlights, add exactly three four-point sparkles around the frame, place exactly four small cap notches, and clarify the broken shadow.",tip:"Place one highlight in each chamber, two notches on each cap, and keep the three sparkles outside the frame so every count stays readable."},
    {name:"Ink and map the colors",text:"Ink only established contours and map teal, coral, golden yellow, pale aqua, and deep navy into every planned region.",tip:"Ink the narrow waist and pillar attachments first. Pull longer strokes across the caps, work around both highlights, and preserve all three sparkles."},
    {name:"Pull the marker texture",text:"Clarify only the established marker streaks, glass depth, sand texture, cap edges, pillar accents, highlights, notches, sparkles, and shadow.",tip:"Use the darkest accents where the pillars meet the caps. Keep the glass pale and the sand grain visible without crowding the flowing stream."},
    {name:"Finish the cartoon hourglass",text:"Complete only the established marker fills and selectively strengthen the same caps, glass, two pillars, three sand forms, two highlights, three sparkles, four notches, and shadow.",tip:"Count two caps, two pillars, three sand forms, two highlights, three sparkles, and four notches, then stop before the handmade fills become flat and digital.",image:true}
  ]},
  {slug:"cartoon-walkie-talkie",day:"114",date:"Thursday, September 3",isoDate:"2026-09-03",subject:"a walkie-talkie",headlineSubject:"a walkie-talkie",shortSubject:"a cartoon walkie-talkie",lessonTitle:"Let's draw a walkie-talkie",description:"Learn how to draw a walkie-talkie with an antenna, two knobs, a blank screen, five speaker slots, signal arcs, thick marker outlines, and bright handmade color.",intro:"Start with a sparse upright device map, then connect the case before attaching one antenna, exactly two top knobs, and one side button. Add a blank screen, exactly five speaker slots, and two radio-wave arcs before the marker passes. This easy 20-minute lesson practices anchored hardware, tidy repeated spacing, and bold color that keeps its felt-tip grain.",time:20,difficulty:"Easy",accent:"#159d9c",finished:"cartoon-walkie-talkie-finished-v1.jpg",finishedAlt:"Handmade felt-tip marker drawing of one face-free upright teal cartoon walkie-talkie leaning slightly right with one top-left antenna, exactly two coral top knobs, one attached coral push-to-talk button on the upper-left side, one blank pale-aqua rounded screen with a dark bezel, exactly five horizontal deep-navy speaker slots, exactly two yellow radio-wave arcs above the antenna, exactly two open-paper case highlights, exactly four lower grip ribs arranged two per side, thick imperfect black outlines, visible directional marker texture, and one broken deep-navy ground shadow",materials:["Pencil","Drawing paper","Black felt-tip marker","Teal, coral, yellow, pale-aqua, and deep-navy markers"],materialNote:"Use pale pencil for the open case envelope, center axis, antenna route, two knob ticks, side-button tick, screen corner marks, five speaker placements, and shadow. Let the black felt tip dry before mapping every color with directional strokes and leaving the two case highlights open.",tipLabel:"Marker tip",steps:[
    {name:"Map the radio controls",text:"Use pale pencil to place one open upright case envelope, one center axis, one antenna route, two top-knob ticks, one side-button tick, four screen corner marks, exactly five speaker placements, and one broken shadow route.",tip:"Keep the first frame sparse enough to copy in under two minutes. Leave the case, antenna, controls, and screen open instead of tracing finished contours."},
    {name:"Connect the radio case",text:"Wrap the envelope into one rounded upright case with a slightly narrower top and gently tapered lower body, preserving every hardware, screen, speaker, and shadow placement mark.",tip:"Keep the slight right lean and lift the pencil around the top and side attachment ticks. Those gaps let the hardware connect without erasing a keeper line."},
    {name:"Add the antenna and controls",text:"Wrap one antenna at the top-left, exactly two round top knobs, and one rectangular push-to-talk button at the upper-left side.",tip:"Seat every part directly on its reserved case anchor. Count both knobs and check that the side button touches the body instead of floating."},
    {name:"Build the screen and speaker",text:"Turn the four corner marks into one blank rounded screen and bezel, then turn the five placements into exactly five horizontal speaker slots.",tip:"Leave the screen completely blank. Space the five slots as one centered stack and recount them before adding decorative details."},
    {name:"Add signal shine and grip",text:"Draw exactly two radio-wave arcs outside the antenna, reserve exactly two open-paper case highlights, add exactly four lower grip ribs arranged two per side, and clarify the broken shadow.",tip:"Keep both signal arcs clear of the antenna tip. Pair the lower ribs on opposite sides so the case still reads as one simple shape."},
    {name:"Ink and map the radio colors",text:"Ink only established contours and map teal, coral, yellow, pale aqua, and deep navy into every planned region.",tip:"Ink the five speaker slots and small controls first, then pull longer strokes down the case. Leave visible streaks and work around both highlights."},
    {name:"Pull the marker texture",text:"Clarify only the established marker streaks, bezel and hardware depth, highlight edges, four grip ribs, five speaker slots, and broken shadow.",tip:"Use the darkest accents where the knobs, antenna, and side button meet the case. Keep the blank screen lighter and smooth enough to contrast with the textured body."},
    {name:"Finish the cartoon walkie-talkie",text:"Complete only the established marker fills and selectively strengthen the same case, antenna, controls, blank screen, five slots, two signal arcs, two highlights, four grip ribs, and shadow.",tip:"Count one device, one antenna, two knobs, one side button, five slots, two signal arcs, and four grip ribs, then stop before the handmade fills become flat and digital.",image:true}
  ]},
  {slug:"cartoon-fortune-cookie-with-slip",day:"113",date:"Wednesday, September 2",isoDate:"2026-09-02",subject:"a fortune cookie",headlineSubject:"a fortune cookie",shortSubject:"a fortune cookie",lessonTitle:"Let's draw a fortune cookie",description:"Learn how to draw a fortune cookie with a folded shell, blank fortune slip, three sparkles, thick marker outlines, and bright handmade color.",intro:"Start with one wide oval and a centered fold axis, then pinch the cookie into two rounded wings before tucking in one blank fortune slip and adding exactly three sparkles. This easy 15-minute marker lesson practices folded curves, a clean paper overlap, and bright color that keeps the grain of the felt tip.",time:15,difficulty:"Easy",accent:"#ef9d1d",finished:"cartoon-fortune-cookie-with-slip-finished-v1.jpg",finishedAlt:"Handmade felt-tip marker drawing of one face-free golden-yellow fortune cookie with two rounded folded wings, one centered pinched valley, one coral curved inner rim, exactly two short fold seams, one blank cream paper slip tucked into the right opening, exactly three yellow four-point sparkles, exactly two open-paper cookie highlights, exactly five tiny golden crumb marks, thick imperfect black outlines, visible directional marker texture, and one broken deep-navy ground shadow",materials:["Pencil","Drawing paper","Black felt-tip marker","Golden-yellow, coral, bright-yellow, cream, and deep-navy markers"],materialNote:"Use pale pencil for the wide oval, fold axis, two corner ticks, open slip route, three sparkle centers, and broken shadow. Let the black felt tip dry before filling the established gold, coral, yellow, cream, and navy regions with directional strokes.",tipLabel:"Marker tip",steps:[
    {name:"Map the fold and slip",text:"Use pale pencil to place one wide oval, one center fold axis, two side-corner ticks, one open paper-slip route, three sparkle centers, and one broken shadow route.",tip:"Keep this first frame under two minutes. The slip is only an open route and the sparkles are only placement dots, not finished shapes."},
    {name:"Connect the cookie shell",text:"Wrap the oval and corner ticks into two rounded cookie wings with one centered pinched valley, then add two pale curved fold routes.",tip:"Compare the two wing tips across the center axis before darkening anything. Preserve the open slip route and stop both fold routes at the valley."},
    {name:"Build the folded opening",text:"Add one curved central opening, one parallel inner rim, and exactly two short fold seams while keeping the reserved slip route open.",tip:"Pull the inner rim beside the earlier fold routes rather than over them. Stop the right rim at the slip route so the paper can tuck into blank space."},
    {name:"Add the blank slip and sparkles",text:"Wrap the route into one blank rectangular fortune slip tucked into the right opening, then turn the three centers into exactly three four-point sparkles.",tip:"Keep both slip edges touching the opening and leave the paper completely blank. Count three sparkles before you move to the small details."},
    {name:"Reserve shine crumbs and shadow",text:"Add exactly two open-paper highlights on the cookie, exactly five tiny crumb marks near the lower tips, and the established broken shadow beneath both wings.",tip:"Place two crumbs on the left and three on the right. Keep the highlights inside the cookie and leave the center gap of the shadow open."},
    {name:"Ink and map the lucky colors",text:"Ink only established contours and map golden yellow, coral, bright yellow, cream, and deep navy into every planned region without smoothing the paper grain.",tip:"Ink the slip attachment and small sparkles first, then rotate the page for the broad cookie curves. Leave visible gaps between marker strokes."},
    {name:"Pull the marker texture",text:"Clarify only the established directional marker streaks, fold-depth accents, highlight edges, five crumbs, and broken shadow.",tip:"Follow each wing curve with the marker and keep the slip blank. Darken the fold valley more than the outer highlights so the shell reads as pinched."},
    {name:"Finish the lucky cookie",text:"Complete only the established marker fills and selectively strengthen the same shell, fold, blank slip, three sparkles, two highlights, five crumbs, texture, and shadow.",tip:"Count one cookie, one blank slip, three sparkles, two highlights, and five crumbs, then stop before the felt-tip texture turns into a flat digital-looking fill.",image:true}
  ]},
  {slug:"cheerful-cartoon-octopus",day:"112",date:"Tuesday, September 1",isoDate:"2026-09-01",subject:"an octopus",headlineSubject:"an octopus",shortSubject:"a cartoon octopus",lessonTitle:"Let's draw an octopus",description:"Learn how to draw an octopus with a rounded head, eight clearly countable arms, a cheerful face, simple suckers, thick marker outlines, and bright handmade color.",intro:"Start with one round mantle guide and eight fixed arm routes, then wrap every route into a separate tapering arm before adding the cheerful face, sucker pairs, bubbles, and spots. This easy 20-minute marker lesson practices radial spacing, countable cartoon anatomy, and bold color that still keeps the grain of the felt tip.",time:20,difficulty:"Easy",accent:"#ef5b62",finished:"cheerful-cartoon-octopus-finished-v1.jpg",finishedAlt:"Handmade felt-tip marker drawing of one cheerful face-forward coral cartoon octopus with one rounded mantle, exactly eight clearly separated tapering arms with eight visible tips, two oval eyes, one curved smile, exactly two white sucker circles on each arm, exactly three aqua bubbles, exactly six yellow mantle spots, two open-paper head highlights, two pink cheek marks, purple underside accents, thick imperfect black outlines, visible directional marker texture, and one broken navy shadow",materials:["Pencil","Drawing paper","Black felt-tip marker","Coral, purple, aqua, yellow, pink, and navy markers"],materialNote:"Use pale pencil for the mantle circle, face axis, eight separate arm routes, face ticks, bubbles, and shadow. Let the black felt-tip dry before filling the established coral, purple, aqua, yellow, pink, and navy regions with directional strokes.",tipLabel:"Marker tip",steps:[
    {name:"Map the head and eight arms",text:"Use pale pencil to place one round mantle guide, one face axis, exactly eight distinct arm routes, two eye ticks, one mouth tick, three bubble circles, and one broken shadow route.",tip:"Count the arm routes from left to right and make every endpoint visible. Fix the two front routes around the shadow now so the dark shape will stay behind them."},
    {name:"Shape the open mantle",text:"Shape the rounded mantle top and sides, but stop both side contours at the arm-base anchors so the lower edge stays open around all eight pale routes.",tip:"Pull the upper mantle in two relaxed arcs, then lift the pencil at each arm-base anchor. Do not draw a wavy bottom line; the eight arm contours will close that silhouette in the next step."},
    {name:"Wrap all eight arms",text:"Wrap every fixed route with one thick tapering arm, keeping exactly eight separate visible tips in the same left-to-right order.",tip:"Work around the fan one route at a time and count again at the end. Make each arm broad near the body and narrow at its tip without crossing its neighbor."},
    {name:"Add the face suckers and bubbles",text:"Add two oval eyes, one cheerful smile, exactly two visible sucker circles on each of the eight arms, and exactly three bubbles at upper right.",tip:"Place the two suckers near each arm tip so the count stays readable. Check sixteen suckers as eight clear pairs rather than counting the whole page at once."},
    {name:"Reserve spots shine and shadow",text:"Add exactly six mantle spots, two open-paper head highlights, two cheek marks, and the established broken shadow behind the front arms.",tip:"Keep the six spots above the eyes and leave both highlight shapes unfilled. Stop every navy shadow stroke at the front-arm edges."},
    {name:"Ink and map the ocean colors",text:"Ink only established contours and map coral, purple, aqua, yellow, pink, and navy strokes in every planned region.",tip:"Ink the small suckers and face first, then rotate the page for the eight long arm curves. Leave visible fill gaps for the finishing pass."},
    {name:"Pull the marker texture",text:"Clarify the established directional marker streaks, sucker rings, cheek accents, highlights, and shadow without adding any form.",tip:"Pull strokes from the mantle center down each arm. Use a second light pass only where the coral needs depth, and keep the paper grain visible."},
    {name:"Finish the cheerful octopus",text:"Complete only the established marker fills, strengthen selected keeper contours, and clarify the same arms, face, suckers, bubbles, spots, highlights, texture, and shadow.",tip:"Count eight arms, sixteen suckers, three bubbles, six spots, two eyes, and two highlights, then stop. Seaweed, fish, shells, and lettering would make a different lesson.",image:true}
  ]},
  {slug:"colorful-flip-flops",day:"111",date:"Monday, August 31",isoDate:"2026-08-31",subject:"a pair of colorful flip-flops",headlineSubject:"a pair of colorful<br>flip-flops",shortSubject:"colorful flip-flops",lessonTitle:"Let's draw a pair of colorful flip-flops",description:"Learn how to draw colorful flip-flops with two overlapping soles, anchored Y straps, six curved bands, thick marker outlines, and bright handmade color.",intro:"Map two crossing sandal axes, then shape the rounded soles and anchor one Y strap to each toe post before curving three bright bands across each footbed. This easy 20-minute marker lesson practices paired angles, fixed strap attachments, clean overlap, and bold summer color that still shows the grain of the felt tip.",time:20,difficulty:"Easy",accent:"#e85b51",finished:"colorful-flip-flops-finished-v1.jpg",finishedAlt:"Handmade felt-tip marker drawing of exactly two face-free overlapping flip-flops on warm paper: one rear-left teal sandal tilted upward and one front-right coral sandal tilted downward, each with one golden-yellow Y-shaped strap containing exactly three fixed branches, exactly three pale-aqua curved sole bands, exactly two open-paper strap highlights, small black outer-edge tread notches, thick imperfect black outlines, visible directional marker streaks, and one broken deep-navy ground shadow",materials:["Pencil","Drawing paper","Black felt-tip marker","Coral, teal, golden-yellow, pale-aqua, and deep-navy markers"],materialNote:"Use pale pencil for the two sole axes, separated toe and heel arcs, strap routes, band placements, and shadow. Let the black felt-tip dry before filling the established coral, teal, yellow, aqua, and navy regions with directional strokes.",tipLabel:"Marker tip",steps:[
    {name:"Map the two sandals",text:"Use pale pencil to place two long axes, separated toe and heel arcs, side-width ticks, two toe-post dots, six open strap routes, six band placements, and one broken shadow route.",tip:"Keep the soles open and sparse. Fix the overlap now: the front-right sandal should cover only a small lower-right piece of the rear-left sandal."},
    {name:"Shape both soles",text:"Connect one rear-left sole and one front-right sole with rounded toes, narrow waists, heels, and the same small overlap.",tip:"Ghost each long edge before touching down. Stop the rear sole cleanly at the foreground sandal instead of drawing a line through the overlap."},
    {name:"Attach the Y straps",text:"Wrap the routes with one Y-shaped strap on each sandal, keeping all six branches attached to their original toe posts and sole edges.",tip:"Draw the center branch from the toe post first, then split to the two side attachments. Trace each route with a finger and make sure no branch floats."},
    {name:"Curve six sole bands",text:"Add exactly three curved bands across each sole and one simple edge seam around each sandal, stopping every band at a strap.",tip:"Let each band bow across the width of its own sole. Count three on teal and three on coral before moving on."},
    {name:"Reserve shine tread and shadow",text:"Add exactly two strap-highlight reserves per sandal, small outer-edge tread notches, and the established broken ground shadow.",tip:"Keep all four highlights narrow and inside the yellow strap footprints. Break the tread rhythm around the overlap so the foreground sole stays clear."},
    {name:"Ink and map the beach colors",text:"Ink only established contours and map coral, teal, golden yellow, pale aqua, and deep navy in every planned region.",tip:"Ink the toe posts and strap branches first, then rotate the page for the long sole curves. Pull color strokes along each sandal and leave small fill gaps for the final pass."},
    {name:"Pull the marker texture",text:"Clarify the established directional marker streaks, strap overlaps, tread notches, highlights, and shadow without adding any form.",tip:"Use a second light pass only where the fill needs depth. Keep the visible streaks running with each sole instead of scrubbing them flat."},
    {name:"Finish the boardwalk pair",text:"Complete only the established marker fills, strengthen selected keeper contours, and clarify the same bands, straps, highlights, tread, texture, and shadow.",tip:"Count two sandals, six strap branches, six sole bands, and four highlights, then stop. Feet, flowers, sand, and beach props would make a different lesson.",image:true}
  ]},
  {slug:"cartoon-hermit-crab-with-spiral-shell",day:"110",date:"Sunday, August 30",isoDate:"2026-08-30",subject:"a cartoon hermit crab with a spiral shell",headlineSubject:"a cartoon hermit crab<br>with a spiral shell",shortSubject:"a cartoon hermit crab",lessonTitle:"Let's draw a cartoon hermit crab with a spiral shell",description:"Learn how to draw a cartoon hermit crab with a spiral shell, two claws, four walking legs, an expressive face, thick marker outlines, and bright tide-pool color.",intro:"Start with one tilted shell oval, a compact body, and open routes for the eyes, claws, and four legs. Then connect the silhouette, build the appendages, and add the spiral shell and asymmetrical face before mapping every bold marker color. This 25-minute challenge lesson practices crowded attachment points, layered overlaps, and bright handmade fills without losing a clear cartoon silhouette.",time:25,difficulty:"Challenge",accent:"#00a9a2",finished:"cartoon-hermit-crab-with-spiral-shell-finished-v1.jpg",finishedAlt:"Handmade felt-tip marker drawing of one right-facing coral-orange cartoon hermit crab with exactly two eye stalks, one wide eye, one half-lidded eye, one large raised claw, one smaller forward claw, exactly four walking legs, one teal shell with a yellow spiral and exactly three raspberry bands, two pale-aqua shell highlights, a crooked one-tooth grin, exactly three warm sand marks, thick imperfect black outlines, visible marker texture, and one broken navy ground shadow",materials:["Pencil","Drawing paper","Black felt-tip marker","Coral-orange, teal, yellow, raspberry, pale-aqua, warm-sand, and navy markers"],materialNote:"Keep the first shell, body, eye, claw, leg, and shadow routes pale. Let the black outlines dry before filling the established regions with directional marker strokes, and preserve the two shell highlights as open paper.",tipLabel:"Marker tip",steps:[
    {name:"Map the shell and routes",text:"Use pale pencil to place one tilted shell oval and center point, one small right-facing body oval, two eye-stalk routes, two claw routes, exactly four leg attachment ticks, and one broken shadow route.",tip:"Keep this first frame loose and under two minutes. Check that every route starts from the body area it will eventually attach to."},
    {name:"Connect shell and body",text:"Connect the large tilted shell and compact right-facing body over their established guides, keeping the shell opening behind the body.",tip:"Pull the shell in two broad arcs and stop its lower-right edge where the body overlaps it. Do not close the claws, legs, or eyes yet."},
    {name:"Shape both claws",text:"Wrap the two established routes with one large raised front claw and one smaller forward claw while preserving both attachment points on the front body.",tip:"Make the upper claw noticeably larger so the pose feels lively. Keep both pincers open enough to read at thumbnail size."},
    {name:"Add stalks and four legs",text:"Turn the two upper routes into exactly two blank eye stalks and the four lower ticks into exactly four bent walking legs.",tip:"Count the four legs before moving on. Leave both eyes blank so the expression arrives in the next step."},
    {name:"Spiral the shell and face",text:"Add one broad shell spiral, exactly three curved shell bands, one wide eye, one half-lidded eye, offset pupils, one raised brow, one crooked one-tooth grin, and two cheek hatches.",tip:"Let the spiral widen as it travels outward. The uneven eyes and off-center grin create the crab's attitude, so avoid making the face symmetrical."},
    {name:"Place beachy details",text:"Add two claw creases, reserve two shell highlights, place exactly three short sand marks, and shape one broken ground shadow beneath the established crab.",tip:"Keep the highlights inside the shell and the three sand marks outside the body. These small accents should support the silhouette rather than crowd it."},
    {name:"Ink and map the tide-pool colors",text:"Ink every established contour and visibly map coral orange, teal, yellow, raspberry, pale aqua, warm sand, and navy marker strokes in every planned region.",tip:"Work from the small face and leg shapes toward the broad shell. Pull strokes along each form and leave a few fill gaps for the finishing pass."},
    {name:"Finish the shell-side swagger",text:"Complete only the established marker fills, strengthen selected keeper contours, and clarify the same highlights, sand marks, face, and broken shadow.",tip:"Count two eye stalks, two claws, four walking legs, three shell bands, two highlights, and three sand marks before stopping. Do not add seaweed or extra beach props the earlier frames did not build.",image:true}
  ]},
  {slug:"cartoon-hand-mirror-with-sparkles",day:"109",date:"Saturday, August 29",isoDate:"2026-08-29",subject:"a cartoon hand mirror with sparkles",headlineSubject:"a cartoon hand mirror<br>with sparkles",shortSubject:"a cartoon hand mirror",lessonTitle:"Let's draw a cartoon hand mirror with sparkles",description:"Learn how to draw a cartoon hand mirror with an oval frame, rounded handle, three sparkles, two glass highlights, thick marker outlines, and bright color.",intro:"Begin with two nested ovals and a single handle route, then build the frame before attaching the handle and inner glass. Add the grip, exactly three sparkles, and two shine reserves before you ink and map every color. This easy 15-minute marker lesson practices centered nested shapes, clean attachment points, and bright fills that keep their handmade streaks.",time:15,difficulty:"Easy",accent:"#7240aa",finished:"cartoon-hand-mirror-with-sparkles-finished-v1.jpg",finishedAlt:"Handmade felt-tip marker drawing of one face-free upright cartoon hand mirror with one thick purple oval frame, one rounded purple handle attached at the bottom, one pink inset grip, one pale aqua glass oval, exactly three yellow sparkles outside the upper-right frame, exactly two open-paper glass highlights, thick imperfect black outlines, visible marker streaks, and one short broken navy ground shadow",materials:["Pencil","Drawing paper","Black felt-tip marker","Purple, pink, pale-aqua, yellow, and navy markers"],materialNote:"Use pale pencil for the two oval guides, center axis, short handle route, sparkle ticks, and shadow route. Let the black outline dry before mapping every color, then complete the fills with directional strokes that preserve visible marker texture.",tipLabel:"Marker tip",steps:[
    {name:"Map the mirror guides",text:"Use pale pencil to place two nested ovals, one vertical center axis, one short downward handle route, exactly three upper-right sparkle ticks, and one short shadow route.",tip:"Keep the handle as one centerline only. Compare the empty ring between the ovals before you darken either curve."},
    {name:"Draw the oval frame",text:"Connect only the thick oval frame over the two established guides while keeping the handle route and sparkle ticks visible.",tip:"Rotate the page and pull each oval in two relaxed arcs. Keep the frame width even enough to read, but not mechanically perfect."},
    {name:"Attach handle and glass",text:"Wrap the lower route with one rounded handle and clarify the inner glass oval inside the established frame.",tip:"Center the handle on the vertical axis and tuck its top behind the frame. Check both attachment corners before closing the bottom curve."},
    {name:"Add grip sparkles and shines",text:"Add one inset grip outline, turn the three ticks into exactly three sparkles, and reserve exactly two open-paper shine marks inside the glass.",tip:"Vary the three sparkle sizes while keeping all of them outside the glass. Leave the two highlight shapes unfilled from this stage onward."},
    {name:"Ink and map the colors",text:"Ink the established contours and map purple, pink, pale aqua, yellow, and navy marker strokes in every planned region.",tip:"Ink the small sparkles and grip first, then rotate the page for the long ovals. Leave a few visible fill gaps for the final pass."},
    {name:"Finish the sparkling mirror",text:"Complete only the established marker fills, strengthen selected keeper contours, and clarify the same grip, three sparkles, two highlights, and short shadow.",tip:"Count one handle, one grip, three sparkles, and two highlights before stopping. Do not add a reflected face or cosmetics the earlier steps did not build.",image:true}
  ]},
  {slug:"cartoon-hamburger-with-steam",day:"108",date:"Thursday, August 27",isoDate:"2026-08-27",subject:"a cartoon hamburger with steam",headlineSubject:"a cartoon hamburger<br>with steam",shortSubject:"a cartoon hamburger",lessonTitle:"Let's draw a cartoon hamburger with steam",description:"Learn how to draw a cartoon hamburger with steam using bold marker layers, six sesame seeds, and handmade color.",intro:"Build a simple bun-and-filling scaffold, then layer the burger before adding sesame seeds, steam, and bold marker color. This 20-minute lesson practices keeping stacked cartoon shapes centered and clear.",time:20,difficulty:"Intermediate",accent:"#d7772b",finished:"cartoon-hamburger-with-steam-finished-v1.jpg",finishedAlt:"Handmade felt-tip marker drawing of one face-free cartoon hamburger with tan buns, one brown patty, one yellow cheese slice, one green lettuce strip, one red tomato accent, six sesame seeds, two steam curls, thick imperfect black outlines, visible marker streaks, and a small ground shadow",materials:["Pencil","Drawing paper","Black felt-tip marker","Tan, brown, yellow, green, and red markers"],materialNote:"Draw light guides first, then let the black outline dry before filling established areas with directional marker strokes.",tipLabel:"Marker tip",steps:[{name:"Stack the simple guides",text:"Place a dome arc, two bun guides, a patty oval, and two tiny steam ticks.",tip:"Keep the first frame loose and under two minutes."},{name:"Round out the buns",text:"Connect the top and lower bun contours over the guides.",tip:"Ghost each long curve before committing."},{name:"Layer the fillings",text:"Add one patty, one draped cheese slice, one wavy lettuce strip, and a narrow tomato accent.",tip:"Keep each layer centered in the same stack."},{name:"Sprinkle seeds and steam",text:"Add exactly six sesame seeds and turn the two ticks into two steam curls.",tip:"Count both groups before you move on."},{name:"Ink and map every flavor",text:"Ink established contours and map tan, brown, yellow, green, and red in every planned region.",tip:"Pull strokes with each form instead of scrubbing the fill."},{name:"Serve the marker burger",text:"Complete only established fills, strengthen selected contours, and add the small existing highlight and shadow accents.",tip:"Stop after checking six seeds and two steam curls.",image:true}]},
  {slug:"cartoon-school-backpack-with-apple-keychain",day:"107",date:"Wednesday, August 26",isoDate:"2026-08-26",subject:"a cartoon school backpack with an apple keychain",headlineSubject:"a school backpack<br>with apple keychain",shortSubject:"a school backpack",lessonTitle:"Let's draw a cartoon school backpack with an apple keychain",description:"Learn how to draw a cartoon school backpack with two straps, a front zipper pocket, an apple keychain, thick marker outlines, and bright color.",intro:"Start with one connected rounded backpack guide, a centerline, a pocket box, two shoulder ticks, and a zipper anchor. Then connect the bag, add its straps and flap, and turn that zipper anchor into the apple keychain before you ink and map every color. This easy 20-minute doodle is a cheerful back-to-school exercise in clean nested shapes, simple symmetry, and marker fills with visible handmade texture.",time:20,difficulty:"Easy",accent:"#f16f66",finished:"cartoon-school-backpack-with-apple-keychain-finished-v1.jpg",finishedAlt:"Handmade felt-tip marker drawing of one front-facing coral cartoon school backpack with exactly two curved coral shoulder straps, one yellow rounded top flap, one teal rounded front zipper pocket, one small red apple keychain attached to the pocket zipper pull with exactly one green leaf, two open-paper highlights, thick imperfect black outlines, visible marker fill texture, and one broken navy ground shadow",materials:["Pencil","Drawing paper","Black felt-tip marker","Coral, yellow, teal, red, green, and navy markers"],materialNote:"Use pale pencil to place one connected rounded backpack guide, a centerline, a pocket box, two shoulder ticks, and a zipper anchor beside the pocket. Add black marker only after each contour is established, then pull directional color strokes around the two open-paper highlights.",tipLabel:"Marker tip",steps:[
    {name:"Draw one connected bag guide",text:"Use pale pencil to draw one connected tall rounded-rectangle backpack guide with a centerline, a lower pocket box, exactly two short outer shoulder ticks, and one zipper anchor on the right edge of the pocket box.",tip:"Keep this first frame under two minutes. The rounded guide must be one unbroken shape; the two ticks only locate future shoulder straps, and the zipper anchor reserves the apple's final attachment point."},
    {name:"Connect the backpack body",text:"Trace the upright rounded bag body and short top handle over the same connected guide while leaving the two shoulder ticks and the pocket box visible.",tip:"Pull each side of the bag in one long relaxed curve. Do not move the pocket box or zipper anchor: they already fix the keychain's eventual location."},
    {name:"Add the outer straps and flap",text:"Draw exactly two curved shoulder straps outside the bag from the two upper ticks to the lower outer sides, then add one rounded top flap above the body.",tip:"Keep the straps the same width as they curve down both sides. The flap faces down over the body; it is not a second rim around the bag."},
    {name:"Draw the pocket and attached apple",text:"Turn the lower box into one rounded front pocket, add its zipper seam and short pull, then draw one small apple with exactly one leaf hanging from that pull beside the lower-right bag edge.",tip:"The apple starts at the zipper pull, so keep its loop touching the pull and its body close to the bag. Leave both highlight shapes as plain paper from the start."},
    {name:"Ink and map every color",text:"Ink only the established contours, then place visible coral, yellow, teal, red, green, and navy marker strokes in every planned color region without completing the fills.",tip:"Ink the zipper pull and apple first, then rotate the page for long bag curves. Use directional strokes and leave small unfilled gaps for the final pass."},
    {name:"Finish the school-ready bag",text:"Complete only the established marker fills, selectively strengthen existing black contours, and add small highlight and shadow accents.",tip:"Preserve the two paper highlights and count two straps, one pocket, one apple, and one leaf before stopping. Do not add books, pencils, a face, or lettering that the earlier steps did not build.",image:true}
  ]},
  {slug:"cartoon-rocket-planter-with-sprout",day:"106",date:"Wednesday, August 19",isoDate:"2026-08-19",subject:"a cartoon rocket planter with a sprout",headlineSubject:"a rocket planter<br>with a sprout",shortSubject:"a rocket planter",lessonTitle:"Let's draw a cartoon rocket planter with a sprout",description:"Learn how to draw a cartoon rocket planter with three fins, one round window, a two-leaf sprout, thick marker outlines, and bright color.",intro:"Begin with one simple body ellipse, a centerline, and a few placement ticks. Then connect the planter shell, add three fins, and build the window and sprout before you ink and map every color. This playful 20-minute doodle turns a familiar rocket silhouette into a practical lesson in moving from sparse construction to bold marker finish.",time:20,difficulty:"Easy",accent:"#e84842",finished:"cartoon-rocket-planter-with-sprout-finished-v2.jpg",finishedAlt:"Handmade felt-tip marker drawing of one upright red cartoon rocket planter with one open top rim, exactly three yellow lower fins, one centered teal round window, one green curved stem with exactly two leaves, two white shine marks, thick imperfect black outlines, visible marker fill texture, and one broken navy ground shadow",materials:["Pencil","Drawing paper","Black felt-tip marker","Red, yellow, teal, green, and navy markers"],materialNote:"Use pale pencil for one body ellipse, centerline, top-rim axis, window center cross, three fin attachment ticks, and a sprout gesture. Keep later contours absent until their assigned steps, then let the black marker dry before completing the established color regions.",tipLabel:"Marker tip",steps:[
    {name:"Map the rocket with simple guides",text:"Use pale pencil to place one tall body ellipse, one vertical centerline, one short top-rim axis, a small window-center cross, exactly three fin attachment ticks, and one sprout gesture with two leaf-tip ticks.",tip:"Keep this under two minutes. Do not draw closed fins, a window circle, leaf outlines, highlights, or a shadow yet."},
    {name:"Connect the planter shell",text:"Connect only the rounded rocket body, curved nose, and open top rim over the pale construction while leaving fins, window, and leaves absent.",tip:"Pull each body side in one relaxed curve. Keep the three fin ticks, window cross, and sprout gesture visible for the next stages."},
    {name:"Build three rounded fins",text:"Add exactly three rounded fin contours at the established attachment ticks while keeping the window cross and sprout gesture open.",tip:"Compare the empty spaces beside the body so the two side fins balance. Keep the center fin aligned with the body axis."},
    {name:"Add the window and sprout",text:"Draw one round window with an inner ring, one curved stem with exactly two leaves, two open highlight reserves, and one short broken shadow route.",tip:"Ghost the window circle before drawing it. Point the two leaves in different directions and keep the stem emerging from inside the rim."},
    {name:"Ink and map every color",text:"Ink only the established contours, then place visible red, yellow, teal, green, and navy marker strokes in every major color region without completing the fills.",tip:"Ink the small shapes first, rotate the page for the long shell curves, and leave enough unfilled paper for the final pass."},
    {name:"Finish the launch garden",text:"Complete only the established marker fills, selectively strengthen existing black contours, and add small highlight and shadow accents.",tip:"Use directional strokes and preserve the two paper highlights. Count three fins, one window, one stem, and two leaves before stopping.",image:true}
  ]},
  {slug:"cartoon-penguin-with-scarf",day:"102",date:"Saturday, August 15",isoDate:"2026-08-15",subject:"a cartoon penguin with a scarf",headlineSubject:"a cartoon penguin<br>with a scarf",shortSubject:"a cartoon penguin",lessonTitle:"Let's draw a cartoon penguin with a scarf",description:"Learn how to draw a cartoon penguin with a scarf using simple body ovals, two flippers, a small beak, thick marker outlines, and bright color.",intro:"Build one upright penguin from two simple ovals, then add its belly, scarf route, two flippers, little beak, and face before you fill the established shapes with lively marker color. This easy 20-minute doodle teaches a reliable way to keep a symmetrical character warm, readable, and full of handmade personality.",time:20,difficulty:"Easy",accent:"#d94b43",finished:"cartoon-penguin-with-scarf-finished-v1.jpg",finishedAlt:"Handmade felt-tip marker drawing of one upright black and white cartoon penguin with exactly two side flippers, one small orange beak, exactly two oval eyes, exactly two peach cheek marks, one red scarf with a short hanging tail and exactly three pale stripe bands, thick imperfect black outlines, visible marker fill texture, and one broken pale-blue oval shadow",materials:["Pencil","Drawing paper","Black felt-tip marker","Red, orange, pale-blue, peach, and white markers"],materialNote:"Use pale pencil to map the two body ovals, belly, one beak point, two flipper routes, scarf band and tail, then leave the three scarf stripes and broken shadow open. Let the black marker dry before filling only the established shapes with directional strokes.",tipLabel:"Marker tip",steps:[
    {name:"Map the chilly pose",text:"Use pale pencil to place one tall body oval, one smaller head oval, a centerline, belly oval, beak point, exactly two flipper routes, the scarf footprint, and a broken shadow reserve.",tip:"Keep this first frame loose. Compare both halves across the centerline before you commit to the outer contour."},
    {name:"Shape the penguin",text:"Connect the guides into one upright penguin silhouette and one inner belly, then draw the unfilled scarf band and its short hanging tail.",tip:"Pull each side of the body in a single long curve. Let the scarf cross the planned neck route instead of trying to erase a finished belly line later."},
    {name:"Add wings and beak",text:"Draw exactly two side flippers and one small beak on their established routes.",tip:"Aim each flipper down and slightly outward like a relaxed comma. Keep the beak centered on the axis and smaller than either eye will be."},
    {name:"Color the scarf",text:"Fill the established scarf red, leaving exactly three pale stripe bands across its hanging tail.",tip:"Use short strokes that follow the tail direction. Stop at the outline instead of tracing back and forth until the paper gets muddy."},
    {name:"Ink the cozy character",text:"Add exactly two oval eyes and two tiny cheek marks, then trace the established contours with thick imperfect black marker and fill the body, beak, and broken shadow.",tip:"Set the two eyes at the same height by checking the head curve above them. The little open white belly gives the dark outline room to breathe."},
    {name:"Make the penguin pop",text:"Even only the established marker fills, clarify any open-paper shine gaps, and strengthen the contours already shown.",tip:"Count two eyes, two flippers, one beak, and three scarf stripes before you stop. Avoid adding a hat or background scene that the earlier steps did not build.",image:true}
  ]},
  {slug:"cartoon-wizard-hat-with-stars",day:"101",date:"Friday, August 14",isoDate:"2026-08-14",subject:"a cartoon wizard hat with stars",headlineSubject:"a cartoon wizard hat<br>with stars",shortSubject:"a wizard hat",lessonTitle:"Let's draw a cartoon wizard hat with stars",description:"Learn how to draw a cartoon wizard hat with a floppy cone, crescent buckle, three stars, thick marker outlines, and bright color.",intro:"Start with one wide brim and a bent cone gesture, then build the orange band, crescent buckle, and exactly three stars before the heavy black-marker and color passes. This easy 15-minute doodle is a friendly way to practice long confident curves, clean layered details, open-paper shines, and saturated marker fills that still feel handmade.",time:15,difficulty:"Easy",accent:"#673a9e",finished:"cartoon-wizard-hat-with-stars-finished-v1.jpg",finishedAlt:"Handmade felt-tip marker drawing of one face-free purple cartoon wizard hat with one wide oval brim, one tall cone bent right, one orange band, one yellow crescent-moon buckle, exactly three yellow five-point stars, exactly two teal open-paper shine marks, thick imperfect black outlines, visible purple and orange marker streaks, and one flat broken deep-navy shadow",materials:["Pencil","Drawing paper","Black felt-tip marker","Purple, orange, yellow, teal, and deep-navy markers"],materialNote:"Use pale pencil to map the brim, tall centerline, bent cone route, complete band and buckle footprints, three star centers, two shine gaps, and a flat shadow. Let the black outline dry before filling the established areas with directional marker strokes and leaving the shine marks open.",tipLabel:"Marker tip",steps:[
    {name:"Map the brim and bend",text:"Use pale pencil for one wide brim ellipse, one tall centerline, one bent cone gesture, the full band and crescent-buckle footprint, exactly three star centers, two shine reserves, and a flat broken shadow footprint.",tip:"Ghost the cone sweep twice before drawing. This first frame should look like construction, not a pale finished hat."},
    {name:"Shape the floppy hat",text:"Connect the brim and cone guides into one tall wizard-hat silhouette with a tip that bends right, while keeping the band, buckle, star, shine, and shadow reserves open.",tip:"Use the centerline to keep the cone leaning without becoming lopsided. Pull each brim edge in one steady ellipse rather than tracing it repeatedly."},
    {name:"Add the magic band",text:"Draw one band across the lower cone and one crescent-moon buckle on the established footprint.",tip:"Keep both band edges parallel as they cross the curve. Leave the buckle open inside for now so its yellow fill stays clean later."},
    {name:"Place the three stars",text:"Turn the three centers into exactly three five-point stars, then add the two shine gaps and a few short cone-fold lines.",tip:"Draw each star as a tiny zigzag around its center dot, not as a circle with points. Keep the three stars separated and do not add a fourth sparkle."},
    {name:"Ink the spellbound shapes",text:"Trace only the established hat, band, buckle, three stars, shine marks, fold lines, and flat broken shadow with thick, slightly wobbly black felt-tip.",tip:"Ink the buckle and stars first, then rotate the page for the long cone curves. Make the outer hat silhouette heavier than the small fold lines."},
    {name:"Make the magic pop",text:"Fill the established hat purple, band orange, buckle and three stars yellow, shine marks teal, and shadow deep navy; clarify only the same black contours and paper gaps.",tip:"Pull marker strokes along the cone and brim curves, not straight across them. Count one hat, one band, one buckle, three stars, two shines, and one shadow before stopping. Try a different color spell in your version if you like, but keep the bold handmade grain.",image:true}
  ]},
  {
    slug: "cartoon-paintbrush-with-rainbow-paint",
    day: "100",
    date: "Thursday, August 13",
    isoDate: "2026-08-13",
    subject: "a cartoon paintbrush with rainbow paint",
    headlineSubject: "a cartoon paintbrush<br>with rainbow paint",
    shortSubject: "a rainbow paintbrush",
    lessonTitle: "Let's draw a cartoon paintbrush with rainbow paint",
    description: "Learn how to draw a cartoon paintbrush with rainbow paint using a tilted handle, wide bristles, three parallel paint bands, bold outlines, and bright marker color.",
    intro: "Angle one face-free paintbrush across the page, build its rounded handle, metal ferrule, and wide bristles, then sweep exactly three parallel paint bands out of the tip before the black-marker and color passes. This easy 20-minute doodle gives you a practical exercise in a clean diagonal composition, parallel curves, visible marker texture, and paint that looks like it is moving without needing a complicated scene.",
    time: 20,
    difficulty: "Easy",
    accent: "#f15b5d",
    finished: "cartoon-paintbrush-with-rainbow-paint-finished-v1.jpg",
    finishedAlt: "Handmade felt-tip marker drawing of one face-free paintbrush angled from lower left to upper right with a coral rounded handle, blue-gray ferrule, warm-yellow bristles, exactly three parallel paint bands curling from the bristle edge in coral, yellow, and teal, two open-paper handle highlights, simple ferrule and bristle marks, thick imperfect black outlines, visible marker streaks, and one short flat navy shadow.",
    materials: ["Pencil", "Drawing paper", "Black felt-tip marker", "Coral, warm-yellow, teal, blue-gray, and navy markers"],
    materialNote: "Start with a pale handle capsule, ferrule box, bristle trapezoid, paint route, two highlight gaps, and a flat shadow footprint. Let your black outline dry before pulling marker strokes along the handle, bristles, and three paint bands, leaving the two highlights as open paper.",
    tipLabel: "Marker tip",
    steps: [
      { name: "Map the brush tilt", text: "Use pale pencil for one rounded handle capsule, one ferrule box, one wide bristle trapezoid, a single curling paint route, two tiny highlight ovals, and one short flat shadow footprint.", tip: "Ghost the lower-left to upper-right axis twice before drawing. This first frame should read as construction, not a pale finished brush." },
      { name: "Wrap the brush", text: "Connect the handle, ferrule, and bristle guides into one loose angled paintbrush silhouette while keeping the paint as one guide route.", tip: "Keep the handle wider at its rounded end and let the ferrule edges stay parallel. Stop the bristle edge where the paint route begins so the next step joins cleanly." },
      { name: "Sweep three paint bands", text: "Turn the guide into exactly three parallel uncolored paint bands that curl from the bristle edge and end in three rounded tips.", tip: "Draw the outer curve first, echo it twice inside, and check that the gaps remain even around the bend. Do not add stray drips or a fourth band." },
      { name: "Add the working details", text: "Add the ferrule seam, four small rivet dots, and long bristle-direction strokes without changing the brush or three paint bands.", tip: "Keep the bristle strokes long and in the same direction. Four small dots are enough to suggest the ferrule hardware without competing with the paint." },
      { name: "Reserve the highlights and shadow", text: "Add the two open-paper handle highlights and the short flat ground shadow while preserving every established brush, hardware, bristle, and paint-band line.", tip: "Leave both highlight shapes uncolored from the beginning, and keep the shadow beneath the handle instead of wrapping around it like a border." },
      { name: "Ink the established lines", text: "Trace only the established brush, three paint bands, highlights, texture marks, and shadow with thick, slightly wobbly black felt-tip.", tip: "Ink the small ferrule marks and paint tips first, then rotate the page for the long handle and paint curves. Keep the outside silhouette heaviest." },
      { name: "Pull in rainbow color", text: "Fill the handle coral, ferrule blue-gray, bristles warm yellow, and the three established paint bands coral, yellow, and teal; fill the existing shadow navy.", tip: "Pull strokes along each long form and keep both handle highlights open. Let neighboring colors dry before they touch so the black outline stays crisp." },
      { name: "Finish the rainbow brush", text: "Strengthen only established black contours and marker fills, clarify the same two paper highlights, and deepen the existing flat navy shadow.", tip: "Count one brush, one handle, one ferrule, one bristle tip, three paint bands, two highlights, and one shadow before stopping. Try another three-color palette later, but keep the curves parallel and the marker texture visible.", image: true }
    ]
  },
  {
    slug: "cartoon-axolotl-swimming",
    day: "099",
    date: "Wednesday, August 12",
    isoDate: "2026-08-12",
    subject: "a cartoon axolotl swimming",
    headlineSubject: "a cartoon axolotl<br>swimming",
    shortSubject: "a swimming axolotl",
    lessonTitle: "Let's draw a cartoon axolotl swimming",
    description: "Learn how to draw a cartoon axolotl swimming with four small limbs, three feathery gills, a surprised one-eye expression, bubbles, bold outlines, and bright marker color.",
    intro: "Sweep one cartoon axolotl through the page on a broad head-body-tail curve, fit four small swimming limbs and three feathery gills around that silhouette, then give it one oversized upward-looking eye and a tiny diamond mouth before the black-marker and color passes. The Intermediate 20-minute doodle turns a trending animal subject into a useful exercise in flowing contours, countable anatomy, expression variation, intentional paper highlights, and directional marker fill.",
    time: 20,
    difficulty: "Intermediate",
    accent: "#ee6f7c",
    finished: "cartoon-axolotl-swimming-finished-v1.jpg",
    finishedAlt: "Handmade felt-tip marker drawing of one right-facing coral-pink cartoon axolotl swimming in side view with one broad rounded head, one tapered body, one broad upward-curling tail fin, exactly four small limbs, exactly three raspberry leaf-tipped external gill stalks, one oversized round eye with a deep-navy pupil looking upward, one tiny open deep-navy diamond mouth, exactly three short cheek hatches, exactly two deep-navy dorsal spots, exactly three teal bubbles, two open-paper oval highlights on the tail, thick imperfect black outlines, visible marker streaks, and one short broken teal water-shadow swoosh",
    materials: ["Pencil", "Drawing paper", "Black felt-tip marker", "Coral-pink, raspberry, deep-navy, and teal markers"],
    materialNote: "Build the drawing in separate pencil passes: begin with a head ellipse, body bean, and tail gesture; connect those masses; add the four limb and three gill envelopes; then place the face and secondary accents. Let the thick black outline dry before pulling coral strokes along the body and tail, keeping the raspberry, navy, teal, and paper-white areas inside their established boundaries.",
    tipLabel: "Marker tip",
    steps: [
      { name: "Map the swimming curve", text: "Use pale pencil for one head ellipse, one long body bean, a sweeping C-shaped tail gesture, and a centerline. Add only tiny attachment ticks for the future limbs and gills; leave the face and all accents for later.", tip: "Ghost the head-to-tail sweep twice before touching down, then compare the open paper above and below the three primitive masses. This frame should still look like raw construction, not a faint finished axolotl." },
      { name: "Wrap the head body and tail", text: "Connect the head ellipse, body bean, and tail gesture into one loose right-facing silhouette with a rounded head, tapered body, and broad curling tail fin. Keep the pale masses visible underneath and leave limbs and gills as simple route lines.", tip: "Pull the belly and back as two relaxed curves, then rotate the page for the broad tail fin. Stop the body contour at the small attachment ticks so the next shapes can join without erasing keeper lines." },
      { name: "Fit the legs and gill fan", text: "Add rough envelopes for exactly four small swimming limbs and exactly three external gill stalks. Use simple mitten and leaf masses for now; toe splits, feathery edges, and the face still come later.", tip: "Place the two smaller far limbs first and let them tuck behind the body, then add the two near limbs on top. Fan three plain gill leaves from the back of the head at clearly different angles." },
      { name: "Give the axolotl a surprised face", text: "Add one oversized round eye with its pupil high and looking upward, one tiny open diamond mouth, exactly three short cheek hatches, and the tail-fin seam. Split the four mitten ends into toes and feather the same three gill edges.", tip: "Place the pupil high in the eye before darkening it, then keep the diamond mouth small and off-center. Refine the appendages you already built without changing their count, position, or overall mass." },
      { name: "Add the spots bubbles and highlights", text: "Add exactly two dorsal spots, exactly three separate bubbles, two open-paper oval highlights, and the reserved broken water-shadow swoosh while preserving the anatomy and expression.", tip: "Space the two spots along the body curve and stack the three bubbles with uneven gaps. Keep both tail highlights open and break the shadow into short pieces so none of these accents becomes a border around the character." },
      { name: "Ink the underwater contours", text: "Trace only the established axolotl, four limbs, three gills, expression, two spots, three bubbles, two highlights, tail seam, and shadow with thick, slightly wobbly black felt-tip.", tip: "Ink the small gill leaves, fingers, face, and bubbles first, let them dry, then rotate the page for the long body and tail curves. Give the outside silhouette the heaviest line and keep the cheek hatches and tail seam lighter." },
      { name: "Fill the lagoon color", text: "Fill the established body coral pink, all three gill stalks raspberry, eye mouth and two spots deep navy, and three bubbles plus broken shadow teal while preserving both paper highlights and visible felt-tip streaks.", tip: "Pull coral strokes along the body and around the tail curl instead of straight across them. Let the raspberry and navy details dry before coloring beside them, and work around both paper highlights rather than adding white later." },
      { name: "Send the axolotl swimming", text: "Strengthen selected established black contours, even the same limited marker fills, clarify both paper highlights, and deepen only the existing broken water-shadow swoosh.", tip: "Count four limbs, three gills, one eye, one diamond mouth, three cheek hatches, two spots, three bubbles, and two highlights before stopping. Change the colors or eye direction in your own version if you like, but keep the swimming curve and handmade marker grain.", image: true }
    ]
  },
  {
    slug: "garden-hose-with-spray-nozzle",
    day: "098",
    date: "Tuesday, August 11",
    isoDate: "2026-08-11",
    subject: "a garden hose with a spray nozzle",
    headlineSubject: "a garden hose<br>with a spray nozzle",
    shortSubject: "a garden hose",
    lessonTitle: "Let's draw a garden hose with a spray nozzle",
    description: "Learn how to draw a garden hose with a spray nozzle using one coiled overlap, a pistol-grip handle, three water jets, bold outlines, and limited marker color.",
    intro: "Loop one face-free garden hose across the page, connect it to an angled pistol-grip nozzle, and reserve the collar, trigger, water marks, highlights, and flat ground shadow before the heavy black-marker pass. The Intermediate 20-minute doodle turns a familiar garden tool into a useful exercise in tube thickness, over-under overlap, confident curves, drying order, and directional marker fill.",
    time: 20,
    difficulty: "Intermediate",
    accent: "#237451",
    finished: "garden-hose-with-spray-nozzle-finished-v1.jpg",
    finishedAlt: "Handmade face-free felt-tip marker drawing of one thick forest-green garden hose forming one loose lower-left loop with a single over-under crossing, connected to one burnt-orange pistol-grip spray nozzle angled toward the upper right with one open-paper barrel collar, one cream trigger, one cream connector, exactly three black handle grip ribs, exactly three curved muted-blue water jets, exactly two detached blue drops, one open-paper highlight on the hose and one on the handle, thick imperfect black outlines, visible marker streaks, and one short flat irregular deep-navy ground-shadow patch",
    materials: ["Pencil", "Drawing paper", "Black felt-tip marker", "Forest-green, burnt-orange, cream, muted-blue, and deep-navy markers"],
    materialNote: "Use pale pencil to place the one-loop hose route, its single crossing, the full nozzle, collar, trigger, connector, three grip ribs, three water jets, two drops, two highlight gaps, and short flat ground-shadow patch before inking. Let the black outline dry, then pull green strokes along the hose curve and keep the orange, cream, blue, and navy fills inside their established boundaries.",
    tipLabel: "Marker tip",
    steps: [
      { name: "Map the coil and spray angle", text: "Use pale pencil to place one loose hose loop and its single crossing, the angled nozzle envelope, collar, trigger and connector footprints, exactly three spray routes, two drop centers, two highlight gaps, and a short flat irregular ground-shadow footprint.", tip: "Ghost the full hose loop twice before touching down, then draw its centerline in one relaxed pass. Reserve the crossing and connector now so later contours can stop cleanly instead of becoming keeper lines you must erase." },
      { name: "Wrap the hose and nozzle", text: "Build one thick loose hose loop and one connected pistol-grip nozzle silhouette with a barrel, handle, and open collar while preserving every pale hardware, spray, highlight, and shadow reserve.", tip: "Keep the hose width consistent by checking the empty strip between its two edges as you curve. Rotate the page for the loop, then use the nozzle axis to keep the barrel and handle at a clear working angle." },
      { name: "Fit the nozzle and water marks", text: "Add one collar, one trigger, one connector, exactly three grip ribs, three curved spray jets, two detached drops, two open-paper highlights, and the short flat irregular ground-shadow patch.", tip: "Wrap all three grip ribs around the same handle taper and leave open paper between them. Pull the three water jets from the collar in separate confident arcs, then place both drops beyond the spray without turning them into extra jets." },
      { name: "Ink the working contours", text: "Trace only the established hose, nozzle, collar, trigger, connector, three ribs, three jets, two drops, and highlights with thick, slightly imperfect black felt-tip, then fill the established flat shadow patch black.", tip: "Ink the small hardware and drops first, let them dry, then rotate the page for the long hose loop. Give the outside hose and nozzle silhouette more weight than the inner ribs and water marks so the tool stays readable at card size." },
      { name: "Pull in the garden color", text: "Fill the hose forest green, nozzle burnt orange, collar and hardware cream, three water jets and two drops muted blue, and flat ground shadow deep navy while preserving both open-paper highlights and visible marker streaks.", tip: "Pull the green strokes around the hose instead of across its width, and fill the orange handle from edge to center. Let each small cream or blue area dry before coloring beside it, then leave the two highlight gaps untouched." },
      { name: "Turn up the garden spray", text: "Strengthen selected established black contours, even the same limited marker fills, clarify both paper highlights, and deepen only the existing flat ground shadow.", tip: "Count one hose loop, one crossing, one nozzle, three grip ribs, three water jets, two drops, two highlights, and one flat shadow before stopping. Change the hose and nozzle colors in your own version if you like, but keep the overlap and marker grain handmade.", image: true }
    ]
  },
  {
    slug: "heart-with-a-bandage",
    day: "097",
    date: "Monday, August 10",
    isoDate: "2026-08-10",
    subject: "a heart with a bandage",
    headlineSubject: "a heart<br>with a bandage",
    shortSubject: "a bandaged heart",
    lessonTitle: "Let's draw a heart with a bandage",
    description: "Learn how to draw a heart with a bandage using a plump tilted silhouette, a clean diagonal overlap, four ventilation dots, bold outlines, and bright marker fills.",
    intro: "Tilt one plump face-free heart, reserve a diagonal bandage across its middle, and keep the two highlights, two sparkles, and broken shadow visible before the black-marker and color passes. The easy 15-minute doodle turns a friendly symbol into a useful lesson in smooth curves, overlap planning, drying order, and directional fill strokes.",
    time: 15,
    difficulty: "Easy",
    accent: "#d61f69",
    finished: "heart-with-a-bandage-finished-v1.jpg",
    finishedAlt: "Handmade face-free felt-tip marker drawing of one plump raspberry-and-coral heart tilted slightly clockwise with one teal adhesive bandage crossing diagonally from lower left to upper right, one warm-yellow center pad, two rounded adhesive ends with exactly four open-paper ventilation dots total, two open-paper oval heart highlights, exactly two small warm-yellow sparkle accents, thick imperfect black outlines, visible marker streaks, a few pale construction traces, and one broken deep-navy shadow",
    materials: ["Pencil", "Drawing paper", "Black felt-tip marker", "Raspberry, coral, teal, warm-yellow, and deep-navy markers"],
    materialNote: "Use pale pencil to place the heart, diagonal bandage, center pad, four ventilation dots, two highlight gaps, two sparkles, and broken shadow before inking. Let the black outline dry, then pull raspberry and coral marker around the bandage, fill the teal ends and yellow pad separately, and keep every dot and highlight as open paper.",
    tipLabel: "Marker tip",
    steps: [
      { name: "Map the heart and bandage", text: "Use pale pencil to place the slightly tilted heart envelope and center axis, the complete diagonal bandage footprint, one center-pad box, two heart-highlight reserves, two sparkle centers, and one broken shadow footprint.", tip: "Ghost both heart lobes before touching down, then lay a straight diagonal axis across the center. Reserve the entire bandage now so later heart lines and color can stop around it instead of becoming marks you must erase." },
      { name: "Shape the plump heart", text: "Wrap the pale guide with one loose face-free heart contour while preserving the empty diagonal bandage, highlight, sparkle, and shadow reserves.", tip: "Rotate the page to pull each lobe in one confident arc, and let one lobe sit slightly higher than the other. Keep the point soft rather than pinched, then compare the open paper on both sides of the bandage route." },
      { name: "Build the bandage overlap", text: "Add one diagonal bandage with a central pad, two rounded ends, exactly four ventilation dots total, two open-paper heart highlights, exactly two sparkle accents, and the broken shadow contour.", tip: "Draw the two long bandage edges parallel first, then cap both ends with half circles. Count two ventilation dots on each end, and stop the heart's interior marks at the bandage boundary so the overlap stays physically clean." },
      { name: "Ink the caring contours", text: "Trace only the established heart, bandage, center pad, four dots, two highlights, two sparkles, and broken shadow with thick, slightly wobbly black felt-tip.", tip: "Ink the small dots and pad first, let them dry, then rotate the page for the long heart and bandage curves. Give the outside silhouettes more weight than the dot and highlight rings so the doodle remains readable at thumbnail size." },
      { name: "Fill the hopeful color", text: "Fill the established heart with raspberry and coral, both bandage ends with teal, the center pad with warm yellow, and the broken shadow with deep navy while preserving both open-paper highlights and visible marker streaks.", tip: "Pull marker strokes with each form: around the heart lobes, along the bandage, and across the center pad. Let neighboring colors dry before they touch, and color around every dot and highlight instead of painting over the reserved paper." },
      { name: "Patch up the finish", text: "Strengthen selected established black contours, even the same marker fills, clarify the two paper highlights and two sparkles, and deepen only the existing broken shadow.", tip: "Count one heart, one bandage, one center pad, four ventilation dots, two highlights, two sparkles, and one shadow before stopping. Try different care-and-repair colors in your own version, but keep the clean diagonal overlap and handmade marker grain.", image: true }
    ]
  },
  {
    slug: "open-book-with-ribbon-bookmark",
    day: "096",
    date: "Sunday, August 9",
    isoDate: "2026-08-09",
    subject: "an open book with a ribbon bookmark",
    headlineSubject: "an open book<br>with a ribbon bookmark",
    shortSubject: "an open book",
    lessonTitle: "Let's draw an open book with a ribbon bookmark",
    description: "Learn how to draw an open book with a ribbon bookmark using two page blocks, a center gutter, curled corners, stacked page edges, bold outlines, and bright marker fills.",
    intro: "Open one face-free book into two broad page shapes, tuck a ribbon through the center gutter, and keep the page faces free of writing while you build the lower edges, curls, shadow, black outlines, and bright marker color. The easy 15-minute doodle turns a familiar book into a useful exercise in mirrored curves, overlap planning, drying order, and directional fill strokes.",
    time: 15,
    difficulty: "Easy",
    accent: "#d61f69",
    finished: "open-book-with-ribbon-bookmark-finished-v1.jpg",
    finishedAlt: "Handmade face-free felt-tip marker drawing of one open book in a shallow three-quarter view with exactly two blank page blocks, one black V-shaped center gutter, one coral ribbon bookmark hanging from the gutter, one small curled outer corner on each page, exactly three stacked warm-yellow lower page-edge bands per side, raspberry marker fill across the left page and cover plane, teal marker fill across the right page and cover plane, small open-paper cover-edge highlights, thick imperfect black outlines, visible marker streaks, restrained edge hatching, and one broken deep-navy shadow",
    materials: ["Pencil", "Drawing paper", "Black felt-tip marker", "Raspberry, teal, warm-yellow, coral, and deep-navy markers"],
    materialNote: "Use pale pencil to place the complete spread, gutter, lower page blocks, cover edge, bookmark route, two curls, six lower bands, highlight gaps, and shadow first. Color the small coral ribbon and yellow bands lightly, let them dry, trace the established black keeper lines, then pull the broad raspberry and teal page fills with the page curves while keeping the blank surfaces free of text-like marks.",
    tipLabel: "Marker tip",
    steps: [
      { name: "Block the hinge gesture", text: "Use only a few very pale pencil strokes to place one center hinge, the shallow spread angle, two page-span arcs, and four outer corner points without closing the book or adding thickness, ribbon, curls, bands, highlights, shadow, ink, or color.", tip: "Ghost the full spread before touching down, then mark the hinge and outer corners first. Stop while the drawing still looks like a loose gesture; the purpose is to control width and tilt, not to preview the finished book." },
      { name: "Shape the two page faces", text: "Turn the sparse gesture into exactly two loose blank page-face silhouettes meeting at one V-shaped center gutter, with no lower thickness, cover, ribbon, curls, bands, highlights, shadow, ink, or color yet.", tip: "Rotate the page to pull each long outer edge in one relaxed stroke. Use the gutter as the hinge and compare the two page widths, but leave the entire area below the page faces open for the next construction job." },
      { name: "Build the layered book", text: "Add the lower page-block thickness, one visible cover edge, one ribbon footprint from the gutter, two outer corner-curl silhouettes, exactly three lower-band routes per side, small cover-highlight gaps, and one broken shadow footprint in pale pencil.", tip: "Echo the lower page curves to create thickness, then count three band routes on each side. Stop the gutter, cover, and band lines at the ribbon footprint and curl silhouettes so every later overlap is already physically resolved." },
      { name: "Ink the book and ribbon", text: "Trace the established page, gutter, thickness, cover, ribbon, curl, band, highlight, and shadow boundaries with thick, slightly wobbly black felt-tip, then fill only the single ribbon coral without changing the book geometry.", tip: "Ink the small ribbon and curls first, then rotate the page for the long structural edges. Keep the gutter and cover lines broken where the ribbon overlaps them, and let the coral dry before the next color stage." },
      { name: "Band the lower page edges", text: "Darken exactly three stacked lower page-edge bands per side, fill those bands warm yellow, preserve the small cover-edge highlight gaps, and add one broken deep-navy shadow while leaving both broad page faces unmarked.", tip: "Pull each yellow stroke along the page curve and count three bands on both sides before moving on. Keep the shadow outside the book and ribbon silhouettes, and leave broken paper gaps so it does not become a smooth digital oval." },
      { name: "Hatch the cover edges", text: "Add short handmade hatching only along the established outer cover edges and deepen the same broken navy shadow while preserving every inked boundary, yellow band, coral ribbon, curl, and highlight gap.", tip: "Let the yellow and navy marker dry before adding short hatching that follows the cover thickness. Keep the heaviest accents at the outside corners and under the book instead of retracing every line from the prior step." },
      { name: "Fill the bright page color", text: "Fill the established left blank page face and cover plane raspberry and the right blank page face and cover plane teal while preserving the yellow bands, coral ribbon, navy shadow, highlight gaps, and visible marker grain.", tip: "Pull broad marker strokes from the gutter toward each outer edge so the streaks follow the pages. Work one side at a time, let the first color dry, and stop short of the black outlines to avoid muddy bleed." },
      { name: "Turn the page on the finish", text: "Strengthen selected established black edges, even the same marker fills, clarify the cover-edge highlight gaps, and deepen only the existing hatching and broken shadow.", tip: "Count two page blocks, one gutter, one ribbon, two curls, three yellow bands per side, and one shadow before stopping. Change the page palette in your own version if you like, but keep the overlap order, blank surfaces, and handmade marker grain.", image: true }
    ]
  },
  {
    slug: "pickleball-paddle-and-ball-in-motion",
    day: "095",
    date: "Saturday, August 8",
    isoDate: "2026-08-08",
    subject: "a pickleball paddle and ball in motion",
    headlineSubject: "a pickleball paddle<br>and ball in motion",
    shortSubject: "a pickleball paddle",
    lessonTitle: "Let's draw a pickleball paddle and ball in motion",
    description: "Learn how to draw a pickleball paddle and ball in motion with a wrapped grip, three color blocks, seven visible ball holes, swing arcs, speed dashes, thick outlines, and bright marker fills.",
    intro: "Tilt one face-free pickleball paddle into a quick swing, float one perforated ball just beyond its face, and place the rim, grip, color blocks, holes, highlights, and motion marks before the heavy marker pass. Raspberry, teal, mustard, coral, and deep navy give the 20-minute sports doodle plenty of court energy while visible felt-tip streaks keep it handmade and attainable.",
    time: 20,
    difficulty: "Intermediate",
    accent: "#d61f69",
    finished: "pickleball-paddle-and-ball-in-motion-finished-v1.jpg",
    finishedAlt: "Handmade face-free felt-tip marker drawing of one diagonal pickleball paddle with one thick oval face divided into raspberry, teal, and mustard color blocks by exactly two diagonal routes, one doubled black rim, one short neck, one coral handle with exactly three curved grip bands and a small end cap, one mustard pickleball at upper right with exactly seven visible open holes, two black paddle-swing arcs, exactly three black ball-speed dashes, two open-paper oval highlights on the paddle face, thick imperfect black outlines, visible marker streaks, and one broken deep-navy shadow beneath the handle",
    materials: ["Pencil", "Drawing paper", "Black felt-tip marker", "Raspberry, teal, mustard, coral, and deep-navy markers"],
    materialNote: "Use pencil to place the complete paddle, doubled rim, neck, handle, three grip bands, blank ball, two face routes, seven hole positions, two swing arcs, three speed dashes, two highlights, and shadow before inking. Let the black felt-tip dry before filling the raspberry, teal, mustard, coral, and navy areas, and keep the holes and highlights as open paper.",
    tipLabel: "Marker tip",
    steps: [
      { name: "Map the quick volley", text: "Use pale construction to place the diagonal paddle face, doubled-rim guide, neck, tapered handle, blank ball circle, exactly three grip-band routes, exactly two face-color routes, two swing arcs, three speed dashes, two paddle-face highlights, and one broken shadow footprint.", tip: "Ghost the paddle oval and its long center axis before touching down, then compare the handle length with the face. Keep the ball blank for now, and reserve the motion marks and highlights so no later line has to cut through the paddle or ball." },
      { name: "Wrap the paddle silhouette", text: "Add a loose contour for one thick oval paddle, one short neck, one tapered handle, and one separate blank ball while preserving every grip, pattern, motion, highlight, and shadow route.", tip: "Rotate the page and pull each long paddle edge in one relaxed pass. Keep the neck centered on the oval and match the paper gap around the ball so the action angle does not drift." },
      { name: "Fit the rim and grip", text: "Clarify the doubled paddle rim, neck attachment, small handle end cap, exactly three curved grip bands, and the ball contour without adding holes, black ink, or color.", tip: "Echo the outer oval with a narrow inner rim instead of redrawing a separate shape. Wrap all three grip bands around the same handle taper and stop each band cleanly at the handle edges." },
      { name: "Divide the face and ball", text: "Add exactly two diagonal routes across the paddle face and exactly seven unfilled round holes inside the established ball while keeping the silhouette and grip unchanged.", tip: "Pull both diagonal routes parallel enough to create one broad center block, then place the ball's center hole first and space six around it. Count all seven before darkening any circle." },
      { name: "Kick up the volley motion", text: "Add two curved paddle-swing arcs, exactly three short ball-speed dashes, two open-paper oval highlights on the paddle face, and the established broken shadow.", tip: "Ghost the two long arcs beside the paddle before drawing them and keep all three short dashes beside the ball. Leave open paper between every motion mark and the subject silhouettes so the action remains crisp." },
      { name: "Ink the court-ready lines", text: "Trace only the established paddle, rim, neck, three grip bands, two face routes, ball, seven holes, motion marks, highlights, and shadow with thick, slightly wobbly black felt-tip, then add restrained grip and rim hatching.", tip: "Ink the seven small holes and grip bands first, let them dry, then rotate the page for the large oval. Give the outside silhouette the heaviest line and keep the inner rim and hatching lighter." },
      { name: "Fill the bright court color", text: "Fill the three paddle blocks raspberry, teal, and mustard, the grip coral, the ball mustard around all seven holes, and the broken shadow deep navy while preserving both paper highlights and visible marker streaks.", tip: "Pull the paddle strokes along each diagonal block and the grip strokes around the handle. Let neighboring fills dry before they touch, and color around every hole and highlight instead of painting over the reserved paper." },
      { name: "Snap the pickleball finish", text: "Thicken selected established black edges, even the same marker fills, clarify both paddle highlights, and deepen only the existing grip hatching and broken shadow.", tip: "Count one paddle, one ball, three grip bands, two face routes, seven holes, two swing arcs, three speed dashes, two highlights, and one shadow before stopping. Change the paddle palette if you like, but keep the face-free action and handmade marker grain.", image: true }
    ]
  },
  {
    slug: "raccoon-peeking-from-trash-can",
    day: "094",
    date: "Friday, August 7",
    isoDate: "2026-08-07",
    subject: "a raccoon peeking from a trash can",
    headlineSubject: "a raccoon<br>peeking from a trash can",
    shortSubject: "a peeking raccoon",
    lessonTitle: "Let's draw a raccoon peeking from a trash can",
    description: "Learn how to draw a mischievous raccoon peeking from a ribbed trash can with two paws, an asymmetric side-eye, a ringed tail, bold outlines, and retro marker color.",
    intro: "Build one mischievous raccoon around a big peeking head, two gripping paws, and a striped tail, then fit those shapes into an open ribbed trash can before the heavy marker pass. The asymmetric side-eye, teal metal, charcoal markings, and visible felt-tip grain make this 20-minute challenge playful without turning it into glossy character art.",
    time: 20,
    difficulty: "Challenge",
    accent: "#138f8c",
    finished: "raccoon-peeking-from-trash-can-finished-v1.jpg",
    finishedAlt: "Handmade felt-tip marker drawing of one mischievous cool-gray raccoon peeking from one open teal trash can with exactly two coral-lined ears, two asymmetric charcoal mask patches, one half-lidded eye and one wide eye glancing toward the right side of the page, one raised brow, one dark nose, one crooked grin with one small tooth, exactly two gray paws gripping the front rim, one curled gray tail with exactly three charcoal bands, exactly two can handles, exactly four long can ribs, one tall open-paper highlight, two mustard accent blocks, one diamond-shaped dent, thick imperfect black outlines, visible marker streaks, and one broken deep-navy shadow",
    materials: ["Pencil", "Drawing paper", "Black felt-tip marker", "Cool-gray, charcoal, teal, coral, mustard, and deep-navy markers"],
    materialNote: "Use pencil to place the complete can, raccoon head, two ears, two paws, tail, face, two handles, four ribs, three tail bands, highlight, accent blocks, dent, and shadow first. Let the black felt-tip dry before filling the gray, charcoal, teal, coral, mustard, and navy areas.",
    tipLabel: "Marker tip",
    steps: [
      { name: "Map the midnight visitor", text: "Use pale construction to place one tapered can, its oval rim, the raccoon head, two ears, two paw ovals, one curled tail route, face axes, two handles, four rib routes, one diamond dent, two accent blocks, one tall highlight, and a broken shadow footprint.", tip: "Ghost the can rim and head circle before touching down, then compare their widths. Reserve the head, both paws, and full tail route now so the rim and ribs can stop around them instead of becoming lines you must erase later." },
      { name: "Wrap the peeking silhouette", text: "Add a loose contour for the open trash can, raccoon head, exactly two ears, exactly two paws gripping the rim, and one thick curled tail while preserving every face, hardware, rib, accent, highlight, and shadow route.", tip: "Pull the cheek tufts outward in a few broad points rather than tiny fur zigzags. Keep the back rim hidden behind the head, stop the front rim at both paws, and let the tail cross only the lower-right can area you reserved." },
      { name: "Fit the paws tail and can", text: "Clarify the doubled rim, bottom band, exactly two handles, exactly four long ribs, rounded muzzle, both gripping paws, and the thick tail on the reserved construction.", tip: "Draw the paws before the front rim so their fingers sit on top, then rotate the page for the four long ribs. Stop every rib at the rim, paws, tail, or bottom band instead of drawing through an overlap." },
      { name: "Place the mask and tail bands", text: "Add two asymmetric mask patches, two empty eye openings, one raised-brow route, the dark nose, a crooked grin with one small tooth, cheek-tuft guides, and exactly three unfilled tail-band guides.", tip: "Keep the two eye openings visibly different: one flatter and one rounder. Space the three tail bands around the curve, and trace the crooked grin in one relaxed pass so the expression feels sly rather than symmetrical." },
      { name: "Aim the side-eye and can details", text: "Add both pupils glancing toward the page's right, keep one eye half-lidded and the other wider, clarify the raised brow and cheek tufts, then place one diamond dent, two accent blocks, one tall highlight, and the broken shadow.", tip: "Place both pupils before darkening either one and compare their direction across the nose. Keep the tall highlight open, the two accent blocks separate, and the shadow outside the can and tail silhouettes." },
      { name: "Ink the sneaky keeper drawing", text: "Trace only the established raccoon, can, expression, three tail bands, four ribs, dent, accents, highlight, and shadow with thick, slightly wobbly black felt-tip, then add restrained fur and metal hatching.", tip: "Ink the pupils, mask edges, fingers, and tail bands first, let them dry, then rotate the page for the long can contour and ribs. Use the heaviest line on the outside silhouette and lighter hatching inside." },
      { name: "Fill the alley-night color", text: "Fill the established fur cool gray, masks and three tail bands charcoal, can teal, ear interiors coral, two accent blocks mustard, and shadow deep navy while preserving the tall paper highlight and visible marker streaks.", tip: "Pull teal strokes vertically with the can ribs and gray strokes outward through the cheek fur. Let adjacent fills dry before they touch, and work around the eye whites, tooth, and can highlight instead of covering them." },
      { name: "Lock in the midnight mischief", text: "Thicken selected established black edges, even the same marker fills, deepen the existing fur hatching and shadow, sharpen the tall highlight, and remove only pale guides that distract.", tip: "Count two ears, two eyes, two paws, one tooth, three tail bands, two handles, four ribs, two accent blocks, one dent, and one shadow before stopping. Change the can color or expression in your own version, but keep the overlap order and handmade grain.", image: true }
    ]
  },
  {
    slug: "root-beer-float-with-straw",
    day: "093",
    date: "Thursday, August 6",
    isoDate: "2026-08-06",
    subject: "a root beer float with a striped straw",
    headlineSubject: "a root beer float<br>with a striped straw",
    shortSubject: "a root beer float",
    lessonTitle: "Let's draw a root beer float with a striped straw",
    description: "Learn how to draw a root beer float with a handled glass mug, one vanilla scoop, foamy cap, striped straw, three bubbles, glass highlights, thick felt-tip outlines, and retro marker color.",
    intro: "Build one face-free root beer float around a chunky glass mug, reserve one large vanilla scoop and foamy cap above the drink, then fit the striped straw, bubbles, glass highlights, and shadow before the heavy marker pass. Earthy brown, cream, aqua, and red turn the 20-minute drawing into a cheerful soda-fountain doodle without polishing away the felt-tip grain.",
    time: 20,
    difficulty: "Intermediate",
    accent: "#8a4a25",
    finished: "root-beer-float-with-straw-finished-v1.jpg",
    finishedAlt: "Handmade face-free felt-tip marker drawing of one root beer float in a three-quarter handled glass mug with one dark root-beer fill, exactly one large vanilla scoop, one irregular foamy cap, exactly one diagonal striped muted-aqua-and-red straw, exactly three small bubbles inside the drink, exactly two open-paper glass highlights, one clear side handle, a heavy glass base, thick imperfect black outlines, visible marker streaks, and one broken cool-gray ground shadow",
    materials: ["Pencil", "Drawing paper", "Black felt-tip marker", "Root-beer brown, cream, muted-aqua, red, and cool-gray markers"],
    materialNote: "Use pencil to place the complete mug, handle, drink line, scoop, foam, straw, three bubbles, two highlights, and shadow first. Let the black outline dry before filling the brown, cream, aqua, red, and gray marker areas, and keep the glass highlights as open paper.",
    tipLabel: "Marker tip",
    steps: [
      { name: "Map the float in the mug", text: "Use pale construction to place one thick glass mug, its side handle, root-beer level, one large scoop circle, irregular foam cap, one diagonal straw route, exactly three bubbles, two glass highlights, and one broken shadow footprint.", tip: "Ghost the mug envelope and scoop before touching down, then compare their widths. Reserve the scoop and handle now so the drink, foam, and far mug wall stop cleanly instead of becoming lines you must erase later." },
      { name: "Shape the frosty mug", text: "Wrap the guides with one sturdy three-quarter mug, thick inner rim, tapered sides, heavy base, one clear handle, and the root-beer plane while preserving every scoop, foam, straw, bubble, highlight, and shadow route.", tip: "Draw the near mug wall first, then use its slope to aim the far wall. Keep the inner and outer handle curves parallel, and trace the root-beer level with your finger so it stops around the reserved scoop and glass edges." },
      { name: "Float the scoop and fizz", text: "Clarify exactly one large vanilla scoop, one irregular foam cap, one striped straw, exactly three bubbles inside the drink, two open-paper glass highlights, and the established broken shadow.", tip: "Vary the foam lobes around the scoop instead of making a perfect cloud. Keep all three bubbles inside the dark drink, and let the straw disappear only behind the scoop edge you reserved in the first panel." },
      { name: "Ink the soda-fountain lines", text: "Trace only the established mug, handle, drink, scoop, foam, straw, three bubbles, two highlights, and shadow with thick, slightly wobbly black felt-tip, then add sparse foam and glass hatching.", tip: "Ink the bubbles and straw stripes first, let them dry, then rotate the page for the large mug curves. Give the outside silhouette the heaviest line and keep the glass and foam hatching lighter." },
      { name: "Pour in the retro color", text: "Fill the established drink root-beer brown, scoop and foam cream, straw muted aqua and red, and glass edges plus shadow cool gray while preserving visible marker streaks and both paper highlights.", tip: "Pull the brown strokes vertically through the mug and work around every bubble and highlight. Let adjoining fills dry before they touch, and use one extra cream pass only where the scoop turns away from the light." },
      { name: "Frost the float finish", text: "Thicken selected established black edges, even the existing fills, deepen the same foam hatching and shadow, sharpen both highlight gaps, and remove only pale guides that distract.", tip: "Count one mug, one handle, one scoop, one foam cap, one straw, three bubbles, two highlights, and one shadow before stopping. Change the soda-fountain colors if you like, but keep the same overlaps and handmade marker grain.", image: true }
    ]
  },
  {
    slug: "retro-perfume-bottle-with-atomizer",
    day: "001",
    date: "Wednesday, May 6",
    isoDate: "2026-05-06",
    subject: "a retro perfume bottle with an atomizer",
    headlineSubject: "a retro perfume bottle<br>with an atomizer",
    shortSubject: "a perfume bottle with an atomizer",
    lessonTitle: "Let's draw a retro perfume bottle with an atomizer",
    description: "Learn how to draw a retro perfume bottle with a faceted glass body, blank oval label, stepped stopper, curved atomizer hose, ribbed squeeze bulb, thick felt-tip outlines, and saturated marker color.",
    intro: "Build one face-free perfume atomizer around a squat faceted bottle, reserve its blank oval label, and connect one curved hose to a ribbed squeeze bulb before the heavy marker pass. This honest archive lesson is a newly made 25-minute study in glass facets, hardware overlap, and saturated felt-tip texture—not a claim about earlier visitors, comments, activity, or popularity.",
    time: 25,
    difficulty: "Intermediate",
    accent: "#e83a6f",
    finished: "retro-perfume-bottle-with-atomizer-finished-v1.jpg",
    finishedAlt: "Handmade face-free felt-tip marker drawing of one retro perfume atomizer in a three-quarter view with one squat raspberry faceted bottle, one blank teal oval label, one short neck, one mustard stepped stopper, exactly one curved deep-navy hose, exactly one ribbed mustard squeeze bulb, one broad white bottle highlight, small paper-white glints, thick imperfect black outlines, visible marker streaks, and one broken deep-navy ground shadow",
    materials: ["Pencil", "Drawing paper", "Black felt-tip marker", "Raspberry, teal, mustard, and deep-navy markers"],
    materialNote: "Use pencil to place the complete bottle, blank label, neck, stopper, hose, bulb, facets, highlights, and shadow first. Let the black outline dry before filling the raspberry, teal, mustard, and navy marker areas, and keep the white reflection gaps as open paper.",
    tipLabel: "Marker tip",
    steps: [
      { name: "Map the atomizer", text: "Use pale construction to place one squat faceted bottle, the blank oval label, short neck, stepped stopper, complete C-curved hose, ribbed squeeze bulb, bottle highlights, facet routes, and broken shadow footprint.", tip: "Ghost the bottle envelope and bulb before touching down, then compare their heights. Reserve the label and hose path now so the facet lines stop around the oval and the hose can begin behind the stopper instead of crossing the bottle later." },
      { name: "Shape the perfume bottle", text: "Wrap the guides with one broad glass silhouette, its shoulder and side facets, one blank oval label, one short neck, and one stepped stopper while preserving every hose, bulb, highlight, and shadow route.", tip: "Pull the outer glass edges as slightly uneven straight segments and keep the bottle base broad enough to feel stable. Leave the label completely blank and trace the neck into the shoulder with your finger before darkening either overlap." },
      { name: "Connect the squeeze bulb", text: "Clarify exactly one curved hose, one ribbed squeeze bulb, the established facet breaks, the open-paper reflection shapes, and the broken shadow on their reserved routes.", tip: "Keep both sides of the hose parallel through the bend, then taper the small connector into the bulb. Space the bulb ribs around its rounded form, and stop the shadow at both silhouettes so it never becomes a line through the object." },
      { name: "Ink the vintage contours", text: "Trace only the established bottle, blank label, stopper, hose, bulb, facets, reflections, and shadow with thick, slightly wobbly black felt-tip.", tip: "Ink the small stopper and bulb ribs first, let them dry, then rotate the page for the bottle and hose. Give the outside silhouette the heaviest line and keep the facets lighter so the glass remains readable." },
      { name: "Add the retro marker palette", text: "Fill the established bottle raspberry, blank label teal, stopper and bulb mustard, and hose plus broken shadow deep navy while preserving visible marker streaks and the open-paper highlights.", tip: "Pull raspberry strokes along each glass facet and mustard strokes around the bulb ribs. Let neighboring areas dry before they touch, and leave the white reflection shapes open instead of polishing the marker grain flat." },
      { name: "Polish the atomizer", text: "Thicken selected established black edges, even the existing fills, sharpen the same reflection gaps, deepen the established shadow, and erase only pale guides that distract.", tip: "Count one bottle, one blank label, one stopper, one hose, one squeeze bulb, and one shadow before stopping. Change the perfume colors if you like, but keep the face-free hardware, overlap order, and handmade marker texture clear.", image: true }
    ]
  },
  {
    slug: "cartoon-oyster-with-pearl",
    day: "092",
    date: "Wednesday, August 5",
    isoDate: "2026-08-05",
    subject: "an oyster with a pearl",
    headlineSubject: "an oyster<br>with a pearl",
    shortSubject: "an oyster with a pearl",
    lessonTitle: "Let's draw an oyster with a pearl",
    description: "Learn how to draw an open oyster with two hinged shell halves, one large pearl, a scalloped inner lip, broad radiating ribs, thick felt-tip outlines, visible marker grain, and a bright tide-pool palette.",
    intro: "Open one face-free oyster around a raised fan shell and cupped lower half, reserve one large pearl in the center, and build the hinge, scalloped lip, and radiating ribs before the heavy marker pass. Seafoam, coral, navy, and soft gray turn the 20-minute drawing into a bold tide-pool study without adding a sticker border or glossy finish.",
    time: 20,
    difficulty: "Challenge",
    accent: "#159d91",
    finished: "cartoon-oyster-with-pearl-finished-v1.jpg",
    finishedAlt: "Handmade face-free felt-tip marker drawing of one open oyster in a three-quarter view with exactly two hinged shell halves, one raised seafoam fan shell, one cupped seafoam lower shell, one dark navy hinge, exactly one large pearl-gray pearl seated in the center, one coral scalloped inner lip, one muted-gray lower shell bed, broad radiating ribs, one thin white crescent highlight on the pearl, one thin white highlight along the upper rim, thick imperfect black outlines, visible marker streaks, and one broken deep-navy ground shadow",
    materials: ["Pencil", "Drawing paper", "Black felt-tip marker", "Seafoam, coral, deep-navy, and gray markers"],
    materialNote: "Use pencil to place both shell halves, the hinge, pearl, inner lip, rib routes, two narrow highlights, and shadow first. Let the black outline dry before filling the seafoam, coral, navy, and gray marker areas, and keep the highlight gaps as open paper.",
    tipLabel: "Marker tip",
    steps: [
      { name: "Map the open shell", text: "Use pale construction to place exactly two hinged shell envelopes, the small hinge, one large pearl circle, the scalloped inner lip, broad rib routes, one narrow pearl highlight, one narrow upper-rim highlight, and one broken shadow footprint.", tip: "Ghost the raised fan and lower cup before touching down, then compare their widths around the hinge. Reserve the pearl circle now so every lower-shell rib and lip line stops around it instead of becoming a keeper line you must erase later." },
      { name: "Shape the hinged shell", text: "Wrap the guides with one raised upper shell, one cupped lower shell, one hinge, and one scalloped inner lip while preserving the pearl, rib, narrow-highlight, and shadow routes.", tip: "Rotate the page for the broad scalloped edges and let the lower half flatten slightly in perspective. Keep the upper shell attached at the dark hinge, and compare the open wedge behind the pearl so the oyster does not look pasted together." },
      { name: "Seat the pearl and ribs", text: "Clarify exactly one round pearl, the broad radiating rib rhythm on both shell halves, one narrow pearl highlight, one narrow upper-rim highlight, and the established broken shadow.", tip: "Draw a few main rib directions first, then fill the larger gaps with shorter lines. Stop every lower rib at the reserved pearl circle, and keep both highlights slender so they read as shine rather than a pair of eyes." },
      { name: "Ink the tidal contours", text: "Trace only the established shell halves, hinge, lip, pearl, ribs, highlights, and shadow with thick, slightly wobbly black felt-tip, then add sparse short hatching along the existing ribs.", tip: "Ink the hinge and pearl first, let them dry, then rotate the page for the large shell curves. Give the outside silhouette the heaviest line and keep the interior ribs lighter so the open shell retains depth." },
      { name: "Fill the tide-pool palette", text: "Fill the established shell seafoam, inner lip coral, hinge and shadow deep navy, and the pearl plus lower shell bed softly gray while preserving visible marker streaks and both narrow paper highlights.", tip: "Pull the seafoam strokes outward along the ribs and the coral strokes around the scalloped lip. Let each area dry before filling beside it, and use one extra gray pass only along the pearl's lower edge so it stays round." },
      { name: "Polish the hidden pearl", text: "Thicken selected established black edges, even the existing fills, deepen the rib hatching and shadow, sharpen the same two narrow highlights, and erase only pale guides that distract.", tip: "Count two shell halves, one hinge, one pearl, one lip, and one shadow before stopping. Change the tide-pool colors if you like, but keep the same face-free opening, centered pearl, and handmade marker grain.", image: true }
    ]
  },
  {
    slug: "cartoon-saxophone-with-music-notes",
    day: "002",
    date: "Thursday, May 7",
    isoDate: "2026-05-07",
    subject: "a cartoon saxophone with music notes",
    headlineSubject: "a cartoon saxophone<br>with music notes",
    shortSubject: "a cartoon saxophone",
    lessonTitle: "Let's draw a cartoon saxophone with music notes",
    description: "Learn how to draw a cartoon saxophone with a flared bell, curved brass body, dark mouthpiece, seven colored key pads, three key rods, two music notes, two sound arcs, bold outlines, and textured marker color.",
    intro: "Swing one face-free cartoon saxophone around a broad bell and rising J-curve, then place seven colored key pads, three rod routes, two music notes, and two sound arcs before adding warm brass marker. This honest archive lesson is a newly made 25-minute study in curved instrument shapes, hardware rhythm, and bold felt-tip overlap—not a claim about earlier visitors, comments, activity, or popularity.",
    time: 25,
    difficulty: "Challenge",
    accent: "#d59616",
    finished: "cartoon-saxophone-with-music-notes-finished-v2.jpg",
    finishedAlt: "Handmade face-free felt-tip marker drawing of one warm mustard-and-ochre cartoon saxophone with one broad flared bell, one curved body and bent neck, one deep-navy mouthpiece, exactly seven round key pads alternating teal and coral, three long key rods, one small strap loop, exactly two coral music notes, exactly two coral sound arcs, three white paper highlights, thick imperfect black outlines, visible marker grain, and one broken deep-navy shadow",
    materials: ["Pencil", "Drawing paper", "Black felt-tip marker", "Mustard, ochre, deep-navy, teal, and coral markers"],
    materialNote: "Keep the first five stages light in pencil: raw guides, rough silhouette, refined structure, seven pad circles, then the hardware and sound marks. Ink the complete keeper drawing only after every element is placed; let the black line dry before adding marker fills.",
    tipLabel: "Marker tip",
    steps: [
      { name: "Gesture the bell and J curve", text: "Begin with only pale construction: tilt one large ellipse for the bell, sweep a long J-shaped centerline through the body, add a few tube-width cross guides, raise the neck axis, and cap it with a small mouthpiece wedge.", tip: "This stage should still look like a diagram, not a saxophone. Ghost the J curve before touching down, keep the bell ellipse wider than the neck, and leave out every key, note, reflection, shadow, and decorative mark." },
      { name: "Wrap the rough saxophone silhouette", text: "Draw a loose outer contour around the guides to form the flared bell, rounded lower bow, rising body tube, bent neck, and tapered mouthpiece while leaving the blue construction visible.", tip: "Work from the bell down through the bow and back up the neck. Keep the tube thickness fairly even, and use the cross guides to stop the two sides from pinching together." },
      { name: "Refine the bell and neck structure", text: "Clarify the bell with a doubled rim, define the lower bow seam, add two narrow neck collars, sharpen the mouthpiece planes, and sketch one pale curved guide for the later key rhythm.", tip: "Treat the bell rim as two nested ellipses and make the collar bands follow the neck's bend. Do not add key circles yet—the curved guide is enough to reserve their path." },
      { name: "Place seven key pads", text: "Space exactly seven unfilled circles along the curved key guide, stepping them from the upper tube toward the lower bow, then add the small strap loop on the outside edge.", tip: "Place the top and bottom pads first, divide the gap with five more, and count all seven before moving on. Keep every circle open so color remains a later, clearly visible step." },
      { name: "Connect the keys and sound marks", text: "Join the pads with three long rod routes, short connector arms, and small caps. Add exactly two music notes, two sound arcs, three open-paper highlight shapes, and a light broken shadow beneath the saxophone.", tip: "Stop every connector at a pad or body edge instead of drawing through it. Keep the notes separate above the bell and let the shadow follow the instrument's footprint without becoming a solid block." },
      { name: "Ink the complete keeper drawing", text: "Trace the established silhouette, seven pads, rods, loop, notes, arcs, highlights, and shadow with thick imperfect black felt-tip, then add restrained hatching inside the bell and hardware.", tip: "Ink small pads and connector arms first, then rotate the page for the long outside contour. Use the heaviest line on the silhouette and lighter hatching inside so the hardware stays readable." },
      { name: "Fill the brass and bright accents", text: "Fill the saxophone with mustard and ochre, alternate teal and coral across all seven pads, color the two notes and arcs coral, and add deep navy to the mouthpiece and broken shadow while preserving the three highlights.", tip: "Let the black outline dry, then follow the tube's curve with visible marker strokes. Work around every pad and white highlight instead of painting through them, and resist over-layering the handmade grain." },
      { name: "Tune the final marker rhythm", text: "Thicken selected established black edges, even the existing fills, deepen the existing bell hatching and broken shadow, clarify the same three highlights, and erase only pale guides that distract.", tip: "Count seven key pads, three rod routes, two notes, and two sound arcs before stopping. The final pass should polish what is already present—it should not add new hardware, decoration, or color areas.", image: true }
    ]
  },
  {
    slug: "hot-air-balloon-with-clouds",
    day: "091",
    date: "Tuesday, August 4",
    isoDate: "2026-08-04",
    subject: "a hot-air balloon",
    headlineSubject: "a hot-air<br>balloon",
    shortSubject: "a hot-air balloon",
    lessonTitle: "Let's draw a hot-air balloon",
    description: "Learn how to draw a hot-air balloon with a scalloped envelope, five bright marker bands, two suspension ropes, two burners, a woven basket, three clouds, and bold handmade outlines.",
    intro: "Build one face-free hot-air balloon around a broad scalloped envelope, divide it into five colorful bands, and connect the neck, burner frame, and basket before the heavy black-marker pass. Three loose cloud wisps and visible fill streaks keep the 20-minute doodle playful without turning it into polished travel art.",
    time: 20,
    difficulty: "Intermediate",
    accent: "#168d93",
    finished: "hot-air-balloon-with-clouds-finished-v1.jpg",
    finishedAlt: "Handmade felt-tip marker drawing of one face-free hot-air balloon with one scalloped envelope divided by exactly four curved seams into five broad raspberry, mustard, teal, cobalt, and raspberry bands, one narrow neck, exactly two suspension ropes, exactly two small mustard burner shapes, one rectangular warm-brown woven basket, two open white paper highlight gaps, exactly three pale-cobalt cloud wisps, thick imperfect black outlines, and visible marker streaks",
    materials: ["Pencil", "Drawing paper", "Black felt-tip marker", "Raspberry, mustard, teal, cobalt, pale-blue, and warm-brown markers"],
    materialNote: "Use pencil to place the complete envelope, four seams, neck, both ropes, both burners, basket, highlights, and three clouds first. Let the black outline dry before filling the saturated balloon bands and basket.",
    tipLabel: "Marker tip",
    steps: [
      { name: "Map the balloon flight", text: "Use pale construction to place the broad envelope, exactly four curved seam routes, narrow neck, two suspension ropes, two burners, rectangular basket, two highlight gaps, and exactly three cloud wisps.", tip: "Ghost the outside curve twice before touching down, then compare the five band widths around the center line. Reserve the highlight gaps and basket-rim overlap now so later seams and ropes stop cleanly." },
      { name: "Shape the envelope and basket", text: "Wrap the guides with one gently scalloped balloon envelope, narrow neck, and rectangular basket while preserving every seam, rope, burner, highlight, and cloud route.", tip: "Rotate the page for each long envelope side and keep the center band widest. Check the negative space between neck and basket so the burner frame stays tall enough to read." },
      { name: "Connect the flight details", text: "Clarify exactly four panel seams, two suspension ropes, two burner shapes, two open-paper highlights, and three separate cloud wisps on their reserved routes.", tip: "Pull each seam from crown to neck in one confident pass and stop it at the highlight gaps. Keep the clouds uneven and loose, but make sure none touches or crosses the balloon silhouette." },
      { name: "Ink the floating silhouette", text: "Trace only the established envelope, seams, neck, ropes, burners, basket, highlights, and clouds with thick imperfect black felt-tip, then add short cross-hatching inside the basket.", tip: "Ink the small burner and basket details first, let them dry, then rotate the page for the long outside contour. Give the envelope the heaviest line and keep the cloud outlines a little lighter." },
      { name: "Fill the sky-bright palette", text: "Fill the five established balloon bands raspberry, mustard, teal, cobalt, and raspberry; color the basket warm brown, burners mustard, and three clouds pale blue while preserving both white highlights.", tip: "Fill from each black edge toward the center so the marker streaks follow the balloon's vertical lift. Let one area dry before coloring beside it, and leave the visible grain instead of flattening it with too many passes." },
      { name: "Lift the final marker lines", text: "Thicken selected established black edges, even the existing marker fills, sharpen both highlight gaps, deepen the basket hatching, and erase only pale guides that distract.", tip: "Count five color bands, two ropes, two burners, one basket, two highlights, and three clouds before stopping. Change the palette if you like, but keep the face-free flight structure and broad handmade bands clear.", image: true }
    ]
  },
  {
    slug: "cartoon-boxing-glove",
    day: "003",
    date: "Friday, May 8",
    isoDate: "2026-05-08",
    subject: "a cartoon boxing glove",
    headlineSubject: "a cartoon<br>boxing glove",
    shortSubject: "a cartoon boxing glove",
    lessonTitle: "Let's draw a cartoon boxing glove",
    description: "Learn how to draw a cartoon boxing glove with a rounded knuckle mass, curled thumb, wide cuff, blank patch, curved seam, three knuckle creases, three motion dashes, thick felt-tip outlines, and punchy marker color.",
    intro: "Aim one puffy boxing glove toward the upper right, shape its curled thumb and wide cuff, then add a curved palm seam, three creases, and three motion dashes before the bold marker pass. This honest archive lesson is a newly made 20-minute study in cartoon silhouette, overlap, and energetic line weight—not a claim about earlier visitors, comments, activity, or popularity.",
    time: 20,
    difficulty: "Easy-medium",
    accent: "#df382a",
    finished: "cartoon-boxing-glove-finished-v1.jpg",
    finishedAlt: "Handmade felt-tip marker drawing of one face-free tomato-red cartoon boxing glove punching toward the upper right with one large rounded knuckle mass, one curled burgundy thumb, exactly three short black knuckle creases, one curved palm seam, one narrow wrist, one wide red cuff, one blank mustard cuff patch, exactly three short mustard motion dashes, white paper highlights, and one broken deep-navy cast shadow",
    materials: ["Pencil", "Drawing paper", "Black felt-tip marker", "Tomato-red, burgundy, mustard, and deep-navy markers"],
    materialNote: "Use pencil to place the complete glove, thumb, wrist, cuff, blank patch, seam, three creases, three motion dashes, and shadow first. Let the black outline dry before filling the red, burgundy, mustard, and navy marker areas.",
    tipLabel: "Marker tip",
    steps: [
      { name: "Block the punch angle", text: "Use pale construction to place the tilted knuckle mass, curled thumb, narrow wrist, wide cuff, blank patch, curved palm seam, three knuckle creases, exactly three motion dashes, and broken shadow.", tip: "Ghost the big mitten-like envelope before touching down, then reserve the thumb and cuff overlaps. The palm seam should stop at the thumb, the wrist edges should stop at the cuff, and all three dashes should stay outside the glove." },
      { name: "Shape the glove silhouette", text: "Wrap the guides with one puffy boxing-glove contour, curled thumb, narrow wrist, and wide cuff while preserving the patch, seam, crease, motion, and shadow routes.", tip: "Pull the outer knuckle curve in one relaxed pass and keep a small pinch where the thumb joins the palm. Check the open space around the cuff so the diagonal angle stays lively rather than upright." },
      { name: "Add seams and motion", text: "Clarify the curved palm seam, exactly three short knuckle creases, one blank cuff patch, and exactly three short motion dashes without changing the glove silhouette.", tip: "Curve the palm seam around the thumb base and vary the three crease lengths. Keep the motion dashes parallel enough to suggest one direction but uneven enough to feel hand drawn." },
      { name: "Ink the impact contour", text: "Trace only the established glove, thumb, cuff, blank patch, seam, three creases, three motion dashes, and broken shadow with thick handmade black felt-tip.", tip: "Ink the inner thumb and seam first, let them dry, then pull the heavy outer contour. Use slightly lighter pressure on the creases and dashes so the glove silhouette remains dominant at thumbnail size." },
      { name: "Fill the boxing red", text: "Add tomato red to the glove, burgundy to the thumb underside and seam areas, mustard to the blank cuff patch and three motion dashes, and deep navy to the broken shadow.", tip: "Fill inward from the black edges and follow the rounded knuckle form with visible marker strokes. Leave broad white paper highlights on the upper glove and a smaller highlight on the thumb instead of polishing the fill flat." },
      { name: "Tighten the knockout finish", text: "Thicken selected established black edges, even the existing marker fills, deepen the broken shadow, clarify paper highlights, and erase only pale guides that distract.", tip: "Count one glove, one thumb, three knuckle creases, one blank cuff patch, and three motion dashes before stopping. Change the glove color if you like, but keep the face-free silhouette and clean overlap order.", image: true }
    ]
  },
  {
    slug: "retro-handheld-game-console",
    day: "090",
    date: "Monday, August 3",
    isoDate: "2026-08-03",
    subject: "a retro handheld game console",
    headlineSubject: "a retro handheld<br>game console",
    shortSubject: "a handheld game console",
    lessonTitle: "Let's draw a retro handheld game console",
    description: "Learn how to draw a retro handheld game console with a chunky three-quarter shell, blank inset screen, D-pad, two action buttons, two menu buttons, four speaker slots, power light, bold outlines, and bright marker color.",
    intro: "Tilt a chunky handheld console into a gentle three-quarter view, inset a blank screen, and balance one D-pad against two round action buttons before adding the tiny menu controls, speaker slots, and power light. Cobalt blue, raspberry, mustard, and deep teal turn the 20-minute construction exercise into a lively face-free marker doodle.",
    time: 20,
    difficulty: "Challenge",
    accent: "#2e61c7",
    finished: "retro-handheld-game-console-finished-v1.jpg",
    finishedAlt: "Handmade felt-tip marker drawing of one face-free cobalt-blue retro handheld game console in a chunky three-quarter view with one blank deep-teal inset screen, two diagonal screen highlights, one mustard D-pad, exactly two raspberry action buttons, exactly two small menu buttons, exactly four black speaker slots, one small power light, warm-gray side planes, thick black outlines, white paper highlights, and one broken deep-teal cast shadow",
    materials: ["Pencil", "Drawing paper", "Black felt-tip marker", "Cobalt-blue, raspberry, mustard, deep-teal, and warm-gray markers"],
    materialNote: "Use pencil to place the complete shell, blank screen, D-pad, both action buttons, both menu buttons, four speaker slots, power light, and shadow. Let the black felt-tip dry before filling the cobalt, raspberry, mustard, teal, and warm-gray marker areas.",
    tipLabel: "Marker tip",
    steps: [
      { name: "Set the console perspective", text: "Draw one pale tilted center axis and a loose rounded front-face envelope, then place the blank-screen footprint, right-side thickness offset, D-pad center, exactly two action-button centers, two menu-button centers, a four-slot speaker baseline, one power-light center, and the broken shadow footprint. Keep this map sparse.", tip: "Ghost the console's long diagonals before touching down, then compare the empty margins around the screen. Use tiny centers and ticks for the hardware so this frame plans the layout without prematurely drawing the finished controls." },
      { name: "Build the shell and screen", text: "Wrap the map with the complete rounded three-quarter shell, visible right-side thickness plane, and raised blank-screen bezel. Keep the D-pad, buttons, speaker, power light, highlights, and shadow as pale placement marks for now.", tip: "Pull each long shell edge from the shoulder and rotate the page for the rounded corners. Keep opposite screen edges in the same perspective family, then trace the outer shell and bezel with your finger before adding any hardware." },
      { name: "Install the controls and hardware", text: "Complete one D-pad, exactly two round action buttons, two small horizontal menu buttons, four short speaker slots, one power light, two diagonal blank-screen highlights, and the broken shadow outline in refined pencil.", tip: "Build the D-pad from two crossing rounded bars and compare the action-button gaps. Count two menu buttons and four parallel speaker slots, then confirm every shape is present before reaching for the black marker." },
      { name: "Ink the hardware rhythm", text: "Trace only the established shell, bezel, controls, speaker slots, power light, screen highlights, and broken shadow with thick handmade black felt-tip.", tip: "Ink the small controls before the long outside contour and let each area dry before rotating the page. Give the shell the heaviest line, the screen bezel medium weight, and the tiny controls a lighter touch." },
      { name: "Fill the retro palette", text: "Add cobalt blue to the shell, raspberry to both action buttons, mustard to the D-pad, deep teal to the blank screen and shadow, and warm gray to the side planes while preserving paper highlights.", tip: "Pull blue strokes along each shell plane and fill inward from the outlines to limit bleeding. Keep the two screen highlights uncolored and let a little marker grain show instead of polishing every area flat." },
      { name: "Power up the final lines", text: "Thicken selected established edges, even the existing marker fills, deepen the broken shadow, clarify the screen highlights, and erase only pale guides that distract.", tip: "Count one D-pad, two action buttons, two menu buttons, four speaker slots, and one power light before stopping. Change the palette if you like, but keep the face-free hardware arrangement and blank screen easy to read.", image: true }
    ]
  },
  {
    slug: "high-top-sneaker-with-loose-laces",
    day: "004",
    date: "Saturday, May 9",
    isoDate: "2026-05-09",
    subject: "a high-top sneaker with loose laces",
    headlineSubject: "a high-top sneaker<br>with loose laces",
    shortSubject: "a high-top sneaker",
    lessonTitle: "Let's draw a high-top sneaker with loose laces",
    description: "Learn how to draw a high-top sneaker with a three-quarter canvas shape, rounded toe cap, thick sole, six visible eyelets, crisscross laces, two loose ends, seams, tread notches, and bold marker color.",
    intro: "Lean one high-top sneaker into a three-quarter side view, reserve the tongue and lace footprint, and thread six visible eyelets before tracing the canvas, rubber sole, and two loose ends in black felt-tip. This honest archive lesson is a newly made study in lace overlap, shoe construction, and directional marker texture—not a claim about earlier visitors, comments, activity, or popularity.",
    time: 20,
    difficulty: "Intermediate",
    accent: "#376348",
    finished: "high-top-sneaker-with-loose-laces-finished-v1.jpg",
    finishedAlt: "Handmade felt-tip marker drawing of one face-free forest-green high-top canvas sneaker in a three-quarter side view with one tall ankle collar, one rust-orange lining, one green tongue, exactly six visible metal eyelets, one cream crisscross lace path, exactly two loose lace ends above a cream rubber toe cap, one curved side seam, one heel seam, one cream sole with one black stripe and exactly four tread notches, white paper highlights, and one broken navy marker shadow",
    materials: ["Pencil", "Drawing paper", "Black felt-tip marker", "Forest-green, cream, rust-orange, and muted-navy markers"],
    materialNote: "Use pencil for the complete sneaker, tongue, six eyelets, lace path, two ends, seams, sole stripe, four tread notches, and shadow. Let the black outline dry before filling the forest-green canvas and lighter rubber areas.",
    tipLabel: "Marker tip",
    steps: [
      { name: "Block the high-top angle", text: "Use pale construction to place the sole baseline, foot box, high ankle envelope, tongue footprint, rounded toe-cap curve, six visible eyelet positions, crisscross lace route, two loose-end routes, seams, stripe, four tread notches, and broken shadow.", tip: "Ghost the sole angle first, then compare the open paper above the toe with the space behind the ankle. Reserve the tongue and lace footprint now so you never finish canvas seams underneath the crossing laces." },
      { name: "Shape the canvas and sole", text: "Wrap the guides with one rounded toe cap, thick sole, heel, high ankle collar, and tongue while keeping the eyelet, lace, seam, stripe, tread, and shadow routes pale and visible.", tip: "Pull the sole edges in long relaxed passes and let the ankle lean slightly forward. Check the negative space between tongue and collar so the opening reads as depth instead of a flat line." },
      { name: "Thread the loose laces", text: "Add exactly six visible eyelets, one crisscross lace path, exactly two loose ends, the curved side and heel seams, one sole stripe, and exactly four tread notches in light line.", tip: "Work from the top eyelet downward and alternate the crossing direction at each gap. Trace each lace from eyelet to eyelet with your finger before drawing so the two loose ends emerge from the route instead of appearing from nowhere." },
      { name: "Ink the shoe rhythm", text: "Trace only the established shoe, sole, tongue, six eyelets, crisscross laces, two ends, seams, stripe, tread notches, and broken shadow with thick handmade black felt-tip.", tip: "Ink the laces first where they sit on top, let them dry, then draw the tongue and canvas edges around them. Use heavier weight on the outside shoe contour and lighter pressure on stitching and sole details." },
      { name: "Fill the canvas color", text: "Add forest green to the canvas, cream to the toe cap, sole, and laces, rust orange to the lining, and muted navy to the shadow with visible directional marker strokes.", tip: "Pull green strokes along the ankle and toward the toe so the streaks describe the shoe form. Leave narrow paper gaps beside the black edges, and let the green dry before a second pass near seams." },
      { name: "Lace up the final lines", text: "Thicken selected established edges, even the existing marker fills, deepen the broken shadow, clarify paper highlights, and erase only the pale guides that distract.", tip: "Count six visible eyelets, two loose lace ends, one sole stripe, and four tread notches, then follow the entire lace path without a jump. Change the canvas color or lace looseness if you like while keeping the overlap order clear.", image: true }
    ]
  },
  {
    slug: "cartoon-submarine-with-bubbles",
    day: "089",
    date: "Sunday, August 2",
    isoDate: "2026-08-02",
    subject: "a cartoon submarine with bubbles",
    headlineSubject: "a cartoon submarine<br>with bubbles",
    shortSubject: "a cartoon submarine",
    lessonTitle: "Let's draw a cartoon submarine with bubbles",
    description: "Learn how to draw a cartoon submarine with a capsule hull, bent periscope, three portholes, six rivets, two tail fins, three-blade propeller, three bubbles, thick felt-tip outlines, and vintage marine marker color.",
    intro: "Tilt one rounded submarine gently upward, build its fins and propeller around a capsule hull, and place three portholes, six rivets, and three bubbles before the bold marker pass. Mustard, deep navy, rust orange, and seafoam make the 20-minute doodle lively without relying on a face or a candy-bright default palette.",
    time: 20,
    difficulty: "Intermediate",
    accent: "#d19b28",
    finished: "cartoon-submarine-with-bubbles-finished-v1.jpg",
    finishedAlt: "Handmade felt-tip marker drawing of one face-free mustard cartoon submarine in a slightly upward side view with one rounded capsule hull, small tower, bent mustard-and-navy periscope, exactly three navy portholes, exactly six navy rivets, exactly two rust-orange tail fins, one navy three-blade propeller, one rust-orange lower side fin, exactly three seafoam bubbles, white paper highlight gaps, and one broken seafoam water shadow",
    materials: ["Pencil", "Drawing paper", "Black felt-tip marker", "Mustard, deep-navy, rust-orange, and seafoam markers"],
    materialNote: "Use pencil to place the full submarine and every count first. Ink only established shapes, then let the black outline dry before adding the limited mustard, navy, rust, and seafoam marker fills.",
    tipLabel: "Marker tip",
    steps: [
      { name: "Set the dive gesture", text: "Draw one pale tilted centerline, wrap it with a loose capsule guide, then mark the small tower box, tail and fin axes, propeller hub, three porthole centers, three bubble centers, and broken shadow footprint. Keep this frame sparse—do not finish the submarine contour yet.", tip: "Ghost the capsule twice before touching down. Space the three window dots along the upper half, and keep the fin and propeller axes outside the hull guide so the attachments have room to grow." },
      { name: "Build the submarine body", text: "Use the map to draw the rounded hull, small tower, bent periscope, tapered tail housing, exactly two tail fins, one lower side fin, the hub plus three light propeller-blade gestures, and three light bubble circles. Leave the window, rivet, seam, and shadow details pale.", tip: "Draw the hull before the fins so each attachment tucks behind it. Rotate the page for the long curves, then trace the tower into the bent periscope with your finger to confirm one continuous route." },
      { name: "Install windows and hardware", text: "Complete exactly three porthole rings, one hull seam, exactly six rivets, the three propeller blades, the three existing bubble guides, and the broken shadow outline in refined pencil. Every shape that the next step inks should now be visible.", tip: "Compare the three porthole gaps rather than chasing perfect circles. Count six rivets from tail to nose, then check three blades, three bubbles, two tail fins, and one lower fin before reaching for the marker." },
      { name: "Ink the dive lines", text: "Trace only the established hull, tower, periscope, fins, propeller, windows, seam, rivets, and bubbles with thick handmade black felt-tip, then reinforce the reserved broken water shadow.", tip: "Let the marker follow each long contour in one direction and pause at overlaps. Give the outer hull slightly more weight than the seam and rivets so the silhouette stays readable at thumbnail size." },
      { name: "Fill the vintage marine color", text: "Add mustard to the hull, deep navy to the windows and accents, rust orange to the fins, and seafoam to the bubbles and shadow, leaving intentional paper highlights.", tip: "Fill from each edge inward so the marker streaks follow the hull length and fin direction. Let the navy portholes dry before a second pass so their highlights stay crisp instead of bleeding shut." },
      { name: "Seal the submarine finish", text: "Thicken selected established black edges, even the existing marker areas, deepen the broken shadow, clarify highlight gaps, and erase only the pale guides that distract.", tip: "Count three portholes, six rivets, three bubbles, two tail fins, three propeller blades, and one lower fin. Try different ocean colors if you like, but keep the mechanical counts and overlaps easy to follow.", image: true }
    ]
  },
  {
    slug: "paint-roller-with-paint-swash",
    day: "005",
    date: "Sunday, May 10",
    isoDate: "2026-05-10",
    subject: "a paint roller with a paint swash",
    headlineSubject: "a paint roller<br>with a paint swash",
    shortSubject: "a paint roller",
    lessonTitle: "Let's draw a paint roller with a paint swash",
    description: "Learn how to draw a paint roller with a cylindrical cover, bent metal frame, tapered grip, broad paint swash, two drips, two droplets, bold outlines, and bright marker color.",
    intro: "Angle one paint roller across a broad swash, build its cover, bent frame, and tapered grip as a single connected tool, then lock two drips and two loose droplets into the paint shape before adding bold marker color. This honest archive lesson is a newly made exercise in cylinders, hardware overlaps, and wet-paint edges, not a claim about earlier visitors, comments, activity, or popularity.",
    time: 20,
    difficulty: "Easy",
    accent: "#f17722",
    finished: "paint-roller-with-paint-swash-finished-v1.jpg",
    finishedAlt: "Handmade face-free marker drawing of one paint roller angled from an upper-left tangerine cylindrical cover to a lower-right deep-navy tapered grip, with one bent cool-gray metal frame, one broad tangerine paint swash behind the roller, exactly two rounded lower-edge drips, exactly two detached orange droplets, one grip hole, one rectangular and one curved warm-paper highlight on the roller cover, thick imperfect black outlines, visible dry-marker streaks, and one shallow broken warm-gray oval shadow beneath the grip",
    materials: ["Pencil and eraser", "Drawing paper", "Black felt-tip marker", "Tangerine, deep-navy, cool-gray, and warm-gray markers"],
    materialNote: "Use pencil for the roller axis, cylindrical cover, bent frame, tapered grip, swash edge, two drips, two droplets, two cover highlights, grip hole, and broken shadow. Add black, tangerine, deep navy, cool gray, and warm gray only after every shape and count is established.",
    tipLabel: "Marker tip",
    steps: [
      { name: "Angle the roller guides", text: "Place a pale diagonal roller axis with two cylinder ends, a bent-frame route, and a tapered grip footprint, then reserve the broad swash, exactly two drips, two detached droplets, two cover highlights, grip hole, and shallow shadow.", tip: "Ghost the cylinder axis first and keep both end curves wrapped around it. Mark the paint edge and all four falling-paint shapes while the lines are light so the roller remains the focal point." },
      { name: "Build the roller silhouette", text: "Wrap the guides with one rounded roller cover, one bent metal frame with a clear axle overlap, one small ferrule, and one tapered grip with a hanging hole.", tip: "Draw the far end curve before the long cover edges, then stop the metal frame cleanly at the axle and ferrule. That broken overlap keeps the parts connected without looking transparent." },
      { name: "Shape the paint swash", text: "Clarify one broad paint swash behind the roller, exactly two rounded lower-edge drips, two detached droplets, one rectangular and one curved cover highlight, and one broken oval shadow.", tip: "Vary the swash edge with broad bumps instead of tiny fur-like wiggles. Count two attached drips and two detached drops before reaching for black marker." },
      { name: "Ink the roller and paint", text: "Thicken every established roller, frame, grip, swash, drip, droplet, highlight, and shadow boundary with imperfect black felt-tip lines.", tip: "Pull the cylinder edges and frame segments toward yourself, rotating the page at each bend. Leave both cover highlights open and let the wet-looking paint edge wobble more than the hard tool edges." },
      { name: "Roll on the color", text: "Fill the established roller cover, swash, two drips, and two droplets tangerine, the grip deep navy, the frame cool gray, and the shadow warm gray while preserving both paper highlights and visible marker streaks.", tip: "Use long horizontal strokes across the roller cover and swash, then let the tangerine dry before strengthening the black outline. Turn the page for the narrow gray frame so its fill stays inside the bends." },
      { name: "Finish the fresh coat", text: "Strengthen selected keeper outlines and clarify the established tangerine paint, roller hardware, navy grip, two drips, two droplets, two paper highlights, and broken shadow without adding another object or paint mark.", tip: "Count one roller, one swash, two attached drips, two detached drops, and two cover highlights, then stop while the marker grain shows. A hand, wall, paint can, face, logo, border, or extra tool would make a different lesson.", image: true }
    ]
  },
  {
    slug: "leafy-vine-flourish",
    day: "088",
    date: "Saturday, August 1",
    isoDate: "2026-08-01",
    subject: "a leafy vine flourish",
    headlineSubject: "a leafy vine<br>flourish",
    shortSubject: "a leafy vine flourish",
    lessonTitle: "Let's draw a leafy vine flourish",
    description: "Learn how to draw a leafy vine flourish with one sweeping S curve, eight alternating leaves, two curling tendrils, three berry accents, bold felt-tip outlines, and bright marker color.",
    intro: "Sweep one diagonal S curve across the page, alternate eight pointed leaves along its stem, then use two tendrils and three berry accents to turn the branch into a lively decorative flourish. The useful challenge is keeping the botanical rhythm clear while the thick black outlines, limited marker palette, and open paper gaps stay loose and handmade.",
    time: 15,
    difficulty: "Easy",
    accent: "#23836d",
    finished: "leafy-vine-flourish-finished-v1.jpg",
    finishedAlt: "Handmade face-free marker drawing of one diagonal S-curved leafy vine flourish with exactly eight alternating pointed leaves in deep jade and chartreuse, exactly two black curling tendrils, exactly three raspberry berry accents with white highlights, simple black leaf veins, two clusters of violet stem-shadow hatch marks, thick imperfect black felt-tip outlines, visible marker streaks, and open warm-paper gaps",
    materials: ["Pencil and eraser", "Drawing paper", "Black felt-tip marker", "Deep-jade, chartreuse, raspberry, and violet markers"],
    materialNote: "Use pencil to place the sweeping vine, eight leaf footprints, two tendrils, three berries, veins, and two small hatch clusters before the black marker pass. Add the limited jade, chartreuse, raspberry, and violet palette only after every shape and count is established.",
    tipLabel: "Marker tip",
    steps: [
      { name: "Sweep the vine path", text: "Draw one pale diagonal S curve with a parallel stem-width guide, then reserve exactly eight alternating leaf footprints, two tendril routes, and three berry positions.", tip: "Ghost the whole S curve twice before touching down. Space the eight leaves in a loose zigzag and mark all three berry circles now so the flourish stays balanced instead of becoming crowded at one end." },
      { name: "Shape eight leaves", text: "Connect the guides into one tapered double-line vine and wrap all eight footprints with varied pointed leaf silhouettes.", tip: "Turn the page so each leaf curve pulls toward you, making one side fuller than the other. Count four leaves on each side of the stem before moving on." },
      { name: "Curl tendrils and veins", text: "Add exactly two curling tendrils, three round berries, a midrib with a few side veins inside each leaf, and two small clusters of three violet stem-shadow hatch marks.", tip: "Let both curls end with open breathing room and angle the veins toward each leaf tip. Keep the violet hatch groups short so they read as rhythm accents rather than a third branch." },
      { name: "Ink the botanical rhythm", text: "Thicken every established stem, leaf, tendril, berry, vein, and overlap with imperfect black felt-tip lines while preserving narrow paper highlights.", tip: "Pull the long stem edges in separate passes and vary pressure around the leaf tips. Let one side dry before rotating the page so the black edges stay crisp without becoming mechanically uniform." },
      { name: "Color the curling vine", text: "Fill the established leaves in alternating deep jade and chartreuse, the three berries raspberry, and both hatch clusters violet while leaving visible marker streaks and small paper highlights.", tip: "Color each leaf from stem to tip and keep its assigned green through the finish. Work around the berry highlights instead of trying to add white over wet raspberry marker." },
      { name: "Let the vine unfurl", text: "Strengthen selected keeper outlines and clarify the established eight leaf fills, two tendrils, three berries, veins, violet hatches, and open-paper highlights without adding another botanical form.", tip: "Count eight leaves, two curls, three berries, and two hatch clusters, then stop while the paper and marker grain still show. A flower, wreath, face, border, or lettering would turn this focused flourish into a different lesson.", image: true }
    ]
  },
  {
    slug: "retro-lava-lamp",
    day: "006",
    date: "Monday, May 11",
    isoDate: "2026-05-11",
    subject: "a retro lava lamp",
    headlineSubject: "a retro<br>lava lamp",
    shortSubject: "a retro lava lamp",
    lessonTitle: "Let's draw a retro lava lamp",
    description: "Learn how to draw a retro lava lamp with a flared base, curved glass chamber, four large wax blobs, two small bubbles, bold felt-tip outlines, paper highlights, and saturated marker color.",
    intro: "Stack a flared base, curved glass chamber, and tapered cap around one center axis, then float four large wax shapes and two small bubbles inside before adding bold marker color. This honest archive lesson is a newly made exercise in silhouette, spacing, and organic shapes, not a claim about earlier visitors, comments, activity, or popularity.",
    time: 20,
    difficulty: "Intermediate",
    accent: "#4c4ca6",
    finished: "retro-lava-lamp-finished-v1.jpg",
    finishedAlt: "Handmade face-free marker drawing of one upright retro lava lamp with a deep-indigo tapered cap and flared base, one pale-aqua curved glass chamber, exactly four large coral-orange wax blobs, exactly two small magenta wax bubbles, one long white glass highlight, two short white metal highlights, three short base seam accents, thick imperfect black outlines, visible marker streaks, and one shallow warm-gray oval shadow",
    materials: ["Pencil and eraser", "Drawing paper", "Black felt-tip marker", "Indigo, coral-orange, pale-aqua, magenta, and warm-gray markers"],
    materialNote: "Use pencil for the lamp axis, base, chamber, cap, four large wax routes, two small bubbles, three highlight gaps, seams, and shadow. Add black, indigo, coral orange, pale aqua, magenta, and warm gray only after every shape and count is established.",
    tipLabel: "Marker tip",
    steps: [
      { name: "Stack the lamp shapes", text: "Draw a pale center axis, flared base trapezoid, curved glass chamber, and tapered cap, then place the exact four large wax footprints and two small bubble positions you will keep through the finish, plus one long glass highlight, two short metal highlights, and one shallow shadow.", tip: "Ghost the chamber sides from the cap to the base before touching down. Mark all six wax positions lightly and leave a clear paper channel around every shape." },
      { name: "Shape the retro silhouette", text: "Wrap the guides with the complete flared base, curved glass chamber, tapered cap, and the top and bottom glass rims while keeping all four wax footprints and both bubble guides visible.", tip: "Rotate the page for the long chamber curves and compare both sides against the center axis. Keep the base wider than the cap and do not erase or redraw the lava layout." },
      { name: "Float the lava shapes", text: "Darken and refine the four established wax footprints and two bubble guides inside the chamber while preserving the long glass highlight and two short metal highlights.", tip: "Turn the pale guides into confident kidney, peanut, and rounded contours without moving them. Count four large forms and two small circles before reaching for black marker." },
      { name: "Ink the lamp and lava", text: "Thicken every established outside edge, rim, wax shape, highlight boundary, and shadow edge, then add three short seam accents to the base with imperfect black felt-tip lines.", tip: "Pull the marker toward yourself along each long curve and let the line weight vary slightly. Pause at every rim so the metal and glass boundaries stay crisp instead of becoming one heavy band." },
      { name: "Pour in the retro color", text: "Fill the established cap and base indigo, four large wax blobs coral orange, two small bubbles magenta, glass pale aqua, and shadow warm gray while preserving the three white highlight gaps.", tip: "Color around the wax instead of across it, following the chamber curve with visible strokes. Let the pale aqua dry before reinforcing the black blob edges so the colors do not muddy." },
      { name: "Glow up the lava lamp", text: "Strengthen selected keeper outlines and clarify the established lamp, four large blobs, two bubbles, rims, three seam accents, marker fills, paper highlights, and shallow shadow.", tip: "Count four large wax blobs, two small bubbles, and three highlight gaps, then stop. A face, logo, cord, switch, table scene, sticker edge, or badge frame would turn this focused lamp study into a different lesson.", image: true }
    ]
  },
  {
    slug: "folded-banner-ribbon",
    day: "087",
    date: "Friday, July 31",
    isoDate: "2026-07-31",
    subject: "a folded banner ribbon",
    headlineSubject: "a folded<br>banner ribbon",
    shortSubject: "a folded banner ribbon",
    lessonTitle: "Let's draw a folded banner ribbon",
    description: "Learn how to draw a folded banner ribbon using a curved front panel, folded-back returns, fishtail ends, overlap seams, bold felt-tip outlines, marker highlights, and saturated color.",
    intro: "Build one blank banner from a curved center panel, two folded returns, and two notched tails, then make the overlaps readable before adding bold outlines and separate marker colors. The trick is treating every fold as a clear front-or-back plane, so the finished ribbon feels dimensional without needing lettering, a face, or vector-perfect symmetry.",
    time: 15,
    difficulty: "Intermediate",
    accent: "#df3c88",
    finished: "folded-banner-ribbon-finished-v1.jpg",
    finishedAlt: "Handmade felt-tip marker drawing of one centered blank folded banner ribbon with one curved raspberry front panel, two teal folded-back returns, two golden-yellow notched fishtail ends, four visible overlap seams, two long white highlight gaps, two small white corner glints, purple fold shadows, thick imperfect black outlines, visible marker streaks, and one shallow broken warm-gray ground shadow",
    materials: ["Black felt-tip marker", "Drawing paper", "Pencil and eraser", "Raspberry, teal, golden-yellow, purple, and warm-gray markers"],
    materialNote: "Use pencil for the fold map, black felt tip for every established edge and seam, then separate the front panel, returns, tails, fold shadows, and ground shadow with the listed marker colors. Keep the center blank and preserve the white highlight shapes.",
    tipLabel: "Marker tip",
    steps: [
      { name: "Map the ribbon folds", text: "Draw a pale centerline and long curved front-panel box, then map two fold-return routes, two fishtail notch guides, and one shallow broken shadow footprint.", tip: "Ghost the top and bottom curves twice before drawing them. Compare the empty wedges between each return and tail so the two sides feel balanced without forcing ruler-perfect symmetry." },
      { name: "Shape the banner silhouette", text: "Wrap the guides with one complete blank front panel, two folded-back return sections, and two notched fishtail ends.", tip: "Rotate the page for the long curves and pull each in one confident pass. Stop every tail line at the front panel instead of drawing finished detail underneath a section that will cover it." },
      { name: "Lock the overlaps", text: "Add four visible overlap seams, the inner fold edges, two long open highlight gaps, two small corner glints, and three short shadow-hatch groups to the established ribbon.", tip: "At each side, trace the line that passes in front and leave a small paper gap before the return line. If you can cover the lower fold with a finger and still understand the front panel, the overlap is working." },
      { name: "Ink the folded edges", text: "Thicken every established outside edge, seam, tail notch, and fold boundary with imperfect black felt-tip lines while preserving the blank center and all four white highlight shapes.", tip: "Let the inked side rest for a moment before rotating the page. Pull the marker toward yourself along each curve and vary pressure slightly so the outline feels lively rather than mechanically uniform." },
      { name: "Color each ribbon plane", text: "Fill the established front panel raspberry, returns teal, tails golden yellow, fold shadows purple, and shallow ground shadow warm gray with directional marker strokes.", tip: "Work from each outside edge toward the center and keep the strokes following the ribbon curve. Leave the two long highlights and two corner glints as clean paper instead of trying to paint white over wet color." },
      { name: "Crisp up the banner", text: "Reinforce selected keeper outlines, even the established marker fills, clarify the overlap seams and white highlights, and add only tiny dry-marker texture inside existing shapes.", tip: "Count one front panel, two returns, two tails, and four readable seams, then stop while the marker grain shows. Add your own lettering only after you can draw the blank fold structure cleanly; the ribbon itself is the lesson here.", image: true }
    ]
  },
  {
    slug: "cartoon-birthday-cake-slice",
    day: "007",
    date: "Tuesday, May 12",
    isoDate: "2026-05-12",
    subject: "a birthday cake slice",
    headlineSubject: "a birthday<br>cake slice",
    shortSubject: "a birthday cake slice",
    lessonTitle: "Let's draw a birthday cake slice",
    description: "Learn how to draw a birthday cake slice with a three-quarter wedge, three sponge layers, two filling bands, top frosting and one drip, a striped candle and flame, six sprinkles, thick black outlines, and bright marker color.",
    intro: "Build one cheerful cake slice from a simple three-quarter wedge, stack three sponge layers and two mint filling bands, then place the candle and all six sprinkles before the marker color arrives. This honest archive lesson is a newly made exercise in planes, layers, and countable decoration—not a claim about earlier visitors, comments, activity, or popularity.",
    time: 20,
    difficulty: "Easy",
    accent: "#b3368d",
    finished: "cartoon-birthday-cake-slice-finished-v1.jpg",
    finishedAlt: "Handmade face-free marker drawing of one three-quarter birthday cake slice with a pointed rear tip, broad front face, visible side plane, exactly three soft-lavender sponge layers, exactly two mint-green filling bands, one raspberry-purple top frosting layer with exactly one front drip, one upright cream candle with exactly two tangerine diagonal bands, one golden-yellow flame, exactly six short colorful sprinkle marks, two vertical side paper highlights, one top frosting paper highlight, thick imperfect black outlines, visible marker streaks, and one shallow warm-gray oval shadow",
    materials: ["Pencil and eraser", "Drawing paper", "Black and colored markers"],
    materialNote: "Use pencil for the cake planes, three sponge layers, two filling bands, frosting and drip, candle, flame, six sprinkles, three highlight areas, and shadow. Add black, raspberry purple, soft lavender, mint green, tangerine, cream, golden yellow, and warm gray only after every shape and count is established.",
    tipLabel: "Marker tip",
    steps: [
      { name: "Map the cake wedge", text: "Draw a pale triangular top plane with broad front and side faces, then divide three layer zones and reserve the frosting edge, candle and flame, exactly six sprinkle positions, two side highlights, and one shallow shadow.", tip: "Ghost the two long top edges before touching down, then compare the front and side planes as empty shapes. Reserve the candle footprint now so you do not finish frosting or sprinkles only to cover them later." },
      { name: "Shape the cake slice", text: "Wrap the guides with the complete triangular top, broad front face, visible side plane, and stable bottom edge while preserving every layer and decoration reserve.", tip: "Pull the two receding edges toward the same imagined point and keep the front edge gently curved. That small perspective check makes the slice feel solid before any frosting appears." },
      { name: "Stack the cake layers", text: "Divide the established slice into exactly three sponge layers and two filling bands, then add the top frosting edge and exactly one soft drip down the front.", tip: "Follow the bottom edge when drawing each layer line so the stack stays in perspective. Count three lavender zones and two narrow filling gaps before moving to the candle." },
      { name: "Light the birthday details", text: "Add one upright candle with two planned color bands, one flame, exactly six short sprinkles outside the candle footprint, two side highlight reserves, and one shallow shadow.", tip: "Place the six sprinkles as uneven dashes that follow the top plane, leaving open paper around the candle. Keep the flame centered over the wick so the candle does not look bent." },
      { name: "Ink the party colors", text: "Thicken every established contour and fill the frosting raspberry purple, three sponge layers soft lavender, two fillings mint, two candle bands tangerine, the remaining candle cream, the flame golden yellow, and the shadow warm gray while preserving both side highlights and one top frosting highlight.", tip: "Pull marker strokes along each cake plane and across each filling band, then let them dry before reinforcing the black edges. Visible streaks are part of the doodle; muddying the mint bands into the lavender is not." },
      { name: "Finish the birthday slice", text: "Strengthen the keeper outlines and clarify the established cake planes, three layers, two filling bands, frosting and drip, candle and flame, six sprinkles, three highlights, limited fills, and shallow shadow.", tip: "Count three sponge layers, two fillings, one drip, one candle, and six sprinkles, then stop. A face, whole cake, plate, gift, confetti, sticker edge, or badge frame would turn this focused slice into a different lesson.", image: true }
    ]
  },
  {
    slug: "cartoon-soda-can-with-fizz",
    day: "086",
    date: "Thursday, July 30",
    isoDate: "2026-07-30",
    subject: "a soda can with fizz",
    headlineSubject: "a soda can<br>with fizz",
    shortSubject: "a soda can with fizz",
    lessonTitle: "Let's draw a fizzy soda can",
    description: "Learn how to draw a soda can with fizz using a three-quarter cylinder, pull tab, opening, two blank label bands, five bubbles, three motion ticks, paper highlights, thick black outlines, and bright marker color.",
    intro: "Turn one tall cylinder into a fizzy retro soda can, building the top ellipse, pull tab, two sweeping label bands, and all five bubbles before the bright marker fills arrive. The useful challenge is keeping curved bands wrapped around the can while the open tab, bubble arc, and dry-marker texture make a face-free object feel lively.",
    time: 15,
    difficulty: "Easy",
    accent: "#d84e36",
    finished: "cartoon-soda-can-with-fizz-finished-v1.jpg",
    finishedAlt: "Handmade face-free marker drawing of one upright three-quarter soda can with a slightly tapered coral-red body, cool-gray top and bottom rims, one pull tab, one black can opening, one center rivet, two blank sweeping diagonal label bands in deep teal and pale butter, exactly five golden-yellow fizz bubbles rising in one curved arc, exactly three short black motion ticks, exactly two vertical warm-paper highlight gaps, thick imperfect black outlines, visible marker streaks, and one shallow warm-gray oval shadow",
    materials: ["Pencil and eraser", "Drawing paper", "Black and colored markers"],
    materialNote: "Use pencil for the can cylinder, top ellipse, bottom curve, tab, opening, two blank label bands, five bubbles, three motion ticks, two highlights, and shadow. Add black, coral red, deep teal, pale butter, cool gray, golden yellow, and warm gray only after every shape and count is established.",
    tipLabel: "Marker tip",
    steps: [
      { name: "Map the fizzy can", text: "Draw a pale center axis, top ellipse, slightly tapered body sides, and bottom curve, then reserve the pull tab, two diagonal label bands, a curved route for exactly five bubbles, and one shallow shadow.", tip: "Ghost the top ellipse from your shoulder, then compare the two side angles against the center axis. Mark all five bubble positions while the lines are light so the arc has room above the tab." },
      { name: "Shape the can silhouette", text: "Wrap the guides with the complete can body, top rim, short neck transition, and curved lower edge while keeping the tab, band, and bubble reserves visible.", tip: "Rotate the page for the top rim and pull both body sides in relaxed strokes. Keep the lower curve parallel to the top ellipse so the can feels cylindrical instead of flat." },
      { name: "Build the tab and label waves", text: "Add one pull tab, one can opening, one center rivet, and exactly two blank diagonal label bands around the established can.", tip: "Let each band edge rise gently as it crosses the body, like a ribbon around a cylinder. Leave the bands completely text-free so their curve, not a logo, carries the design." },
      { name: "Pop five fizz bubbles", text: "Add exactly five unequal bubbles along the reserved arc, exactly three short motion ticks beside the rim, two vertical paper-highlight gaps on the can, and one shallow shadow.", tip: "Start with the largest bubble near the top of the arc, then step down through smaller circles toward the opening. Count five bubbles and three ticks before reaching for black marker." },
      { name: "Ink the soda-shop colors", text: "Thicken every established contour and fill the body coral red, the two bands deep teal and pale butter, the top and bottom cool gray, the five bubbles golden yellow, and the shadow warm gray while preserving marker streaks and both highlight gaps.", tip: "Color each long band with strokes that follow its curve, then let the fill dry before reinforcing the black edges. Uneven marker grain is welcome; crossing outside the established band shape is not." },
      { name: "Make the fizz pop", text: "Strengthen the keeper outlines and clarify the established can, rim, tab, opening, two blank bands, five bubbles, three motion ticks, two highlights, limited fills, and shallow shadow.", tip: "Count two bands, five bubbles, three ticks, and two highlight gaps, then stop. A brand name, face, straw, cup, extra can, sticker edge, or badge frame would turn this focused fizzy-can study into a different lesson.", image: true }
    ]
  },
  {
    slug: "cartoon-chicken",
    day: "085",
    date: "Wednesday, July 29",
    isoDate: "2026-07-29",
    subject: "a chicken",
    headlineSubject: "a chicken",
    shortSubject: "a chicken",
    lessonTitle: "Let's draw a cartoon chicken",
    description: "Learn how to draw a chicken with a round head, plump pear-shaped body, two wings, three tail feathers, two three-toed feet, a bright-eyed open-beak expression, thick black outlines, and cheerful marker color.",
    intro: "Turn one round head and plump pear shape into a charming little chicken, placing both wings, three tail feathers, two feet, and the curious open-beak face before the marker color arrives. The forgiving curves and few countable details keep this an easy drawing while the upward glance, raised brows, and cheek marks give it more personality than a default smiley face.",
    time: 15,
    difficulty: "Easy",
    accent: "#d89a21",
    finished: "cartoon-chicken-finished-v1.jpg",
    finishedAlt: "Handmade marker drawing of one upright three-quarter cartoon chicken with a creamy round head and plump pear-shaped body, two golden-yellow wings, exactly three pale tail feathers, two orange legs with exactly three toes per foot, one coral-red three-bump comb, two coral wattles, two wide almond-shaped eyes looking slightly upward, two raised brows, one tiny open orange beak, two short cheek marks, small feather tufts, thick imperfect black outlines, visible marker streaks, warm-paper highlights, and one shallow warm-gray oval shadow",
    materials: ["Pencil and eraser", "Drawing paper", "Black and colored markers"],
    materialNote: "Use pencil for the head, body, wings, three tail feathers, two legs, both three-toed feet, comb, wattles, face, feather marks, and shadow. Add black, cream, golden yellow, coral red, orange, and warm gray only after the complete chicken is established.",
    tipLabel: "Marker tip",
    steps: [
      { name: "Map the chicken shapes", text: "Draw a light round head over a plump pear-shaped body, then reserve two wings, exactly three tail feathers, two leg axes with three-toe foot routes, the comb, beak, face axes, and one shallow shadow.", tip: "Ghost the body curve twice before touching down, then compare the open spaces beside both wings. Count three tail routes and three toe routes per foot while the lines are still easy to move." },
      { name: "Shape the plump silhouette", text: "Wrap the guides with the round head, pear body, two small wings, exactly three tail feathers, two legs, three toes per foot, one three-bump comb, and two small wattles.", tip: "Rotate the page for the long belly curve and let the wings stay slightly uneven. Trace from each leg into all three toes so none appears detached or disappears later." },
      { name: "Give the chicken a sunny peep", text: "Add two wide almond-shaped eyes looking slightly upward, two raised brows, one tiny open two-part beak, and two short cheek marks inside the established head.", tip: "Place the pupils high and a little to one side, then float the brows above them. The upward glance, open beak, and cheeks create charm without falling back on dot eyes and a U-smile." },
      { name: "Tuck in the feather details", text: "Add curved feather marks inside the larger near wing, small edge tufts on the far wing, three small breast tufts, tail notches, and one shallow oval shadow beneath the feet.", tip: "Use two or three relaxed curves rather than filling every wing with feathers. Keep more blank paper than texture so the chicken remains easy and readable at card size." },
      { name: "Add the sunny marker color", text: "Thicken every established contour and fill the body cream, wings golden yellow, comb and wattles coral red, beak and feet orange, and shadow warm gray while leaving visible paper streaks.", tip: "Pull the marker strokes with the round body and each wing. Let the warm colors dry before reinforcing their black edges so the expression stays crisp instead of muddy." },
      { name: "Let the little chicken chirp", text: "Strengthen the keeper outlines and clarify the established two wings, three tail feathers, two three-toed feet, comb, wattles, bright-eyed open-beak face, feather marks, limited fills, paper highlights, and shadow.", tip: "Count two wings, three tail feathers, two legs, and three toes per foot, then stop. You can change the colors or gaze, but an egg, nest, barn, extra chicken, sticker edge, or badge frame would make a different lesson.", image: true }
    ]
  },
  {
    slug: "cartoon-gumball-machine",
    day: "008",
    date: "Wednesday, May 13",
    isoDate: "2026-05-13",
    subject: "a gumball machine",
    headlineSubject: "a gumball<br>machine",
    shortSubject: "a gumball machine",
    lessonTitle: "Let's draw a cartoon gumball machine",
    description: "Learn how to draw a gumball machine with a round glass globe, exactly ten gumballs, a domed cap, broad cabinet, coin slot, three-lobed handle, dispenser chute, thick black outlines, and bright marker color.",
    intro: "Stack a big round globe over a broad candy-shop cabinet, then fit exactly ten gumballs and the simple controls inside those first shapes before reaching for color. This honest archive lesson is a newly made shape-stacking and repeated-circle exercise, not a claim about earlier visitors, comments, activity, or popularity.",
    time: 20,
    difficulty: "Intermediate",
    accent: "#d5423f",
    finished: "cartoon-gumball-machine-finished-v1.jpg",
    finishedAlt: "Handmade face-free marker drawing of one front-facing cartoon gumball machine with a round glass globe, exactly ten large gumballs arranged in three rows, a cherry-red domed cap and broad cabinet, one narrow coin slot, one gray three-lobed turn handle, one dark dispenser chute, two small screws, two short feet, thick imperfect black outlines, aqua, yellow, coral, and purple marker fills, curved glass highlights, visible marker streaks, and one shallow warm-gray oval shadow",
    materials: ["Pencil and eraser", "Drawing paper", "Black and colored markers"],
    materialNote: "Use pencil for the globe, cap, neck, cabinet, ten gumballs, coin slot, handle, chute, screws, feet, highlights, and shadow. Add black, cherry red, aqua, yellow, coral, purple, charcoal, and warm gray only after the whole machine is established.",
    tipLabel: "Marker tip",
    steps: [
      { name: "Stack the machine guides", text: "Draw a light round globe over a broad cabinet box, then reserve the domed cap, neck ring, front controls, dispenser chute, two feet, and one shallow shadow footprint.", tip: "Ghost the globe twice before touching down and use a center line to stack the cap, handle, chute, and cabinet. Keep the cabinet a little wider at the bottom so the machine feels sturdy." },
      { name: "Build the candy-shop silhouette", text: "Wrap the guides with the round globe and thick rim, domed cap, neck ring, broad cabinet base, two short feet, and the reserved front control and chute panels.", tip: "Rotate the page for the globe curve and pull the two cabinet sides in relaxed passes. Compare the feet against the center line so the machine does not lean." },
      { name: "Load the globe and controls", text: "Add exactly ten large gumball circles in three rows inside the globe, then draw one narrow coin slot, one three-lobed turn handle, and one dark dispenser-chute opening.", tip: "Count three circles in the top row, four in the middle, and three on the bottom. Let neighboring circles touch without overlapping so all ten remain easy to count." },
      { name: "Add glass and cabinet details", text: "Add two curved glass highlight strokes, simple cabinet edge seams, two small screw dots, one chute lip, and one shallow warm-gray oval shadow.", tip: "Place the highlights along the globe curve and keep the two screws level with each other. These small marks should clarify the machine, not decorate every empty space." },
      { name: "Fill the candy-shop color", text: "Thicken every established contour and fill the cap and cabinet cherry red, the ten gumballs aqua, yellow, coral, and purple, the hardware charcoal, and the shadow warm gray while preserving paper highlights.", tip: "Color one gumball at a time and recount after every row. Leave a few dry-marker streaks in the red cabinet so the finish still feels handmade." },
      { name: "Polish the gumball machine", text: "Strengthen the keeper outlines and clarify the established globe, ten gumballs, cap, neck, cabinet, coin slot, handle, chute, screws, feet, limited fills, paper highlights, and shallow shadow.", tip: "Count ten gumballs, two screws, and two feet, then stop. A face, price label, candy spill, sticker edge, or badge frame would turn this clean machine study into a different lesson.", image: true }
    ]
  },
  {
    slug: "cartoon-bumblebee",
    day: "084",
    date: "Tuesday, July 28",
    isoDate: "2026-07-28",
    subject: "a bee",
    headlineSubject: "a bee",
    shortSubject: "a bee",
    lessonTitle: "Let's draw a cartoon bumblebee",
    description: "Learn how to draw a bee with a fuzzy upright body, two antennae, two wings, six visible limbs, a waving foreleg, an asymmetric wink, two broad stripes, thick black outlines, and limited marker color.",
    intro: "Turn one round head and fuzzy oval body into a waving cartoon bumblebee, keeping three visible limbs on each side before the face, stripes, and marker color arrive. The upright greeting pose makes this a different drawing problem from the recent top-down ladybug, while the uneven wink and off-center mouth give the bee its own personality.",
    time: 15,
    difficulty: "Intermediate",
    accent: "#d89a21",
    finished: "cartoon-bumblebee-finished-v1.jpg",
    finishedAlt: "Handmade marker drawing of one front-facing upright cartoon bumblebee with a golden-yellow fuzzy head and abdomen, two black antennae, two pale-aqua wings with simple veins, exactly six charcoal limbs with the upper viewer-left foreleg raised in a wave, one wide sideways-looking oval eye, one curved wink, one lifted brow, one off-center open mouth with a muted-coral tongue, exactly two broad charcoal abdomen bands, thick imperfect black outlines, warm-paper highlight streaks, and one shallow warm-gray oval shadow",
    materials: ["Pencil and eraser", "Drawing paper", "Black and colored markers"],
    materialNote: "Use pencil for the center axis, head, fuzzy body, two wings, two antennae, and all six limb routes. Add black, golden yellow, pale aqua, muted coral, and warm gray only after the complete pose, face, two bands, veins, and shadow are established.",
    tipLabel: "Marker tip",
    steps: [
      { name: "Set the bumblebee guides", text: "Draw one light upright center axis, place a round head over a broad abdomen oval, then add two wing envelopes, two antenna routes, and exactly six limb axes with three attachments on each side and the upper viewer-left foreleg raised.", tip: "Count the three limb joints on one side, then mirror their heights loosely on the other side. Keep every route visible instead of hiding a middle limb behind a wing." },
      { name: "Shape the fuzzy silhouette", text: "Wrap the guides with the round head, scalloped fuzzy body, two antennae, two small wings, and exactly six bent limbs while preserving the same front-facing hover.", tip: "Rotate the page for the body curves and let the fuzz break the outline at irregular intervals. Trace from each shoulder or hip to its hand or foot so all six limbs stay attached." },
      { name: "Give the bee a cheeky hello", text: "Add one wide oval eye looking toward the raised foreleg, one curved wink, one lifted brow, and one small off-center open mouth with a tongue inside the established head.", tip: "Place the open eye first, then make the wink sit a little higher. That asymmetry creates the expression without falling back on two dot eyes and a centered U-smile." },
      { name: "Band the belly and wings", text: "Draw exactly two broad curved bands around the existing abdomen, add two simple vein branches inside each wing, place a few short fuzzy-edge marks, and add one shallow oval shadow below.", tip: "Curve both bands with the body instead of drawing straight bars. Leave generous yellow spaces between them, then count two bands and six limbs before reaching for color." },
      { name: "Ink the honey-gold color", text: "Thicken every established contour and fill the body golden yellow, both bands and all six limbs charcoal, the wings pale aqua, the tongue muted coral, and the shadow warm gray while leaving visible paper streaks.", tip: "Pull yellow strokes with the body curve and aqua strokes toward each wing tip. Let the fills dry before reinforcing the nearby black edges so they stay lively instead of muddy." },
      { name: "Let the bumblebee buzz", text: "Strengthen the keeper outlines and clarify the established two antennae, two wings, six limbs, waving foreleg, asymmetric face, two abdomen bands, veins, limited fills, paper highlights, and shadow.", tip: "Count two antennae, two wings, six limbs, and two dark bands, then stop. You can change the colors or expression, but adding a flower, honey pot, flight arc, sticker edge, or badge frame would crowd this simple greeting pose.", image: true }
    ]
  },
  {
    slug: "cartoon-traffic-cone",
    day: "009",
    date: "Thursday, May 14",
    isoDate: "2026-05-14",
    subject: "a traffic cone",
    headlineSubject: "a traffic cone",
    shortSubject: "a traffic cone",
    lessonTitle: "Let's draw a traffic cone",
    description: "Learn how to draw a traffic cone with a tilted taper, oval top opening, three-quarter rubber base, one reflective band, three scuff clusters, two pebbles, thick black outlines, and limited safety-orange marker color.",
    intro: "Build one sturdy traffic cone around a slight lean, then wrap a broad reflective band around the taper before adding road wear, the rubber base, and safety-orange marker. This honest archive lesson is a fresh perspective-and-surface exercise, not a claim about earlier visitors, comments, activity, or popularity.",
    time: 15,
    difficulty: "Easy",
    accent: "#c95524",
    finished: "cartoon-traffic-cone-finished-v1.jpg",
    finishedAlt: "Handmade face-free marker drawing of one slightly right-leaning three-quarter traffic cone with a burnt safety-orange tapered body, one small dark oval top opening, one broad warm-cream reflective band, one lower curved taper guide, exactly three black scuff clusters, one narrow vertical paper highlight, one broad charcoal rubber base with a visible top plane and front thickness, exactly two warm-gray road pebbles, thick imperfect black outlines, visible dry-marker texture, and one broken muted-navy offset shadow",
    materials: ["Pencil and eraser", "Drawing paper", "Black and colored markers"],
    materialNote: "Use pencil for the leaning axis, taper, top opening, base perspective, reflective band, pebble positions, and shadow. Add black, burnt orange, cream, charcoal, warm gray, and muted navy only after every contour and surface mark is established.",
    tipLabel: "Marker tip",
    steps: [
      { name: "Tilt the cone guides", text: "Draw one pale leaning center axis, wrap it with a tapered cone envelope, then place the wide three-quarter base footprint, top opening, one broad band reserve between two curved guides, two pebble positions, and one offset shadow footprint.", tip: "Ghost the taper edges and base front before touching down. Compare the two empty wedges beside the cone so the slight lean feels intentional rather than accidentally crooked." },
      { name: "Build the safety silhouette", text: "Wrap the guides with one tapered cone, a small oval top opening, one broad rubber base, the visible base top plane, and its front thickness while preserving the original lean.", tip: "Rotate the page for each long taper edge and pull it in one confident pass. Stop the cone body cleanly where it meets the base instead of drawing hidden orange detail underneath." },
      { name: "Wrap the reflective band", text: "Clarify one broad curved reflective band around the established taper, keep one lower taper guide, and add one inset edge across the existing rubber base.", tip: "Curve the band boundaries with the cone instead of drawing two flat bars. Keep the cream area wider at the near edge so it follows the three-quarter view." },
      { name: "Scuff the road-ready details", text: "Add exactly three short irregular scuff clusters to the cone, two pebble marks beside the base, one narrow paper highlight gap, and one broken offset shadow around the established silhouette.", tip: "Vary the three scuff clusters and leave more clean paper than wear. Place the two pebbles at different sizes so they support the perspective without turning into scenery." },
      { name: "Ink the safety orange", text: "Thicken every established contour and fill the cone burnt orange, the broad band cream, the base charcoal, the shadow muted navy, and the two pebbles warm gray while preserving marker streaks and the paper highlight.", tip: "Pull orange strokes from the top opening toward the base so they follow the taper. Let the cream and orange dry before reinforcing their shared black edge." },
      { name: "Set the cone firmly down", text: "Strengthen the keeper outlines and clarify the established top opening, taper, reflective band, lower guide, three scuff clusters, two pebbles, rubber base, limited fills, paper highlight, and offset shadow.", tip: "Count one band, three scuff clusters, and two pebbles, then stop. A face, words, worker, car, extra cone, sticker edge, or badge frame would turn this clean safety-object study into a different lesson.", image: true }
    ]
  },
  {
    slug: "comic-ocean-wave",
    day: "083",
    date: "Monday, July 27",
    isoDate: "2026-07-27",
    subject: "a comic ocean wave",
    headlineSubject: "a comic<br>ocean wave",
    shortSubject: "a comic ocean wave",
    lessonTitle: "Let's draw a comic ocean wave",
    description: "Learn how to draw a comic ocean wave using a spiral curl guide, one bold crest silhouette, exactly three inner flow bands, chunky foam scallops, three spray droplets, thick black felt-tip outlines, navy and sea-green marker fills, and warm paper highlights.",
    intro: "Build one curling wave around a clear spiral axis, keep three long flow bands attached to that first silhouette, then break the crest and base into chunky foam before adding a limited ocean palette. The useful challenge is making a large fluid shape feel forceful and readable while the visible marker streaks keep the finish attainable by hand.",
    time: 20,
    difficulty: "Challenge",
    accent: "#2f7773",
    finished: "comic-ocean-wave-finished-v1.jpg",
    finishedAlt: "Handmade face-free marker drawing of one large comic ocean wave curling leftward from a low right base with one pointed crest, exactly three long inner flow bands, chunky cream foam scallops along the crest and base, exactly three separate sea-green spray droplets, thick imperfect black felt-tip outlines, deep-navy and muted sea-green marker fills, visible directional streaks, and small warm-paper highlight gaps; no face, text, scenery, sticker outline, or badge frame",
    materials: ["Pencil or pale blue marker", "Drawing paper", "Black felt-tip marker", "Deep-navy and muted sea-green markers"],
    materialNote: "Use pencil or a pale blue marker to map the curl, wave body, three bands, foam, and three droplets before the black marker pass. Let the outline dry, then pull navy and sea-green strokes along the curl while leaving the paper clean inside the foam.",
    tipLabel: "Marker tip",
    steps: [
      { name: "Map the curl", text: "Place one pale backwards C shape as the spiral curl guide, a low wedge base, a small foam footprint, and exactly three reserved spray-droplet positions in one fixed square crop.", tip: "Ghost the spiral twice before touching down, then check that the base feels wide enough to support the tall crest. Mark all three droplet positions now so the splash cannot drift later." },
      { name: "Shape the wave", text: "Connect the guides into one broad wave body with a pointed crest curling left and a low base stretching right, while preserving the small foam footprint.", tip: "Rotate the page for the long outer curve and pull it in one confident pass. Keep the open spiral large enough that it will still read after the outline becomes thick." },
      { name: "Pull three flow bands", text: "Add exactly three curved tapering flow bands inside the established wave, all following the same spiral toward the crest.", tip: "Start each band near the curl and let it widen toward the base. Compare the paper gaps between bands so none collapses into a thin accidental stripe." },
      { name: "Break up the foam", text: "Build chunky foam scallops along the existing crest and base, then turn the three reserved spray marks into exactly three separate droplets.", tip: "Vary the scallop sizes instead of stamping identical bumps. Count three droplets before moving on and keep clear paper around each one." },
      { name: "Ink and color the surge", text: "Thicken every established contour with imperfect black felt-tip, then fill the existing wave with deep navy and muted sea green while preserving cream foam and paper gaps.", tip: "Pull marker strokes along each curve and let one band dry before coloring the next. The visible streaks help show the motion, so do not scrub them into a seamless digital-looking fill." },
      { name: "Finish the comic wave", text: "Strengthen the established outlines and clarify the three flow bands, foam scallops, three droplets, limited ocean fills, and intentional dry-marker highlights.", tip: "Count three bands and three droplets, then stop while the marker texture still shows. A face, sun, boat, surfboard, extra splash, sticker edge, or badge frame would make a different lesson.", image: true }
    ]
  },
  {
    slug: "cartoon-jack-in-the-box",
    day: "010",
    date: "Friday, May 15",
    isoDate: "2026-05-15",
    subject: "a cartoon jack-in-the-box",
    headlineSubject: "a cartoon<br>jack-in-the-box",
    shortSubject: "a jack-in-the-box",
    lessonTitle: "Let's draw a cartoon jack-in-the-box",
    description: "Learn how to draw a cartoon jack-in-the-box using a three-quarter toy box, open lid, zigzag spring, two-point cap, asymmetric wink-and-eye expression, two-tooth grin, side crank, motion arcs, thick black outlines, and soft-retro marker color.",
    intro: "Build one toy box in a simple three-quarter view, reserve the spring-loaded character before closing any overlaps, then give the face a crooked wink-and-grin expression before adding the crank and color. This honest archive lesson is a newly made perspective, overlap, and expression exercise, not a claim about earlier visitors, comments, activity, or popularity.",
    time: 25,
    difficulty: "Intermediate",
    accent: "#d75f55",
    finished: "cartoon-jack-in-the-box-finished-v1.jpg",
    finishedAlt: "Handmade marker drawing of one cartoon jack-in-the-box with a three-quarter toy box, open coral lid, centered cream zigzag spring, round cream face, broad three-lobed ruff, floppy two-point dusty-cobalt and soft-coral cap, one crescent wink, one wide oval eye looking sideways, one raised brow, one off-center black grin with exactly two square cream teeth, one side crank with coral handle, exactly two curved motion arcs, two diagonal front-panel divisions, dusty-cobalt, soft-coral, and pale-butter fills, thick imperfect black outlines, visible marker streaks, and warm-paper gaps; no text, confetti, sticker outline, or badge frame",
    materials: ["Pencil or pale blue marker", "Drawing paper", "Black felt-tip marker", "Dusty-cobalt, soft-coral, and pale-butter markers"],
    materialNote: "Use pencil or a pale blue marker to reserve the box, lid, spring, character, crank, face, panel divisions, and motion arcs before inking. Let the black contours dry, then fill broad established shapes with the limited soft-retro palette and leave small paper gaps.",
    tipLabel: "Marker tip",
    steps: [
      { name: "Block the box and surprise", text: "Place one pale three-quarter cube, an open lid flap, a centered spring axis, and reserved footprints for the round head, ruff, two-point cap, and side crank.", tip: "Ghost the box edges before touching down and keep the two visible side planes different widths. Reserve the spring and head on one center line so the surprise does not lean away from the box." },
      { name: "Pop up the character", text: "Wrap the guides with the complete box and lid, one zigzag spring, one round head, one broad three-lobed ruff, and one floppy two-point cap.", tip: "Stop the hidden spring cleanly behind the ruff and inside the box opening. Keep both cap points uneven so the silhouette feels playful instead of mirrored." },
      { name: "Aim the crooked grin", text: "Add one crescent wink, one wide oval eye looking sideways, one raised brow over that eye, and one off-center open grin with exactly two square teeth.", tip: "Draw the wide eye first and push its pupil to one side, then tilt the grin toward the wink. The mismatched eyes, raised brow, and shifted mouth create the expression without default dot eyes or a U-smile." },
      { name: "Add the crank and motion", text: "Add one side crank with a round handle, two broad diagonal division lines on the box front, and exactly two short curved motion arcs beside the lid.", tip: "Turn the page for the two long diagonal lines and keep them parallel enough to form one broad band. Count two motion arcs and leave open paper around the crank handle." },
      { name: "Ink the soft-retro colors", text: "Thicken every established contour, then fill the cap and box with dusty cobalt, soft coral, and pale butter while keeping the face, ruff, spring, teeth, and highlights cream.", tip: "Pull marker strokes along each box plane and cap point, letting one color dry before its neighbor. Leave visible streaks and a few warm-paper gaps instead of polishing the fills smooth." },
      { name: "Finish the springy surprise", text: "Strengthen the established outlines and clarify the box, lid, spring, ruff, two-point cap, asymmetric face, two teeth, crank, panel divisions, two motion arcs, and soft-retro fills.", tip: "Count one wink, one wide eye, one raised brow, two teeth, one crank, and two motion arcs, then stop. Confetti, stars, text, an extra prop, a sticker edge, or a badge frame would make a different lesson.", image: true }
    ]
  },
  {
    slug: "cheetah-print-pattern",
    day: "082",
    date: "Sunday, July 26",
    isoDate: "2026-07-26",
    subject: "a cartoon cheetah cub",
    headlineSubject: "a cartoon<br>cheetah cub",
    shortSubject: "a cartoon cheetah cub",
    lessonTitle: "Let's draw a cartoon cheetah cub",
    description: "Learn how to draw a cartoon cheetah cub peeking over a ledge using head-and-paw construction, an asymmetric side-eye, one raised brow, two facial tear stripes, solid cheetah spots, thick black felt-tip outlines, and golden-ochre marker color.",
    intro: "Turn a few light guides into one character-rich drawing: stage a cheeky cheetah cub behind a ledge, build the head and two paws around the construction, aim an asymmetric side-eye, then add the tear stripes and solid spots that distinguish cheetah markings from leopard rosettes. The ledge teaches clean overlap, while the expression and markings make every later step feel earned.",
    time: 25,
    difficulty: "Challenge",
    accent: "#d99a2b",
    finished: "cheetah-print-pattern-finished-v2.jpg",
    finishedAlt: "Handmade marker drawing of one cheeky near-front cartoon cheetah cub peeking over a muted deep-green ledge with exactly two rounded forepaws, three black toe lines on each cream paw tip, a golden-ochre head and visible neck, two uneven rounded ears with dusty-coral interiors, one wide almond eye and one narrower half-lidded eye glancing sideways, one raised brow, one compact black nose, a divided cream muzzle, one crooked smirk with one small triangular canine, exactly two black facial tear stripes, irregular solid black spots across the head, ears, neck, and paws, thick imperfect black outlines, visible marker strokes, and warm-paper highlight gaps; no full body, tail, rosette, scenery, text, sticker edge, or badge frame",
    materials: ["Pencil or pale-blue marker", "Drawing paper", "Black felt-tip marker", "Golden-ochre, dusty-coral, and deep-green markers"],
    materialNote: "Use pencil or pale blue to reserve the head, ears, muzzle, ledge, two paws, face, and every marking before the black pass. Let the black tear stripes and solid spots dry, then pull the limited marker colors through the established fur and ledge while leaving the cream muzzle and paw tips mostly as paper.",
    tipLabel: "Marker tip",
    steps: [
      { name: "Stage the cub's peek", text: "Draw one pale tilted head oval with a face axis, two ear axes, and a broad muzzle footprint, then place one horizontal ledge with front-plane depth and reserve exactly two paw centers on its top edge.", tip: "Ghost the head oval twice before touching down, then compare the two paper gaps beside it. Keep the ledge top line pale and stop it where each paw will overlap so you never have to erase a finished edge." },
      { name: "Build the head and paws", text: "Wrap the guides with a rounded head and cheek block, two uneven rounded-triangle ears, one broad muzzle oval, a short visible neck, and two mitten-like forepaws draped over the ledge.", tip: "Make one ear tilt a little farther outward and compare the paw widths as a pair. Leave the torso below the ledge undrawn; the overlap is clearer when you only build forms that survive in the finish." },
      { name: "Connect the cub silhouette", text: "Connect one loose outer contour around the head, cheeks, ears, short neck, and two paws, then clarify the ledge top and front planes without drawing through the paws.", tip: "Rotate the page as you pull each cheek curve, using a slightly broken felt-tip-like rhythm instead of one perfect digital arc. Check that the ledge line disappears behind both paws before adding the face." },
      { name: "Place the feline features", text: "Add two inner ears, one wide almond eye opening, one narrower half-lidded eye opening, the divided muzzle, compact nose, small off-center mouth opening, and one small triangular canine. Leave both eye openings blank for now.", tip: "Use the face axis to keep the nose centered while letting the eye shapes disagree. Do not add irises or pupils yet—the next step sets their direction once, without redrawing them." },
      { name: "Aim the cheeky side-eye", text: "Add both pupils toward the right side of the page, raise one curved brow, shape the crooked smirk, add exactly three short toe marks to each paw, and place two small solid-spot anchors on the visible neck.", tip: "Push both pupils toward the page's right edge before darkening them, then lift only one brow. Count three toe marks on the left paw, three on the right, and two neck anchors before moving to the full marking map." },
      { name: "Map the cheetah markings", text: "Add exactly two facial tear stripes from the inner eye corners toward the muzzle, then expand the two neck anchors into an asymmetric layout of irregular closed solid spots across the forehead, cheeks, outer ears, neck, and paws.", tip: "Draw each spot as one closed wobbling shape with no ring or open center. Leave larger quiet gaps around the eyes and muzzle, then confirm that both tear stripes reach the muzzle without crossing the cream shapes." },
      { name: "Ink and color the cub", text: "Thicken every established contour, fill the two tear stripes and all existing spots black, then add golden ochre to the fur, dusty coral to the inner ears, and muted deep green to the ledge while keeping the muzzle and paw tips cream.", tip: "Let the black marker dry before adding color. Pull ochre strokes with the fur direction and green strokes across the ledge plane, leaving small warm-paper gaps so the finish stays handmade instead of glossy." },
      { name: "Sharpen the spotted mischief", text: "Strengthen the established silhouette, asymmetric expression, two tear stripes, solid spots, six toe marks, limited marker fills, paper highlights, and small existing dry-marker shadows.", tip: "Count two paws, six toe marks, two tear stripes, and one canine, then stop while the marker grain still shows. You can change the cub's colors or spot rhythm in your own version without adding rosettes, a full body, scenery, or a decorative frame.", image: true }
    ]
  },
  {
    slug: "cartoon-padlock-and-key",
    day: "011",
    date: "Saturday, May 16",
    isoDate: "2026-05-16",
    subject: "a padlock and key",
    headlineSubject: "a padlock<br>and key",
    shortSubject: "a padlock and key",
    lessonTitle: "Let's draw a padlock and key",
    description: "Learn how to draw a padlock and key using a rounded three-quarter body, arched shackle, diagonal key overlap, keyhole, screws, joint collars, comic glints, thick black outlines, limited teal, mustard, and brick-red marker fills, and a charcoal shadow.",
    intro: "Build one chunky face-free padlock and reserve the diagonal key footprint before adding any hardware, then keep the keyhole, screws, shackle joints, glints, and limited marker color attached to those first shapes. This honest archive lesson is a newly made lock-and-key study, not a claim about earlier visitors, comments, activity, or popularity.",
    time: 15,
    difficulty: "Intermediate",
    accent: "#2f7773",
    finished: "cartoon-padlock-and-key-finished-v1.jpg",
    finishedAlt: "Handmade marker drawing of one face-free chunky three-quarter padlock with a deep-teal rounded body, narrow brick-red side plane, thick mustard arched shackle with two joint collars, one centered black keyhole, exactly two visible mustard corner screws, one separate mustard key crossing diagonally in front with a round bow, teal center hole, straight shaft and two-step teeth, two paired-ray comic glint groups, thick imperfect black outlines, visible marker streaks, paper highlight gaps, and one broken charcoal oval shadow; no face, text, sticker outline, or badge frame",
    materials: ["Pencil", "Drawing paper", "Black felt-tip marker", "Deep-teal, mustard, brick-red, and charcoal markers"],
    materialNote: "Use pencil to reserve the key overlap and map every piece of hardware before the black marker pass. Let the outline dry, then fill only the established shapes with the limited teal, mustard, brick-red, and charcoal palette.",
    tipLabel: "Marker tip",
    steps: [
      { name: "Block the lock and key", text: "Draw a pale rounded three-quarter lock body and thick arched shackle route, then reserve one diagonal key footprint across the lower body and add a shallow shadow guide.", tip: "Ghost the shackle arch twice, then pull its outer and inner curves with the page turned. Keep the key footprint blank so you do not ink body detail that the key will permanently cover." },
      { name: "Shape the secure silhouette", text: "Wrap the guides with the rounded body, narrow side plane, inner and outer shackle edges, and one separate key with a round bow, center hole, shaft, and simple two-step teeth.", tip: "Compare the empty space inside the shackle with the key bow hole; both should read clearly at a glance. Break the hidden lower-body contour behind the key instead of drawing through it." },
      { name: "Add the lock hardware", text: "Draw one centered keyhole, exactly two visible corner screws, one side band, and two shackle joint collars on the established lock.", tip: "Place the keyhole on the front plane, not the page center, then rotate the page for the screw slots. Two clear screws are enough to sell the chunky hardware." },
      { name: "Set the comic glints and shadow", text: "Add exactly two paired-ray angular glint groups around the lock and one broken oval shadow beneath the existing padlock and key, then clarify the key overlap.", tip: "Aim the glint rays away from the lock and keep their two groups asymmetrical. Draw the shadow around the key contact points rather than coloring one perfect digital oval." },
      { name: "Ink and color the hardware", text: "Thicken every established contour and fill the lock body deep teal, shackle and key mustard, side band brick red, and shadow charcoal while leaving visible paper streaks.", tip: "Let the black outline dry, then pull marker strokes with each form. Work the teal body in broad vertical passes and turn the page for the curved shackle and key bow." },
      { name: "Click the finish into place", text: "Strengthen the established outlines, lock-and-key overlap, keyhole, two screws, side band, shackle joints, two paired-ray glint groups, limited marker fills, paper highlights, and oval shadow.", tip: "Count one lock, one key, two screws, and two glint groups, then stop while the marker texture still shows. Your palette and key teeth can change, but a face, logo, or extra key would make a different lesson.", image: true }
    ]
  },
  {
    slug: "cartoon-ladybug-in-flight",
    day: "081",
    date: "Saturday, July 25",
    isoDate: "2026-07-25",
    subject: "a cartoon ladybug in flight",
    headlineSubject: "a cartoon ladybug<br>in flight",
    shortSubject: "a flying ladybug",
    lessonTitle: "Let's draw a cartoon ladybug in flight",
    description: "Learn how to draw a cartoon ladybug in flight with two spread wing cases, two pale flight wings, six bent legs, two antennae, seven spots, wing veins, takeoff arcs, thick black outlines, and natural marker color.",
    intro: "Aim one face-free ladybug along a diagonal body axis, spread the hard wing cases over two pale flight wings, then count the legs and spots before adding bold marker color and takeoff motion. The useful challenge is keeping the overlapping wing shapes readable while the insect still feels light enough to fly.",
    time: 20,
    difficulty: "Intermediate",
    accent: "#b9432d",
    finished: "cartoon-ladybug-in-flight-finished-v1.jpg",
    finishedAlt: "Handmade face-free marker drawing of one ladybug flying diagonally toward the upper left with a black head and thorax, two spread brick-red wing cases carrying exactly seven black spots, two pale cream flight wings with simple black veins, exactly six bent black legs, two curved antennae, two mustard takeoff arcs, one broken warm-gray oval shadow, thick imperfect black outlines, visible marker streaks, and paper highlight gaps",
    materials: ["Pencil and eraser", "Drawing paper", "Black and natural colored markers"],
    materialNote: "Use pencil for the diagonal body, two wing cases, two flight wings, six legs, two antennae, seven spots, takeoff arcs, and shadow, then outline with black marker and fill with brick red, cream, mustard, and warm gray.",
    tipLabel: "Marker tip",
    steps: [
      { name: "Aim the takeoff guides", text: "Place one light diagonal body axis, build the head, thorax, and abdomen, then reserve two spread wing cases, two flight wings, six leg axes, and two antenna routes.", tip: "Ghost the full body axis first and keep both wing-case envelopes related to it. Count the six leg routes before drawing over the construction." },
      { name: "Shape the flying ladybug", text: "Wrap the guides with the face-free head and thorax, two spread wing cases, two pale flight wings, exactly six bent legs, and two curved antennae.", tip: "Stop hidden flight-wing edges cleanly beneath the red cases. Compare the paper openings around the four wings so the overlaps stay easy to read." },
      { name: "Dot the wing cases", text: "Add exactly seven uneven spots across the two established wing cases and a few simple vein lines inside the two existing flight wings.", tip: "Place four spots on the left case and three on the right, varying their sizes slightly. Keep every spot away from the exposed red abdomen between the cases." },
      { name: "Add the takeoff motion", text: "Draw exactly two curved mustard action arcs behind the ladybug and one shallow broken warm-gray oval shadow beneath the flying silhouette.", tip: "Aim both arcs along the same takeoff direction and keep them clear of the legs. The separated shadow should make the insect feel airborne." },
      { name: "Ink and color the ladybug", text: "Thicken every established contour, fill both wing cases brick red, the head and seven spots black, both flight wings cream, the action arcs mustard, and the shadow warm gray.", tip: "Pull the red marker strokes along each wing-case curve and leave small paper gaps. Let the color dry before reinforcing the black outline and spots." },
      { name: "Lift off with the final lines", text: "Strengthen the keeper outlines and clarify the established wing overlaps, seven spots, flight-wing veins, natural marker fills, paper highlights, two arcs, and shadow.", tip: "Count two wing cases, two flight wings, six legs, two antennae, and seven spots, then stop. A face, flower, scenery, sticker edge, or badge frame would make a different lesson.", image: true }
    ]
  },
  {
    slug: "cartoon-toaster-popping-toast",
    day: "012",
    date: "Sunday, May 17",
    isoDate: "2026-05-17",
    subject: "a toaster popping toast",
    headlineSubject: "a toaster<br>popping toast",
    shortSubject: "a popping toaster",
    lessonTitle: "Let's draw a toaster popping toast",
    description: "Learn how to draw a retro toaster popping toast with a rounded three-quarter body, two toast slices, a top slot, side lever, browning dial, cancel button, popping rays, thick black outlines, and warm marker color.",
    intro: "Build one rounded toaster in a simple three-quarter view, reserve two toast slices before closing the top slot, then add the controls, popping motion, and warm marker fills. This honest archive lesson is a newly made perspective-and-overlap exercise, not a claim about earlier visitors, comments, activity, or popularity.",
    time: 20,
    difficulty: "Intermediate",
    accent: "#c79028",
    finished: "cartoon-toaster-popping-toast-finished-v1.jpg",
    finishedAlt: "Handmade face-free marker drawing of one rounded retro toaster in three-quarter view with a muted mustard housing, exactly two toast-brown slices popping from one black top slot, three visible charcoal feet, one side lever with a paprika-red handle, one round charcoal browning dial, one small rectangular cancel button, exactly three black popping rays, thick imperfect black outlines, visible marker streaks and paper highlights, and one broken charcoal oval shadow",
    materials: ["Pencil and eraser", "Drawing paper", "Black and earthy colored markers"],
    materialNote: "Use pencil for the toaster box, top slot, two toast slices, three visible feet, lever, dial, button, popping rays, and shadow, then outline with black marker and fill with muted mustard, toast brown, paprika red, and charcoal.",
    tipLabel: "Marker tip",
    steps: [
      { name: "Block the toaster and toast", text: "Place one light rounded toaster box in three-quarter view, add the top-plane and slot axes, then reserve exactly two toast footprints, the lever, two controls, three visible feet, and a shallow shadow.", tip: "Ghost the top plane before touching down and keep both toast footprints clear of slot detail. Compare the visible front and side widths so the box does not flatten." },
      { name: "Shape the breakfast silhouette", text: "Wrap the guides with the rounded toaster housing, one top slot, exactly two popping toast slices, and three visible small feet.", tip: "Stop the hidden slot edges cleanly at both toast slices. Round the box corners by pulling through them instead of joining four stiff straight lines." },
      { name: "Add the toaster controls", text: "Draw one side lever, one round browning dial, one small rectangular cancel button, the top-slot lip, and simple housing seams.", tip: "Stack the lever, dial, and button with uneven spacing so they feel designed rather than stamped. Keep every control inside the visible side plane." },
      { name: "Toast the bread and show the pop", text: "Add darker crusts and a few crumb marks to both slices, exactly three short popping rays above them, and one broken oval shadow below.", tip: "Let each crust follow its slice edge and vary the tiny crumb marks. Aim the three rays outward without touching the toast." },
      { name: "Ink the warm breakfast colors", text: "Thicken every established contour, fill the toaster muted mustard, both slices toast brown, the lever handle paprika, the controls charcoal, and the shadow warm gray.", tip: "Pull mustard strokes across the toaster planes and leave small paper gaps. Let the fills dry before strengthening the black slot and hardware edges." },
      { name: "Pop the final lines into focus", text: "Strengthen the keeper outlines and clarify the established toast overlaps, slot lip, lever, two controls, crusts, crumb marks, three rays, warm marker fills, highlights, and shadow.", tip: "Count two toast slices, three visible feet, one dial, one button, and three rays, then stop. A face, plate, butter, extra food, sticker edge, or badge frame would make a different lesson.", image: true }
    ]
  },
  {
    slug: "cartoon-dragon-head",
    day: "080",
    date: "Friday, July 24",
    isoDate: "2026-07-24",
    subject: "a cartoon dragon head",
    headlineSubject: "a cartoon<br>dragon head",
    shortSubject: "a dragon head",
    lessonTitle: "Let's draw a cartoon dragon head",
    description: "Learn how to draw a cartoon dragon head in side profile with two swept horns, a narrow eye and heavy brow, a flared nostril, an open three-fang grin, one pointed ear, three cheek spikes, four neck plates, thick black outlines, and earthy marker color.",
    intro: "Build one bold dragon around a head oval, muzzle wedge, neck sweep, and two horn axes, then aim a sly side-eye before adding spikes, plates, and earthy marker fills. The useful challenge is keeping the long muzzle and horn angles related while the one-eyed profile stays expressive instead of slipping into a default cute face.",
    time: 20,
    difficulty: "Challenge",
    accent: "#b85538",
    finished: "cartoon-dragon-head-finished-v1.jpg",
    finishedAlt: "Handmade marker drawing of one right-facing cartoon dragon head with terracotta skin, exactly two swept warm-cream horns with black segment lines, one pointed ear with moss-green inner shape, exactly one narrow almond eye and forward pupil beneath one heavy slanted brow, one flared nostril, an asymmetrical open black grin with exactly three cream fangs, exactly three cheek spikes, exactly four moss-green neck plates, thick imperfect black outlines, visible marker streaks, and warm paper gaps",
    materials: ["Pencil and eraser", "Drawing paper", "Black and earthy colored markers"],
    materialNote: "Use pencil for the head, muzzle, jaw, neck, two horns, expression, ear, three spikes, four plates, and mouth, then outline with black marker and fill the established shapes with terracotta, moss green, and warm cream.",
    tipLabel: "Marker tip",
    steps: [
      { name: "Map the dragon profile", text: "Place one pale head oval, a long right-facing muzzle wedge, a curved neck sweep, an eye line, and exactly two swept-back horn axes.", tip: "Ghost the muzzle edge and neck curve before touching down. Compare the open wedge between the horn axes and keep both horn-base footprints free of skull detail that would later be covered." },
      { name: "Build the horned silhouette", text: "Wrap the guides with the outer head, muzzle, open lower jaw, curved neck, and exactly two complete horn contours in the same profile.", tip: "Rotate the page for the long jaw edge and pull it in one confident pass. Stop hidden skull lines at the horn bases instead of drawing through them." },
      { name: "Aim the sly dragon expression", text: "Add one narrow almond eye and forward pupil under a heavy slanted brow, one flared nostril, and an asymmetrical open side grin with exactly three fangs.", tip: "Tilt the brow against the eye rather than mirroring it, then leave uneven mouth corners. That combination of eye, brow, nostril, and three-fang grin creates a sly expression without dot eyes or a U-smile." },
      { name: "Add spikes and neck armor", text: "Add one pointed ear behind the jaw hinge, exactly three cheek spikes, exactly four broad neck plates, and one simple tongue-free inner-mouth shape.", tip: "Mark all three spike tips and four plate breaks lightly before inking. Compare their negative spaces so the repeating shapes feel lively rather than mechanically even." },
      { name: "Ink the earthy dragon colors", text: "Thicken every established keeper line, fill the skin terracotta, the four plates and inner ear moss green, both horns and all three fangs warm cream, and the eye and mouth black.", tip: "Pull terracotta strokes along the muzzle and neck curves, then let them dry before reinforcing black edges. Leave small paper gaps in the fills instead of adding glossy white highlights later." },
      { name: "Wake up the dragon finish", text: "Strengthen the keeper outlines and clarify the established two horns, sly eye and brow, nostril, three-fang grin, ear, three cheek spikes, four neck plates, earthy fills, and marker streaks.", tip: "Count two horns, three fangs, three cheek spikes, and four plates, then stop. You can change the earthy colors or spike sizes in your own version, but wings, flames, a full body, a sticker edge, or a badge frame would make a different lesson.", image: true }
    ]
  },
  {
    slug: "cartoon-pretzel",
    day: "013",
    date: "Monday, May 18",
    isoDate: "2026-05-18",
    subject: "a soft pretzel",
    headlineSubject: "a soft pretzel",
    shortSubject: "a soft pretzel",
    lessonTitle: "Let's draw a soft pretzel",
    description: "Learn how to draw a soft pretzel with one continuous dough rope, two upper openings, one lower opening, a clear over-under crossing, two bake creases, eight coarse salt grains, a shallow shadow, thick black outlines, and natural marker color.",
    intro: "Map one classic pretzel from a broad belly curve, two loop guides, and a single center crossing, then turn that route into a thick continuous dough rope before adding salt and toasted color. This honest archive lesson is a newly made overlap exercise, not a claim about earlier visitors, comments, activity, or popularity.",
    time: 15,
    difficulty: "Easy",
    accent: "#a96025",
    finished: "cartoon-pretzel-finished-v1.jpg",
    finishedAlt: "Handmade face-free marker drawing of one classic soft pretzel centered front-on with one continuous toasted-caramel dough rope, exactly two upper openings and one lower opening, a clear central over-under crossing, two tapered arms, exactly two dark-umber bake creases on the lower belly, exactly eight irregular warm-cream salt grains, thick imperfect black outlines, visible natural-brown marker streaks and paper gaps, and one small broken black-gray oval shadow",
    materials: ["Pencil and eraser", "Drawing paper", "Black and natural-brown colored markers"],
    materialNote: "Use pencil for the belly curve, two loops, central crossing, continuous dough rope, three openings, bake creases, eight salt grains, and shadow, then outline with black marker and fill with toasted caramel, dark umber, and warm cream.",
    tipLabel: "Marker tip",
    steps: [
      { name: "Map the belly and two loops", text: "Place one pale broad belly curve, exactly two upper loop ovals, and one central crossing map for the continuous pretzel path.", tip: "Ghost both loop ovals before touching down and compare the two heart-shaped gaps above the crossing. Keep the center pale so the over-under order can still be adjusted." },
      { name: "Wrap one thick dough rope", text: "Build one continuous rounded dough band around the guides, preserving exactly two upper openings and one lower opening.", tip: "Keep the rope thickness close to the width of your fingertip throughout. Squint and compare all three openings instead of tracing the outer edge alone." },
      { name: "Set the over-under knot", text: "Clarify the central over-under line breaks, taper the two upper arms where they land on the belly, and add exactly two shallow bake creases to the lower arc.", tip: "Choose the arm that passes on top, darken only its visible edges, and stop the hidden arm cleanly underneath. Two crisp line breaks explain the knot better than extra contour lines." },
      { name: "Scatter salt and ground the shape", text: "Add exactly eight irregular salt shapes across the established dough and one small broken oval shadow beneath the pretzel.", tip: "Place the first four salt grains far apart, then use the remaining four to balance empty areas. Vary their angles and sizes so they feel sprinkled rather than stamped." },
      { name: "Ink the toasted pretzel colors", text: "Thicken all established keeper lines, fill the dough toasted caramel, add dark-umber baked edges and overlap accents, color all eight salt grains warm cream, and fill the shadow black-gray.", tip: "Pull marker strokes around the loop direction instead of straight across the dough. Leave a few paper gaps in the brown fill and let it dry before reinforcing the black edge." },
      { name: "Toast the bold finish", text: "Strengthen the keeper outlines and clarify the established continuous rope, three openings, knot breaks, two bake creases, eight salt grains, natural marker fills, paper gaps, and shadow.", tip: "Count two upper openings, one lower opening, two creases, and eight salt grains, then stop. You can vary the salt placement or brown tones, but a face, plate, mustard, dipping sauce, sticker edge, or badge frame would make a different lesson.", image: true }
    ]
  },
  {
    slug: "badminton-shuttlecock-in-motion",
    day: "079",
    date: "Thursday, July 23",
    isoDate: "2026-07-23",
    subject: "a badminton shuttlecock in motion",
    headlineSubject: "a badminton shuttlecock<br>in motion",
    shortSubject: "a badminton shuttlecock",
    lessonTitle: "Let's draw a badminton shuttlecock in motion",
    description: "Learn how to draw a badminton shuttlecock in motion with a rounded cork, flared skirt, six broad feathers, root spokes, a binding band, notched tips, speed arcs, thick black outlines, and bright marker color.",
    intro: "Aim one cork-and-center-line construction through a flared skirt, divide that skirt into six bold feathers, then add the binding, motion, shadow, and bright marker fills. The useful skill is comparing the six wedge-shaped negative spaces so a repeated fan stays lively without drifting out of rhythm.",
    time: 15,
    difficulty: "Intermediate",
    accent: "#18aaa9",
    finished: "badminton-shuttlecock-in-motion-finished-v1.jpg",
    finishedAlt: "Handmade face-free marker drawing of one badminton shuttlecock flying diagonally from lower left to upper right with a coral rounded cork, exactly six broad cyan feather vanes, six black feather-root spokes, one curved yellow binding band, six notched feather tips, exactly two black speed arcs, white marker-highlight gaps, thick imperfect black outlines, and a small oval black shadow",
    materials: ["Pencil and eraser", "Drawing paper", "Black and colored markers"],
    materialNote: "Use pencil for the cork, center axis, flared skirt, six-feather division, binding, motion, and shadow placement, then outline with black marker and fill the established shapes with coral, cyan, and yellow.",
    tipLabel: "Marker tip",
    steps: [
      { name: "Aim the cork and center line", text: "Draw one light diagonal center axis from lower left to upper right, then place a rounded cork cap at its lower end.", tip: "Ghost the flight line twice before touching down and let it pass through the cork's center. Keep both marks pale so the later silhouette can replace them cleanly." },
      { name: "Open the feather skirt", text: "Add one flared conical skirt around the center axis and connect its narrow end cleanly to the established cork cap.", tip: "Rotate the page for the two long skirt edges and pull each in one confident pass. Compare the open wedge on both sides of the center line before closing the rim." },
      { name: "Divide six feather vanes", text: "Split the established skirt into exactly six broad feather vanes with six related center shafts and small notches at the outer tips.", tip: "Mark all six tip positions along the rim before drawing inward. Count the six wedges, then compare their widths instead of trying to make them mechanically identical." },
      { name: "Bind the feathers and show flight", text: "Ink the existing silhouette, add one curved binding band and six short root spokes above the cork, then draw exactly two speed arcs and one small oval shadow.", tip: "Turn the page so the binding curve can be pulled in one relaxed stroke. Reserve the band area before darkening the spokes, and keep both speed arcs parallel to the flight path." },
      { name: "Ink and fill the flight colors", text: "Thicken every established contour, fill the cork coral, fill all six feathers cyan with visible streaks and white paper gaps, and color the binding band yellow.", tip: "Pull each cyan stroke from the binding toward its feather tip so the fill follows the fan. Let the color dry before reinforcing the black feather edges." },
      { name: "Snap the shuttlecock into focus", text: "Strengthen the keeper outlines and clarify the established cork, six feathers, six root spokes, yellow band, two speed arcs, marker fills, highlights, and shadow.", tip: "Count six feathers, six root spokes, and two speed arcs, then stop. A face, racket, hand, net, player, lettering, sticker edge, or badge frame would crowd the clean flying silhouette.", image: true }
    ]
  },
  {
    slug: "cartoon-harmonica",
    day: "014",
    date: "Tuesday, May 19",
    isoDate: "2026-05-19",
    subject: "a harmonica",
    headlineSubject: "a harmonica",
    shortSubject: "a harmonica",
    lessonTitle: "Let's draw a harmonica",
    description: "Learn how to draw a harmonica with a rounded three-quarter body, layered cover plates, two end caps, eight mouth holes, two screws, two cover seams, three sound arcs, thick black outlines, and bright marker color.",
    intro: "Build one low rounded box, layer the cover plates and end caps, divide the near edge into eight mouth holes, then add the hardware, sound, shadow, and bright marker fills. This honest archive lesson is a fresh repetition-and-perspective exercise, not a claim about earlier visitors, comments, activity, or popularity.",
    time: 20,
    difficulty: "Intermediate",
    accent: "#e63272",
    finished: "cartoon-harmonica-finished-v1.jpg",
    finishedAlt: "Handmade face-free marker drawing of one harmonica in low three-quarter view with a raspberry rounded top cover, cyan mouth band, exactly eight dark cool-gray rectangular mouth holes, two bright-yellow end caps, two round gray screws, two black cover seams, exactly three curved black sound arcs, white highlight gaps, thick imperfect black outlines, and a wide violet oval shadow",
    materials: ["Pencil and eraser", "Drawing paper", "Black and colored markers"],
    materialNote: "Use pencil for the long body, cover plates, end caps, eight-hole rhythm, screws, seams, sound arcs, and shadow, then outline with black marker and fill the established shapes with raspberry, cyan, yellow, cool gray, and violet.",
    tipLabel: "Marker tip",
    steps: [
      { name: "Block the low music box", text: "Draw one light center axis and wrap it with a long low rounded box in a gentle three-quarter view, reserving a compact footprint at each end.", tip: "Ghost both long edges before touching down and compare the narrow band of paper between them. Keep both end areas pale so the caps can cover those corners without burying finished detail." },
      { name: "Layer the covers and end caps", text: "Add the rounded top cover, the lower mouth band, and exactly two compact end caps around the established body.", tip: "Rotate the page for each long cover edge and pull it in one confident pass. Check that both caps meet the body rather than floating beyond it." },
      { name: "Divide eight mouth holes", text: "Place exactly eight rectangular openings in one even row along the near edge between the two established end caps.", tip: "Mark the first and eighth holes, divide the remaining distance by eye, and keep the small cyan spaces between holes wider than the black outline." },
      { name: "Add hardware and a bright note", text: "Ink the existing silhouette, add exactly two round screws and two short top-cover seams, then draw exactly three sound arcs and one shallow oval shadow.", tip: "Keep the two screws near opposite ends and pull the three sound arcs as a related family. Leave a slim highlight path on the cover before the marker fills arrive." },
      { name: "Ink and color the harmonica", text: "Thicken every established contour and fill the top raspberry, mouth band cyan, both end caps yellow, all eight holes and both screws cool gray, and the shadow violet.", tip: "Pull marker strokes along the instrument's length so the streaks reinforce the perspective. Let each bright color dry before strengthening the neighboring black edge." },
      { name: "Play up the bold finish", text: "Strengthen the keeper outlines and clarify the established cover plates, two caps, eight holes, two screws, two seams, three sound arcs, marker fills, highlights, and shadow.", tip: "Count eight mouth holes, two screws, two seams, and three sound arcs, then stop. A face, lettering, musical-note symbol, hand, microphone, sticker edge, or badge frame would crowd the clean instrument shape.", image: true }
    ]
  },
  {
    slug: "comic-ray-gun",
    day: "078",
    date: "Wednesday, July 22",
    isoDate: "2026-07-22",
    subject: "a comic ray gun",
    headlineSubject: "a comic ray gun",
    shortSubject: "a comic ray gun",
    lessonTitle: "Let's draw a comic ray gun",
    description: "Learn how to draw a retro comic ray gun with a chunky rounded body, long barrel, flared muzzle, angled grip, trigger guard, control knobs, coils, action rays, sparks, thick black outlines, and bright marker color.",
    intro: "Aim one barrel axis through a chunky body, build a clearly fictional space-age silhouette around it, then add the controls, coils, energy marks, and bright marker fills. The useful skill is keeping several ellipses on one shared barrel axis so the muzzle looks lively without drifting out of alignment.",
    time: 20,
    difficulty: "Intermediate",
    accent: "#18aaa9",
    finished: "comic-ray-gun-finished-v1.jpg",
    finishedAlt: "Handmade face-free marker drawing of one clearly fictional retro comic ray gun angled from lower left to upper right with a cyan rounded body, yellow barrel, raspberry flared muzzle and grip, gray rear cap, trigger guard and curved trigger, two yellow control knobs, three body seams, two barrel coils, two yellow action rays, three yellow sparks, white highlight gaps, thick imperfect black outlines, and violet ground shadow",
    materials: ["Pencil and eraser", "Drawing paper", "Black and colored markers"],
    materialNote: "Use pencil for the barrel axis, rounded body, muzzle ellipses, grip, trigger guard, and control placement, then outline with black marker and fill the established shapes with cyan, raspberry, yellow, cool gray, and violet.",
    tipLabel: "Marker tip",
    steps: [
      { name: "Set the ray-gun guides", text: "Draw one light diagonal barrel axis, place the rounded body block and flared-muzzle ellipses on it, then add the grip wedge, trigger-guard reserve, rear cap, and two knob footprints.", tip: "Ghost the full barrel axis before touching down and keep every muzzle ellipse centered on it. Reserve the trigger and knob spaces so you do not ink body seams that those parts will cover." },
      { name: "Shape the space-age prop", text: "Wrap the guides with the long barrel, flared muzzle, rounded body, angled grip, trigger guard, and rear cap while preserving the same diagonal pose.", tip: "Rotate the page for the barrel edges and pull them in confident passes. Compare the open trigger-guard space with the grip width so the lower half stays readable." },
      { name: "Build the comic hardware", text: "Add the curved trigger, exactly two control knobs, three body seams, exactly two barrel coils, and double muzzle rings inside the completed silhouette.", tip: "Repeat the two coils as related loops around the shared barrel axis, then count the two knobs before moving on. Let the hardware stay a little uneven so it feels drawn by hand." },
      { name: "Add the comic energy", text: "Draw exactly two tapered action rays from the muzzle, exactly three small sparks, narrow white highlight gaps, and one violet ground-shadow shape around the established prop.", tip: "Vary the three spark sizes and aim the two rays along the same outward burst. Leave the highlights as clean paper gaps now instead of trying to paint white over wet marker later." },
      { name: "Ink and color the ray gun", text: "Thicken every established contour and fill the body cyan, the barrel and accents yellow, the muzzle and grip raspberry, the hardware cool gray, and the shadow violet.", tip: "Pull marker strokes along the barrel and around the body curve so the streaks reinforce the form. Let each color area dry before strengthening the nearby black edges." },
      { name: "Charge the comic finish", text: "Strengthen the keeper outlines and clarify the established trigger, two knobs, three seams, two coils, two rays, three sparks, marker fills, highlights, and shadow.", tip: "Count two knobs, two coils, two action rays, and three sparks, then stop. A face, hand, target, sound-effect word, extra prop, sticker edge, or badge frame would crowd the clean retro silhouette.", image: true }
    ]
  },
  {
    slug: "cartoon-fire-hydrant",
    day: "015",
    date: "Wednesday, May 20",
    isoDate: "2026-05-20",
    subject: "a fire hydrant",
    headlineSubject: "a fire hydrant",
    shortSubject: "a fire hydrant",
    lessonTitle: "Let's draw a fire hydrant",
    description: "Learn how to draw a fire hydrant with a domed cap, cylindrical body, two ringed side nozzles, wide base flange, four visible bolts, three water drops, thick black outlines, and bright felt-tip marker color.",
    intro: "Stack a domed cap, sturdy cylinder, and wide base on one center axis, then build the paired nozzles and bolt rhythm before adding bright marker color. This honest archive lesson is a fresh shape-and-hardware exercise, not a claim about earlier visitors, comments, activity, or popularity.",
    time: 20,
    difficulty: "Intermediate",
    accent: "#ef3d32",
    finished: "cartoon-fire-hydrant-finished-v1.jpg",
    finishedAlt: "Handmade face-free marker drawing of one front-facing fire hydrant with a fire-engine-red domed cap and cylindrical body, yellow neck band and wide base flange, two cool-gray ringed side nozzles, central body seam, exactly four visible gray base bolts, exactly three turquoise water drops, thick imperfect black outlines, white highlight gaps, and a violet ground shadow",
    materials: ["Pencil and eraser", "Drawing paper", "Black and colored markers"],
    materialNote: "Use pencil for the center axis, cap, body, nozzle, flange, bolt, drop, and shadow construction, then outline with black marker and fill only the established shapes with red, yellow, turquoise, cool gray, and violet.",
    tipLabel: "Marker tip",
    steps: [
      { name: "Stack the hydrant guides", text: "Draw one light center axis, stack a domed-cap ellipse over a cylindrical body and wide base flange, then reserve two side-nozzle footprints, exactly four bolt positions, a three-drop zone, and one shadow shape.", tip: "Ghost the top and base ellipses before touching down. Compare the paper on both sides of the body and keep the nozzle, bolt, drop, and shadow reserves pale." },
      { name: "Shape the sturdy hydrant", text: "Wrap the guides with the domed top, cylindrical body, two side nozzles, neck band, and wide base flange while preserving the same front view.", tip: "Turn the page for the long body edges and pull them in confident passes. Keep the cap and base ellipses related so the hydrant feels planted instead of top-heavy." },
      { name: "Build the caps and bolts", text: "Add the top-cap seam, two ringed nozzle caps, central body seam, and exactly four visible bolts along the established base flange.", tip: "Repeat the nozzle rings as related shapes without forcing perfect symmetry. Count four base bolts before darkening their hexagonal edges." },
      { name: "Add the water accents", text: "Draw exactly three small water drops beside one nozzle, preserve narrow white highlight gaps, and fill the planned violet ground-shadow shape beneath the established hydrant.", tip: "Vary the three drops slightly but keep them clear of the nozzle edge. Leave the highlight gaps as clean paper now instead of trying to paint white over marker later." },
      { name: "Ink and color the hydrant", text: "Thicken every established contour and fill the body red, cap band and base yellow, water drops turquoise, hardware cool gray, and shadow violet.", tip: "Pull red strokes vertically down the body and curve them around the dome. Let the bright areas dry before reinforcing the nearby black seams and rings." },
      { name: "Turn up the hydrant finish", text: "Strengthen the keeper outlines and clarify the established silhouette, cap seams, two nozzles, four bolts, three drops, marker fills, highlight gaps, and shadow.", tip: "Count two nozzles, four visible bolts, and three water drops, then stop. A face, hose, dog, street, lettering, second hydrant, sticker edge, or badge frame would crowd the sturdy single-subject design.", image: true }
    ]
  },
  {
    slug: "cartoon-scissors",
    day: "077",
    date: "Tuesday, July 21",
    isoDate: "2026-07-21",
    subject: "a pair of scissors",
    headlineSubject: "a pair of<br>scissors",
    shortSubject: "scissors",
    lessonTitle: "Let's draw a pair of scissors",
    description: "Learn how to draw cartoon scissors with two open blades, rounded handle loops, a pivot screw, grip bands, blade bevels, snip sparks, motion marks, thick black outlines, and bright felt-tip marker color.",
    intro: "Cross two blade guides through one sturdy pivot, wrap them with big handle loops, then add the bevels, grip bands, comic snip marks, and bright marker color. The useful skill is checking the two negative spaces inside the handles so the tool stays balanced even at a lively diagonal.",
    time: 15,
    difficulty: "Easy",
    accent: "#e62f73",
    finished: "cartoon-scissors-finished-v1.jpg",
    finishedAlt: "Handmade face-free marker drawing of one open pair of diagonal scissors with two cool-gray blades, two raspberry rounded handle loops, two turquoise grip bands, one circular gray pivot screw, four yellow snip sparks, two black motion marks, narrow white blade highlights, thick imperfect black outlines, and violet ground shadow",
    materials: ["Pencil and eraser", "Drawing paper", "Black and colored markers"],
    materialNote: "Use pencil for the pivot, blade axes, and handle-loop construction, then outline with black marker and fill the established shapes with raspberry, turquoise, cool gray, yellow, and violet.",
    tipLabel: "Marker tip",
    steps: [
      { name: "Set the scissors guides", text: "Draw one light circular pivot, cross two blade axes through it, then place two rounded handle-loop footprints at the lower-left end.", tip: "Ghost the two blade paths before touching down and compare the open wedge between them. Keep the pivot centered where all four long axes meet." },
      { name: "Shape the open scissors", text: "Wrap the guides with two long blades, two rounded handle loops, and one central pivot hub while preserving the same diagonal angle.", tip: "Rotate the page for each blade edge and pull it in one confident stroke. Compare the paper spaces inside the two handle loops before closing their contours." },
      { name: "Build the loops and blades", text: "Add both inner handle openings, two blade-center bevels, the round pivot screw, and two grip bands inside the completed silhouette.", tip: "Keep each inner opening related to its outer loop instead of forcing a perfect oval. Stop the bevel lines at the pivot so the layered metal reads clearly." },
      { name: "Add the snipping action", text: "Draw exactly four small snip sparks near the blade tips, two short motion marks beside the handle, narrow blade-highlight gaps, and one shallow ground-shadow shape.", tip: "Vary the four spark angles but keep them clear of the blade edges. Leave the highlights as planned paper gaps now so you do not need to paint white over wet marker later." },
      { name: "Ink and color the scissors", text: "Thicken every established contour, fill both handles raspberry, the grip bands turquoise, the blades and pivot cool gray, the four sparks yellow, and the shadow violet.", tip: "Pull the gray strokes along each blade and leave the highlight gaps untouched. Let the color dry before reinforcing the black pivot and inner handle edges." },
      { name: "Sharpen the comic finish", text: "Strengthen the keeper outlines and clarify the established blades, handle loops, bevels, pivot, grip bands, four sparks, two motion marks, marker fills, highlights, and shadow.", tip: "Count two blades, two loops, four sparks, and two motion marks, then stop. Eyes, a smile, hands, paper, lettering, another tool, a sticker edge, or a badge frame would crowd the clear snipping pose.", image: true }
    ]
  },
  {
    slug: "cartoon-camping-tent",
    day: "016",
    date: "Thursday, May 21",
    isoDate: "2026-05-21",
    subject: "a camping tent",
    headlineSubject: "a camping tent",
    shortSubject: "a camping tent",
    lessonTitle: "Let's draw a camping tent",
    description: "Learn how to draw a cartoon camping tent with an A-frame front, sloping roof, open doorway, rolled flap edges, roof seam, zipper, guy lines, stakes, grass tufts, thick black outlines, and bright marker color.",
    intro: "Pitch one triangle against a sloping side plane, reserve the open doorway, then stake the finished shape down with bold marker color and a few simple ground accents. This honest archive lesson is a fresh form-and-overlap exercise, not a claim about earlier visitors, comments, activity, or popularity.",
    time: 20,
    difficulty: "Intermediate",
    accent: "#e63272",
    finished: "cartoon-camping-tent-finished-v1.jpg",
    finishedAlt: "Handmade face-free marker drawing of a three-quarter A-frame camping tent with raspberry roof and side wall, bright-yellow front panel, dark-violet open doorway, two turquoise rolled flap edges with white highlights and ties, black roof seam and zipper, exactly two guy lines, two outer stakes, one front-corner base peg, three green grass tufts, thick imperfect black outlines, and pale-lavender ground shadow",
    materials: ["Pencil and eraser", "Drawing paper", "Black and colored markers"],
    materialNote: "Use pencil for the triangle, roof plane, doorway reserve, and guy-line construction, then outline with black marker and fill the established shapes with raspberry, yellow, turquoise, dark violet, green, and lavender.",
    tipLabel: "Marker tip",
    steps: [
      { name: "Pitch the tent guides", text: "Draw a light front triangle, pull a center ridge into the visible side plane, add the ground line, reserve a large triangular doorway, and mark two outer guy-line stake positions.", tip: "Ghost the ridge before touching down and compare the doorway triangle with the paper around it. Keep that entrance footprint blank so you do not finish front-panel lines that the opening will cover." },
      { name: "Shape the A-frame tent", text: "Wrap the guides with the triangular front, sloping roof, visible side wall, lower hem, and rear corner while preserving the same three-quarter view.", tip: "Rotate the page for the long roof edges and pull each in one confident stroke. Check the empty side-plane shape so the rear corner does not drift too wide." },
      { name: "Open the tent doorway", text: "Add the dark open doorway inside the reserved area, draw two rolled flap edges with small ties, then place the roof-panel seam and front zipper line.", tip: "Draw the doorway first and break hidden front-panel lines cleanly at its edges. Keep both rolled flaps slightly different so the opening feels handmade instead of mirrored." },
      { name: "Stake down the campsite", text: "Connect exactly two guy lines to two outer stakes, add one front-corner base peg, exactly three green grass tufts, and one pale-lavender ground shadow.", tip: "Aim each guy line directly from a tent corner to its stake and keep the front base peg separate. Pull the grass strokes upward in short clusters, then stop at three." },
      { name: "Ink and color the tent", text: "Thicken every established contour, fill the roof and side wall raspberry, the front panel yellow, the flap edges and lower hem turquoise, and the doorway dark violet while preserving narrow paper highlights.", tip: "Pull the raspberry strokes down the roof slope and leave the highlight strip untouched. Let the bright panels dry before reinforcing the black ridge, zipper, and hem." },
      { name: "Brighten the campsite finish", text: "Strengthen the keeper outlines and clarify the established tent silhouette, doorway, flap edges, roof seam, zipper, two guy lines, three stakes, three grass tufts, marker fills, highlights, and shadow.", tip: "Count two guy lines, three stakes, and three grass tufts, then stop. A face, camper, animal, fire, tree, mountain, moon, lettering, extra gear, sticker edge, or badge frame would crowd the clear tent form.", image: true }
    ]
  },
  {
    slug: "cartoon-chess-knight",
    day: "076",
    date: "Monday, July 20",
    isoDate: "2026-07-20",
    subject: "a chess knight",
    headlineSubject: "a chess knight",
    shortSubject: "a chess knight",
    lessonTitle: "Let's draw a chess knight",
    description: "Learn how to draw a cartoon chess knight with a blocky horse-head profile, arched neck, wide pedestal, carved mane blocks, base bands, spark accents, thick black outlines, and bright felt-tip marker color.",
    intro: "Start with one horse-head curve above a stacked pedestal, turn it into the unmistakable knight silhouette, then carve in the mane rhythm and add bright tournament-day marker color. The useful skill is comparing the negative space beneath the muzzle with the outside neck curve so the profile stays bold and balanced.",
    time: 20,
    difficulty: "Intermediate",
    accent: "#18aaa9",
    finished: "cartoon-chess-knight-finished-v1.jpg",
    finishedAlt: "Handmade face-free marker drawing of a left-facing chess knight with turquoise horse-head silhouette, pointed ear, blocky muzzle, arched neck, three raspberry mane blocks with hatch marks, raspberry and yellow pedestal bands, two yellow spark accents, thick imperfect black outlines, white highlight gaps, and violet oval shadow",
    materials: ["Pencil and eraser", "Drawing paper", "Black and colored markers"],
    materialNote: "Use pencil for the head, neck, and pedestal construction, then outline with black marker and fill the established piece with turquoise, raspberry, yellow, and violet.",
    tipLabel: "Marker tip",
    steps: [
      { name: "Set the knight guides", text: "Draw a light horse-head arc, add a blocky muzzle wedge and sweeping neck, then stack two centered pedestal guides below it.", tip: "Ghost the head-to-neck sweep twice before touching down. Compare the empty hook beneath the muzzle with the outer neck curve so the profile does not feel cramped." },
      { name: "Shape the chess-piece silhouette", text: "Wrap the guides with one pointed ear, blocky muzzle, arched neck, and wide pedestal to make a clear left-facing knight.", tip: "Rotate the page for the long back curve and pull it in one confident stroke. Keep the head and base on the same center axis so the piece feels planted." },
      { name: "Carve the knight details", text: "Add the mane notch and three chunky mane blocks, then place the abstract brow cut, nostril groove, inner neck contour, and two base bands.", tip: "Break the outer line cleanly around each mane block instead of drawing through it. Keep the brow and nostril as simple carved notches—no eyeball or smiling face is needed." },
      { name: "Add mane rhythm and sparks", text: "Draw short hatch marks across the three mane blocks, add exactly two small spark accents, and place one shallow oval shadow beneath the base.", tip: "Aim the hatch marks with each mane block rather than making a flat row. You can vary their spacing while keeping both sparks clear of the knight outline." },
      { name: "Ink and color the knight", text: "Thicken every established contour, fill the body turquoise, the mane and upper band raspberry, the lower pedestal yellow, the sparks yellow, and the shadow violet.", tip: "Pull the turquoise strokes down the neck curve and leave narrow paper gaps as shine. Let each bright area dry before reinforcing its black edge so the colors stay clean." },
      { name: "Make the knight game-ready", text: "Strengthen the keeper outlines and clarify the established silhouette, carved details, mane blocks, hatch marks, base bands, two sparks, marker fills, highlights, and shadow.", tip: "Count three mane blocks and two sparks, then stop. A board, second piece, crown, lettering, character face, sticker edge, or badge frame would crowd the strong single-piece silhouette.", image: true }
    ]
  },
  {
    slug: "cartoon-jellyfish",
    day: "017",
    date: "Friday, May 22",
    isoDate: "2026-05-22",
    subject: "a jellyfish",
    headlineSubject: "a colorful<br>jellyfish",
    shortSubject: "a jellyfish",
    lessonTitle: "Let's draw a colorful jellyfish",
    description: "Learn how to draw a cartoon jellyfish with a rounded bell, five scallops, five closed ribbon tentacles, a wavy inner band, three spots, two bubbles, thick black outlines, and bright felt-tip marker color.",
    intro: "Float a simple dome above five planned tentacle paths, turn every path into a closed ribbon shape, then add the bell pattern, bubbles, highlights, and bright marker color. This honest archive lesson is a fresh shape-and-rhythm exercise, not a claim about earlier visitors, comments, activity, or popularity.",
    time: 15,
    difficulty: "Easy",
    accent: "#dd2d75",
    finished: "cartoon-jellyfish-finished-v1.jpg",
    finishedAlt: "Handmade face-free marker drawing of a colorful jellyfish with raspberry rounded bell, turquoise wavy lower band, five scallops, exactly five closed ribbon tentacles colored violet-yellow-violet-yellow-violet, three turquoise oval spots, two pale-blue bubbles, curved white highlight gaps, and thick imperfect black outlines",
    materials: ["Pencil and eraser", "Drawing paper", "Black and colored markers"],
    materialNote: "Use pencil for the bell, five scallops, five ribbon-tentacle paths, spots, and bubbles, then outline with black marker and fill the established shapes with raspberry, turquoise, violet, yellow, and pale blue.",
    tipLabel: "Marker tip",
    steps: [
      { name: "Float the jellyfish guides", text: "Draw a light rounded bell and center axis, place a five-scallop skirt guide, then sweep exactly five tentacle paths and reserve two bubble positions.", tip: "Ghost all five tentacle paths before touching down and vary their curves without letting them cross. Mark the rounded tips early so every ribbon has a clear destination." },
      { name: "Shape the floating silhouette", text: "Wrap the bell guide with five lower scallops, then turn every center path into one wide closed tentacle ribbon with two edges and a rounded tip.", tip: "Work one tentacle at a time from scallop to tip, then return along the second edge. Count five closed ribbons before moving on; an open centerline will be hard to color cleanly later." },
      { name: "Build the bell pattern", text: "Preserve all five tentacles, add the wavy inner bell band, draw exactly three oval spots, and break hidden lines cleanly at each scallop overlap.", tip: "Follow the bell curve with the inner band instead of making a flat stripe. Keep the three spots uneven in size so the pattern feels playful without becoming a face." },
      { name: "Add bubbles and highlights", text: "Clarify the two bubble rims with small highlight dots, then add curved paper-white highlight gaps across the established bell and tentacles.", tip: "Place each highlight inside an existing colored shape and curve it with that form. You can vary the highlight lengths while keeping the jellyfish face-free and easy to read." },
      { name: "Ink and color the jellyfish", text: "Thicken every established contour, fill the upper bell raspberry, the lower band and three spots turquoise, the tentacles violet-yellow-violet-yellow-violet, and the two bubbles pale blue.", tip: "Pull marker strokes down each tentacle all the way to its rounded tip. Let neighboring colors dry before reinforcing the black gaps so the five ribbons remain separate." },
      { name: "Let the jellyfish glow", text: "Strengthen the keeper outlines and clarify the established bell, five scallops, five closed tentacles, inner band, spots, two bubbles, marker fills, highlights, and overlaps.", tip: "Count five closed tentacles, three spots, and two bubbles, then stop. Eyes, a smile, fish, coral, seaweed, ocean scenery, sticker edges, or a badge frame are not needed.", image: true }
    ]
  },
  {
    slug: "cartoon-ice-cream-truck",
    day: "075",
    date: "Sunday, July 19",
    isoDate: "2026-07-19",
    subject: "an ice-cream truck",
    headlineSubject: "an ice-cream<br>truck",
    shortSubject: "an ice-cream truck",
    lessonTitle: "Let's draw an ice-cream truck",
    description: "Learn how to draw a cartoon ice-cream truck with a boxy body, sloped cab, two wheels, open serving window, striped awning, shelf, cone symbol, motion marks, thick black outlines, and bright marker color.",
    intro: "Start with a friendly box-on-wheels silhouette, reserve the big serving window, then add the awning, shelf, no-text cone symbol, motion marks, and summery marker color. The truck is useful practice for keeping two wheels aligned while fitting smaller features onto one clear side plane.",
    time: 20,
    difficulty: "Challenge",
    accent: "#20a9a6",
    finished: "cartoon-ice-cream-truck-finished-v1.jpg",
    finishedAlt: "Handmade face-free marker drawing of a turquoise cartoon ice-cream truck with exactly two black wheels, pale-blue cab windows, one yellow headlight, large open serving window, raspberry-and-yellow striped awning, yellow shelf, small pink-and-orange cone symbol, bright body stripes, two motion marks, thick imperfect black outlines, and road shadow",
    materials: ["Pencil and eraser", "Drawing paper", "Black and colored markers"],
    materialNote: "Use pencil for the truck, two wheels, cab, and serving-window construction, then outline with black marker and fill the established shapes with turquoise, raspberry, yellow, orange, pink, pale blue, gray, and black.",
    tipLabel: "Marker tip",
    steps: [
      { name: "Park the truck guides", text: "Draw a light cargo-body box, add a sloped cab wedge, exactly two wheel circles, a large blank serving-window reserve, and one shallow ground axis.", tip: "Ghost the ground axis first and place both wheel centers on it. Compare the two paper gaps above the wheels before drawing the body so the truck does not sag." },
      { name: "Shape the rolling silhouette", text: "Wrap the guides with the cab, cargo body, wheel arches, exactly two tires, and simple front and rear bumpers.", tip: "Rotate the page for the long roof and lower edge, then pull each in one confident stroke. Keep the big serving-window area empty rather than detailing siding that will be covered." },
      { name: "Open the serving side", text: "Add the windshield, side cab window, one headlight, large serving window, striped awning, and serving shelf inside the reserved areas.", tip: "Draw the window opening before the awning, then let the awning overlap its top edge. Break hidden body lines cleanly instead of drawing them through the open space." },
      { name: "Add the playful truck details", text: "Draw one small no-text cone symbol, the door seam and handle, two hubcaps, a few body stripes, two short motion marks, and one road shadow.", tip: "Keep the cone symbol simple and compare the two hubcap circles before darkening them. You can change the stripe rhythm later without changing the truck structure." },
      { name: "Ink and color the ice-cream truck", text: "Trace every established contour with thick black marker, then fill the body turquoise, awning and stripes raspberry and yellow, cone symbol pink and orange, windows pale blue, and tires dark.", tip: "Let the pale-blue windows dry before reinforcing their black frames. Pull the turquoise strokes along the side panel and leave narrow paper gaps as intentional shine." },
      { name: "Serve up the final truck", text: "Strengthen the keeper outlines and clarify the established windows, awning, shelf, wheels, cone symbol, stripes, motion marks, marker fills, highlights, and road shadow.", tip: "Count exactly two visible wheels and check that the serving window stays open, then stop. Faces, prices, menus, logos, people, a street scene, or a border would only clutter the truck.", image: true }
    ]
  },
  {
    slug: "angel-halo-with-wings",
    day: "018",
    date: "Saturday, May 23",
    isoDate: "2026-05-23",
    subject: "an angel halo with wings",
    headlineSubject: "an angel halo<br>with wings",
    shortSubject: "a halo with wings",
    lessonTitle: "Let's draw an angel halo with wings",
    description: "Learn how to draw an angel halo with wings using a tilted oval ring, two balanced wing shapes, three feather layers per wing, sparkle bursts, motion marks, thick black outlines, and bright marker fills.",
    intro: "Float one tilted halo above a matched pair of small wings, then split each wing into broad feather layers before adding sparkle, motion, and marker color. This honest archive lesson is a fresh symbol-drawing exercise, not a claim about earlier visitors, comments, activity, or popularity.",
    time: 15,
    difficulty: "Easy",
    accent: "#f4b51f",
    finished: "angel-halo-with-wings-finished-v1.jpg",
    finishedAlt: "Handmade face-free marker drawing of one golden-yellow tilted angel halo above two pale-blue and lavender wings with three broad feather layers each, exactly three raspberry sparkle bursts, short black lift marks, a lavender floating shadow, white highlight gaps, and thick imperfect black outlines",
    materials: ["Pencil and eraser", "Drawing paper", "Black and colored markers"],
    materialNote: "Use pencil for the halo ellipses and wing envelopes, then outline with black marker and fill the established halo, wings, sparkles, and shadow with golden yellow, pale blue, lavender, and raspberry.",
    tipLabel: "Marker tip",
    steps: [
      { name: "Float the halo guides", text: "Draw a light tilted outer ellipse with a matching inner ellipse, then place two outward-sweeping wing axes and simple wing envelopes below it.", tip: "Ghost both halo ellipses before touching down and keep the inner opening evenly nested. Mark the two wing tips before drawing their curves so the spacing feels balanced." },
      { name: "Shape the halo and wings", text: "Wrap the guides with one thick halo ring and two rounded wing silhouettes, keeping the center gap open.", tip: "Rotate the page for the halo curves and draw each in one relaxed pass. Let the wings feel related without forcing them into mechanical mirror images." },
      { name: "Layer the wing feathers", text: "Divide each established wing into exactly three broad feather layers and clarify the inner halo opening.", tip: "Place the feather tips first, then connect them back toward each wing base. Break hidden lines where one feather layer overlaps the next instead of drawing through it." },
      { name: "Add the floating sparkle", text: "Add exactly three small sparkle bursts, a few short lift marks, and one shallow floating shadow around the halo and wings.", tip: "Keep the sparkles separated from the main contours and aim the motion marks outward. You can vary their angles while keeping the count and open composition clear." },
      { name: "Ink and color the angel symbol", text: "Thicken every established contour with black marker, fill the halo golden yellow, shade the wings pale blue and lavender, add raspberry sparkles, and tint the floating shadow.", tip: "Pull the wing color from base toward feather tip and leave a few narrow paper highlights. Let each fill dry before touching its black edge again." },
      { name: "Make the halo glow", text: "Strengthen the keeper outlines and clarify the established halo, feather layers, sparkles, lift marks, marker fills, highlights, and floating shadow.", tip: "Count one halo, two wings, three feather layers per wing, and three sparkles, then stop. A head, face, figure, words, enclosing outline, sticker edge, or badge frame is not needed.", image: true }
    ]
  },
  {
    slug: "cartoon-cowboy-hat",
    day: "074",
    date: "Saturday, July 18",
    isoDate: "2026-07-18",
    subject: "a cowboy hat",
    headlineSubject: "a cowboy hat",
    shortSubject: "a cowboy hat",
    lessonTitle: "Let's draw a cowboy hat",
    description: "Learn how to draw a cowboy hat with a tilted wide brim, curled sides, tapered crown, center dent, side pinches, visible underside, simple hatband and buckle, thick black marker outlines, and bright handmade color.",
    intro: "Begin with one sweeping brim and a tall crown envelope, then pinch the familiar western shape before wrapping on the band and marker color. The three-quarter tilt makes this useful practice for overlaps: the near brim crosses the crown base, but every visible edge still has a clear job.",
    time: 20,
    difficulty: "Intermediate",
    accent: "#e79a22",
    finished: "cartoon-cowboy-hat-finished-v1.jpg",
    finishedAlt: "Handmade marker drawing of a face-free cowboy hat with a wide curled golden-orange brim, tall dented crown, raspberry underside, teal hatband, square yellow buckle, short stitch marks, and thick imperfect black outlines",
    materials: ["Pencil and eraser", "Drawing paper", "Black and colored markers"],
    materialNote: "Use pencil for the brim and crown construction, then outline with black marker and fill the established hat with golden orange, raspberry, teal, and yellow.",
    tipLabel: "Marker tip",
    steps: [
      { name: "Sweep the hat gesture", text: "Draw a light tilted brim sweep, add a centered crown axis, and place a tall tapered crown envelope above it.", tip: "Ghost the brim curve twice before touching down. Keep both curled ends related to that one sweep so the hat feels tipped, not twisted." },
      { name: "Shape the western silhouette", text: "Wrap one readable contour around the guides to form the wide front brim, two upturned sides, and tapered crown.", tip: "Rotate the page for each long brim edge and pull the line in one confident pass. A little unevenness helps the marker finish feel handmade." },
      { name: "Pinch the crown and brim", text: "Add the center crown dent, two side pinches, the front brim overlap, and the visible underside edge.", tip: "Compare the two empty spaces beside the center dent rather than forcing symmetry. Break the crown-base line wherever the near brim clearly crosses it." },
      { name: "Wrap the hatband", text: "Draw a simple band around the established crown base, then add one square buckle and a few short stitch accents.", tip: "Follow the crown's curve instead of drawing a flat horizontal strip. You can change the buckle shape or stitch rhythm while keeping the band easy to read." },
      { name: "Ink and color the hat", text: "Thicken every established contour with black marker, then fill the crown and upper brim golden orange, the underside raspberry, the band teal, and the buckle yellow.", tip: "Let each area dry before touching the black edge again. Pull the fill strokes along the brim and leave a few narrow paper gaps as intentional highlights." },
      { name: "Tip the hat to the finish", text: "Strengthen the keeper outlines and clarify the established dents, brim overlap, band, buckle, stitch marks, marker fills, and highlight gaps.", tip: "Check that the band still wraps behind the buckle and the raspberry underside stays inside its existing edge. Stop before adding a face, head, boots, rope, text, or border.", image: true }
    ]
  },
  {
    slug: "bowling-ball-and-pins",
    day: "019",
    date: "Sunday, May 24",
    isoDate: "2026-05-24",
    subject: "a bowling ball and pins",
    headlineSubject: "a bowling ball<br>and pins",
    shortSubject: "a bowling ball and pins",
    lessonTitle: "Let's draw a bowling ball and pins",
    description: "Learn how to draw a bowling ball and three pins with a clear triangular cluster, three finger holes, paired neck bands, motion arcs, a compact impact burst, thick black marker outlines, and bright handmade color.",
    intro: "Place one ball beside a clearly countable three-pin cluster, then add the holes, bands, motion, burst, and bold marker color without changing the equipment count. This honest archive lesson is a fresh comic-action exercise, not a claim about earlier visitors, scores, comments, activity, or popularity.",
    time: 20,
    difficulty: "Intermediate",
    accent: "#7041a8",
    finished: "bowling-ball-and-pins-finished-v1.jpg",
    finishedAlt: "Handmade marker drawing of one purple bowling ball with three cyan finger holes beside exactly three white bowling pins with paired raspberry neck bands, two black motion arcs, a compact yellow impact burst behind the pin cluster, a shallow black baseline, and cyan lane accents",
    materials: ["Pencil and eraser", "Drawing paper", "Black and colored markers"],
    materialNote: "Use pencil to place the ball and exactly three pins, then outline with black marker and fill the established ball, holes, pin bands, impact burst, and lane accents with purple, cyan, raspberry, and yellow.",
    tipLabel: "Marker tip",
    steps: [
      { name: "Set the strike path", text: "Draw one light ball circle at the left and place exactly three pin axes and simple envelopes in a triangular cluster at the right.", tip: "Count all three pin heads and bases before moving on. Leave a small paper gap beside the ball so none of the pin silhouettes disappears behind it." },
      { name: "Shape the ball and pins", text: "Wrap the guides with one round ball silhouette and exactly three complete bowling-pin silhouettes, keeping the front pin centered between the rear pair.", tip: "Draw the outside edges of the rear pins first, then fit the front pin between them. Comparing the two negative spaces helps the cluster stay readable." },
      { name: "Add holes and pin bands", text: "Add exactly three angled finger holes to the ball, paired neck bands to each pin, and short separation lines where the pins overlap.", tip: "Turn the three holes as a group so they suggest one rolling orientation. On the pins, follow each neck curve instead of drawing the bands as flat horizontal bars." },
      { name: "Show the strike motion", text: "Add two curved motion arcs behind the ball, one compact impact burst behind the pins, and one shallow lane baseline.", tip: "Ghost both motion arcs before drawing them, then keep the burst behind the pin edges. The burst can change size or rhythm without becoming a frame around the subject." },
      { name: "Ink and color the strike", text: "Thicken the established contours with black marker, fill the ball purple, holes cyan, all three pin bands raspberry, and the impact burst yellow, then add small cyan lane accents.", tip: "Fill the purple ball with strokes that follow its round edge and let each area dry before reinforcing black lines. Leave the pin bodies mostly paper-white for contrast." },
      { name: "Roll in the final strike", text: "Strengthen the keeper outlines and clarify the established ball, three pins, holes, bands, motion arcs, impact burst, baseline, marker fills, and highlight gaps.", tip: "Count one ball, three holes, and exactly three pins, then stop. A face, score, logo, crowd, shoe, sticker border, or badge frame would only muddy the action.", image: true }
    ]
  },
  {
    slug: "cartoon-thumbs-up-hand",
    day: "073",
    date: "Friday, July 17",
    isoDate: "2026-07-17",
    subject: "a cartoon thumbs-up hand",
    headlineSubject: "a cartoon<br>thumbs-up hand",
    shortSubject: "a thumbs-up hand",
    lessonTitle: "Let's draw a cartoon thumbs-up hand",
    description: "Learn how to draw a cartoon thumbs-up hand with one raised thumb, four folded fingers, clear overlap lines, a simple cuff, comic emphasis rays, thick black outlines, and bright marker fills.",
    intro: "For World Emoji Day, build one clear thumbs-up gesture from a palm block and folded-finger mass, then separate the fingers before adding the cuff, comic rays, and bright marker color. The anatomy makes this a useful challenge, but the chunky shapes keep it playful and forgiving.",
    time: 20,
    difficulty: "Challenge",
    accent: "#f4b51f",
    finished: "cartoon-thumbs-up-hand-finished-v1.jpg",
    finishedAlt: "Handmade face-free marker drawing of an upright golden-yellow cartoon thumbs-up hand with exactly four folded fingers, one raised thumb, orange shadow accents, a teal cuff, three teal comic rays, and thick black outlines",
    materials: ["Drawing paper", "Black marker", "Golden-yellow, orange, and teal markers"],
    materialNote: "Use black for the confident contours and finger divisions, golden yellow for the hand, orange for restrained lower-edge accents, and teal for the cuff and three established rays.",
    tipLabel: "Doodle tip",
    steps: [
      { name: "Block the hand gesture", text: "Draw a light wrist rectangle and rounded palm, then place one tall thumb axis and four stacked rounded guides inside a compact folded-finger envelope.", tip: "Ghost the thumb direction first and keep the four finger guides close to the palm. Treat their shared outside edge as one simple mass before you worry about dark separations." },
      { name: "Shape the thumbs-up silhouette", text: "Wrap one chunky contour around the wrist, palm, raised thumb, thumb web, and the visible outside edges of all four folded fingers.", tip: "Draw the thumb side in one confident pass, then rotate the page for the finger side. Keep the palm detail blank where the folded fingers sit in front." },
      { name: "Separate the fingers", text: "Clarify the four light finger divisions, then add one simple thumbnail, two knuckle folds, and one curved palm crease inside the established hand.", tip: "Count the finger shapes from top to bottom before darkening anything. Compare the narrow gaps between them so no extra digit sneaks into the gesture." },
      { name: "Add cuff and emphasis", text: "Wrap a simple cuff around the established wrist and place exactly three short comic rays beside the raised thumb.", tip: "Let the cuff echo the wrist angle, then aim the three rays outward like a small burst. You can change the cuff color later without changing the hand structure." },
      { name: "Ink and color the gesture", text: "Trace the established hand, finger, cuff, and ray shapes in thick black marker, then fill the hand golden yellow, add orange lower-edge accents, and color the cuff and rays teal.", tip: "Let the fills dry before reinforcing nearby black lines. Pull the yellow strokes along each finger so the visible marker texture follows the form." },
      { name: "Give the gesture a boost", text: "Strengthen the existing outlines, finger divisions, crease marks, golden-yellow and orange fills, teal cuff, and three comic rays.", tip: "Count one thumb and four folded fingers, then stop. The clear gesture already says plenty without a face, words, border, or extra prop.", image: true }
    ]
  },
  {
    slug: "comic-tornado-swirl",
    day: "020",
    date: "Monday, May 25",
    isoDate: "2026-05-25",
    subject: "a comic tornado swirl",
    headlineSubject: "a comic<br>tornado swirl",
    shortSubject: "a tornado swirl",
    lessonTitle: "Let's draw a comic tornado swirl",
    description: "Learn how to draw a comic tornado swirl with a tapered funnel, four wrapped wind bands, clear front-and-back overlaps, two dust puffs, six debris strokes, thick black outlines, and saturated marker fills.",
    intro: "Start with one tapered spiral, wrap four chunky wind bands around it, then kick up the dust and debris before adding thick outlines and saturated color. This honest archive lesson is a fresh weather-effect prompt, not a claim about earlier attention, comments, or popularity.",
    time: 15,
    difficulty: "Intermediate",
    accent: "#7437c9",
    finished: "comic-tornado-swirl-finished-v1.jpg",
    finishedAlt: "Handmade face-free marker drawing of a tapered comic tornado with three purple wind bands and one cyan wind band, two tan dust puffs, six flying debris strokes, thick black outlines, and white gaps between the bands",
    materials: ["Drawing paper", "Black marker", "Purple, cyan, and tan markers"],
    materialNote: "Use black for the confident funnel, band, dust, and debris contours; color the bands purple, cyan, purple, and purple from top to bottom, then add tan to the two established dust puffs.",
    tipLabel: "Doodle tip",
    steps: [
      { name: "Spin the funnel guide", text: "Draw one light tapered corkscrew gesture that opens wide at the top and narrows into a small oval ground footprint.", tip: "Ghost the whole spiral before touching down. Let each turn shrink gradually so the funnel feels continuous instead of stacked from separate rings." },
      { name: "Shape the tornado cone", text: "Wrap two energetic outer curves around the guide to build a wide curled top, narrow base, and grounded tip.", tip: "Draw each side from top to bottom in one relaxed pass. Compare the white space on both sides of the spiral so the cone stays balanced but still handmade." },
      { name: "Wrap the wind bands", text: "Add four curved wind bands across the existing cone, breaking the rear lines wherever the front arcs overlap.", tip: "Place the band crossings before darkening their edges. Clean line breaks make the bands turn around the funnel without drawing hidden sections underneath them." },
      { name: "Kick up dust and debris", text: "Add two rounded dust puffs around the established base and six short debris strokes beside the existing bands.", tip: "Keep the dust low and aim the six little debris marks along the tornado's spin. Count them once before moving on so the final frames stay consistent." },
      { name: "Ink and color the spin", text: "Thicken the established funnel, bands, dust, and debris, then fill the bands purple, cyan, purple, and purple from top to bottom and the dust puffs tan.", tip: "Leave white gaps between the colored bands and pull your marker strokes around the funnel. The visible streaks should reinforce the circular motion." },
      { name: "Whirl the finish", text: "Strengthen the existing outlines, overlap breaks, marker fills, dust edges, and six debris strokes.", tip: "Check for four wrapped bands, two dust puffs, and six debris marks, then stop. A face, words, landscape, border, or extra weather symbol would only compete with the motion.", image: true }
    ]
  },
  {
    slug: "cartoon-rattlesnake",
    day: "072",
    date: "Thursday, July 16",
    isoDate: "2026-07-16",
    subject: "a cartoon rattlesnake",
    headlineSubject: "a cartoon<br>rattlesnake",
    shortSubject: "a rattlesnake",
    lessonTitle: "Let's draw a cartoon rattlesnake",
    description: "Learn how to draw a cartoon rattlesnake with two overlapping coils, a raised S-curved neck, four rattle segments, mismatched alert eyes, slit pupils, a forked tongue, bold patterns, and bright marker fills.",
    intro: "Start with two grounded coils and one rising S-curve, then build the rattle, alert expression, belly bands, and back diamonds before adding bright marker color. The overlap order makes this a useful challenge: you have to decide which body section sits in front and leave the hidden parts alone.",
    time: 20,
    difficulty: "Challenge",
    accent: "#f28c28",
    finished: "cartoon-rattlesnake-finished-v1.jpg",
    finishedAlt: "Handmade marker drawing of a coiled orange cartoon rattlesnake with a raised S-curved neck, four yellow rattle segments, teal diamond markings, pale yellow belly bands, one wide eye, one squinting eye, slit pupils, inward brows, a forked tongue, and thick black outlines",
    materials: ["Drawing paper", "Black marker", "Orange, yellow, teal, and brown markers"],
    materialNote: "Use black for the confident outlines, orange for the body, yellow for the belly and rattle, teal for the established diamonds, and brown for the slit pupils and tongue.",
    tipLabel: "Doodle tip",
    steps: [
      { name: "Map the coils and rise", text: "Draw two light overlapping coil ellipses, then lift one tall S-curve from their center into a simple head-wedge guide.", tip: "Ghost the S-curve twice before touching down. Keep the two coil ellipses broad and low so the raised neck has room to feel tall." },
      { name: "Build the snake silhouette", text: "Wrap a thick neck around the S-curve, shape the broad rounded head, trace only the visible coil sections, and set a short tail at the back.", tip: "Choose the front coil once and break the lines behind it. Do not finish body sections that the front loop permanently hides." },
      { name: "Stack the rattle", text: "Attach four rounded rattle segments to the established tail and clarify the same front-over-back coil breaks.", tip: "Draw the largest rattle segment nearest the tail and taper the stack toward the tip. Compare each open gap before darkening the outlines." },
      { name: "Aim the alert expression", text: "Add one wide oval eye, one narrow squint, inward brows, slit pupils, and a forked tongue with no smile, then place belly bands and large diamonds on the existing body.", tip: "Set the unequal eye shapes first, then aim both slit pupils forward. The mismatched eyes, angled brows, and tongue carry the attitude without a familiar U-smile." },
      { name: "Ink and color the coils", text: "Trace the established contours in thick black marker, then fill the body orange, belly and rattle yellow, diamonds teal, and eye accents brown.", tip: "Let each color dry before reinforcing a nearby black edge. Pull marker strokes along the coils so the visible streaks turn with the body." },
      { name: "Rattle the finish", text: "Strengthen the existing outlines, coil overlaps, expression, rattle segments, patterns, and orange, yellow, teal, and brown fills.", tip: "Check that the forked tongue stays open, the front coil reads first, and exactly four rattle segments remain visible. Stop before adding sand, rocks, cactus, words, or a border.", image: true }
    ]
  },
  {
    slug: "cartoon-yo-yo-in-motion",
    day: "021",
    date: "Tuesday, May 26",
    isoDate: "2026-05-26",
    subject: "a cartoon yo-yo in motion",
    headlineSubject: "a cartoon yo-yo<br>in motion",
    shortSubject: "a yo-yo in motion",
    lessonTitle: "Let's draw a cartoon yo-yo in motion",
    description: "Learn how to draw a cartoon yo-yo in motion with two offset discs, a center groove and axle, one looping string, a finger loop, inset rings, three motion arcs, thick black outlines, and bright marker fills.",
    intro: "Build the chunky two-disc toy first, then connect one continuous looping string before you add the rim panels, motion arcs, and bright color. This honest archive lesson is a fresh toy-drawing prompt, not a claim about past attention, comments, or popularity.",
    time: 15,
    difficulty: "Easy",
    accent: "#ef3f8f",
    finished: "cartoon-yo-yo-in-motion-finished-v1.jpg",
    finishedAlt: "Handmade face-free marker drawing of a three-quarter cartoon yo-yo with two offset discs, a narrow center groove and axle, one black looping string with an open finger loop, three curved motion arcs, alternating magenta and cyan rim panels, a yellow center ring, and thick outlines",
    materials: ["Drawing paper", "Black marker", "Magenta, cyan, and yellow markers"],
    materialNote: "Use black for the toy, string, and motion contours, magenta and cyan for the alternating rim panels, and yellow for the established center ring.",
    tipLabel: "Doodle tip",
    steps: [
      { name: "Block the yo-yo discs", text: "Draw two light offset round disc guides at a slight three-quarter angle and mark one small centered axle gap between them.", tip: "Ghost both round shapes before touching down. Compare the overlap between the discs rather than trying to make either circle mechanically perfect." },
      { name: "Shape the toy", text: "Build the rounded two-disc silhouette and clear center groove around the guides, keeping the small axle visible.", tip: "Pull each outer arc in one relaxed pass, then rotate the page for the second disc. Keep the center groove narrow enough to read as a gap, not a third disc." },
      { name: "Loop the string", text: "Run one continuous cord from the established axle into a loose upward S-curve and finish it with a small open finger loop.", tip: "Ghost the full string path before drawing it. Follow the cord from the axle to the loop with your eye once to catch accidental breaks or tangles." },
      { name: "Add rings and motion", text: "Place inset rings and chunky alternating panels around the existing rims, then add exactly three curved motion arcs beside the lower swing path.", tip: "Space the rim panels by comparing their negative spaces. Let all three motion arcs echo the same curve so they point in one clear direction." },
      { name: "Ink and color the spin", text: "Trace the established toy, string, rings, panels, and motion arcs in thick black, then fill the rim panels magenta and cyan and the center ring yellow.", tip: "Let the colors dry before reinforcing nearby black edges. Pull the marker around each rim so the visible streaks follow the toy's round form." },
      { name: "Wind up the finish", text: "Strengthen the existing outlines, string curves, inset rings, three motion arcs, and magenta, cyan, and yellow fills.", tip: "Check that the string still connects cleanly to the axle and the drawing remains face-free. Stop before adding a hand, words, a second toy, or a border.", image: true }
    ]
  },
  {
    slug: "cartoon-cow-face",
    day: "071",
    date: "Wednesday, July 15",
    isoDate: "2026-07-15",
    subject: "a cartoon cow face",
    headlineSubject: "a cartoon<br>cow face",
    shortSubject: "a cow face",
    lessonTitle: "Let's draw a cartoon cow face",
    description: "Learn how to draw a cartoon cow face with wide ears, short horns, a big pink muzzle, half-lidded side-looking eyes, one raised brow, a crooked one-tooth grin, irregular black patches, thick outlines, and bright marker fills.",
    intro: "Start with one broad head guide, then add the ears, horns, and muzzle before aiming the eyes sideways and pulling a crooked grin. This cheeky expression is a good reminder that changing eye direction, eyebrow height, and mouth shape can give a simple cartoon a whole personality.",
    time: 20,
    difficulty: "Intermediate",
    accent: "#f04f93",
    finished: "cartoon-cow-face-finished-v1.jpg",
    finishedAlt: "Handmade marker doodle of a front-facing cartoon cow face with half-lidded teal eyes looking sideways, one raised brow, a crooked one-tooth grin, pink muzzle and ears, golden horns, black patches, and thick outlines",
    materials: ["Drawing paper", "Black marker", "Pink, golden-yellow, and teal markers"],
    materialNote: "Use black for the confident contours and patches, pink for the muzzle and ear interiors, golden yellow for the horns, and teal for the side-looking irises.",
    tipLabel: "Doodle tip",
    steps: [
      { name: "Block the cow head", text: "Draw a light broad head that narrows slightly toward the bottom, then place a vertical center guide.", tip: "Ghost both side curves before touching down. Compare the empty space on either side of the center guide instead of trying to make the outline mechanically perfect." },
      { name: "Add ears, horns, and muzzle", text: "Attach two wide ears and two short horns near the top, then place one large oval muzzle across the lower half of the established head.", tip: "Mark the ear tips and horn tips first. Those four landmarks help the face feel balanced while still leaving room for a little handmade asymmetry." },
      { name: "Aim the cheeky expression", text: "Add half-lidded almond eyes looking to one side, lift one eyebrow, place two nostrils, and curve a crooked open grin around one square tooth.", tip: "Draw the eyelids before the irises so both pupils can point the same way. Let the raised brow and off-center tooth exaggerate the sideways attitude." },
      { name: "Place tuft and patches", text: "Add a small forehead tuft and several irregular cow patches around the existing face.", tip: "Keep every patch a different shape and leave breathing room around the eyes and grin. You can move the spots around on your own cow without changing the lesson structure." },
      { name: "Ink and color the cow", text: "Trace the established face with thick black marker, fill the patches black, muzzle and ears pink, horns golden yellow, and irises teal.", tip: "Let each fill dry before reinforcing a nearby black edge. Pull the pink strokes across the muzzle in the same direction so the visible marker texture feels intentional." },
      { name: "Milk the expression", text: "Strengthen the existing outlines, sharpen the sideways eyes and raised brow, and tidy the established black, pink, golden-yellow, and teal fills.", tip: "Stop before adding a bell, body, barn, border, or words. The half-lidded side-eye, raised brow, and one-tooth grin already make this cow unmistakably yours.", image: true }
    ]
  },
  {
    slug: "cartoon-claw-hammer",
    day: "022",
    date: "Wednesday, May 27",
    isoDate: "2026-05-27",
    subject: "a cartoon claw hammer",
    headlineSubject: "a cartoon<br>claw hammer",
    shortSubject: "a claw hammer",
    lessonTitle: "Let's draw a cartoon claw hammer",
    description: "Learn how to draw a cartoon claw hammer with a diagonal handle, chunky striking face, curved split claw, wrapped grip bands, small comic impact marks, thick black outlines, and bright cyan, orange, magenta, and yellow marker fills.",
    intro: "Set one strong diagonal, then build the hammer head and handle before cutting in the claw, wrapping the grip, and pulling bright marker color. This honest archive lesson is a fresh tool-drawing prompt, not a claim about past attention or activity.",
    time: 15,
    difficulty: "Intermediate",
    accent: "#20b9db",
    finished: "cartoon-claw-hammer-finished-v1.jpg",
    finishedAlt: "Handmade face-free marker doodle of a diagonal cartoon claw hammer with a cyan head, curved split claw, orange handle, magenta wrapped grip, yellow impact marks, and thick black outlines",
    materials: ["Drawing paper", "Black marker", "Cyan, orange, magenta, and yellow markers"],
    materialNote: "Use black for the confident contours, cyan for the metal head, orange for the handle, magenta for the wrapped grip, and yellow for the small impact marks.",
    tipLabel: "Doodle tip",
    steps: [
      { name: "Set the hammer angle", text: "Draw a light diagonal axis for the handle and place a simple block guide across its upper end for the head.", tip: "Ghost the long diagonal twice before touching down. One clear direction gives the whole hammer more energy than a nearly vertical handle." },
      { name: "Build head and handle", text: "Shape the striking face, neck, chunky head, and long handle around the established guide, leaving the back of the head blunt for now.", tip: "Draw the handle as two long parallel edges, then compare the gap between them from top to bottom. A slight taper is fine, but avoid pinching the middle." },
      { name: "Cut in the claw", text: "Extend the back of the existing head into a curved two-prong claw with one clear center notch.", tip: "Pull the outer claw curve first, then echo it inside and open the notch at the tip. The empty notch shape is what makes the tool read as a claw hammer." },
      { name: "Wrap the grip", text: "Add several grip bands near the handle base and three small comic impact marks beside the striking face.", tip: "Rotate the page so the grip bands cross the handle cleanly. Keep the impact marks small and point them away from the hammer face like a tiny burst." },
      { name: "Ink and color the hammer", text: "Trace the established hammer in black, then fill the head cyan, handle orange, grip magenta, and impact marks yellow.", tip: "Fill the long handle from edge to edge in parallel strokes. Let a little marker streak texture show instead of layering until the orange looks digitally flat." },
      { name: "Nail the finish", text: "Strengthen the existing contours, clarify the claw notch and grip bands, and tidy the cyan, orange, magenta, and yellow fills.", tip: "Stop before adding a nail, board, hand, face, words, or border. The claw, striking face, wrapped grip, and impact marks already make the tool pop.", image: true }
    ]
  },
  {
    slug: "cartoon-rocket-ship",
    day: "070",
    date: "Tuesday, July 14",
    isoDate: "2026-07-14",
    subject: "a cartoon rocket ship",
    headlineSubject: "a cartoon<br>rocket ship",
    shortSubject: "a rocket ship",
    lessonTitle: "Let's draw a cartoon rocket ship",
    description: "Learn how to draw a cartoon rocket ship with a tall rounded body, pointed nose cone, matching side fins, round porthole, lower band, layered flame, tiny stars, thick black outlines, red and cyan marker fills, and yellow-purple flame color.",
    intro: "Start with one tall body guide, then layer in the nose, fins, window, and flame before you pull the bright marker color. A rocket is a great place to practice drawing a long smooth curve in one pass instead of correcting it with lots of tiny strokes.",
    time: 15,
    difficulty: "Easy",
    accent: "#e53a32",
    finished: "cartoon-rocket-ship-finished-v1.jpg",
    finishedAlt: "Handmade marker doodle of a face-free upright cartoon rocket ship with a red body, cyan fins and porthole, yellow and purple layered flame, tiny star marks, and thick black outlines",
    materials: ["Drawing paper", "Black marker", "Red, cyan, yellow, and purple markers", "Optional white gel pen"],
    materialNote: "Use black for the confident outline, red and cyan for the rocket, yellow and purple for the flame, and a white gel pen only for the small existing highlight gaps.",
    tipLabel: "Doodle tip",
    steps: [
      { name: "Set the flight guide", text: "Draw a light tall rounded body guide with a vertical center axis.", tip: "Ghost the two long side curves first, then pull each one from top to bottom in a single relaxed pass. Matching the empty space on both sides of the axis keeps the body steady." },
      { name: "Shape nose and fins", text: "Add a pointed nose cone at the top and two matching triangular fins at the lower sides of the established body.", tip: "Place both fin tips lightly before connecting them. Comparing their height is faster than trying to copy one fin stroke-for-stroke." },
      { name: "Drop in the window", text: "Draw a round porthole near the upper body and a simple band around the lower body.", tip: "Mark the porthole center before looping the circle. Rotating the paper can make a confident circle much easier than scratching around it." },
      { name: "Launch the flame", text: "Attach a layered flame below the existing body and add two small star marks beside the rocket.", tip: "Build the flame as nested points that all start at the same base. Keep the stars small so they support the rocket instead of taking over." },
      { name: "Fill the rocket color", text: "Trace the established rocket, window, fins, flame, and stars in black, then fill the body red, the fins and window cyan, and the flame yellow with a purple center.", tip: "Fill from each black edge inward and let the marker strokes follow the long body. The slight streak texture is part of the handmade look." },
      { name: "Give the rocket lift", text: "Strengthen the existing black contours, tidy the red, cyan, yellow, and purple fills, and add tiny white highlights to the already colored rocket parts.", tip: "Stop before adding another rocket, a planet, words, or a face. The pointed nose, porthole, fins, and flame already make the subject read instantly.", image: true }
    ]
  },
  {
    slug: "cartoon-roller-skate",
    day: "023",
    date: "Thursday, May 28",
    isoDate: "2026-05-28",
    subject: "a cartoon roller skate",
    headlineSubject: "a cartoon<br>roller skate",
    shortSubject: "a roller skate",
    lessonTitle: "Let's draw a cartoon roller skate",
    description: "Learn how to draw a cartoon roller skate with a chunky high-top boot, separate sole, four quad wheels, simple trucks, eyelets, crisscross laces, thick black outlines, pink and teal marker fills, yellow and purple wheels, and a small ground shadow.",
    intro: "Build one side-view boot first, then set it on a sole and wheels before threading in the laces and bright marker color. This honest archive lesson is a fresh practice prompt, not a claim about past attention or activity.",
    time: 20,
    difficulty: "Intermediate",
    accent: "#f04499",
    finished: "cartoon-roller-skate-finished-v1.jpg",
    finishedAlt: "Handmade marker doodle of a face-free side-view pink cartoon roller skate with teal sole, four yellow and purple quad wheels, crisscross laces, a purple ground shadow, and thick black outlines",
    materials: ["Drawing paper", "Black marker", "Pink, teal, yellow, and purple markers", "Optional white gel pen"],
    materialNote: "Use black for the outline, pink for the boot, teal for the sole, yellow and purple for the wheels, and a white gel pen only for small existing highlight gaps.",
    tipLabel: "Doodle tip",
    steps: [
      { name: "Block the boot", text: "Draw a light side-view boot guide with a long toe pointing right and a raised ankle at the back.", tip: "Ghost the long top curve twice before touching the marker down. A single confident sweep will look better than trying to sand the curve smooth with little marks." },
      { name: "Build the high-top", text: "Add the chunky ankle-high boot and a separate sole, then pull a faint short ground line beneath the established shape.", tip: "Keep the sole flatter than the boot. Comparing the slim gap between those two edges is an easy way to keep the skate from looking squashed." },
      { name: "Roll in the wheels", text: "Attach four small wheels on simple trucks under the established sole.", tip: "Lightly mark all four wheel centers before drawing the circles. Even spacing matters more than making every wheel exactly the same size." },
      { name: "Lace the boot", text: "Add a short row of eyelets and crisscross laces along the existing front opening.", tip: "Draw the eyelets first, then connect every other one with relaxed diagonal crossings. Let the laces overlap a little instead of turning them into a rigid ladder." },
      { name: "Color the skate", text: "Trace the established skate in black, then fill the boot pink, sole teal, wheels yellow and purple, and the existing ground line purple.", tip: "Fill the boot with long strokes that follow its curve. Leaving a little marker streak texture makes the color feel lively and handmade." },
      { name: "Make it roll", text: "Strengthen the existing black contours and laces, tidy the pink, teal, yellow, and purple fills, and add tiny white highlights to the already colored boot and wheels.", tip: "Stop before adding a face, a border, or more skates. The high-top, four wheels, and laces already make this one unmistakable.", image: true }
    ]
  },
  {
    slug: "cartoon-boombox",
    day: "069",
    date: "Monday, July 13",
    isoDate: "2026-07-13",
    subject: "a cartoon boombox",
    headlineSubject: "a cartoon<br>boombox",
    shortSubject: "a boombox",
    lessonTitle: "Let's draw a cartoon boombox",
    description: "Learn how to draw a cartoon boombox with a squat rounded radio body, arch handle, matching speaker circles, cassette window, simple controls, short antenna, thick black outlines, magenta marker panels, cyan accents, and a blue ground shadow.",
    intro: "Build the radio body first, then arch the handle and place the matching speakers, cassette window, and controls before you pull the magenta and cyan marker color. The little wobble in a confident marker line is part of the charm.",
    time: 20,
    difficulty: "Intermediate",
    accent: "#d9278c",
    finished: "cartoon-boombox-finished-v1.jpg",
    finishedAlt: "Handmade marker doodle of a face-free magenta cartoon boombox with a thick top handle, two cyan speakers, cassette window, round controls, short antenna, and blue ground shadow",
    materials: ["Drawing paper", "Black marker", "Magenta, cyan, and blue markers", "Optional white gel pen"],
    materialNote: "Use black for the confident outline, magenta for the radio body, cyan for the speakers and controls, blue for the small ground shadow, and a gel pen only for tiny highlights.",
    tipLabel: "Doodle tip",
    steps: [
      { name: "Block the radio body", text: "Use a light construction pass to draw one squat rounded rectangle with a broad front panel.", tip: "Ghost the long top and bottom edges before touching the marker down. Keeping those two edges parallel matters more than making either one perfectly straight." },
      { name: "Arch the handle", text: "Attach a thick upside-down U handle directly to the established top edge.", tip: "Draw the outside curve first, then echo it inside with a little breathing room. Compare the two handle ends so they land at the same height." },
      { name: "Set the speakers", text: "Add two matching large speaker circles inside the existing front panel, leaving an open center strip between them.", tip: "Lightly mark each circle's center before pulling the loops. Checking the empty center strip is a faster way to keep the pair balanced." },
      { name: "Add the controls", text: "Draw the small cassette window and a row of four round controls in the established open center area.", tip: "Keep every control simple and chunky. Rotate the paper for any circle that feels awkward rather than scratching at it with lots of tiny marks." },
      { name: "Ink and fill the beat", text: "Add a short antenna and a small ground shadow, then trace the existing radio shapes in black and fill the body magenta, the speakers and controls cyan, and the shadow blue.", tip: "Fill from each outline inward with strokes that follow the radio's broad direction. Let a little marker texture show instead of trying to make a flat digital block." },
      { name: "Make the boombox boom", text: "Strengthen the existing black contours, tidy the magenta, cyan, and blue fills, and add tiny white highlights inside the already drawn speakers and controls.", tip: "Stop before adding words, music notes, a logo, or a face. The handle, speaker pair, and cassette window already make the radio read instantly.", image: true }
    ]
  },
  {
    slug: "cartoon-superhero-mask",
    day: "024",
    date: "Friday, May 29",
    isoDate: "2026-05-29",
    subject: "a cartoon superhero mask",
    headlineSubject: "a cartoon<br>superhero mask",
    shortSubject: "a superhero mask",
    lessonTitle: "Let's draw a cartoon superhero mask",
    description: "Learn how to draw a cartoon superhero mask with symmetry guides, a swept brow silhouette, matching almond eye openings, pointed corners, a center nose dip, ribbon tails, bold black outlines, purple marker fill, cyan accents, and small white highlights.",
    intro: "Start with a light center line and eye axis, then sweep the mask around those guides before adding the openings, ribbon tails, and comic marker color. This honest archive lesson is a fresh drawing prompt, not a claim about earlier attention or activity.",
    time: 15,
    difficulty: "Intermediate",
    accent: "#7242b9",
    finished: "cartoon-superhero-mask-finished-v1.jpg",
    finishedAlt: "Handmade marker doodle of a face-free purple cartoon superhero mask with a swept brow, almond eye openings, black outlines, cyan eye rims and ribbon tails, and small white highlights",
    materials: ["Drawing paper", "Black marker", "Purple and cyan markers", "Optional white gel pen"],
    materialNote: "Use black for the confident outline, purple for the mask, cyan for the eye rims and ribbon tails, and a white gel pen only for the small finishing highlights.",
    tipLabel: "Doodle tip",
    steps: [
      { name: "Set the mask guides", text: "Draw a light horizontal eye axis, a vertical center line, and shallow upper and lower guide arcs.", tip: "Ghost the arcs before committing, then compare the empty space on both sides of the center line. Balanced negative space matters more than perfect measurement." },
      { name: "Sweep the mask shape", text: "Use the guides to draw the full outer mask silhouette with a swept brow, pointed corners, rounded lower edges, and a small center nose dip.", tip: "Pull each long brow curve in one relaxed stroke. Rotate the paper if your wrist starts making the curve scratchy." },
      { name: "Open the eye shapes", text: "Add two matching almond-shaped eye openings along the established eye axis.", tip: "Draw one opening lightly, then compare its height and distance from the center line before echoing it on the other side." },
      { name: "Tie on the ribbon tails", text: "Attach short ribbon tails to both outer corners and add two small crease marks above the existing eye openings.", tip: "Keep the ribbon tails short and angular so they support the mask silhouette instead of competing with it." },
      { name: "Ink the secret colors", text: "Trace the established mask, openings, ribbons, and creases in black, then fill the mask purple and the eye rims and ribbon tails cyan.", tip: "Let each marker area dry before a second pass. Fill from the black edge inward and leave a little streak texture so the color stays handmade." },
      { name: "Power up the mask", text: "Erase the remaining light guides, strengthen the existing black contours, tidy the purple and cyan fills, and add tiny white highlights to the already colored areas.", tip: "Stop before adding eyes, a face, a logo, or a border. The swept brow, eye openings, and tied ribbon tails already carry the superhero character.", image: true }
    ]
  },
  {
    slug: "comic-sun-with-sunglasses",
    day: "025",
    date: "Saturday, May 30",
    isoDate: "2026-05-30",
    subject: "a comic sun with sunglasses",
    headlineSubject: "a comic sun<br>with sunglasses",
    shortSubject: "a comic sun",
    lessonTitle: "Let's draw a comic sun with sunglasses",
    description: "Learn how to draw a comic sun with sunglasses using a big round sun, alternating rays, oversized black shades, a tiny relaxed smile, yellow marker fill, orange ray accents, small white lens highlights, and a teal ground shadow.",
    intro: "Start with one large sun circle, then radiate the rays and drop oversized shades across it before filling the yellow and orange marker color. This honest archive lesson is a fresh summer prompt, not a claim about earlier attention or activity.",
    time: 15,
    difficulty: "Easy",
    accent: "#f6c817",
    finished: "comic-sun-with-sunglasses-finished-v1.jpg",
    finishedAlt: "Handmade marker doodle of a round yellow comic sun with alternating orange rays, oversized black sunglasses with white highlights, a small curved smile, and teal ground shadow",
    materials: ["Drawing paper", "Black and colored markers", "Optional white gel pen"],
    materialNote: "Use black for the outline and sunglasses, yellow for the sun, orange for alternating rays, teal for the shadow, and the gel pen only for the small lens highlights.",
    tipLabel: "Doodle tip",
    steps: [
      { name: "Draw the sun circle", text: "Use a light construction pass to draw one large centered sun circle.", tip: "Ghost the circle several times before committing. Let it stay a touch handmade instead of chasing a perfectly mechanical loop." },
      { name: "Radiate the rays", text: "Add an even ring of alternating straight and triangular rays around the established circle, giving the triangular rays orange marker accents.", tip: "Work around the circle in opposite pairs. That quick habit keeps the rays feeling balanced without measuring every gap." },
      { name: "Drop in the shades", text: "Draw and black-fill two oversized sunglasses lenses, their bridge, and short arms across the existing sun circle.", tip: "Pull each lens outline in one confident pass, then fill inward. The glasses should hide the eyes completely so the simple mouth can carry the expression." },
      { name: "Add the small smile", text: "Place one short relaxed curved smile below the established sunglasses.", tip: "Keep the mouth small and low. Leaving lots of open yellow space stops the face from becoming crowded." },
      { name: "Fill the summer color", text: "Fill the existing sun circle yellow and add a small teal shadow under it.", tip: "Follow the curve of the sun with your marker strokes and let a little texture show. Smooth-but-not-perfect fill feels more alive than a solid digital block." },
      { name: "Let the sun shine", text: "Reinforce the existing outlines, tidy the yellow, orange, teal, and black fills, and add tiny white highlights to the already drawn sunglasses.", tip: "Stop before adding clouds, words, or a border. The ray pattern, shades, and small smile already make a clear comic character.", image: true }
    ]
  },
  {
    slug: "cartoon-treasure-chest",
    day: "068",
    date: "Sunday, July 12",
    isoDate: "2026-07-12",
    subject: "a cartoon treasure chest",
    headlineSubject: "a cartoon<br>treasure chest",
    shortSubject: "a treasure chest",
    lessonTitle: "Let's draw a cartoon treasure chest",
    description: "Learn how to draw a cartoon treasure chest with a chunky box base, domed lid, front plank bands, central lock plate, small hinges, squat feet, loose coins, thick black outlines, orange marker wood, gold hardware, and a blue shadow.",
    intro: "Build one low chest box first, then round its lid and layer in the wood bands, lock, feet, and coins before pulling the bright marker color. Keep the outline a little wobbly if it wants to be—the solid shapes do the work.",
    time: 20,
    difficulty: "Easy-medium",
    accent: "#ef741c",
    finished: "cartoon-treasure-chest-finished-v1.jpg",
    finishedAlt: "Handmade marker doodle of a face-free orange cartoon treasure chest with a domed lid, black outlines, gold lock and hinges, squat feet, loose coins, and a teal-blue ground shadow",
    materials: ["Drawing paper", "Black and colored markers"],
    materialNote: "Use black for the outline, orange for the wood, golden yellow for the hardware and coins, and teal-blue for the small ground shadow.",
    tipLabel: "Doodle tip",
    steps: [
      { name: "Block the chest base", text: "Use a light construction pass to draw one low rectangular chest box with a wider front plane.", tip: "Ghost the two long front edges before touching the marker down. Let both edges lean in the same direction so the chest does not twist." },
      { name: "Round the lid", text: "Add a domed lid directly on top of the established box, keeping the curved end aligned with the right side plane.", tip: "Pull the dome in one smooth arc after a rehearsal stroke. A slightly uneven arc feels hand-drawn, but it should still land on both lid edges." },
      { name: "Divide the wood", text: "Draw three loose front plank bands and a narrow lower rim across the existing chest base.", tip: "Leave the bands a little imperfect and roughly parallel. The gaps between them matter more than perfectly ruler-straight lines." },
      { name: "Set the hardware", text: "Add a central lock plate and two small hinges right on the lid seam you already drew.", tip: "Keep the lock chunky and simple. One clear keyhole reads better than tiny mechanical marks." },
      { name: "Add feet and color base", text: "Draw two squat feet and a few coin circles beside the existing base, then fill the established chest orange, the hardware and coins gold, and the ground shadow teal-blue.", tip: "Fill from each black edge inward and let the marker streaks follow the chest planes. Directional streaks make the big orange surfaces feel lively." },
      { name: "Make the chest gleam", text: "Reinforce the existing black outlines, tidy the orange, gold, and blue fills, and add tiny highlights to the already drawn lock and coins.", tip: "Stop before adding a face, a pirate, words, or a border. The domed lid, lock, and scattered coins already give the chest plenty of comic energy.", image: true }
    ]
  },
  {
    slug: "cartoon-surfboard",
    day: "067",
    date: "Saturday, July 11",
    isoDate: "2026-07-11",
    subject: "a cartoon surfboard",
    headlineSubject: "a cartoon<br>surfboard",
    shortSubject: "a surfboard",
    lessonTitle: "Let's draw a cartoon surfboard",
    description: "Learn how to draw a cartoon surfboard with a long pointed board shape, bottom fin, curved center stripe, curled leash, thick black outline, small wave marks, cyan marker fill, coral stripe, and blue accents.",
    intro: "Start with one long board silhouette, then ride a curved stripe down its center before adding the leash, waves, and bright marker color. Keep the lines a little wobbly if they want to be—this is a drawing you can make your own.",
    time: 15,
    difficulty: "Easy",
    accent: "#13aeb7",
    finished: "cartoon-surfboard-finished-v1.jpg",
    finishedAlt: "Handmade marker doodle of a tall cyan cartoon surfboard with a coral center stripe, black outline, small fin, curled leash, and blue wave marks",
    materials: ["Black marker", "Cyan, coral, and blue markers", "Drawing paper"],
    steps: [
      { name: "Stretch the board shape", text: "Use a light construction pass to draw one tall pointed-nose board and a small triangular fin at its tail.", tip: "Ghost the long outer curve twice before touching the marker down. Pull the stroke toward your wrist so the board stays smooth instead of scratchy." },
      { name: "Sweep in the stripe", text: "Add one wide curved center stripe inside the established board shape.", tip: "Keep the stripe's edges roughly parallel to the board edges. Compare the two skinny side spaces instead of measuring every curve." },
      { name: "Hook the leash and ink", text: "Add a short curled leash at the tail, then trace the existing board, fin, and stripe with a confident black outline.", tip: "Rotate the paper for the long curve and pull it in one steady pass. A slightly imperfect marker edge feels more alive than many tiny corrections." },
      { name: "Tuck in small waves", text: "Draw three simple blue wave curves under the already inked surfboard.", tip: "Leave a little air between each wave hump. That negative space keeps the water marks readable at a small size." },
      { name: "Pull the bright marker color", text: "Fill the existing board cyan, the center stripe coral, and the wave curves blue, following the board's length with your marker strokes.", tip: "Work from each outline inward and let the marker streaks show. That direction makes the board feel long and hand-drawn." },
      { name: "Ride the color finish", text: "Reinforce the existing black edge, leash, fin, stripe, wave marks, and cyan, coral, and blue fills.", tip: "Stop before adding a face or a whole beach scene. The board, leash, and wave marks already have plenty of comic energy.", image: true }
    ]
  },
  {
    slug: "cartoon-popcorn-bucket",
    day: "026",
    date: "Sunday, May 31",
    isoDate: "2026-05-31",
    subject: "a cartoon popcorn bucket",
    headlineSubject: "a cartoon<br>popcorn bucket",
    shortSubject: "a popcorn bucket",
    lessonTitle: "Let's draw a cartoon popcorn bucket",
    description: "Learn how to draw a cartoon popcorn bucket with a tapered bucket, curved rim, rounded popcorn cloud, kernel lobes, thick black outline, vertical stripe bands, red marker stripes, yellow popcorn, and orange kernel accents.",
    intro: "Start with a simple tapered bucket, then pile the popcorn over its rim before you ink the stripes and pull in the movie-night colors. This honest archive lesson is a fresh drawing prompt, not a pretend popularity story.",
    time: 15,
    difficulty: "Easy",
    accent: "#df3936",
    finished: "cartoon-popcorn-bucket-finished-v1.jpg",
    finishedAlt: "Handmade marker doodle of a striped cartoon popcorn bucket with thick black outline, red stripes, yellow popcorn, orange kernel accents, and no face",
    materials: ["Black marker", "Red, yellow, and orange markers", "Drawing paper"],
    steps: [
      { name: "Block the bucket", text: "Draw a light tapered bucket shape, then curve a shallow rim across its top.", tip: "Ghost both side edges before committing. Let them lean inward by the same amount so the bucket does not accidentally become a flowerpot." },
      { name: "Pile up the popcorn", text: "Build a rounded popcorn cloud above the established rim with a row of varied bumpy curves.", tip: "Vary the bumps a little instead of repeating perfect half-circles. Uneven lobes make the popcorn feel softer and more hand-drawn." },
      { name: "Divide the kernel lobes", text: "Add a few small inner curves inside the existing popcorn cloud to suggest separate kernels.", tip: "Leave generous open spaces between the inner curves. A handful of marks reads better than outlining every single kernel." },
      { name: "Ink the stripes", text: "Trace the established bucket and popcorn with thick black marker, then draw three vertical stripe bands down the existing bucket body.", tip: "Turn the page if needed and pull each stripe in one confident stroke. Keeping the stripe edges loose but parallel gives the bucket its comic rhythm." },
      { name: "Fill the movie-night colors", text: "Fill the existing stripe bands red, the popcorn yellow, and add tiny orange accents inside the established kernel lobes.", tip: "Fill from the outline inward and let the marker streaks follow the bucket's height. Dry each area before a second pass so the paper stays clean." },
      { name: "Make the popcorn pop", text: "Tidy the existing outlines, stripe edges, kernel lobes, and the red, yellow, and orange marker fills.", tip: "Stop before adding a face, a soda, or tickets. The oversized popcorn cloud and bold stripes already make the doodle feel playful.", image: true }
    ]
  },
  {
    slug: "soccer-whistle",
    day: "065",
    date: "Thursday, July 9",
    isoDate: "2026-07-09",
    subject: "a soccer whistle",
    headlineSubject: "a soccer<br>whistle",
    shortSubject: "a soccer whistle",
    lessonTitle: "Let's draw a soccer whistle",
    description: "Learn how to draw a soccer whistle with a rounded body, short mouthpiece, pea window, rear ring loop, comic sound marks, yellow marker fill, orange accents, and thick black outlines.",
    intro: "Build the whistle body first, then attach the mouthpiece, window, loop, and sound marks before adding bright marker color. Keep this version face-free; the energy comes from the chunky shape, sound marks, and bold fill.",
    time: 15,
    difficulty: "Easy",
    accent: "#f3c21e",
    finished: "soccer-whistle-finished-v1.jpg",
    finishedAlt: "Bold marker drawing of a face-free soccer whistle with rounded yellow body, short orange mouthpiece, pea window, rear ring loop, comic sound marks, thick black outlines, and blue shadow",
    materials: ["Drawing paper", "Black and colored markers", "Optional white gel pen"],
    materialNote: "Use black for the outlines, yellow for the whistle body, orange for the mouthpiece and accents, blue or gray for the shadow, and the gel pen only for tiny highlight gaps.",
    tipLabel: "Doodle tip",
    steps: [
      {
        name: "Draw the whistle body",
        text: "Draw a rounded whistle body tilted slightly upward.",
        tip: "Think of the body as a soft capsule, not a perfect oval. A little handmade wobble keeps it lively."
      },
      {
        name: "Add the mouthpiece",
        text: "Attach a short rectangular mouthpiece to one side of the body.",
        tip: "Line up the mouthpiece with the body angle. That shared tilt makes the whistle feel like one object."
      },
      {
        name: "Cut the pea window",
        text: "Add the small rounded pea window and inside edge on the whistle body.",
        tip: "Keep the window simple and dark. One clear shape reads better than tiny mechanical detail."
      },
      {
        name: "Loop and sound marks",
        text: "Add a rear ring loop, then place a few short comic sound marks near the mouthpiece.",
        tip: "Use short marks without letters. They add energy without turning the drawing into a sign."
      },
      {
        name: "Fill the whistle color",
        text: "Fill the body yellow, add orange accents, and place a small blue or gray shadow under the whistle.",
        tip: "Pull the marker strokes along the rounded body. Directional streaks help the color feel like a curved surface."
      },
      {
        name: "Make the whistle sharp",
        text: "Thicken the black outlines, even the existing marker fills, clarify the window, loop, sound marks, accents, and same shadow.",
        tip: "Stop before adding a face, scoreboard, words, or a border. The body, mouthpiece, loop, and sound marks carry the doodle.",
        image: true
      }
    ]
  },
  {
    slug: "cartoon-french-fries",
    day: "066",
    date: "Friday, July 10",
    isoDate: "2026-07-10",
    subject: "cartoon french fries",
    headlineSubject: "cartoon<br>french<br>fries",
    shortSubject: "french fries",
    lessonTitle: "Let's draw cartoon french fries",
    description: "Learn how to draw cartoon french fries with a trapezoid carton, top rim, side panels, fold seams, individual fries, fry tips, small salt marks, red marker fill, yellow marker fill, highlight gaps, thick black outlines, and a soft shadow.",
    intro: "Build the carton first, stack the fries inside it, then add the fold lines, salt marks, and bright marker fills. This stays face-free, so the fun comes from the chunky shape, color, and confident outline.",
    time: 15,
    difficulty: "Intermediate",
    accent: "#f5c21b",
    finished: "cartoon-french-fries-finished-v1.jpg",
    finishedAlt: "Bold marker drawing of face-free cartoon french fries in a red trapezoid carton with top rim, side panels, fold seams, yellow fries, fry tips, salt marks, highlight gaps, thick black outlines, and soft gray shadow",
    materials: ["Drawing paper", "Black and colored markers", "Optional white gel pen"],
    materialNote: "Use black for the outlines, red for the carton, yellow for the fries, gray for the shadow, and the gel pen only if you want to sharpen the small highlight gaps.",
    tipLabel: "Doodle tip",
    steps: [
      {
        name: "Block the carton and fries",
        text: "Draw a light trapezoid carton guide, then add several vertical fry guides rising from the top.",
        tip: "Fan the fry guides slightly instead of making them parallel. That little spread makes the carton feel full."
      },
      {
        name: "Draw the fry silhouettes",
        text: "Turn the guides into a clear carton and separate rectangular fries with rounded ends.",
        tip: "Vary the fry heights by a small amount. Too-even fries can look like a fence instead of food."
      },
      {
        name: "Fold the carton",
        text: "Add the top rim, side panels, and simple fold seams on the carton.",
        tip: "Keep the rim following the same curve across the front. A steady rim makes the carton look dimensional."
      },
      {
        name: "Thicken the marker lines",
        text: "Thicken the existing black outlines, clarify the fry tips, and add a few small salt marks on the fries.",
        tip: "Let the marker sit a second before adding tiny salt marks. Dry lines stay crisp instead of feathering."
      },
      {
        name: "Fill the marker color",
        text: "Fill the carton red, fill the fries yellow, leave small highlight gaps, and place a soft gray shadow underneath.",
        tip: "Pull the yellow strokes along each fry. Directional marker streaks help the fries feel tall and chunky."
      },
      {
        name: "Crisp up the fries",
        text: "Thicken the black outlines and deepen the existing red carton, yellow fries, salt marks, highlight gaps, folds, and shadow.",
        tip: "Stop before adding a face, words, or a border. The carton shape, fry stack, and marker color already do the work.",
        image: true
      }
    ]
  },
  {
    slug: "cartoon-pencil-shavings",
    day: "027",
    date: "Monday, June 1",
    isoDate: "2026-06-01",
    subject: "a cartoon pencil with shavings",
    headlineSubject: "a cartoon pencil<br>with shavings",
    shortSubject: "a pencil with shavings",
    lessonTitle: "Let's draw a cartoon pencil with shavings",
    description: "Learn how to draw a cartoon pencil with curled shavings using a diagonal pencil body, pointed wood cone, pink eraser, ferrule bands, graphite point, shaving curls, side stripe, wood grain, yellow marker fill, tan shavings, silver ferrule, thick black outlines, and a soft shadow.",
    intro: "Start with one diagonal pencil and a loose shaving curl, then build the point, eraser, ferrule, grain, and marker fills. This backfilled archive lesson stays honest and practical: it is a small marker drawing exercise, not a pretend launch moment.",
    time: 15,
    difficulty: "Intermediate",
    accent: "#f4c21f",
    finished: "cartoon-pencil-shavings-finished-v1.jpg",
    finishedAlt: "Bold marker drawing of a face-free cartoon pencil with yellow body, pointed wooden cone, black graphite point, pink eraser, silver ferrule bands, curled tan pencil shavings, side stripe, wood grain, thick black outlines, highlight gaps, and soft gray shadow",
    materials: ["Drawing paper", "Black and colored markers", "Optional white gel pen"],
    materialNote: "Use black for the outlines, yellow for the pencil body, pink for the eraser, tan for the wood and shavings, silver or gray for the ferrule, and the gel pen only for small highlight gaps.",
    tipLabel: "Doodle tip",
    steps: [
      {
        name: "Set the pencil angle",
        text: "Draw a light diagonal pencil guide, then sketch loose curled shaving guides beside the point.",
        tip: "Ghost the long pencil angle before drawing. A confident diagonal makes the whole doodle feel cleaner."
      },
      {
        name: "Shape the pencil",
        text: "Build the chunky pencil body, pointed wood cone, eraser end, and curled shaving silhouettes.",
        tip: "Keep the shaving curls broad and simple. Big loops read better than tiny scraps."
      },
      {
        name: "Add point and ferrule",
        text: "Add the ferrule bands, dark graphite point, and inner curl lines inside the shavings.",
        tip: "Curve the ferrule bands around the pencil. Slight arcs make the eraser end feel round."
      },
      {
        name: "Ink the pencil details",
        text: "Add the side stripe, wood grain, eraser edge, and thicker black marker outline.",
        tip: "Pull the grain lines from the point outward. Directional strokes keep the wooden cone readable."
      },
      {
        name: "Fill the pencil color",
        text: "Fill the pencil yellow, eraser pink, shavings tan, ferrule gray, and add a soft shadow under the shapes.",
        tip: "Leave one narrow highlight gap along the pencil body before the marker gets too wet. Reserved paper shines cleaner than added white."
      },
      {
        name: "Sharpen the marker finish",
        text: "Thicken the black outlines and deepen the existing pencil, eraser, ferrule, point, shavings, grain, color, highlights, and shadow.",
        tip: "Stop before adding a face, words, or desk scene. The point, eraser, and curled shavings already make the pencil specific.",
        image: true
      }
    ]
  },
  {
    slug: "cartoon-toothbrush",
    day: "029",
    date: "Wednesday, June 3",
    isoDate: "2026-06-03",
    subject: "a cartoon toothbrush",
    headlineSubject: "a cartoon<br>toothbrush",
    shortSubject: "a toothbrush",
    lessonTitle: "Let's draw a cartoon toothbrush",
    description: "Learn how to draw a cartoon toothbrush with a long rounded handle, small brush head, curved neck, grouped bristles, grip bumps, rinse droplets, aqua and coral marker fills, and bold black outlines.",
    intro: "Build the toothbrush as a simple diagonal handle and head, then stack the bristles before adding bright marker fills. Keep this version face-free and playful through shape, color, and thick outline instead.",
    time: 15,
    difficulty: "Easy",
    accent: "#25bfc5",
    finished: "cartoon-toothbrush-finished-v1.jpg",
    finishedAlt: "Bold marker drawing of a diagonal cartoon toothbrush with aqua handle, coral grip bumps and bristles, rinse droplets, thick black outlines, visible marker texture, and small gray shadow",
    materials: ["Drawing paper", "Black and colored markers", "Optional white gel pen"],
    materialNote: "Use black for the outline, aqua for the handle and head, coral for the grip and bristles, and the gel pen only if you want tiny highlight gaps on the droplets.",
    tipLabel: "Doodle tip",
    steps: [
      {
        name: "Draw the handle and head",
        text: "Draw a long rounded diagonal handle, then add a small rounded brush head at the top end.",
        tip: "Ghost the long handle curve before using marker. A confident diagonal makes the whole doodle feel cleaner."
      },
      {
        name: "Bend the neck",
        text: "Connect the handle to the head with a slight neck curve, keeping the same diagonal angle.",
        tip: "Rotate the page so the neck curve pulls toward your hand. Smooth marker curves are easier when your wrist is not cramped."
      },
      {
        name: "Stack the bristles",
        text: "Add grouped rounded bristle blocks on top of the brush head.",
        tip: "Keep the bristles chunky instead of drawing many tiny hairs. Big groups read better at card size."
      },
      {
        name: "Add grip and droplets",
        text: "Place a row of rounded grip bumps along the handle, then add a few rinse droplets near the bristles.",
        tip: "Compare the gaps between the grip bumps. Even spacing keeps the handle playful without turning messy."
      },
      {
        name: "Color the toothbrush",
        text: "Fill the handle and head with aqua, color the grip bumps and bristles coral, and add a small gray shadow.",
        tip: "Pull marker strokes along the handle length. Directional streaks make the plastic form feel rounded."
      },
      {
        name: "Finish the toothbrush",
        text: "Thicken the black outlines, even the existing marker fills, clarify the bristles, droplets, grip bumps, and same shadow.",
        tip: "Stop before adding a face, toothpaste tube, or border. The bright handle, bristles, and droplets already carry the idea.",
        image: true
      }
    ]
  },
  {
    slug: "magic-wand-sparkle",
    day: "030",
    date: "Thursday, June 4",
    isoDate: "2026-06-04",
    subject: "a magic wand sparkle",
    headlineSubject: "a magic wand<br>sparkle",
    shortSubject: "a magic wand",
    lessonTitle: "Let's draw a magic wand sparkle",
    description: "Learn how to draw a magic wand sparkle with a diagonal wand, star tip, ribbon band, four-point sparkles, yellow marker fill, pink band, purple shadow, and bold black outlines.",
    intro: "Angle the wand first, attach the star, wrap the band, pop in the sparkles, then finish with bright marker color. Try different sparkle sizes later; keep the star tip and wand angle clear first.",
    time: 15,
    difficulty: "Intermediate",
    accent: "#f2c21b",
    finished: "magic-wand-sparkle-finished-v1.jpg",
    finishedAlt: "Bold marker drawing of a diagonal magic wand with yellow star tip, pink ribbon band, four small sparkle bursts, thick black outlines, visible marker texture, and purple shadow",
    materials: ["Drawing paper", "Black and colored markers", "White gel pen"],
    materialNote: "Use black for the outlines, yellow for the star and sparkles, pink for the band, purple for the shadow, and the gel pen only for tiny shine gaps if you want them.",
    tipLabel: "Doodle tip",
    steps: [
      {
        name: "Angle the wand",
        text: "Draw a slim diagonal wand stick with rounded ends.",
        tip: "Make the handle long and simple. The star needs room to sit clearly at the top."
      },
      {
        name: "Add the star",
        text: "Attach a chunky five-point star to the top of the wand.",
        tip: "Let the bottom point overlap the handle slightly. That overlap makes the parts feel connected."
      },
      {
        name: "Wrap the band",
        text: "Add a small ribbon band near the star while keeping the wand angle the same.",
        tip: "Curve the band around the wand instead of drawing a flat rectangle."
      },
      {
        name: "Pop the sparkles",
        text: "Place a few four-point sparkle bursts around the star tip.",
        tip: "Use different sparkle sizes, but keep them away from the star points so the silhouette stays clean."
      },
      {
        name: "Color the magic",
        text: "Fill the star and sparkles yellow, color the band pink, and add a small purple shadow under the wand.",
        tip: "Let marker streaks show inside the star. That texture keeps it handmade."
      },
      {
        name: "Brighten the wand",
        text: "Thicken the black outlines, even the existing marker fills, clarify the sparkle bursts and band, and reinforce the same shadow.",
        tip: "Stop before adding words, faces, moons, or a border. The star, wand, sparkles, and color are enough.",
        image: true
      }
    ]
  },
  {
    slug: "bowl-of-macaroni",
    day: "063",
    date: "Tuesday, July 7",
    isoDate: "2026-07-07",
    subject: "a bowl of macaroni",
    headlineSubject: "a bowl<br>of macaroni",
    shortSubject: "a bowl of macaroni",
    lessonTitle: "Let's draw a bowl of macaroni",
    description: "Learn how to draw a bowl of macaroni with a rounded bowl, wide rim, noodle mound, C-shaped elbow pieces, teal bowl stripe, cheesy yellow-orange marker fill, sauce accents, and bold black outlines.",
    intro: "Build the bowl first, pile in the noodles, turn the mound into elbow shapes, then add the stripe and warm marker color. Try different bowl colors later; keep the rim and macaroni pieces easy to read.",
    time: 15,
    difficulty: "Intermediate",
    accent: "#f2a51f",
    finished: "bowl-of-macaroni-finished-v1.jpg",
    finishedAlt: "Bold marker drawing of a bowl of macaroni with C-shaped yellow-orange elbow noodles, thick black outlines, teal stripe on the bowl, orange sauce accents, and purple marker shadow",
    materials: ["Drawing paper", "Black and colored markers", "White gel pen"],
    materialNote: "Use black for outlines, yellow and orange for the macaroni, teal or another bright color for the bowl stripe, purple or gray for the shadow, and the gel pen only for small shine gaps.",
    tipLabel: "Doodle tip",
    steps: [
      {
        name: "Draw the bowl",
        text: "Draw a wide oval rim, then curve the sides down into a rounded bowl with a small base.",
        tip: "Make the rim wider than the base. That gives the macaroni room to pile up."
      },
      {
        name: "Pile in the noodles",
        text: "Add a loose mound of noodles inside the rim, letting the pile rise above the back edge.",
        tip: "Think of this as one big bumpy shape first. The individual elbows come next."
      },
      {
        name: "Shape elbow pieces",
        text: "Break the mound into C-shaped elbow macaroni pieces with bold curved lines.",
        tip: "Vary the noodle sizes a little. Repeated identical C shapes can look like a pattern instead of food."
      },
      {
        name: "Stripe the bowl",
        text: "Add a bright stripe across the bowl front, then place a small marker shadow underneath.",
        tip: "Curve the stripe with the bowl. A flat stripe can make the bowl look like a rectangle."
      },
      {
        name: "Color the macaroni",
        text: "Fill the elbow pieces with yellow-orange marker and add a few darker sauce accents on the same noodles.",
        tip: "Leave tiny white gaps where the marker skips. Those gaps make the noodles feel glossy without extra detail."
      },
      {
        name: "Make the macaroni pop",
        text: "Thicken the black outlines, even the marker fills, clarify the noodle edges and bowl stripe, and reinforce the existing sauce shadows.",
        tip: "Stop before adding a face, spoon, words, or a border. The bowl, noodles, stripe, and color carry the doodle.",
        image: true
      }
    ]
  },
  {
    slug: "cartoon-alarm-clock",
    day: "064",
    date: "Wednesday, July 8",
    isoDate: "2026-07-08",
    subject: "a cartoon alarm clock",
    headlineSubject: "a cartoon<br>alarm clock",
    shortSubject: "an alarm clock",
    lessonTitle: "Let's draw a cartoon alarm clock",
    description: "Learn how to draw a cartoon alarm clock with a round clock body, twin bells, handle, feet, clock hands, chunky tick marks, blue marker fill, yellow bells, and bold black outlines.",
    intro: "Start with the big circle, stack on the bells, add feet and a handle, then place the hands before filling the bright marker colors. Change the colors later if you want; keep the clock face, bells, and hands readable first.",
    time: 15,
    difficulty: "Intermediate",
    accent: "#1e95da",
    finished: "cartoon-alarm-clock-finished-v1.jpg",
    finishedAlt: "Bold marker drawing of a cartoon alarm clock with round blue body, yellow twin bells, curved handle, small feet, red-orange hands, chunky black tick marks, thick outlines, and purple shadow",
    materials: ["Drawing paper", "Black and colored markers", "White gel pen"],
    materialNote: "Use black for the outlines and tick marks, blue for the clock body, yellow for the bells, red or orange for the hands, purple for the shadow, and the gel pen only for tiny highlight gaps.",
    tipLabel: "Doodle tip",
    steps: [
      {
        name: "Draw the clock circle",
        text: "Draw a large round clock body, then add a smaller inner circle for the face.",
        tip: "Ghost the circle twice before using marker. It can be handmade, but the ring should feel intentional."
      },
      {
        name: "Add the bells",
        text: "Place two rounded alarm bells on top of the clock body.",
        tip: "Leave a little gap between each bell and the face ring so the top does not turn into one heavy blob."
      },
      {
        name: "Set feet and handle",
        text: "Add two small feet below the body and a curved handle connecting the bells.",
        tip: "Pull the handle curve in one confident stroke. Rotating the page can make that arc smoother."
      },
      {
        name: "Place hands and ticks",
        text: "Draw two clock hands from the center, then add chunky tick marks around the face.",
        tip: "Skip numbers for this version. A few bold ticks stay clearer than tiny lettering."
      },
      {
        name: "Fill the bright parts",
        text: "Fill the body blue, the bells yellow, the hands red-orange, and add a small purple shadow under the feet.",
        tip: "Pull the blue marker strokes around the circle. Directional strokes make the ring feel round."
      },
      {
        name: "Wake up the clock",
        text: "Thicken the black outlines, even the marker fills, clarify the bells, hands, ticks, handle, feet, and same shadow.",
        tip: "Stop before adding a face, words, or a border. The bells, hands, color, and chunky outline give it enough energy.",
        image: true
      }
    ]
  },
  {
    slug: "cartoon-stapler",
    day: "028",
    date: "Tuesday, June 2",
    isoDate: "2026-06-02",
    subject: "a cartoon stapler",
    headlineSubject: "a cartoon<br>stapler",
    shortSubject: "a cartoon stapler",
    lessonTitle: "Let's draw a cartoon stapler",
    description: "Learn how to draw a cartoon stapler from a loose construction sketch, then refine its rounded top shell, flat base, front end, rear hinge, staple slot, tiny feet, teal and coral marker fills, purple shadow, and thick black outlines.",
    intro: "Start with a deliberately loose full-size guide, then trace that same shape into a chunky stapler. Add the hinge, slot, and tiny feet before coloring around them, so every feature survives to the finish. This backfilled archive lesson stays honest: it is a useful drawing page, not a claim about old activity.",
    time: 15,
    difficulty: "Intermediate",
    accent: "#15aeb2",
    finished: "cartoon-stapler-finished-v1.jpg",
    finishedAlt: "Bold marker drawing of a face-free cartoon stapler with teal rounded top shell, coral base and front nose, rear hinge, staple slot, tiny feet, thick black outlines, and purple shadow",
    materials: ["Drawing paper", "Pale blue-gray marker or pencil", "Black and colored markers"],
    materialNote: "Use a pale blue-gray tool for the loose guide, black for the keeper outlines and slot, teal for the top shell and hinge, coral for the base, and purple for the shadow.",
    tipLabel: "Doodle tip",
    steps: [
      {
        name: "Sketch a loose full-size guide",
        text: "With a pale tool, loosely sketch the long rounded top shell and flat base at the final angle. Add a light centerline and front/rear position marks, then leave every guide line visible.",
        tip: "Let this first pass be doubled and rough on purpose. You are mapping the whole stapler, not committing to a new outline yet."
      },
      {
        name: "Trace the same guide",
        text: "Trace the same top shell and base with a thin black contour, keeping the pale guide visible underneath. Leave a clean gap between the shell and base.",
        tip: "Follow the light marks instead of inventing a second shape. The exposed guide makes it obvious that the rough sketch is doing its job."
      },
      {
        name: "Define the front and hinge",
        text: "Refine the squared left front end, clean the top-shell contour, and place a round hinge cap at the right rear.",
        tip: "Keep the hinge chunky and simple. Tiny hardware disappears fast in a marker drawing."
      },
      {
        name: "Place the slot and feet",
        text: "Add one short dark staple slot near the left front of the upper base, then add two tiny feet underneath. Keep the slot in place for every remaining step.",
        tip: "Draw the slot as one confident rounded rectangle. Leave it unfilled later so it stays readable against the coral base."
      },
      {
        name: "Color around the slot",
        text: "Fill the top shell and hinge teal, the base coral, and add a small purple shadow underneath. Color around the dark slot without covering it.",
        tip: "Pull marker strokes along the stapler body. Stop at the slot's outline, then let the fill dry before reinforcing that tiny dark shape."
      },
      {
        name: "Lock in the stapler",
        text: "Thicken the existing black outlines, even the existing marker fills, and reinforce the same front end, hinge, staple slot, feet, and purple shadow.",
        tip: "Do not redraw or move the slot at this stage. The chunky top, base, hinge, slot, feet, and bright color already carry the drawing.",
        image: true
      }
    ]
  },
  {
    slug: "cartoon-magnifying-glass-doodle",
    day: "031",
    date: "Friday, June 5",
    isoDate: "2026-06-05",
    subject: "a cartoon magnifying glass",
    headlineSubject: "a cartoon<br>magnifying glass",
    shortSubject: "a magnifying glass",
    lessonTitle: "Let's draw a cartoon magnifying glass",
    description: "Learn how to draw a cartoon magnifying glass with a round lens, short handle, thick rim, shine streaks, search spark marks, blue marker glass, yellow handle, and bold black outlines.",
    intro: "Build the lens and handle first, then thicken the rim, add shine, spark the search marks, and finish with bright marker fills. Try different handle colors later; keep the circle and rim clear first.",
    time: 15,
    difficulty: "Easy",
    accent: "#20a7d8",
    finished: "cartoon-magnifying-glass-doodle-finished-v1.jpg",
    finishedAlt: "Bold marker doodle of a cartoon magnifying glass with round blue lens, thick black rim, short yellow handle, curved white shine streaks, small search spark marks, gray shadow, and visible marker texture",
    materials: ["Drawing paper", "Black and colored markers", "White gel pen"],
    materialNote: "Use black for the rim and outline, pale blue for the lens, yellow or orange for the handle, gray for the shadow, and the gel pen only for shine streaks.",
    tipLabel: "Doodle tip",
    steps: [
      {
        name: "Block lens and handle",
        text: "Draw a large round lens, then attach a short diagonal handle to one side.",
        tip: "Make the lens much bigger than the handle. That size difference makes it read quickly."
      },
      {
        name: "Thicken the rim",
        text: "Add a bold ring around the lens and round off the handle end.",
        tip: "Keep the rim even enough to see the glass, but do not worry about a perfect circle."
      },
      {
        name: "Add glass shine",
        text: "Place a few curved shine streaks inside the lens, following the round glass shape.",
        tip: "Put the shine inside the lens you already drew. It should not create a new lens outline."
      },
      {
        name: "Spark the search",
        text: "Add tiny search spark marks near the lens, then start making the keeper outlines bolder.",
        tip: "Use just a few spark marks. Too many will pull attention away from the magnifying glass."
      },
      {
        name: "Color the glass",
        text: "Fill the lens pale blue, color the handle yellow, and add a small gray ground shadow.",
        tip: "Let some marker streaks show in the blue. That keeps the glass playful instead of glossy."
      },
      {
        name: "Polish the magnifier",
        text: "Thicken the black outlines, even the marker fills, clarify the shine streaks and spark marks, and strengthen the same shadow.",
        tip: "Stop before adding words, faces, or a border. The lens, handle, shine, and color do enough.",
        image: true
      }
    ]
  },
  {
    slug: "fried-chicken-drumstick-doodle",
    day: "062",
    date: "Monday, July 6",
    isoDate: "2026-07-06",
    subject: "a fried chicken drumstick",
    headlineSubject: "a fried chicken<br>drumstick",
    shortSubject: "a fried chicken drumstick",
    lessonTitle: "Let's draw a fried chicken drumstick",
    description: "Learn how to draw a fried chicken drumstick with a light drumstick guide, short bone handle, bumpy coating, crumb dots, crackle marks, simple paper wrapper, golden marker fill, and thick black outlines.",
    intro: "Start with a light drumstick guide, then replace the smooth edge with a crunchy bumpy outline, add crumbs, set it on a simple paper wrapper, and fill it with warm marker color. Change the crunch marks later, but keep the bone and coating clear.",
    time: 15,
    difficulty: "Intermediate",
    accent: "#e49a28",
    finished: "fried-chicken-drumstick-doodle-finished-v1.jpg",
    finishedAlt: "Bold marker doodle of a fried chicken drumstick with golden-orange crunchy coating, crumb dots, crackle marks, pale bone handle, thick black outlines, white highlight gaps, and gray paper wrapper",
    materials: ["Drawing paper", "Black and colored markers", "White gel pen"],
    materialNote: "Use black for the outline and crumb marks, golden orange for the crust, pale cream for the bone, gray for the paper wrapper, and the gel pen only for small highlight gaps.",
    tipLabel: "Doodle tip",
    steps: [
      {
        name: "Block the drumstick",
        text: "Sketch a light teardrop guide for the chicken shape, then attach a short bone handle at the narrow end.",
        tip: "Treat the first curve as a size guide, not the final crust edge. The bumpy coating comes next."
      },
      {
        name: "Bump the crispy edge",
        text: "Replace the smooth guide with an uneven bumpy coating, then round off the bone end.",
        tip: "Let the bumps vary in size. Perfect scallops can make the crust look like a decorative cloud."
      },
      {
        name: "Sprinkle the crust",
        text: "Add crumb dots, short crackle dashes, and small texture marks across the existing crust.",
        tip: "Cluster a few marks and leave open spaces. Too many specks can muddy the marker fill."
      },
      {
        name: "Set bone and wrapper",
        text: "Add the small bone-end detail, then slide a simple paper wrapper shape behind the drumstick.",
        tip: "Keep the wrapper light and flat. It should support the chicken without stealing attention."
      },
      {
        name: "Color the crispy coat",
        text: "Color the crust golden orange, fill the bone pale cream, and leave a few small highlight gaps.",
        tip: "Let the marker strokes show through the color. The streaks make the fried coating feel handmade."
      },
      {
        name: "Crunch up the finish",
        text: "Thicken the bumpy black outline, even the existing marker fills, clarify the crumb marks, and strengthen the same wrapper shadows.",
        tip: "Stop before adding a plate, sauce cup, face, or border. The crust, bone, crumbs, and color are enough.",
        image: true
      }
    ]
  },
  {
    slug: "cartoon-pool-float-doodle",
    day: "032",
    date: "Saturday, June 6",
    isoDate: "2026-06-06",
    subject: "a cartoon pool float doodle",
    headlineSubject: "a cartoon<br>pool float doodle",
    shortSubject: "a cartoon pool float doodle",
    lessonTitle: "Let's doodle a cartoon pool float",
    description: "Learn how to draw a cartoon pool float doodle with a tilted inflatable ring, inner hole, soft thickness, curved stripe panels, water ripples, shine gaps, bright marker fills, and thick black outlines.",
    intro: "Build the float from two tilted ellipses, inflate the edge, then wrap stripes around the ring before adding water and marker color. You can swap the colors later; keep the hole and outer ring lined up first.",
    time: 15,
    difficulty: "Challenge",
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
    day: "061",
    date: "Sunday, July 5",
    isoDate: "2026-07-05",
    updated: "2026-07-06",
    subject: "a graham cracker s'more doodle",
    headlineSubject: "a graham cracker<br>s'more doodle",
    shortSubject: "a graham cracker s'more doodle",
    lessonTitle: "Let's doodle a graham cracker s'more",
    description: "Learn how to draw a graham cracker s'more doodle with stacked crackers, puffy marshmallow, visible chocolate slab, cracker holes, melty edges, bold black outlines, marker fills, and shine gaps.",
    intro: "Build the s'more as a stack first, place the chocolate before the marshmallow, then add cracker dots, melty edges, and warm marker color. Keep the layers clear, then change the cracker tilt or marshmallow squish when you make another one.",
    time: 15,
    difficulty: "Intermediate",
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
        name: "Lay in chocolate",
        text: "Draw the chocolate slab on top of the bottom cracker, keeping it visible along the front and side.",
        tip: "Add chocolate before the marshmallow. That way nothing has to be erased or squeezed in later."
      },
      {
        name: "Add the marshmallow",
        text: "Draw the puffy marshmallow above and partly in front of the chocolate, leaving the chocolate layer visible below it.",
        tip: "Let the marshmallow bulge over the chocolate in spots, but do not cover the whole slab."
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
    day: "033",
    date: "Sunday, June 7",
    isoDate: "2026-06-07",
    subject: "a cartoon cactus sticker",
    headlineSubject: "a cartoon<br>cactus sticker",
    shortSubject: "a cactus sticker",
    lessonTitle: "Let's doodle a cartoon cactus sticker",
    description: "Learn how to draw a cartoon cactus sticker with a squat flower pot, tall rounded cactus stem, side arms, spine dashes, top flower, bright marker fills, shine gaps, and a gray sticker shadow.",
    intro: "Start with the pot, grow the cactus upward, then add arms, spines, a tiny flower, and bold marker color. This version stays face-free, but you can change the flower color or pot stripe once the cactus shape is clear.",
    time: 15,
    difficulty: "Intermediate",
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
    day: "034",
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
    day: "035",
    date: "Tuesday, June 9",
    isoDate: "2026-06-09",
    subject: "a parade drum doodle",
    headlineSubject: "a parade<br>drum doodle",
    shortSubject: "a parade drum",
    lessonTitle: "Let's doodle a parade drum",
    description: "Learn how to draw a parade drum doodle with a round drum shell, top and bottom rims, side lugs, crossed drumsticks, center star, bold marker fills, shine gaps, and a sticker shadow.",
    intro: "Start with a simple drum cylinder, stack on the rims and lugs, then cross the sticks and drop a star on the front before coloring it like a parade badge. Keep the shapes big and graphic so the marker finish stays readable.",
    time: 15,
    difficulty: "Intermediate",
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
    day: "059",
    date: "Friday, July 3",
    isoDate: "2026-07-03",
    subject: "a comic firecracker doodle",
    headlineSubject: "a comic<br>firecracker doodle",
    shortSubject: "a firecracker doodle",
    lessonTitle: "Let's doodle a comic firecracker",
    description: "Learn how to draw a comic firecracker doodle with a tilted cylinder body, wrapper bands, curved fuse, spark bursts, thick black outline, red and yellow marker fills, shine gaps, and a gray sticker shadow.",
    intro: "Build the firecracker as one tilted cylinder, bend the fuse, pop in a few sparks, then add loud marker color. Keep it text-free so the simple shape and fuse do the work.",
    time: 15,
    difficulty: "Intermediate",
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
    day: "060",
    date: "Saturday, July 4",
    isoDate: "2026-07-04",
    subject: "a cartoon barbecue grill doodle",
    headlineSubject: "a cartoon barbecue<br>grill doodle",
    shortSubject: "a grill doodle",
    lessonTitle: "Let's doodle a cartoon barbecue grill",
    description: "Learn how to draw a cartoon barbecue grill doodle with an open kettle bowl, thick rim, side handles, short legs, wheels, grate, flames, smoke curls, red marker fill, shine gaps, and a sticker shadow.",
    intro: "Build the grill as an open bowl, stand it on short legs, then add the rim, grate, little flames, smoke, and bright marker color. Keep it text-free and face-free so the simple barbecue shape does the work.",
    time: 15,
    difficulty: "Challenge",
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
    day: "036",
    date: "Wednesday, June 10",
    isoDate: "2026-06-10",
    subject: "a beach umbrella badge",
    headlineSubject: "a beach<br>umbrella badge",
    shortSubject: "a beach umbrella",
    lessonTitle: "Let's doodle a beach umbrella badge",
    description: "Learn how to draw a beach umbrella badge with a rounded canopy, scalloped edge, center pole, top knob, curved panel seams, thick black outline, bright marker fills, shine gaps, and a gray sticker shadow.",
    intro: "Start with one big canopy arc, scallop the bottom, then add the pole, panel seams, and sunny marker fills. Change the panel colors if you want; keep the seams clear before coloring.",
    time: 15,
    difficulty: "Intermediate",
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
    day: "037",
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
    day: "038",
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
    day: "058",
    date: "Thursday, July 2",
    isoDate: "2026-07-02",
    subject: "a sunscreen bottle sticker",
    headlineSubject: "a sunscreen<br>bottle sticker",
    shortSubject: "a sunscreen bottle",
    lessonTitle: "Let's doodle a sunscreen bottle sticker",
    description: "Learn how to draw a sunscreen bottle sticker with a rounded bottle body, flip cap, blank label panel, wink expression, sun badge, thick black outline, yellow marker fill, blue accents, white highlights, and gray sticker shadow.",
    intro: "Build a rounded bottle first, add the cap and blank label, then give it a wink, a sun badge, and bright marker color. Keep the label text-free so the face and shape stay playful.",
    time: 15,
    difficulty: "Intermediate",
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
    day: "039",
    date: "Saturday, June 13",
    isoDate: "2026-06-13",
    subject: "a bubble-letter WOW doodle",
    headlineSubject: "a bubble-letter<br>WOW doodle",
    shortSubject: "a WOW doodle",
    lessonTitle: "Let's doodle a bubble-letter WOW",
    description: "Learn how to draw a bubble-letter WOW doodle with light letter guides, rounded bubble outlines, thick black marker, comic burst marks, pink and orange fill, white shine gaps, and a purple drop shadow.",
    intro: "Start with loose letter guides, puff them into bubble letters, then add comic bursts, loud marker color, shine gaps, and a drop shadow. Keep the letters chunky and readable before you decorate.",
    time: 15,
    difficulty: "Challenge",
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
    day: "057",
    date: "Wednesday, July 1",
    isoDate: "2026-07-01",
    subject: "a whoopee cushion sticker",
    headlineSubject: "a whoopee<br>cushion sticker",
    shortSubject: "a whoopee cushion",
    lessonTitle: "Let's doodle a whoopee cushion sticker",
    description: "Learn how to draw a whoopee cushion sticker with a squashed cushion body, side nozzle, multiple puff clouds, tongue-out goofy face, thick black outline, red marker fill, and white highlights.",
    intro: "Build one squashed cushion from the outside shape first, point the nozzle, add puff clouds and a tongue-out face, then finish it with bold red marker. Keep the joke visual and text-free so the shape does the work.",
    time: 15,
    difficulty: "Challenge",
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
    day: "040",
    date: "Sunday, June 14",
    isoDate: "2026-06-14",
    subject: "a retro arcade joystick sticker",
    headlineSubject: "a retro arcade<br>joystick sticker",
    shortSubject: "a retro arcade joystick",
    lessonTitle: "Let's doodle a retro arcade joystick sticker",
    description: "Learn how to draw a retro arcade joystick sticker with a rounded base, joystick stem, red ball top, yellow buttons, cute face, star accent, thick black outline, teal marker fill, and gray shadow.",
    intro: "Build the controller base first, add the stick and buttons, then turn it into a bright arcade sticker with a tiny face, star, and marker color. Change the button colors if you want your own cabinet vibe.",
    time: 15,
    difficulty: "Challenge",
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
    day: "056",
    date: "Tuesday, June 30",
    isoDate: "2026-06-30",
    subject: "a cartoon asteroid doodle",
    headlineSubject: "a cartoon<br>asteroid<br>doodle",
    shortSubject: "an asteroid doodle",
    lessonTitle: "Let's doodle a cartoon asteroid",
    description: "Learn how to draw a cartoon asteroid doodle with a lumpy rock body, flame trail, crater spots, cute face, star puffs, thick black outline, and bright marker fills.",
    intro: "Build one lumpy space rock, trail it with comic flames, then add craters, a happy face, and bold marker color. The exact face, crater count, and flame shape are yours to play with.",
    time: 15,
    difficulty: "Intermediate",
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
    day: "041",
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
    day: "042",
    date: "Tuesday, June 16",
    isoDate: "2026-06-16",
    subject: "a smiling envelope sticker",
    headlineSubject: "a smiling<br>envelope<br>sticker",
    shortSubject: "an envelope sticker",
    lessonTitle: "Let's doodle a smiling envelope sticker",
    description: "Learn how to draw a smiling envelope sticker with rounded corners, folded flap lines, cute face, heart stamp, gray shadow, thick black outline, and yellow marker fill.",
    intro: "Start with one rounded rectangle, fold it into an envelope, then add a friendly face, stamp, sticker shadow, and warm marker color. The stamp and expression can change to fit your doodle.",
    time: 15,
    difficulty: "Intermediate",
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
    day: "055",
    date: "Monday, June 29",
    isoDate: "2026-06-29",
    subject: "a comic camera flash doodle",
    headlineSubject: "a comic camera<br>flash doodle",
    shortSubject: "a camera flash doodle",
    lessonTitle: "Let's doodle a camera flash",
    description: "Learn how to draw a comic camera flash doodle with a rounded camera body, big lens, starburst flash, cute face, strap, thick black outline, and bright marker fills.",
    intro: "Turn a simple camera shape into a cheerful marker doodle with one big lens, a pop of flash, and bold color that fits Camera Day.",
    time: 15,
    difficulty: "Intermediate",
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
    day: "054",
    date: "Sunday, June 28",
    isoDate: "2026-06-28",
    subject: "a cassette tape sticker doodle",
    headlineSubject: "a cassette<br>tape sticker",
    shortSubject: "a cassette tape sticker",
    lessonTitle: "Let's doodle a cassette tape sticker",
    description: "Learn how to draw a cassette tape sticker doodle with a rounded body, blank label window, tape reels, bottom stripe, screw dots, thick black outline, and bright marker fills.",
    intro: "Turn one rounded rectangle into a retro marker sticker with blank label space, two tape reels, and a chunky black outline.",
    time: 15,
    difficulty: "Challenge",
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
    day: "053",
    date: "Saturday, June 27",
    isoDate: "2026-06-27",
    subject: "a skateboard sticker doodle",
    headlineSubject: "skateboard<br>sticker",
    shortSubject: "a skateboard sticker",
    lessonTitle: "Let's doodle a skateboard sticker",
    description: "Learn how to draw a skateboard sticker doodle with a rounded deck, trucks, wheels, cute face, star sticker, diagonal stripes, thick black outline, and bright marker fills.",
    intro: "Turn one rounded deck into a cheerful sticker-style skateboard with bold marker edges, simple wheels, and a tiny face.",
    time: 15,
    difficulty: "Challenge",
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
    day: "052",
    date: "Friday, June 26",
    isoDate: "2026-06-26",
    subject: "a cartoon coconut drink doodle",
    headlineSubject: "a cartoon<br>coconut<br>drink",
    shortSubject: "a cartoon coconut drink",
    lessonTitle: "Let's doodle a coconut drink",
    description: "Learn how to draw a cartoon coconut drink doodle with a round coconut body, top opening, cute face, bendy straw, tiny umbrella, thick black outline, and bright marker fills.",
    intro: "Turn a round coconut into a cheerful tropical marker doodle with one face, one straw, and a small umbrella that stays easy to build.",
    time: 15,
    difficulty: "Intermediate",
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
    day: "051",
    date: "Thursday, June 25",
    isoDate: "2026-06-25",
    subject: "a smiling pizza slice doodle",
    headlineSubject: "a smiling<br>pizza slice",
    shortSubject: "a smiling pizza slice",
    lessonTitle: "Let's doodle a pizza slice",
    description: "Learn how to draw a smiling pizza slice doodle with a bold black marker outline, puffy crust, cute face, pepperoni circles, cheese stretch, and bright marker fills.",
    intro: "Turn one simple triangle into a cheerful marker doodle with thick outlines, saturated color, and a face that stays easy to draw. Toppings are a chance to make the slice your own.",
    time: 15,
    difficulty: "Intermediate",
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
    day: "050",
    date: "Wednesday, June 24",
    isoDate: "2026-06-24",
    subject: "hot rod marker flames",
    headlineSubject: "hot rod<br>marker flames",
    shortSubject: "hot rod marker flames",
    lessonTitle: "Let's doodle flames",
    description: "Learn how to draw hot rod-style marker flames with bold black outlines, orange fill, yellow inner flames, red edge accents, and handmade marker texture.",
    intro: "Try a bolder doodlea.day mode: black felt-tip outlines, bright marker fill, and a simple flame shape that feels more comic panel than pencil sketch.",
    time: 15,
    difficulty: "Intermediate",
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
    day: "049",
    date: "Tuesday, June 23",
    isoDate: "2026-06-23",
    subject: "a firework burst doodle",
    headlineSubject: "a firework<br>burst",
    shortSubject: "a firework burst",
    lessonTitle: "Let's doodle a firework burst",
    description: "Learn how to draw a firework burst doodle with a bright center, bold black burst shapes, red and blue marker fills, small sparks, and comic-style energy.",
    intro: "Build a patriotic firework from one center dot and repeated burst shapes, then make it pop with thick outlines and bright marker color.",
    time: 15,
    difficulty: "Intermediate",
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
    day: "048",
    date: "Monday, June 22",
    isoDate: "2026-06-22",
    subject: "a trophy cup sticker",
    headlineSubject: "a trophy cup",
    shortSubject: "a trophy cup",
    lessonTitle: "Let's doodle a trophy cup",
    description: "Learn how to draw a trophy cup sticker with a rounded cup, side handles, thick black outline, gold marker fill, orange shadow, shine marks, and small confetti dots.",
    intro: "Use one big cup shape and two loop handles to make a celebratory marker doodle that feels like a sticker.",
    time: 15,
    difficulty: "Intermediate",
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
    day: "045",
    date: "Friday, June 19",
    isoDate: "2026-06-19",
    subject: "a goofy monster face",
    headlineSubject: "a goofy<br>monster face",
    shortSubject: "a goofy monster face",
    lessonTitle: "Let's doodle a goofy monster face",
    description: "Learn how to draw a goofy monster face with a round head, little horns, uneven eyes, toothy grin, cheek spots, thick black outline, and bright marker fills.",
    intro: "Start with one friendly blob shape, then add horns, mismatched eyes, and a big toothy grin before the marker color goes in. Monster faces are especially good for playful detours.",
    time: 15,
    difficulty: "Intermediate",
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
    day: "043",
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
    day: "044",
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
    day: "046",
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
    day: "047",
    date: "Sunday, June 21",
    isoDate: "2026-06-21",
    subject: "a silly robot head",
    headlineSubject: "a silly<br>robot head",
    shortSubject: "a silly robot head",
    lessonTitle: "Let's doodle a robot head",
    description: "Learn how to draw a silly robot head with a rounded blue face, spring antenna, side bolts, mismatched eyes, toothy grin, bottom button panel, and bold marker color.",
    intro: "Build a goofy robot from one rounded rectangle, then add mismatched eyes, a big grin, an antenna, and saturated marker color.",
    time: 15,
    difficulty: "Intermediate",
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
const headlineLines = (value, slug) => {
  const manualLines = String(value)
    .split(/<br\s*\/?>/i)
    .map((line) => line.trim())
    .filter(Boolean);

  if (!manualLines.length) {
    throw new Error(`${slug}: headlineSubject cannot be empty.`);
  }

  const strandedLine = manualLines.find((line) =>
    line.length === 1 || /^(?:a|an|the)$/i.test(line));
  if (strandedLine) {
    throw new Error(`${slug}: headlineSubject strands "${strandedLine}" on its own line; keep articles with their noun phrase.`);
  }

  const compactLength = manualLines.join(" ").replace(/\s+/g, "").length;
  return compactLength <= 12 ? [manualLines.join(" ")] : manualLines;
};
const headlineHtml = (value, slug) => headlineLines(value, slug)
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
        <h1 id="hero-title" aria-label="How to draw ${lesson.subject}"><span class="headline-lead">How to draw...</span> <em aria-hidden="true">${headlineHtml(lesson.headlineSubject ?? lesson.subject, lesson.slug)}</em></h1>
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
      <nav aria-label="Footer navigation"><a href="../">Today</a><a href="../library.html">Library</a><a href="../about.html">About</a><a href="https://sketcha.day/">sketcha.day</a><a href="mailto:hello@doodlea.day">Say hello</a></nav>
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
        description: "Learn how doodlea.day turns quick marker prompts into playful practice for bolder lines, clearer cartoon shapes, and brighter ideas.",
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
  <meta name="description" content="Meet the family behind doodlea.day and learn why the site focuses on quick marker prompts, cartoon shapes, bold outlines, and daily doodle practice.">
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
        <p>doodlea.day is made by Robby McCullough, a lifelong doodler, designer, and web guy. This site started as an experiment after he used an AI-generated drawing tutorial of a cowboy hat to make his partner, Tracie, a homemade birthday card.</p>
        <p>This site is for marker doodles that turn simple shapes into characters, stickers, badges, bursts, and comic little details. Our sister site sketcha.day is for more detailed and pencil-forward drawing practice.</p>
        <p>Robby brings doodle habit, design instincts, and web craft to the lessons. Tracie, a mom and early childhood educator, helps keep the tone welcoming and the steps easy to jump into for kids, parents, teachers, and grown-ups who want a playful creative break.</p>
        <p>We hope taking a little break each day to create artwork brings your family as much joy as it's brought ours. See you tomorrow!</p>
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
      <nav aria-label="Footer navigation"><a href="/">Today</a><a href="library.html">Library</a><a href="about.html" aria-current="page">About</a><a href="https://sketcha.day/">sketcha.day</a><a href="mailto:hello@doodlea.day">Say hello</a></nav>
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
      <p>Coming soon: one prompt, one marker-friendly tutorial, and a cheerful reason to doodle again tomorrow. Want it first? <a href="mailto:hello@doodlea.day?subject=doodlea.day%20daily%20email%20interest">Email us to say you're interested</a>.</p>
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
  <meta name="description" content="Browse every doodlea.day tutorial. Find daily marker doodle lessons that help you practice shape, line weight, expression, color, and cartoon drawing.">
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
        <p>Browse easy step-by-step doodle tutorials for quick marker practice. Each doodlea.day lesson breaks cartoon objects, comic marks, expressive faces, and playful drawing ideas into approachable frames for simple shapes, bold outlines, bright color, and a finished doodle.</p>
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
      <nav aria-label="Footer navigation"><a href="/">Today</a><a href="library.html" aria-current="page">Library</a><a href="about.html">About</a><a href="https://sketcha.day/">sketcha.day</a><a href="mailto:hello@doodlea.day">Say hello</a></nav>
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
