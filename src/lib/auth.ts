/**
 * Admin authentication via Supabase Auth (email + password).
 * A user can manage listings only if their email is in `public.admins` —
 * the same rule the database enforces with row level security.
 */
import type { SupabaseClient } from '@/lib/supabase';

export interface AdminUser {
  email: string;
}

/** Returns the signed-in admin, or null if not signed in / not an admin. */
export async function getAdmin(db: SupabaseClient): Promise<AdminUser | null> {
  // getUser() validates the session with Supabase (don't trust cookie contents alone).
  const { data, error } = await db.auth.getUser();
  if (error || !data.user?.email) return null;
  const { data: isAdmin, error: rpcError } = await db.rpc('is_admin');
  if (rpcError || isAdmin !== true) return null;
  return { email: data.user.email };
}

export async function signIn(
  db: SupabaseClient,
  email: string,
  password: string,
): Promise<{ ok: true } | { ok: false; message: string }> {
  const { error } = await db.auth.signInWithPassword({ email, password });
  if (error) return { ok: false, message: 'Incorrect email or password.' };
  if (!(await getAdmin(db))) {
    await db.auth.signOut();
    return { ok: false, message: 'This account isn’t allowed to manage listings.' };
  }
  return { ok: true };
}
