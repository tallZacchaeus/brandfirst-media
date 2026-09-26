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

As **small text** (labels, section numbers, tags, 11–15 px) the accents are darkened 12% with `color-mix(in srgb, var(--accent) 88%, #000)`: the Aṣọ orange (4.36:1 on white) and the ROOM16 red on the tint (4.25:1) fall just short of the 4.5:1 WCAG AA minimum at those sizes. Rules, squares, fills and icons keep the exact brand values.

### Section grounds

The demo's per-section pastels were replaced with cool neutrals derived from the mark's silver: `--sec-tint #EDF1F7`, `--sec-mint #F4F7FB` (near-white), `--sec-dark #121212` (cards `#1C1C1C`), `--tint-grey #EFEFEF`. Rationale encoded in the tokens file: light grounds carry print work (judged against white); the dark ground carries event/lighting work (which only reads against darkness).

## 3. Typography

**One family site-wide: Montserrat Alternates** (OFL; self-hosted from `public/fonts/`, see `FONTS.md`) — chosen by the client from a reference site (adikastakes.store), run the same way there: Black/ExtraBold for display, Regular for body. A geometric sans with single-storey `a` and hooked `y` descenders. Weights loaded: 400–900.

All four font tokens (`--font-hero`, `--font-display`, `--font-inner`, `--font-body`) resolve to it. History: the demo used Kanit + Instrument Sans + Beatrice Trial + Getaway; the last two could not be licensed (see `FONTS.md`), and the client asked for one voice rather than a serif/sans split.

Handling rules specific to this face (from `FONTS.md`):

- Negative tracking `-0.02em` at display sizes (otherwise heavy-weight counters read as letter gaps).
- Smaller display scale than the demo's serif: section titles 70 px → 56 px, page titles 100 px → 76 px (home).
- **Inner pages** step the type at breakpoints instead of scaling with the viewport: page titles 56 / 48 / 42 / 34 px and section titles 44 / 38 / 32 / 28 px (≥ 1200 / ≥ 1024 / ≥ 768 / phones). Their headings carry no letter-spacing; only the small uppercase metadata labels are tracked (`.12em`, 11–12 px).

**Type scale (demo-derived, px):** 16, 18, 24, 30, 60, 70, 120, 150, 300, 450.

## 4. Layout conventions

