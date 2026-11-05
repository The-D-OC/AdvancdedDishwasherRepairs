/**
 * Content access layer. Pages read content through these functions rather
 * than importing the data file directly, so the source can change later
 * (e.g. to a CMS or database) without touching every page.
 *
 * Content itself lives in `src/data/content.ts`. Machines for sale and manuals come
 * from Supabase instead — see `src/lib/machines.ts` and `src/lib/manuals.ts`.
 */
import * as data from '@/data/content';
import type {
  BlogPost,
  Brand,
  CaseStudy,
  FaultCode,
  Location,
  Service,
  Testimonial,
} from '@/types/content';

const byName = (a: Brand, b: Brand) => a.name.localeCompare(b.name);
const byDateDesc = (a: BlogPost, b: BlogPost) => b.publishDate.localeCompare(a.publishDate);

export const getBrands = async (): Promise<Brand[]> => [...data.BRANDS].sort(byName);
export const getServices = async (): Promise<Service[]> => data.SERVICES;
export const getFaultCodes = async (): Promise<FaultCode[]> => data.FAULT_CODES;
export const getBlogPosts = async (): Promise<BlogPost[]> => [...data.BLOG_POSTS].sort(byDateDesc);
export const getTestimonials = async (): Promise<Testimonial[]> => data.TESTIMONIALS;
export const getLocations = async (): Promise<Location[]> => data.LOCATIONS;
export const getCaseStudies = async (): Promise<CaseStudy[]> => data.CASE_STUDIES;
