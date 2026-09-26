import { useRef, useState } from 'react';
import { FaEnvelope, FaInstagram, FaPhoneAlt, FaWhatsapp } from 'react-icons/fa';
import PageHero from '../components/PageHero';
import SectionHead from '../components/SectionHead';
import { useReveal } from '../hooks/useReveal';
import { brands, contact, pageHeroImages, site, services } from '../data/site';
import '../styles/page.css';
import '../styles/inner.css';
import './Contact.css';

const BUDGETS = ['Under ₦1M', '₦1M – ₦5M', '₦5M – ₦20M', 'Above ₦20M', 'Not yet defined'];

/** Formats the enquiry the same way for every channel, so a WhatsApp message
 *  and an email carry identical information. */
function composeMessage(d) {
  const svc = services.find((s) => s.slug === d.service);
  return [
    `New enquiry from ${d.name || 'the website'}`,
    d.company && `Company: ${d.company}`,
    d.email && `Email: ${d.email}`,
    d.phone && `Phone: ${d.phone}`,
    svc && `Service: ${svc.title}`,
    d.budget && `Budget: ${d.budget}`,
    '',
    d.message,
  ].filter(Boolean).join('\n');
}

/** Contact. The three direct channels — call, WhatsApp, email — sit in the
 *  hero, so the fastest routes need no scrolling; the enquiry form follows. */
