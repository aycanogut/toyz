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
        className: 'z-50 bg-background w-[var(--radix-popover-trigger-width)]',
      }}
      trigger={
        <Button
          variant="secondary"
          className="hover:bg-title-light hover:text-background font-heading border-paper-faint my-auto border-2 px-3 py-1.5 text-xs tracking-eyebrow"
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
            className="font-heading bg-background border-paper-faint border-2 p-2 text-xs font-bold tracking-eyebrow text-white uppercase"
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
