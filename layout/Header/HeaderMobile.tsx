import { useState } from 'react';

import Link from 'next/link';

import { Icon } from '@/components';

import navigationItems from './navigationItems';

function HeaderMobile() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(prevState => !prevState);
  };

  return (
    <header className="absolute left-0 top-0 z-10 px-2 py-4">
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
        <div className="absolute inset-0 h-screen w-screen bg-background-light px-2 py-4">
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
                <button
                  key={item.id}
                  onClick={handleMenuToggle}
                  tabIndex={0}
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
                </button>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}

export default HeaderMobile;
