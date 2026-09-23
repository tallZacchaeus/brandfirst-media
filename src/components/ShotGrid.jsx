import { brandByAccent } from '../data/group';
import './ShotGrid.css';

/** Production photography as evidence: every tile carries a caption beneath it
 *  — discipline, the brand that did the job, and what the picture shows — so
 *  the grid reads as a record of work rather than a mood board. The caption is
 *  the image's alt text made visible, so there is no second copy to keep in
 *  sync. Used by the Work page and the brand pages.
 *
 *  `eager` loads the first few tiles immediately (Work, where the grid starts
 *  near the fold); everything else is lazy. */
export default function ShotGrid({ shots, eager = 0, showBrand = true }) {
  return (
    <ul className="shots">
      {shots.map((s, i) => {
        const brand = brandByAccent(s.brand);
        const portrait = s.h > s.w;
        return (
          <li key={s.src} className={`shot shot--${s.brand}${portrait ? ' shot--tall' : ''}`} data-reveal>
            <figure>
              <div className="shot__img">
                <img
                  src={s.src}
                  srcSet={s.srcSet}
                  sizes="(max-width: 1023px) 46vw, 30vw"
                  alt=""
                  width={s.w}
                  height={s.h}
                  loading={i < eager ? 'eager' : 'lazy'}
                  decoding="async"
                />
              </div>
              <figcaption className="shot__caption">
                <span className="shot__meta">
                  <span className="shot__tag">{s.tag}</span>
                  {showBrand && brand && <span className="shot__brand">{brand.name}</span>}
                </span>
                <span className="shot__desc">{s.alt}</span>
              </figcaption>
            </figure>
          </li>
        );
      })}
    </ul>
  );
}
