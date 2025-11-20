import { unstable_cache } from 'next/cache';

import { getPayloadClient } from '@/utils/payloadClient';

const getContact = unstable_cache(
  async (locale: string) => {
    const payload = await getPayloadClient();

    return await payload.findGlobal({
      slug: 'contact',
      locale: locale as Locale,
      depth: 1,
    });
  },
  ['contact'],
  { revalidate: 3600 }
);

export default getContact;
