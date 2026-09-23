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
- Smaller display scale than the demo's serif: section titles 70 px → 56 px, page titles 100 px → 76 px (home).
- **Inner pages** step the type at breakpoints instead of scaling with the viewport: page titles 56 / 48 / 42 / 34 px and section titles 44 / 38 / 32 / 28 px (≥ 1200 / ≥ 1024 / ≥ 768 / phones). Their headings carry no letter-spacing; only the small uppercase metadata labels are tracked (`.12em`, 11–12 px).

**Type scale (demo-derived, px):** 16, 18, 24, 30, 60, 70, 120, 150, 300, 450.

## 4. Layout conventions

- **Container:** 1320 px (`--container`), gutter `clamp(16px, 4vw, 64px)`. Templates use boxed widths of 1290–1760 px per the Elementor specs.
- **Stacked-card sections:** every top-level home section is a rounded card — `border-radius: 80px`, `margin-top: -100px` — pinned via ScrollTrigger (`pinSpacing: false`) so each holds still while the next scrolls up over it. Desktop only (≥ 768 px); the final section stays unpinned so the footer scrolls in cleanly.
- **Header:** transparent overlay variant (absolute, boxed 1720, logo 20% / nav 60% / action 20%, white type) on every page that opens with a blue hero — home, About, Services, Work, Brands, each brand page, Contact. The in-flow light variant is kept for pages on white (the 404, including unknown brand slugs); `SiteLayout` names the hero routes explicitly so the white nav can never land on a white page. The current section is marked in the nav (`NavLink`, `aria-current="page"`): a short rule under the label on desktop, brand colour and weight in the mobile panel. At ≤ 1024 px the nav collapses behind a burger into an absolutely positioned panel inside the header, with 44 px rows.
- **Inner-page hero (`PageHero`):** a flat navy band (`--brand-ink #081A4B`, the site grain at 12 %), square-cornered, and compact: 600–730 px tall at 1440 × 900, so the next section always shows. Copy sits on the same 1290 px column as the page: breadcrumb (Home — Section — Page), optional eyebrow with a small brand-coloured square, title, lede (max 54 ch), optional actions. The right column is one photograph framed with print crop marks, or a page-specific aside so each page keeps its character: on **Brands** the group structure (the parent above its two in-house brands, joined by connector lines, each node linking to its page); on **Work** a four-frame contact sheet. Photos live in `pageHeroImages` (an optional `focus` sets the crop of a tall photo); brand pages use each brand's `heroImage` and mark their accent with a 3 px rule along the foot of the band. There is no key-figures row: the counts (3 brands, 9 services…) were removed at the client's request. Entrance is CSS on load (0.55 s rise, 70 ms apart; a plain fade on phones; none under reduced motion).
- **Inner-page system** (`src/styles/inner.css`, `SectionHead`): full-width bands rather than floating cards — `.ix-section` at 104 / 80 / 60 px vertical padding on white, `--sec-tint` or navy. Each opens with a numbered head: index and label on a hairline rule, then the title and an optional lede (or a split layout, lede beside the title). Columns, lists and rows are divided by hairlines (`--rule`, `--rule-strong`, `--rule-light` on navy) instead of boxed. Radii 4–6 px (`--radius-sm`, `--radius`); key photographs carry print crop marks (`.ix-frame`). Each brand's colour appears only as a short rule or small square marker (`--accent`). Pages close on a navy CTA band. Page by page:
  - **About:** the group as three hairline-divided columns (brand, line, its three services as links), philosophy with Mission/Vision, the five-point standard, values on navy.
  - **Services:** a three-column index directly under the hero (each brand → its three services, all jump links), then one band per brand with its services as alternating text/photo rows ("What this includes" lists).
  - **Brands:** one full-width row per brand (photo, name, line, blurb, services, Explore + Instagram).
  - **Brand pages:** numbered sections — Services, Capabilities, Process, Use cases, Film, Photographs, Questions, The group — renumbered as they render, so a brand without film or photos has fewer sections, never a gap; closes on an enquiry band.
  - **Work:** segmented filter (All / Print / Events / Clothing, with counts) and a live "Showing N photographs · N film clips" line; every photo captioned beneath with discipline, brand and what it shows (`ShotGrid`); film below.
  - **Contact:** call, WhatsApp and email are the hero's actions (64 px rows with icons); the form sits beside the office and all three Instagram accounts.
- **Phones (< 768 px):** photo grids become a two-column masonry (CSS columns, each tile at its own height; the brand name drops from captions since the discipline tag carries its colour); film clips become a swipeable scroll-snap strip that bleeds to the screen edges with the next clip peeking in. One column had run the Work page past 16,000 px.
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

- **Smooth scroll:** Lenis, clocked with GSAP's ticker so pinned sections don't jitter.
- **Reveals:** IntersectionObserver (not ScrollTrigger) with a 2.5 s failsafe so nothing can strand at `opacity: 0`. Inner pages use `useReveal`: 0.55 s, 70 ms stagger capped at 0.6 s per group, 16 px rise; opacity only (0.45 s) on phones, coarse pointers and devices with ≤ 4 cores.
- **Scroll position (`ScrollManager`):** a new page starts at the top; a link with a hash (`/services#event-lighting`, the Services index, `#brand-…`) scrolls to its target through Lenis, honouring `scroll-margin-top`; back/forward keeps the browser's own restoration. React Router does none of this by itself — before it, deep links to a service landed at the top of the page and pages opened at the previous page's scroll depth.
- **Custom cursor:** 40 px ring + 8 px dot + 100 px labelled disc on `data-cursor` elements, ported from the theme's plugins (`gsap.quickTo`, 0.6 s, `power4.out`/`expo`). Native pointer stays visible, matching the theme.
- **Hero video:** autoplays muted and loops (no poster, per the demo's own settings); its control toggles sound first, then pause.
- **Accessibility gates:** all of the above disabled under `prefers-reduced-motion`; cursor and pinning disabled for touch/coarse pointers and widths < 768 px.
- **Touch targets:** 44 px minimum across the inner pages, header and footers, verified by hit-testing at 1440 / 1024 / 768 / 390 px. Breadcrumb links keep their label size and take the 44 px through a pseudo-element. Known exceptions: the desktop nav links (36 px, mouse only; the burger takes over at ≤ 1024 px) and the home services section's "Learn more" link (homepage body, left as designed).

## 7. Voice

Plain, concrete, no hype — "Says what was done, not how amazing it was" (the standard set in `room16-instagram/captions.md` and held across the site copy). Confident and business-focused, per the client content document.
