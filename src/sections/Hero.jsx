import { Link } from 'react-router-dom';
import { home } from '../data/site';
import './Hero.css';

/**
 * Home hero. Layout follows Elementor section 1 of page #9322:
 *
 *   row 1   headline, full width
 *   row 2   supporting statement + actions
 *   gap     165px between rows, 195/250 padding on the section
 *
 * The template runs a short label in a left column against a 70px statement on
 * the right. Both are gone: the label earned nothing on the first screen, and
 * without it the 36% indent was arbitrary, so the statement and buttons align
 * left under the headline.
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
                  <span key={line} className="hero__line">{line}</span>
                ))}
              </h1>
            </div>
          </div>
        </div>

        <div className="hero__row hero__row--foot">
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
