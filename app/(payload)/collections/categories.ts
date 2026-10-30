import type { CollectionConfig } from 'payload';

import { revalidateCategoriesCacheOnChange, revalidateCategoriesCacheOnDelete } from '../hooks/revalidateCategoriesCache';

export const Categories: CollectionConfig = {
  slug: 'categories',
  hooks: {
    afterChange: [revalidateCategoriesCacheOnChange],
    afterDelete: [revalidateCategoriesCacheOnDelete],
  },
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
