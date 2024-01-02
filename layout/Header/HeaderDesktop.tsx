'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { AnimatePresence, Variants, motion } from 'framer-motion';

import { Brand } from '@/components';
import { cn } from '@/utils';

import navigationItems from './navigationItems';

const variants: Variants = {
  initial: {
    y: '-100%',
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.25,
    },
  },
  exit: {
    y: '-100%',
    opacity: 0,
  },
};

function HeaderDesktop() {
  const pathname = usePathname();
  const [isScrolling, setIsScrolling] = useState(false);

  const handleScroll = () => {
    if (window.scrollY >= window.innerHeight) {
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
    <AnimatePresence>
      <motion.header
        initial="initial"
        animate={isScrolling ? 'animate' : 'initial'}
        exit="exit"
        variants={variants}
        className="fixed left-0 right-0 top-0 z-50"
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
  );
}

export default HeaderDesktop;
