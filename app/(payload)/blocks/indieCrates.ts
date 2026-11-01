import type { Block } from 'payload';

import parseIndieCratesUrl from '@/utils/parseIndieCratesUrl';

export const IndieCratesBlock: Block = {
  slug: 'indieCrates',
  fields: [
    {
      name: 'url',
      type: 'text',
      required: true,
      admin: {
        description: 'Crate link, e.g. https://indiecrates.com/crates/user/crate-name',
      },
      validate: (value: string | null | undefined) => (parseIndieCratesUrl(value) ? true : 'Paste a valid Indie Crates crate link.'),
    },
    {
      name: 'title',
      type: 'text',
    },
  ],
};
