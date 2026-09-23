import { Link } from 'react-router-dom';
import ContactLinks from '../components/ContactLinks';
import { site, services, nav } from '../data/site';
import BrandSocialLinks from '../components/BrandSocialLinks';
import './Footer.css';

/** Footer. Layout from Elementor template #1354 (#121212, boxed 1760,
 *  radius 80 top); content from the Brandfirst Media content document.
 *  Phone and email are omitted deliberately — that document leaves them as
 *  "[Add phone number]" / "[Add email address]". */
export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__top">
          <div className="footer__brand">
            <Link className="footer__logo" to="/" aria-label={`${site.name} home`}>
              <img className="footer__mark" src="/assets/brandfirst-logo-sm.png" alt="" width="300" height="400" />
              <span className="footer__wordmark">{site.name}</span>
            </Link>
            <p className="footer__blurb">
              {site.name} is a production group in Lagos. We print it, dress your
              team in it, and light the stage it happens on. One brief, one crew,
              one standard.
            </p>
            <div className="footer__contact">
              <ContactLinks />
            </div>
          </div>

          <div className="footer__cols">
            <div>
              <h3 className="footer__col-title">Services</h3>
              <ul className="footer__list">
                {services.map((s) => (
                  <li key={s.slug}><Link to={`/services#${s.slug}`}>{s.title}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="footer__col-title">Company</h3>
              <ul className="footer__list">
                {nav.filter((n) => n.href !== '/').map((n) => (
                  <li key={n.href}><Link to={n.href}>{n.label}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="footer__col-title">Office</h3>
              <p className="footer__addr">{site.location}</p>
              <h3 className="footer__col-title" style={{ marginTop: '32px' }}>Follow</h3>
              <BrandSocialLinks />
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copy">
            © {new Date().getFullYear()} <strong>{site.name}</strong> · {site.tagline}
          </p>
        </div>
      </div>
    </footer>
  );
}
