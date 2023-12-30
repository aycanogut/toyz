'use client';

import { useState } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { BrandLogo, Icon } from '@/components';

import navigationItems from './navigationItems';

function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(prevState => !prevState);
  };

  return (
    <header className="flex bg-transparent px-2 py-4 lg:h-24 lg:bg-background-light lg:px-20">
      <BrandLogo
        src="/assets/logo.png"
        className="relative hidden w-20 lg:block"
      />

      <nav className="hidden w-full lg:block">
        <ul className="flex h-full items-center justify-end gap-8 pl-2">
          {navigationItems.map(item => (
            <li key={item.id}>
              <Link
                href={item.path}
                className="flex items-center gap-2"
              >
                <span
                  className={`font-grotesque text-2xl font-bold uppercase text-title-light ${pathname === item.path ? 'text-title-light' : 'text-title-dark'}`}
                >
                  {item.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <button
        onClick={handleMenuToggle}
        className="lg:hidden"
      >
        <Icon
          name="hamburger"
          size={48}
          className="text-button-background"
        />
      </button>

      {isMenuOpen && (
        <div className="absolute inset-0 bg-background-light px-2 py-4 lg:hidden">
          <button
            onClick={handleMenuToggle}
            className="lg:hidden"
          >
            <Icon
              name="close"
              size={48}
              className="text-button-background"
            />
          </button>

          <nav className="mt-6">
            <ul className="flex flex-col gap-8 pl-2">
              {navigationItems.map(item => (
                <li
                  key={item.id}
                  onClick={handleMenuToggle}
                >
                  <Link
                    href={item.path}
                    className="flex items-center gap-2"
                  >
                    <span className="font-grotesque text-2xl font-medium uppercase text-title-light">{item.name}</span>
                    <Icon
                      name="arrow-right"
                      size={24}
                      className="text-button-background"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
