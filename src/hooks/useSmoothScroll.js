import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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

    const lenis = new Lenis({
      duration: 0.85,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false, // native momentum on touch feels better than emulated
    });

    lenis.on('scroll', ScrollTrigger.update);

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
      lenis.destroy();
    };
  }, [enabled]);
}
