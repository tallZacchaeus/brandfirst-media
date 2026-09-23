# 03 — App Flow: Sitemap, Navigation and Visitor Journeys

**Site:** Brandfirst Media (React build in `brandfirst-media/`)
Routes and nav are defined in `src/App.jsx` and `src/data/site.js` (`nav`).

> **Paths** in this document are relative to the parent project folder `BrandfirstMedia/`, which holds this repository (`brandfirst-media/`) alongside `wp-local/`, `arolax-theme/`, `room16-instagram/` and `media files/`. Those four are **not** in this repository.

---

## 1. Sitemap

```mermaid
graph TD
    HOME["/ — Home"]
    ABOUT["/about — About"]
    SERVICES["/services — Services (9, three per brand)"]
    WORK["/work — Work (filterable showcase)"]
    BRANDS["/brands — The Group"]
    BFM["/brands/brandfirst-media"]
    R16["/brands/room16"]
    ASO["/brands/aso-igbalode"]
    CONTACT["/contact — Contact"]
    NF["* — 404 Not Found"]
    INS["Insights — built, NOT routed/in nav<br/>(articles unwritten)"]

    HOME --> ABOUT
    HOME --> SERVICES
    HOME --> WORK
    HOME --> BRANDS
    HOME --> CONTACT
    BRANDS --> BFM
    BRANDS --> R16
    BRANDS --> ASO

    style INS stroke-dasharray: 5 5
    style NF stroke-dasharray: 5 5
```

## 2. Navigation structure

**Header (all pages, via `SiteLayout`):** Home · About · Services · Work · **Brands ▾** (Brandfirst Media / ROOM16 / Aṣọ Ìgbàlódé) · Contact — plus a "Start a Project" action button. At ≤ 1024 px the links move behind a burger and the header stays fixed at the top of the screen (solid navy once scrolled), so any page is reachable from anywhere on the current one.

**Footer:** brand block + link columns (dark `#121212` footer, per the Arolax template), a contact block (shared `ContactLinks` component) — phone icon + 0708 413 7772, WhatsApp icon + 0806 6442508, envelope icon + info@brandfirstmedia.com, one per line with icons and text each on a shared left edge; the icons replace the old "Call:" / "WhatsApp:" labels and each link carries an aria-label with that meaning — and each brand's Instagram, copyright. A floating WhatsApp button (black, in the site's primary-button style) sits bottom-right on every page except `/contact`, where call, WhatsApp and email are already the hero's own actions (it is layered below the header, so an open mobile menu covers it).

**Inner pages** open with a breadcrumb (Home — Section — Page); brand pages add Brands to the trail.

Notes:

- Insights is deliberately absent from the nav: *"the page exists but its articles are still unwritten, and an empty journal advertises that nobody is minding it"* (comment in `site.js`). Add it the day the first pieces are published.
- Unknown URLs render the 404 template, never an empty page.
- Every service card carries a `brand` tag (`brandfirst` / `room16` / `aso-igbalode`) linking the service to the brand that delivers it.
- **Deep links into Services:** `/services#<service-slug>` (e.g. `#event-lighting`) and `/services#brand-<brand-slug>` scroll to that service or brand group. The footer, About, Brands and the brand pages link this way, and the index under the Services hero uses the same anchors in-page. `ScrollManager` makes them land; any link without a hash opens the new page at the top.

## 3. Homepage section order

1. Hero — "Print. Events. Clothing." + Start a Project / See What We Do
2. Intro — "One Team From Artwork to Event Night"
3. Group strip — "One group, three brands"
4. Services — six cards
5. Why us — "Deadlines That Hold. Colour That Matches."
6. Industries — "Who We Produce For"
7. Work preview
8. CTA — "Ready to Put Your Brand First?"

Sections render as overlapping rounded cards, per the Arolax demo (`SECTION-MAP.md`). Only the hero pins, so the page rises over it; the rest scroll at the visitor's pace (desktop mouse/trackpad only; see `04-UI-UX-Design-Brief.md` §6).

## 4. Key visitor journeys

### Journey A — Prospect with a job and a date (primary)

```mermaid
flowchart LR
    A[Land on Home] --> B{Convinced by hero + work preview?}
    B -- needs proof --> C["/work — filter Print / Events / Clothing"]
    B -- needs detail --> D["/services — nine services, three per brand, with 'what this includes'"]
    C --> E["/contact"]
    D --> E
    B -- ready now --> E
    E --> F{Form endpoint configured?}
    F -- "no (current)" --> G[Mailto opens with fields pre-filled]
    F -- yes --> H[POST to Formspree endpoint]
    E --> I[Or: tap phone / WhatsApp link]
```

WhatsApp is called out in the code as how most Lagos SMB enquiries actually arrive. The contact page leads with the three channels as its hero actions: call (`tel:`), WhatsApp (opens wa.me with a pre-filled message) and email. The 7-field form follows (Name, Company, Email, Phone, Service interest grouped by brand, Budget range, Message). A "Send on WhatsApp instead" button carries whatever has been typed into the form over to WhatsApp.

### Journey B — Visitor evaluating a specific brand

```mermaid
flowchart LR
    A[Home] --> B["Brands ▾ in header"]
    B --> C["/brands — group overview"]
    C --> D["/brands/room16<br/>offer · process · use cases · FAQ"]
    C --> E["/brands/aso-igbalode"]
    C --> F["/brands/brandfirst-media"]
    D & E & F --> G["/contact — Start a Project"]
```

Each brand detail page follows the same shape: hero (photo, "Enquire about {brand}", Instagram) → Services (its three, each linking to `/services#…`) → Capabilities → 4-step process → Use cases → Film and Photographs (only when the brand has them) → Questions → The group (links to the sibling brands) → enquiry band. Sections are numbered as they render, so the numbering never skips.

### Journey C — Diligence visitor (who are these people?)

Home → `/about` (the group and its three brands, philosophy with mission/vision, how we work, five values) → `/work` (captioned production photos filterable by discipline, plus film) → `/contact`.

## 5. WordPress reference sitemap (wp-local, for context only)

The local WordPress install carries the Arolax "Branding Agency" demo: Elementor homepage #9322 plus templates for blog archive/single, portfolio details, team, career, FAQ, search, taxonomy and 404. The React build reproduced all of these as templates during development, but the shipped app routes only the pages the Brandfirst content supports (see §1) — the demo's Team / Career / FAQ / Blog routes were dropped or absorbed (FAQ content now lives inside brand detail pages).
