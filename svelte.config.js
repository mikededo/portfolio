// @ts-check
import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.md', '.svelte'],
  kit: { adapter: adapter() },
  preprocess: [vitePreprocess(), mdsvex({
    extensions: ['.md'],
    layout: resolve(__dirname, './src/lib/components/markdown/layout.svelte')
  })]
};

export default config;
