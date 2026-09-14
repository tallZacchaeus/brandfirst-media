import { useEffect, useRef, useState } from 'react';
import './HeroVideo.css';

/**
 * `arolax--video` widget from the homepage hero (page #9322).
 *
 * Extracted settings: border radius 30px, play wrap 80px, icon 16px #FFFFFF,
 * 2px solid #FFFFFF border at radius 100%. `video_thumbnail` was empty and the
 * widget's own CSS hid the poster, so the demo showed the footage itself.
 *
 * Two deliberate departures from that, both for cost reasons:
 *
 *  - A poster is used. The file is 12 MB; without a poster the panel is blank
 *    until enough of it arrives.
 *  - Autoplay is desktop-only. On a phone — especially on Nigerian mobile data
 *    — silently pulling 12 MB for decoration is indefensible. Touch devices get
 *    the poster and a tap-to-play control.
 *
 * `?v=2` is a cache key: an earlier vercel.json served the SPA fallback HTML at
 * this URL with `immutable, max-age=31536000`, so affected browsers would never
 * revalidate. A new query string routes them past the poisoned entry.
 */
export default function HeroVideo({ src = '/assets/hero-video.mp4?v=2' }) {
  const video = useRef(null);
  const [autoplay, setAutoplay] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const fine = window.matchMedia?.('(hover: hover) and (pointer: fine)').matches;
    const still = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (fine && !still) {
      setAutoplay(true);
      const v = video.current;
      if (v) { v.play().then(() => setPlaying(true)).catch(() => {}); }
    }
  }, []);

  const toggle = () => {
    const v = video.current;
    if (!v) return;
    if (v.paused) {
      v.play().then(() => setPlaying(true)).catch(() => {});
      return;
    }
    if (muted) { v.muted = false; setMuted(false); return; }
    v.pause(); setPlaying(false);
  };

  const label = !playing ? 'Play showreel' : muted ? 'Play showreel with sound' : 'Pause showreel';

  return (
    <div className="hvideo">
      <video
        ref={video}
        className="hvideo__media"
        src={src}
        poster="/assets/hero-poster.webp"
        muted
        loop
        playsInline
        preload={autoplay ? 'metadata' : 'none'}
      />
      <button className="hvideo__play" type="button" onClick={toggle} aria-label={label}>
        <span className="hvideo__icon" aria-hidden>
          {!playing || muted ? (
            <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor"><path d="M3 1.5v13l11-6.5z" /></svg>
          ) : (
            <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor"><rect x="3" y="2" width="4" height="12" /><rect x="9" y="2" width="4" height="12" /></svg>
          )}
        </span>
      </button>
    </div>
  );
}
