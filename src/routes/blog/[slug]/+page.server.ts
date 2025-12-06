import type { PageServerLoad } from './$types'

import { error } from '@sveltejs/kit'
import matter from 'gray-matter'

import { getBlogPostFromSlug, getMetadataFromMatter } from '$lib/content'

export const load: PageServerLoad = async ({ params }) => {
  const raw = getBlogPostFromSlug(params.slug)
  if (!raw) {
    return error(404)
  }

  const { data } = matter(raw as string)
  const metadata = getMetadataFromMatter(params.slug, data)
  if (!metadata) {
    error(404)
  }

  return { metadata, slug: params.slug }
}
