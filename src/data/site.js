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
    // Two explicit lines; the longer one is 23 chars in Getaway and fits the
    // headline row at the clamp cap. "Brand first" is the company's own
    // phrase, kept as the promise the name makes.
    headlineLines: ['Print. Apparel. Events.', 'Your Brand First.'],
    headline: 'Print. Apparel. Events. Your Brand First.',
    // Short label for the left column of the lower hero row. The template puts
    // a 2-3 word label here (its own was "Who we are") against the large
    // statement on the right — the asymmetry is the point.
    label: 'What we do',
    // Kept short on purpose: this sits at 70px in the template's statement slot,
    // so a full paragraph would run to six lines. The three brands are named
    // in the intro section directly below.
    sub: 'A Lagos production group. We print it, dress your team in it, and light the stage it shows up on.',
    primary: { label: 'Start a Project', href: '/contact' },
    secondary: { label: 'See What We Produce', href: '/services' },
  },
  intro: {
    headline: 'One Team From Artwork to Event Night',
    body: [
      'Most campaigns come apart at the seams. The banner came from one supplier, the shirts from another, the stage from a third, and none of the colours agree. We produce all three under one roof, so the blues match and the deadlines line up.',
      'Brandfirst Media handles print and publicity. ROOM16 rigs the lighting and stage. Aṣọ Ìgbàlódé makes the apparel. One brief, one production team, one result.',
    ],
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
export const brands = [
  {
    slug: 'brandfirst-media',
    name: 'Brandfirst Media',
    kind: 'Parent brand',
    line: 'Print, publicity and event production',
    blurb: 'The parent brand. Print of all kinds, publicity, and the coordination that holds a campaign together across every surface it touches.',
    services: ['print-production', 'large-format-and-signage', 'publicity-and-brand-visibility'],
    accent: 'brand',
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
    // Social-post crop of the wordmark on fabric — the only Aṣọ Ìgbàlódé art
    // supplied so far. Swap for a clean logo/product shot when one exists.
    image: { src: '/assets/aso-igbalode-card.webp', srcSet: '/assets/aso-igbalode-card-sm.webp 600w, /assets/aso-igbalode-card.webp 1200w' },
    // Wider band of the same post for the detail-page hero (1204×550).
    heroImage: { src: '/assets/aso-igbalode-hero.webp', alt: 'Aṣọ Ìgbàlódé wordmark over folded red fabric' },
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
    headline: 'Let Us Talk About Your Brand',
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
