interface ToyzConfigProps {
  contentfulSpaceId: string;
  contentfulAccessToken: string;
  baseUrl: string;
}

const toyzConfig: ToyzConfigProps = {
  contentfulSpaceId: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID ?? '',
  contentfulAccessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN ?? '',
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL ?? '',
};

export default toyzConfig;
