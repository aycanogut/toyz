interface ToyzConfigProps {
  title: string;
  baseUrl: string;
  resendApiKey: string;
  contactEmail: string;
  databaseUri: string;
  payloadSecret: string;
  vercelBlobReadWriteToken: string;
  reCaptchaSiteKey: string;
  reCaptchaSecretKey: string;
}

const toyzConfig: ToyzConfigProps = {
  title: process.env.NEXT_PUBLIC_TITLE,
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  resendApiKey: process.env.RESEND_API_KEY,
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL,
  databaseUri: process.env.DATABASE_URI,
  payloadSecret: process.env.PAYLOAD_SECRET,
  vercelBlobReadWriteToken: process.env.BLOB_READ_WRITE_TOKEN,
  reCaptchaSiteKey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
  reCaptchaSecretKey: process.env.RECAPTCHA_SECRET_KEY,
};

export default toyzConfig;
