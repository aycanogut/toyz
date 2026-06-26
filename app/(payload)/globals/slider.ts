import { GlobalConfig } from 'payload';

import { revalidateSliderCache } from '../hooks/revalidateSliderCache';

export const Slider: GlobalConfig = {
  slug: 'slider',
  // versions: {
  //   drafts: true,
  // },
  hooks: {
    afterChange: [revalidateSliderCache],
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
