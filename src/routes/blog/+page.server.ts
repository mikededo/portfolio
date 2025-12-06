import type { PageServerLoad } from './$types'

import { getPostsMetadata } from '$lib/content'

export const load: PageServerLoad = () => ({ posts: getPostsMetadata() })
