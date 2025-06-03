/**
 * Returns a Payload CMS FieldHook that automatically formats a slug based on a given field.
 *
 * This hook formats the `value` of the slug field by:
 * - Replacing spaces with hyphens (`-`)
 * - Removing non-alphanumeric characters (except hyphens)
 * - Converting the string to lowercase
 *
 * During the `create` or `update` operation, if the slug `value` is not manually provided,
 * it falls back to another field (e.g., `title`) from the incoming `data` or the original document.
 *
 * @param {string} fallback - The name of the field to fallback to if the slug value is not present.
 * @returns {FieldHook} A function to be used in Payload CMS field hooks like `beforeChange`.
 *
 * @example
 * ```ts
 * {
 *   name: 'slug',
 *   type: 'text',
 *   hooks: {
 *     beforeChange: [formatSlug('title')],
 *   },
 * }
 * ```
 */
import type { FieldHook } from 'payload';

const normalizeText = (text: string): string => {
  return text.normalize('NFKD').replace(/[\u0300-\u036f]/g, '');
};

const format = (val: string): string =>
  normalizeText(val)
    .replace(/ /g, '-')
    .replace(/[^\w\-]+/g, '')
    .toLowerCase();

const formatSlug =
  (fallback: string): FieldHook =>
  ({ data, operation, originalDoc, value, req }) => {
    if ((operation === 'create' || operation === 'update') && req.locale === 'en') {
      const fallbackData = data?.[fallback] || originalDoc?.[fallback];

      if (fallbackData && typeof fallbackData === 'string') {
        return format(fallbackData);
      }
    }

    return value;
  };

export default formatSlug;
