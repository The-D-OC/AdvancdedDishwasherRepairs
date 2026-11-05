import type { APIRoute } from 'astro';

import { listPublicManuals } from '@/lib/manuals';
import { absoluteUrl } from '@/lib/seo';
import { publicClient } from '@/lib/supabase';

export const prerender = false;

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Live sitemap for the manuals library (managed in /admin, not prerendered). */
export const GET: APIRoute = async () => {
  const manuals = await listPublicManuals(publicClient());
  const latest = manuals.reduce((max, m) => (m.updatedAt > max ? m.updatedAt : max), '');
  const urls = [
    `<url><loc>${absoluteUrl('/manuals')}</loc>${latest ? `<lastmod>${latest}</lastmod>` : ''}</url>`,
    ...manuals.map((m) => `<url><loc>${esc(absoluteUrl(`/manuals/${m.slug}`))}</loc><lastmod>${m.updatedAt}</lastmod></url>`),
  ];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;
  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, max-age=3600' },
  });
};
