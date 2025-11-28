// src/routes/blog/[slug]/+page.server.ts

import type { PageServerLoad } from './$types';

import { error } from '@sveltejs/kit';
import matter from 'gray-matter';

import { getBlogPostFromSlug, getMetadataFromMatter } from '$lib/content';

export const load: PageServerLoad = async ({ params }) => {
  const raw = getBlogPostFromSlug(params.slug);
  if (!raw) {
    return error(404);
  }

  const { data } = matter(raw as string);
  return { metadata: getMetadataFromMatter(params.slug, data), slug: params.slug };
};
