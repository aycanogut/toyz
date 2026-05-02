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
        align: 'end',
        collisionPadding: 0,
      }}
      trigger={
        <Button
          variant="secondary"
          size="iconMd"
          className="hover:bg-title-light hover:text-background font-heading border-paper-faint tracking-eyebrow my-auto border-2 p-5"
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
            size="iconMd"
            className="font-heading bg-background border-paper-faint tracking-eyebrow w-full border-2 font-bold uppercase"
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
