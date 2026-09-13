import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import { useFadeIn } from '../hooks/useGsap';
import { brands, services } from '../data/site';
import '../styles/page.css';
import '../styles/section.css';
import './Brands.css';

/** The group. Brandfirst Media is the parent; ROOM16 and Aṣọ Ìgbàlódé are
 *  in-house brands — labelled as such rather than presented as client work. */
export default function Brands() {
  return (
    <main className="page">
      <div className="page__inner">
        <PageHero
          title="One group, three brands"
          lede="Brandfirst Media covers print and publicity. ROOM16 handles lighting and stage. Aṣọ Ìgbàlódé produces branded apparel. Together they cover an event end to end."
        />
        <ul className="brands__grid">
          {brands.map((b, i) => <BrandCard key={b.slug} {...b} index={i} />)}
        </ul>
      </div>
    </main>
  );
}

function BrandCard({ slug, name, kind, line, blurb, services: svc, accent, index }) {
  const el = useFadeIn({ delay: index * 0.08 });
  const named = svc.map((id) => services.find((s) => s.slug === id)).filter(Boolean);
  return (
    <li ref={el} className={`brand-card brand-card--${accent}`} data-cursor="View">
      <div className="brand-card__head">
        <span className="brand-card__kind">{kind}</span>
        <h2 className="brand-card__name">{name}</h2>
        <p className="brand-card__line">{line}</p>
      </div>
      <p className="brand-card__blurb">{blurb}</p>
      <ul className="brand-card__services">
        {named.map((s) => (
          <li key={s.slug}><Link to={`/services#${s.slug}`}>{s.title}</Link></li>
        ))}
      </ul>
      <Link className="brand-card__more" to={`/brands/${slug}`}>About {name}</Link>
    </li>
  );
}
