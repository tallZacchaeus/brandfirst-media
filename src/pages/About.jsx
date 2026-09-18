import PageHero from '../components/PageHero';
import { useFadeIn, useTextReveal } from '../hooks/useGsap';
import { about } from '../data/site';
import '../styles/page.css';
import '../styles/section.css';
import './About.css';

/** About page — copy from the Brandfirst Media content document:
 *  overview, philosophy, mission, vision, five values. */
export default function About() {
  const philosophy = useTextReveal();
  const overview = useFadeIn();
  const mv = useFadeIn();

  return (
    <main className="page">
      <div className="page__inner">
        <PageHero title={about.hero.headline} lede={about.hero.sub} />

        <section ref={overview} className="ab__overview">
          {about.overview.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
        </section>

        <section className="ab__philosophy">
          <h2 ref={philosophy} className="sec__title">{about.philosophy.headline}</h2>
          <div className="ab__philosophy-body">
            {about.philosophy.body.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
          </div>
        </section>

        <section ref={mv} className="ab__mv">
          <div className="ab__mv-item">
            <h3>Mission</h3>
            <p>{about.mission}</p>
          </div>
          <div className="ab__mv-item">
            <h3>Vision</h3>
            <p>{about.vision}</p>
          </div>
        </section>
      </div>

      <section className="ab__values">
        <div className="page__inner">
          <h2 className="sec__title ab__values-title">Values</h2>
          <ul className="ab__values-grid">
            {about.values.map((v) => (
              <li key={v.title} className="ab__value">
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
