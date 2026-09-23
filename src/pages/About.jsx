import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import SectionHead from '../components/SectionHead';
import { useReveal } from '../hooks/useReveal';
import { about, brands, home, pageHeroImages } from '../data/site';
import { pad, servicesFor } from '../data/group';
import '../styles/page.css';
import '../styles/inner.css';
import './About.css';

/** About: who the group is, how it thinks, how it works, what it holds to.
 *  01 The group — the three brands and what each owns
 *  02 Philosophy — with mission and vision
 *  03 How we work — the operating standard (the home page's proof points)
 *  04 Values */
export default function About() {
  const group = useReveal();
  const philosophy = useReveal();
  const standard = useReveal();
  const values = useReveal();

  return (
    <main className="page ab">
      <PageHero
        trail={[{ label: 'About' }]}
        title={about.hero.headline}
        lede={about.hero.sub}
        image={pageHeroImages.about}
      />

      <section ref={group} className="ix-section ab-group" aria-labelledby="ab-group">
        <div className="ix-wrap">
          <SectionHead index="01" label="The group" title={home.group.headline} id="ab-group" />
          <div className="ab-group__intro" data-reveal>
            {about.overview.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
          </div>

          <ol className="ab-group__brands">
            {brands.map((b) => (
              <li key={b.slug} className={`ab-brand ab-brand--${b.accent}`} data-reveal>
                <p className="ix-label ab-brand__kind">{b.kind}</p>
                <h3 className="ab-brand__name">{b.name}</h3>
                <p className="ab-brand__line">{b.line}</p>
                <ul className="ab-brand__services" aria-label={`${b.name} services`}>
                  {servicesFor(b).map((s) => (
                    <li key={s.slug}>
                      <span className="ix-index">{s.n}</span>
                      <Link to={`/services#${s.slug}`}>{s.title}</Link>
                    </li>
                  ))}
                </ul>
                <Link className="ix-link" to={`/brands/${b.slug}`}>Explore {b.name}</Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section ref={philosophy} className="ix-section ix-section--tint ab-philosophy" aria-labelledby="ab-philosophy">
        <div className="ix-wrap">
          <SectionHead index="02" label="Philosophy" title={about.philosophy.headline} id="ab-philosophy" />
          <div className="ab-philosophy__grid">
            <div className="ab-philosophy__body" data-reveal>
              {about.philosophy.body.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
            </div>
            <dl className="ab-mv">
              <div data-reveal>
                <dt className="ix-label">Mission</dt>
                <dd>{about.mission}</dd>
              </div>
              <div data-reveal>
                <dt className="ix-label">Vision</dt>
                <dd>{about.vision}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section ref={standard} className="ix-section ab-standard" aria-labelledby="ab-standard">
        <div className="ix-wrap">
          <SectionHead index="03" label="How we work" title={home.why.headline} lede={home.why.body} id="ab-standard" split />
          <ol className="ab-standard__list">
            {home.why.highlights.map((h, i) => (
              <li key={h} data-reveal>
                <span className="ix-index">{pad(i + 1)}</span>
                <p>{h}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section ref={values} className="ix-section ix-section--dark ab-values" aria-labelledby="ab-values">
        <div className="ix-wrap">
          <SectionHead index="04" label="Principles" title="Values" id="ab-values" />
          <ul className="ab-values__list">
            {about.values.map((v) => (
              <li key={v.title} data-reveal>
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
