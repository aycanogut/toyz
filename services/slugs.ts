import { getPayloadClient } from '@/utils/payloadClient';

const getAllArticleSlugs = async (locale: string) => {
  const payload = await getPayloadClient();

  const result = await payload.find({
    collection: 'articles',
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

export default getAllArticleSlugs;
