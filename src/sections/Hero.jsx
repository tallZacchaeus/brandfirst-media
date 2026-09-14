import { Link } from 'react-router-dom';
import { home } from '../data/site';
import './Hero.css';

/**
 * Home hero. Layout follows Elementor section 1 of page #9322:
 *
 *   row 1   headline, boxed to 1160px inside a 75% column
 *   row 2   short label (36.15%)  |  large statement + action (930px)
 *   gap     165px between rows, 195/250 padding on the section
 *
 * The asymmetry in row 2 is the template's own device: a two- or three-word
 * label on the left against a 70px statement on the right. An earlier version
 * put a full paragraph in the label slot, which made the row read as two
 * competing blocks instead of a caption and a statement.
 *
 * Deliberately unanimated — everything here is above the fold, and entry
 * animations previously made the lede the Largest Contentful Paint element at
 * 6.0s. The first screen now paints immediately.
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
        </div>

        <div className="hero__row hero__row--foot">
          <div className="hero__label-col">
            <p className="hero__eyebrow">{hero.label}</p>
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
