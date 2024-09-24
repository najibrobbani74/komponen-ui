import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://najibrobbani74.github.io',
  base: 'komponen-ui',
  integrations: [tailwind()]
});