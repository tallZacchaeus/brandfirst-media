/**
 * Brandfirst Media website copy.
 *
 * Source: BrandfirstMedia-Website-Content.md ("Draft for client review").
 * Copy here is the client's own; anything the document left as a placeholder is
 * marked TODO rather than invented.
 */

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
      'Brandfirst Media is a production group in Lagos, Nigeria — print of all kinds, branded apparel, and event staging and lighting through ROOM16 and Aṣọ Ìgbàlódé.',
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
    sub: 'A production group in Lagos. Three in-house brands, one brief, and one team accountable from first proof to pack-down.',
    primary: { label: 'Start a Project', href: '/contact' },
    secondary: { label: 'See What We Produce', href: '/services' },
  },
  intro: {
    // Split so the lead phrase carries the section at headline size and the
    // qualifier sits under it a size down. Both are inside the same h2.
    headlineLead: 'One Team',
    headlineRest: 'From Artwork to Event Night',
    headline: 'One Team From Artwork to Event Night',
    body: [
      'Most campaigns come apart at the seams. The banner came from one supplier, the shirts from another, the stage from a third, and none of the colours agree. We produce all three under one roof, so the blues match and the deadlines line up.',
      'Brandfirst Media handles print and publicity. ROOM16 rigs the lighting and stage. Aṣọ Ìgbàlódé makes the apparel. One brief, one production team, one result.',
    ],
  },
  // The hero claims print, apparel and events; this section names the three
  // brands that deliver them so the claim is backed before the services list.
  group: {
    headline: 'One group, three brands',
    body: 'Brandfirst Media prints and publicises. ROOM16 lights and builds the stage. Aṣọ Ìgbàlódé dresses the team. One brief can book all three.',
  },
  why: {
    headline: 'Built for Deadlines and Colour That Matches',
    body: 'Production is judged on two things: did it arrive on time, and does it look like the artwork. We plan every job backwards from the event date, proof before we print, and match brand colours across paper, fabric and light.',
    highlights: [
      'Proofed before it prints',
      'Colour matched across paper, fabric and light',
      'Planned backwards from the event date',
      'One crew from load-in to strike',
      'Short runs and large runs, same standard',
    ],
  },
  industries: {
    headline: 'Who We Produce For',
    body: 'Anyone whose brand has to show up in print, on people, or on a stage — and has a date it must be ready by.',
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
    body: 'Send us the event, the deadline and the artwork. We will come back with a plan and a price.',
    button: { label: 'Contact Brandfirst Media', href: '/contact' },
  },
};

export const services = [
  {
    n: '01', slug: 'print-production', brand: 'brandfirst',
    title: 'Print Production',
    card: 'Print of all kinds — from business stationery and brochures to full campaign collateral, produced to a consistent standard.',
    body: 'Print is the core of what we do. We handle artwork preparation, proofing, production and delivery, so what arrives matches what was approved. Short runs and long runs, on stock that suits the job rather than whatever is cheapest.',
    includes: ['Artwork and pre-press preparation', 'Brochures, flyers and stationery', 'Proofing and colour checks', 'Short and long production runs', 'Finishing and binding', 'Delivery coordination'],
  },
  {
    n: '02', slug: 'large-format-and-signage', brand: 'brandfirst',
    title: 'Large Format and Signage',
    card: 'Banners, roll-ups, backdrops and outdoor signage sized and finished for the space they have to hold.',
    body: 'Large format is judged from a distance and up close at the same time. We produce banners, backdrops, pull-up stands and signage with the resolution and finishing to survive both, and we size artwork to the actual site rather than a template.',
    includes: ['Banners and backdrops', 'Roll-up and pull-up stands', 'Outdoor and site signage', 'Event and exhibition graphics', 'Substrate and finish selection', 'On-site fitting coordination'],
  },
  {
    n: '03', slug: 'branded-apparel', brand: 'aso-igbalode',
    title: 'Branded Apparel and Merchandise',
    card: 'Shirts, vests, caps and merchandise branded for teams, campaigns and events — delivered through Aṣọ Ìgbàlódé.',
    body: 'Aṣọ Ìgbàlódé is our apparel arm. We produce branded shirts, vests, caps and merchandise for corporate teams, campaigns, conferences and events, matching brand colours properly rather than approximately.',
    includes: ['Branded shirts and polos', 'Vests and workwear', 'Caps and headwear', 'Event and campaign merchandise', 'Colour matching to brand standards', 'Bulk production and sizing'],
  },
  {
    n: '04', slug: 'event-lighting', brand: 'room16',
    title: 'Event Lighting',
    card: 'Lighting rental, rigging and operation for events of any size — delivered through ROOM16.',
    body: 'ROOM16 supplies and sets up lighting for events. We plan the rig around the venue and the programme, install it, and operate it on the night, so the room looks the way it was designed to look rather than the way the house lights leave it.',
    includes: ['Lighting design for the venue', 'Rental of fixtures and control', 'Rigging and installation', 'On-site operation', 'Power and cabling planning', 'Strike and removal'],
  },
  {
    n: '05', slug: 'stage-and-event-equipment', brand: 'room16',
    title: 'Stage and Event Equipment',
    card: 'Staging, trussing and event equipment, set up and struck on schedule — delivered through ROOM16.',
    body: 'We supply and build the physical structure of an event: staging, trussing and the equipment around it. Setup and strike run to the programme, not the other way round, so rehearsal and handover happen when they were meant to.',
    includes: ['Stage supply and construction', 'Truss and rigging structures', 'Equipment rental', 'Setup and strike scheduling', 'Venue survey and load-in planning', 'On-site crew'],
  },
  {
    n: '06', slug: 'publicity-and-brand-visibility', brand: 'brandfirst',
    title: 'Publicity and Brand Visibility',
    card: 'Getting a brand seen — coordinating the print, the apparel and the event presence so they read as one campaign.',
    body: 'Most visibility problems are coordination problems: the banner, the shirts and the stage all exist but were ordered separately and do not match. We plan and produce them together so a campaign reads as one thing across every surface.',
    includes: ['Campaign visibility planning', 'Coordinated collateral across formats', 'Event brand presence', 'Brand consistency across production', 'Launch and activation support', 'Supplier and vendor coordination'],
  },
];

