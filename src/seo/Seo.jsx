import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { pageFor } from './pages';
import { schemaFor } from './schema';
import { absolute, LOCALE, SITE_HOST } from './config';
import { site } from '../data/site';

/**
 * Head tags for the current route: title, description, canonical, robots,
 * Open Graph, Twitter card and JSON-LD. Rendered once, in SiteLayout, so every
 * route (including the 404, which any unknown URL resolves to) gets its own set
 * and client-side navigation swaps them. The prerender writes the same tags
 * into each page's HTML, so crawlers and link previews that do not run
 * JavaScript see them too.
 *
 * Indexing: the canonical always names the production URL. A host other than
 * production or its www twin (localhost, the Vercel copy, a preview) also gets
 * noindex, decided in the browser, since the prerendered HTML is built for
 * production. www gets the canonical alone: noindex plus a canonical pointing
 * elsewhere would send search engines two conflicting signals.
 */
export default function Seo() {
  const { pathname } = useLocation();
  const page = pageFor(pathname);
  const url = absolute(page.path);
  const image = absolute(`/og/${page.og}.jpg`);

  const host = typeof window !== 'undefined' ? window.location.host : SITE_HOST;
  const offHost = host !== SITE_HOST && host !== `www.${SITE_HOST}`;
  const robots = page.noindex || offHost ? 'noindex, nofollow' : 'index, follow, max-image-preview:large';

  // `<` escaped so no string in the data can close the script element early.
  const jsonLd = JSON.stringify(schemaFor(page)).replace(/</g, '\\u003c');

  return (
    <Helmet prioritizeSeoTags>
      <title>{page.title}</title>
      <meta name="description" content={page.description} />
      <meta name="robots" content={robots} />
      {!page.noindex && <link rel="canonical" href={url} />}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={site.name} />
      <meta property="og:locale" content={LOCALE} />
      {!page.noindex && <meta property="og:url" content={url} />}
      <meta property="og:title" content={page.title} />
      <meta property="og:description" content={page.description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={page.ogAlt} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={page.title} />
      <meta name="twitter:description" content={page.description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={page.ogAlt} />

      <script type="application/ld+json">{jsonLd}</script>
    </Helmet>
  );
}
