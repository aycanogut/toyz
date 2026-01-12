import toyzConfig from '@/toyzConfig';
import type { CollectionConfig, PayloadRequest } from 'payload';

export const Subscribers: CollectionConfig = {
  slug: 'subscribers',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'preferredLocale', 'isActive', 'createdAt'],
  },
  access: {
    read: ({ req: { user } }) => Boolean(user),
    create: () => true,
    update: () => false,
    delete: () => false,
  },
  fields: [
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
    },
    {
      name: 'preferredLocale',
      type: 'select',
      options: [
        { label: 'English', value: 'en' },
        { label: 'Türkçe', value: 'tr' },
      ],
      defaultValue: 'en',
      required: true,
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
  endpoints: [
    {
      path: '/unsubscribe',
      method: 'get',
      handler: async (req: PayloadRequest) => {
        const email = req.query?.email;

        if (!email) {
          return Response.redirect(`${toyzConfig.baseUrl}/en?status=error`);
        }

        const existing = await req.payload.find({
          collection: 'subscribers',
          where: { email: { equals: email } },
        });

        if (existing.docs.length === 0) {
          return Response.redirect(`${toyzConfig.baseUrl}/en?status=not-found`);
        }

        const subscriber = existing.docs[0];
        const locale = subscriber.preferredLocale ?? 'en';

        await req.payload.update({
          collection: 'subscribers',
          id: subscriber.id,
          data: { isActive: false },
        });

        return Response.redirect(`${toyzConfig.baseUrl}/${locale}?status=unsubscribed`);
      },
    },
  ],
};
