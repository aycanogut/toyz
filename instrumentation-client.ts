import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: 'https://1f674fa958ba24da3ffe9a006ce5a119@o4506105309036544.ingest.us.sentry.io/4510409070673920',
  tracesSampleRate: 1,
  enableLogs: true,
  sendDefaultPii: true,
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
