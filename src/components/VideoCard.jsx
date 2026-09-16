import { useRef, useState } from 'react';
import './VideoCard.css';

/** A clip from the client's own footage.
 *
 *  Nothing downloads until someone asks for it: `preload="none"` with a poster
 *  image means the card costs a ~20-80KB WebP until hover or tap. That matters
 *  on the Work page, where eight of these sit together — eager video would be
 *  ~7MB of autoplay.
 *
 *  Muted and loop, because these are silent production clips, not films with
 *  sound; `playsInline` stops iOS taking the video fullscreen on play. Hover
 *  starts playback on a mouse, tap toggles it on touch, and neither happens
 *  under prefers-reduced-motion, where it stays a poster until clicked.
 */
export default function VideoCard({ clip, className = '' }) {
  const ref = useRef(null);
  const [playing, setPlaying] = useState(false);

  const calm = () =>
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  const start = () => {
    const v = ref.current;
    if (!v) return;
    // play() rejects if the browser blocks it or the element is torn down
    // mid-promise; either way there is nothing to recover, so keep the poster.
    v.play().then(() => setPlaying(true)).catch(() => {});
  };
  const stop = () => {
    const v = ref.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
    setPlaying(false);
  };

  return (
    <figure
      className={`vcard${playing ? ' is-playing' : ''} ${className}`.trim()}
      onMouseEnter={() => { if (!calm()) start(); }}
      onMouseLeave={() => { if (!calm()) stop(); }}
    >
      <video
        ref={ref}
        className="vcard__video"
        poster={`/media/${clip.name}-poster.webp`}
        width={clip.w}
        height={clip.h}
        muted
        loop
        playsInline
        preload="none"
        aria-label={clip.alt}
        onClick={() => (playing ? stop() : start())}
      >
        <source src={`/media/${clip.name}.mp4`} type="video/mp4" />
      </video>

      <button
        type="button"
        className="vcard__toggle"
        aria-label={`${playing ? 'Pause' : 'Play'}: ${clip.alt}`}
        onClick={() => (playing ? stop() : start())}
      >
        <span className="vcard__icon" aria-hidden="true">{playing ? '❚❚' : '▶'}</span>
      </button>

      <figcaption className="vcard__caption">{clip.alt}</figcaption>
    </figure>
  );
}
