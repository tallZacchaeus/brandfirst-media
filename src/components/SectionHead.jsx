/** Numbered section head for inner pages: index and label on a rule, then the
 *  title and an optional lede and action. `split` sets the lede beside the
 *  title on wide screens, for sections that need less vertical preamble.
 *  Styles: .ix-head in styles/inner.css. */
export default function SectionHead({ index, label, title, lede, action, id, split = false, as: Title = 'h2' }) {
  return (
    <header className={`ix-head${split ? ' ix-head--split' : ''}`} data-reveal>
      <p className="ix-head__meta">
        {index && <span className="ix-index">{index}</span>}
        {label && <span className="ix-label">{label}</span>}
      </p>
      <div>
        <Title id={id} className="ix-head__title">{title}</Title>
        {!split && lede && <p className="ix-head__lede">{lede}</p>}
        {action && <div className="ix-head__action">{action}</div>}
      </div>
      {split && lede && <p className="ix-head__lede">{lede}</p>}
    </header>
  );
}
