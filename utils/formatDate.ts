/**
 * Formats a date string into a locale-specific date format.
 *
 * @param {string} date - The date string to format (should be parseable by the Date constructor).
 * @param {Locale} locale - The locale to use for formatting (e.g., 'en', 'tr').
 * @returns {string} The formatted date string in the specified locale.
 * @throws {Error} If the provided date string is invalid and cannot be parsed.
 */
function formatDate(date: string, locale: Locale) {
  const dateObject = new Date(date);

  if (isNaN(dateObject.getTime())) {
    throw new Error('Invalid date string');
  }

  return dateObject.toLocaleDateString(locale, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

export default formatDate;
