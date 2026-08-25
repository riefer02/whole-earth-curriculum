// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import { copyAssets } from './src/lib/assets';

// https://astro.build/config
export default defineConfig({
  site: process.env.SITE_URL || 'https://wholeearthcurriculum.org',
  output: 'static',
  trailingSlash: 'always',
  compressHTML: true,
  integrations: [sitemap(), copyAssets()],
});
