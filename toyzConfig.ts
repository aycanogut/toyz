interface ToyzConfigProps {
  contentfulSpaceId: string;
  contentfulAccessToken: string;
}

const toyzConfig: ToyzConfigProps = {
  contentfulSpaceId: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID ?? '',
  contentfulAccessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN ?? '',
};

export default toyzConfig;
