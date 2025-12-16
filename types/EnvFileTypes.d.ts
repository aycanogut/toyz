namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_TITLE: string;
    NEXT_PUBLIC_BASE_URL: string;
    DATABASE_URI: string;
    PAYLOAD_SECRET: string;
    RESEND_API_KEY: string;
    NEXT_PUBLIC_CONTACT_EMAIL: string;
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY: string;
    RECAPTCHA_SECRET_KEY: string;
    NEXT_PUBLIC_GA_MEASUREMENT_ID: string;
    R2_BUCKET_NAME: string;
    R2_ACCESS_KEY_ID: string;
    R2_SECRET_ACCESS_KEY: string;
    R2_ENDPOINT: string;
    SENTRY_AUTH_TOKEN: string;
  }
}
