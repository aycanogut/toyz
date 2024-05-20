import { createClient } from 'contentful';

import { Locale } from '@/i18n';
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
    locale,
  });

  return response.items;
};

export const getEntryBySlug = async (type: string, slug: string, locale: Locale) => {
  const queryOptions = {
    content_type: type,
    'fields.slug[match]': slug,
    locale,
  };
  const queryResult = await client.getEntries(queryOptions);

  return queryResult.items[0];
};
