interface ToyzConfigProps {
  title: string;
  baseUrl: string;
  resendApiKey: string;
  databaseUri: string;
  payloadSecret: string;
  vercelBlobReadWriteToken: string;
}

const toyzConfig: ToyzConfigProps = {
  title: process.env.NEXT_PUBLIC_TITLE,
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  resendApiKey: process.env.NEXT_PUBLIC_RESEND_API_KEY,
  databaseUri: process.env.DATABASE_URI,
  payloadSecret: process.env.PAYLOAD_SECRET,
  vercelBlobReadWriteToken: process.env.BLOB_READ_WRITE_TOKEN,
};

export default toyzConfig;
