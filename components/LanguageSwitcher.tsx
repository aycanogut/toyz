'use client';

import { ChangeEvent } from 'react';

import { localeNames, locales, usePathname, useRouter, type Locale } from '@/i18n';

function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLocale = (event: ChangeEvent<HTMLSelectElement>) => {
    const newLocale = event.target.value as Locale;

    router.replace(pathname, { locale: newLocale });
  };

  return (
    <select
      value={locale}
      onChange={handleLocale}
      className="focus-visible:ring-ring m-auto ml-8 size-10 bg-background-light font-grotesque text-lg font-semibold text-title-light focus-visible:outline-none focus-visible:ring-1"
    >
      {locales.map(locale => (
        <option
          key={locale}
          value={locale}
        >
          {localeNames[locale]}
        </option>
      ))}
    </select>
  );
}

export default LanguageSwitcher;
