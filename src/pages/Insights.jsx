import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import { useFadeIn } from '../hooks/useGsap';
import { insights } from '../data/site';
import '../styles/page.css';
import '../styles/section.css';
import '../sections/Journal.css';
import './Insights.css';

/**
 * Insights page — the content document's "Insights" section. It supplies an
 * intro and eight suggested article topics, not written articles, so these
 * render as planned subjects rather than fabricated posts.
 */
export default function Insights() {
  const intro = useFadeIn();
  return (
    <main className="page">
      <div className="page__inner">
        <PageHero title={insights.hero.headline} lede={insights.hero.sub} />

        <p ref={intro} className="in__intro">{insights.intro}</p>

        <ul className="topic-grid in__grid">
          {insights.topics.map((t, i) => <Topic key={t} text={t} index={i} />)}
        </ul>

        <section className="in__cta">
          <h2 className="sec__title">Have a Campaign in Mind?</h2>
          <Link className="btn btn--primary" to="/contact">Start a Project</Link>
        </section>
      </div>
    </main>
  );
}

function Topic({ text, index }) {
  const el = useFadeIn({ delay: index * 0.05 });
  return (
    <li ref={el} className="topic">
      <span className="topic__n">{String(index + 1).padStart(2, '0')}</span>
      <h3 className="topic__title">{text}</h3>
      <span className="topic__soon">Article in preparation</span>
    </li>
  );
}
