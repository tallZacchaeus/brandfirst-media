/**
 * Homepage reveal settings, shared by every section below the hero (see
 * hooks/useReveal.js). One idea per section, and blocks rather than words:
 * a heading rises as one piece, copy fades as one paragraph, related cards
 * arrive as a group.
 *
 *   0.5 s, power2.out, 20 px rise (12 px on phones), 60 ms between pieces.
 *
 * `waitForView` so each block plays when it is actually scrolled to, not on a
 * timer while it is still off-screen; the trigger sits just inside the
 * viewport so nothing makes a visitor wait.
 */
export const HOME_REVEAL = {
  y: 20,
  liteY: 12,
  duration: 0.5,
  stagger: 0.06,
  rootMargin: '0px 0px -8% 0px',
  waitForView: true,
};

/** A single block: the element the ref is on, as one piece. */
export const HOME_BLOCK = { ...HOME_REVEAL, selector: null };
