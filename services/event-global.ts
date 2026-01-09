import { unstable_cache } from 'next/cache';

import { getPayloadClient } from '@/utils/payloadClient';

const getEventGlobal = unstable_cache(
  async (locale: string) => {
    const payload = await getPayloadClient();

    return await payload.findGlobal({
      slug: 'events-global',
      locale: locale as Locale,
      depth: 1,
    });
  },
  ['events-global'],
  { revalidate: 86400 }
);

export default getEventGlobal;
