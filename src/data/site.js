/**
 * Brandfirst Media website copy.
 *
 * Source: BrandfirstMedia-Website-Content.md ("Draft for client review").
 * Copy here is the client's own; anything the document left as a placeholder is
 * marked TODO rather than invented.
 */

/** Builds an image entry from the optimised set in public/media. Every photo
 *  is exported at the widths listed here, so a srcSet is just the name plus the
 *  widths that exist for it — no point repeating the paths per entry. */
const media = (name, widths, w, h, alt) => ({
  src: `/media/${name}-${widths[0]}.webp`,
  srcSet: widths.map((x) => `/media/${name}-${x}.webp ${x}w`).join(', '),
  w, h, alt,
});
// Photographs: 480/900/1400. Frames pulled from the stage videos: 480/832,
// which is all the source footage holds.
const PHOTO = [480, 900, 1400];
const FRAME = [480, 832];
// Live stage stills, shot on a phone: 1080px is the source width.
const LIVE = [480, 900];

export const site = {
  name: 'Brandfirst Media',
  tagline: 'Print, Publicity and Event Production',
  location: 'Lagos, Nigeria',
  // From the Brandfirst Media Facebook Page.
  phone: '0814 212 2000',
  phoneIntl: '+2348142122000',
  // TODO: replace with a domain address before launch — a gmail.com address
  // undercuts the positioning on an agency/production site.
  email: 'brandfirstmedia@gmail.com',
  social: [{ label: 'Facebook', href: 'https://www.facebook.com/BrandfirstMedia' }],

  /**
   * Where contact-form submissions go.
   *
   * null means the form falls back to opening the visitor's mail client with
   * every field pre-filled. Unglamorous, but it cannot silently lose an
   * enquiry — which is exactly what the previous version did.
   *
   * To take submissions properly: create a form at https://formspree.io (the
   * free tier covers this volume), paste the endpoint here, and the form will
   * POST to it with success and error states. No other change needed.
   */
  formEndpoint: null,

  /** WhatsApp is how most Lagos SMB enquiries actually arrive. */
  whatsapp: '2348142122000',

  meta: {
    title: 'Brandfirst Media | Print, Publicity and Event Production in Lagos',
    description:
      'Brandfirst Media is a production group in Lagos, Nigeria: print of all kinds, branded apparel, and event staging and lighting through ROOM16 and Aṣọ Ìgbàlódé.',
  },
};

export const home = {
  hero: {
    // What the group does, one pill per item, stacked. Ordered shortest to
    // longest rather than alphabetically or by importance: set left-aligned in
    // a column, that is what gives the block its stepped edge. Reordering is
    // safe here because these are three items in a list, not a sentence — and
    // DOM order is kept identical to visual order so it reads the same aloud.
    headlineLines: ['Print.', 'Events.', 'Apparel.'],
    headline: 'Print. Events. Apparel.',
    // Support, not a second headline. An earlier version restated the three
    // words in the headline at 70px, which gave the first screen two competing
    // display blocks. This adds what the headline cannot say: where we are, how
    // the group is structured, and who carries the job.
    sub: 'A production group in Lagos. One brief, three in-house brands, and one team accountable from first proof to final strike.',
    primary: { label: 'Start a Project', href: '/contact' },
    secondary: { label: 'See What We Do', href: '/services' },
  },
  intro: {
    // Split so the lead phrase carries the section at headline size and the
    // qualifier sits under it a size down. Both are inside the same h2.
    headlineLead: 'One Team',
    headlineRest: 'From Artwork to Event Night',
    headline: 'One Team From Artwork to Event Night',
    body: [
      'Most campaigns come apart at the seams. The banner came from one supplier, the shirts from another, the stage from a third, and none of the colours agree. We produce all three under one roof, so the blues match and the deadlines line up.',
    ],
  },
  // The hero claims print, apparel and events; this section names the three
  // brands that deliver them so the claim is backed before the services list.
  // The cards carry the detail, so the heading stands alone.
  group: {
    headline: 'One group, three brands',
  },
  why: {
    headline: 'Deadlines That Hold. Colour That Matches.',
    body: 'Production is judged on two things: did it arrive when it was promised, and does it look like the artwork. So we schedule every job backwards from your date, proof before anything runs, and hold one colour standard across paper, fabric and light.',
    highlights: [
      'Proofed and signed off before it runs',
      'One colour standard on paper, fabric and light',
      'Scheduled backwards from your date',
      'One crew from load-in to strike',
      'Same standard at fifty pieces or five thousand',
    ],
  },
  industries: {
    headline: 'Who We Produce For',
    body: 'Anyone whose brand has to show up in print, on people, or on a stage, and has a date it cannot miss.',
    sectors: [
      'Corporate organisations',
      'Event and conference organisers',
      'Consumer and retail brands',
      'Public sector and government',
      'Nonprofits and development organisations',
      'Schools and professional bodies',
      'Campaigns and activations',
    ],
  },
  cta: {
    headline: 'Ready to Put Your Brand First?',
    body: 'Tell us the job, the date, and whatever artwork you already have. You will get back a plan and a price, not a holding email.',
    button: { label: 'Contact Brandfirst Media', href: '/contact' },
  },
};

