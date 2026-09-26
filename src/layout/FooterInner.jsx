import { Link } from 'react-router-dom';
import ContactLinks from '../components/ContactLinks';
import { useTextReveal, useFadeIn } from '../hooks/useGsap';
import { site, home } from '../data/site';
import BrandSocialLinks from '../components/BrandSocialLinks';
import './FooterInner.css';

/** Inner-page footer. Layout from Elementor template #558 (#171717, boxed 1290,
 *  CTA-led); content from the Brandfirst Media content document.
 *  Phone and email omitted — that document leaves them as placeholders. */
export default function FooterInner() {
  const title = useTextReveal({ by: 'words' });
  const lede = useFadeIn();

  return (
    <footer className="footer-inner">
      <div className="footer-inner__inner">
        <div className="footer-inner__cta">
          <h2 ref={title} className="footer-inner__title">{home.cta.headline}</h2>
          <p ref={lede} className="footer-inner__lede">{home.cta.body}</p>
          <Link className="btn btn--primary footer-inner__btn" to={home.cta.button.href}>
            {home.cta.button.label}
          </Link>
        </div>

        <div className="footer-inner__row">
          <div className="footer-inner__addresses">
            <div className="footer-inner__addr">
              <h3 className="footer-inner__city">Office</h3>
              <p className="footer-inner__lines">{site.location}</p>
            </div>
            <div className="footer-inner__addr">
              <h3 className="footer-inner__city">Follow</h3>
              <BrandSocialLinks />
            </div>
          </div>

          <div className="footer-inner__signup">
            <span className="footer-inner__label">Talk to us</span>
            <p className="footer-inner__lines footer-inner__contact">
              <ContactLinks />
            </p>
          </div>
        </div>

        {/* The year is prerendered at build time; after New Year the browser's

            differs until the next deploy, which is allowed rather than an error. */}

        <div className="footer-inner__bottom">
          © <span suppressHydrationWarning>{new Date().getFullYear()}</span> <strong>{site.name}</strong> · {site.tagline}
        </div>
      </div>
    </footer>
  );
}
