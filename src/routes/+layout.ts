import { injectAnalytics } from '@vercel/analytics/sveltekit';

import { dev } from '$app/environment';
import { DENY_ANALYTICS } from '$lib/components';

injectAnalytics({
  beforeSend: (e) => window.localStorage.getItem(DENY_ANALYTICS) === 'true' ? null : e,
  mode: dev ? 'development' : 'production'
});
