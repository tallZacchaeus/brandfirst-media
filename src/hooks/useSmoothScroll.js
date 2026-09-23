import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/** The live Lenis instance, or null when smooth scrolling is off (touch,
 *  reduced motion). Anything that moves the page — route changes, #anchor
 *  links — must go through it: writing window.scrollY directly under Lenis is
 *  overwritten on its next frame. */
export const lenisRef = { current: null };

/**
 * Smooth scrolling — the theme's `wcf_enable_scroll_smoother` extension
 * (GSAP ScrollSmoother in the original; Lenis here, which is lighter and does
 * not depend on GSAP's plugin registry).
 *
 * Lenis and ScrollTrigger must share one clock, otherwise pinned sections
 * jitter: ScrollTrigger reads scroll position on its own rAF tick while Lenis
 * writes it on another. Driving lenis.raf from gsap.ticker and calling
 * ScrollTrigger.update on every Lenis scroll keeps them in lockstep.
 */
export function useSmoothScroll({ enabled = true } = {}) {
  useEffect(() => {
    if (!enabled) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    // Touch devices have good native momentum scrolling; emulating it costs a
    // rAF loop on the least powerful hardware for no perceptible gain.
    if (window.matchMedia?.('(hover: none), (pointer: coarse)').matches) return;

    // Direct rather than floaty. With `duration` + `easing` (0.85 s, expo out)
    // Lenis restarts a fixed-length glide on every wheel tick, so the page
    // trails the wheel and keeps moving after the hand has stopped. `lerp`
    // instead closes 15% of the remaining gap each frame (frame-rate
    // independent): the page tracks the wheel closely and settles in a
    // fraction of that time, while still smoothing a notched mouse wheel.
    // Wheel distance is 1:1 with native scrolling.
    const lenis = new Lenis({
      lerp: 0.15,
      wheelMultiplier: 1,
      smoothWheel: true,
      syncTouch: false, // native momentum on touch feels better than emulated
    });

    lenis.on('scroll', ScrollTrigger.update);
    lenisRef.current = lenis;

    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Layout settles after fonts/images; pinned start values depend on it.
    const refresh = () => ScrollTrigger.refresh();
    const t = setTimeout(refresh, 400);
    document.fonts?.ready.then(refresh);

    return () => {
      clearTimeout(t);
      gsap.ticker.remove(tick);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.off('scroll', ScrollTrigger.update);
      if (lenisRef.current === lenis) lenisRef.current = null;
      lenis.destroy();
    };
  }, [enabled]);
}
