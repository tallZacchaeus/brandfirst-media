import { useParams, Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import { useFadeIn } from '../hooks/useGsap';
import { brands, services, site } from '../data/site';
import NotFound from './NotFound';
import '../styles/page.css';
import '../styles/section.css';
import './BrandDetail.css';

/** A single brand in the group. Portfolio slots stay empty until real project
 *  images are supplied — nothing is filled with social-export placeholders. */
export default function BrandDetail() {
  const { slug } = useParams();
  const brand = brands.find((b) => b.slug === slug);
  const blurb = useFadeIn();

  if (!brand) return <NotFound />;
  const named = brand.services.map((id) => services.find((s) => s.slug === id)).filter(Boolean);

  return (
    <main className={`page bd bd--${brand.accent}`}>
      <div className="page__inner">
        <PageHero eyebrow={brand.kind} title={brand.name} lede={brand.line} />

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

        <section className="bd__work">
          <h2 className="sec__title bd__h2">Selected work</h2>
          <p className="bd__pending">
            Project images for {brand.name} are being prepared from original
            production files.
          </p>
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
