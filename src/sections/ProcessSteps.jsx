import { useReveal } from '../hooks/useReveal';
import { HOME_REVEAL } from './homeMotion';
import { home } from '../data/site';
import '../styles/section.css';
import './ProcessSteps.css';

/** Home "Why Brandfirst Media" — content document headline
 *  "Built Around Strategy, Reach, and Results" + five highlights.
 *
 *  Motion: two blocks — the heading with its copy, then the highlights as one
 *  list — rather than a separate entrance for each of the five points. */
export default function ProcessSteps() {
  const ref = useReveal({ ...HOME_REVEAL, stagger: 0.08 });
  const { why } = home;
  return (
    <section className="sec process">
      <div ref={ref} className="sec__inner">
        <div className="process__head" data-reveal>
          <h2 className="sec__title process__title">{why.headline}</h2>
          <p className="process__body">{why.body}</p>
        </div>
        <ul className="process__highlights" data-reveal>
          {why.highlights.map((h, i) => (
            <li key={h} className="process__highlight">
              <span className="process__hn">{String(i + 1).padStart(2, '0')}</span>
              <span className="process__ht">{h}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
