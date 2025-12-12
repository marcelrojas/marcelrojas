// @ts-check
import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import vesper from './src/data/vesper.json';

// https://astro.build/config
export default defineConfig({
  // URL canónica de producción
  site: 'https://marcelrojas.com',

  // SEO: Forzar 'never' para que las URLs no tengan barra final.
  // Esto evita contenido duplicado (marcelrojas.com/about vs marcelrojas.com/about/)
  trailingSlash: 'never',

  // Seguridad
  security: {
    checkOrigin: true
  },

  // Rendimiento: Configuración de Prefetch unificada
  prefetch: {
    defaultStrategy: 'viewport', // Carga enlaces cuando entran en pantalla
    prefetchAll: true // Habilita prefetch para todos los links internos
  },

  // Optimizaciones de compilación (Vite)
  vite: {
    build: {
      sourcemap: false, // Menor peso en build final
      cssCodeSplit: true, // Asegura que el CSS se divida por chunks
    },
  },

  // Herramientas de desarrollo
  devToolbar: {
    enabled: false
  },

  // Integraciones
  integrations: [
    svelte(),
    mdx(),
    sitemap({
      // Opcional: Configura el sitemap para respetar el 'trailingSlash: never'
      // Aunque el plugin suele leer la config de Astro automáticamente.
    })
  ],

  markdown: {
    shikiConfig: {
      theme: vesper,
    },
  },
});