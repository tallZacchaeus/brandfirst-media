import { Link } from 'react-router-dom';
import HeroVideo from '../components/HeroVideo';
import { home } from '../data/site';
import './Hero.css';

/**
 * Home hero. Layout from Elementor section 1 (#9322).
 *
 * Deliberately unanimated. Every element here is above the fold, and entry
 * animations start content at opacity 0 — which meant the hero lede was the
 * Largest Contentful Paint element at 6.0s, because LCP only counts an element
 * once it is actually visible. Reveals now begin below the fold; the first
 * screen paints immediately.
 */
export default function Hero() {
  const { hero } = home;

  return (
    <section className="hero">
      <div className="hero__noise" aria-hidden />
      <div className="hero__inner">
        <div className="hero__row">
          <div className="hero__headline-col">
            <div className="hero__headline-wrap">
              <h1 className="hero__headline">
                {hero.headlineLines.map((line) => (
                  <span key={line} className="hero__line">{line}{' '}</span>
                ))}
              </h1>
            </div>
          </div>
          <div className="hero__video-col">
            <div className="hero__video"><HeroVideo /></div>
          </div>
        </div>

        <div className="hero__row hero__row--foot">
          <div className="hero__label-col">
            <p className="hero__eyebrow">{hero.support}</p>
          </div>
          <div className="hero__lede-col">
            <p className="hero__lede">{hero.sub}</p>
            <div className="hero__actions">
              <Link className="btn btn--primary" to={hero.primary.href}>{hero.primary.label}</Link>
              <Link className="btn btn--ghost" to={hero.secondary.href}>{hero.secondary.label}</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
