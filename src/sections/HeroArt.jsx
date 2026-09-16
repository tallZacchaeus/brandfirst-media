import './HeroArt.css';

/** Abstract mark for the empty right half of the hero.
 *
 *  Built here rather than pulled from Lottie: it is ~2KB of inline SVG with no
 *  runtime (lottie-web is ~250KB), nothing to licence, and it can speak the
 *  page's own language — every shape is the same capsule as the headline pills
 *  and the buttons, so it reads as part of the design rather than stock art.
 *
 *  The three long capsules are the three brands; they rotate as one ring while
 *  the inner cluster turns against them. Decorative only, so aria-hidden.
 */
export default function HeroArt() {
  return (
    <div className="hero-art" aria-hidden="true">
      <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="ha-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#29ABE2" stopOpacity=".38" />
            <stop offset="100%" stopColor="#29ABE2" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx="200" cy="200" r="190" fill="url(#ha-glow)" />

        {/* Outer ring — one capsule per brand, 60° apart. */}
        <g className="hero-art__ring">
          {[0, 60, 120].map((deg) => (
            <rect
              key={deg}
              x="40" y="170" width="320" height="60" rx="30"
              stroke="#fff" strokeOpacity=".22" strokeWidth="1.5"
              transform={`rotate(${deg} 200 200)`}
            />
          ))}
        </g>

        {/* Inner cluster, turning the other way. */}
        <g className="hero-art__core">
          {[30, 90, 150].map((deg, i) => (
            <rect
              key={deg}
              x="110" y="185" width="180" height="30" rx="15"
              fill="#fff" fillOpacity={i === 1 ? '.14' : '.07'}
              transform={`rotate(${deg} 200 200)`}
            />
          ))}
          <rect
            x="140" y="188" width="120" height="24" rx="12"
            fill="#29ABE2" fillOpacity=".55" transform="rotate(-20 200 200)"
          />
        </g>

        <circle cx="200" cy="200" r="9" fill="#fff" fillOpacity=".9" />
      </svg>
    </div>
  );
}
