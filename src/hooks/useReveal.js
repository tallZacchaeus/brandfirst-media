import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

/**
 * Staggered reveal for inner-page sections: put the ref on a section and mark
 * the pieces that should arrive in order with `data-reveal`. They fade up in
 * sequence the first time the section nears the viewport.
 *
 *   duration 0.55 s, stagger 70 ms, 16 px rise — the inner-page motion spec.
 *
 * Lighter where it has to be:
 *   - reduced motion: nothing is hidden or moved at all;
 *   - phones and low-core devices: opacity only, shorter stagger — no
 *     transform work on the weakest hardware.
 *
 * Uses IntersectionObserver plus a failsafe timer, like the reveals in
 * useGsap.js: a section must never be stranded invisible (IO does not fire in
 * a hidden tab, and a reveal that never runs would leave content at opacity 0).
 */
const reduced = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
const lite = () =>
  window.matchMedia?.('(max-width: 767px), (pointer: coarse)').matches ||
  (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4);

export function useReveal({ selector = '[data-reveal]', rootMargin = '0px 0px -12% 0px' } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || reduced()) return;
    const items = root.querySelectorAll(selector);
    if (!items.length) return;

    const light = lite();
    const from = light ? { opacity: 0 } : { opacity: 0, y: 16 };
    gsap.set(items, from);

    let tween;
    let done = false;
    const run = () => {
      if (done) return;
      done = true;
      io.disconnect();
      clearTimeout(failsafe);
      tween = gsap.to(items, {
        opacity: 1,
        y: 0,
        duration: light ? 0.45 : 0.55,
        // 70 ms apart, but never more than 0.6 s end to end: a 33-photo grid
        // at a fixed 70 ms would take 2.3 s to finish arriving.
        stagger: { each: Math.min(light ? 0.04 : 0.07, 0.6 / items.length) },
        ease: 'power2.out',
        overwrite: 'auto',
        clearProps: 'transform',
      });
    };

    const io = new IntersectionObserver(
      (entries) => { if (entries.some((e) => e.isIntersecting)) run(); },
      { rootMargin, threshold: 0.01 }
    );
    io.observe(root);
    const failsafe = setTimeout(run, 2500);

    return () => {
      io.disconnect();
      clearTimeout(failsafe);
      tween?.kill();
      gsap.set(items, { clearProps: 'opacity,transform' });
    };
  }, [selector, rootMargin]);

  return ref;
}
