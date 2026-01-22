import adapter from '@sveltejs/adapter-vercel'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import { defineMDSveXConfig, escapeSvelte, mdsvex } from 'mdsvex'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import { createHighlighter } from 'shiki'

import blockquote from './remark/blockquote.ts'

const highlighter = await createHighlighter({
  langs: ['javascript', 'typescript', 'tsx', 'css', 'html', 'bash', 'json', 'svelte'],
  themes: ['catppuccin-latte', 'catppuccin-macchiato']
})

const mdsvexConfig = defineMDSveXConfig({
  extensions: ['.mdx'],
  highlight: {
    highlighter: (code, lang = 'text') => {
      const html = escapeSvelte(highlighter.codeToHtml(code, {
        defaultColor: false,
        lang,
        themes: { dark: 'catppuccin-macchiato', light: 'catppuccin-latte' }
      }))
      return `{@html \`${html}\`}`
    }
  },
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
})

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', ...(mdsvexConfig.extensions ?? [])],
  kit: { adapter: adapter() },
  preprocess: [
    vitePreprocess(),
    mdsvex(mdsvexConfig)
  ]
}

export default config
