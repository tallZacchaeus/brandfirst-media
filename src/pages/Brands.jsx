import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import BrandMedia from '../components/BrandMedia';
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
          lede="Three brands, one production floor. Each has its own trade; between them they carry a campaign from the first proof to the last light going out."
        />
        <ul className="brands__grid">
          {brands.map((b, i) => <BrandCard key={b.slug} {...b} index={i} />)}
        </ul>
      </div>
    </main>
  );
}

function BrandCard({ index, ...brand }) {
  const { slug, name, kind, line, blurb, services: svc, accent, image } = brand;
  const el = useFadeIn({ delay: index * 0.08 });
  const named = svc.map((id) => services.find((s) => s.slug === id)).filter(Boolean);
  return (
    <li ref={el} className={`brand-card brand-card--${accent}${image ? ' brand-card--has-image' : ''}`}>
      <BrandMedia brand={brand} className="brand-card__media" />
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
