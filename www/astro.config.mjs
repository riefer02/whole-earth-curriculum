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
        // Print packs are noindex duplicates of lesson pages: keep them out of
        // the sitemap so search engines see one canonical copy of each lesson.
        if (/\/print\/$/.test(pathname)) return false;
        return !pathname.startsWith('/search/') && !pathname.startsWith('/support/thanks/');
      },
    }),
    copyAssets(),
  ],
  markdown: {
    processor: satteri({ hastPlugins: [standardsLinks] }),
  },
});
