interface ToyzConfigProps {
  title: string;
  baseUrl: string;
  sendGridApiKey: string;
}

const toyzConfig: ToyzConfigProps = {
  title: process.env.NEXT_PUBLIC_TITLE,
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  sendGridApiKey: process.env.NEXT_PUBLIC_SENDGRID_API_KEY,
};

export default toyzConfig;
