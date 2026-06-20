import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: process.env.EXPO_PUBLIC_SANITY_PROJECT_ID ?? '',
  dataset: process.env.EXPO_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: process.env.EXPO_PUBLIC_SANITY_API_VERSION ?? '2024-01-01',
  useCdn: true,
});

export function urlFor(source: any) {
  const ref: string = source?.asset?._ref ?? '';
  if (!ref) return '';
  const [, id, dimensions, format] = ref.split('-');
  const projectId = process.env.EXPO_PUBLIC_SANITY_PROJECT_ID ?? '';
  const dataset = process.env.EXPO_PUBLIC_SANITY_DATASET ?? 'production';
  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${dimensions}.${format}`;
}
