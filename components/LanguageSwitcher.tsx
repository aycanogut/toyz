'use client';

import { usePathname, useRouter, localeNames, locales, type Locale } from '@/i18n';

import Button from './Button';
import Popover from './Popover';

function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLocale = (locale: string) => {
    router.replace(pathname, { locale });
  };

  return (
    <Popover
      hasCloseIcon={false}
      contentProps={{
        className: 'px-3 py-2',
      }}
      trigger={
        <Button
          variant="secondary"
          className="my-auto border-none hover:bg-title-light hover:text-title-darker"
        >
          {locale}
        </Button>
      }
    >
      <div className="flex flex-col gap-2">
        {locales.map(locale => (
          <Button
            key={locale}
            variant="secondary"
            className="border-none p-2 font-grotesque text-lg font-semibold uppercase text-white"
            onClick={() => handleLocale(locale)}
          >
            {localeNames[locale]}
          </Button>
        ))}
      </div>
    </Popover>
  );
}

export default LanguageSwitcher;
