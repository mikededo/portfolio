import { injectAnalytics } from '@vercel/analytics/sveltekit';

import { dev } from '$app/environment';
import { DENY_ANALYTICS } from '$lib/cookies';

injectAnalytics({
  beforeSend: (e) => window.localStorage.getItem(DENY_ANALYTICS) ? null : e,
  mode: dev ? 'development' : 'production'
});
