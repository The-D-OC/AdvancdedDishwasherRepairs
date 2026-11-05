import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const url = (path: string) => new URL(path, site).toString();
  const body = [
    'User-agent: *',
    'Allow: /',
    'Disallow: /api/',
    'Disallow: /admin',
    'Disallow: /thanks',
    '',
    `Sitemap: ${url('/sitemap-index.xml')}`,
    `Sitemap: ${url('/sitemap-machines.xml')}`,
    `Sitemap: ${url('/sitemap-manuals.xml')}`,
    '',
  ].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