- **Container:** 1320 px (`--container`), gutter `clamp(16px, 4vw, 64px)`. Templates use boxed widths of 1290–1760 px per the Elementor specs.
- **Stacked-card sections:** every top-level home section is a rounded card — `border-radius: 80px`, `margin-top: -100px` — so each overlaps the one before it. Only the **hero** is pinned (ScrollTrigger, `pinSpacing: false`): it holds still while the page rises over it. The demo pinned all six sections above the CTA, including Services, a list two to three screens tall. Every boundary became a held beat, so the others now just scroll, and the overlap keeps the stack readable. The pin runs only with a mouse or trackpad at ≥ 768 px (under native touch scrolling a pin lands a frame late and judders), never under reduced motion, and adds no scroll distance.
- **Header:** transparent overlay variant (absolute, boxed 1720, logo 20% / nav 60% / action 20%, white type) on every page that opens with a blue hero — home, About, Services, Work, Brands, each brand page, Contact. The in-flow light variant is kept for pages on white (the 404, including unknown brand slugs); `SiteLayout` names the hero routes explicitly so the white nav can never land on a white page. The current section is marked in the nav (`NavLink`, `aria-current="page"`): a short rule under the label on desktop, brand colour and weight in the mobile panel. At ≤ 1024 px the nav collapses behind a burger into an absolutely positioned panel inside the header, with 44 px rows, and the header stays on screen so the menu is always one tap away. The overlay header becomes `fixed`; it was already out of flow, so nothing shifts. The in-flow white header uses `sticky` instead. Once the page leaves the top, the header tightens (126 → 90 px on tablets, 102 → 82 px on phones) and takes a solid ground: navy under the overlay's white type, white with a hairline on light pages. `scroll-padding-top` on the root (92 px, 84 px on phones) keeps anchor jumps and keyboard focus clear of it. Above 1024 px the header scrolls away as before.
- **Inner-page hero (`PageHero`):** a flat navy band (`--brand-ink #081A4B`, the site grain at 12 %), square-cornered, and compact: 600–730 px tall at 1440 × 900, so the next section always shows. Copy sits on the same 1290 px column as the page: breadcrumb (Home — Section — Page), optional eyebrow with a small brand-coloured square, title, lede (max 54 ch), optional actions. The right column is one photograph framed with print crop marks, or a page-specific aside so each page keeps its character: on **Brands** the group structure (the parent above its two in-house brands, joined by connector lines, each node linking to its page); on **Work** a four-frame contact sheet. Photos live in `pageHeroImages` (an optional `focus` sets the crop of a tall photo); brand pages use each brand's `heroImage` and mark their accent with a 3 px rule along the foot of the band. There is no key-figures row: the counts (3 brands, 9 services…) were removed at the client's request. Entrance is CSS on load (0.55 s rise, 70 ms apart; a plain fade on phones; none under reduced motion).
- **Inner-page system** (`src/styles/inner.css`, `SectionHead`): full-width bands rather than floating cards — `.ix-section` at 104 / 80 / 60 px vertical padding on white, `--sec-tint` or navy. Each opens with a numbered head: index and label on a hairline rule, then the title and an optional lede (or a split layout, lede beside the title). Columns, lists and rows are divided by hairlines (`--rule`, `--rule-strong`, `--rule-light` on navy) instead of boxed. Radii 4–6 px (`--radius-sm`, `--radius`); key photographs carry print crop marks (`.ix-frame`). Each brand's colour appears only as a short rule or small square marker (`--accent`). Pages close on a navy CTA band. Page by page:
  - **About:** the group as three hairline-divided columns (brand, line, its three services as links), philosophy with Mission/Vision, the five-point standard, values on navy.
  - **Services:** a three-column index directly under the hero (each brand → its three services, all jump links), then one band per brand with its services as alternating text/photo rows ("What this includes" lists).
  - **Brands:** one full-width row per brand (photo, name, line, blurb, services, Explore + Instagram).
  - **Brand pages:** numbered sections — Services, Capabilities, Process, Use cases, Film, Photographs, Questions, The group — renumbered as they render, so a brand without film or photos has fewer sections, never a gap; closes on an enquiry band.
  - **Work:** segmented filter (All / Print / Events / Clothing, with counts) and a live "Showing N photographs · N film clips" line; every photo captioned beneath with discipline, brand and what it shows (`ShotGrid`); film below.
  - **Contact:** call, WhatsApp and email are the hero's actions (64 px rows with icons); the form sits beside the office and all three Instagram accounts.
- **Phones (< 768 px):** photo grids become a two-column masonry (CSS columns, each tile at its own height; the brand name drops from captions since the discipline tag carries its colour); film clips become a swipeable scroll-snap strip that bleeds to the screen edges with the next clip peeking in. One column had run the Work page past 16,000 px.
- **WhatsApp float:** black (`--ink`) with a white glyph, like the site's primary buttons, rather than WhatsApp green. A faint white ring keeps it visible over the near-black footer and the navy bands. On hover it inverts to white, as the primary button does, and its focus outline is cyan. The Contact hero's WhatsApp icon matches its call and email siblings (cyan).
- **Layering:** page content sits at `auto` (hero art `0`, hero copy `1`); the WhatsApp float at `40` (hidden on `/contact`, where WhatsApp is already a primary action); the header — every variant — at `50`. The mobile menu panel and the desktop Brands dropdown are absolute children of the header, so they can only ever sit as high as the header itself: give the header its own `z-index` on every variant, never just the overlay one. Without it, the inner-page header fell to the bottom of the stack and page titles (whose split-word reveal creates positioned boxes) painted over the open menu.
- **Footer:** `#121212`, boxed 1760, 80 px top radius; inner-page variant on `#171717`. Link lists are 44 px rows. The contact links keep their `border-bottom` underline tight to the text, so they take a 44 px hit area through a pseudo-element instead, with rows spaced just over 44 px apart so neighbouring targets never overlap. On phones the bottom bar leaves 96 px clear for the WhatsApp float.
- **Cards (home):** dark service cards `#1C1C1C` at radius 20; images at radius up to 80. Inner pages use no cards and radii of 4–6 px.

