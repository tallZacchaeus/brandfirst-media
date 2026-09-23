import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Stacked-card pinning, from the Arolax demo:
 *   start  "bottom bottom" (optionally "bottom bottom-=N")
 *   end    "bottom top"
 *
 * A pinned section holds still once its bottom reaches the viewport bottom,
 * and the next section — which overlaps it by -100px under an 80px rounded
 * top — scrolls up over it.
 *
 * `pins` names which sections pin, by index in `selector`, with an optional
 * start offset in px: `{ 0: 0 }` pins only the first. The demo pinned every
 * section; the homepage now pins only its hero (see Home.jsx). Every other
 * section still overlaps the one before it, so the stack still reads — it just
 * scrolls at the visitor's pace instead of holding still.
 *
 * `pinSpacing: false` is essential: the sections already overlap by margin, so
 * pin spacers would insert gaps and break the stack. It also means a pin adds
 * no scroll distance: passing a pinned section takes exactly as much scrolling
 * as passing an unpinned one.
 *
 * Mouse and trackpad at 768px and up only. Under native touch scrolling a pin
 * lands a frame late and visibly judders, and phones never pinned (the demo's
 * wcf_enable_pin_area_mobile: "no"). Off entirely under reduced motion.
 */
export function useStackedPin(selector = 'main > section', pins = {}) {
  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;

    const mm = gsap.matchMedia();

    mm.add('(min-width: 768px) and (hover: hover) and (pointer: fine)', () => {
      const sections = gsap.utils.toArray(selector);
      const triggers = Object.entries(pins).map(([i, offset]) => {
        const el = sections[i];
        if (!el) return null;
        return ScrollTrigger.create({
          trigger: el,
          start: offset ? `bottom bottom-=${offset}` : 'bottom bottom',
          end: 'bottom top',
          pin: true,
          pinSpacing: false,
          anticipatePin: 1,
        });
      }).filter(Boolean);

      return () => triggers.forEach((t) => t.kill());
    });

    const t = setTimeout(() => ScrollTrigger.refresh(), 450);
    return () => { clearTimeout(t); mm.revert(); };
  }, [selector, pins]);
}
