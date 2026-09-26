import { Link } from 'react-router-dom';
import { useReveal } from '../hooks/useReveal';
import { HOME_BLOCK, HOME_REVEAL } from './homeMotion';
import { services } from '../data/site';
import '../styles/section.css';
import './Services.css';

const SERVICE_GROUPS = [
  { key: 'brandfirst', name: 'Brandfirst Media' },
  { key: 'room16', name: 'ROOM16' },
  { key: 'aso-igbalode', name: 'Aṣọ Ìgbàlódé' },
];

/** Home "What We Produce" — three services for each brand in the group.
 *
 *  Motion: by brand row, not by card. Each row rises as one piece when it
 *  reaches the screen, so a long list arrives in three calm steps instead of
 *  nine separate entrances. The cards' own hover lift is independent. */
export default function Services() {
  const heading = useReveal(HOME_BLOCK);
  const rows = useReveal({ ...HOME_REVEAL, selector: ':scope > .services__group', each: true });
  return (
    <section className="sec services">
      <div className="sec__inner">
        <div ref={heading} className="services__lead">
          <h2 className="sec__title">What We Produce</h2>
        </div>
        <div ref={rows} className="services__groups">
          {SERVICE_GROUPS.map((group) => {
            const grouped = services.filter((service) => service.brand === group.key);
            return (
              <section key={group.key} className={`services__group services__group--${group.key}`}>
                <div className="services__group-head">
                  <h3 className="services__brand">{group.name}</h3>
                  <span className="services__count">{grouped.length} services</span>
                </div>
                <div className="services__grid">
                  {grouped.map((service) => <ServiceCard key={service.slug} {...service} />)}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ n, slug, title, card }) {
  return (
    <article className="services__card">
      <span className="services__num">{n}</span>
      <h3 className="services__name">{title}</h3>
      <p className="services__text">{card}</p>
      <Link className="services__link" to={`/services#${slug}`}>
        Learn more<span className="sr-only"> about {title}</span>
      </Link>
    </article>
  );
}
