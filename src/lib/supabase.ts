/**
 * Supabase clients (server-side only).
 *
 * - `publicClient()` — anonymous; can only read published machines (RLS).
 * - `sessionClient()` — carries the signed-in admin's session in HttpOnly
 *   cookies; RLS lets admins (emails in `public.admins`) write.
 *
 * No secret/service key is used anywhere: all access control is in the
 * database policies (see supabase/migrations).
 */
import { createServerClient, parseCookieHeader } from '@supabase/ssr';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { AstroCookies } from 'astro';
import { env } from 'cloudflare:workers';

export type { SupabaseClient };

export const PHOTO_BUCKET = 'machine-photos';

export function publicClient(): SupabaseClient {
  return createClient(env.SUPABASE_URL, env.SUPABASE_PUBLISHABLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  });
}

export function sessionClient(request: Request, cookies: AstroCookies, responseHeaders?: Headers): SupabaseClient {
  return createServerClient(env.SUPABASE_URL, env.SUPABASE_PUBLISHABLE_KEY, {
    cookies: {
      getAll() {
        return parseCookieHeader(request.headers.get('cookie') ?? '').map((c) => ({ name: c.name, value: c.value ?? '' }));
      },
      setAll(toSet, headers) {
        for (const { name, value, options } of toSet) {
          cookies.set(name, value, { ...options, httpOnly: true, secure: import.meta.env.PROD, sameSite: 'lax', path: '/' });
        }
        if (responseHeaders) {
          for (const [key, value] of Object.entries(headers ?? {})) responseHeaders.set(key, value);
        }
      },
    },
  });
}

/** Public URL for a photo stored in the machine-photos bucket. */
export const photoUrl = (key: string): string =>
  `${env.SUPABASE_URL}/storage/v1/object/public/${PHOTO_BUCKET}/${key.split('/').map(encodeURIComponent).join('/')}`;
