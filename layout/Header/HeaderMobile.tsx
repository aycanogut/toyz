import { useState } from 'react';

import Link from 'next/link';

import { Button } from '@/components';

import navigationItems from './navigationItems';

function HeaderMobile() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(prevState => !prevState);
  };

  return (
    <header className="absolute left-0 top-0 z-10 px-2 py-4">
      <Button
        onClick={handleMenuToggle}
        className="bg-transparent p-0 text-button-background lg:hidden"
        appendIcon="hamburger"
        iconSize={48}
      />

      {isMenuOpen && (
        <div className="absolute inset-0 h-screen w-screen bg-background-light px-2 py-4">
          <Button
            onClick={handleMenuToggle}
            className="bg-transparent p-0 text-button-background lg:hidden"
            appendIcon="close"
            iconSize={48}
          />

          <nav className="mt-6">
            <ul className="flex flex-col gap-8 pl-2">
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
                    <span className="font-grotesque text-2xl font-medium uppercase text-title-light">{item.name}</span>
                  </Link>
                </Button>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}

export default HeaderMobile;
