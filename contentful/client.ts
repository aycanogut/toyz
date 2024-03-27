import { createClient } from 'contentful';

import toyzConfig from '@/toyzConfig';

export const createContentClient = () => {
  return createClient({
    space: toyzConfig.contentfulSpaceId,
    accessToken: toyzConfig.contentfulAccessToken,
  });
};

const client = createContentClient();

export const getEntriesByType = async (type: string) => {
  const response = await client.getEntries({
    content_type: type,
  });

  return response.items;
};
