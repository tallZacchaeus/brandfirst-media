import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

if (import.meta.env?.DEV && typeof window !== 'undefined') {
  window.__ST = ScrollTrigger; window.__gsap = gsap;
}

const reduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/**
 * Reveals use IntersectionObserver rather than ScrollTrigger.
 *
 * ScrollTrigger derives start offsets from viewport height at creation time and
 * `once: true` self-kills when a trigger is created already in view — which
 * silently skips onEnter and leaves the element stuck at its hidden start state.
 * React StrictMode's double-mount made that worse by leaving duplicate triggers.
 * IntersectionObserver reports elements that are already visible, so a reveal
 * can never be permanently stranded. ScrollTrigger is still used for pinning,
 * where scroll position genuinely matters.
 *
 * `rootMargin` translates the demo's "top 85%" / "top 90%" start values.
 */
function observeOnce(el, onEnter, { rootMargin = '0px 0px -15% 0px', failsafeMs = 2500 } = {}) {
  let done = false;
  const fire = () => { if (done) return; done = true; clearTimeout(t); io.disconnect(); onEnter(); };

  const io = new IntersectionObserver(
    (entries) => { for (const e of entries) if (e.isIntersecting) fire(); },
    { rootMargin, threshold: 0.01 }
  );
  io.observe(el);

  // Failsafe: a reveal must never strand content permanently invisible.
  // IntersectionObserver does not fire in a background/hidden tab (the page is
  // not composited), and a thrown observer or an unsupported environment would
  // leave the element at opacity 0 forever. Reveal regardless after a delay.
  const t = setTimeout(fire, failsafeMs);

  return () => { clearTimeout(t); io.disconnect(); };
}

/** wcf_text_animation: "char" — demo stagger 0.05. */
export function useTextReveal({ stagger = 0.05, by = 'chars', rootMargin } = {}) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced()) return;
    let split, tween, stop = () => {};
    let cancelled = false;

    (document.fonts?.ready ?? Promise.resolve()).then(() => {
      if (cancelled || !ref.current) return;
      /* Split words and chars only. Splitting lines generates wrapper divs that
         collide with manually authored line spans (Hero's two-line headline),
         forcing one word per row — and nothing here animates by line. */
      split = new SplitText(el, { type: 'chars,words' });
      const targets = split[by] ?? split.chars;
      gsap.set(targets, { yPercent: 110, opacity: 0 });
      stop = observeOnce(el, () => {
        tween = gsap.to(targets, {
          yPercent: 0, opacity: 1, ease: 'power3.out',
          duration: 0.55, stagger, overwrite: 'auto',
        });
      }, { rootMargin });
    });

    return () => { cancelled = true; stop(); tween?.kill(); split?.revert(); };
  }, [stagger, by, rootMargin]);
  return ref;
}

/** wcf-animation: "fade" (22 uses). */
export function useFadeIn({ y = 40, delay = 0, rootMargin } = {}) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced()) return;
    gsap.set(el, { y, opacity: 0 });
    let tween;
    const stop = observeOnce(el, () => {
      tween = gsap.to(el, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out', delay, overwrite: 'auto' });
    }, { rootMargin });
    return () => { stop(); tween?.kill(); gsap.set(el, { clearProps: 'transform,opacity' }); };
  }, [y, delay, rootMargin]);
  return ref;
}

/** wcf-image-animation: "reveal" — clip-path wipe (8 uses). */
export function useImageReveal({ rootMargin } = {}) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced()) return;
    gsap.set(el, { clipPath: 'inset(0 0 100% 0)' });
    let tween;
    const stop = observeOnce(el, () => {
      tween = gsap.to(el, { clipPath: 'inset(0 0 0% 0)', duration: 0.7, ease: 'power3.inOut', overwrite: 'auto' });
    }, { rootMargin });
    return () => { stop(); tween?.kill(); gsap.set(el, { clearProps: 'clipPath' }); };
  }, [rootMargin]);
  return ref;
}

/** wcf_enable_pin_area: yes — start "top top", end "bottom top". Genuinely scroll-bound. */
export function usePinned({ start = 'top top', end = 'bottom top', enabled = true } = {}) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled || reduced()) return;
    const st = ScrollTrigger.create({ trigger: el, start, end, pin: true, pinSpacing: false });
    const t = setTimeout(() => ScrollTrigger.refresh(), 300);
    return () => { clearTimeout(t); st.kill(); };
  }, [start, end, enabled]);
  return ref;
}
