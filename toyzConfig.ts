interface ToyzConfigProps {
  baseUrl: string;
  contentfulSpaceId: string;
  contentfulAccessToken: string;
}

const toyzConfig: ToyzConfigProps = {
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  contentfulSpaceId: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  contentfulAccessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
};

export default toyzConfig;
