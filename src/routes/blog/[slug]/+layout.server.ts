import type { LayoutServerLoad } from './$types'

import { getAdjacentPosts } from '$lib/content'

export const load: LayoutServerLoad = ({ params }) => {
  const { next, prev } = getAdjacentPosts(params.slug)
  return { next, prev }
}
