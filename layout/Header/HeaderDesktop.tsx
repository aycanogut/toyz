'use client';

import { useState, useEffect } from 'react';

import { AnimatePresence, motion } from 'motion/react';
import { useLocale, useTranslations } from 'next-intl';

import Button from '@/components/Button';
import { Link, useRouter, usePathname } from '@/i18n/routing';
import cn from '@/utils/cn';

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
          className={cn(
            'bg-background flex w-full px-20 py-4 lg:h-24',
            isHomepage && 'border-background-light fixed top-0 right-0 left-0 z-50 border-b drop-shadow-lg'
          )}
        >
          <Link
            href="/"
            className="focus-visible:ring-title-light flex items-center focus-visible:ring-2 focus-visible:outline-hidden"
          >
            <h1
              className="font-nabla text-title-light text-[2.5rem] font-extrabold"
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
                    className="focus-visible:ring-title-light flex items-center gap-2 p-2 focus-visible:ring-2 focus-visible:outline-hidden"
                  >
                    <span
                      className={cn(
                        'font-grotesque text-title-dark hover:text-title-light text-2xl font-bold uppercase transition',
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
            className={cn('"mx-4 text-title-dark hover:text-title-light mt-1 cursor-pointer bg-transparent', pathname === '/search' && 'text-title-light')}
            appendIconProps={{
              name: 'search',
              className: 'size-7',
            }}
            onClick={() => push('/search')}
            aria-label={t('search')}
          />

          <LanguageSwitcher locale={locale as Locale} />
        </motion.header>
      </AnimatePresence>
    </div>
  );
}

export default HeaderDesktop;
