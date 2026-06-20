export interface Brand {
  name: string;
  slug: string;
  logo?: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
}

export interface Manual {
  title: string;
  slug: string;
  brand: string;
  model: string;
  productType: string;
  description: string;
  pdfAsset?: string;
  thumbnail?: string;
  seoTitle: string;
  seoDescription: string;
}

export interface FaultCode {
  brand: string;
  model: string;
  code: string;
  title: string;
  description: string;
  commonCauses: string[];
  recommendedActions: string[];
  seoTitle: string;
  seoDescription: string;
}

export interface Service {
  title: string;
  slug: string;
  description: string;
  content: string;
  image?: string;
  seoTitle: string;
  seoDescription: string;
}

export interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  author: string;
  publishDate: string;
  seoTitle: string;
  seoDescription: string;
}

export interface Testimonial {
  customerName: string;
  companyName: string;
  review: string;
  rating: number;
}

export interface Location {
  name: string;
  slug: string;
  content: string;
  coverageArea: string;
  seoTitle: string;
  seoDescription: string;
}
