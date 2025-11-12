'use client';

import Button from '@/components/Button';
import Popover from '@/components/Popover';
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
          className="hover:bg-title-light hover:text-title-darker my-auto cursor-pointer border-none"
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
            className="font-grotesque cursor-pointer border-none p-2 text-lg font-semibold text-white uppercase"
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
