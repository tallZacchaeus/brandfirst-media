import { FaWhatsapp } from 'react-icons/fa';
import { site } from '../data/site';
import './WhatsAppFloat.css';

export default function WhatsAppFloat() {
  const href = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(site.whatsappMessage)}`;

  return (
    <a
      className="whatsapp-float"
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={`Chat with ${site.name} on WhatsApp at ${site.whatsappDisplay}`}
      title="Chat with us on WhatsApp"
    >
      <FaWhatsapp aria-hidden="true" focusable="false" />
      <span className="whatsapp-float__tooltip" role="tooltip">Chat on WhatsApp</span>
    </a>
  );
}
