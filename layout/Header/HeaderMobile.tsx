'use client';

import { useEffect, useState } from 'react';

import { useLocale, useTranslations } from 'next-intl';

import { Button } from '@/components';
import { Link, useRouter } from '@/i18n/routing';
import { cn } from '@/utils';

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
      <Button
        onClick={handleMenuToggle}
        className={cn('text-button-background absolute top-4 left-4 z-50 bg-transparent p-0 md:top-6 md:left-6 lg:hidden', isMenuOpen && 'hidden')}
        appendIcon="hamburger"
        iconSize={48}
      />

      <div className={cn('bg-background-light -ml-[-100%] h-screen w-screen p-4 transition-[margin]', isMenuOpen && 'ml-0')}>
        <div className="flex w-full justify-between">
          <Button
            className="text-button-background bg-transparent p-0 md:m-2 lg:hidden"
            appendIcon="close"
            iconSize={48}
            onClick={handleMenuToggle}
          />

          <div className="mr-2 flex items-center gap-1">
            <Button
              className="text-button-background mr-2 ml-auto bg-transparent p-0 md:m-2 md:mr-4 lg:hidden"
              appendIcon="search"
              iconSize={32}
              onClick={handleSearchNavigation}
            />

            <LanguageSwitcher locale={locale as Locale} />
          </div>
        </div>

        <nav className="mt-6">
          <ul className="flex flex-col gap-8 pl-2 md:pl-4">
            {navigationItems.map(item => (
              <Button
                key={item.id}
                onClick={handleMenuToggle}
                tabIndex={0}
                className="text-button-background justify-start bg-transparent p-0"
                appendIcon="arrow-right"
                iconSize={24}
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
