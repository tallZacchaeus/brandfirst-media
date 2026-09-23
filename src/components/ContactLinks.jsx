import { FaPhoneAlt, FaWhatsapp } from 'react-icons/fa';
import EmailLink from './EmailLink';
import { site } from '../data/site';
import './ContactLinks.css';

/** The contact block both footers show: call, WhatsApp, then email.
 *
 *  One component rather than a copy in each footer: the copies had already
 *  drifted once (one stacked, the other wrapped inline in a narrow paragraph).
 *  Returns a fragment so each footer keeps its own container and spacing.
 *
 *  Icons replace the "Call:" / "WhatsApp:" labels on screen. They are
 *  decorative to assistive tech, so each link carries an aria-label that keeps
 *  the meaning the visible label used to give. */
export default function ContactLinks() {
  const whatsappHref = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(site.whatsappMessage)}`;
  return (
    <>
      <a className="contact-link" href={`tel:${site.phoneIntl}`} aria-label={`Call ${site.phone}`}>
        <FaPhoneAlt aria-hidden="true" focusable="false" />
        <span>{site.phone}</span>
      </a>
      <a
        className="contact-link"
        href={whatsappHref}
        target="_blank"
        rel="noreferrer"
        aria-label={`WhatsApp ${site.whatsappDisplay}`}
      >
        <FaWhatsapp aria-hidden="true" focusable="false" />
        <span>{site.whatsappDisplay}</span>
      </a>
      {site.emails.map((e) => <EmailLink key={e} email={e} />)}
    </>
  );
}
