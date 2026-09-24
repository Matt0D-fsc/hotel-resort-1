# Translation — Mermaid Beach Resort

Status: Revised translation ✅ · build ✅ · visual QA ✅
Library: `design-dna/` (11 DNAs on 2026-09-24)

## Revision 2 — The Tide Ledger

The first release below is retained as a decision record. The user correctly identified that its Rosa-led calmness did not express the point of the design-DNA library: a distinctive blend of different layout and motion systems. The current site therefore uses **Da Maria Roma as the editorial base**, with HORECA Social, Krem Kanel and Flor Porto as named, visible donors. Rosa remains only in some supporting inner-page reveals; it is no longer the organizing concept.

The new positioning is a hand-kept journal of a day at Mermaid: printed field notes, a living sequence of light, physical accommodation folios, overlapping photographs and an invitation that reads like a travel document. This is a redesign, not a replica of any one reference. Creative selections were made under the user's original “be creative” delegation and their later request to mix and match the extracted ideas.

| Source DNA / source move | KEEP | ADAPT at Mermaid | Where |
|---|---|---|---|
| Da Maria Roma §01/§03, M00/M01/M02 | editorial ruled grid, serif/sans hierarchy, print-like page turn, character entry, 40s repeated type marquee | coastal field-note numbering, coral seal, enormous Mermaid masthead, page-sheet transitions | all pages; home cover, invitation, marquees |
| HORECA Social M03 | service cards stack and recede with perspective, scale `.7`, X rotation `40°`, small Z rotation | three real-room “stay folios,” each overtaking the previous one | home stay chapter |
| Krem Kanel M02 | organic form travels in response to scroll | warm-paper tidal SVG eats the bottom of the cover photograph; 50% travel on desktop, static on mobile | home cover |
| Flor Porto M02 | light and copy shift as the visitor scrolls through a day | three-scene dawn / afternoon / dinner photo crossfade with a day-progress rule | home hours chapter |
| Existing resort site | real accommodation categories, photographs, rates, contact channel | honest room folios and catalogue; enquiry rather than fictional live inventory | stays and booking |

The color system is now ink `#17343c`, warm paper `#f4ede0`, coral `#bf4e36`, sea-glass and sun-clay. Bodoni Moda carries display, DM Sans carries body, and Barlow Condensed carries issue metadata and actions. The supplied vector logo remains the consistent global brand mark, rather than becoming a decorative one-off. The four generated campaign images remain atmospheric concepts; actual room images stay attached to room offers.

The architecture is still six pages, but the homepage is a longer journal rather than the prior linear luxury template: printed cover → oversized type strip → invitation → changing hours → stacked room folios → dark field scrapbook → dining spread → uneven day postcards → oversized enquiry seal. The inner pages carry the paper/ink typographic system, while the booking form is a numbered travel document with an updating stay preview. One GSAP/ScrollTrigger runtime and one Lenis instance drive the motion. A reduced-motion path disables scroll choreography and keeps all content available.

### Revision QA

- Inspected the extracted DNA text and visual captures for Da Maria Roma, HORECA Social, Krem Kanel and Flor Porto, and mapped each named donor to an implemented section or motion rule.
- Reviewed viewport captures of the dawn/afternoon/dinner transitions, all three folio states, field scrapbook, dining spread, postcard section and closing enquiry at 1440px and 390px. Mobile CTA was reduced from a full-width overlay to a compact seal; the organic tide motion is suppressed on small screens.
- Rechecked the six-page site in browser at 1440px and 390px for page errors, image loads, overflow, stay filtering and booking estimate/capacity feedback. The enquiry is still sent through a prefilled WhatsApp message, not a live reservation.

## Initial release record — The Breathing Coast

## Idea
Use the translator skill to build and design a brand redesign for https://mermaidbeachresort.net/. Create a logo and use it. Take images from the site and generate new ones for an Awwwards-level visual aesthetic. Make an organized, creative, multi-page visual storytelling site with a visually aesthetic booking solution, GSAP, Lenis, motion, visual positioning and color. The user delegated creative choices with “be creative.” For generated imagery, the user accepted the available built-in image tool when a selectable GPT Image 2.5 Sunburst path was unavailable.

## Brief
- Offer & audience: Mermaid Beach Resort, Pechardwip, Cox's Bazar; couples, families and small groups seeking a nature-led beach retreat. Source: public resort site, captured 2026-09-24.
- Primary action: send a stay reservation request with dates, guests and room category. Secondary: explore stays, dining and experiences.
- Feeling: tidal, intimate, unhurried. Leave with: “I can picture myself there.” `[agent-pick]`
- Difference: low handmade timber/bamboo villas, palms and beach, organic food, relaxed local hospitality, playful room names; no tower-hotel aesthetic.
- Content available: live site names, amenities, starting rates, contact details and public room photography. Agent created logo and four campaign visuals; all generated campaign images are marked as concepts.
- Taste references: Rosa Hotels for cinematic hospitality hierarchy and calm collage; Serotoninn's one scroll-mask dive; Amrit Palace's reachable booking action.
- Boldness: 4/5; expressive scroll moment within a quiet usable interface. `[agent-pick]`
- Pages & stack: six HTML pages (`index`, `stays`, `experiences`, `dining`, `story`, `book`) with shared CSS and JS, GSAP/ScrollTrigger and Lenis.
- Constraints: mobile booking access, reduced-motion path, real room photos on accommodation choices, no false availability or confirmed payment. Booking ends in a prefilled WhatsApp inquiry to the published reservation hotline.

