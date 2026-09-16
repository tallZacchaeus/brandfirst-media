import { useParams, Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import BrandMedia from '../components/BrandMedia';
import { useFadeIn, useImageReveal } from '../hooks/useGsap';
import { brands, services, showcase, site } from '../data/site';
import NotFound from './NotFound';
import '../styles/page.css';
import '../styles/section.css';
import './Brands.css';
import './BrandDetail.css';

/** A single brand in the group. Portfolio slots stay empty until real project
 *  images are supplied — nothing is filled with social-export placeholders. */
export default function BrandDetail() {
  const { slug } = useParams();
  const brand = brands.find((b) => b.slug === slug);
  const blurb = useFadeIn();
  const hero = useImageReveal();

  if (!brand) return <NotFound />;
  const named = brand.services.map((id) => services.find((s) => s.slug === id)).filter(Boolean);
  // Everything shot for this brand, rather than a hand-picked subset that has
  // to be kept in step with the media folder.
  const shots = showcase.filter((s) => s.brand === brand.accent);

  return (
    <main className={`page bd bd--${brand.accent}`}>
      <div className="page__inner">
        <PageHero eyebrow={brand.kind} title={brand.name} lede={brand.line} />
        {brand.heroImage ? (
          <figure ref={hero} className="bd__hero">
            <img
              src={brand.heroImage.src}
              srcSet={brand.heroImage.srcSet}
              sizes="(max-width: 1024px) 100vw, 1250px"
              alt={brand.heroImage.alt}
              width={brand.heroImage.w}
              height={brand.heroImage.h}
              fetchPriority="high"
            />
          </figure>
        ) : brand.logo ? (
          <figure ref={hero} className="bd__hero bd__hero--logo">
            <img src={brand.logo.src} alt={`${brand.name} logo`} width={brand.logo.w} height={brand.logo.h} fetchPriority="high" />
          </figure>
        ) : null}

        <p ref={blurb} className="bd__blurb">{brand.blurb}</p>

        <section className="bd__services">
          <h2 className="sec__title bd__h2">What {brand.name} does</h2>
          <ul className="bd__service-list">
            {named.map((s) => (
              <li key={s.slug} className="bd__service">
                <span className="bd__n">{s.n}</span>
                <div>
                  <h3><Link to={`/services#${s.slug}`}>{s.title}</Link></h3>
                  <p>{s.card}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>


        {brand.offer && (
          <section className="bd__block">
            <h2 className="sec__title bd__h2">What {brand.name} produces</h2>
            <ul className="bd__offer">
              {brand.offer.map(([t, d]) => (
                <li key={t}><h3>{t}</h3><p>{d}</p></li>
              ))}
            </ul>
          </section>
        )}

        {brand.process && (
          <section className="bd__block">
            <h2 className="sec__title bd__h2">How a job runs</h2>
            <ol className="bd__process">
              {brand.process.map(([t, d], i) => (
                <li key={t}><span className="bd__n">0{i + 1}</span><h3>{t}</h3><p>{d}</p></li>
              ))}
            </ol>
          </section>
        )}

        {brand.useCases && (
          <section className="bd__block bd__block--tight">
            <h2 className="sec__title bd__h2">Good for</h2>
            <ul className="bd__tags">
              {brand.useCases.map((u) => <li key={u}>{u}</li>)}
            </ul>
          </section>
        )}

        {shots.length > 0 && (
          <section className="bd__block">
            <h2 className="sec__title bd__h2">{brand.name} at work</h2>
            <ul className="bd__gallery">
              {shots.map((g) => (
                <li key={g.src} className={g.h > g.w ? 'bd__tall' : undefined}>
                  <img
                    src={g.src}
                    srcSet={g.srcSet}
                    sizes="(max-width: 767px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    alt={g.alt}
                    width={g.w}
                    height={g.h}
                    loading="lazy"
                    decoding="async"
                  />
                </li>
              ))}
            </ul>
          </section>
        )}

        {brand.faq && (
          <section className="bd__block">
            <h2 className="sec__title bd__h2">Questions we get asked</h2>
            <dl className="bd__faq">
              {brand.faq.map(([q, a]) => (
                <div key={q}><dt>{q}</dt><dd>{a}</dd></div>
              ))}
            </dl>
          </section>
        )}

        <section className="bd__block">
          <h2 className="sec__title bd__h2">Works with</h2>
          <p className="bd__works-lede">
            {brand.name} is one part of the group. The other two cover the rest of an event, and one brief can book all three.
          </p>
          <ul className="bd__siblings">
            {brands.filter((b) => b.slug !== brand.slug).map((b) => (
              <li key={b.slug} className={`bd__sibling bd__sibling--${b.accent}`}>
                <BrandMedia brand={b} className="bd__sibling-media" />
                <span className="brand-card__kind">{b.kind}</span>
                <h3>{b.name}</h3>
                <p>{b.line}</p>
                <Link to={`/brands/${b.slug}`}>About {b.name}</Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="bd__foot">
          {brand.social.length > 0 && (
            <div className="bd__social">
              <span className="bd__social-label">Follow {brand.name}</span>
              {brand.social.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer">{s.label}</a>
              ))}
            </div>
          )}
          <Link className="btn btn--primary" to="/contact">Enquire about {brand.name}</Link>
        </section>
      </div>
    </main>
  );
}