export default function Contact() {
  const formRef = useRef(null);
  const section = useReveal();
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [error, setError] = useState('');

  const readForm = (el) => Object.fromEntries(new FormData(el).entries());

  const submit = async (e) => {
    e.preventDefault();
    const data = readForm(e.target);
    const body = composeMessage(data);

    // Preferred path once an endpoint exists.
    if (site.formEndpoint) {
      setStatus('sending'); setError('');
      try {
        const res = await fetch(site.formEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error(`Server responded ${res.status}`);
        setStatus('sent');
        e.target.reset();
      } catch (err) {
        setStatus('error');
        setError(err.message || 'Something went wrong.');
      }
      return;
    }

    // Fallback: hand the enquiry to the visitor's mail client, fully composed.
    // Never silently discards.
    const subject = `Website enquiry${data.name ? ` from ${data.name}` : ''}`;
    window.location.href =
      `mailto:${site.emails.join(',')}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus('sent');
  };

  // WhatsApp carries whatever has been typed into the form; with nothing
  // typed, it opens with the standard enquiry message instead.
  const sendWhatsApp = () => {
    const data = formRef.current ? readForm(formRef.current) : {};
    const text = data.message || data.name
      ? composeMessage(data)
      : site.whatsappMessage;
    window.open(`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
  };

  return (
    <main className="page ct">
      <PageHero
        trail={[{ label: 'Contact' }]}
        title={contact.hero.headline}
        lede={contact.hero.sub}
        image={pageHeroImages.contact}
        actions={
          <ul className="ct-channels" aria-label="Contact Brandfirst Media directly">
            <li>
              <a className="ct-channel" href={`tel:${site.phoneIntl}`}>
                <FaPhoneAlt aria-hidden="true" focusable="false" />
                <span className="ct-channel__text">
                  <span className="ct-channel__label">Call</span>
                  <span className="ct-channel__value">{site.phone}</span>
                </span>
              </a>
            </li>
            <li>
              <button type="button" className="ct-channel ct-channel--wa" onClick={sendWhatsApp}>
                <FaWhatsapp aria-hidden="true" focusable="false" />
                <span className="ct-channel__text">
                  <span className="ct-channel__label">WhatsApp</span>
                  <span className="ct-channel__value">{site.whatsappDisplay}</span>
                </span>
              </button>
            </li>
            {site.emails.map((email) => (
              <li key={email}>
                <a className="ct-channel" href={`mailto:${email}`}>
                  <FaEnvelope aria-hidden="true" focusable="false" />
                  <span className="ct-channel__text">
                    <span className="ct-channel__label">Email</span>
                    <span className="ct-channel__value email-link">{email}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        }
      />

      <section ref={section} className="ix-section ct-enquiry" aria-labelledby="ct-enquiry">
        <div className="ix-wrap">
          <SectionHead index="01" label="Enquiry" title="Send an enquiry" lede={contact.body} id="ct-enquiry" />

          <div className="ct-grid">
            <form ref={formRef} className="ct-form" onSubmit={submit} data-reveal>
              <div className="ct-form__row">
                <Field label="Name" name="name" autoComplete="name" required />
                <Field label="Company or organization" name="company" autoComplete="organization" />
              </div>
              <div className="ct-form__row">
                <Field label="Email address" name="email" type="email" autoComplete="email" required />
                <Field label="Phone number" name="phone" type="tel" autoComplete="tel" />
              </div>
              <div className="ct-form__row">
                <label className="ct-field">
                  <span className="ct-field__label">Service interest</span>
                  <select name="service" defaultValue="">
                    <option value="" disabled>Select a service</option>
                    {brands.map((b) => (
                      <optgroup key={b.slug} label={b.name}>
                        {b.services.map((slug) => {
                          const s = services.find((x) => x.slug === slug);
                          return s && <option key={s.slug} value={s.slug}>{s.title}</option>;
                        })}
                      </optgroup>
                    ))}
                  </select>
                </label>
                <label className="ct-field">
                  <span className="ct-field__label">Project budget range</span>
                  <select name="budget" defaultValue="">
                    <option value="" disabled>Select a range</option>
                    {BUDGETS.map((b) => <option key={b}>{b}</option>)}
                  </select>
                </label>
              </div>
              <label className="ct-field">
                <span className="ct-field__label">Message <span className="ct-field__req" aria-hidden="true">Required</span></span>
                <textarea name="message" rows={6} required />
              </label>

              <div className="ct-form__actions">
                <button className="btn btn--primary" type="submit" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Sending…' : 'Send enquiry'}
                </button>
                <button type="button" className="btn btn--ghost-dark" onClick={sendWhatsApp}>
                  <FaWhatsapp aria-hidden="true" focusable="false" />
                  Send on WhatsApp instead
                </button>
              </div>

              <p className="contact__status" role="status" aria-live="polite">
                {status === 'sent' && !site.formEndpoint &&
                  'Your email app should have opened with the enquiry ready to send. If it did not, use WhatsApp or email us directly.'}
                {status === 'sent' && site.formEndpoint &&
                  'Thank you. Your enquiry has been sent, and we will come back to you shortly.'}
                {status === 'error' && `That did not send: ${error} Please use WhatsApp or email us directly.`}
              </p>
            </form>

            <aside className="ct-aside" aria-label="Office, service area and social">
              <div className="ct-aside__block" data-reveal>
                <p className="ix-label">Office</p>
                <p className="ct-aside__value">{site.location}</p>
              </div>
              <div className="ct-aside__block" data-reveal>
                <p className="ix-label">Service area</p>
                <p className="ct-aside__value">{site.serviceArea}</p>
              </div>
              <div className="ct-aside__block" data-reveal>
                <p className="ix-label">Follow the group</p>
                <ul className="ct-social">
                  {brands.map((b) => {
                    const ig = b.social.find((s) => s.label.startsWith('Instagram'));
                    return ig && (
                      <li key={b.slug} className={`ct-social__item ct-social__item--${b.accent}`}>
                        <a href={ig.href} target="_blank" rel="noreferrer">
                          <FaInstagram aria-hidden="true" focusable="false" />
                          <span>{b.name}</span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}

function Field({ label, name, type = 'text', required = false, autoComplete }) {
  return (
    <label className="ct-field">
      <span className="ct-field__label">
        {label}
        {required && <span className="ct-field__req" aria-hidden="true">Required</span>}
      </span>
      <input type={type} name={name} required={required} autoComplete={autoComplete} />
    </label>
  );
}
