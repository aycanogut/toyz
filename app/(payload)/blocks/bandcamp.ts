import type { Block } from 'payload';

import parseBandcampEmbed from '@/utils/parseBandcampEmbed';

export const BandcampBlock: Block = {
  slug: 'bandcamp',
  fields: [
    {
      name: 'embedCode',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Bandcamp → Share/Embed → copy the embed code and paste it here.',
      },
      validate: (value: string | null | undefined) => (parseBandcampEmbed(value) ? true : 'Paste a valid Bandcamp embed code (bandcamp.com/EmbeddedPlayer/…).'),
    },
    {
      name: 'title',
      type: 'text',
    },
  ],
};
