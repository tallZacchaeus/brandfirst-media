/**
 * Search and sharing metadata for every public route: the single list the
 * head tags, the prerender, and the sitemap all read.
 *
 * Titles lead with what the page is about and end with the brand, around
 * 50-60 characters. Descriptions say what a visitor will find, in the site's
 * own terms, around 140-160 characters. Nothing here claims more than the
 * pages do: no awards, figures, clients or addresses.
 *
 * `og` is a 1200×630 JPEG in public/og (JPEG because WhatsApp and LinkedIn
 * previews do not reliably render WebP), made from the site's own photos.
 * None shows named client work, whose display permission is unconfirmed.
 * `type` is the schema.org page type.
 * `trail` is the breadcrumb after Home.
 */
export const PAGES = {
  '/': {
    title: 'Brandfirst Media | Print, Events and Clothing in Lagos',
    description:
      'Lagos production group: print, signage and publicity from Brandfirst Media, event lighting and stages from ROOM16, branded clothing from Aṣọ Ìgbàlódé.',
    og: 'home', ogAlt: 'Print, stage lighting and branded clothing produced by Brandfirst Media',
    type: 'WebPage',
  },
  '/about': {
    title: 'About Brandfirst Media | A Lagos Production Group',
    description:
      'A Lagos production group that started in a single shop: print and publicity in-house, lighting and stage through ROOM16, clothing through Aṣọ Ìgbàlódé.',
    og: 'about', ogAlt: 'Print, stage lighting and branded clothing from across the Brandfirst Media group',
    type: 'AboutPage',
    trail: [['About', '/about']],
  },
  '/services': {
    title: 'Print, Event and Clothing Services in Lagos | Brandfirst Media',
    description:
      'Nine services from one Lagos production group: print production, large format and signage, publicity, event lighting, stage and set design, and branded clothing.',
    og: 'services', ogAlt: 'Roll-up banners coming off the press',
    type: 'CollectionPage',
    trail: [['Services', '/services']],
  },
  '/brands': {
    title: 'Our Brands | Brandfirst Media, ROOM16 and Aṣọ Ìgbàlódé',
    description:
      'One Lagos production group, three brands: Brandfirst Media for print and publicity, ROOM16 for stage, light and set design, Aṣọ Ìgbàlódé for clothing.',
    og: 'brands', ogAlt: 'Print, stage lighting and branded clothing from the three brands',
    type: 'CollectionPage',
    trail: [['Brands', '/brands']],
  },
  '/brands/brandfirst-media': {
    title: 'Printing, Signage and Publicity in Lagos | Brandfirst Media',
    description:
      'Business print, large-format banners, billboards and signage, and publicity campaigns from Brandfirst Media, proofed before they run and installed across Lagos.',
    og: 'brandfirst-media', ogAlt: 'A campaign print run on the Brandfirst Media press',
    type: 'WebPage',
    trail: [['Brands', '/brands'], ['Brandfirst Media', '/brands/brandfirst-media']],
    brand: 'brandfirst-media',
  },
  '/brands/room16': {
    title: 'Event Lighting, Stage and Set Design in Lagos | ROOM16',
    description:
      'ROOM16 plans, rigs and operates event lighting, builds stages and truss, and designs event sets in Lagos, for concerts, launches, conferences and weddings.',
    og: 'room16', ogAlt: 'ROOM16 beam lighting over a full auditorium',
    type: 'WebPage',
    trail: [['Brands', '/brands'], ['ROOM16', '/brands/room16']],
    brand: 'room16',
  },
  '/brands/aso-igbalode': {
    title: 'Branded Clothing and Corporate Wear in Lagos | Aṣọ Ìgbàlódé',
    description:
      'Aṣọ Ìgbàlódé produces branded T-shirts, polos, jerseys, corporate wear, caps and merchandise in Lagos, printed or embroidered to your brand colours.',
    og: 'aso-igbalode', ogAlt: 'The Aṣọ Ìgbàlódé range worn by four models',
    type: 'WebPage',
    trail: [['Brands', '/brands'], ['Aṣọ Ìgbàlódé', '/brands/aso-igbalode']],
    brand: 'aso-igbalode',
  },
  '/work': {
    title: 'Our Work in Print, Stage and Clothing | Brandfirst Media',
    description:
      'Photographs and film of real jobs: print runs and billboards, stages and lighting rigs, and branded clothing by Brandfirst Media, ROOM16 and Aṣọ Ìgbàlódé.',
    og: 'work', ogAlt: 'Print, stage and clothing work by Brandfirst Media, ROOM16 and Aṣọ Ìgbàlódé',
    type: 'CollectionPage',
    trail: [['Work', '/work']],
  },
  '/contact': {
    title: 'Contact Brandfirst Media | Print and Event Production, Lagos',
    description:
      'Call 0708 413 7772, WhatsApp 0806 6442508 or email info@brandfirstmedia.com. Tell us the job, the date and your artwork, and get back a plan and a price.',
    og: 'contact', ogAlt: 'Stage, screen and lighting set for a conference',
    type: 'ContactPage',
    trail: [['Contact', '/contact']],
  },
};

/** Any URL not listed above: the 404 page. Never indexed. */
export const NOT_FOUND = {
  title: 'Page Not Found | Brandfirst Media',
  description: 'This page does not exist. Find print, event and clothing production from Brandfirst Media, ROOM16 and Aṣọ Ìgbàlódé in Lagos.',
  og: 'home', ogAlt: 'Print, stage lighting and branded clothing produced by Brandfirst Media',
  type: 'WebPage',
  noindex: true,
};

/** Routes to prerender and list in the sitemap. */
export const PUBLIC_PATHS = Object.keys(PAGES);

/** Metadata for a pathname, ignoring a trailing slash. */
export function pageFor(pathname) {
  const path = pathname.replace(/\/+$/, '') || '/';
  return PAGES[path] ? { path, ...PAGES[path] } : { path, ...NOT_FOUND };
}
