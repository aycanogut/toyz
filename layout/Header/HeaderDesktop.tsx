'use client';

import { useState, useEffect } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { AnimatePresence, motion } from 'framer-motion';

import { Brand } from '@/components';
import { cn } from '@/utils';

import navigationItems from './navigationItems';
import variants from './variants';

function HeaderDesktop() {
  const pathname = usePathname();
  const [isScrolling, setIsScrolling] = useState(false);

  const headerVisibleHeight = 250;

  const isHomepage = pathname === '/';

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
          className={cn(isHomepage && 'fixed left-0 right-0 top-0 z-50')}
        >
          <div className="flex w-full px-20 py-4 lg:h-24 lg:bg-background-light">
            <Brand
              src="/assets/logo.png"
              alt="Brand"
              width={100}
              height={200}
            />
            <nav className="w-full">
              <ul className="flex h-full items-center justify-end gap-8">
                {navigationItems.map(item => (
                  <li key={item.id}>
                    <Link
                      href={item.path}
                      className="flex items-center gap-2"
                    >
                      <span
                        className={cn(
                          'font-grotesque text-2xl font-bold uppercase text-title-light',
                          pathname === item.path ? 'text-title-light' : 'text-title-dark'
                        )}
                      >
                        {item.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </motion.header>
      </AnimatePresence>
    </div>
  );
}

export default HeaderDesktop;
