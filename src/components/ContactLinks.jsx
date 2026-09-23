import { FaEnvelope, FaPhoneAlt, FaWhatsapp } from 'react-icons/fa';
import EmailLink from './EmailLink';
import { site } from '../data/site';
import './ContactLinks.css';

/** The contact block both footers show: call, WhatsApp, then email.
 *
 *  One component rather than a copy in each footer: the copies had already
 *  drifted once (one stacked, the other wrapped inline in a narrow paragraph).
 *  Returns a fragment so each footer keeps its own container and spacing.
 *
 *  Icons replace the "Call:" / "WhatsApp:" labels on screen; the email gets an
 *  envelope so all three lines start their text at the same point. The icons
 *  are decorative to assistive tech, so the phone and WhatsApp links carry
 *  aria-labels that keep the meaning the visible labels used to give; the
 *  email needs none, since its text already says what it is. */
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
      {site.emails.map((e) => (
        <EmailLink
          key={e}
          email={e}
          className="contact-link"
          icon={<FaEnvelope aria-hidden="true" focusable="false" />}
        />
      ))}
    </>
  );
}
