import type { Block } from 'payload';

export const YouTubeBlock: Block = {
  slug: 'youtube',
  fields: [
    {
      name: 'videoId',
      type: 'text',
      required: true,
    },
    {
      name: 'title',
      type: 'text',
    },
  ],
};