export const services = [
  {
    n: '01', slug: 'print-production', brand: 'brandfirst',
    image: media('bfm-press-run', PHOTO, 1784, 3990, 'A campaign print run on the press bed'),
    title: 'Print Production',
    card: 'Everything a brand puts on paper, from stationery and brochures to full campaign collateral, held to one standard run after run.',
    body: 'Print is where this business started, and it is still the centre of it. We prepare the artwork, proof it, produce it and get it to you, so what arrives is what you signed off. Short runs and long runs, on stock chosen to suit the job rather than to flatter the quote.',
    includes: ['Artwork and pre-press preparation', 'Brochures, flyers and stationery', 'Proofing and colour checks', 'Short and long production runs', 'Finishing and binding', 'Delivery coordination'],
  },
  {
    n: '02', slug: 'large-format-and-signage', brand: 'brandfirst',
    image: media('bfm-billboard', PHOTO, 4024, 1713, 'An installed roadside billboard'),
    title: 'Large Format and Signage',
    card: 'Banners, roll-ups, backdrops and outdoor signage, sized and finished for the space they actually have to fill.',
    body: 'Large format gets read from across a car park and from two feet away, and it has to hold up at both distances. We produce banners, backdrops, pull-up stands and signage at a resolution and finish that survive weather and handling. We size the artwork to the real site rather than to a template.',
    includes: ['Banners and backdrops', 'Roll-up and pull-up stands', 'Outdoor and site signage', 'Event and exhibition graphics', 'Substrate and finish selection', 'On-site fitting coordination'],
  },
  {
    n: '03', slug: 'branded-apparel', brand: 'aso-igbalode',
    image: media('aso-jersey-white', PHOTO, 4516, 5644, 'A branded jersey from the Aṣọ Ìgbàlódé range'),
    title: 'Branded Apparel and Merchandise',
    card: 'Shirts, vests, caps and merchandise for teams, campaigns and events, produced by Aṣọ Ìgbàlódé.',
    body: 'Aṣọ Ìgbàlódé is our apparel brand. It dresses corporate teams, campaign volunteers, conference staff and event crews in their own colours, matched properly rather than approximately, so the polo agrees with the banner standing behind it.',
    includes: ['Branded shirts and polos', 'Vests and workwear', 'Caps and headwear', 'Event and campaign merchandise', 'Colour matching to brand standards', 'Bulk production and sizing'],
  },
  {
    n: '04', slug: 'event-lighting', brand: 'room16',
    image: media('room16-live-beams', LIVE, 1080, 718, 'A lighting rig in use during a live event'),
    title: 'Event Lighting',
    card: 'Lighting hire, rigging and operation for events of any size, delivered by ROOM16.',
    body: 'ROOM16 supplies and sets up lighting for events. We plan the rig around your venue and your running order, install it, and operate it on the night, so the room looks the way it was designed to look rather than the way the house lights leave it.',
    includes: ['Lighting design for the venue', 'Rental of fixtures and control', 'Rigging and installation', 'On-site operation', 'Power and cabling planning', 'Strike and removal'],
  },
  {
    n: '05', slug: 'stage-and-event-equipment', brand: 'room16',
    image: media('room16-truss', FRAME, 832, 464, 'Truss and moving heads rigged over an outdoor stage'),
    title: 'Stage and Event Equipment',
    card: 'Staging, truss and the equipment around them, built and struck to your running order, delivered by ROOM16.',
    body: 'We build the physical structure of an event: staging, truss, and everything that hangs off it. Set-up and strike run to your programme rather than the other way round, so rehearsal and handover happen when they were meant to.',
    includes: ['Stage supply and construction', 'Truss and rigging structures', 'Equipment rental', 'Setup and strike scheduling', 'Venue survey and load-in planning', 'On-site crew'],
  },
  {
    n: '06', slug: 'publicity-and-brand-visibility', brand: 'brandfirst',
    image: media('bfm-billboard-design', PHOTO, 3024, 2016, 'Billboard design for PremiumTrust Bank'),
    title: 'Publicity and Brand Visibility',
    card: 'Print, apparel and event presence planned together, so a campaign reads as one thing wherever it turns up.',
    body: 'Most visibility problems are really coordination problems. The banner, the shirts and the stage all exist, but they came from three suppliers and none of them quite match. We plan and produce them together, so the campaign looks deliberate on every surface it touches.',
    includes: ['Campaign visibility planning', 'Coordinated collateral across formats', 'Event brand presence', 'Brand consistency across production', 'Launch and activation support', 'Supplier and vendor coordination'],
  },
];

