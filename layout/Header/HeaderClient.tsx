'use client';

import { useState } from 'react';

import { Category } from '@/payload-types';

import HeaderDesktop from './HeaderDesktop';
import HeaderMobile from './HeaderMobile';
import SearchOverlay from './SearchOverlay';

interface HeaderClientProps {
  categories: Category[];
}

function HeaderClient({ categories }: HeaderClientProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <HeaderMobile onSearchOpen={() => setIsSearchOpen(true)} />
      <HeaderDesktop onSearchOpen={() => setIsSearchOpen(true)} />
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        categories={categories}
      />
    </>
  );
}

export default HeaderClient;
