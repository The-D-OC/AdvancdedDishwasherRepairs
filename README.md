# Advanced Dishwasher Repairs — website

Marketing site for Advanced Dishwasher Repairs: services, brands, fault-code and manual search, machines for sale, and enquiry/booking forms.

**Stack:** [Astro 7](https://docs.astro.build) + TypeScript, deployed to **Cloudflare Workers** with [`@astrojs/cloudflare`](https://docs.astro.build/en/guides/integrations-guide/cloudflare/).

- Most pages are prerendered to static HTML at build time (fast, SEO-friendly).
- **Machines for sale** and the **manuals library** are stored in **Supabase** (Postgres + Storage for photos and PDFs) and managed live from the **`/admin`** area — no rebuild needed. Admin logins use **Supabase Auth**.
- The Worker also runs the enquiry form handler (`src/pages/api/enquiry.ts`).

## Getting started

```bash
npm install
cp .dev.vars.example .dev.vars   # optional: email/Turnstile keys
npm run dev                      # http://localhost:4321 — admin at /admin
```

Local dev talks to the real Supabase project (URL and publishable key are in `wrangler.jsonc`), so listings you edit locally are live.

| Command           | What it does                                                 |
| ----------------- | ------------------------------------------------------------ |
| `npm run dev`     | Local dev server                                             |
| `npm run check`   | Type-check all `.astro` and `.ts` files                      |
| `npm run build`   | Type-check and build to `dist/`                              |
| `npm run preview` | Serve the production build locally in workerd                |
| `npm run deploy`  | Build and deploy to Cloudflare (`wrangler deploy`)           |
| `npm run seo:audit` | Check every page's title, description, canonical, H1, alt text and schema (run after `build`; pass `http://localhost:4321` to include live pages) |

Requires Node 22.23.4 or newer.

## Managing machines for sale and manuals (`/admin`)

### Adding an admin

1. Supabase dashboard → project **advanced-dishwasher-repairs** → **Authentication → Users → Add user → Create new user**. Enter the email and a strong password and tick **Auto Confirm User**.
2. **SQL Editor** → run (lower-case email):
   ```sql
   insert into public.admins (email) values ('someone@example.com');
   ```

Only emails in `public.admins` can log in to `/admin` or change anything — even if someone else creates an account. To remove access, delete the row (and the user). Reset passwords from **Authentication → Users**.

Recommended in **Authentication → Sign In / Providers**: turn off **Allow new users to sign up**, and turn on leaked-password protection.

### What admins can do

- **Add a machine** — title, brand, model, type, condition, price (and optional "was" price), summary, full description, specifications, highlights, warranty.
- **Upload photos** (up to 12) — resized in the browser to 1600px + a 640px thumbnail (WebP) before upload, stored in Supabase Storage (`machine-photos` bucket, served from its CDN). Set alt text for each and choose the main photo.
- **Set status** — *Available* (call/email buttons), *Reserved* (badge), *Sold* (greyed out) or *Draft* (hidden).
- **Feature** a machine on the home page.
- **SEO** — custom URL slug, SEO title and description, with a live Google preview and character counters.
- **Delete** a listing (removes its photos too).

Changes are live immediately on `/for-sale`, each `/for-sale/<slug>` page, the home page and brand pages, and in `/sitemap-machines.xml`.

### Manuals (`/admin/manuals`)

- **Add a manual** — title, brand, model, machine type, description.
- **Upload a PDF** (up to 25 MB, PDF only — checked server-side), replace it later, or remove it. Without a PDF the page shows a "Request this manual" button.
- **Published** toggle — untick to hide a manual without deleting it.
- **SEO** — URL slug, SEO title and description with a Google preview.

Manuals appear immediately on `/manuals` (instant search), each `/manuals/<slug>` page (with DigitalDocument structured data linking the PDF), the home page's "Recently added" list, brand pages, and `/sitemap-manuals.xml`.

### How it's secured

- The website only uses the **publishable** Supabase key — no secret/service key exists in the code or Cloudflare.
- **Row level security** (see `supabase/migrations/`): anyone can read non-draft machines and published manuals; only admins can see hidden ones or insert/update/delete. Photo and PDF uploads/deletes are admin-only too.
- Admin sessions are Supabase Auth tokens in HttpOnly cookies, validated with Supabase on every `/admin` request. Login attempts are rate-limited per IP; all admin forms are same-origin only; admin pages are `noindex` and never cached.
- Optional extra layer: put `/admin*` behind **Cloudflare Access**.

### Database

Schema and policies are in `supabase/migrations/` (already applied to the project); `supabase/seed.sql` holds the sample listings and manuals that were loaded. You can also view/edit rows directly in the Supabase **Table Editor** (`machines` and `manuals` tables; files in Storage buckets `machine-photos` and `manuals`).

## Editing other content

Brands, services, fault codes, blog posts, coverage areas and testimonials live in **`src/data/content.ts`** (changes need a deploy). Business details (phone, email, hours, stats, navigation) are in **`src/config/site.ts`**.

## Forms (contact, booking, for-sale enquiries)

All three forms post to `/api/enquiry`, which:

1. Rejects cross-origin posts (Astro's built-in origin check).
2. Silently drops bots — a hidden honeypot field and a minimum fill time.
3. Rate-limits each IP to 5 submissions per minute (Workers Rate Limiting binding `FORM_RATE_LIMITER`).
4. Verifies [Cloudflare Turnstile](https://developers.cloudflare.com/turnstile/) if configured.
5. Validates every field server-side.
6. Emails the submission via [Resend](https://resend.com) to `ENQUIRY_TO_EMAIL`, with Reply-To set to the customer.

Forms work without JavaScript (plain POST + redirect to `/thanks`); with JavaScript they submit in place and show field errors inline.

In `npm run dev` without an API key, submissions are logged to the terminal instead of emailed.

## Deploying to Cloudflare

1. `npx wrangler login`
2. Set secrets (once):
   ```bash
   npx wrangler secret put RESEND_API_KEY
   npx wrangler secret put TURNSTILE_SECRET_KEY   # optional
   ```
3. In Resend, verify the domain `advanceddishwasherrepairs.co.uk` so the sender in `ENQUIRY_FROM_EMAIL` (in `wrangler.jsonc`) can send.
4. Optional Turnstile: create a widget in the Cloudflare dashboard, then set `PUBLIC_TURNSTILE_SITE_KEY` in the build environment. The widget only appears when this is set.
5. `npm run deploy`
6. In the Cloudflare dashboard, add the custom domain `www.advanceddishwasherrepairs.co.uk` to the Worker and redirect the apex domain to `www`.
7. In Supabase → **Authentication → URL Configuration**, set the Site URL to `https://www.advanceddishwasherrepairs.co.uk`.
8. Submit `https://www.advanceddishwasherrepairs.co.uk/sitemap-index.xml`, `/sitemap-machines.xml` and `/sitemap-manuals.xml` in Google Search Console.

Supabase's free plan pauses projects after a week without any activity; the live site's traffic keeps it active, but check this before launch if the site is quiet.

## Project structure

```
src/
├── assets/brand/        logo (optimised at build time)
├── components/
│   ├── forms/           EnquiryForm (contact / booking / machine)
│   ├── layout/          Header, Footer, mobile call bar
│   ├── sale/            MachineCard, LiveMachines (server island)
│   ├── search/          SearchBar + client-side filtering
│   ├── seo/             Seo meta tags, Breadcrumbs
│   └── ui/              Button, Icon, PageHero, CtaBanner, …
├── components/admin/    MachineForm, ManualForm (admin add/edit)
├── components/manuals/  LiveManuals (server island)
├── config/site.ts       business details & navigation
├── data/content.ts      static content (not machines)
├── lib/machines.ts      machines: Supabase queries, validation, photos
├── lib/manuals.ts       manuals: Supabase queries, validation, PDFs
├── lib/supabase.ts      Supabase clients (public + admin session)
├── lib/auth.ts          admin login via Supabase Auth
├── middleware.ts        protects /admin
├── layouts/BaseLayout   <head>, structured data, header/footer
├── lib/                 content access, form validation, SEO helpers
├── pages/               routes; admin/*, for-sale/* and api/* run on the Worker
supabase/                schema migrations + seed (applied to the Supabase project)
└── styles/global.css    design tokens & shared styles
```

## SEO

- Every page: unique title (kept within Google's display length) and description, canonical URL, Open Graph + Twitter cards, `robots` meta with large image previews, `lang="en-GB"`, a single H1, alt text on every image.
- Structured data on every page: LocalBusiness + BreadcrumbList, plus WebSite (home), Service, FAQPage, BlogPosting, DigitalDocument (manuals), ItemList and **Product** (each machine — price, condition, availability, photo).
- Sitemaps: `sitemap-index.xml` (static pages, built), `sitemap-machines.xml` (live, with image entries) and `sitemap-manuals.xml` (live). Both are listed in `robots.txt`, which blocks `/admin`, `/api` and `/thanks`.
- Machine listings get per-listing SEO title/description/slug fields in `/admin`; the first photo becomes the social share image.
- `npm run seo:audit` checks all of the above.
- The old `/washing-machines` URL 301-redirects to `/for-sale`.
