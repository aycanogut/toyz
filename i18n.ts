import { notFound } from 'next/navigation';

import { createSharedPathnamesNavigation } from 'next-intl/navigation';
import { getRequestConfig } from 'next-intl/server';

export const locales = ['en', 'tr'] as const;
export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ locale }) => {
  // TODO: Add a custom 404 page
  if (!locales.includes(locale as Locale)) notFound();

  return {
    messages: (await import(`./locales/${locale}.json`)).default,
  };
});

export const localeNames: Record<Locale, string> = {
  en: 'EN',
  tr: 'TR',
};

export const { Link, usePathname, useRouter } = createSharedPathnamesNavigation({ locales });
