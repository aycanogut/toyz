'use client';

import dynamic from 'next/dynamic';

import { useWindowSize } from 'usehooks-ts';

const HeaderMobile = dynamic(() => import('./HeaderMobile'));
const HeaderDesktop = dynamic(() => import('./HeaderDesktop'));

function Header() {
  const { width } = useWindowSize();

  return width < 1024 ? <HeaderMobile /> : <HeaderDesktop />;
}

export default Header;
