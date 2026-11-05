import type { APIRoute } from 'astro';

import { listPublicMachines, mediaUrl } from '@/lib/machines';
import { absoluteUrl } from '@/lib/seo';
import { publicClient } from '@/lib/supabase';

export const prerender = false;

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Live sitemap for machine listings (they aren't prerendered, so the static sitemap can't see them). */
export const GET: APIRoute = async () => {
  const machines = (await listPublicMachines(publicClient())).filter((m) => m.status !== 'sold');
  const latest = machines.reduce((max, m) => (m.updatedAt > max ? m.updatedAt : max), '');

  const urls = [
    `<url><loc>${absoluteUrl('/for-sale')}</loc>${latest ? `<lastmod>${latest}</lastmod>` : ''}</url>`,
    ...machines.map(
      (m) =>
        `<url><loc>${esc(absoluteUrl(`/for-sale/${m.slug}`))}</loc><lastmod>${m.updatedAt}</lastmod>${m.images
          .map((img) => `<image:image><image:loc>${esc(absoluteUrl(mediaUrl(img.key)))}</image:loc></image:image>`)
          .join('')}</url>`,
    ),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls.join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, max-age=3600' },
  });
};
