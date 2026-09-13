import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import { useFadeIn } from '../hooks/useGsap';
import { work } from '../data/site';
import '../styles/page.css';
import '../styles/section.css';
import '../sections/SelectedWork.css';
import './Work.css';

/**
 * Work page. The content document supplies a case-study format and five
 * placeholder titles, explicitly "to be replaced with approved client work".
 * Nothing is invented here — the format is shown so real cases drop straight in.
 */
const FORMAT = ['Client', 'Sector', 'Challenge', 'Solution', 'Channels', 'Results'];

export default function Work() {
  const note = useFadeIn();
  return (
    <main className="page">
      <div className="page__inner">
        <PageHero title={work.hero.headline} lede={work.hero.sub} />

        <ul className="work__grid work__grid--cases">
          {work.placeholders.map((p, i) => <CaseCard key={p.slug} {...p} index={i} />)}
        </ul>

        <section ref={note} className="wk__format">
          <h2 className="wk__format-title">Case study format</h2>
          <p className="wk__format-note">
            Each featured project will follow this structure once client details
            are approved.
          </p>
          <ul className="wk__format-list">
            {FORMAT.map((f) => <li key={f}>{f}</li>)}
          </ul>
        </section>

        <section className="wk__cta">
          <h2 className="sec__title">{work.cta.headline}</h2>
          <p className="page__lede">{work.cta.body}</p>
          <Link className="btn btn--primary" to={work.cta.button.href}>{work.cta.button.label}</Link>
        </section>
      </div>
    </main>
  );
}

function CaseCard({ title, sector, index }) {
  const el = useFadeIn({ delay: index * 0.06 });
  return (
    <li ref={el} className="case">
      <span className="case__sector">{sector}</span>
      <h3 className="case__title">{title}</h3>
      <span className="case__soon">Case study in preparation</span>
    </li>
  );
}
