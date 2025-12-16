import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: 'https://51d903a6591e0fa84f6d4bf2fe0e0938@o4506105309036544.ingest.us.sentry.io/4510546013519872',
  debug: false,
  tracesSampleRate: 1,
  enableLogs: true,
  sendDefaultPii: true,
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
