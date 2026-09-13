import { Link } from 'react-router-dom';
import { useTextReveal, useFadeIn } from '../hooks/useGsap';
import { insights } from '../data/site';
import '../styles/section.css';
import './Journal.css';

/** Home "Insights" preview. The content document supplies suggested article
 *  topics, not written articles, so these are titled prompts rather than
 *  fabricated posts with dates and authors. */
export default function Journal({ limit = 3 }) {
  const heading = useTextReveal();
  return (
    <section className="sec journal">
      <div className="sec__inner">
        <div className="sec__head">
          <h2 ref={heading} className="sec__title journal__title">Insights</h2>
          <Link className="btn btn--primary" to="/insights">Read all insights</Link>
        </div>
        <ul className="topic-grid">
          {insights.topics.slice(0, limit).map((t, i) => <Topic key={t} text={t} index={i} />)}
        </ul>
      </div>
    </section>
  );
}

function Topic({ text, index }) {
  const el = useFadeIn({ delay: index * 0.07 });
  return (
    <li ref={el} className="topic">
      <span className="topic__n">{String(index + 1).padStart(2, '0')}</span>
      <h3 className="topic__title">{text}</h3>
      <span className="topic__soon">Article in preparation</span>
    </li>
  );
}
