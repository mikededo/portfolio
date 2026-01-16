import type { Component } from '@lucide/svelte'

import matter from 'gray-matter'
import * as v from 'valibot'

import { dev } from '$app/environment'

const getBaseUrl = () => dev ? 'http://localhost:5173' : 'https://mikededo.com'

const getModulePathFromSlug = (slug: string) => `/src/blog/${slug}.mdx`

const getPostUrl = (id: string) => `/blog/${id}`

const rawBlogPosts = import.meta.glob('/src/blog/*.mdx', {
  eager: true,
  import: 'default',
  query: '?raw'
})
const mdxModules = import.meta.glob('/src/blog/*.mdx')

export const PostMetaSchema = v.object({
  date: v.pipe(
    v.string(),
    v.transform((i) => new Date(i)),
    v.date()
  ),
  description: v.pipe(v.string(), v.trim()),
  id: v.pipe(v.string(), v.trim()),
  tags: v.pipe(
    v.optional(v.string(), ''),
    v.transform((v) => v.split(',').map((v) => v.trim())),
    v.array(v.string())
  ),
  title: v.pipe(v.string(), v.trim())
})
export type PostMeta = {
  relativeURL: string
  canonicalURL: string
} & v.InferOutput<typeof PostMetaSchema>

export const getPostsMetadata = () => Object.entries(rawBlogPosts)
  .reduce((agg: PostMeta[], [filePath, rawContent]) => {
    const parsed = v.safeParse(v.string(), rawContent)
    if (!parsed.success) {
      return agg
    }

    const { data } = matter(parsed.output)
    const id = filePath
      .split('/')
      .pop()
      ?.replace(/\.mdx$/, '') as string

    const post = v.parse(PostMetaSchema, { id, ...data })

    return [
      ...agg,
      {
        ...post,
        canonicalURL: new URL(`/blog/${post.id}`, getBaseUrl()).toString(),
        relativeURL: `/blog/${post.id}`
      }
    ]
  }, [])
  .sort((a, b) => b.date.valueOf() - a.date.valueOf())

export const getMetadataFromMatter = (
  id: string,
  data: { [key: string]: unknown }
) => {
  const result = v.safeParse(PostMetaSchema, { id, ...data })
  if (!result.success) {
    console.error(`Unable to parse metadata for ${id}`)
    return null
  }

  const post = result.output
  return {
    ...post,
    canonicalURL: new URL(getPostUrl(post.id), getBaseUrl()).toString(),
    relativeURL: getPostUrl(post.id)
  }
}

export const getBlogPostFromSlug = (slug: string) => {
  const post = rawBlogPosts[getModulePathFromSlug(slug)]
  if (!post) {
    return undefined
  }

  return post
}

export const getBlogModuleFromSlug = async (slug: string) => {
  const post = mdxModules[getModulePathFromSlug(slug)]
  if (!post) {
    return undefined
  }

  return await post() as Promise<{ default: typeof Component }>
}

export type AdjacentPost = { id: string, title: string, relativeURL: string }

export const getAdjacentPosts = (slug: string): { prev: AdjacentPost | null, next: AdjacentPost | null } => {
  const posts = getPostsMetadata()
  const currentIndex = posts.findIndex((post) => post.id === slug)

  if (currentIndex === -1) {
    return { next: null, prev: null }
  }

  // Posts are sorted newest first, so:
  // - "prev" (older) is the next item in the array (higher index)
  // - "next" (newer) is the previous item in the array (lower index)
  const prevPost = posts[currentIndex + 1]
  const nextPost = posts[currentIndex - 1]

  return {
    next: nextPost ? { id: nextPost.id, relativeURL: nextPost.relativeURL, title: nextPost.title } : null,
    prev: prevPost ? { id: prevPost.id, relativeURL: prevPost.relativeURL, title: prevPost.title } : null
  }
}
