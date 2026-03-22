import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://asistedcos.org',
  output: 'static',
  adapter: vercel(),
  integrations: [
    tailwind(),
  ],
});
