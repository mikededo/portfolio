import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ url }) => ({
  pathname: url.pathname
});
