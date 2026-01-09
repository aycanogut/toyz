import { unstable_cache } from 'next/cache';

import { getPayloadClient } from '@/utils/payloadClient';

const getArticles = unstable_cache(
  async () => {
    const payload = await getPayloadClient();

    return await payload.findGlobal({
      slug: 'slider',
    });
  },
  ['slider'],
  { revalidate: 86400 }
);

export default getArticles;
