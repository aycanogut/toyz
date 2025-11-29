import { GlobalConfig } from 'payload';

export const Slider: GlobalConfig = {
  slug: 'slider',
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'images',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
      required: true,
    },
    {
      name: 'animation',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
};
