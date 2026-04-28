'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';

import { useLocale, useTranslations } from 'next-intl';

import Button from '@/components/Button';
import Icon from '@/components/Icon';
import { Link, usePathname } from '@/i18n/routing';
import cn from '@/utils/cn';

import LanguageSwitcher from './LanguageSwitcher';
import navigationItems from './navigationItems';

interface HeaderMobileProps {
  onSearchOpen: () => void;
}

function HeaderMobile({ onSearchOpen }: HeaderMobileProps) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const t = useTranslations('Navigation');
  const locale = useLocale();
  const pathname = usePathname();

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
    <header className={cn('absolute w-full overflow-hidden lg:hidden', isMenuOpen ? 'z-50 h-screen' : 'h-20')}>
      <div className="bg-background border-title-light absolute top-0 right-0 left-0 z-50 flex h-20 items-center gap-2 border-b-2 px-4">
        <Button
          onClick={handleMenuToggle}
          className={cn('text-title-light bg-transparent p-0', isMenuOpen && 'invisible')}
          appendIconProps={{
            name: 'hamburger',
            className: 'size-10',
          }}
          aria-label="Menu"
        />

        <Link
          href="/"
          className="ml-2 flex shrink-0 items-center gap-2"
        >
          <Image
            src="/brand-logo.webp"
            alt="TOYZ"
            width={36}
            height={36}
            className="size-9 object-contain"
          />
          <span
            className="font-heading text-title-light text-xl leading-none font-black tracking-tight italic"
            style={{ transform: 'skewX(-8deg)', textShadow: '2px 2px 0 var(--color-acid)' }}
          >
            TOYZ*
          </span>
        </Link>

        <button
          onClick={onSearchOpen}
          className="border-title-light text-title-light ml-auto flex size-8 items-center justify-center border-2"
          aria-label={t('search')}
        >
          <Icon
            name="search"
            className="size-4"
            aria-hidden="true"
          />
        </button>

        <LanguageSwitcher locale={locale as Locale} />
      </div>

      <div className={cn('bg-background -ml-[-100%] h-screen w-screen px-6 pt-6 transition-[margin]', isMenuOpen && 'ml-0')}>
        <div className="flex items-center justify-between">
          <Button
            className={cn('text-title-light invisible relative z-50 bg-transparent p-0', isMenuOpen && 'visible')}
            appendIconProps={{
              name: 'close',
              className: 'size-10',
            }}
            onClick={handleMenuToggle}
          />
        </div>

        <nav className="mt-10">
          <ul className="flex flex-col gap-6">
            {navigationItems.map(item => (
              <li
                key={item.id}
                className="border-paper-faint border-b pb-4"
              >
                <Link
                  href={item.path}
                  onClick={handleMenuToggle}
                  className="flex items-center justify-between"
                >
                  <span className={cn('font-heading text-title-light text-3xl font-black tracking-tight uppercase', pathname === item.path && 'text-acid')}>
                    {t(item.name)}
                  </span>
                  <Icon
                    name="arrow-right"
                    className="text-title-light size-7"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <a
          href="#newsletter"
          onClick={handleMenuToggle}
          className="bg-acid text-background border-title-light font-heading tracking-eyebrow mt-10 inline-block border-2 px-5 py-3 text-sm font-black uppercase"
        >
          {t('subscribe')}
        </a>
      </div>
    </header>
  );
}

export default HeaderMobile;
