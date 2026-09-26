# 02 — Technical Requirements Document (TRD)

**Project:** Brandfirst Media website
**Root:** the parent project folder `BrandfirstMedia/`; this repository is its `brandfirst-media/` subfolder.

> **Paths** in this document are relative to the parent project folder `BrandfirstMedia/`, which holds this repository (`brandfirst-media/`) alongside `wp-local/`, `arolax-theme/`, `room16-instagram/` and `media files/`. Those four are **not** in this repository.

---

## 1. The two stacks in this project

This project contains **two parallel implementations**. Understanding the relationship is the key technical fact:

1. **`wp-local/`** — a local WordPress install running the **Arolax theme** with its "Branding Agency" demo imported. This is the *reference environment*: the demo's Elementor data, templates and computed styles were extracted from it.
2. **`brandfirst-media/`** — a **React (Vite) static site** that is the actual deliverable. It is a from-scratch rebuild of the Arolax Branding Agency demo's visual system, populated with Brandfirst Media's content. See `brandfirst-media/SECTION-MAP.md` for the extraction/mapping record.

The production website is the React build. WordPress is a design source, not the deployment target (as currently set up).

## 2. WordPress reference environment (`wp-local/`)

### Platform

| Component | Version | Source |
|---|---|---|
| WordPress core (native install, `wp-local/site/`) | `$wp_version = '7.1'` per `wp-includes/version.php` | native install |
| WordPress Docker image (`compose.yaml`) | `wordpress:6.7-php8.2-apache` | Docker path |
| Database | MariaDB 11.4 (Docker) / MySQL at `127.0.0.1:3307`, db `arolax_local` (native) | `compose.yaml`, `wp-config.php` |
| PHP | 8.2 (Docker images); theme requires ≥ 7.4 | |

### Theme

| Theme | Version | Notes |
|---|---|---|
| **Arolax** (parent) | 4.0.6 | By CrowdyTheme (ThemeForest). "Creative digital agency" theme, 40+ demo homepages. Purchased zip at project root: `themeforest-A6JhDs7N-arolax-creative-digital-agency-theme.zip` (do not unzip again — already extracted under `arolax-theme/arolax-main-files/extracted/`) |
| **Arolax Child** | 3.0.2 | Active theme target in setup scripts |

### Plugins (in `wp-local/site/wp-content/plugins/`)

| Plugin | Version | Source |
|---|---|---|
| Elementor | 3.34.4 | wp.org |
| Contact Form 7 | 6.1.7 | wp.org |
| Animation Addons for Elementor | 2.6.7 | wp.org |
| Animation Addons for Elementor Pro | 2.6.7 | bundled with theme |
| Arolax Essential | 3.0 | bundled with theme (registers portfolio CPT, widgets) |
| Akismet | 5.3.6 | default install (inactive by setup scripts) |

Also: one mu-plugin, `cli-import-shim.php` (supports demo import via WP-CLI).

### Local dev setup

Two paths, both scripted:

- **Docker:** `wp-local/compose.yaml` + `wp-local/setup.sh` — MariaDB + WordPress on `http://localhost:8081` (admin login set in `setup.sh`), WP-CLI service; mounts theme + bundled plugins from `arolax-theme/arolax-main-files/extracted/`; imports the "Branding Agency" demo (predefined index 0) via One Click Demo Import; sets `/%postname%/` permalinks. `WP_MEMORY_LIMIT` 512M, `CONCATENATE_SCRIPTS` off.
- **Native:** `wp-local/native-setup.sh` — local `bin/wp`, PHP built-in server via `router.php`, DB at `127.0.0.1:3307` (database `arolax_local`; credentials in `native-setup.sh`), rsyncs theme + plugins into `wp-local/site/`.

