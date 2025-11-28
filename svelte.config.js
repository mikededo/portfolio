import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { defineMDSveXConfig, mdsvex } from 'mdsvex';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

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
  remarkPlugins: [remarkGfm],
  smartypants: {
    dashes: 'oldschool'
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
