import { useRef, useState } from 'react';
import './HeroVideo.css';

/**
 * `arolax--video` widget from the homepage hero (page #9322).
 *
 * Extracted settings:
 *   video_link            arolux-branding-agency-video.mp4 (12.5 MB)
 *   video_thumbnail       empty — and wcf_custom_css hides the poster img
 *                         (`.video-with-poster img { display: none }`), so the
 *                         video itself is the visible surface, not a poster.
 *   image_border_radius   30px
 *   play_wrap_size        80px
 *   play_icon_size        16px, colour #FFFFFF
 *   play_icon_border      2px solid #FFFFFF, radius 100%
 *
 * Plays muted and looping so it reads as motion in the hero; the button
 * toggles sound and pause, which is what the play control means once the
 * video is already visible.
 */
/* `?v=2` is a deliberate cache key, not decoration. An earlier vercel.json
   served the SPA fallback HTML at this URL with `immutable, max-age=31536000`
   while the file was gitignored. `immutable` means affected browsers never
   revalidate, so they would show a dead hero for a year. A new query string is
   a new cache entry, which routes them past the poisoned one. */
export default function HeroVideo({ src = '/assets/hero-video.mp4?v=2' }) {
  const video = useRef(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);

  const toggle = () => {
    const v = video.current;
    if (!v) return;
    if (muted) {
      // First press: bring up sound rather than stopping the motion.
      v.muted = false;
      setMuted(false);
      if (v.paused) { v.play(); setPlaying(true); }
      return;
    }
    if (v.paused) { v.play(); setPlaying(true); }
    else { v.pause(); setPlaying(false); }
  };

  const label = muted ? 'Play showreel with sound' : playing ? 'Pause showreel' : 'Play showreel';

  return (
    <div className="hvideo">
      <video
        ref={video}
        className="hvideo__media"
        src={src}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />
      <button className="hvideo__play" type="button" onClick={toggle} aria-label={label}>
        <span className="hvideo__icon" aria-hidden>
          {muted || !playing ? (
            <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor"><path d="M3 1.5v13l11-6.5z" /></svg>
          ) : (
            <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor"><rect x="3" y="2" width="4" height="12" /><rect x="9" y="2" width="4" height="12" /></svg>
          )}
        </span>
      </button>
    </div>
  );
}
