import { unstable_cache } from 'next/cache';

import { getPayloadClient } from '@/utils/payloadClient';

const getAbout = unstable_cache(
  async (locale: string) => {
    const payload = await getPayloadClient();

    return await payload.findGlobal({
      slug: 'about',
      locale: locale as Locale,
      depth: 1,
    });
  },
  ['about'],
  { revalidate: 3600 }
);

export default getAbout;
