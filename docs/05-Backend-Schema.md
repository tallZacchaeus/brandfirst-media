# 05 — Backend Schema / Content Model

**Scope:** the WordPress reference environment in `wp-local/` (standard WP content model plus theme/plugin additions), and — because the shipped site is a static React build — the data modules that stand in for a CMS.

> **Paths** in this document are relative to the parent project folder `BrandfirstMedia/`, which holds this repository (`brandfirst-media/`) alongside `wp-local/`, `arolax-theme/`, `room16-instagram/` and `media files/`. Those four are **not** in this repository.

---

## 1. Which backend is live?

- The **deliverable (`brandfirst-media/`) has no backend**: all content is JavaScript data modules, the contact form posts to a (not-yet-configured) Formspree endpoint or falls back to mailto, and there is no database.
- The **WordPress install (`wp-local/`)** is the design-reference environment carrying the Arolax "Branding Agency" demo. Its schema is documented below in case the site is ever moved onto WordPress.

## 2. WordPress database

Standard WordPress schema, `wp_` table prefix (`wp-config.php`):

- Native install DB: `arolax_local` @ `127.0.0.1:3307` (user `arolax`), utf8mb4/utf8mb4_unicode_ci
- Docker DB: MariaDB 11.4, database `wordpress`

**Core tables:** `wp_posts`, `wp_postmeta`, `wp_terms`, `wp_term_taxonomy`, `wp_term_relationships`, `wp_termmeta`, `wp_users`, `wp_usermeta`, `wp_comments`, `wp_commentmeta`, `wp_options`, `wp_links`.

**Plugin tables:** Elementor 3.x adds `wp_e_events` and (with core WP) Action Scheduler tables (`wp_actionscheduler_*`) for background jobs. Contact Form 7 stores forms as a CPT, no custom tables. Akismet uses options/commentmeta. No hand-built custom tables were found in the project files; exact table list should be confirmed against the running DB (**TBD** — the database itself was not queried for this document).

## 3. Content model (post types)

### WordPress built-ins in use

| Post type | Use here |
|---|---|
| `post` | Blog/Journal — demo imported 6 posts (title, slug, date, category, image); homepage Journal widget shows 3 (`posts_per_page: 3`, `post_order: asc`) |
| `page` | Elementor-built pages — homepage is page **#9322** ("Branding Agency", `_elementor_data` ≈ 286 KB) |
| `attachment` | Demo media + uploads (`wp-content/uploads/2024–2026`) |
| `elementor_library` | Templates: #13 Header, #8558 Header Inner, #7259 Header Inner Pages, #6033 dark header, #1354 Footer, #558 Footer Inner, #4725 Portfolio Details, #5365 Blog Single, #6484 Blog Archive, #6518 Search, #6512 Taxonomy, #7258 404, plus page templates (#3304 About, #3331 Services, #4307 Work, #76 Team, #1715 Team Details, #229 Career, #2096 FAQ, #2474 Contact) |
| `wpcf7_contact_form` | Contact Form 7 forms |
| `nav_menu_item` | Menus: **"Main Menu"** (5 top-level, 37 items) and the demo's **"Mega Menu"** (127 items, showcases the theme's 92 demos — not site navigation) |

### Theme / plugin post types

| Post type | Registered by | Notes |
|---|---|---|
| `arolax-portfolio` | Arolax Essential (options-driven CPT builder, `inc/cpt/`) | Demo imported 11 portfolio items (6 with local images). CPTs and their taxonomies in this theme are **configured dynamically from theme options** (`cpt_taxonomy_options`), not hard-coded |
| `wcf-mega-menu-tpl` | Arolax Essential (`inc/mega-menu/cpt.php`) | Mega-menu templates |
| `wcf-custom-font` | Arolax Essential (`inc/custom-fonts.php`) | Uploaded custom fonts (meta key `wcf_custom_fonts`) |

### Taxonomies

- Built-in `category` / `post_tag` on posts — demo quirk documented in `SECTION-MAP.md`: the homepage Journal widget filters to term 6, the **tag** "Development", while every post is in the **category** "Design".
- Portfolio taxonomy(ies): created dynamically via theme options — exact registered names **TBD** (confirm in the running install under Settings → the theme's CPT options).

## 4. Key plugin data

| Plugin | Where its data lives |
|---|---|
| Elementor / AAE / AAE Pro | `wp_postmeta` — `_elementor_data` (JSON widget tree per page/template), `_elementor_page_settings`, CSS in `wp-content/uploads/elementor/` |
| Arolax theme options | `wp_options` (theme options framework), incl. `search_result_post_types`, CPT/taxonomy builder options |
| Contact Form 7 | `wpcf7_contact_form` posts; uploads in `wp-content/uploads/wpcf7_uploads/` |
| One Click Demo Import (bundled importer) | run via WP-CLI with mu-plugin `cli-import-shim.php`; log at `wp-local/import.log` |

## 5. React data modules (the deliverable's de-facto schema)

All in `brandfirst-media/src/data/site.js` (single file):

| Export | Shape |
|---|---|
| `site` | name, tagline, location, phone/phoneIntl, email, social[], formEndpoint (null ⇒ mailto fallback), whatsapp (wa.me digits), whatsappDisplay, whatsappMessage (pre-filled enquiry text used by every WhatsApp link), meta{title, description} |
| `home` | hero{headlineLines, sub, primary, secondary}, intro, group, why{highlights[]}, industries{sectors[]}, cta |
| `services[]` (6) | { n, slug, brand, image, title, card, body, includes[] } — `brand` ∈ brandfirst / room16 / aso-igbalode |
| `brands[]` (3) | { slug, name, kind, line, blurb, services[], accent, logo, image, heroImage, offer[[label,text]], process[[step,text]], useCases[], faq[[q,a]], social[] } |
| `about` | hero, overview[], philosophy, mission, vision, values[] (5) |
| `videos[]` (12) | { name, w, h, tag, brand, alt } — muted ~10 s loops |
| `showcase[]` (~33) | media entries tagged Print / Events / Clothing with brand accent |
| `work` | hero, cta, placeholders[] (5 titled case-study slots, no invented clients/metrics) |
| `insights` | hero, intro, topics[] (4 planned, unwritten) |
| `contact` | hero, body, fields[] (7) |
| `nav` | 6 items; Brands carries 3 children; Insights intentionally omitted |

Media entries are generated by a `media(name, widths, w, h, alt)` helper over `public/media/*-{480,900,1400}.webp` responsive sets.

**Migration note:** if the site later needs a CMS, the Journal component already accepts a `posts` prop with shape `{ slug, title, date, category, image }`, and search/taxonomy pages are written to be swapped from local data to CMS queries.
