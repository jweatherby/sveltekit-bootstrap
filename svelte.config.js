// import adapter from 'svelte-adapter-bun';
import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter(),
  },
  package: {
    files: [
      {
        from: 'node_modules/@prisma/client',
        to: 'node_modules/@prisma/client',
      },
    ],
  },
};

export default config;
