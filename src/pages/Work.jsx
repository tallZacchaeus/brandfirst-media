import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import { useFadeIn } from '../hooks/useGsap';
import VideoCard from '../components/VideoCard';
import { showcase, videos, work } from '../data/site';
import '../styles/page.css';
import '../styles/section.css';
import './Work.css';

/**
 * Work. A gallery of what the group has actually produced, filtered by
 * discipline.
 *
 * This replaced a set of placeholder case cards. The content document asked for
 * client, challenge, solution and results per project, and none of that has
 * been supplied — so rather than invent it, the page shows the photography and
 * says plainly that written case studies follow. Real pictures of real jobs
 * earn more trust than a fabricated case study anyway.
 */
const FILTERS = ['All', 'Print', 'Events', 'Apparel'];

export default function Work() {
  const [filter, setFilter] = useState('All');
  const shots = useMemo(
    () => (filter === 'All' ? showcase : showcase.filter((s) => s.tag === filter)),
    [filter],
  );
  // The filter chips drive the clips too, so "Print" does not leave stage
  // footage sitting under a filtered gallery.
  const clips = useMemo(
    () => (filter === 'All' ? videos : videos.filter((v) => v.tag === filter)),
    [filter],
  );

  return (
    <main className="page wk">
      <div className="page__inner">
        <PageHero title={work.hero.headline} lede={work.hero.sub} />

        <div className="wk__filters" role="group" aria-label="Filter work by discipline">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              className={`wk__filter${filter === f ? ' is-on' : ''}`}
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
            >
              {f}
              <span className="wk__count">
                {f === 'All' ? showcase.length : showcase.filter((s) => s.tag === f).length}
              </span>
            </button>
          ))}
        </div>

        {/* Keyed on the filter so the whole grid remounts and re-reveals, rather
            than leaving stale items faded in from the previous selection. */}
        <ul className="wk__gallery" key={filter}>
          {shots.map((s, i) => <Shot key={s.src} shot={s} index={i} />)}
        </ul>

        {clips.length > 0 && (
          <section className="wk__film">
            <h2 className="sec__title">On the floor</h2>
            <p className="wk__film-note">
              Presses running, rigs going up, rooms coming to life. Hover or tap
              any clip to play it.
            </p>
            <ul className="vgrid" key={`v-${filter}`}>
              {clips.map((c) => <li key={c.name}><VideoCard clip={c} /></li>)}
            </ul>
          </section>
        )}

        <section className="wk__cta">
          <h2 className="sec__title">{work.cta.headline}</h2>
          <p className="wk__cta-body">{work.cta.body}</p>
          <Link className="btn btn--primary" to={work.cta.button.href}>
            {work.cta.button.label}
          </Link>
        </section>
      </div>
    </main>
  );
}

function Shot({ shot, index }) {
  // Cap the stagger: past the first row or two it just delays the fold.
  const el = useFadeIn({ delay: Math.min(index, 8) * 0.05 });
  const portrait = shot.h > shot.w;
  return (
    <li
      ref={el}
      className={`wk__shot wk__shot--${shot.brand}${portrait ? ' wk__shot--tall' : ''}`}
    >
      <img
        src={shot.src}
        srcSet={shot.srcSet}
        sizes="(max-width: 767px) 100vw, (max-width: 1024px) 50vw, 33vw"
        alt={shot.alt}
        width={shot.w}
        height={shot.h}
        loading={index < 6 ? 'eager' : 'lazy'}
        decoding="async"
      />
      <figcaption className="wk__caption">
        <span className="wk__tag">{shot.tag}</span>
        {shot.alt}
      </figcaption>
    </li>
  );
}
