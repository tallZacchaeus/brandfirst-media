import { FaInstagram } from 'react-icons/fa';
import { brands } from '../data/site';
import './BrandSocialLinks.css';

function SocialIcon({ label }) {
  if (label.startsWith('Instagram')) return <FaInstagram aria-hidden="true" focusable="false" />;
  return null;
}

export default function BrandSocialLinks() {
  return (
    <div className="brand-socials">
      {brands.map((brand) => (
        <div className="brand-socials__group" key={brand.slug}>
          <span className="brand-socials__name">{brand.name}</span>
          <div className="brand-socials__links">
            {brand.social.map((social) => (
              <a key={social.label} href={social.href} target="_blank" rel="noreferrer">
                <SocialIcon label={social.label} />
                <span>{social.label}</span>
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
