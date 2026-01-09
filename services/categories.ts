import { unstable_cache } from 'next/cache';

import { getPayloadClient } from '@/utils/payloadClient';

const getCategories = unstable_cache(
  async (locale: string) => {
    const payload = await getPayloadClient();

    const result = await payload.find({
      collection: 'categories',
      depth: 1,
      locale: locale as Locale,
      pagination: false,
    });

    return result.docs;
  },
  ['categories'],
  { revalidate: 86400 }
);

export default getCategories;