/** The group. Brandfirst Media is the parent; ROOM16 and Aṣọ Ìgbàlódé are
 *  in-house brands, not client work — labelled as such throughout. */

export const brands = [
  {
    slug: 'brandfirst-media',
    name: 'Brandfirst Media',
    kind: 'Parent brand',
    line: 'Print, publicity and event production',
    blurb: 'The parent brand: print of every kind, publicity, and the coordination that keeps a campaign consistent wherever it appears.',
    services: ['print-production', 'large-format-and-signage', 'publicity-and-brand-visibility'],
    accent: 'brand',
    logo: { src: '/assets/brandfirst-logo-sm.png', w: 300, h: 400, ratio: 'tall' },
    // The client's billboard design for PremiumTrust. It is a mockup, not a
    // photograph of an installed board, so the alt says "design" — the
    // installed board on the detail page is the real thing.
    image: media('bfm-billboard-design', PHOTO, 3024, 2016, 'Billboard design for PremiumTrust Bank'),
    heroImage: media('bfm-billboard', PHOTO, 4024, 1713, 'An installed roadside billboard printed by Brandfirst Media'),
    // Page content. Written from what the group has described about itself;
    // specific formats, turnaround and minimums should be confirmed by the client.
    offer: [
      ['Business print', 'Business cards, letterheads, flyers, brochures, folders and forms.'],
      ['Marketing print', 'Posters, handbills, stickers, labels, calendars and branded stationery.'],
      ['Large format', 'Banners, roll-ups, backdrops, billboards and vehicle and window graphics.'],
      ['Signage', 'Shop fronts, directional and event signage, cut vinyl and mounted boards.'],
      ['Publicity', 'Coordinating print, outdoor, apparel and event so they all say the same thing.'],
      ['Event collateral', 'Programmes, badges, table cards, wristbands: the small print a day runs on.'],
    ],
    process: [
      ['Brief', 'What the job is for, where it will be seen, and the date it has to be ready.'],
      ['Proof', 'Artwork or a printed proof to sign off. Nothing runs until you approve it.'],
      ['Produce', 'Printed, finished and checked, either in-house or with partners we already trust.'],
      ['Deliver', 'Collected, delivered or installed on site, event-day set-up included.'],
    ],
    useCases: ['Product launches', 'Conferences and AGMs', 'Retail and shop branding', 'Political and public campaigns', 'Church and school programmes', 'Weddings and private events'],
    faq: [
      ['Can you handle the design as well as the printing?', 'Yes. Send finished artwork if you have it, or brief us and we will design to your brand.'],
      ['What is the minimum order?', 'There is no fixed minimum on most business print. Large format and signage are quoted per job.'],
      ['Do you deliver and install?', 'Yes, across Lagos, and further afield by arrangement. Our team can install signage and event print.'],
    ],
    social: [{ label: 'Facebook', href: 'https://web.facebook.com/BrandfirstMedia' }],
  },
  {
    slug: 'room16',
    name: 'ROOM16',
    kind: 'In-house brand',
    line: 'Lighting and stage for events',
    blurb: 'ROOM16 hires out, rigs and operates lighting and staging for events. It is named after the shop number where the whole business started.',
    services: ['event-lighting', 'stage-and-event-equipment'],
    accent: 'room16',
    // The client's own artwork, used as supplied. It reads "RE16 Pro" while the
    // brand is named ROOM16 throughout the site; that is the client's call, made
    // after a redrawn ROOM16 version was offered and declined.
    logo: { src: '/assets/room16-logo.png', w: 380, h: 144, ratio: 'wide' },
    image: media('room16-live-beams', LIVE, 1080, 718, 'A ROOM16 lighting rig in use during a live event'),
    heroImage: media('room16-screens', FRAME, 832, 464, 'Stage, truss and LED screens built for a 74th anniversary event'),
    offer: [
      ['Stage lighting', 'Moving heads, LED pars, profiles and washes for stage and performance.'],
      ['Ambient and decor lighting', 'Uplighting, festoon and string, colour washes and gobo projection.'],
      ['Stage and truss', 'Modular staging, truss structures, risers, steps and skirting.'],
      ['Rigging and power', 'Safe rigging, cabling and power distribution across the whole set-up.'],
      ['Operation', 'A crew on site to programme the rig, run the show and strike it.'],
      ['Design', 'Lighting plans and stage layouts drawn to your venue before the day.'],
    ],
    process: [
      ['Site visit', 'We walk the venue for power, access and sightlines, or work from your floor plan.'],
      ['Plan and quote', 'A lighting and stage plan, priced for hire, crew and transport.'],
      ['Set up', 'Rigged, focused and tested ahead of the day, with rehearsal time built in.'],
      ['Run and strike', 'Operated through the event, then struck and cleared the same night.'],
    ],
    useCases: ['Concerts and live shows', 'Product launches', 'Conferences and award nights', 'Church and worship events', 'Weddings and receptions', 'Fashion shows and pageants'],
    faq: [
      ['Do you supply an operator?', 'Yes. Every hire includes a crew to set up, and a lighting operator can run the show for the duration.'],
      ['Can you work in a venue with limited power?', 'We survey power on the site visit and bring distribution, and can advise on generator sizing.'],
      ['How far ahead should we book?', 'Two weeks is comfortable for most events. Large stage builds or peak dates should be booked earlier.'],
    ],
    social: [],
  },
  {
    slug: 'aso-igbalode',
    name: 'Aṣọ Ìgbàlódé',
    kind: 'In-house brand',
    line: 'Branded apparel',
    blurb: 'Our apparel brand. Shirts, jerseys, vests, caps and merchandise, branded for teams, campaigns and events. Made to be worn again, not just on the day.',
    services: ['branded-apparel'],
    accent: 'aso',
    offer: [
      ['T-shirts and polos', 'Screen-printed, DTF or embroidered on quality cotton and blends.'],
      ['Vests and jerseys', 'Event vests, volunteer bibs and team jerseys, numbered if you need them.'],
      ['Caps and headwear', 'Embroidered caps, bucket hats and face caps in your brand colours.'],
      ['Corporate wear', 'Embroidered shirts and uniforms for front-of-house and field teams.'],
      ['Merchandise', 'Tote bags, lanyards, wristbands and giveaways to match the apparel.'],
      ['Custom pieces', 'Limited runs and statement pieces for campaigns and special occasions.'],
    ],
    process: [
      ['Brief', 'Quantities, sizes, colours, and where the logo sits.'],
      ['Mockup', 'A visual to approve, plus a physical sample first on larger runs.'],
      ['Production', 'Printed or embroidered, checked piece by piece, packed by size.'],
      ['Delivery', 'Delivered before the event, or handed over on site with the rest of the set-up.'],
    ],
    useCases: ['Corporate teams', 'Event staff and volunteers', 'Political and public campaigns', 'Schools and alumni groups', 'Church and community groups', 'Brand launches and giveaways'],
    faq: [
      ['Printing or embroidery: which should I choose?', 'Embroidery suits polos, caps and corporate wear. Printing suits large, colourful designs and bigger runs. We will advise once we see the artwork.'],
      ['Can I order a small quantity?', 'Yes. Small runs are fine; the unit price simply falls as the quantity rises.'],
      ['Can you match our brand colours?', 'We work from your brand guide and match thread or ink as closely as the stock allows.'],
    ],
    image: media('aso-group', PHOTO, 5600, 4000, 'Four models in Aṣọ Ìgbàlódé jerseys'),
    heroImage: media('aso-group-wide', PHOTO, 5600, 4000, 'The Aṣọ Ìgbàlódé range worn by four models'),
    social: [{ label: 'Instagram', href: 'https://www.instagram.com/asoigbalode/' }],
  },
];

