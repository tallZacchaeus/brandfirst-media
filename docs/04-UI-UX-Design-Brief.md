# 04 — UI / UX Design Brief

**Basis:** The Arolax theme's "Branding Agency" demo (extracted from Elementor data — see `brandfirst-media/SECTION-MAP.md`), retuned to Brandfirst Media's own brand system. Tokens live in `brandfirst-media/src/styles/tokens.css`.

> **Paths** in this document are relative to the parent project folder `BrandfirstMedia/`, which holds this repository (`brandfirst-media/`) alongside `wp-local/`, `arolax-theme/`, `room16-instagram/` and `media files/`. Those four are **not** in this repository.

---

## 1. Design direction in one paragraph

A dark-accented, editorial agency look inherited from Arolax — huge display type, sections rendered as overlapping rounded cards that pin and stack as you scroll — recoloured from the demo's mint/sand/lavender pastels to a cool blue-and-silver system read off the Brandfirst "B" mark, so *"the blue stays the only colour doing work."* One typeface site-wide, real production photography throughout, restrained motion with full reduced-motion fallbacks.

## 2. Colour

### Core palette (from the demo, frequency-ranked)

| Token | Value | Role |
|---|---|---|
| `--ink` | `#121212` | dominant dark ground (services section, footer, dark heroes) |
| `--ink-soft` | `#1C1C1C` | dark cards |
| `--paper` | `#FFFFFF` | light ground |
| `--muted` / `--muted-2` | `#555555` / `#999999` | body text / copyright |

### Brand colours (sampled from the Brandfirst "B" mark)

| Token | Value | Role |
|---|---|---|
| `--brand-deep` | `#0A2E8C` | navy (bowl of the mark) |
| `--brand` | `#1150C4` | royal blue — primary |
| `--brand-bright` | `#29ABE2` | cyan — highlights, hover |
| `--brand-silver` | `#E8EDF2` | light edge |

Sampled by eye from supplied artwork; can be measured exactly once the source file lands in `public/assets/`.

### Sub-brand accents

| Token | Value | Brand |
|---|---|---|
| `--room16` | `#E4032E` | ROOM16 (lighting/stage) |
| `--aso` | `#D8452C` | Aṣọ Ìgbàlódé (apparel) |

Both sub-brands sit in the red family; the blue parent anchors the group without competing.

### Section grounds

The demo's per-section pastels were replaced with cool neutrals derived from the mark's silver: `--sec-tint #EDF1F7`, `--sec-mint #F4F7FB` (near-white), `--sec-dark #121212` (cards `#1C1C1C`), `--tint-grey #EFEFEF`. Rationale encoded in the tokens file: light grounds carry print work (judged against white); the dark ground carries event/lighting work (which only reads against darkness).

## 3. Typography

**One family site-wide: Montserrat Alternates** (Google Fonts, OFL) — chosen by the client from a reference site (adikastakes.store), run the same way there: Black/ExtraBold for display, Regular for body. A geometric sans with single-storey `a` and hooked `y` descenders. Weights loaded: 400–900.

All four font tokens (`--font-hero`, `--font-display`, `--font-inner`, `--font-body`) resolve to it. History: the demo used Kanit + Instrument Sans + Beatrice Trial + Getaway; the last two could not be licensed (see `FONTS.md`), and the client asked for one voice rather than a serif/sans split.

Handling rules specific to this face (from `FONTS.md`):

- Negative tracking `-0.02em` at display sizes (otherwise heavy-weight counters read as letter gaps).
- Smaller display scale than the demo's serif: section titles 70 px → 56 px, page titles 100 px → 76 px.

**Type scale (demo-derived, px):** 16, 18, 24, 30, 60, 70, 120, 150, 300, 450.

## 4. Layout conventions

- **Container:** 1320 px (`--container`), gutter `clamp(16px, 4vw, 64px)`. Templates use boxed widths of 1290–1760 px per the Elementor specs.
- **Stacked-card sections:** every top-level home section is a rounded card — `border-radius: 80px`, `margin-top: -100px` — pinned via ScrollTrigger (`pinSpacing: false`) so each holds still while the next scrolls up over it. Desktop only (≥ 768 px); the final section stays unpinned so the footer scrolls in cleanly.
- **Header:** overlay variant on home (absolute, boxed 1720, logo 20% / nav 60% / action 20%); in-flow light and dark variants on inner pages. At ≤ 1024 px the nav collapses behind a burger into an absolutely positioned panel inside the header.
- **Layering:** page content sits at `auto` (hero art `0`, hero copy `1`); the WhatsApp float at `40`; the header — every variant — at `50`. The mobile menu panel and the desktop Brands dropdown are absolute children of the header, so they can only ever sit as high as the header itself: give the header its own `z-index` on every variant, never just the overlay one. Without it, the inner-page header fell to the bottom of the stack and page titles (whose split-word reveal creates positioned boxes) painted over the open menu.
- **Footer:** `#121212`, boxed 1760, 80 px top radius; inner-page variant on `#171717`.
- **Cards:** dark service cards `#1C1C1C` at radius 20; images at radius up to 80.

## 5. Imagery style

- **Client's own production photography and footage only** — press runs, billboards, banners, jerseys on models, lighting rigs mid-show. The Work page copy states the intent: *"photographed on the floor and on site rather than staged for a brochure."*
- Naming/brand mapping: `bfm-*` (print), `aso-*` (apparel, studio-shot on white plus lifestyle), `room16-*` (live stage stills and video frames).
- Video: ~10 s silent loops, muted/looping; one venue shown in four lighting colours on purpose ("showing the room change colour is what a lighting company is actually selling").
- Responsive `.webp` at 480/900/1400 (photos), 480/832 (video frames), 480/900 (phone-shot live stills).
- Remaining CrowdyTheme demo assets are placeholders only and must not ship.
- Logos: `brandfirst-logo(-sm).png`, `room16-logo.png` (client's own artwork — reads "RE16 Pro", kept at the client's insistence after a redraw was declined); Aṣọ Ìgbàlódé has no logo asset — text treatment.

## 6. Motion and interaction

- **Smooth scroll:** Lenis, clocked with GSAP's ticker so pinned sections don't jitter.
- **Reveals:** IntersectionObserver (not ScrollTrigger) with a 2.5 s failsafe so nothing can strand at `opacity: 0`.
- **Custom cursor:** 40 px ring + 8 px dot + 100 px labelled disc on `data-cursor` elements, ported from the theme's plugins (`gsap.quickTo`, 0.6 s, `power4.out`/`expo`). Native pointer stays visible, matching the theme.
- **Hero video:** autoplays muted and loops (no poster, per the demo's own settings); its control toggles sound first, then pause.
- **Accessibility gates:** all of the above disabled under `prefers-reduced-motion`; cursor and pinning disabled for touch/coarse pointers and widths < 768 px.

## 7. Voice

Plain, concrete, no hype — "Says what was done, not how amazing it was" (the standard set in `room16-instagram/captions.md` and held across the site copy). Confident and business-focused, per the client content document.
