import { SITE } from '@/config/site';

export interface Crumb {
  label: string;
  href: string;
}

export type JsonLd = Record<string, unknown>;

/** '/about.html' → '/about', '/index.html' → '/', '/blog/' → '/blog'. */
export function cleanPath(pathname: string): string {
  const p = pathname.replace(/\.html$/, '').replace(/\/index$/, '').replace(/\/+$/, '');
  return p === '' || p === '/index' ? '/' : p;
}

export const absoluteUrl = (path: string): string => new URL(path, SITE.url).toString();

export function localBusinessSchema(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    '@id': `${SITE.url}/#business`,
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.url,
    telephone: SITE.phone.e164,
    email: SITE.email,
    description: SITE.description,
    foundingDate: String(SITE.foundingYear),
    image: absoluteUrl(SITE.defaultOgImage),
    logo: absoluteUrl('/logo.png'),
    address: {
      '@type': 'PostalAddress',
      addressLocality: SITE.address.locality,
      addressRegion: SITE.address.region,
      addressCountry: SITE.address.country,
    },
    areaServed: { '@type': 'AdministrativeArea', name: 'North West England' },
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '18:00' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '09:00', closes: '16:00' },
    ],
  };
}

export function breadcrumbSchema(crumbs: Crumb[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.label,
      item: absoluteUrl(c.href),
    })),
  };
}

export function serviceSchema(name: string, description: string, path: string): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url: absoluteUrl(path),
    serviceType: name,
    provider: { '@id': `${SITE.url}/#business` },
    areaServed: { '@type': 'AdministrativeArea', name: 'North West England' },
  };
}

export function articleSchema(a: { title: string; description: string; path: string; date: string; author: string; image?: string | undefined }): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: a.title,
    description: a.description,
    url: absoluteUrl(a.path),
    datePublished: a.date,
    author: { '@type': 'Organization', name: a.author },
    publisher: { '@id': `${SITE.url}/#business` },
    image: a.image ?? absoluteUrl(SITE.defaultOgImage),
  };
}

export function productSchema(p: {
  name: string;
  description: string;
  path: string;
  brand: string;
  sku: string;
  price: number;
  condition: 'new' | 'refurbished' | 'used';
  status: 'available' | 'reserved' | 'sold' | 'draft';
  image?: string | undefined;
}): JsonLd {
  const conditionMap = {
    new: 'https://schema.org/NewCondition',
    refurbished: 'https://schema.org/RefurbishedCondition',
    used: 'https://schema.org/UsedCondition',
  } as const;
  const availabilityMap = {
    available: 'https://schema.org/InStock',
    reserved: 'https://schema.org/LimitedAvailability',
    sold: 'https://schema.org/SoldOut',
    draft: 'https://schema.org/OutOfStock',
  } as const;
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.name,
    description: p.description,
    sku: p.sku,
    brand: { '@type': 'Brand', name: p.brand },
    image: p.image ?? absoluteUrl(SITE.defaultOgImage),
    url: absoluteUrl(p.path),
    offers: {
      '@type': 'Offer',
      price: p.price,
      priceCurrency: 'GBP',
      itemCondition: conditionMap[p.condition],
      availability: availabilityMap[p.status],
      seller: { '@id': `${SITE.url}/#business` },
    },
  };
}

export function faqSchema(items: { q: string; a: string }[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((i) => ({
      '@type': 'Question',
      name: i.q,
      acceptedAnswer: { '@type': 'Answer', text: i.a },
    })),
  };
}

export function websiteSchema(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE.url}/#website`,
    name: SITE.name,
    url: SITE.url,
    inLanguage: 'en-GB',
    publisher: { '@id': `${SITE.url}/#business` },
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${SITE.url}/fault-codes?q={search_term_string}` },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function itemListSchema(name: string, items: { name: string; path: string }[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    numberOfItems: items.length,
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      url: absoluteUrl(item.path),
    })),
  };
}
