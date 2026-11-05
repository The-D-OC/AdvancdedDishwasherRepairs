/**
 * Machines for sale — stored in Supabase (Postgres + Storage).
 * Server-only. Pass `publicClient()` for public pages and the signed-in
 * session client (`Astro.locals.supabase`) for admin pages; row level
 * security decides what each can read and write.
 */
import { PHOTO_BUCKET, photoUrl, type SupabaseClient } from '@/lib/supabase';
import {
  MACHINE_TYPES,
  type Machine,
  type MachineCondition,
  type MachineImage,
  type MachineStatus,
  type MachineType,
} from '@/types/content';

interface MachineRow {
  id: number;
  slug: string;
  reference: string;
  title: string;
  brand: string;
  model: string;
  machine_type: string;
  condition: MachineCondition;
  status: MachineStatus;
  price: number;
  was_price: number | null;
  summary: string;
  description: string;
  specs: { label: string; value: string }[] | null;
  highlights: string[] | null;
  warranty: string;
  featured: boolean;
  images: MachineImage[] | null;
  seo_title: string;
  seo_description: string;
  updated_at: string;
}

function toMachine(r: MachineRow): Machine {
  const machine: Machine = {
    id: r.id,
    slug: r.slug,
    reference: r.reference,
    title: r.title,
    brand: r.brand,
    model: r.model,
    machineType: (MACHINE_TYPES as readonly string[]).includes(r.machine_type)
      ? (r.machine_type as MachineType)
      : 'Undercounter dishwasher',
    condition: r.condition,
    status: r.status,
    price: r.price,
    summary: r.summary,
    description: r.description.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean),
    specs: r.specs ?? [],
    highlights: r.highlights ?? [],
    featured: r.featured,
    images: r.images ?? [],
    updatedAt: r.updated_at,
  };
  if (r.was_price !== null) machine.wasPrice = r.was_price;
  if (r.warranty) machine.warranty = r.warranty;
  if (r.seo_title) machine.seoTitle = r.seo_title;
  if (r.seo_description) machine.seoDescription = r.seo_description;
  return machine;
}

function fail(action: string, error: { message: string }): never {
  throw new Error(`Supabase: could not ${action} — ${error.message}`);
}

const STATUS_ORDER: Record<MachineStatus, number> = { available: 0, reserved: 1, sold: 2, draft: 3 };

/** Public listings: everything except drafts. Available first, sold last; featured first within each. */
export async function listPublicMachines(db: SupabaseClient): Promise<Machine[]> {
  const { data, error } = await db
    .from('machines')
    .select('*')
    .neq('status', 'draft')
    .order('featured', { ascending: false })
    .order('updated_at', { ascending: false });
  if (error) fail('load machines', error);
  return (data as MachineRow[]).map(toMachine).sort((a, b) => STATUS_ORDER[a.status] - STATUS_ORDER[b.status]);
}

/** Admin list, including drafts (RLS only returns drafts to admins). */
export async function listAllMachines(db: SupabaseClient): Promise<Machine[]> {
  const { data, error } = await db.from('machines').select('*').order('updated_at', { ascending: false });
  if (error) fail('load machines', error);
  return (data as MachineRow[]).map(toMachine);
}

export async function getMachineBySlug(db: SupabaseClient, slug: string): Promise<Machine | null> {
  const { data, error } = await db.from('machines').select('*').eq('slug', slug).neq('status', 'draft').maybeSingle();
  if (error) fail('load machine', error);
  return data ? toMachine(data as MachineRow) : null;
}

export async function getMachineById(db: SupabaseClient, id: number): Promise<Machine | null> {
  const { data, error } = await db.from('machines').select('*').eq('id', id).maybeSingle();
  if (error) fail('load machine', error);
  return data ? toMachine(data as MachineRow) : null;
}

/* -------------------------------------------------------------------------- */
/* Admin: validation & writes                                                  */
/* -------------------------------------------------------------------------- */

export interface MachineInput {
  title: string;
  slug: string;
  reference: string;
  brand: string;
  model: string;
  machineType: MachineType;
  condition: MachineCondition;
  status: MachineStatus;
  price: number;
  wasPrice: number | null;
  summary: string;
  description: string;
  specs: { label: string; value: string }[];
  highlights: string[];
  warranty: string;
  featured: boolean;
  seoTitle: string;
  seoDescription: string;
}

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 80);

const CONDITIONS: MachineCondition[] = ['new', 'refurbished', 'used'];
const STATUSES: MachineStatus[] = ['available', 'reserved', 'sold', 'draft'];

