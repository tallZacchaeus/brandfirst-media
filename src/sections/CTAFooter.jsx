import { Link } from 'react-router-dom';
import { useReveal } from '../hooks/useReveal';
import { HOME_BLOCK } from './homeMotion';
import { home } from '../data/site';
import '../styles/section.css';
import './CTAFooter.css';

/** Home closing CTA — content document "Ready to Put Your Brand First?"
 *
 *  Motion: one clean entrance — heading, copy and button rise together. */
export default function CTAFooter() {
  const col = useReveal(HOME_BLOCK);
  const { cta } = home;
  return (
    <section className="sec cta">
      <div className="sec__inner">
        <div ref={col} className="cta__col">
          <h2 className="cta__line">{cta.headline}</h2>
          <p className="cta__body">{cta.body}</p>
          <Link className="btn btn--primary" to={cta.button.href}>{cta.button.label}</Link>
        </div>
      </div>
    </section>
  );
}
