import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';
import { lenisRef } from '../hooks/useSmoothScroll';

/** Scroll behaviour for client-side navigation, which React Router leaves to
 *  the app. Without this, following a link kept the previous page's scroll
 *  position (a footer link landed at the bottom of the next page) and
 *  /services#event-lighting-style links never reached their section.
 *
 *  - New page, no hash: start at the top.
 *  - Hash: scroll to that element once it has rendered.
 *  - Back/forward (POP): leave it to the browser's own restoration.
 *
 *  Goes through Lenis when it is running, since it owns the scroll position. */
function scrollToTarget(target) {
  const lenis = lenisRef.current;
  if (lenis) {
    lenis.scrollTo(target, { immediate: true, force: true });
  } else if (typeof target === 'number') {
    window.scrollTo(0, target);
  } else {
    // Honours the target's scroll-margin-top.
    target.scrollIntoView({ block: 'start' });
  }
}

export default function ScrollManager() {
  const { pathname, hash } = useLocation();
  const navType = useNavigationType();

  useEffect(() => {
    if (navType === 'POP' && !hash) return;

    if (!hash) {
      scrollToTarget(0);
      return;
    }

    // Wait for the destination page to render (and its images to reserve
    // space) before measuring; retry briefly in case the section mounts late.
    let tries = 0;
    let id;
    const seek = () => {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (el) {
        const lenis = lenisRef.current;
        if (lenis) {
          const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
          lenis.scrollTo(el, { immediate: true, force: true, offset: -margin });
        } else {
          scrollToTarget(el);
        }
      } else if (tries++ < 20) {
        id = requestAnimationFrame(seek);
      }
    };
    id = requestAnimationFrame(seek);
    return () => cancelAnimationFrame(id);
  }, [pathname, hash, navType]);

  return null;
}
