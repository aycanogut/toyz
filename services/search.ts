import { unstable_cache } from 'next/cache';

import { getPayloadClient } from '@/utils/payloadClient';

const getSearch = unstable_cache(
  async (locale: string) => {
    const payload = await getPayloadClient();

    return await payload.findGlobal({
      slug: 'searchPage',
      locale: locale as Locale,
      depth: 1,
    });
  },
  ['search'],
  { revalidate: 3600 }
);

export default getSearch;
