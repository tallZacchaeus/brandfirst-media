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
| Routing | `react-router-dom` v7 (BrowserRouter; SPA rewrite in `vercel.json`) |
| Animation | GSAP 3.13 (ScrollTrigger pinning), Lenis 1.1 smooth scroll; IntersectionObserver for reveals |
| Icons | `react-icons` 5.7 — phone, WhatsApp and Instagram marks only (imported per icon, so only those three are bundled) |
| Content | All copy in `src/data/site.js` — single source of truth; components render from it |
| Fonts | Montserrat Alternates (Google Fonts, OFL) — one family site-wide; see `FONTS.md` for the licensing history (theme's Beatrice Trial and Getaway faces could not ship) |
| Build | `npm run dev` (localhost:5173), `npm run build` → `dist/` (a build exists) |
| Media | `public/media/` — client photography/video, exported as responsive `.webp` sets (480/900/1400 widths) and re-encoded ~10 s muted `.mp4` loops |

### Form handling

`site.formEndpoint` is `null`: the contact form falls back to opening the visitor's mail client with fields pre-filled. Intended production path (documented in code): create a Formspree form and paste the endpoint — the form then POSTs with success/error states.

## 4. Hosting

- `brandfirst-media/vercel.json` exists (framework `vite`, output `dist/`, SPA rewrite excluding `/assets/`), so **Vercel is the intended host for the React site**. Whether a Vercel project/domain is provisioned: **TBD**.
- Production domain: **TBD** (no domain configured anywhere in the repo).
- WordPress hosting: **TBD / likely none** — wp-local is a local reference environment only.

## 5. Licensing constraints (must-hold requirements)

- Arolax is a licensed ThemeForest product; its demo photography/video (CrowdyTheme's) is **not licensed for production** — the README states remaining demo assets must be replaced before launch. Current `public/` assets are largely the client's own (`bfm-*`, `aso-*`, `room16-*`).
- Fonts: Beatrice Trial (evaluation-only) and Getaway (no licence metadata) are excluded from the build; they remain in git history (commit `6526454`) — purging requires `git filter-repo`.

## 6. Non-functional requirements observed in the build

- `prefers-reduced-motion` disables smooth scroll, pinning, cursor effects and the autoplaying hero video.
- Pinning and custom cursor gated to ≥ 768 px / fine pointers.
- A 2.5 s failsafe reveals all animated content so nothing can remain invisible.
- Responsive images via `srcSet`; videos muted/looped (silent production clips).
