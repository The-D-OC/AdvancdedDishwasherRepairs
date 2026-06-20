import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';

import { schemaTypes } from './sanity/schemas';

export default defineConfig({
  name: 'advanced-dishwasher-repairs',
  title: 'Advanced Dishwasher Repairs CMS',

  projectId: process.env.EXPO_PUBLIC_SANITY_PROJECT_ID ?? '',
  dataset: process.env.EXPO_PUBLIC_SANITY_DATASET ?? 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
});
