import { defineConfig } from 'astro/config';

// https://astro.build/config
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  base: process.env.PAGES_BASE || '',
  vite: {
    ssr: {
      external: ['svgo'],
    },
  },
});
