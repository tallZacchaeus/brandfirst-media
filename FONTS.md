# Fonts — what the demo used, what this build uses, and why they differ

## What the Arolax demo actually uses

Counted across every extracted Elementor template and page:

| family | uses | where |
|---|---|---|
| Kanit | 212 | display type throughout |
| **Beatrice Trial** | **107** | About, Services, Career, Contact, FAQ |
| Instrument Sans | 45 | body copy, post titles |
| oak_suns | 9 | Blog Single |
| **Getaway** | **4** | hero headline, "Pro", closing CTA |
| Roboto / DM Sans / Teko / Plus Jakarta Sans | 1–4 | incidental |

## The two that cannot ship

**Beatrice Trial** — `BeatriceTRIAL-*.ttf`, embedded metadata reads:

> © 2022, Sharp Type Co. All rights reserved. Beatrice Trial …
> See sharptype.co/licensing/ for applicable End User License Agreement.

Trial cuts are for evaluation and mockups. Deploying one to a public site is a
licence violation. The theme ships these inside its demo content, so anyone who
imports the demo and launches inherits the problem.

**Getaway** — `getaway.otf` carries **no copyright, licence, foundry or designer
metadata at all**; the only string is `Fontself Maker 3.5.7`, the tool used to
build it. Unknown provenance. Not safe to assume redistribution rights.

Note Getaway is not a decorative accent: its four uses are the **largest type on
the site** — the hero headline "We sharp brand Value", the "Pro" badge, and the
closing "Let's work together".

Getaway is a **heavy, condensed, high-contrast display serif** — a Didone-ish
fashion face, *not* a geometric sans. Its OS/2 metrics (x-height 0.483em, cap
0.734em, `H` advance 0.64em, weight 400, width class 5) do not reveal that;
only rendering it does.

## What this build uses  *(current — one family, site-wide)*

The client picked the face from [adikastakes.store](https://www.adikastakes.store/)
and asked for the whole site to follow it, so every token resolves to the same
family. That site runs it the same way: Black for display, Regular for body.

| token | weights | where |
|---|---|---|
| `--font-hero` | 900 / 800 | hero headline and tagline, both wordmarks, closing CTA |
| `--font-display` | 800 / 700 | section titles, card titles |
| `--font-inner` | 800 / 700 | inner-page titles |
| `--font-body` | 400 / 500 / 600 | body copy, labels, form fields |

**Montserrat Alternates**, SIL Open Font License, loaded from Google Fonts in
`index.html`. Nothing is self-hosted, so `public/assets/fonts/` is gone along
with its gitignore entry, and `src/styles/fonts.css` holds no `@font-face`
rules. It is Montserrat with alternate letterforms — single-storey `a`, hooked
`y` and `Y` descenders — which is what gives the reference its character.

Two things this face needs that the previous serif did not:

- **Negative tracking at display size** (`-0.02em`). Without it the counters in
  the heavy weights read as gaps between letters.
- **A smaller display scale.** It is far wider than Instrument Serif at the same
  size, so section titles stepped from 70px to 56px and page titles from 100px
  to 76px; at the old sizes, "Built for Deadlines and Colour That Matches" ran
  to four lines.

### The licence problem is settled

Neither Getaway nor Beatrice Trial is referenced anywhere in the build. The risk
described above — an evaluation-only cut and a face of unknown provenance, both
set at the largest sizes on the site — no longer applies to anything deployed.

Note the files remain in git history (committed in `6526454`); removing them
from history needs `git filter-repo` and a force-push.

## If you ever want the demo's exact type back

Both faces would have to be licensed first:

1. **Beatrice** — buy a web licence from [Sharp Type](https://sharptype.co/licensing/),
   then self-host the licensed webfonts.
2. **Getaway** — identify the foundry before anything else. Given the missing
   metadata, treat the bundled file as unusable until you can name it and buy a
   licence. A heavy condensed Didone-ish display serif is the closest category.
3. Either way: drop `.woff2` files in `public/assets/fonts/`, add `@font-face`
   rules to `src/styles/fonts.css`, and repoint the tokens in
   `src/styles/tokens.css`.
