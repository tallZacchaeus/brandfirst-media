import { Link } from 'react-router-dom';
import './PageHero.css';

/**
 * Opener for every inner page: a compact navy band under the transparent
 * header, sized so part of the next section shows on a laptop screen.
 *
 *   trail    breadcrumb after "Home": [{ label, to? }]; the last item is the
 *            current page and is not linked
 *   eyebrow  small label above the title (brand pages: "In-house brand")
 *   actions  buttons or contact channels under the copy
 *   image    a media() entry, framed with print crop marks; an optional
 *            `focus` (CSS object-position) picks the crop of a tall photo
 *   aside    replaces the image with page-specific content (the Brands group
 *            structure, the Work contact sheet) so each page keeps its own
 *            character inside the shared band
 *   accent   brand key ('brand' | 'room16' | 'aso') for brand pages
 *
 * Entrance is CSS on load — transform and opacity only — rather than a JS
 * reveal: this band holds the page's largest paint, and an earlier JS-driven
 * entrance on the home hero held its largest element back for 6 s.
 */
export default function PageHero({ trail = [], eyebrow, title, lede, actions, image, aside, accent }) {
  const side = aside ?? (image && (
    <div className="ix-frame phero__frame">
      <figure className="ix-photo phero__photo">
        <img
          src={image.src}
          srcSet={image.srcSet}
          sizes="(max-width: 1023px) 92vw, 44vw"
          alt={image.alt}
          width={image.w}
          height={image.h}
          loading="eager"
          // React 18 has no camelCase fetchPriority prop; the lowercase
          // attribute is passed through to the browser as-is.
          fetchpriority="high"
          decoding="async"
          style={image.focus ? { objectPosition: image.focus } : undefined}
        />
      </figure>
    </div>
  ));

  return (
    <header className={`phero${accent ? ` phero--${accent}` : ''}${side ? '' : ' phero--text'}`}>
      <div className="phero__grain" aria-hidden="true" />

      <div className="phero__inner">
        <div className="phero__copy">
          <nav className="phero__crumbs" aria-label="Breadcrumb">
            <ol>
              <li><Link to="/">Home</Link></li>
              {trail.map((item, i) => (
                <li key={item.label}>
                  {item.to && i < trail.length - 1
                    ? <Link to={item.to}>{item.label}</Link>
                    : <span aria-current="page">{item.label}</span>}
                </li>
              ))}
            </ol>
          </nav>

          {eyebrow && <p className="phero__eyebrow">{eyebrow}</p>}
          <h1 className="phero__title">{title}</h1>
          {lede && <p className="phero__lede">{lede}</p>}

          {actions && <div className="phero__actions">{actions}</div>}
        </div>

        {side && <div className="phero__side">{side}</div>}
      </div>
    </header>
  );
}
