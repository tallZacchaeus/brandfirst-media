import { Link } from 'react-router-dom';
import { useTextReveal, useFadeIn } from '../hooks/useGsap';
import { services } from '../data/site';
import '../styles/section.css';
import './Services.css';

const SERVICE_GROUPS = [
  { key: 'brandfirst', name: 'Brandfirst Media' },
  { key: 'room16', name: 'ROOM16' },
  { key: 'aso-igbalode', name: 'Aṣọ Ìgbàlódé' },
];

/** Home "What We Produce" — three services for each brand in the group. */
export default function Services() {
  const heading = useTextReveal();
  return (
    <section className="sec services">
      <div className="sec__inner">
        <div className="services__lead">
          <h2 ref={heading} className="sec__title">What We Produce</h2>
        </div>
        <div className="services__groups">
          {SERVICE_GROUPS.map((group) => {
            const grouped = services.filter((service) => service.brand === group.key);
            return (
              <section key={group.key} className={`services__group services__group--${group.key}`}>
                <div className="services__group-head">
                  <h3 className="services__brand">{group.name}</h3>
                  <span className="services__count">{grouped.length} services</span>
                </div>
                <div className="services__grid">
                  {grouped.map((service, index) => (
                    <ServiceCard key={service.slug} {...service} index={index} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ n, slug, title, card, index }) {
  const el = useFadeIn({ delay: index * 0.06 });
  return (
    <article ref={el} className="services__card">
      <span className="services__num">{n}</span>
      <h3 className="services__name">{title}</h3>
      <p className="services__text">{card}</p>
      <Link className="services__link" to={`/services#${slug}`}>Learn more</Link>
    </article>
  );
}
