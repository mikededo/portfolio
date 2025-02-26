import { injectAnalytics } from '@vercel/analytics/sveltekit';

import { dev } from '$app/environment';
import { ALLOW_ANALYTICS_COOKIE } from '$lib/cookies';

injectAnalytics({
  beforeSend: (e) => window.localStorage.getItem(ALLOW_ANALYTICS_COOKIE) ? e : null,
  mode: dev ? 'development' : 'production'
});