export const about = {
  hero: {
    headline: 'About Brandfirst Media',
    sub: 'A production group in Lagos. Print and publicity in-house, lighting and stage through ROOM16, branded apparel through Aṣọ Ìgbàlódé.',
  },
  overview: [
    'The whole business started in a single shop. Today Brandfirst Media prints, publicises, dresses and builds: campaign collateral and large format in-house, lighting and staging through ROOM16, branded apparel through Aṣọ Ìgbàlódé.',
    'The name is the promise. Whatever the job, whether a run of brochures, a batch of shirts or a stage for a launch, the client’s brand comes first. Their colours, their standard, their date.',
  ],
  philosophy: {
    headline: 'Brand First. Every Surface.',
    body: [
      'A brand only exists where people can actually see it: on paper, on a shirt, on a lit stage. Our job is to make it look right in each of those places, and to make it look like the same brand in all three.',
      'That is why print, apparel and events sit under one roof. When one team handles all three, the blue on the banner is the blue on the polo is the blue washing across the stage. Nobody has to chase three suppliers to find out why it is not.',
    ],
  },
  mission: 'To produce print, apparel and events that put the client’s brand first: delivered on time, matched to colour, and finished to a standard that holds up close.',
  vision: 'To be the production partner brands in Lagos call first, because a single brief to us covers everything the day needs.',
  values: [
    { title: 'Craft',         text: 'Proof it, check it, then run it. The standard is the artwork, not “close enough”.' },
    { title: 'Reliability',   text: 'Event dates do not move. We plan backwards from them and aim to be finished early.' },
    { title: 'Consistency',   text: 'One brand, one colour, every surface: paper, fabric and light.' },
    { title: 'Straight talk', text: 'Clear quotes, honest timelines, and a phone call the moment something changes.' },
    { title: 'Partnership',   text: 'We work alongside the client’s team as one crew, from first artwork to final strike.' },
  ],
};

