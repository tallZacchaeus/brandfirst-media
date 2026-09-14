import { useState } from 'react';
import PageHero from '../components/PageHero';
import { useFadeIn } from '../hooks/useGsap';
import { contact, site, services } from '../data/site';
import '../styles/page.css';
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

export default function Contact() {
  const form = useFadeIn();
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
      `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus('sent');
  };

  const sendWhatsApp = () => {
    const el = document.querySelector('.contact__form');
    const data = el ? readForm(el) : {};
    const text = data.message || data.name
      ? composeMessage(data)
      : `Hello ${site.name}, I would like to enquire about a project.`;
    window.open(`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
  };

  return (
    <main className="page">
      <div className="page__inner">
        <PageHero title={contact.hero.headline} lede={contact.hero.sub} />

        <div className="contact">
          <aside className="contact__aside">
            <h2 className="contact__label">Talk to us now</h2>
            <button type="button" className="btn btn--whatsapp" onClick={sendWhatsApp}>
              Message on WhatsApp
            </button>

            <h2 className="contact__label contact__label--gap">Direct</h2>
            <a className="contact__line" href={`tel:${site.phoneIntl}`}>{site.phone}</a>
            <a className="contact__line" href={`mailto:${site.email}`}>{site.email}</a>

            <h2 className="contact__label contact__label--gap">Office</h2>
            <p className="contact__addr">{site.location}</p>

            <h2 className="contact__label contact__label--gap">Social</h2>
            {site.social.map((s) => (
              <a key={s.label} className="contact__line" href={s.href} target="_blank" rel="noreferrer">{s.label}</a>
            ))}
          </aside>

          <form ref={form} className="contact__form" onSubmit={submit}>
            <p className="contact__intro">{contact.body}</p>

            <div className="contact__row">
              <Field label="Name" name="name" required />
              <Field label="Company or organization" name="company" />
            </div>
            <div className="contact__row">
              <Field label="Email address" name="email" type="email" required />
              <Field label="Phone number" name="phone" type="tel" />
            </div>
            <div className="contact__row">
              <label className="contact__field">
                <span>Service interest</span>
                <select name="service" defaultValue="">
                  <option value="" disabled>Select a service</option>
                  {services.map((s) => <option key={s.slug} value={s.slug}>{s.title}</option>)}
                </select>
              </label>
              <label className="contact__field">
                <span>Project budget range</span>
                <select name="budget" defaultValue="">
                  <option value="" disabled>Select a range</option>
                  {BUDGETS.map((b) => <option key={b}>{b}</option>)}
                </select>
              </label>
            </div>
            <label className="contact__field">
              <span>Message</span>
              <textarea name="message" rows={5} required />
            </label>

            <div className="contact__actions">
              <button className="btn btn--primary" type="submit" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending…' : 'Send enquiry'}
              </button>
              <button type="button" className="btn btn--ghost-dark" onClick={sendWhatsApp}>
                Send on WhatsApp instead
              </button>
            </div>

            <p className="contact__status" role="status" aria-live="polite">
              {status === 'sent' && !site.formEndpoint &&
                'Your email app should have opened with the enquiry ready to send. If it did not, use WhatsApp or email us directly.'}
              {status === 'sent' && site.formEndpoint &&
                'Thank you — your enquiry has been sent. We will come back to you shortly.'}
              {status === 'error' && `That did not send: ${error} Please use WhatsApp or email us directly.`}
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}

function Field({ label, name, type = 'text', required = false }) {
  return (
    <label className="contact__field">
      <span>{label}</span>
      <input type={type} name={name} required={required} />
    </label>
  );
}
