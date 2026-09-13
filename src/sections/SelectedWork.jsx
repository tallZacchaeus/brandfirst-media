import { Link } from 'react-router-dom';
import { useTextReveal, useFadeIn } from '../hooks/useGsap';
import { work } from '../data/site';
import './SelectedWork.css';

/** Home work preview. The content document supplies placeholder case-study
 *  titles only — real client work is pending approval — so these render as
 *  titled cards without invented metrics or imagery. */
export default function SelectedWork() {
  const title = useTextReveal();
  const note = useFadeIn();

  return (
    <section id="work" className="work">
      <div className="work__inner">
        <header className="work__head">
          <div className="work__title-col">
            <h2 ref={title} className="work__title">Selected Work</h2>
          </div>
          <div className="work__follow">
            <Link className="work__follow-item" to="/work"><span>View all</span><span className="work__follow-net">Work</span></Link>
          </div>
        </header>

        <ul className="work__grid work__grid--cases">
          {work.placeholders.slice(0, 4).map((p, i) => <CaseCard key={p.slug} {...p} index={i} />)}
        </ul>

        <div className="work__foot">
          <p ref={note} className="work__note">{work.hero.sub}</p>
          <Link className="btn btn--primary" to="/work">View all work</Link>
        </div>
      </div>
    </section>
  );
}

function CaseCard({ title, sector, index }) {
  const el = useFadeIn({ delay: index * 0.07 });
  return (
    <li ref={el} className="case">
      <span className="case__sector">{sector}</span>
      <h3 className="case__title">{title}</h3>
      <span className="case__soon">Case study in preparation</span>
    </li>
  );
}
