'use client';

import { Button, Popover } from '@/components';
import { routing, localeNames, usePathname, useRouter } from '@/i18n/routing';

function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLocale = (locale: Locale) => {
    router.replace(pathname, { locale });
  };

  return (
    <Popover
      hasCloseIcon={false}
      contentProps={{
        className: 'z-50 w-[var(--radix-popover-trigger-width)]',
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
        {routing.locales.map(locale => (
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