Note: `wp-local/import.log` ends in a critical-error/EXIT=1 from one demo-import run; the presence of extracted Elementor data (page #9322, templates) and populated `wp-content/uploads/` indicates the import ultimately succeeded on a later run. `WP_DEBUG` is on in the native `wp-config.php`.

## 3. React deliverable (`brandfirst-media/`)

| Item | Value |
|---|---|
| Framework | React 18.3, Vite 6 (`@vitejs/plugin-react` 4.3) |
| Routing | `react-router-dom` v7: BrowserRouter in the browser. Every public route is **prerendered** to static HTML at build time (`scripts/prerender.mjs`: StaticRouter + `renderToString` from `src/entry-server.jsx`), then hydrated (`hydrateRoot` in `src/main.jsx`). Unknown paths get `404.html` with a real 404 status. |
| SEO | `react-helmet-async` 2.0.5 via `src/seo/Seo.jsx` (per-route title, description, canonical, robots, Open Graph, Twitter card, JSON-LD). `src/seo/config.js` holds the production URL (`SITE_URL`, overridable with `VITE_SITE_URL`); `pages.js` the route metadata; `schema.js` the JSON-LD graph. `sitemap.xml` and `robots.txt` are generated at build from the same route list. |
| Animation | GSAP 3.13 (ScrollTrigger: the home hero pin only), Lenis 1.3 smooth scroll (`lerp: 0.15`, mouse/trackpad only); IntersectionObserver reveals through `useReveal` on the homepage and inner pages (the older `useGsap` hooks remain for the inner footer, Insights and the 404) |
| Scroll | `ScrollManager` (in `SiteLayout`): top of page on each new route, hash targets scrolled through Lenis (`lenisRef` from `useSmoothScroll`); back/forward left to the browser |
| Icons | `react-icons` 5.7 — phone, WhatsApp, envelope and Instagram marks only (imported per icon, so only those four are bundled) |
| Content | All copy in `src/data/site.js` — single source of truth; components render from it |
| Fonts | Montserrat Alternates (OFL), **self-hosted** woff2 subsets in `public/fonts/` (latin, latin-ext, vietnamese; weights 400/600/700/800/900), declared in `src/styles/fonts.css`; 400-latin preloaded. See `FONTS.md` for the licensing history (theme's Beatrice Trial and Getaway faces could not ship) |
| Build | `npm run dev` (localhost:5173, client-rendered). `npm run build` = `vite build` (client) → `vite build --ssr src/entry-server.jsx` (server bundle in `dist-ssr/`, deleted after) → `node scripts/prerender.mjs` (writes each route's HTML, `404.html`, `sitemap.xml`, `robots.txt` into `dist/`). |
| Media | `public/media/` — client photography/video, exported as responsive `.webp` sets (480/900/1400 widths) and re-encoded ~10 s muted `.mp4` loops |

### Form handling

`site.formEndpoint` is `null`: the contact form falls back to opening the visitor's mail client with fields pre-filled. Intended production path (documented in code): create a Formspree form and paste the endpoint — the form then POSTs with success/error states.

## 4. Hosting

- **Production: Cloudflare**, live at **https://brandfirstmedia.com** (and `www.`), since September 2026. The site is an assets-only **Worker with static assets** named `brandfirst-media` (config: `brandfirst-media/wrangler.jsonc`), in the Cloudflare account that also holds the `brandfirstmedia.com` zone.
  - `assets.directory: ./dist`. Each public page is a prerendered file served at its clean URL (`/about` from `about.html`, `/brands/room16` from `brands/room16.html`; `html_handling` default). `/about/`, `/about.html` and `/index.html` redirect to the clean URL. `not_found_handling: 404-page` serves `404.html` with a 404 status for anything else. (It was `single-page-application`, which answered every unknown URL with the homepage and a 200: soft 404s.)
  - Both hostnames are **Workers Custom Domains**, which own their DNS records and TLS certificates. The zone's earlier A records (a Hostinger parked page) had to be deleted by hand first: Cloudflare will not let a custom domain replace a DNS record it did not create.
  - `public/.assetsignore` keeps macOS `.DS_Store` files out of the upload.
  - **Deploy:** `npm run deploy` (runs `vite build`, then `wrangler deploy`). Wrangler 4.137 is a devDependency. Deploys are manual from a logged-in machine: pushing to GitHub does **not** deploy to Cloudflare.
- **Legacy: Vercel.** `vercel.json` (framework `vite`, output `dist/`, `cleanUrls`) still exists and the Vercel project still auto-deploys every push to `master` at `brandfirst-media.vercel.app` — a second public copy of the site. It sends `X-Robots-Tag: noindex, nofollow` on every response so it can never compete with brandfirstmedia.com in search, and its pages' canonicals name brandfirstmedia.com anyway. To be retired once Cloudflare is confirmed as the only host.
- **Canonical host:** `https://brandfirstmedia.com` (apex). Every canonical, `og:url`, JSON-LD URL, the sitemap and robots.txt use it. `www.` serves the same pages with canonicals to the apex; a 301 redirect rule (Cloudflare dashboard → Rules → Redirect Rules) is still recommended. Any other host (localhost, previews) is marked `noindex` in the browser by `Seo.jsx`.
- WordPress hosting: **TBD / likely none** — wp-local is a local reference environment only.

## 5. Licensing constraints (must-hold requirements)

- Arolax is a licensed ThemeForest product; its demo photography/video (CrowdyTheme's) is **not licensed for production** — the README states remaining demo assets must be replaced before launch. Current `public/` assets are largely the client's own (`bfm-*`, `aso-*`, `room16-*`).
- Fonts: Beatrice Trial (evaluation-only) and Getaway (no licence metadata) are excluded from the build; they remain in git history (commit `6526454`) — purging requires `git filter-repo`.

## 6. Non-functional requirements observed in the build

- `prefers-reduced-motion` disables smooth scroll, pinning, all reveals and the hero entrance and collage cycle: content shows immediately.
- Pinning gated to ≥ 768 px with a fine pointer (mouse/trackpad); never on touch.
- Reveals always carry a failsafe so nothing can remain invisible: on inner pages a 2.5 s timer; on the homepage, a reveal of everything if IntersectionObserver has not reported within 1.5 s (checked by disabling the observer: all content visible by 2.1 s).
- Inner-page motion: 0.45–0.65 s durations, 60–90 ms staggers, no parallax or scroll-jacking; opacity-only on phones, coarse pointers and ≤ 4-core devices.
- Touch targets ≥ 44 px on inner pages, header and footers; no horizontal overflow at 1440 / 1024 / 768 / 390 px (checked with a headless-Chrome audit).
- Responsive images via `srcSet`; videos muted/looped (silent production clips), `preload="none"` behind ~36 KB WebP posters.
- SEO: one unique title, description, canonical and social card per route, prerendered into the HTML; JSON-LD validated structurally (no dangling references, no unverified properties); 1 H1 per page; every image carries alt text (decorative ones empty).
- Lighthouse (Sept 2026, local build, simulated mobile/slow 4G): SEO 100, Best Practices 100 and Accessibility 100 on all nine routes (with motion reduced; mid-animation sampling otherwise drags a few labels' contrast), Performance 81–92 mobile (LCP 2.9–4.5 s, CLS 0, TBT 0 ms) and 99 desktop (LCP 0.8 s). Self-hosting the font and a 7 KB logo mark took the homepage from 76 to 89.
