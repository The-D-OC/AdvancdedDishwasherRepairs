import { sanityClient } from './sanity';
import type { BlogPost, Brand, FaultCode, Location, Manual, Service, Testimonial } from '@/types';

export async function getBrands(): Promise<Brand[]> {
  return sanityClient.fetch(`*[_type == "brand"] | order(name asc) {
    _id, name, slug, logo, description, seoTitle, seoDescription
  }`);
}

export async function getBrand(slug: string): Promise<Brand | null> {
  return sanityClient.fetch(`*[_type == "brand" && slug.current == $slug][0] {
    _id, name, slug, logo, description, seoTitle, seoDescription
  }`, { slug });
}

export async function getServices(): Promise<Service[]> {
  return sanityClient.fetch(`*[_type == "service"] | order(title asc) {
    _id, title, slug, description, content, image, seoTitle, seoDescription
  }`);
}

export async function getService(slug: string): Promise<Service | null> {
  return sanityClient.fetch(`*[_type == "service" && slug.current == $slug][0] {
    _id, title, slug, description, content, image, seoTitle, seoDescription
  }`, { slug });
}

export async function getManuals(query = ''): Promise<Manual[]> {
  const filter = query
    ? `*[_type == "manual" && (title match $q || brand match $q || model match $q || productType match $q)]`
    : `*[_type == "manual"]`;
  return sanityClient.fetch(`${filter} | order(title asc) {
    _id, title, slug, brand, model, productType, description, pdfAsset, thumbnail, seoTitle, seoDescription
  }`, { q: `${query}*` });
}

export async function getManual(slug: string): Promise<Manual | null> {
  return sanityClient.fetch(`*[_type == "manual" && slug.current == $slug][0] {
    _id, title, slug, brand, model, productType, description, pdfAsset, thumbnail, seoTitle, seoDescription
  }`, { slug });
}

export async function getFaultCodes(brand = '', code = ''): Promise<FaultCode[]> {
  const filters = [`_type == "faultCode"`];
  if (brand) filters.push(`brand match $brand`);
  if (code) filters.push(`code match $code`);
  return sanityClient.fetch(`*[${filters.join(' && ')}] | order(code asc) {
    _id, brand, model, code, title, description, commonCauses, recommendedActions, seoTitle, seoDescription
  }`, { brand: `${brand}*`, code: `${code}*` });
}

export async function getFaultCode(code: string): Promise<FaultCode | null> {
  return sanityClient.fetch(`*[_type == "faultCode" && code == $code][0] {
    _id, brand, model, code, title, description, commonCauses, recommendedActions, seoTitle, seoDescription
  }`, { code });
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  return sanityClient.fetch(`*[_type == "blogPost"] | order(publishDate desc) {
    _id, title, slug, excerpt, featuredImage, author, publishDate, seoTitle, seoDescription
  }`);
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  return sanityClient.fetch(`*[_type == "blogPost" && slug.current == $slug][0] {
    _id, title, slug, excerpt, content, featuredImage, author, publishDate, seoTitle, seoDescription
  }`, { slug });
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return sanityClient.fetch(`*[_type == "testimonial"] | order(_createdAt desc) {
    _id, customerName, companyName, review, rating
  }`);
}

export async function getLocations(): Promise<Location[]> {
  return sanityClient.fetch(`*[_type == "location"] | order(name asc) {
    _id, name, slug, content, coverageArea, seoTitle, seoDescription
  }`);
}

export async function getLocation(slug: string): Promise<Location | null> {
  return sanityClient.fetch(`*[_type == "location" && slug.current == $slug][0] {
    _id, name, slug, content, coverageArea, seoTitle, seoDescription
  }`, { slug });
}
