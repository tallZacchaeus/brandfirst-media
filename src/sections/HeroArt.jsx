import './HeroArt.css';

/** The hero's right half: real work, cropped into the same capsule the headline
 *  pills and the buttons use, so the photography reads as part of the layout
 *  rather than dropped into it.
 *
 *  Four capsules, one per discipline the headline claims — two stage, one
 *  print, one apparel — so the pictures back the words rather than repeating
 *  one of them. The two stage capsules are deliberately unalike: a warm live
 *  performance and a cool empty rig, not two frames of the same event. One of
 *  the print shots is an installed PremiumTrust billboard: named client work,
 *  so confirm display permission before this goes live.
 *
 *  Each capsule cycles through three shots and drifts on its own clock. The
 *  cycle is CSS — stacked images with staggered opacity keyframes — rather than
 *  a timer in React, so it costs no re-renders and stops dead under
 *  prefers-reduced-motion.
 *
 *  Decorative — the page says what the company does in words — so aria-hidden
 *  and empty alt throughout.
 */
const CAPSULES = [
  {
    cls: 'a',
    shots: [
      { name: 'room16-live-beams', widths: [480, 900], w: 1080, h: 718 },
      { name: 'room16-live-wide', widths: [480, 900], w: 1080, h: 694 },
      { name: 'room16-stage-lit', widths: [480, 832], w: 832, h: 464 },
    ],
  },
  {
    cls: 'b',
    shots: [
      { name: 'aso-pair-orange', widths: [480, 900], w: 4000, h: 5600 },
      { name: 'aso-jersey-white', widths: [480, 900], w: 4516, h: 5644 },
      { name: 'aso-pair-white', widths: [480, 900], w: 4000, h: 5600 },
    ],
  },
  {
    cls: 'd',
    shots: [
      { name: 'bfm-billboard', widths: [480, 900], w: 4024, h: 1993 },
      { name: 'bfm-wide-format', widths: [480, 900], w: 4000, h: 1800 },
      { name: 'bfm-press-run', widths: [480, 900], w: 1784, h: 4132 },
    ],
  },
  {
    cls: 'c',
    shots: [
      { name: 'room16-stage-night', widths: [480, 832], w: 832, h: 464 },
      { name: 'room16-truss', widths: [480, 832], w: 832, h: 464 },
      { name: 'room16-screens', widths: [480, 832], w: 832, h: 464 },
    ],
  },
];

export default function HeroArt() {
  return (
    <div className="hero-art" aria-hidden="true">
      {CAPSULES.map(({ cls, shots }) => (
        <figure key={cls} className={`hero-art__cap hero-art__cap--${cls}`}>
          {shots.map(({ name, widths, w, h }, i) => (
            <img
              key={name}
              className={`hero-art__shot hero-art__shot--${i + 1}`}
              src={`/media/${name}-${widths[0]}.webp`}
              srcSet={widths.map((x) => `/media/${name}-${x}.webp ${x}w`).join(', ')}
              sizes="(max-width: 1100px) 0px, 30vw"
              alt=""
              width={w}
              height={h}
              /* Only the first frame of each capsule competes with the fold;
                 the rest are not seen for seconds, so they queue behind it. */
              loading={i === 0 ? 'eager' : 'lazy'}
              fetchPriority={i === 0 ? 'auto' : 'low'}
              decoding="async"
            />
          ))}
        </figure>
      ))}
    </div>
  );
}
