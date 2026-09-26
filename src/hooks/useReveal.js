import { useEffect, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';

/**
 * Staggered reveal: put the ref on a container and mark the pieces that should
 * arrive in order with `data-reveal`. They fade up in sequence the first time
 * the container nears the viewport. Each piece animates once; scrolling back
 * never replays it.
 *
 *   Defaults are the inner-page motion spec: 0.55 s, 70 ms stagger, 16 px rise.
 *
 * Options (the homepage uses these; defaults leave inner pages unchanged):
 *   selector     what to animate inside the container; `null` animates the
 *                container itself as one block
 *   y / liteY    rise on capable devices / on phones, coarse pointers and
 *                low-core devices (0 = opacity only)
 *   each         reveal each piece as it enters, rather than all together when
 *                the container does (long lists: services by brand row)
 *   phoneBlock   on phones, fade the container as one block instead of its
 *                pieces (a card grid that stacks into a long column)
 *   waitForView  the failsafe timer only fires if IntersectionObserver never
 *                reports. Without it, the timer reveals everything 2.5 s after
 *                mount wherever the visitor is, so anything below the first
 *                screen has already played off-screen by the time it is seen.
 *
 * Lighter where it has to be:
 *   - reduced motion: nothing is hidden or moved at all;
 *   - phones and low-core devices: shorter rise (or none) and stagger.
 *
 * Hidden before paint (layout effect), so content never flashes up and then
 * vanishes to wait for its entrance. Pieces already on screen when the page
 * mounts are left alone: pages arrive prerendered, so that content has been
 * visible since the first paint, and hiding it at hydration would make it
 * blink out and back. A failsafe guarantees nothing is stranded invisible:
 * IntersectionObserver does not fire in a hidden tab, and a reveal that never
 * runs would leave content at opacity 0.
 */
const reduced = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
const phone = () => window.matchMedia?.('(max-width: 767px)').matches;
// useLayoutEffect warns when the prerender runs the app in Node, where there is
// nothing to lay out; the effect only matters in the browser anyway.
const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;
const lite = () =>
  window.matchMedia?.('(max-width: 767px), (pointer: coarse)').matches ||
  (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4);

export function useReveal({
  selector = '[data-reveal]',
  rootMargin = '0px 0px -12% 0px',
  y = 16,
  liteY = 0,
  duration = 0.55,
  stagger = 0.07,
  each = false,
  phoneBlock = false,
  waitForView = false,
} = {}) {
  const ref = useRef(null);

  useIsoLayoutEffect(() => {
    const root = ref.current;
    if (!root || reduced()) return;
    const items = (selector === null || (phoneBlock && phone())
      ? [root]
      : [...root.querySelectorAll(selector)]
    ).filter((el) => el.getBoundingClientRect().top >= window.innerHeight);
    if (!items.length) return;

    const light = lite();
    const rise = light ? liteY : y;
    gsap.set(items, rise ? { opacity: 0, y: rise } : { opacity: 0 });

    const tweens = [];
    const pending = new Set(items);
    let io;
    let failsafe;
    let reported = false;
    const stop = () => { io?.disconnect(); clearTimeout(failsafe); };
    const reveal = (targets) => {
      const list = targets.filter((t) => pending.has(t));
      if (!list.length) return;
      list.forEach((t) => pending.delete(t));
      tweens.push(gsap.to(list, {
        opacity: 1,
        y: 0,
        duration: light ? Math.min(duration, 0.45) : duration,
        // Never more than 0.6 s end to end: a 33-photo grid at a fixed 70 ms
        // would take 2.3 s to finish arriving.
        stagger: { each: Math.min(light ? Math.min(stagger, 0.04) : stagger, 0.6 / list.length) },
        ease: 'power2.out',
        overwrite: 'auto',
        clearProps: 'transform',
      }));
      if (!pending.size) stop();
    };

    try {
      io = new IntersectionObserver((entries) => {
        reported = true;
        if (each) {
          reveal(entries.filter((e) => e.isIntersecting).map((e) => e.target));
        } else if (entries.some((e) => e.isIntersecting)) {
          reveal([...pending]);
        }
      }, { rootMargin, threshold: 0.01 });
      (each ? items : [root]).forEach((el) => io.observe(el));
    } catch {
      reveal([...pending]); // no observer: show everything now
    }

    if (pending.size) {
      failsafe = setTimeout(() => {
        if (!waitForView || !reported) reveal([...pending]);
      }, waitForView ? 1500 : 2500);
    }

    return () => {
      stop();
      tweens.forEach((t) => t.kill());
      gsap.set(items, { clearProps: 'opacity,transform' });
    };
  }, [selector, rootMargin, y, liteY, duration, stagger, each, phoneBlock, waitForView]);

  return ref;
}
