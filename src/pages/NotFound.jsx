import { Link } from 'react-router-dom';
import { brands, site } from '../data/site';
import './NotFound.css';

/** Elementor template #7258 "404 Page Template".
 *  min-height 100vh, centred; title 60px/65px, text 18px/26px (381px), button.
 *
 *  Served for any URL the site does not have, with a real 404 status
 *  (dist/404.html, see scripts/prerender.mjs) and noindex (seo/pages.js).
 *  Rather than a dead end, it offers the pages people most often come for.
 *  Static: it arrives prerendered, and a JS entrance would only make the text
 *  blink out and back when the page hydrates. */
const DESTINATIONS = [
  ['Everything we produce', '/services'],
  ...brands.map((b) => [`${b.name}: ${b.line.toLowerCase()}`, `/brands/${b.slug}`]),
  ['Our work', '/work'],
  ['Contact us', '/contact'],
];

export default function NotFound() {
  return (
    <main className="nf">
      <p className="nf__code" aria-hidden>404</p>
      <h1 className="nf__title">Sorry! Page not found.</h1>
      <p className="nf__text">
        The page you are looking for was moved, removed, renamed or never existed.
      </p>
      <nav className="nf__nav" aria-label="Pages you might be looking for">
        <ul className="nf__links">
          {DESTINATIONS.map(([label, to]) => (
            <li key={to}><Link to={to}>{label}</Link></li>
          ))}
        </ul>
      </nav>
      <p className="nf__text">
        Or call <a href={`tel:${site.phoneIntl}`}>{site.phone}</a>.
      </p>
      <Link className="btn btn--primary" to="/">Back To Home</Link>
    </main>
  );
}
