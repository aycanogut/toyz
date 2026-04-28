'use client';

import { useState, useEffect } from 'react';

import Image from 'next/image';

import { AnimatePresence, motion } from 'motion/react';
import { useLocale, useTranslations } from 'next-intl';

import Icon from '@/components/Icon';
import { Link, usePathname } from '@/i18n/routing';
import cn from '@/utils/cn';

import LanguageSwitcher from './LanguageSwitcher';
import navigationItems from './navigationItems';
import variants from './variants';

interface HeaderDesktopProps {
  onSearchOpen: () => void;
}

function HeaderDesktop({ onSearchOpen }: HeaderDesktopProps) {
  const [isScrolling, setIsScrolling] = useState(false);

  const pathname = usePathname();

  const locale = useLocale();
  const t = useTranslations('Navigation');

  const isHomepage = pathname === '/';
  const headerVisibleHeight = 250;

  const handleScroll = () => {
    if (window.scrollY >= headerVisibleHeight) {
      setIsScrolling(true);
    } else {
      setIsScrolling(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="hidden lg:block">
      <AnimatePresence>
        <motion.header
          initial="initial"
          animate={isScrolling ? 'animate' : 'initial'}
          exit="exit"
          variants={isHomepage ? variants : {}}
          className={cn(
            'bg-background border-title-light flex w-full items-center gap-6 border-b-2 px-8 py-5',
            isHomepage && 'fixed top-0 right-0 left-0 z-50 drop-shadow-lg'
          )}
        >
          <Link
            href="/"
            className="flex shrink-0 items-center gap-3"
          >
            <Image
              src="/brand-logo.web"
              alt="TOYZ"
              width={52}
              height={52}
              className="size-13 object-contain"
            />
            <span
              className="font-heading text-title-light text-4xl leading-none font-black tracking-tight italic"
              style={{ transform: 'skewX(-8deg)', textShadow: '4px 4px 0 var(--color-acid)' }}
            >
              TOYZ*
            </span>
          </Link>

          <nav className="ml-auto">
            <ul className="flex items-center gap-6">
              {navigationItems.map(item => (
                <li key={item.id}>
                  <Link
                    href={item.path}
                    className="focus-visible:ring-title-light flex items-center p-1 focus-visible:ring-2 focus-visible:outline-hidden"
                  >
                    <span
                      className={cn(
                        'font-heading text-title-light hover:text-acid text-base font-bold tracking-eyebrow uppercase transition-colors',
                        pathname === item.path && 'text-acid'
                      )}
                    >
                      {t(item.name)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <button
            onClick={onSearchOpen}
            className="border-title-light text-title-light hover:bg-title-light hover:text-background flex size-10 items-center justify-center border-2 transition-colors"
            aria-label={t('search')}
          >
            <Icon
              name="search"
              className="size-4"
              aria-hidden="true"
            />
          </button>

          <LanguageSwitcher locale={locale as Locale} />

          <a
            href="#newsletter"
            className="bg-acid text-background hover:bg-title-light font-heading border-title-light border-2 px-4 py-2.5 text-sm font-black tracking-eyebrow uppercase transition-colors"
          >
            {t('subscribe')}
          </a>
        </motion.header>
      </AnimatePresence>
    </div>
  );
}

export default HeaderDesktop;
