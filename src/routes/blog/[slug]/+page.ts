import type { PageLoad } from './$types';

import { getBlogModuleFromSlug } from '$lib/content';

export const load: PageLoad = async ({ data, params }) => ({
  ...data,
  Content: await getBlogModuleFromSlug(params.slug)
});
