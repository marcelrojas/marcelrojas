// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import svelte from '@astrojs/svelte';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import partytown from '@astrojs/partytown';
import vesper from './src/data/vesper.json';

// https://astro.build/config
export default defineConfig({
  vite: {
    build: {
      sourcemap: false, // Disable sourcemaps for production
    },
  },

  devToolbar: {
    enabled: false
  },

  site: 'https://marcelrojas.com',
  trailingSlash: "ignore",
  prefetch: true,

  prefetch: {
    defaultStrategy: 'viewport',
    prefetchAll: true,
  },

  security: {
    checkOrigin: true
  },

  integrations: [
    react(),
    svelte(),
    mdx(),
    sitemap(),
    partytown({
      config: { debug: false },
    })
  ],

  markdown: {
    shikiConfig: {
      theme: vesper,
    },
  },
});