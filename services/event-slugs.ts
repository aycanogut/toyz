import hasEventGallery from '@/utils/hasEventGallery';
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
    depth: 0,
    joins: { gallery: { limit: 2 } },
    select: {
      slug: true,
      poster: true,
      gallery: true,
    },
  });

  return result.docs.filter(hasEventGallery);
};

export default getAllEventSlugs;