## Shortlist
Scores 0–3 on feeling, story fit, content fit, position and boldness.

| DNA | Feeling | Story | Content | Position | Boldness | Total | Note |
|---|---:|---:|---:|---:|---:|---:|---|
| rosa-hotels | 3 | 3 | 3 | 3 | 2 | 14 | Best base for calm cinematic hospitality |
| florporto | 3 | 2 | 2 | 3 | 1 | 11 | Strong montage but weak booking spine |
| amritpalace | 2 | 3 | 2 | 2 | 2 | 11 | Strong conversion donor |
| serotoninn | 1 | 2 | 3 | 1 | 3 | 10 | Water-mask donor only |
| tillysveaas | 2 | 2 | 2 | 3 | 0 | 9 | Too still for requested motion |
| damaria-roma | 1 | 2 | 2 | 2 | 1 | 8 | Editorial but print metaphor less fitting |
| theirnibs | 1 | 2 | 2 | 1 | 1 | 7 | Friendly but commerce-heavy |
| brars | 0 | 2 | 2 | 1 | 2 | 7 | Too saturated and product-oriented |
| kremkanel | 1 | 1 | 2 | 1 | 2 | 7 | Organic forms, too playful |
| horeca-social | 0 | 1 | 2 | 0 | 3 | 6 | Too loud for restful positioning |
| aspensearch | 0 | 1 | 0 | 1 | 1 | 3 | Technical language mismatched |

## Direction
- Chosen `[agent-pick]`: **The Breathing Coast** — an editorial journey from dawn into tide, then into the real villas and simple pleasures of the resort.
- Base DNA: `rosa-hotels`. Donor moves: `serotoninn M07-c/d` for a tide-shaped scroll dive; `amritpalace §00` for always-reachable booking access. One smooth-scroll implementation.
- Story arc: cinematic shore → welcome → tide immersion → real stays → philosophy → dining → experiences → booking invitation.
- Signature moment: the small portrait of the Bay expands from a 30% circular portal to a 440% full-bleed sea scene during scroll, so the visitor feels the coast open around them.
- KEEPs broken: none in creative concept. The user explicitly requires Lenis, so Lenis is added to Rosa's otherwise undocumented smooth-scroll setup.
- Alternate directions considered: **Stillwater Atlas** (straight Rosa, quieter and less memorable); **Salt & Signal** (bold near-monochrome with oversized nav typography; less warm and intimate).

## Foundation
### Palette
| Role | Rosa token | New value | Used for | Rule kept |
|---|---|---|---|---|
| primary | `#1c2126` | `#17342e` deep palm | ink, dark chapter | one near-black organic tone |
| secondary | `#f0e8e3` | `#f3eee4` shell | main canvas | warm mineral base |
| white | `#ffffff` | `#fffaf1` foam | text and bright field | luminous counterpoint |
| hotels | `#5f6754` | `#687f70` seagrass | stays | low-chroma category |
| gastro | `#c2b09c` | `#c89c80` sun clay | dining | low-chroma category |
| leisure | `#a7b2c4` | `#a9c5c5` tide glass | experiences | low-chroma category |
| origins | `#462f34` | `#4f5644` grove | story | grounded chapter |
| tertiary | `#dd9366` | `#c98965` sunset | tiny marks/buttons | rare warm accent |

### Type
| Role | Base | New | Rule |
|---|---|---|---|
| sans | PP Fragment Sans | Manrope | large clean statements, compact utility |
| serif | PP Fragment Serif | Cormorant Garamond italic | emotional pivots only |

Display ranges from `clamp(4.4rem, 10vw, 10rem)` on desktop and `clamp(3.2rem, 13vw, 5.4rem)` on mobile; restrained body and generous line height. The replacement honors the base's sans/italic contrast; exact numeric source type scale was unavailable in the Rosa package and is an intentional implementation choice.

### Texture & imagery
Rosa's circular swimmer film becomes an opening through tidal water. Staggered property imagery uses authentic resort photos. Generated campaign visuals supply dawn, shoreline, dining and coastal atmosphere. Photography keeps actual low architecture, palms, bamboo, timber and flat Bay of Bengal geography.

### Motion
GSAP + ScrollTrigger for precise pinned/timed scenes; Lenis on desktop when reduced motion is off; CSS eases match Rosa's `expoOut` and `expoInOut` values. Base IDs M00–M07 adapted by subject; donor `serotoninn M07-c/d` carries the scroll mask `30→440%` and image settle `1.2→1` over the first 30% of scroll.

### Voice
Quiet, tactile, invitational. Short poetic claims paired with useful plain-language details. Hero: “Let the world drift away.” `[agent-pick]`

