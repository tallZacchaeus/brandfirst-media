# 01 — Product Requirements Document (PRD)

**Project:** Brandfirst Media website
**Client:** Brandfirst Media, Lagos, Nigeria
**Prepared:** September 2026
**Status of source content:** `BrandfirstMedia-Website-Content.md` is marked *"Draft for client review"*; the built site has since evolved beyond it (see "Positioning evolution" below).

> **Paths** in this document are relative to the parent project folder `BrandfirstMedia/`, which holds this repository (`brandfirst-media/`) alongside `wp-local/`, `arolax-theme/`, `room16-instagram/` and `media files/`. Those four are **not** in this repository.

---

## 1. What the site is for

A public marketing website for **Brandfirst Media**, a production group in Lagos, Nigeria. The site must:

- Present the group and its three in-house brands as one accountable production partner.
- Show real, produced work (print, apparel, event lighting/stage) as proof.
- Convert visitors into enquiries via a contact form, phone, and WhatsApp.

## 2. The client

- **Brandfirst Media** — parent brand: print of every kind, large format and signage, publicity/brand-visibility coordination. Based in Lagos, Nigeria. The business started in a single shop ("Room 16" is named after the shop number).
- **ROOM16** — in-house brand: event lighting hire, rigging and operation; stage design and build; set design and production.
- **Aṣọ Ìgbàlódé** — in-house brand: branded clothing and clothing prints (shirts, jerseys, vests, caps), corporate and team clothing, custom pieces and merchandise.

Known contact details (from `src/data/site.js`, as supplied by the client):

- Phone (calls): 0708 413 7772 (+234 708 413 7772)
- WhatsApp: 0806 644 2508 (+234 806 644 2508) — every WhatsApp link opens with a pre-filled enquiry message (`site.whatsappMessage`)
- Email: brandfirstmedia@gmail.com — flagged in code as TODO: replace with a domain address before launch
- Brandfirst Media: Instagram https://www.instagram.com/brandfirstmedia/ · Facebook https://www.facebook.com/BrandfirstMedia
- ROOM16: Instagram https://www.instagram.com/room16pro/ · no Facebook page of its own (links to Brandfirst Media's)
- Aṣọ Ìgbàlódé: Instagram https://www.instagram.com/asoigbalode/ · Facebook https://www.facebook.com/Asoigbalode/
- Office: Lagos, Nigeria (exact address TBD — content doc lists it as a placeholder)

## 3. Positioning evolution (important context)

The original content document (`BrandfirstMedia-Website-Content.md`) positioned Brandfirst Media as a **media, brand communications and marketing agency** (media strategy, IMC, media buying, measurement). The **built site repositions the business as a production group** — "Print. Events. Clothing." (originally "Apparel", renamed site-wide) — reflecting what the client actually does and the assets they supplied (press runs, billboards, jerseys, lighting rigs). The meta title is now *"Brandfirst Media | Print, Publicity and Event Production in Lagos"*.

Key brand message (current): one brief, three in-house brands, one team accountable from first proof to final strike — deadlines that hold and colour that matches across paper, fabric and light.

## 4. Target audience

From the site data (`home.industries.sectors`):

- Corporate organisations
- Event and conference organisers
- Consumer and retail brands
- Public sector and government
- Nonprofits and development organisations
- Schools and professional bodies
- Campaigns and activations

In short: anyone whose brand has to show up in print, on people, or on a stage, with a date that cannot move. Most Lagos SMB enquiries are expected to arrive via WhatsApp (noted explicitly in the code).

## 5. Pages / sections required

Navigation (as built): **Home · About · Services · Work · Brands (with sub-pages) · Contact**. Insights exists as a page but is deliberately kept out of the nav until articles are written.

| Page | Route | Content |
|---|---|---|
| Home | `/` | Hero ("Print. Events. Clothing."), intro, group/brands strip, nine services grouped three per brand, why-us, industries, work preview, CTA |
| About | `/about` | Overview, philosophy ("Brand First. Every Surface."), mission, vision, five values (Craft, Reliability, Consistency, Straight talk, Partnership) |
| Services | `/services` | Nine services, three per brand — Brandfirst Media: Print Production, Large Format & Signage, Publicity & Brand Visibility · ROOM16: Event Lighting, Stage Design & Build, Set Design & Production · Aṣọ Ìgbàlódé: Clothing & Branded Apparel, Corporate & Team Clothing, Custom Pieces & Merchandise |
| Work | `/work` | Filterable showcase (Print / Events / Clothing) of ~33 real photos and 12 video loops, plus five placeholder case-study titles awaiting real projects |
| Brands | `/brands` | The group: parent brand + two in-house brands |
| Brand detail | `/brands/:slug` | Per-brand page: offer, process, use cases, FAQ, social — for `brandfirst-media`, `room16`, `aso-igbalode` |
| Contact | `/contact` | Hero, body, 7 form fields (Name, Company, Email, Phone, Service interest, Budget range, Message), phone/WhatsApp/email details |
| Insights | (built, unrouted) | Intro + four planned article topics, marked "Article in preparation" |
| 404 | `*` | Not-found template |

## 6. Goals and success metrics

Goals stated or implied by the content and build:

1. **Generate qualified enquiries** — primary CTAs are "Start a Project", "Contact Brandfirst Media"; contact form, phone, WhatsApp all prominent.
2. **Prove capability with real work** — the Work page uses the client's own production photography and footage rather than stock.
3. **Establish the group structure** — make clear that ROOM16 and Aṣọ Ìgbàlódé are in-house brands, so one brief covers print + apparel + stage.
4. **Local SEO visibility** — draft meta targets "print, publicity and event production in Lagos"; the original doc listed Lagos/Nigeria agency keywords.

Success metrics: TBD — no analytics tooling is configured in the project. Reasonable candidates (to be agreed with the client): enquiry volume (form/WhatsApp/calls), search visibility for Lagos production terms, and time-to-quote follow-through.

## 7. Open items awaiting the client

Carried in the content doc's "Notes for Client Confirmation" and in code TODOs:

- Domain email address (replace gmail.com)
- Final office address
- Real case studies (five placeholders currently)
- Insight articles (four topics, unwritten — page hidden from nav until then)
- Permission to display named client work (PremiumTrust Bank billboard and merchandise appear in the showcase; permission question is flagged in code comments)
- Form endpoint (Formspree or similar; currently falls back to a pre-filled mailto)
- Confirmation of registered company name, awards, team bios
- Hosting/domain decisions (see TRD — currently TBD)
