/** A mailto link that can break at the @ on narrow screens.
 *
 *  The domain addresses run to 41 characters with no spaces, and browsers only
 *  break text at spaces, so on a phone they pushed the page wider than the
 *  screen. <wbr> marks the @ as the preferred break point; it adds no
 *  character, so copying the text still gives the exact address. The
 *  .email-link rule in base.css lets it break anywhere as a last resort, on
 *  screens too narrow for even half an address. */
export default function EmailLink({ email, className = '' }) {
  const [local, domain] = email.split('@');
  return (
    <a className={`email-link ${className}`.trim()} href={`mailto:${email}`}>
      {local}<wbr />@{domain}
    </a>
  );
}
