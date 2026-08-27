// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import { copyAssets } from './src/lib/assets';
import { standardsLinks } from './src/lib/standardsLinks';
import { satteri } from '@astrojs/markdown-satteri';

// https://astro.build/config
export default defineConfig({
  site: process.env.SITE_URL || 'https://wholeearthcurriculum.org',
  output: 'static',
  trailingSlash: 'always',
  compressHTML: true,
  integrations: [
    sitemap({
      filter: (page) => {
        const { pathname } = new URL(page);
        return !pathname.startsWith('/search/') && !pathname.startsWith('/support/thanks/');
      },
    }),
    copyAssets(),
  ],
  markdown: {
    processor: satteri({ hastPlugins: [standardsLinks] }),
  },
});
