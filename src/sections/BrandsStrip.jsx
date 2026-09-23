import { Link } from 'react-router-dom';
import BrandMedia from '../components/BrandMedia';
import { useReveal } from '../hooks/useReveal';
import { HOME_BLOCK, HOME_REVEAL } from './homeMotion';
import { brands, home } from '../data/site';
import '../styles/section.css';
import './BrandsStrip.css';

/** Home "The group" — the hero promises print, clothing and events, and this is
 *  the section that shows those are three named brands under one roof. Sits
 *  straight after the intro so the claim is backed before the services list.
 *
 *  Motion: the heading and lede arrive as one block; the three cards follow as
 *  a group, 60 ms apart. On phones, where the cards stack into a column
 *  taller than the screen, the grid fades as one block instead. The cards'
 *  hover lift is on the inner link, so it never fights the entrance. */
export default function BrandsStrip() {
  const head = useReveal(HOME_BLOCK);
  const grid = useReveal({ ...HOME_REVEAL, selector: ':scope > li', phoneBlock: true });
  const { group } = home;
  return (
    <section className="sec bstrip">
      <div className="sec__inner">
        <div ref={head} className="sec__head bstrip__head">
          <h2 className="sec__title">{group.headline}</h2>
          {group.body && <p className="bstrip__lede">{group.body}</p>}
        </div>
        <ul ref={grid} className="bstrip__grid">
          {brands.map((b) => <BrandItem key={b.slug} brand={b} />)}
        </ul>
      </div>
    </section>
  );
}

function BrandItem({ brand }) {
  const { slug, name, kind, line, services: svc } = brand;
  return (
    <li className={`bstrip__item bstrip__item--${brand.accent}`}>
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
