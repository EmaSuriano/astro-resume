import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import starlight from '@astrojs/starlight';
import { astroExpressiveCode } from '@astrojs/starlight/expressive-code';

export default defineConfig({
  integrations: [
    tailwind(),
    astroExpressiveCode(),
    mdx(), 
    starlight({
      title: '',
    }),
  ],
  vite: {
    ssr: {
      external: ['svgo'],
    },
  },
});