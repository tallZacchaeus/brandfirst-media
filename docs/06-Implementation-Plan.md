# 06 — Implementation Plan

**Project:** Brandfirst Media website
**As of:** September 2026. Status below is grounded in what exists in the repo; nothing is assumed done without evidence.

> **Paths** in this document are relative to the parent project folder `BrandfirstMedia/`, which holds this repository (`brandfirst-media/`) alongside `wp-local/`, `arolax-theme/`, `room16-instagram/` and `media files/`. Those four are **not** in this repository.

---

## Phase 1 — Reference environment (DONE)

- [x] Acquire Arolax theme (ThemeForest zip at project root) and extract theme, child theme, bundled plugins (`arolax-theme/arolax-main-files/extracted/`).
- [x] Script local WordPress two ways: Docker (`wp-local/compose.yaml` + `setup.sh`, localhost:8081) and native (`native-setup.sh`, PHP server + `router.php`, DB on 127.0.0.1:3307).
- [x] Install plugins: Elementor, CF7, Animation Addons (+ Pro), Arolax Essential.
- [x] Import the "Branding Agency" demo (one logged run failed with a critical error — `import.log` — but extracted Elementor data and populated uploads show a later run succeeded).

## Phase 2 — Design extraction (DONE)

- [x] Extract design tokens, section structure, animation parameters, widget specs and template layouts from Elementor data (page #9322 + all templates) — recorded in `brandfirst-media/SECTION-MAP.md`.
- [x] Resolve the font licensing problem (Beatrice Trial / Getaway cannot ship) — documented in `FONTS.md`; settled on Montserrat Alternates (OFL) at the client's direction.

## Phase 3 — React build (DONE)

- [x] Vite + React 18 + react-router v7 scaffold; GSAP pinning, Lenis smooth scroll, IntersectionObserver reveals, custom cursor — all with reduced-motion/touch gates.
- [x] All Arolax demo templates rebuilt; then routing trimmed to the pages the Brandfirst content supports.
- [x] Header/footer variants, shared PageHero, 404 handling; 0 unresolved nav links (verified per SECTION-MAP).

## Phase 4 — Content population (DONE, with client-dependent gaps)

- [x] Copy from `BrandfirstMedia-Website-Content.md`, then repositioned from "media agency" to **production group** (Print / Events / Apparel) — all copy centralised in `src/data/site.js`.
- [x] Brand architecture: Brandfirst Media (parent) + ROOM16 + Aṣọ Ìgbàlódé, each with offer/process/use-cases/FAQ pages.
- [x] Client's own media processed: ~33 photos as responsive webp sets, 12 silent ~10 s video loops; demo photography replaced in the shipped pages.
- [x] Contact details added from the client's Facebook page (phone, WhatsApp, email, Facebook).
- [x] WhatsApp float on every page (later: every page but `/contact`), WhatsApp on its own number (0806 644 2508) with a pre-filled message, calls on 0708 413 7772; per-brand Instagram/Facebook links in the footer; services expanded to nine (three per brand); "Apparel" renamed "Clothing" site-wide. Commit `00c1385`.
- [x] Facebook links removed site-wide; each brand links to its Instagram only. Footer contact block standardised on both footers to "Call: 0708 413 7772 / WhatsApp: 0806 6442508 / email", one item per line (the inner-page footer previously wrapped them unevenly in a 220px paragraph).
- [x] Inner pages given an executive hero: shared `PageHero` with the home gradient, breadcrumb, computed key figures and real photography; transparent header over it; current page marked in the nav. *(Superseded by the redesign below.)*
- [x] **Inner-page redesign** (About, Services, Brands, brand pages, Work, Contact; homepage body untouched). A shared system in `src/styles/inner.css` — flat navy hero with crop-marked photography or a page-specific aside, numbered section heads, hairline-divided full-width bands, 4–6 px radii, stepped type with no viewport scaling — and every page rebuilt on it from the existing copy and photography (no new claims). The hero's key-figures row was later removed at the client's request. See §4 of `04-UI-UX-Design-Brief.md`. Alongside:
  - `ScrollManager`: pages now open at the top and `/services#…` deep links land on their service. Neither worked before, since React Router has no scroll handling.
  - `useReveal` for section entrances (0.55 s, 70 ms stagger capped at 0.6 s; opacity only on phones and low-powered devices).
  - Touch targets of 44 px or more on inner pages, the header and both footers.
  - Phones get two-column masonry photo grids and a swipeable film strip; the Work page on a phone went from over 16,000 px to about 7,900 px.
  - The WhatsApp float is hidden on `/contact`, where call, WhatsApp and email are the hero's actions.
  - Fixed a React console warning (`fetchPriority` → `fetchpriority` on React 18).
  - Verified in headless Chrome at 1440, 1024, 768 and 390 px on every route:
    - no horizontal overflow, no clipped headings, no console errors;
    - anchors, filters, video playback, the WhatsApp and mailto routes, the mobile menu and reveals with motion on all tested.
  - Not yet checked on real devices; that folds into the Phase 6 check.
- [x] Sister deliverable: ROOM16 Instagram launch kit (`room16-instagram/` — posts, reels, drafted captions).

## Phase 5 — Pre-launch (PENDING)

Client inputs (blocking):

- [x] Domain email replaces `brandfirstmedia@gmail.com`: info@brandfirstmedia.com (two personal addresses were put up first, then withdrawn in favour of the shared inbox).
- [x] Footer contact block: phone and WhatsApp icons replace the "Call:" / "WhatsApp:" labels, and an envelope marks the email so all three lines align; both footers now render one shared `ContactLinks` component.
- [x] Contact form fits a 320 px screen: the service dropdown had been held at its longest option's width (306 px).
- [ ] **Email hosting for `brandfirstmedia.com` (blocking).** The domain had no MX records when the addresses went on the site, so mail to them has nowhere to be delivered. Set up the mailboxes, add the MX (and SPF) records, then send a test message to each address and reply from it.
- [ ] Written permission to show PremiumTrust Bank work (billboard + merchandise appear in the showcase; flagged in code comments).
- [ ] Final office address; confirmation of registered company name.
- [ ] Real case studies to replace the 5 placeholder titles (`work.placeholders`, shown in the home page's Selected Work section).
- [ ] Insight articles (4 topics drafted as subjects only) — until written, keep Insights out of the nav (already the case).
- [ ] Aṣọ Ìgbàlódé logo (currently text treatment); source file of the Brandfirst mark so brand colours can be measured exactly (currently sampled by eye).

Technical tasks:

- [x] Mobile menu unreadable on inner pages: the open panel rendered beneath the page title and first section, covering most links. Fixed by giving every header variant `z-index: 50` (see Layering in `04-UI-UX-Design-Brief.md`). Verified in emulation at 375 px and 768 px on all routes, plus the desktop Brands dropdown at 1280 px; real-device check folds into the device test below.
- [ ] Configure a form endpoint (Formspree per the note in `site.js`) and set `site.formEndpoint`; verify success/error states. Current fallback: pre-filled mailto.
- [ ] Sweep `public/assets/` for any remaining CrowdyTheme demo assets (the README warns the demo showreel/photography are not licensed for production) and confirm nothing unlicensed is referenced by the build.
- [ ] Optional: purge Beatrice Trial / Getaway font files from git history (`git filter-repo`, commit `6526454`) if the repo will ever be shared.
- [x] Hosting: Cloudflare Worker with static assets, live at **https://brandfirstmedia.com** and `www.` (see TRD §4). Deploy with `npm run deploy`.
- [ ] Retire the Vercel copy (`brandfirst-media.vercel.app` still auto-deploys every push) — or keep it deliberately as a staging URL.
- [ ] Optional: deploy to Cloudflare on push (Workers Builds, connected in the Cloudflare dashboard) so publishing no longer depends on a logged-in machine.
- [ ] Choose a canonical host and redirect the other (e.g. `www` → apex via a Cloudflare Redirect Rule); today both serve the same site.
- [ ] SEO pass: per-route titles/descriptions (only the global meta in `index.html` exists), OG image, `sitemap.xml`, `robots.txt` — none present yet.
- [ ] Analytics: none configured — choose and add if the client wants measurement (PRD metrics depend on it).

## Phase 6 — Launch checklist

- [ ] `npm run build` clean; test all routes on the production URL (SPA rewrite must serve deep links).
- [ ] Lighthouse pass on `/`, `/work`, a brand page (media-heavy pages; confirm webp/srcSet behaviour and video weight on mobile data).
- [ ] Test contact form end-to-end (endpoint POST, error state, mailto fallback removed or kept deliberately) and the WhatsApp/phone links on a real device.
- [ ] Reduced-motion, mobile (<768 px, no pinning/cursor) and touch verification.
- [ ] 404 route, favicon set, social share preview.
- [x] Point the domain and enable HTTPS — done on Cloudflare (Workers Custom Domains issue the certificates).
- [ ] Submit a sitemap to Search Console (no `sitemap.xml` exists yet).
- [ ] Client sign-off against the "Notes for Client Confirmation" list in the content document.

## Post-launch (candidates, not commitments)

- Publish the first Insight articles and add Insights to the nav (`site.js` documents exactly where).
- Replace `/work` placeholders with real case studies using the format in the content doc (Client / Sector / Challenge / Solution / Channels / Results).
- If content editing by the client becomes a need, wire a CMS: `Journal` already takes a `posts` prop, and search/taxonomy pages are written to swap local data for CMS queries. The WordPress reference install is available if a WP-based route is ever preferred — but that would be a new project phase, not a launch requirement.

## Current status summary

| Area | Status |
|---|---|
| WordPress reference env | Done (local only) |
| Design extraction & tokens | Done |
| React site: pages, routing, motion | Done (build in `dist/` exists) |
| Content & client media | Done, minus client-dependent gaps above |
| Form endpoint | Pending (mailto fallback active) |
| Hosting / domain | Live on Cloudflare at brandfirstmedia.com; Vercel copy still running |
| SEO extras, analytics | Pending |
| Client confirmations | Pending |
