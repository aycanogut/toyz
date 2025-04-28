import { GlobalConfig } from 'payload';

export const Slider: GlobalConfig = {
  slug: 'slider',
  fields: [
    {
      name: 'images',
      type: 'relationship',
      relationTo: 'media',
      hasMany: true,
      required: true,
    },
    {
      name: 'animation',
      type: 'relationship',
      relationTo: 'media',
      hasMany: false,
      required: true,
    },
  ],
};
