import { Link } from 'react-router-dom';
import BrandMedia from '../components/BrandMedia';
import { useTextReveal, useFadeIn } from '../hooks/useGsap';
import { brands, home } from '../data/site';
import '../styles/section.css';
import './BrandsStrip.css';

/** Home "The group" — the hero promises print, clothing and events, and this is
 *  the section that shows those are three named brands under one roof. Sits
 *  straight after the intro so the claim is backed before the services list. */
export default function BrandsStrip() {
  const heading = useTextReveal();
  const lede = useFadeIn();
  const { group } = home;
  return (
    <section className="sec bstrip">
      <div className="sec__inner">
        <div className="sec__head bstrip__head">
          <h2 ref={heading} className="sec__title">{group.headline}</h2>
          {group.body && <p ref={lede} className="bstrip__lede">{group.body}</p>}
        </div>
        <ul className="bstrip__grid">
          {brands.map((b, i) => <BrandItem key={b.slug} brand={b} index={i} />)}
        </ul>
      </div>
    </section>
  );
}

function BrandItem({ brand, index }) {
  const el = useFadeIn({ delay: index * 0.08 });
  const { slug, name, kind, line, services: svc } = brand;
  return (
    <li ref={el} className={`bstrip__item bstrip__item--${brand.accent}`}>
      <Link className="bstrip__link" to={`/brands/${slug}`}>
        <BrandMedia brand={brand} className="bstrip__media" />
        <div className="bstrip__body">
          <span className="bstrip__kind">{kind}</span>
          <h3 className="bstrip__name">{name}</h3>
          <p className="bstrip__line">{line}</p>
          <span className="bstrip__count">
            {svc.length} {svc.length === 1 ? 'service' : 'services'}
          </span>
        </div>
      </Link>
    </li>
  );
}
