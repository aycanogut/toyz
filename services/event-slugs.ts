import { getPayloadClient } from '@/utils/payloadClient';

const getAllEventSlugs = async (locale: string) => {
  const payload = await getPayloadClient();

  const result = await payload.find({
    collection: 'events',
    locale: locale as Locale,
    where: {
      _status: {
        equals: 'published',
      },
    },
    limit: 0,
    pagination: false,
    select: {
      slug: true,
    },
  });

  return result.docs;
};

export default getAllEventSlugs;
