/**
 * Manuals library — rows in Supabase `public.manuals`, PDFs in the public
 * `manuals` Storage bucket. Server-only. Use `publicClient()` for public pages
 * and `Astro.locals.supabase` (admin session) in /admin; RLS enforces access.
 */
import { slugify } from '@/lib/machines';
import type { SupabaseClient } from '@/lib/supabase';
import { env } from 'cloudflare:workers';
import type { Manual } from '@/types/content';

export const MANUAL_BUCKET = 'manuals';
export const MAX_PDF_BYTES = 25 * 1024 * 1024;

interface ManualRow {
  id: number;
  slug: string;
  title: string;
  brand: string;
  model: string;
  product_type: string;
  description: string;
  pdf_key: string | null;
  pdf_size: number | null;
  published: boolean;
  seo_title: string;
  seo_description: string;
  updated_at: string;
}

export const manualPdfUrl = (key: string): string =>
  `${env.SUPABASE_URL}/storage/v1/object/public/${MANUAL_BUCKET}/${key.split('/').map(encodeURIComponent).join('/')}`;

function toManual(r: ManualRow): Manual {
  const m: Manual = {
    id: r.id,
    slug: r.slug,
    title: r.title,
    brand: r.brand,
    model: r.model,
    productType: r.product_type,
    description: r.description,
    published: r.published,
    updatedAt: r.updated_at,
  };
  if (r.pdf_key) {
    m.pdfKey = r.pdf_key;
    m.pdfUrl = manualPdfUrl(r.pdf_key);
  }
  if (r.pdf_size !== null) m.pdfSize = r.pdf_size;
  if (r.seo_title) m.seoTitle = r.seo_title;
  if (r.seo_description) m.seoDescription = r.seo_description;
  return m;
}

function fail(action: string, error: { message: string }): never {
  throw new Error(`Supabase: could not ${action} — ${error.message}`);
}

/** Published manuals, A–Z by brand then model. */
export async function listPublicManuals(db: SupabaseClient): Promise<Manual[]> {
  const { data, error } = await db
    .from('manuals')
    .select('*')
    .eq('published', true)
    .order('brand')
    .order('model')
    .order('title');
  if (error) fail('load manuals', error);
  return (data as ManualRow[]).map(toManual);
}

/** Admin list, including unpublished (RLS only returns those to admins). */
export async function listAllManuals(db: SupabaseClient): Promise<Manual[]> {
  const { data, error } = await db.from('manuals').select('*').order('updated_at', { ascending: false });
  if (error) fail('load manuals', error);
  return (data as ManualRow[]).map(toManual);
}

export async function getManualBySlug(db: SupabaseClient, slug: string): Promise<Manual | null> {
  const { data, error } = await db.from('manuals').select('*').eq('slug', slug).eq('published', true).maybeSingle();
  if (error) fail('load manual', error);
  return data ? toManual(data as ManualRow) : null;
}

export async function getManualById(db: SupabaseClient, id: number): Promise<Manual | null> {
  const { data, error } = await db.from('manuals').select('*').eq('id', id).maybeSingle();
  if (error) fail('load manual', error);
  return data ? toManual(data as ManualRow) : null;
}

/* -------------------------------------------------------------------------- */
/* Admin                                                                        */
/* -------------------------------------------------------------------------- */

export interface ManualInput {
  title: string;
  slug: string;
  brand: string;
  model: string;
  productType: string;
  description: string;
  published: boolean;
  seoTitle: string;
  seoDescription: string;
}

export const emptyManualInput = (): ManualInput => ({
  title: '',
  slug: '',
  brand: '',
  model: '',
  productType: '',
  description: '',
  published: true,
  seoTitle: '',
  seoDescription: '',
});

export const manualToInput = (m: Manual): ManualInput => ({
  title: m.title,
  slug: m.slug,
  brand: m.brand,
  model: m.model,
  productType: m.productType,
  description: m.description,
  published: m.published,
  seoTitle: m.seoTitle ?? '',
  seoDescription: m.seoDescription ?? '',
});

