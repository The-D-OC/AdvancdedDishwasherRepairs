// @ts-check
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  site: 'https://www.advanceddishwasherrepairs.co.uk',
  trailingSlash: 'never',

  // Pages are prerendered to static HTML by default. Only routes that opt out
  // with `export const prerender = false` (the form API) run on the Worker.
  output: 'static',
  adapter: cloudflare({
    // All images are used on prerendered pages, so optimise them at build time.
    imageService: 'compile',
  }),

  // No user sessions on this site — avoids provisioning an unused KV namespace.
  session: false,

  integrations: [
    sitemap({
      filter: (page) => !/\/(api\/|admin|thanks|404)/.test(page),
    }),
  ],

  redirects: {
    // Old URL for the sales page.
    '/washing-machines': '/for-sale',
  },

  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover',
  },

  build: {
    // Emit /about.html rather than /about/index.html so Cloudflare serves
    // /about directly (matching canonical URLs) instead of redirecting to /about/.
    format: 'file',
    inlineStylesheets: 'auto',
  },
});
