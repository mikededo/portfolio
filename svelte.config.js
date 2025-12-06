import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { defineMDSveXConfig, mdsvex } from 'mdsvex';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

import blockquote from './remark/blockquote.ts';

const mdsvexConfig = defineMDSveXConfig({
  extensions: ['.mdx'],
  rehypePlugins: [
    rehypeSlug,
    [
      rehypeAutolinkHeadings,
      {
        behavior: 'wrap',
        properties: { className: ['link-hover'] }
      }
    ]
  ],
  remarkPlugins: [blockquote, remarkGfm],
  smartypants: {
    dashes: 'oldschool',
    quotes: true
  }
});

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', ...(mdsvexConfig.extensions ?? [])],
  kit: { adapter: adapter() },
  preprocess: [
    vitePreprocess(),
    mdsvex(mdsvexConfig)
  ]
};

export default config;