/** Everything in public/media, tagged by discipline, for the Work page. One
 *  list: the page filters it rather than keeping three that can drift apart.
 *  `tag` drives the filter chips; `brand` drives the accent. */
/** The client's own footage, trimmed to ~10s loops and re-encoded for the web
 *  (see public/media). Silent production clips rather than films with sound, so
 *  they play muted. `brand` puts each on the right brand page; the Work page
 *  shows all of them. */
export const videos = [
  { name: 'vid-print-wideformat', w: 540, h: 960, tag: 'Print',  brand: 'brand',
    alt: 'A wide-format press running a full-colour panel' },
  { name: 'vid-print-banner', w: 540, h: 960, tag: 'Print',  brand: 'brand',
    alt: 'A campaign banner coming off the press' },
  { name: 'vid-print-check', w: 540, h: 960, tag: 'Print',  brand: 'brand',
    alt: 'Checking colour and registration against the artwork' },
  { name: 'vid-print-run', w: 540, h: 960, tag: 'Print',  brand: 'brand',
    alt: 'An event print run feeding through the machine' },
  { name: 'vid-stage-beams', w: 832, h: 464, tag: 'Events', brand: 'room16',
    alt: 'Beam fixtures working an indoor stage' },
  { name: 'vid-stage-green', w: 832, h: 464, tag: 'Events', brand: 'room16',
    alt: 'A full outdoor rig lit for the evening' },
  { name: 'vid-event-white', w: 540, h: 960, tag: 'Events', brand: 'room16',
    alt: 'Stage and lighting built for a white-themed event' },
  { name: 'vid-event-decor', w: 540, h: 960, tag: 'Events', brand: 'room16',
    alt: 'Decor lighting across a finished event set' },
];