## Sections
All sections and page roles are `[agent-pick]` under the user's creative delegation. Source reference is `rosa-hotels` unless a donor is named.

| Page | Section / role | Source | KEEP | ADAPT / new content | Layout and motion |
|---|---|---|---|---|---|
| Home | Hero / hook | Rosa §01 | multi-viewport worldview; sans + selective italic | dawn villa photo, “Let the world drift away”; Pechardwip location | full bleed, large type, M01/M02 |
| Home | Welcome / orient | Rosa §03 | typographic breath | handcrafted, rooted in shore | centered narrow paragraph, M04 |
| Home | Tide / desire | Rosa §01 + Serotoninn M07-c/d | circular cinema concept | shoreline expands around the visitor | sticky 220vh, 30→440% mask, 1.2→1 image |
| Home | Stays / offer | Rosa §02 | cards immediately after the emotion | real 3-category photography, starting rates | 3 editorial cards, M03 |
| Home | Earth / differentiate | Rosa §05 | exactly one dark tonal inversion | reclaimed timber, organic garden, locally sourced food | dark statement + collage, M05 |
| Home | Dining / desire | Rosa §07 | film/sensory break | generated local fish editorial, real-source culinary details | cinematic media with restraint, M06 |
| Home | Experiences / desire | Rosa §08 | partial neighboring cards | shore, garden and craft | draggable/snap cards, M07 |
| Home | Book / close | Amrit §00 | visible action | reservation request | immersive footer + persistent CTA |
| Stays | Introduction + category catalogue / offer | Rosa §02 | generous editorial cards | seven verified room categories, rates, key amenities | alternating 2-column image/text cards, M03/M04 |
| Experiences | Coast, garden, art / desire | Rosa §06/08 | category hues and paced stories | beachfront, tree planting, painting, kayak/day tour | staggered cards, gentle parallax, M04/M07 |
| Dining | Food landscape / desire | Rosa §07 | sensory media emphasis | breakfast club, Eat the Time, organic/local sourcing | large editorial photos, M06 |
| Story | Place + material / differentiate | Rosa §04/05 | collage and one dark chapter | Pechardwip, reclaimed teak, bamboo, slow living | image collage, dark belief statement, M04/M05 |
| Book | Stay request / close | Amrit §00 + Rosa §02 | easy reach, calm interface | dates, guests, room, contact, estimate, WhatsApp handoff | form + live summary; no fake availability |

## Asset plan
| Slot | Page/section | Source | Production brief | Status |
|---|---|---|---|---|
| `assets/img/01-dawn-hero.webp` | Home hero | generated from source photos 17/25 | shore-facing handmade villa at dawn | generated concept |
| `assets/img/02-tidal-shore.webp` | Home tide | generated from source photo 20 | shallow tide and palms for circular reveal | generated concept |
| `assets/img/03-dining.webp` | Home/Dining | generated from source photo 84 | local fish lunch by the shore | generated concept |
| `assets/img/04-coast.webp` | Experiences/Story | generated | quiet Bay of Bengal beach | generated concept |
| `assets/img/stay-*.webp` | Stays/Booking | original resort photos 01, 08, 17, 29, 33, 38, 48 | factual category photos | real site photo |
| `assets/img/story-*.webp` | Story/Experience | original resort photos 02, 18, 25, 79 | factual detail photos | real site photo |
| `assets/logo-mark.svg`, `assets/logo-lockup.svg` | global | original vector mark | twin tidal crests inside horizon circle | complete |

## Build log
- 2026-09-24: Read 11 DNAs, inspected current public resort copy and 90 original photographs, selected the Rosa base and named donors. User accepted built-in image generation in place of unavailable model-selectable Sunburst.
- 2026-09-24: Created vector brand mark and four generated campaign images; preserved original room photographs for room selection.
- 2026-09-24: Built six responsive pages with shared chrome, original brand palette and logo, a sticky tide portal, property reveals, image parallax, draggable experience rail, a dark material chapter and persistent mobile stay CTA. GSAP/ScrollTrigger and Lenis are vendored locally; a reduced-motion path is present.
- 2026-09-24: Built a validated reservation enquiry with dates, adult occupancy, live published-rate estimate and prefilled WhatsApp handoff. It intentionally does not claim live availability or payment capability.
- 2026-09-24: Reviewed every page in headless Chrome at 1440px and 390px. Fixed story headline overflow, non-image booking header contrast and subpage hero inset. Final checks: HTTP 200 on all pages, no page errors, no broken loaded images, zero horizontal overflow. Interaction checks passed for mobile navigation, stay filters, URL preselection and WhatsApp message data.

## Handoff
- Output: `sites/mermaid-beach-resort/` with run guide in `README.md`.
- Booking is a real enquiry handoff, not an instant reservation. Production deployment needs a confirmed WhatsApp channel or booking-engine integration, property-approved imagery/copy and current rate feed.
- The user's requested Sunburst image model was not selectable in this environment. They approved using the available image tool, and generated assets are labeled as campaign concepts, not factual property photographs.
