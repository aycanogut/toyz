'use client';

import { useEffect, useState } from 'react';

import { useLocale, useTranslations } from 'next-intl';

import Button from '@/components/Button';
import { Link, useRouter } from '@/i18n/routing';
import cn from '@/utils/cn';

import LanguageSwitcher from './LanguageSwitcher';
import navigationItems from './navigationItems';

function HeaderMobile() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const { push } = useRouter();

  const t = useTranslations('Navigation');
  const locale = useLocale();

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const handleMenuToggle = () => {
    setIsMenuOpen(prevState => !prevState);
  };

  const handleSearchNavigation = () => {
    setIsMenuOpen(false);
    push('/search');
  };

  return (
    <header className={cn('absolute w-full overflow-x-hidden overflow-y-hidden lg:hidden', isMenuOpen ? 'z-50 h-screen' : 'h-20')}>
      <div className="absolute top-4 right-4 left-0 z-50 flex w-full items-center gap-1 px-4 md:top-6">
        <Button
          onClick={handleMenuToggle}
          className={cn('text-button-background bg-transparent p-0 lg:hidden', isMenuOpen && 'hidden')}
          appendIconProps={{
            name: 'hamburger',
            className: 'size-12',
          }}
        />

        <Button
          className="text-button-background mr-2 ml-auto bg-transparent p-0 lg:hidden"
          appendIconProps={{
            name: 'search',
            className: 'size-8',
          }}
          onClick={handleSearchNavigation}
        />

        <LanguageSwitcher locale={locale as Locale} />
      </div>

      <div className={cn('bg-background-light -ml-[-100%] h-screen w-screen p-4 transition-[margin]', isMenuOpen && 'ml-0')}>
        <Button
          className="text-button-background relative z-50 bg-transparent p-0 md:mt-2 lg:hidden"
          appendIconProps={{
            name: 'close',
            className: 'size-12',
          }}
          onClick={handleMenuToggle}
        />

        <nav className="mt-6">
          <ul className="flex flex-col gap-8 pl-2 md:pl-4">
            {navigationItems.map(item => (
              <Button
                key={item.id}
                onClick={handleMenuToggle}
                tabIndex={0}
                className="text-button-background justify-start bg-transparent p-0"
                appendIconProps={{
                  name: 'arrow-right',
                  className: 'size-6',
                }}
              >
                <Link
                  href={item.path}
                  className="flex items-center gap-2"
                >
                  <span className="font-grotesque text-title-light text-2xl font-medium uppercase">{t(item.name)}</span>
                </Link>
              </Button>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default HeaderMobile;
