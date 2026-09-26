import { brands, services, site } from '../data/site';
import { SITE_URL, absolute, LANGUAGE } from './config';

/**
 * JSON-LD for a page, as one connected @graph:
 *
 *   Organization + ProfessionalService   Brandfirst Media (every page)
 *   Brand                                ROOM16, Aṣọ Ìgbàlódé (every page)
 *   WebSite                              (every page)
 *   WebPage / AboutPage / ContactPage /
 *   CollectionPage                       the page itself
 *   BreadcrumbList                       inner and brand pages
 *   Service                              /services (all nine), brand pages (their three)
 *   FAQPage                              brand pages, from their visible Q&A
 *
 * Only facts the site already states: name, Lagos, the call and WhatsApp
 * numbers, the shared inbox, the logo and the three Instagram accounts. No
 * street address, opening hours, reviews, ratings or prices, because none has
 * been confirmed; the address carries the city and country only.
 */
const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const brandId = (slug) => `${absolute(`/brands/${slug}`)}#brand`;
const serviceId = (slug) => `${absolute('/services')}#${slug}`;
const LAGOS = { '@type': 'City', name: 'Lagos', containedInPlace: { '@type': 'Country', name: 'Nigeria' } };

// Service `brand` keys in site.js → brand page slugs.
const BRAND_SLUG = { brandfirst: 'brandfirst-media', room16: 'room16', 'aso-igbalode': 'aso-igbalode' };
const instagram = (brand) => brand.social.filter((s) => s.label.startsWith('Instagram')).map((s) => s.href);

function organization() {
  const parent = brands.find((b) => b.slug === 'brandfirst-media');
  return {
    '@type': ['Organization', 'ProfessionalService'],
    '@id': ORG_ID,
    name: site.name,
    url: absolute('/'),
    slogan: site.tagline,
    description:
      'A production group in Lagos, Nigeria: print, large format, signage and publicity from Brandfirst Media, event lighting, stage and set design from ROOM16, and clothing and branded apparel from Aṣọ Ìgbàlódé.',
    logo: { '@type': 'ImageObject', url: absolute('/assets/brandfirst-logo.png'), width: 738, height: 993 },
    image: absolute('/og/home.jpg'),
    telephone: site.phoneIntl,
    email: site.emails[0],
    address: { '@type': 'PostalAddress', addressLocality: 'Lagos', addressCountry: 'NG' },
    areaServed: LAGOS,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        telephone: site.phoneIntl,
        email: site.emails[0],
        areaServed: 'NG',
        availableLanguage: 'English',
      },
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        name: 'WhatsApp',
        telephone: `+${site.whatsapp}`,
        url: `https://wa.me/${site.whatsapp}`,
        areaServed: 'NG',
        availableLanguage: 'English',
      },
    ],
    sameAs: [...new Set([...site.social.map((s) => s.href), ...instagram(parent)])],
    brand: brands.filter((b) => b.slug !== 'brandfirst-media').map((b) => ({ '@id': brandId(b.slug) })),
  };
}

function brandNodes() {
  return brands.filter((b) => b.slug !== 'brandfirst-media').map((b) => ({
    '@type': 'Brand',
    '@id': brandId(b.slug),
    name: b.name,
    description: b.blurb,
    url: absolute(`/brands/${b.slug}`),
    ...(b.logo ? { logo: absolute(b.logo.src) } : {}),
    sameAs: instagram(b),
  }));
}

function website() {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: absolute('/'),
    name: site.name,
    inLanguage: LANGUAGE,
    publisher: { '@id': ORG_ID },
  };
}

function serviceNode(s) {
  const slug = BRAND_SLUG[s.brand];
  return {
    '@type': 'Service',
    '@id': serviceId(s.slug),
    name: s.title,
    serviceType: s.title,
    description: s.card,
    url: serviceId(s.slug),
    provider: { '@id': ORG_ID },
    // The parent brand is the organisation itself; the other two are brands of it.
    ...(slug !== 'brandfirst-media' ? { brand: { '@id': brandId(slug) } } : {}),
    areaServed: LAGOS,
    // The largest export: the last entry of the srcSet.
    image: absolute(s.image.srcSet.split(', ').pop().split(' ')[0]),
  };
}

function breadcrumb(page) {
  const trail = [['Home', '/'], ...(page.trail || [])];
  return {
    '@type': 'BreadcrumbList',
    '@id': `${absolute(page.path)}#breadcrumb`,
    itemListElement: trail.map(([name, path], i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name,
      item: absolute(path),
    })),
  };
}

function faq(page, brand) {
  return {
    '@type': 'FAQPage',
    '@id': `${absolute(page.path)}#faq`,
    mainEntity: brand.faq.map(([q, a]) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
}

/** The whole graph for a page's metadata (see pages.js). */
export function schemaFor(page) {
  const url = absolute(page.path);
  const graph = [organization(), ...brandNodes(), website()];
  if (page.noindex) return { '@context': 'https://schema.org', '@graph': graph };

  const webPage = {
    '@type': page.type,
    '@id': `${url}#webpage`,
    url,
    name: page.title,
    description: page.description,
    inLanguage: LANGUAGE,
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': page.brand && page.brand !== 'brandfirst-media' ? brandId(page.brand) : ORG_ID },
    primaryImageOfPage: { '@type': 'ImageObject', url: absolute(`/og/${page.og}.jpg`), width: 1200, height: 630 },
  };
  graph.push(webPage);

  if (page.trail) {
    graph.push(breadcrumb(page));
    webPage.breadcrumb = { '@id': `${url}#breadcrumb` };
  }

  if (page.path === '/services') {
    const nodes = services.map(serviceNode);
    graph.push(...nodes);
    webPage.mainEntity = { '@type': 'ItemList', itemListElement: nodes.map((n, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@id': n['@id'] } })) };
  }

  if (page.brand) {
    const brand = brands.find((b) => b.slug === page.brand);
    graph.push(...services.filter((s) => brand.services.includes(s.slug)).map(serviceNode));
    if (brand.faq?.length) graph.push(faq(page, brand));
  }

  return { '@context': 'https://schema.org', '@graph': graph };
}
