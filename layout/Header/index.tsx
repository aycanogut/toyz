import { getLocale } from 'next-intl/server';

import getCategories from '@/services/categories';

import HeaderClient from './HeaderClient';

async function Header() {
  const locale = await getLocale();
  const categories = await getCategories(locale);

  return <HeaderClient categories={categories} />;
}

export default Header;