export const showcase = [
  // --- Print and large format ---
  { ...media('bfm-billboard-design', PHOTO, 3024, 2016, 'Billboard design for PremiumTrust Bank'), tag: 'Print', brand: 'brand' },
  { ...media('bfm-billboard', PHOTO, 4024, 1713, 'Installed roadside billboard'), tag: 'Print', brand: 'brand' },
  { ...media('bfm-wide-format', PHOTO, 4000, 1800, 'A wide-format press running a printed panel'), tag: 'Print', brand: 'brand' },
  { ...media('bfm-press-operator', PHOTO, 1440, 2560, 'An operator guiding a sheet off the press'), tag: 'Print', brand: 'brand' },
  { ...media('bfm-press-run', PHOTO, 1784, 3990, 'A campaign print run on the press bed'), tag: 'Print', brand: 'brand' },
  { ...media('bfm-rollups', PHOTO, 1784, 3991, 'Roll-up banners coming off the press'), tag: 'Print', brand: 'brand' },
  { ...media('bfm-banner-red', PHOTO, 1784, 3991, 'A large-format campaign banner'), tag: 'Print', brand: 'brand' },
  { ...media('bfm-banners-green', PHOTO, 1784, 3990, 'Event banners printed and checked'), tag: 'Print', brand: 'brand' },
  { ...media('bfm-finishing', PHOTO, 1784, 3991, 'The team laying out a printed banner for finishing'), tag: 'Print', brand: 'brand' },

  // --- Lighting, stage and events ---
  { ...media('room16-live-beams', LIVE, 1080, 718, 'A lighting rig in use during a live event'), tag: 'Events', brand: 'room16' },
  { ...media('room16-live-red', LIVE, 1080, 692, 'Stage lighting during a live performance'), tag: 'Events', brand: 'room16' },
  { ...media('room16-live-wide', LIVE, 1080, 694, 'Beam and wash fixtures over a full stage'), tag: 'Events', brand: 'room16' },
  { ...media('room16-stage-night', FRAME, 832, 464, 'A stage lit green at night'), tag: 'Events', brand: 'room16' },
  { ...media('room16-stage-lit', FRAME, 832, 464, 'The finished stage under a full lighting rig'), tag: 'Events', brand: 'room16' },
  { ...media('room16-screens', FRAME, 832, 464, 'Stage, truss and LED screens built for an anniversary event'), tag: 'Events', brand: 'room16' },
  { ...media('room16-truss', FRAME, 832, 464, 'Truss and moving heads rigged over an outdoor stage'), tag: 'Events', brand: 'room16' },
  { ...media('room16-fixtures', FRAME, 832, 464, 'Moving-head fixtures staged before rigging'), tag: 'Events', brand: 'room16' },

  // --- Branded apparel ---
  { ...media('aso-group', PHOTO, 5600, 4000, 'Four models in Aṣọ Ìgbàlódé jerseys'), tag: 'Apparel', brand: 'aso' },
  { ...media('aso-group-wide', PHOTO, 5600, 4000, 'The Aṣọ Ìgbàlódé range worn by four models'), tag: 'Apparel', brand: 'aso' },
  { ...media('aso-jersey-white', PHOTO, 4516, 5644, 'White jersey with an orange 83'), tag: 'Apparel', brand: 'aso' },
  { ...media('aso-jersey-hold', PHOTO, 4708, 5884, 'A jersey held up to show the front print'), tag: 'Apparel', brand: 'aso' },
  { ...media('aso-back-print', PHOTO, 4844, 6055, 'Back of a jersey reading HALLELUYAH 83'), tag: 'Apparel', brand: 'aso' },
  { ...media('aso-pair-orange', PHOTO, 4000, 5600, 'Two models in the orange colourway'), tag: 'Apparel', brand: 'aso' },
  { ...media('aso-pair-white', PHOTO, 4000, 5600, 'Two models in the white colourway'), tag: 'Apparel', brand: 'aso' },
  { ...media('aso-duo-studio', PHOTO, 4916, 6144, 'Two models photographed on white'), tag: 'Apparel', brand: 'aso' },
  { ...media('aso-solo-white', PHOTO, 4708, 5884, 'Full-length shot of the white jersey'), tag: 'Apparel', brand: 'aso' },
  { ...media('aso-family', PHOTO, 4612, 5764, 'A customer and child in Aṣọ Ìgbàlódé apparel'), tag: 'Apparel', brand: 'aso' },
  { ...media('aso-corporate-wear', PHOTO, 4024, 1713, 'Branded corporate shirts bagged and ready to deliver'), tag: 'Apparel', brand: 'aso' },
];

