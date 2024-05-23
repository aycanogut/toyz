'use client';

import { useEffect, useState } from 'react';

import { useTranslations } from 'next-intl';

import { Button } from '@/components';
import { Link } from '@/i18n';
import { cn } from '@/utils';

import navigationItems from './navigationItems';

function HeaderMobile() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const t = useTranslations('Navigation');

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

  return (
    <header className="absolute z-50 w-full overflow-x-hidden lg:hidden">
      <Button
        onClick={handleMenuToggle}
        className={cn('absolute left-4 top-4 bg-transparent p-0 text-button-background md:left-6 md:top-6 lg:hidden', isMenuOpen && 'hidden')}
        appendIcon="hamburger"
        iconSize={48}
      />

      <div className={cn('-ml-[-100%] h-screen w-screen bg-background-light p-4 transition-[margin]', isMenuOpen && 'ml-0')}>
        <Button
          onClick={handleMenuToggle}
          className="bg-transparent p-0 text-button-background md:m-2 lg:hidden"
          appendIcon="close"
          iconSize={48}
        />

        <nav className="mt-6">
          <ul className="flex flex-col gap-8 pl-2 md:pl-4">
            {navigationItems.map(item => (
              <Button
                key={item.id}
                onClick={handleMenuToggle}
                tabIndex={0}
                className=" justify-start bg-transparent p-0 text-button-background"
                appendIcon="arrow-right"
                iconSize={24}
              >
                <Link
                  href={item.path}
                  className="flex items-center gap-2"
                >
                  <span className="font-grotesque text-2xl font-medium uppercase text-title-light">{t(item.name)}</span>
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
