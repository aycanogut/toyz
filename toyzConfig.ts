interface ToyzConfigProps {
  title: string;
  baseUrl: string;
  contentfulSpaceId: string;
  contentfulAccessToken: string;
  sendGridApiKey: string;
}

const toyzConfig: ToyzConfigProps = {
  title: process.env.NEXT_PUBLIC_TITLE,
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  contentfulSpaceId: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  contentfulAccessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
  sendGridApiKey: process.env.NEXT_PUBLIC_SENDGRID_API_KEY,
};

export default toyzConfig;
