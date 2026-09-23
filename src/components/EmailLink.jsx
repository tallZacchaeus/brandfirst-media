/** A mailto link that can break at the @ on narrow screens.
 *
 *  The domain addresses run to 41 characters with no spaces, and browsers only
 *  break text at spaces, so on a phone they pushed the page wider than the
 *  screen. <wbr> marks the @ as the preferred break point; it adds no
 *  character, so copying the text still gives the exact address. The
 *  .email-link rule in base.css lets it break anywhere as a last resort, on
 *  screens too narrow for even half an address.
 *
 *  An optional icon renders before the text. The text sits in its own span so
 *  that when a caller lays the link out as a flex row, the address stays one
 *  flex item: loose text around a <wbr> would otherwise be split into separate
 *  items and stop wrapping at the @. */
export default function EmailLink({ email, className = '', icon = null }) {
  const [local, domain] = email.split('@');
  return (
    <a className={`email-link ${className}`.trim()} href={`mailto:${email}`}>
      {icon}
      <span>{local}<wbr />@{domain}</span>
    </a>
  );
}
