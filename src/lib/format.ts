const gbp = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 });

export const formatPrice = (value: number): string => gbp.format(value);

export const formatDate = (iso: string): string =>
  new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

export const CONDITION_LABEL = {
  new: 'New',
  refurbished: 'Refurbished',
  used: 'Used',
} as const;

export const STATUS_LABEL = {
  available: 'Available',
  reserved: 'Reserved',
  sold: 'Sold',
  draft: 'Draft (hidden)',
} as const;

export const truncate = (text: string, max: number): string =>
  text.length <= max ? text : `${text.slice(0, max - 1).trimEnd()}…`;
