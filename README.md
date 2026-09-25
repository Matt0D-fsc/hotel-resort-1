# Mermaid Beach Resort — Rosa-led redesign

A six-page, static, responsive brand concept for Mermaid Beach Resort in Cox's Bazar. No build step is required. Serve the project directory locally:

```powershell
python -m http.server 8765 --bind 127.0.0.1
```

Then open `http://127.0.0.1:8765/`.

## Pages

- `index.html` — circular resort film, panoramic stay selection, photographic collage, dining, experiences, closing invitation
- `stays.html` — seven accommodations, filters, property photos and published starting rates
- `experiences.html` — shore, garden and activity stories
- `dining.html` — restaurants and local food story
- `story.html` — place, architecture and brand narrative
- `book.html` — date, guest, stay and contact form with a live planning estimate

The booking form validates dates, required contact details and listed adult occupancy, then opens a prefilled WhatsApp request to the resort's published reservations number. It is an enquiry, not live availability, confirmed booking or payment. An instant-booking release needs a property-management/booking-engine API.

## Design and media

This revision follows the user-selected [Rosa Hotels](https://rosahotels.dgrees.studio/) direction: light editorial display, an italic serif countervoice, mineral white and olive, a scroll-expanding circular film, image-led rooms, asymmetric photography and one dark chapter. The implementation mapping is in `translation.md`.

The circular film is a self-hosted, muted, 20-second excerpt starting at 8 seconds from the [Mermaid Beach Resort TVC supplied by the user](https://youtu.be/0AWeN0b9PgI). It has no YouTube embed, controls or audio. Confirm footage usage rights with the resort before production deployment. Actual resort photos appear in room listings and supporting editorial sections; generated campaign concepts are atmosphere, not factual pictures of specific rooms.

The original vector logo is `assets/logo-mark.svg` / `assets/logo-lockup.svg`. Rosa uses proprietary PP Fragment fonts. This public concept uses Jost and Cormorant Garamond to reproduce the light-sans/italic-serif hierarchy without distributing unlicensed font binaries. Replace them with licensed PP Fragment files if exact typography is approved.

GSAP/ScrollTrigger and Lenis are vendored. Lenis runs on desktop only; scroll choreography is disabled for reduced-motion visitors. Core content remains accessible without animation libraries.

## Verification

The six pages were tested at 1440px and 390px on 2026-09-24: HTTP 200, no page exceptions, broken images or horizontal overflow. Visual captures covered the circular film's intermediate and full-bleed states, major home sections and mobile page folds. Stay filtering, booking estimate and capacity warnings were exercised.

This remains a design concept, not an official deployment. Confirm imagery rights, copy, rates, policies and reservation channel with the property before publishing.
