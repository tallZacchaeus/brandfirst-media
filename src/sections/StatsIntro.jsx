import { useTextReveal, useFadeIn } from '../hooks/useGsap';
import { home } from '../data/site';
import '../styles/section.css';
import './StatsIntro.css';

/** Home "Intro" section — content document: "Strategic Media Solutions for
 *  Brands That Want to Grow". Uses Elementor section 3's layout. */
export default function StatsIntro() {
  const title = useTextReveal({ by: 'words' });
  const body = useFadeIn();
  const { intro } = home;
  return (
    <section className="sec stats">
      <div className="sec__inner">
        <div className="stats__lead">
          <h2 ref={title} className="stats__copy">
            <span className="stats__lead-phrase">{intro.headlineLead}</span>{' '}
            <span className="stats__rest">{intro.headlineRest}</span>
          </h2>
        </div>
        <div ref={body} className="stats__body">
          {intro.body.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
        </div>
      </div>
    </section>
  );
}