export const work = {
  hero: {
    headline: 'Our Work',
    sub: 'Print, apparel, lighting and stage. Jobs we have produced and events we have built, photographed on the floor and on site rather than staged for a brochure.',
  },
  cta: {
    headline: 'Have an Event Coming Up?',
    body: 'Send us the date, the venue and the artwork. We will plan the print, the apparel and the stage as one job, and quote it that way.',
    button: { label: 'Start a Project', href: '/contact' },
  },
  /**
   * TODO: replace with real projects and images. These are placeholders shaped
   * like the work the group actually does, so a visitor understands the offer
   * even before real cases land. Titles only — no invented clients or metrics.
   */
  placeholders: [
    { slug: 'conference-print-and-stage',  title: 'Conference Print, Backdrop and Stage Package',     sector: 'Corporate event' },
    { slug: 'product-launch-lighting',     title: 'Event Lighting and Stage for a Product Launch',    sector: 'Launch' },
    { slug: 'corporate-team-apparel',      title: 'Branded Apparel for a Corporate Team',             sector: 'Apparel' },
    { slug: 'campaign-large-format',       title: 'Large-Format Banners and Signage for a Campaign',  sector: 'Print' },
    { slug: 'full-brand-activation',       title: 'Full Activation: Print, Apparel and Lighting',     sector: 'Activation' },
  ],
};

export const insights = {
  hero: {
    headline: 'Insights',
    sub: 'Practical notes on print, apparel and event production: the things that save a job when you know them early.',
  },
  intro: 'Short, useful reading for anyone who orders print, dresses a team, or runs an event. No theory, just what makes the difference between a job that lands and one that limps.',
  /** TODO: planned subjects, not yet written. Hide the route from the nav if
   *  these are still unwritten at launch. */
  topics: [
    'What to send your printer so the job comes out right',
    'How to brief a lighting and stage setup for your venue',
    'Getting brand colours to match on paper, fabric and screen',
    'A realistic production timeline, working backwards from the event date',
  ],
};

export const contact = {
  hero: {
    headline: 'Let\u2019s Talk About Your Brand',
    sub: 'A print run, a batch of branded apparel, or lighting and stage for an event. Tell us what you need and when you need it, and we will come back with a plan and a price.',
  },
  body: 'The more you can tell us (artwork, quantities, the event date, the venue), the faster the quote comes back, and the closer it will be to the final figure.',
  fields: ['Name', 'Company or organization', 'Email address', 'Phone number', 'Service interest', 'Project budget range', 'Message'],
};

/* Insights is intentionally absent: the page exists but its articles are still
   unwritten, and an empty journal advertises that nobody is minding it. Add it
   here the day the first pieces are published. */
export const nav = [
  { label: 'Home',     href: '/' },
  { label: 'About',    href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Work',     href: '/work' },
  {
    label: 'Brands',
    href: '/brands',
    // The header already supports a submenu; these give it one.
    children: [
      { label: 'Brandfirst Media', href: '/brands/brandfirst-media' },
      { label: 'ROOM16',           href: '/brands/room16' },
      { label: 'Aṣọ Ìgbàlódé',     href: '/brands/aso-igbalode' },
    ],
  },
  { label: 'Contact',  href: '/contact' },
];
