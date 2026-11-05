/// <reference types="astro/client" />

declare namespace App {
  interface Locals {
    /** Supabase client carrying the admin's session (set by middleware on /admin). */
    supabase?: import('@supabase/supabase-js').SupabaseClient;
    /** The signed-in admin (set by middleware on /admin pages other than login). */
    admin?: import('@/lib/auth').AdminUser;
  }
}

// Secrets are set with `npx wrangler secret put <NAME>` (or `.dev.vars` locally),
// so `wrangler types` can't see them unless .dev.vars exists. Declare them here.
declare namespace Cloudflare {
  interface Env {
    RESEND_API_KEY?: string;
    TURNSTILE_SECRET_KEY?: string;
  }
}

interface ImportMetaEnv {
  readonly PUBLIC_TURNSTILE_SITE_KEY?: string;
}

// Worker runtime types are generated with `--include-runtime=false` because the
// full Workers runtime typings clash with the DOM types used by browser scripts.
// Declare just the pieces the server code uses.
interface RateLimit {
  limit(options: { key: string }): Promise<{ success: boolean }>;
}

declare module 'cloudflare:workers' {
  export const env: Cloudflare.Env;
}
