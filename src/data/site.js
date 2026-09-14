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
    // Two explicit lines. Natural wrapping broke to three at common laptop
    // widths and two on wide screens, so the balanced split is fixed here.
    headlineLines: ['Putting Your Brand First', 'in Every Media Decision'],
    headline: 'Putting Your Brand First in Every Media Decision',
    // Short label for the left column of the lower hero row. The template puts
    // a 2-3 word label here (its own was "Who we are") against the large
    // statement on the right — the asymmetry is the point.
    label: 'What we do',
    // Kept short on purpose: this sits at 70px in the template's statement slot,
    // so a full paragraph would run to six lines. The longer version lives in
    // the intro section directly below.
    sub: 'We help businesses plan, create, deliver and measure campaigns across traditional and digital media.',
    primary: { label: 'Start a Project', href: '/contact' },
    secondary: { label: 'Explore Our Services', href: '/services' },
  },
  intro: {
    headline: 'Strategic Media Solutions for Brands That Want to Grow',
    body: [
      'Strong brands are not built by visibility alone. They are built through consistent messaging, smart channel choices, audience insight, and disciplined execution.',
      'Brandfirst Media works with organizations to make their communications more focused, more engaging, and more effective. We support clients across brand strategy, media planning, digital communication, campaign management, and measurement.',
    ],
  },
  why: {
    headline: 'Built Around Strategy, Reach, and Results',
    body: 'Every campaign needs more than creative ideas. It needs a clear objective, a defined audience, the right channel mix, and a practical way to measure success. Brandfirst Media brings these pieces together so brands can communicate with purpose and confidence.',
    highlights: [
      'Audience-led planning',
      'Integrated campaign thinking',
      'Traditional and digital media experience',
      'Clear reporting and performance review',
      'Practical strategies tailored to each client',
    ],
  },
  industries: {
    headline: 'Supporting Brands Across Sectors',
    body: 'We work with brands, organizations, and institutions that need stronger communication, better visibility, and more effective audience engagement.',
    sectors: [
      'Consumer brands',
      'Corporate organizations',
      'Financial services',
      'Public sector and government agencies',
      'Nonprofits and development organizations',
      'Education and professional services',
      'Retail and lifestyle brands',
    ],
  },
  cta: {
    headline: 'Ready to Put Your Brand First?',
    body: 'Let us help you plan and deliver a campaign that reaches the right audience and supports your business goals.',
    button: { label: 'Contact Brandfirst Media', href: '/contact' },
  },
};

/**
 * Services — the production group's actual offer, drawn from the Facebook Page
 * ("print, publicity and events. Stage and light hiring.") and the three brands.
 * `brand` ties a service to the brand that delivers it.
 */
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
    social: [{ label: 'Instagram', href: 'https://www.instagram.com/asoigbalode/' }],
  },
];

export const about = {
  hero: {
    headline: 'About Brandfirst Media',
    sub: 'A media and brand communications agency focused on helping organizations reach, engage, and influence their audiences.',
  },
  overview: [
    'Brandfirst Media is a strategic media and communications agency based in Lagos, Nigeria. We help brands and organizations develop communication plans, execute campaigns, manage media visibility, and measure campaign performance.',
    'Our work is guided by a simple idea: the brand must come first. Before media is bought, content is produced, or campaigns are launched, we focus on the audience, the message, and the result the brand needs to achieve.',
  ],
  philosophy: {
    headline: 'Brand First. Audience Always.',
    body: [
      'We believe effective communication starts with understanding. A campaign should not only be visible; it should be relevant, consistent, and useful to the people it is meant to reach.',
      'That is why we combine media thinking, brand strategy, social communication, and performance measurement to help clients make informed decisions and build stronger relationships with their audiences.',
    ],
  },
  mission: 'To help brands communicate clearly, reach the right people, and achieve measurable results through strategic media and integrated marketing communication.',
  vision: 'To be a trusted media and communications partner for brands that want to build visibility, relevance, and long-term value.',
  values: [
    { title: 'Strategy',       text: 'We start with the objective, the audience, and the message before choosing channels.' },
    { title: 'Clarity',        text: 'We make communication focused, consistent, and easy to understand.' },
    { title: 'Accountability', text: 'We believe campaigns should be reviewed, measured, and improved.' },
    { title: 'Creativity',     text: 'We develop ideas and messages that help brands stand out meaningfully.' },
    { title: 'Partnership',    text: 'We work closely with clients to understand their goals and deliver practical solutions.' },
  ],
};

export const work = {
  hero: {
    headline: 'Our Work',
    sub: 'Campaign thinking, media strategy, and communication support for brands that need to be seen, heard, and remembered.',
  },
  cta: {
    headline: 'Have a Campaign in Mind?',
    body: 'Let us help you turn your objective into a clear media and communication plan.',
    button: { label: 'Start a Project', href: '/contact' },
  },
  /**
   * TODO: replace with approved client work. The content document supplies
   * these titles as placeholders and a case-study format (client, sector,
   * challenge, solution, channels, results) to fill in once available.
   */
  placeholders: [
    { slug: 'brand-awareness-campaign',   title: 'Brand Awareness Campaign for a Consumer Brand',      sector: 'Consumer brands' },
    { slug: 'integrated-media-launch',    title: 'Integrated Media Launch for a Corporate Organization', sector: 'Corporate' },
    { slug: 'social-media-strategy',      title: 'Social Media Strategy for Audience Engagement',       sector: 'Digital' },
    { slug: 'public-communication',       title: 'Public Communication Campaign for an Institution',    sector: 'Public sector' },
    { slug: 'multi-channel-review',       title: 'Performance Review for a Multi-Channel Campaign',     sector: 'Measurement' },
  ],
};

export const insights = {
  hero: {
    headline: 'Insights',
    sub: 'Practical thinking on media, marketing communication, brand visibility, digital engagement, and campaign measurement.',
  },
  intro: 'Brandfirst Media shares practical insights to help businesses and organizations make better communication decisions. Our articles focus on strategy, media planning, brand visibility, customer engagement, and performance measurement.',
  /** TODO: suggested topics from the content document — not yet written articles. */
  topics: [
    'Why every brand needs a clear media strategy before buying media',
    'How integrated marketing communication improves campaign performance',
    'What brands should measure after a campaign',
    'The role of social media in customer engagement',
    'How to choose the right media channels for your audience',
    'Why brand consistency matters across traditional and digital platforms',
    'Turning audience insights into stronger campaign ideas',
    'What businesses should know before launching a digital campaign',
  ],
};

export const contact = {
  hero: {
    headline: 'Let Us Talk About Your Brand',
    sub: 'Whether you are planning a campaign, launching a product, strengthening your brand presence, or reviewing your media performance, Brandfirst Media can help.',
  },
  body: 'Tell us what you want to achieve and we will help you identify the right communication approach. Share a few details about your brand, your audience, and your campaign goals.',
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
