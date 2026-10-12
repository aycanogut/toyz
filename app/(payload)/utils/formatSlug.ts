/**
 * Returns a Payload CMS FieldHook that formats the slug field.
 *
 * A slug typed by an editor is kept (and normalized). When the slug is empty,
 * it is generated from the `fallback` field (e.g. `title`) in whichever locale
 * is being saved. The slug field is not localized, so one slug serves all locales.
 *
 * Formatting:
 * - Turkish dotless `ı` becomes `i`; other accents are stripped (`ç` → `c`, `ş` → `s`)
 * - Whitespace becomes a single hyphen; other non-alphanumeric characters are removed
 * - Repeated hyphens are collapsed and leading/trailing hyphens trimmed
 * - Lowercased
 *
 * @param {string} fallback - The field to generate the slug from when none is provided.
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

// `ı` has no decomposed form, so NFKD alone would drop it instead of mapping it to `i`.
const normalizeText = (text: string): string => {
  return text
    .replace(/ı/g, 'i')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '');
};

const format = (val: string): string =>
  normalizeText(val)
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/-{2,}/g, '-')
    .replace(/^-|-$/g, '');

const formatSlug =
  (fallback: string): FieldHook =>
  ({ data, operation, originalDoc, value }) => {
    if (operation !== 'create' && operation !== 'update') {
      return value;
    }

    if (typeof value === 'string' && value.trim()) {
      return format(value);
    }

    const fallbackData = data?.[fallback] || originalDoc?.[fallback];

    if (fallbackData && typeof fallbackData === 'string') {
      return format(fallbackData);
    }

    return value;
  };

export default formatSlug;
