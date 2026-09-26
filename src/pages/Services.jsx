import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import SectionHead from '../components/SectionHead';
import { useReveal } from '../hooks/useReveal';
import { brands, pageHeroImages, services } from '../data/site';
import { pad, servicesFor } from '../data/group';
import '../styles/page.css';
import '../styles/inner.css';
import './Services.css';

/** Services: nine services, three per brand.
 *  An index directly under the hero lets a visitor find any service at a
 *  glance; below it, one section per brand holds its three in full. Every
 *  service keeps its #slug anchor — the home page, footer and brand pages all
 *  link straight to them. */
export default function Services() {
  const index = useReveal();
  const cta = useReveal();

  return (
    <main className="page sv">
      <PageHero
        trail={[{ label: 'Services' }]}
        title="Everything We Produce"
        lede="Nine things we produce in Lagos, with three services from each brand in the group. Brief any one of us and you have all three."
        image={pageHeroImages.services}
      />

      <nav ref={index} className="sv-index" aria-label="Services by brand">
        <div className="ix-wrap sv-index__grid">
          {brands.map((b) => (
            <div key={b.slug} className={`sv-index__col sv-index__col--${b.accent}`} data-reveal>
              <p className="ix-label sv-index__kind">{b.kind}</p>
              <a className="sv-index__brand" href={`#brand-${b.slug}`}>{b.name}</a>
              <ul>
                {servicesFor(b).map((s) => (
                  <li key={s.slug}>
                    <a href={`#${s.slug}`}>
                      <span className="ix-index">{s.n}</span>
                      <span>{s.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </nav>

      {brands.map((b, i) => <BrandGroup key={b.slug} brand={b} index={i} />)}

      <section ref={cta} className="ix-section ix-section--dark">
        <div className="ix-wrap ix-cta" data-reveal>
          <div>
            <h2 className="ix-cta__title">Need a Quote?</h2>
            <p className="ix-cta__body">
              Send the artwork, the quantity and the date. We quote on real specs, not estimates.
            </p>
          </div>
          <div className="ix-cta__actions">
            <Link className="btn btn--light" to="/contact">Request a Quote</Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function BrandGroup({ brand, index }) {
  const ref = useReveal();
  return (
    <section
      ref={ref}
      id={`brand-${brand.slug}`}
      className={`ix-section sv-group sv-group--${brand.accent}${index % 2 ? ' ix-section--tint' : ''}`}
      aria-labelledby={`sv-${brand.slug}`}
    >
      <div className="ix-wrap">
        <SectionHead
          index={pad(index + 1)}
          label={brand.kind}
          title={brand.name}
          lede={brand.line}
          id={`sv-${brand.slug}`}
          action={<Link className="ix-link" to={`/brands/${brand.slug}`}>About {brand.name}</Link>}
        />
        <div className="sv-group__list">
          {servicesFor(brand).map((s, i) => <ServiceRow key={s.slug} service={s} flip={i % 2 === 1} />)}
        </div>
      </div>
    </section>
  );
}

function ServiceRow({ service: { n, slug, title, body, includes, image }, flip }) {
  return (
    <article id={slug} className={`sv-row${flip ? ' sv-row--flip' : ''}`} data-reveal>
      <div className="sv-row__copy">
        <p className="sv-row__n ix-index">{n}</p>
        <h3 className="sv-row__title">{title}</h3>
        <p className="sv-row__body">{body}</p>
        <p className="ix-label sv-row__label">What this includes</p>
        <ul className="sv-row__includes">
          {includes.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </div>
      {image && (
        <div className="ix-frame sv-row__frame">
          <figure className="ix-photo sv-row__photo">
            <img
              src={image.src}
              srcSet={image.srcSet}
              sizes="(max-width: 1023px) 92vw, 40vw"
              alt={image.alt}
              width={image.w}
              height={image.h}
              loading="lazy"
              decoding="async"
            />
          </figure>
        </div>
      )}
    </article>
  );
}
