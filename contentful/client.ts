import { createClient } from 'contentful';

import toyzConfig from '@/toyzConfig';

export const createContentClient = () => {
  return createClient({
    space: toyzConfig.contentfulSpaceId,
    accessToken: toyzConfig.contentfulAccessToken,
  });
};

const client = createContentClient();

export const getEntriesByType = async (type: string, locale: Locale, keyword: string) => {
  const response = await client.getEntries({
    content_type: type,
    'fields.title[match]': keyword,
    order: ['-sys.createdAt'],
    locale,
  });

  return response.items;
};

export const getEntryBySlug = async (type: string, slug: string, locale: Locale) => {
  const queryResult = await client.getEntries({
    content_type: type,
    'fields.slug[match]': slug,
    locale,
  });

  return queryResult.items[0];
};

export const getEntryCategories = async (type: string, locale: Locale) => {
  const response = await client.getEntries({
    content_type: type,
    locale,
  });

  return response.items;
};
