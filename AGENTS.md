# Project notes for coding agents

This site is **Astro 7 + TypeScript**, deployed to **Cloudflare Workers** via `@astrojs/cloudflare` (v14).
It is no longer an Expo app.

Read the current docs before changing framework-level code — both moved recently:

- Astro: https://docs.astro.build (v7 — Rust compiler: unclosed tags are build errors; `compressHTML: 'jsx'` drops whitespace at line breaks between text and `{expressions}` / inline tags, so keep them on one line)
- Cloudflare adapter: https://docs.astro.build/en/guides/integrations-guide/cloudflare/ (`Astro.locals.runtime` is removed; use `import { env } from 'cloudflare:workers'`)

Conventions:

- Static content lives in `src/data/content.ts`; business details in `src/config/site.ts`.
- Machines for sale and manuals live in Supabase project `hxziesvqdjweaydxlwmd` (tables `machines`, `manuals`; buckets `machine-photos`, `manuals`), managed at `/admin` (`src/lib/machines.ts`, `src/lib/manuals.ts`, `src/lib/supabase.ts`, `src/lib/auth.ts`, `src/middleware.ts`). Only the publishable key is used; access control is RLS + `public.admins`. Record schema changes in `supabase/migrations/`.
- Pages are prerendered except `/for-sale/*`, `/manuals/*`, `/admin/*`, `/api/*` and the `sitemap-machines.xml` / `sitemap-manuals.xml` endpoints (`export const prerender = false`). Static pages show live data via the `LiveMachines` / `LiveManuals` server islands (`server:defer`).
- Worker types are generated with `wrangler types --include-runtime=false` (full runtime types clash with DOM types). Extra declarations are in `src/env.d.ts`.
- `build.format: 'file'` keeps URLs slash-less to match canonical URLs.
- Run `npm run check` (0 errors), `npm run build`, and `npm run seo:audit` before finishing.
