/** Content models. Data lives in src/data/content.ts. */
import type { ImageMetadata } from 'astro';

/** A local image imported from src/assets (optimised at build time). */
export interface ImageRef {
  src: ImageMetadata;
  alt: string;
}

export interface Seo {
  seoTitle?: string;
  seoDescription?: string;
}

export interface Brand extends Seo {
  name: string;
  slug: string;
  description: string;
  logo?: ImageRef;
}

export interface Manual extends Seo {
  id: number;
  title: string;
  slug: string;
  brand: string;
  model: string;
  productType: string;
  description: string;
  /** Public URL of the PDF in Supabase Storage, if one has been uploaded. */
  pdfUrl?: string;
  pdfKey?: string;
  pdfSize?: number;
  /** Unpublished manuals are only visible in /admin. */
  published: boolean;
  updatedAt: string;
}

export interface FaultCode extends Seo {
  slug: string;
  brand: string;
  model: string;
  code: string;
  title: string;
  description: string;
  commonCauses: string[];
  recommendedActions: string[];
}

export type ServiceIcon = 'wrench' | 'install' | 'calendar' | 'alert';

export interface Service extends Seo {
  title: string;
  slug: string;
  description: string;
  content: string[];
  icon: ServiceIcon;
  image?: ImageRef;
}

export interface BlogPost extends Seo {
  title: string;
  slug: string;
  excerpt: string;
  content: string[];
  author: string;
  publishDate: string;
  featuredImage?: ImageRef;
}

export interface Testimonial {
  customerName: string;
  companyName: string;
  review: string;
  rating: number;
}

export interface Location extends Seo {
  name: string;
  slug: string;
  content: string;
  coverageArea: string;
  towns: string[];
}

export type MachineCondition = 'new' | 'refurbished' | 'used';
/** `draft` listings are only visible in /admin. */
export type MachineStatus = 'available' | 'reserved' | 'sold' | 'draft';
export const MACHINE_TYPES = ['Undercounter dishwasher', 'Glasswasher', 'Pass-through / hood', 'Rack conveyor'] as const;
export type MachineType = (typeof MACHINE_TYPES)[number];

/** A photo stored in R2, served from /media/<key>. */
export interface MachineImage {
  key: string;
  /** Smaller version for cards (falls back to `key`). */
  thumbKey?: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface Machine extends Seo {
  id: number;
  slug: string;
  reference: string;
  title: string;
  brand: string;
  model: string;
  machineType: MachineType;
  condition: MachineCondition;
  status: MachineStatus;
  price: number;
  wasPrice?: number;
  summary: string;
  description: string[];
  specs: { label: string; value: string }[];
  highlights: string[];
  warranty?: string;
  featured: boolean;
  images: MachineImage[];
  updatedAt: string;
}

export interface CaseStudy {
  title: string;
  site: string;
  machine: string;
  before: string;
  after: string;
  turnaround: string;
}
