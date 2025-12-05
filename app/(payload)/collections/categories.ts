import type { CollectionConfig } from 'payload';

export const Categories: CollectionConfig = {
  slug: 'categories',
  // versions: {
  //   drafts: true,
  // },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      localized: false,
      unique: true,
    },
  ],
  admin: {
    useAsTitle: 'name',
  },
};
