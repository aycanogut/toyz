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

export const getEntryBySlug = async (type: string, slug: string) => {
  const queryOptions = {
    content_type: type,
    'fields.slug[match]': slug,
  };
  const queryResult = await client.getEntries(queryOptions);

  return queryResult.items[0];
};
