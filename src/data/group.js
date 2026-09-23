import { brands, services } from './site';

/** Lookups across the group's three brands, so pages do not each re-derive
 *  them. Each brand's `services` list (of service slugs) is the source of truth
 *  for which services it owns; photos and clips are keyed by brand `accent`. */

/** The service entries a brand owns, in the brand's own order. */
export const servicesFor = (brand) =>
  brand.services.map((slug) => services.find((s) => s.slug === slug)).filter(Boolean);

/** The brand a photo or clip belongs to, from its `brand` (accent) key. */
export const brandByAccent = (accent) => brands.find((b) => b.accent === accent);

/** Two-digit index for numbered lists and section heads: 1 → "01". */
export const pad = (n) => String(n).padStart(2, '0');
