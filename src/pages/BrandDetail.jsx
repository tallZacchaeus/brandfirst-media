import { useParams, Link } from 'react-router-dom';
import { FaInstagram } from 'react-icons/fa';
import PageHero from '../components/PageHero';
import SectionHead from '../components/SectionHead';
import BrandMedia from '../components/BrandMedia';
import VideoCard from '../components/VideoCard';
import ShotGrid from '../components/ShotGrid';
import { useReveal } from '../hooks/useReveal';
import { brands, home, showcase, videos } from '../data/site';
import { pad, servicesFor } from '../data/group';
import NotFound from './NotFound';
import '../styles/page.css';
import '../styles/inner.css';
import './Brands.css';
import './BrandDetail.css';

/** A single brand in the group. Sections are numbered as they render, so a
 *  brand without film or photographs simply has fewer sections — never a gap
 *  in the numbering or an empty placeholder. */
export default function BrandDetail() {
  const { slug } = useParams();
  const brand = brands.find((b) => b.slug === slug);
  if (!brand) return <NotFound />;
  // Keyed on the brand so moving between brand pages remounts cleanly and
  // every reveal runs again for the new brand.
  return <BrandPage key={brand.slug} brand={brand} />;
}

function BrandPage({ brand }) {
  const own = servicesFor(brand);
  // Everything shot for this brand, rather than a hand-picked subset.
  const shots = showcase.filter((s) => s.brand === brand.accent);
  const clips = videos.filter((v) => v.brand === brand.accent);
  const instagram = brand.social.find((s) => s.label.startsWith('Instagram'));
  const siblings = brands.filter((b) => b.slug !== brand.slug);

  let n = 0;
  const next = () => pad(++n);

  return (
    <main className={`page bd bd--${brand.accent}`}>
      <PageHero
        trail={[{ label: 'Brands', to: '/brands' }, { label: brand.name }]}
        eyebrow={brand.kind}
        title={brand.name}
        lede={brand.line}
        image={brand.heroImage}
        accent={brand.accent}
        actions={
          <>
            <Link className="btn btn--light" to="/contact">Enquire about {brand.name}</Link>
            {instagram && (
              <a className="btn btn--outline-light" href={instagram.href} target="_blank" rel="noreferrer">
                <FaInstagram aria-hidden="true" focusable="false" />
                Instagram
              </a>
            )}
          </>
        }
      />

      {/* A brand with a logo but no photograph still shows its mark. */}
      {!brand.heroImage && brand.logo && (
        <div className="ix-wrap bd-mark"><BrandMedia brand={brand} /></div>
      )}

      <Block index={next()} label="Services" title={`What ${brand.name} does`} lede={brand.blurb}>
        <ol className="bd-services">
          {own.map((s) => (
            <li key={s.slug} data-reveal>
              <span className="ix-index">{s.n}</span>
              <h3><Link to={`/services#${s.slug}`}>{s.title}</Link></h3>
              <p>{s.card}</p>
              <Link className="ix-link" to={`/services#${s.slug}`} aria-label={`${s.title}: service detail`}>Service detail</Link>
            </li>
          ))}
        </ol>
      </Block>

      {brand.offer && (
        <Block index={next()} label="Capabilities" title={`What ${brand.name} produces`} tint>
          <ul className="bd-offer">
            {brand.offer.map(([t, d]) => (
              <li key={t} data-reveal><h3>{t}</h3><p>{d}</p></li>
            ))}
          </ul>
        </Block>
      )}

      {brand.process && (
        <Block index={next()} label="Process" title="How a job runs">
          <ol className="bd-process">
            {brand.process.map(([t, d], i) => (
              <li key={t} data-reveal>
                <span className="bd-process__step">Step {pad(i + 1)}</span>
                <h3>{t}</h3>
                <p>{d}</p>
              </li>
            ))}
          </ol>
        </Block>
      )}

      {brand.useCases && (
        <Block index={next()} label="Use cases" title="Good for" compact>
          <ul className="bd-uses">
            {brand.useCases.map((u) => <li key={u} data-reveal>{u}</li>)}
          </ul>
        </Block>
      )}

      {clips.length > 0 && (
        <Block index={next()} label="Film" title={`${brand.name} in motion`} lede="Hover or tap any clip to play it." tint>
          <ul className="vgrid">
            {clips.map((c) => <li key={c.name} data-reveal><VideoCard clip={c} /></li>)}
          </ul>
        </Block>
      )}

      {shots.length > 0 && (
        <Block index={next()} label="Photographs" title={`${brand.name} at work`}>
          <ShotGrid shots={shots} />
        </Block>
      )}

      {brand.faq && (
        <Block index={next()} label="Questions" title="Questions we get asked" tint split>
          <dl className="bd-faq">
            {brand.faq.map(([q, a]) => (
              <div key={q} data-reveal><dt>{q}</dt><dd>{a}</dd></div>
            ))}
          </dl>
        </Block>
      )}

      <Block
        index={next()}
        label="The group"
        title="Works with"
        lede={`${brand.name} is one part of the group. The other two cover the rest of an event, and one brief can book all three.`}
      >
        <ul className="bd-siblings">
          {siblings.map((b) => (
            <li key={b.slug} className={`bd-sibling bd-sibling--${b.accent}`} data-reveal>
              <Link to={`/brands/${b.slug}`} className="bd-sibling__link">
                {b.image && (
                  <img src={b.image.src} srcSet={b.image.srcSet} sizes="120px" alt="" width={b.image.w} height={b.image.h} loading="lazy" decoding="async" />
                )}
                <span className="bd-sibling__text">
                  <span className="brand-card__kind">{b.kind}</span>
                  <span className="bd-sibling__name">{b.name}</span>
                  <span className="bd-sibling__line">{b.line}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Block>

      <Enquire brand={brand} instagram={instagram} />
    </main>
  );
}

/** One numbered, full-width section. */
function Block({ index, label, title, lede, tint = false, split = false, compact = false, children }) {
  const ref = useReveal();
  return (
    <section ref={ref} className={`ix-section bd-block${tint ? ' ix-section--tint' : ''}${compact ? ' bd-block--compact' : ''}`}>
      <div className={`ix-wrap${split ? ' bd-block__split' : ''}`}>
        <SectionHead index={index} label={label} title={title} lede={lede} />
        {children}
      </div>
    </section>
  );
}

function Enquire({ brand, instagram }) {
  const ref = useReveal();
  return (
    <section ref={ref} className="ix-section ix-section--dark bd-enquire">
      <div className="ix-wrap ix-cta" data-reveal>
        <div>
          <h2 className="ix-cta__title">Enquire about {brand.name}</h2>
          <p className="ix-cta__body">{home.cta.body}</p>
        </div>
        <div className="ix-cta__actions">
          <Link className="btn btn--light" to="/contact">Start an enquiry</Link>
          {instagram && (
            <a className="btn btn--outline-light" href={instagram.href} target="_blank" rel="noreferrer">
              <FaInstagram aria-hidden="true" focusable="false" />
              Follow {brand.name}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
