# Mermaid Beach Resort — visual redesign concept

A six-page, static, responsive brand site for Mermaid Beach Resort in Cox's Bazar. Open `index.html` through a local HTTP server; the project has no build step.

```powershell
python -m http.server 8765 --bind 127.0.0.1
```

Run the command from the project directory.

Then visit `http://127.0.0.1:8765/`.

## Pages

- `index.html` — cinematic home and tidal scroll scene
- `stays.html` — seven accommodations, filters, actual resort room photos and published starting rates
- `experiences.html` — shore, garden, making and water stories
- `dining.html` — Breakfast Club, Eat the Time and local food story
- `story.html` — material, landscape and brand narrative
- `book.html` — date, guest, stay and contact form with a live planning estimate

The booking form validates dates, required contact details and listed adult occupancy, then opens a prefilled WhatsApp request to the resort's published reservations number. It is an enquiry, not a live inventory system, confirmed reservation or payment flow. The resort must confirm final availability and pricing. For production instant booking, connect a property-management or booking-engine API and replace the WhatsApp handoff.

## Design and media

The original vector logo is in `assets/logo-mark.svg` and `assets/logo-lockup.svg`. Actual property imagery from the public resort site appears in accommodation cards and editorial details. Four AI-generated campaign concepts create the atmosphere; they are visually distinct from authentic accommodation listings. Optimized WebP files are used on the site and high-resolution generated masters are retained in `assets/img/`.

The available built-in image generation tool was used with the user's approval. It did not expose a selectable GPT Image 2.5 Sunburst model, so this project does not claim that model. Art direction for the four concepts: a timber villa among palms at dawn; reflective tidal shoreline; local fish meal by the beach; quiet Bay of Bengal boat scene. The translation rationale is in `translation.md`.

Motion uses vendored GSAP/ScrollTrigger and Lenis. Lenis is desktop-only and disabled for visitors requesting reduced motion. The core layout and content work without animation libraries. Google Fonts are optional and have local font-family fallbacks.

## Verification

Browser review was run on 2026-09-24 at 1440px and 390px. All six pages returned 200 with no console exceptions, broken loaded images or horizontal overflow at those widths. The mobile menu, stay filters, URL preselection, estimate and WhatsApp request handoff were also exercised.

This is a brand/website concept, not an official deployment. Confirm photo usage rights, resort copy, tariffs, policies and reservation channel with the property before publishing.