/** Parse the admin form. Returns field errors keyed by input name. */
export function parseMachineForm(form: FormData): { input: MachineInput; errors: Record<string, string> } {
  const str = (k: string, max = 200) => {
    const v = form.get(k);
    return typeof v === 'string' ? v.trim().slice(0, max) : '';
  };
  const money = (k: string) => {
    const raw = str(k, 20).replace(/[£,\s]/g, '');
    if (!raw) return null;
    const n = Number(raw);
    return Number.isFinite(n) && n >= 0 ? Math.round(n) : NaN;
  };
  const errors: Record<string, string> = {};

  const title = str('title');
  const price = money('price');
  const wasPrice = money('wasPrice');
  const machineType = str('machineType') as MachineType;
  const condition = str('condition') as MachineCondition;
  const status = str('status') as MachineStatus;

  // Specs: one per line, "Label: value".
  const specs = str('specs', 4000)
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const i = line.indexOf(':');
      return i > 0 ? { label: line.slice(0, i).trim(), value: line.slice(i + 1).trim() } : { label: line, value: '' };
    })
    .slice(0, 30);

  const highlights = str('highlights', 2000)
    .split('\n')
    .map((h) => h.trim())
    .filter(Boolean)
    .slice(0, 8);

  const input: MachineInput = {
    title,
    slug: slugify(str('slug') || title),
    reference: str('reference', 40),
    brand: str('brand', 80),
    model: str('model', 80),
    machineType,
    condition,
    status,
    price: price ?? NaN,
    wasPrice: wasPrice === null || Number.isNaN(wasPrice) ? null : wasPrice,
    summary: str('summary', 200),
    description: str('description', 8000),
    specs,
    highlights,
    warranty: str('warranty', 120),
    featured: form.get('featured') === 'on',
    seoTitle: str('seoTitle', 70),
    seoDescription: str('seoDescription', 170),
  };

  if (!input.title) errors['title'] = 'Title is required.';
  if (!input.slug) errors['slug'] = 'URL slug is required.';
  if (!input.reference) errors['reference'] = 'Stock reference is required.';
  if (!input.brand) errors['brand'] = 'Brand is required.';
  if (!(MACHINE_TYPES as readonly string[]).includes(machineType)) errors['machineType'] = 'Choose a machine type.';
  if (!CONDITIONS.includes(condition)) errors['condition'] = 'Choose a condition.';
  if (!STATUSES.includes(status)) errors['status'] = 'Choose a status.';
  if (price === null || Number.isNaN(price)) errors['price'] = 'Enter a price in pounds, e.g. 1850.';
  if (Number.isNaN(wasPrice)) errors['wasPrice'] = 'Enter a number, or leave blank.';
  if (!input.summary) errors['summary'] = 'A short summary is required (shown on cards and in Google).';

  return { input, errors };
}

export async function slugTaken(db: SupabaseClient, slug: string, exceptId?: number): Promise<boolean> {
  const { data, error } = await db.from('machines').select('id').eq('slug', slug).neq('id', exceptId ?? -1).limit(1);
  if (error) fail('check URL', error);
  return data.length > 0;
}

const toRow = (m: MachineInput, images: MachineImage[]) => ({
  slug: m.slug,
  reference: m.reference,
  title: m.title,
  brand: m.brand,
  model: m.model,
  machine_type: m.machineType,
  condition: m.condition,
  status: m.status,
  price: m.price,
  was_price: m.wasPrice,
  summary: m.summary,
  description: m.description,
  specs: m.specs,
  highlights: m.highlights,
  warranty: m.warranty,
  featured: m.featured,
  images,
  seo_title: m.seoTitle,
  seo_description: m.seoDescription,
});

export async function createMachine(db: SupabaseClient, m: MachineInput, images: MachineImage[]): Promise<number> {
  const { data, error } = await db.from('machines').insert(toRow(m, images)).select('id').single();
  if (error) fail('save machine', error);
  return (data as { id: number }).id;
}

export async function updateMachine(db: SupabaseClient, id: number, m: MachineInput, images: MachineImage[]): Promise<void> {
  const { error } = await db.from('machines').update(toRow(m, images)).eq('id', id);
  if (error) fail('save machine', error);
}

export async function deleteMachine(db: SupabaseClient, id: number): Promise<void> {
  const machine = await getMachineById(db, id);
  if (!machine) return;
  const { error } = await db.from('machines').delete().eq('id', id);
  if (error) fail('delete machine', error);
  await deleteImages(db, machine.images);
}

/* -------------------------------------------------------------------------- */
/* Photos (Supabase Storage, public bucket "machine-photos")                    */
/* -------------------------------------------------------------------------- */

const ALLOWED_TYPES: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/avif': 'avif',
};
export const MAX_IMAGE_BYTES = 8 * 1024 * 1024;
export const MAX_IMAGES = 12;

/** Public URL for a stored photo. */
export const mediaUrl = (key: string): string => photoUrl(key);

/** Upload a file to Storage. Returns the object key, or an error message. */
export async function storeImage(
  db: SupabaseClient,
  file: File,
  folder: string,
  suffix = '',
): Promise<{ key: string } | { error: string }> {
  const ext = ALLOWED_TYPES[file.type];
  if (!ext) return { error: `${file.name}: only JPEG, PNG, WebP or AVIF images are allowed.` };
  if (file.size > MAX_IMAGE_BYTES) return { error: `${file.name}: images must be under 8 MB.` };
  const key = `${folder}/${crypto.randomUUID()}${suffix}.${ext}`;
  const { error } = await db.storage.from(PHOTO_BUCKET).upload(key, file, {
    contentType: file.type,
    cacheControl: '31536000',
    upsert: false,
  });
  if (error) return { error: `${file.name}: upload failed (${error.message}).` };
  return { key };
}

