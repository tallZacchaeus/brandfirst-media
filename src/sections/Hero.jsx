import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import HeroArt from './HeroArt';
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
 * The entrance is pure CSS (see Hero.css), running on load rather than on
 * scroll. An earlier GSAP scroll-triggered version held this content invisible
 * until a ScrollTrigger resolved, which pushed LCP to 6.0s; keeping it in the
 * stylesheet means the sequence starts with the first paint and is done in
 * about a second.
 */
export default function Hero() {
  const { hero } = home;

  return (
    <section className="hero">
      <div className="hero__noise" aria-hidden />
      <HeroArt />

      <div className="hero__inner">
        <div className="hero__row">
          <div className="hero__headline-col">
            <div className="hero__headline-wrap">
              {/* A space between the pills, so the heading reads "Print. Events.
                  Clothing." to search engines and screen readers rather than
                  one run-together word. The flex column never renders it. */}
              <h1 className="hero__headline">
                {hero.headlineLines.map((line, i) => (
                  <Fragment key={line}>
                    {i > 0 && ' '}
                    <span className="hero__line">{line}</span>
                  </Fragment>
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