export function parseManualForm(form: FormData): { input: ManualInput; errors: Record<string, string> } {
  const str = (k: string, max = 200) => {
    const v = form.get(k);
    return typeof v === 'string' ? v.trim().slice(0, max) : '';
  };
  const title = str('title');
  const input: ManualInput = {
    title,
    slug: slugify(str('slug') || title),
    brand: str('brand', 80),
    model: str('model', 80),
    productType: str('productType', 80),
    description: str('description', 2000),
    published: form.get('published') === 'on',
    seoTitle: str('seoTitle', 70),
    seoDescription: str('seoDescription', 170),
  };
  const errors: Record<string, string> = {};
  if (!input.title) errors['title'] = 'Title is required.';
  if (!input.slug) errors['slug'] = 'URL slug is required.';
  if (!input.brand) errors['brand'] = 'Brand is required.';
  return { input, errors };
}

export async function manualSlugTaken(db: SupabaseClient, slug: string, exceptId?: number): Promise<boolean> {
  const { data, error } = await db.from('manuals').select('id').eq('slug', slug).neq('id', exceptId ?? -1).limit(1);
  if (error) fail('check URL', error);
  return data.length > 0;
}

/** Validate and upload a PDF. Returns its key and size, or an error. */
export async function uploadPdf(
  db: SupabaseClient,
  file: File,
  slug: string,
): Promise<{ key: string; size: number } | { error: string }> {
  const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
  if (!isPdf) return { error: 'Only PDF files can be uploaded.' };
  if (file.size > MAX_PDF_BYTES) return { error: 'PDFs must be under 25 MB.' };
  // Quick sanity check of the file signature.
  const head = new Uint8Array(await file.slice(0, 5).arrayBuffer());
  if (String.fromCharCode(...head) !== '%PDF-') return { error: 'That file doesn’t look like a valid PDF.' };

  const key = `${slug}/${crypto.randomUUID().slice(0, 8)}-${slugify(file.name.replace(/\.pdf$/i, '')) || 'manual'}.pdf`;
  const { error } = await db.storage.from(MANUAL_BUCKET).upload(key, file, {
    contentType: 'application/pdf',
    cacheControl: '31536000',
    upsert: false,
  });
  if (error) return { error: `Upload failed (${error.message}).` };
  return { key, size: file.size };
}

export async function deletePdf(db: SupabaseClient, key: string | undefined): Promise<void> {
  if (!key) return;
  const { data, error } = await db.storage.from(MANUAL_BUCKET).remove([key]);
  if (error || !data?.length) console.error('[manuals] Could not delete PDF', key, error?.message ?? '');
}

const toRow = (m: ManualInput, pdf: { key: string | null; size: number | null }) => ({
  slug: m.slug,
  title: m.title,
  brand: m.brand,
  model: m.model,
  product_type: m.productType,
  description: m.description,
  published: m.published,
  seo_title: m.seoTitle,
  seo_description: m.seoDescription,
  pdf_key: pdf.key,
  pdf_size: pdf.size,
});

export async function createManual(
  db: SupabaseClient,
  m: ManualInput,
  pdf: { key: string | null; size: number | null },
): Promise<number> {
  const { data, error } = await db.from('manuals').insert(toRow(m, pdf)).select('id').single();
  if (error) fail('save manual', error);
  return (data as { id: number }).id;
}

export async function updateManual(
  db: SupabaseClient,
  id: number,
  m: ManualInput,
  pdf: { key: string | null; size: number | null },
): Promise<void> {
  const { error } = await db.from('manuals').update(toRow(m, pdf)).eq('id', id);
  if (error) fail('save manual', error);
}

export async function deleteManual(db: SupabaseClient, id: number): Promise<void> {
  const manual = await getManualById(db, id);
  if (!manual) return;
  const { error } = await db.from('manuals').delete().eq('id', id);
  if (error) fail('delete manual', error);
  await deletePdf(db, manual.pdfKey);
}

export const formatBytes = (n: number): string =>
  n >= 1024 * 1024 ? `${(n / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(n / 1024))} KB`;
