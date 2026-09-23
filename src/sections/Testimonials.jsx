import { useReveal } from '../hooks/useReveal';
import { HOME_BLOCK } from './homeMotion';
import { home } from '../data/site';
import '../styles/section.css';
import './Testimonials.css';

/** Home "Industries" — content document "Supporting Brands Across Sectors".
 *  Replaces the demo's testimonials block, which had no Brandfirst equivalent
 *  (no client quotes supplied).
 *
 *  Motion: the heading block only; the sector list is simply there. */
export default function Testimonials() {
  const head = useReveal(HOME_BLOCK);
  const { industries } = home;
  return (
    <section className="sec industries">
      <div className="sec__inner">
        <div ref={head} className="sec__head industries__head">
          <h2 className="sec__title industries__title">{industries.headline}</h2>
          <p className="industries__body">{industries.body}</p>
        </div>
        <ul className="industries__list">
          {industries.sectors.map((s) => (
            <li key={s} className="industries__item">{s}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
