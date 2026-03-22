import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://asistedcos.org',
  output: 'hybrid',
  adapter: vercel(),
  integrations: [
    tailwind(),
  ],
});