export async function deleteImages(db: SupabaseClient, images: MachineImage[]): Promise<void> {
  const keys = images.flatMap((i) => (i.thumbKey ? [i.key, i.thumbKey] : [i.key]));
  if (!keys.length) return;
  const { data, error } = await db.storage.from(PHOTO_BUCKET).remove(keys);
  if (error || (data?.length ?? 0) < keys.length) {
    console.error(`[machines] Could not delete all photos (${data?.length ?? 0}/${keys.length})`, error?.message ?? '');
  }
}

/**
 * Build a machine's image list from the admin form:
 *  - existing images (`alt_<i>`, `remove_<i>`, `cover`) — keys come from the DB, never the client
 *  - new uploads resized in the browser (`upload_large`, `upload_thumb`, `upload_w`, `upload_h`)
 *  - or raw uploads when JavaScript is off (`photos`)
 * Removed images should be deleted by the caller after a successful save.
 */
export async function collectImages(
  db: SupabaseClient,
  form: FormData,
  current: MachineImage[],
  folder: string,
  defaultAlt: string,
): Promise<{ images: MachineImage[]; removed: MachineImage[]; errors: string[] }> {
  const errors: string[] = [];
  const kept: MachineImage[] = [];
  const removed: MachineImage[] = [];

  current.forEach((img, i) => {
    if (form.get(`remove_${i}`) === 'on') {
      removed.push(img);
      return;
    }
    const alt = form.get(`alt_${i}`);
    kept.push({ ...img, alt: typeof alt === 'string' && alt.trim() ? alt.trim().slice(0, 160) : img.alt });
  });

  // Move the chosen cover photo to the front.
  const cover = Number(form.get('cover'));
  const coverImage = Number.isInteger(cover) ? current[cover] : undefined;
  if (coverImage) {
    const idx = kept.findIndex((k) => k.key === coverImage.key);
    if (idx > 0) kept.unshift(...kept.splice(idx, 1));
  }

  const files = (name: string) => form.getAll(name).filter((f): f is File => f instanceof File && f.size > 0);
  const large = files('upload_large');
  const thumbs = files('upload_thumb');
  const widths = form.getAll('upload_w').map(Number);
  const heights = form.getAll('upload_h').map(Number);
  const raw = files('photos');

  const added: MachineImage[] = [];
  const room = () => MAX_IMAGES - kept.length - added.length;
  const altFor = () => `${defaultAlt} — photo ${kept.length + added.length + 1}`;

  for (let i = 0; i < large.length; i++) {
    if (room() <= 0) {
      errors.push(`A machine can have up to ${MAX_IMAGES} photos.`);
      break;
    }
    const stored = await storeImage(db, large[i]!, folder);
    if ('error' in stored) {
      errors.push(stored.error);
      continue;
    }
    const image: MachineImage = { key: stored.key, alt: altFor() };
    const thumb = thumbs[i];
    if (thumb) {
      const t = await storeImage(db, thumb, folder, '-thumb');
      if ('key' in t) image.thumbKey = t.key;
    }
    if (widths[i]! > 0 && heights[i]! > 0) {
      image.width = widths[i]!;
      image.height = heights[i]!;
    }
    added.push(image);
  }

  for (const file of raw) {
    if (room() <= 0) {
      errors.push(`A machine can have up to ${MAX_IMAGES} photos.`);
      break;
    }
    const stored = await storeImage(db, file, folder);
    if ('error' in stored) errors.push(stored.error);
    else added.push({ key: stored.key, alt: altFor() });
  }

  return { images: [...kept, ...added], removed, errors };
}

export function machineToInput(m: Machine): MachineInput {
  return {
    title: m.title,
    slug: m.slug,
    reference: m.reference,
    brand: m.brand,
    model: m.model,
    machineType: m.machineType,
    condition: m.condition,
    status: m.status,
    price: m.price,
    wasPrice: m.wasPrice ?? null,
    summary: m.summary,
    description: m.description.join('\n\n'),
    specs: m.specs,
    highlights: m.highlights,
    warranty: m.warranty ?? '',
    featured: m.featured,
    seoTitle: m.seoTitle ?? '',
    seoDescription: m.seoDescription ?? '',
  };
}

export const emptyMachineInput = (): MachineInput => ({
  title: '',
  slug: '',
  reference: '',
  brand: '',
  model: '',
  machineType: 'Undercounter dishwasher',
  condition: 'refurbished',
  status: 'available',
  price: Number.NaN,
  wasPrice: null,
  summary: '',
  description: '',
  specs: [],
  highlights: [],
  warranty: '',
  featured: false,
  seoTitle: '',
  seoDescription: '',
});

/** Suggest the next stock reference, e.g. ADR-1007. */
export async function nextReference(db: SupabaseClient): Promise<string> {
  const { data } = await db.from('machines').select('reference').ilike('reference', 'ADR-%');
  const max = (data ?? []).reduce((n, r: { reference: string }) => Math.max(n, Number(r.reference.slice(4)) || 0), 1000);
  return `ADR-${max + 1}`;
}
