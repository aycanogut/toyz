import { type Field } from 'payload';

import formatSlug from '../utils/formatSlug';
import deepMerge from '../utils/deepMerge';

type Slug = (fieldToUse?: string, overrides?: Partial<Field>) => Field;

const slugField: Slug = (fieldToUse = 'title', overrides = {}) =>
  deepMerge<Field, Partial<Field>>(
    {
      name: 'slug',
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [formatSlug(fieldToUse)],
      },
      index: true,
      label: 'Slug',
      type: 'text',
      localized: false,
    },
    overrides
  );

export default slugField;
