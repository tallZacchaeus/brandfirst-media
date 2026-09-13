import { Link } from 'react-router-dom';
import { useTextReveal, useFadeIn } from '../hooks/useGsap';
import { services } from '../data/site';
import '../styles/section.css';
import './Services.css';

/** Home "What We Do" — content document headline "How We Help", six service
 *  cards. Dark ground from Elementor section 4. */
export default function Services() {
  const heading = useTextReveal();
  return (
    <section className="sec services">
      <div className="sec__inner">
        <div className="services__lead">
          <h2 ref={heading} className="sec__title">What We Produce</h2>
        </div>
        <div className="services__grid">
          {services.map((s, i) => <ServiceCard key={s.slug} {...s} index={i} />)}
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
