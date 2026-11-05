/**
 * Business details used across the site (header, footer, structured data,
 * contact links). Update here and every page picks it up.
 */
export const SITE = {
  name: 'Advanced Dishwasher Repairs',
  legalName: 'Advanced Dishwasher Repairs Ltd',
  url: 'https://www.advanceddishwasherrepairs.co.uk',
  tagline: 'Commercial dishwasher & glasswasher repair specialists',
  description:
    'Fast, reliable commercial dishwasher and glasswasher repairs, maintenance and installation across the North West.',
  foundingYear: 2009,

  phone: {
    display: '07745 407 919',
    e164: '+447745407919',
  },
  email: 'info@advanceddishwasherrepairs.co.uk',

  address: {
    locality: 'Ashton-under-Lyne',
    region: 'Greater Manchester',
    country: 'GB',
  },
  serviceArea: 'the North West',

  hours: [
    { days: 'Mon – Fri', time: '8:00am – 6:00pm' },
    { days: 'Saturday', time: '9:00am – 4:00pm' },
  ],

  stats: [
    { value: '15+', label: 'Years experience' },
    { value: '5,000+', label: 'Machines repaired' },
    { value: '90-day', label: 'Repair warranty' },
    { value: '98%', label: 'First-time fix rate' },
  ],

  defaultOgImage: '/og-default.jpg',
} as const;

export const telHref = `tel:${SITE.phone.e164}`;

export function mailtoHref(subject?: string, body?: string): string {
  const params = new URLSearchParams();
  if (subject) params.set('subject', subject);
  if (body) params.set('body', body);
  const query = params.toString().replace(/\+/g, '%20');
  return `mailto:${SITE.email}${query ? `?${query}` : ''}`;
}

export interface NavItem {
  label: string;
  href: string;
}

export const MAIN_NAV: NavItem[] = [
  { label: 'Services', href: '/services' },
  { label: 'Brands', href: '/brands' },
  { label: 'Fault Codes', href: '/fault-codes' },
  { label: 'Manuals', href: '/manuals' },
  { label: 'For Sale', href: '/for-sale' },
  { label: 'Coverage', href: '/coverage-areas' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];