/** The group. Brandfirst Media is the parent; ROOM16 and Aṣọ Ìgbàlódé are
 *  in-house brands, not client work — labelled as such throughout. */
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

export const brands = [
  {
    slug: 'brandfirst-media',
    name: 'Brandfirst Media',
    kind: 'Parent brand',
    line: 'Print, publicity and event production',
    blurb: 'The parent brand. Print of all kinds, publicity, and the coordination that holds a campaign together across every surface it touches.',
    services: ['print-production', 'large-format-and-signage', 'publicity-and-brand-visibility'],
    accent: 'brand',
    logo: { src: '/assets/brandfirst-logo-sm.png', w: 300, h: 400, ratio: 'tall' },
    // The client's billboard design for PremiumTrust. It is a mockup, not a
    // photograph of an installed board, so the alt says "design" — the
    // installed board on the detail page is the real thing.
    image: media('bfm-billboard-design', PHOTO, 3024, 2016, 'Billboard design for PremiumTrust Bank'),
    heroImage: media('bfm-billboard', PHOTO, 4024, 1993, 'An installed roadside billboard printed by Brandfirst Media'),
    gallery: [
      media('bfm-press-operator', PHOTO, 1440, 2560, 'An operator guiding a sheet off the press'),
      media('bfm-rollups', PHOTO, 1784, 4131, 'Roll-up banners coming off the press'),
      media('bfm-banner-red', PHOTO, 1784, 4131, 'A large-format campaign banner'),
      media('bfm-finishing', PHOTO, 1784, 4131, 'The team laying out a printed banner for finishing'),
      media('bfm-press-run', PHOTO, 1784, 4132, 'A campaign print run on the press bed'),
      media('bfm-banners-green', PHOTO, 1784, 4132, 'Event banners printed and checked'),
    ],
    // Page content. Written from what the group has described about itself;
    // specific formats, turnaround and minimums should be confirmed by the client.
    offer: [
      ['Business print', 'Business cards, letterheads, flyers, brochures, folders and forms.'],
      ['Marketing print', 'Posters, handbills, stickers, labels, calendars and branded stationery.'],
      ['Large format', 'Banners, roll-ups, backdrops, billboards and vehicle and window graphics.'],
      ['Signage', 'Shop fronts, directional and event signage, cut vinyl and mounted boards.'],
      ['Publicity', 'Campaign coordination so print, outdoor, apparel and event all say the same thing.'],
      ['Event collateral', 'Programmes, badges, table cards, wristbands and everything else the day needs.'],
    ],
    process: [
      ['Brief', 'Tell us what the job is for, where it will be seen and when it is needed.'],
      ['Proof', 'You get artwork or a print proof to sign off before anything runs.'],
      ['Produce', 'We print, finish and quality-check in-house or with vetted partners.'],
      ['Deliver', 'Collected, delivered or installed on site — including event-day setup.'],
    ],
    useCases: ['Product launches', 'Conferences and AGMs', 'Retail and shop branding', 'Political and public campaigns', 'Church and school programmes', 'Weddings and private events'],
    faq: [
      ['Can you handle design as well as printing?', 'Yes. Send finished artwork if you have it, or brief us and we will design to your brand.'],
      ['What is the minimum order?', 'There is no fixed minimum for most business print. Large-format and signage are quoted per job.'],
      ['Do you deliver and install?', 'Yes, across Lagos, and further afield by arrangement. Signage and event print can be installed by our team.'],
    ],
    social: [{ label: 'Facebook', href: 'https://web.facebook.com/BrandfirstMedia' }],
  },
  {
    slug: 'room16',
    name: 'ROOM16',
    kind: 'In-house brand',
    line: 'Lighting and stage for events',
    blurb: 'ROOM16 rents, rigs and operates lighting and staging for events. Named after the shop number where the business began.',
    services: ['event-lighting', 'stage-and-event-equipment'],
    accent: 'room16',
    // The client's own artwork, used as supplied. It reads "RE16 Pro" while the
    // brand is named ROOM16 throughout the site; that is the client's call, made
    // after a redrawn ROOM16 version was offered and declined.
    logo: { src: '/assets/room16-logo.png', w: 380, h: 144, ratio: 'wide' },
    image: media('room16-live-beams', LIVE, 1080, 718, 'A ROOM16 lighting rig in use during a live event'),
    heroImage: media('room16-screens', FRAME, 832, 464, 'Stage, truss and LED screens built for a 74th anniversary event'),
    gallery: [
      media('room16-truss', FRAME, 832, 464, 'Truss and moving heads rigged over an outdoor stage'),
      media('room16-fixtures', FRAME, 832, 464, 'Moving-head fixtures staged before rigging'),
      media('room16-stage-lit', FRAME, 832, 464, 'The finished stage under a full lighting rig'),
      media('room16-live-red', LIVE, 1080, 692, 'Stage lighting during a live performance'),
      media('room16-live-wide', LIVE, 1080, 694, 'Beam and wash fixtures over a full stage'),
      media('room16-stage-night', FRAME, 832, 464, 'A ROOM16 stage lit green at night'),
    ],
    offer: [
      ['Stage lighting', 'Moving heads, LED pars, profiles and washes for stage and performance.'],
      ['Ambient and decor lighting', 'Uplighting, string and festoon, colour washes and gobo projection for venues.'],
      ['Stage and truss', 'Modular staging, truss structures, risers, steps and skirting.'],
      ['Rigging and power', 'Safe rigging, cabling and power distribution for the whole setup.'],
      ['Operation', 'A crew on site to programme, run and strike the show.'],
      ['Design', 'Lighting plans and stage layouts drawn to the venue before the day.'],
    ],
    process: [
      ['Site visit', 'We look at the venue, power and access, or work from your floor plan.'],
      ['Plan and quote', 'A lighting and stage plan with a quote for hire, crew and transport.'],
      ['Set up', 'Rig, focus and test ahead of the event, with time built in for rehearsal.'],
      ['Run and strike', 'Operated through the event, then taken down and cleared out.'],
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
    blurb: 'Where fashion meets identity. High-quality branded shirts, vests, caps and merchandise for teams, campaigns and events.',
    services: ['branded-apparel'],
    accent: 'aso',
    offer: [
      ['T-shirts and polos', 'Screen-printed, DTF or embroidered on quality cotton and blends.'],
      ['Vests and jerseys', 'Event vests, volunteer bibs and team jerseys with numbering.'],
      ['Caps and headwear', 'Embroidered caps, bucket hats and face caps in brand colours.'],
      ['Corporate wear', 'Embroidered shirts and uniforms for front-of-house and field teams.'],
      ['Merchandise', 'Tote bags, lanyards, wristbands and giveaway items to match the apparel.'],
      ['Custom pieces', 'Limited runs and statement pieces for campaigns and special occasions.'],
    ],
    process: [
      ['Brief', 'Quantities, sizes, colours and where the logo goes.'],
      ['Mockup', 'A visual mockup and, for larger runs, a physical sample to approve.'],
      ['Production', 'Printed or embroidered, checked piece by piece, packed by size.'],
      ['Delivery', 'Delivered ahead of the event, or handed over on site with the rest of the setup.'],
    ],
    useCases: ['Corporate teams', 'Event staff and volunteers', 'Political and public campaigns', 'Schools and alumni groups', 'Church and community groups', 'Brand launches and giveaways'],
    faq: [
      ['Which is better: printing or embroidery?', 'Embroidery suits polos, caps and corporate wear. Printing suits large, colourful designs and larger runs. We advise per job.'],
      ['Can I order a small quantity?', 'Yes. Small runs are possible; unit prices fall as quantity rises.'],
      ['Can you match our brand colours?', 'We work from your brand guide and match garment and thread or ink colours as closely as stock allows.'],
    ],
    image: media('aso-group', PHOTO, 5600, 4000, 'Four models in Aṣọ Ìgbàlódé jerseys'),
    heroImage: media('aso-group-wide', PHOTO, 5600, 4000, 'The Aṣọ Ìgbàlódé range worn by four models'),
    gallery: [
      media('aso-jersey-white', PHOTO, 4516, 5644, 'White Aṣọ Ìgbàlódé jersey with an orange 83'),
      media('aso-jersey-hold', PHOTO, 4708, 5884, 'A jersey held up to show the front print'),
      media('aso-back-print', PHOTO, 4844, 6055, 'Back of a jersey reading HALLELUYAH 83'),
      media('aso-pair-white', PHOTO, 4000, 5600, 'Two models in the white colourway'),
      media('aso-family', PHOTO, 4612, 5764, 'A customer and child in Aṣọ Ìgbàlódé apparel'),
      media('aso-solo-white', PHOTO, 4708, 5884, 'Full-length shot of the white jersey'),
      media('aso-corporate-wear', PHOTO, 4024, 1996, 'Branded corporate shirts bagged and ready to deliver'),
    ],
    social: [{ label: 'Instagram', href: 'https://www.instagram.com/asoigbalode/' }],
  },
];

export const about = {
  hero: {
    headline: 'About Brandfirst Media',
    sub: 'A production group in Lagos — print, publicity and events, with lighting and stage through ROOM16 and branded apparel through Aṣọ Ìgbàlódé.',
  },
  overview: [
    'The whole business began in a single shop. Today Brandfirst Media produces print of all kinds, runs publicity for brands and events, and — through ROOM16 — rents, rigs and operates lighting and stage. Aṣọ Ìgbàlódé, our apparel brand, dresses teams and campaigns in their own colours.',
    'The name is the promise. Whatever the job — a banner, a batch of shirts, a stage for a launch — the client’s brand comes first: their colours, their standard, their deadline.',
  ],
  philosophy: {
    headline: 'Brand First. Every Surface.',
    body: [
      'A brand only exists where people can see it: on paper, on a shirt, on a lit stage. Our job is to make it look the same, and look right, in every one of those places.',
      'That is why print, apparel and events sit under one roof. When one team handles all three, the blue on the banner is the blue on the polo is the blue in the wash across the stage.',
    ],
  },
  mission: 'To produce print, apparel and events that put the client’s brand first — on time, colour-accurate, and to a standard that holds up close.',
  vision: 'To be the production partner brands in Lagos call first, because one brief to us covers everything the event needs.',
  values: [
    { title: 'Craft',        text: 'Proof it, check it, then print it. The standard is the artwork, not “close enough”.' },
    { title: 'Reliability',  text: 'Event dates do not move. We plan backwards from them and deliver ahead of them.' },
    { title: 'Consistency',  text: 'One brand, one colour, every surface — paper, fabric and light.' },
    { title: 'Straight talk', text: 'Clear quotes, honest timelines, and a call the moment something changes.' },
    { title: 'Partnership',  text: 'We work with the client’s team as one crew, from first artwork to strike.' },
  ],
};

export const work = {
  hero: {
    headline: 'Our Work',
    sub: 'Print, apparel, lighting and stage — the jobs we have produced and the events we have built.',
  },
  cta: {
    headline: 'Have an Event Coming Up?',
    body: 'Send us the date, the venue and the artwork. We will plan the print, the apparel and the stage together.',
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
    sub: 'Practical notes on print, apparel and event production — the things we wish every client knew before they briefed us.',
  },
  intro: 'Short, useful reading for anyone who orders print, dresses a team, or runs an event. No theory — just what makes a job go well.',
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
    sub: 'A print run, a batch of branded apparel, or lighting and stage for an event — send the details and we will come back with a plan and a price.',
  },
  body: 'The more you send — artwork, quantities, the event date, the venue — the faster and more accurately we can quote.',
  fields: ['Name', 'Company or organization', 'Email address', 'Phone number', 'Service interest', 'Project budget range', 'Message'],
};

/* Work and Insights are intentionally absent. Both pages exist in the codebase
   but have no real content — publishing "Case study in preparation" five times
   advertises that the company cannot yet prove itself. Restore them here the
   day real projects and articles land. */
export const nav = [
  { label: 'Home',     href: '/' },
  { label: 'About',    href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Brands',   href: '/brands' },
  { label: 'Contact',  href: '/contact' },
];
