import { CollectionConfig } from 'payload';

const SEO: CollectionConfig = {
  slug: 'seo',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      localized: true,
    },
    {
      name: 'keywords',
      type: 'text',
      hasMany: true,
      localized: true,
    },
    {
      name: 'openGraph',
      type: 'group',
      fields: [
        {
          name: 'images',
          type: 'relationship',
          relationTo: 'media',
        },
      ],
    },
  ],
};

export default SEO;
