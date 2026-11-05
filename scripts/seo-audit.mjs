/**
 * SEO audit: checks every built page plus the live (database) pages.
 * Usage: npm run build && node scripts/seo-audit.mjs [http://localhost:4321]
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const base = process.argv[2];
const files = [];
const walk = (dir) => {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (p.endsWith('.html')) files.push(p);
  }
};
walk('dist/client');

const pages = files.map((f) => ({ id: f.replace('dist/client', ''), html: readFileSync(f, 'utf8') }));
if (base) {
  for (const path of ['/for-sale', '/for-sale/hobart-am15-pass-through', '/manuals', '/manuals/hobart-am15-user-manual', '/manuals/winterhalter-uc-m-manual']) {
    const res = await fetch(base + path);
    pages.push({ id: `${path} (live)`, html: await res.text() });
  }
}

const get = (html, re) => html.match(re)?.[1]?.trim() ?? '';
const problems = [];
const titles = new Map();
const descs = new Map();

for (const { id, html } of pages) {
  const noindex = /name="robots" content="noindex/.test(html);
  const title = get(html, /<title>([^<]*)<\/title>/);
  const desc = get(html, /<meta name="description" content="([^"]*)"/);
  const canonical = get(html, /<link rel="canonical" href="([^"]*)"/);
  const og = get(html, /<meta property="og:image" content="([^"]*)"/);
  const h1s = (html.match(/<h1[\s>]/g) ?? []).length;
  const imgsNoAlt = (html.match(/<img(?![^>]*\balt\b)[^>]*>/g) ?? []).length;
  const ld = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1]);
  const p = (msg) => problems.push(`${id}: ${msg}`);

  if (!title) p('missing <title>');
  else if (title.length > 70 && !noindex) p(`title is ${title.length} chars (aim ≤ 70)`);
  if (!desc) p('missing meta description');
  else if (!noindex && (desc.length < 70 || desc.length > 165)) p(`description is ${desc.length} chars (aim 70–160)`);
  if (!canonical || canonical.endsWith('.html')) p(`bad canonical: ${canonical || 'none'}`);
  if (!og) p('missing og:image');
  if (h1s !== 1) p(`${h1s} <h1> elements (want 1)`);
  if (imgsNoAlt) p(`${imgsNoAlt} <img> without alt`);
  if (!/<html lang="en-GB"/.test(html)) p('missing lang');
  for (const json of ld) {
    try {
      JSON.parse(json);
    } catch {
      p('invalid JSON-LD');
    }
  }
  if (!noindex && !ld.some((j) => j.includes('BreadcrumbList'))) p('no BreadcrumbList schema');
  if (!noindex) {
    if (titles.has(title)) p(`duplicate title with ${titles.get(title)}`);
    if (descs.has(desc)) p(`duplicate description with ${descs.get(desc)}`);
    titles.set(title, id);
    descs.set(desc, id);
  }
}

console.log(`Audited ${pages.length} pages.`);
if (problems.length) {
  console.log(problems.join('\n'));
  process.exitCode = 1;
} else console.log('No SEO problems found.');
