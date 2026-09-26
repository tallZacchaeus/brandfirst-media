/**
 * The site's public address, set once. Canonical links, Open Graph URLs,
 * structured data, the sitemap and robots.txt are all built from this.
 *
 * Override at build time with VITE_SITE_URL (no trailing slash), e.g. for a
 * staging build. Anything served from another host (localhost, the Vercel
 * copy, a preview) still points its canonical here, and is marked noindex at
 * runtime (see Seo.jsx) and, on Vercel, by header (vercel.json).
 */
export const SITE_URL = (import.meta.env?.VITE_SITE_URL || 'https://brandfirstmedia.com').replace(/\/+$/, '');
export const SITE_HOST = new URL(SITE_URL).host;

/** Absolute URL for a site path ('/' → 'https://…/'). */
export const absolute = (path = '/') => SITE_URL + (path.startsWith('/') ? path : `/${path}`);

export const LOCALE = 'en_NG';
export const LANGUAGE = 'en-NG';
