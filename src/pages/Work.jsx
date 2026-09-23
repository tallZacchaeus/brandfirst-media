import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import SectionHead from '../components/SectionHead';
import ShotGrid from '../components/ShotGrid';
import VideoCard from '../components/VideoCard';
import { useReveal } from '../hooks/useReveal';
import { showcase, videos, work } from '../data/site';
import { pad } from '../data/group';
import '../styles/page.css';
import '../styles/inner.css';
import './Work.css';

/**
 * Work: the group's production record, filterable by discipline.
 *
 * The content document asked for client, challenge, solution and results per
 * project, and none of that has been supplied — so rather than invent it, the
 * page presents the photography and film as evidence, each captioned with its
 * discipline and the brand that did the job.
 */
const FILTERS = ['All', 'Print', 'Events', 'Clothing'];

// Four frames for the hero contact sheet: one per discipline, plus a second
// stage shot, chosen from the same library the grid shows.
const SHEET = ['bfm-wide-format', 'room16-hall-yellow', 'aso-duo-studio', 'room16-live-red']
  .map((name) => showcase.find((s) => s.src.includes(`/${name}-`)))
  .filter(Boolean);

const countFor = (f) => (f === 'All' ? showcase.length : showcase.filter((s) => s.tag === f).length);
const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`;

export default function Work() {
  const [filter, setFilter] = useState('All');
  const shots = useMemo(() => (filter === 'All' ? showcase : showcase.filter((s) => s.tag === filter)), [filter]);
  // The filter drives the clips too, so "Print" does not leave stage footage
  // sitting under a filtered gallery.
  const clips = useMemo(() => (filter === 'All' ? videos : videos.filter((v) => v.tag === filter)), [filter]);

  const photos = useReveal();
  const film = useReveal();
  const cta = useReveal();

  return (
    <main className="page wk">
      <PageHero
        trail={[{ label: 'Work' }]}
        title={work.hero.headline}
        lede={work.hero.sub}
        aside={
          <div className="ix-frame wk-sheet">
            <ol className="wk-sheet__grid" aria-label="Selected frames">
              {SHEET.map((s, i) => (
                <li key={s.src} className="wk-sheet__frame">
                  <img src={s.src} srcSet={s.srcSet} sizes="(max-width: 1023px) 46vw, 22vw" alt={s.alt} width={s.w} height={s.h} loading="eager" decoding="async" />
                  <span className="wk-sheet__no" aria-hidden="true">{pad(i + 1)}</span>
                  <span className="wk-sheet__tag">{s.tag}</span>
                </li>
              ))}
            </ol>
          </div>
        }
      />

      <section ref={photos} className="ix-section wk-photos" aria-labelledby="wk-photos">
        <div className="ix-wrap">
          <SectionHead
            index="01"
            label="Photographs"
            title="Photographed on the floor and on site"
            id="wk-photos"
          />

          <div className="wk-filter" data-reveal>
            <div className="wk-filter__group" role="group" aria-label="Filter work by discipline">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  type="button"
                  className="wk-filter__btn"
                  aria-pressed={filter === f}
                  onClick={() => setFilter(f)}
                >
                  <span>{f}</span>
                  <span className="wk-filter__count">{countFor(f)}</span>
                </button>
              ))}
            </div>
            <p className="wk-filter__status" role="status" aria-live="polite">
              Showing {plural(shots.length, 'photograph', 'photographs')}
              {clips.length > 0 && <> · {plural(clips.length, 'film clip', 'film clips')}</>}
            </p>
          </div>

          {/* Keyed on the filter so the grid remounts rather than leaving tiles
              from the previous selection in their revealed state. */}
          <ShotGrid key={filter} shots={shots} eager={3} />
        </div>
      </section>

      {clips.length > 0 && (
        <section ref={film} className="ix-section ix-section--tint wk-film" aria-labelledby="wk-film">
          <div className="ix-wrap">
            <SectionHead
              index="02"
              label="Film"
              title="On the floor"
              lede="Presses running, rigs going up, rooms coming to life. Hover or tap any clip to play it."
              id="wk-film"
            />
            <ul className="vgrid" key={`v-${filter}`}>
              {clips.map((c) => <li key={c.name} data-reveal><VideoCard clip={c} /></li>)}
            </ul>
          </div>
        </section>
      )}

      <section ref={cta} className="ix-section ix-section--dark">
        <div className="ix-wrap ix-cta" data-reveal>
          <div>
            <h2 className="ix-cta__title">{work.cta.headline}</h2>
            <p className="ix-cta__body">{work.cta.body}</p>
          </div>
          <div className="ix-cta__actions">
            <Link className="btn btn--light" to={work.cta.button.href}>{work.cta.button.label}</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
