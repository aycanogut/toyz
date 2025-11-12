namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_TITLE: string;
    NEXT_PUBLIC_BASE_URL: string;
    DATABASE_URI: string;
    PAYLOAD_SECRET: string;
    BLOB_READ_WRITE_TOKEN: string;
    RESEND_API_KEY: string;
    NEXT_PUBLIC_CONTACT_EMAIL: string;
    NEXT_PUBLIC_CONTACT_FROM: string;
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY: string;
    RECAPTCHA_SECRET_KEY: string;
  }
}
