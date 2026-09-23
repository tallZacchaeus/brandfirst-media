import { Link } from 'react-router-dom';
import { FaInstagram } from 'react-icons/fa';
import PageHero from '../components/PageHero';
import BrandMedia from '../components/BrandMedia';
import { useReveal } from '../hooks/useReveal';
import { brands } from '../data/site';
import { pad, servicesFor } from '../data/group';
import '../styles/page.css';
import '../styles/inner.css';
import './Brands.css';

/** The group. The hero draws the structure — Brandfirst Media as the parent,
 *  ROOM16 and Aṣọ Ìgbàlódé beneath it — so the relationship is clear before
 *  any scrolling. Below, each brand gets a full-width editorial row. */
export default function Brands() {
  const parent = brands.find((b) => b.kind === 'Parent brand') ?? brands[0];
  const children = brands.filter((b) => b !== parent);

  return (
    <main className="page br">
      <PageHero
        trail={[{ label: 'Brands' }]}
        title="One group, three brands"
        lede="Three brands, one production floor. Each has its own trade; between them they carry a campaign from the first proof to the last light going out."
        aside={
          <div className="br-tree" role="group" aria-label="Group structure">
            <TreeNode brand={parent} parent />
            <div className="br-tree__branches" aria-hidden="true" />
            <div className="br-tree__children">
              {children.map((b) => <TreeNode key={b.slug} brand={b} />)}
            </div>
          </div>
        }
      />

      {brands.map((b, i) => <BrandRow key={b.slug} brand={b} index={i} />)}
    </main>
  );
}

function TreeNode({ brand, parent = false }) {
  return (
    <Link to={`/brands/${brand.slug}`} className={`br-node br-node--${brand.accent}${parent ? ' br-node--parent' : ''}`}>
      {brand.image && (
        <img className="br-node__img" src={brand.image.src} srcSet={brand.image.srcSet} sizes="96px" alt="" width={brand.image.w} height={brand.image.h} loading="eager" decoding="async" />
      )}
      <span className="br-node__text">
        <span className="br-node__kind">{brand.kind}</span>
        <span className="br-node__name">{brand.name}</span>
        {parent && <span className="br-node__line">{brand.line}</span>}
      </span>
    </Link>
  );
}

function BrandRow({ brand, index }) {
  const ref = useReveal();
  const { slug, name, kind, line, blurb, accent, image, social } = brand;
  const instagram = social.find((s) => s.label.startsWith('Instagram'));

  return (
    <section
      ref={ref}
      className={`ix-section br-row br-row--${accent}${index % 2 ? ' br-row--flip ix-section--tint' : ''}`}
      aria-labelledby={`br-${slug}`}
    >
      <div className="ix-wrap br-row__grid">
        <div className="ix-frame br-row__frame" data-reveal>
          {image ? (
            <figure className="ix-photo br-row__photo">
              <img
                src={image.src}
                srcSet={image.srcSet}
                sizes="(max-width: 1023px) 92vw, 46vw"
                alt={image.alt}
                width={image.w}
                height={image.h}
                loading="lazy"
                decoding="async"
              />
            </figure>
          ) : (
            <BrandMedia brand={brand} />
          )}
        </div>

        <div className="br-row__copy">
          <p className="ix-head__meta" data-reveal>
            <span className="ix-index">{pad(index + 1)}</span>
            <span className="ix-label br-row__kind">{kind}</span>
          </p>
          <h2 id={`br-${slug}`} className="br-row__name" data-reveal>{name}</h2>
          <p className="br-row__line" data-reveal>{line}</p>
          <p className="br-row__blurb" data-reveal>{blurb}</p>

          <p className="ix-label br-row__label" data-reveal>Services</p>
          <ul className="br-row__services" data-reveal>
            {servicesFor(brand).map((s) => (
              <li key={s.slug}>
                <Link to={`/services#${s.slug}`}>
                  <span className="ix-index">{s.n}</span>
                  <span>{s.title}</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="br-row__actions" data-reveal>
            <Link className="btn btn--primary" to={`/brands/${slug}`}>Explore {name}</Link>
            {instagram && (
              <a className="ix-link br-row__social" href={instagram.href} target="_blank" rel="noreferrer">
                <FaInstagram aria-hidden="true" focusable="false" />
                {name} on Instagram
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
