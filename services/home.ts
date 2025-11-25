import { unstable_cache } from 'next/cache';

import { getPayloadClient } from '@/utils/payloadClient';

const getHome = unstable_cache(
  async (locale: string) => {
    const payload = await getPayloadClient();

    return await payload.findGlobal({
      slug: 'home',
      locale: locale as Locale,
      depth: 1,
    });
  },
  ['home']
  // { revalidate: 3600 }
);

export default getHome;
