import { unstable_cache } from 'next/cache';

import { getPayloadClient } from '@/utils/payloadClient';

const getSlider = unstable_cache(
  async () => {
    const payload = await getPayloadClient();

    return await payload.findGlobal({
      slug: 'slider',
    });
  },
  ['slider'],
  { revalidate: 86400, tags: ['slider'] }
);

export default getSlider;
