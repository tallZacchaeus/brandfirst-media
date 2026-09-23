import { useReveal } from '../hooks/useReveal';
import { HOME_REVEAL } from './homeMotion';
import { home } from '../data/site';
import '../styles/section.css';
import './StatsIntro.css';

/** Home "Intro" section — content document: "Strategic Media Solutions for
 *  Brands That Want to Grow". Uses Elementor section 3's layout.
 *
 *  Motion: the heading rises as one block, the copy follows 80 ms later. */
export default function StatsIntro() {
  const ref = useReveal({ ...HOME_REVEAL, stagger: 0.08 });
  const { intro } = home;
  return (
    <section className="sec stats">
      <div ref={ref} className="sec__inner">
        <div className="stats__lead" data-reveal>
          <h2 className="stats__copy">
            <span className="stats__lead-phrase">{intro.headlineLead}</span>{' '}
            <span className="stats__rest">{intro.headlineRest}</span>
          </h2>
        </div>
        <div className="stats__body" data-reveal>
          {intro.body.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
        </div>
      </div>
    </section>
  );
}
