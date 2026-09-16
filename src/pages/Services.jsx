import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import { useFadeIn } from '../hooks/useGsap';
import { services } from '../data/site';
import '../styles/page.css';
import '../styles/section.css';
import './Services.css';

/** Services page — six services from the content document, each with its body
 *  and "what this includes" list. */
export default function Services() {
  return (
    <main className="page">
      <div className="page__inner">
        <PageHero
          title="Everything We Produce"
          lede="Six things we do, delivered by the three brands in the group. Brief one of us and you get all three."
        />
        <div className="sv__stack">
          {services.map((s, i) => <ServiceBlock key={s.slug} {...s} index={i} />)}
        </div>

        <section className="sv__cta">
          <h2 className="sec__title">Need a Quote?</h2>
          <p className="page__lede">
            Send the artwork, the quantity and the date. We quote on real specs,
            not estimates.
          </p>
          <Link className="btn btn--primary" to="/contact">Request a Quote</Link>
        </section>
      </div>
    </main>
  );
}

function ServiceBlock({ n, slug, title, body, includes, image, index }) {
  const el = useFadeIn({ delay: index * 0.04 });
  return (
    <section ref={el} id={slug} className="sv__block">
      <div className="sv__block-head">
        <span className="sv__block-n">{n}</span>
        <h2 className="sv__block-title">{title}</h2>
      </div>
      <div className="sv__block-body">
        <div className="sv__block-copy">
          <p>{body}</p>
        </div>
        <div>
          <h3 className="sv__includes-label">What this includes</h3>
          <ul className="sv__includes">
            {includes.map((i) => <li key={i}>{i}</li>)}
          </ul>
        </div>
      </div>
      {image && (
        <figure className="sv__shot">
          <img
            src={image.src}
            srcSet={image.srcSet}
            sizes="(max-width: 1024px) 100vw, 40vw"
            alt={image.alt}
            width={image.w}
            height={image.h}
            loading="lazy"
            decoding="async"
          />
        </figure>
      )}
    </section>
  );
}
