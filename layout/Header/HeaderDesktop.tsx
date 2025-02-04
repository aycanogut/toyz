'use client';

import { useState, useEffect } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';

import { Button } from '@/components';
import { Link, useRouter, usePathname } from '@/i18n/routing';
import { cn } from '@/utils';

import LanguageSwitcher from './LanguageSwitcher';
import navigationItems from './navigationItems';
import variants from './variants';

function HeaderDesktop() {
  const [isScrolling, setIsScrolling] = useState(false);

  const { push } = useRouter();
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
          className={cn('flex w-full px-20 py-4 lg:h-24 lg:bg-background-light', isHomepage && 'fixed left-0 right-0 top-0 z-50')}
        >
          <Link
            href="/"
            className="flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-title-light"
          >
            <h1
              className="font-nabla text-[2.5rem] font-extrabold text-title-light"
              style={{
                filter: 'hue-rotate(310deg) saturate(2.2)',
              }}
            >
              TOYZ
            </h1>
          </Link>
          <nav className="w-full">
            <ul className="flex h-full items-center justify-end gap-8">
              {navigationItems.map(item => (
                <li key={item.id}>
                  <Link
                    href={item.path}
                    className="flex items-center gap-2 p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-title-light"
                  >
                    <span
                      className={cn(
                        'font-grotesque text-2xl font-bold uppercase text-title-dark transition hover:text-title-light',
                        pathname === item.path && 'text-title-light'
                      )}
                    >
                      {t(item.name)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <Button
            className={cn('"mx-4 mt-1 cursor-pointer bg-transparent text-title-dark hover:text-title-light', pathname === '/search' && 'text-title-light')}
            appendIcon="search"
            iconSize={28}
            onClick={() => push('/search')}
          />

          <LanguageSwitcher locale={locale as Locale} />
        </motion.header>
      </AnimatePresence>
    </div>
  );
}

export default HeaderDesktop;
