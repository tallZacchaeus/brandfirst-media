/**
 * Static prerender, run after both Vite builds (see package.json "build").
 *
 * For every public route in src/seo/pages.js, renders the app at that URL and
 * writes a real HTML file: the page markup inside #root, and that page's own
 * title, description, canonical, Open Graph, Twitter and JSON-LD tags in the
 * head. Crawlers and link previews (WhatsApp, Facebook, LinkedIn, X) read
 * those without running JavaScript; visitors get a first paint that needs none.
 * The browser then hydrates the same markup (src/main.jsx).
 *
 *   /                       dist/index.html
 *   /about                  dist/about.html
 *   /brands/room16          dist/brands/room16.html
 *   anything else           dist/404.html, served with a 404 status
 *
 * Cloudflare serves /about from about.html (html_handling, the default) and
 * 404.html for unknown paths (not_found_handling: "404-page" in
 * wrangler.jsonc). Also writes sitemap.xml and robots.txt from the same list,
 * so neither can drift from the routes.
 */
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const ssrDir = join(root, 'dist-ssr');

const { render, PUBLIC_PATHS, SITE_URL } = await import(pathToFileURL(join(ssrDir, 'entry-server.js')).href);
const template = readFileSync(join(dist, 'index.html'), 'utf8');
if (!template.includes('<!--app-head-->') || !template.includes('<!--app-html-->')) {
  throw new Error('dist/index.html is missing the <!--app-head--> / <!--app-html--> placeholders');
}

function page(url) {
  const { html, head } = render(url);
  return template.replace('<!--app-head-->', head).replace('<!--app-html-->', html);
}

function write(file, contents) {
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, contents);
}

for (const path of PUBLIC_PATHS) {
  const file = path === '/' ? 'index.html' : `${path.slice(1)}.html`;
  write(join(dist, file), page(path));
  console.log(`prerendered ${path.padEnd(26)} → dist/${file}`);
}

// Any path the app has no route for renders the NotFound page; this one is
// only ever served for URLs that match no file.
write(join(dist, '404.html'), page('/404'));
console.log(`prerendered ${'(not found)'.padEnd(26)} → dist/404.html`);

const today = new Date().toISOString().slice(0, 10);
write(join(dist, 'sitemap.xml'), [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...PUBLIC_PATHS.map((p) => `  <url><loc>${SITE_URL}${p === '/' ? '/' : p}</loc><lastmod>${today}</lastmod></url>`),
  '</urlset>',
  '',
].join('\n'));

write(join(dist, 'robots.txt'), [
  'User-agent: *',
  'Allow: /',
  '',
  `Sitemap: ${SITE_URL}/sitemap.xml`,
  '',
].join('\n'));
console.log(`wrote sitemap.xml (${PUBLIC_PATHS.length} URLs) and robots.txt for ${SITE_URL}`);

rmSync(ssrDir, { recursive: true, force: true });
