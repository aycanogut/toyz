interface ToyzConfigProps {
  title: string;
  baseUrl: string;
  resendApiKey: string;
  contactEmail: string;
  databaseUri: string;
  payloadSecret: string;
  reCaptchaSiteKey: string;
  reCaptchaSecretKey: string;
  gaId: string;
  r2BucketName: string;
  r2AccessKeyId: string;
  r2SecretAccessKey: string;
  r2Endpoint: string;
  sentryAuthToken: string;
  sentryDsn: string;
}

const toyzConfig: ToyzConfigProps = {
  title: process.env.NEXT_PUBLIC_TITLE,
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  resendApiKey: process.env.RESEND_API_KEY,
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL,
  databaseUri: process.env.DATABASE_URI,
  payloadSecret: process.env.PAYLOAD_SECRET,
  reCaptchaSiteKey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
  reCaptchaSecretKey: process.env.RECAPTCHA_SECRET_KEY,
  gaId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
  r2BucketName: process.env.R2_BUCKET_NAME,
  r2AccessKeyId: process.env.R2_ACCESS_KEY_ID,
  r2SecretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  r2Endpoint: process.env.R2_ENDPOINT,
  sentryAuthToken: process.env.SENTRY_AUTH_TOKEN,
  sentryDsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
};

export default toyzConfig;