## 5. Imagery style

- **Client's own production photography and footage only** — press runs, billboards, banners, jerseys on models, lighting rigs mid-show. The Work page copy states the intent: *"photographed on the floor and on site rather than staged for a brochure."*
- Naming/brand mapping: `bfm-*` (print), `aso-*` (apparel, studio-shot on white plus lifestyle), `room16-*` (live stage stills and video frames).
- Video: ~10 s silent loops, muted/looping; one venue shown in four lighting colours on purpose ("showing the room change colour is what a lighting company is actually selling").
- Responsive `.webp` at 480/900/1400 (photos), 480/832 (video frames), 480/900 (phone-shot live stills).
- Remaining CrowdyTheme demo assets are placeholders only and must not ship.
- Logos: `brandfirst-logo(-sm).png`, `room16-logo.png` (client's own artwork — reads "RE16 Pro", kept at the client's insistence after a redraw was declined); Aṣọ Ìgbàlódé has no logo asset — text treatment.

## 6. Motion and interaction

- **Smooth scroll:** Lenis on mouse/trackpad only (touch keeps native momentum), clocked with GSAP's ticker so the pinned hero doesn't jitter. Tuned for direct control: `lerp: 0.15`, `wheelMultiplier: 1`. It used `duration: 0.85` with an expo ease, which restarts a fixed glide on every wheel tick, so the page trailed the wheel.
- **Reveals:** IntersectionObserver (not ScrollTrigger), always with a failsafe so nothing can strand at `opacity: 0`, hidden before first paint so nothing flashes, and each played once (scrolling back never replays). One hook, `useReveal`:
  - **Inner pages:** 0.55 s, 70 ms stagger capped at 0.6 s per group, 16 px rise; opacity only (0.45 s) on phones, coarse pointers and devices with ≤ 4 cores. The failsafe is a 2.5 s timer.
  - **Homepage** (`src/sections/homeMotion.js`): one idea per section, blocks rather than words — 0.5 s, `power2.out`, 20 px rise (12 px on phones), 60–80 ms between pieces, 14 animated blocks in all. Intro: heading, then copy. The group: heading block, then the three brand cards (one block on phones, where they stack). Services: one reveal per brand row as it enters, not per card. Why us: heading block, then the highlights as one list. Industries: heading block only. CTA: one entrance. The failsafe fires only if IntersectionObserver never reports (1.5 s), so each block plays when it is actually scrolled to rather than off-screen on a timer.
- **Home hero:** one CSS entrance, finished by 0.6 s. The three pills slide in 24 px from the left margin, 50 ms apart; the lede and buttons rise 16 px as one block at 0.14 s. Opacity plus one move each (the old scaleX overshoot is gone). The photo collage no longer drifts; its capsules cross-fade between their three shots on 27–36 s cycles, so one changes every few seconds rather than every one or two.
- **Scroll position (`ScrollManager`):** a new page starts at the top; a link with a hash (`/services#event-lighting`, the Services index, `#brand-…`) scrolls to its target through Lenis, honouring the target's `scroll-margin-top` and the root's `scroll-padding-top` (which clears the fixed header at ≤ 1024 px); back/forward keeps the browser's own restoration. React Router does none of this by itself — before it, deep links to a service landed at the top of the page and pages opened at the previous page's scroll depth.
- **Custom cursor:** removed (commit `cc80238`); the native pointer only.
- **Accessibility gates:** under `prefers-reduced-motion` nothing is hidden or moved — no Lenis, no pin, no reveals, no hero entrance, the collage holds its first frame. Pinning is also off for touch/coarse pointers and widths < 768 px.
- **Touch targets:** 44 px minimum across the inner pages, header and footers, verified by hit-testing at 1440 / 1024 / 768 / 390 px. Breadcrumb links keep their label size and take the 44 px through a pseudo-element. Known exceptions: the desktop nav links (36 px, mouse only; the burger takes over at ≤ 1024 px) and the home services section's "Learn more" link (homepage body, left as designed).

## 7. Voice

Plain, concrete, no hype — "Says what was done, not how amazing it was" (the standard set in `room16-instagram/captions.md` and held across the site copy). Confident and business-focused, per the client content document.
