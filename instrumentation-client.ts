import * as Sentry from '@sentry/nextjs';

import toyzConfig from './toyzConfig';

Sentry.init({
  dsn: toyzConfig.sentryDsn,
  enabled: process.env.NODE_ENV === 'production',
  debug: false,
  tracesSampleRate: 1,
  enableLogs: true,
  sendDefaultPii: true,
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
