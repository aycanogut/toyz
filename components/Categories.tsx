'use client';

import { ChangeEvent, useEffect, useState } from 'react';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';

import { useTranslations } from 'next-intl';

interface Props {
  categories: string[];
}

function Categories({ categories }: Props) {
  const [category, setCategory] = useState('');

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { push } = useRouter();

  const t = useTranslations('Search');

  const allCategory = t('category');
  const allCategories = [allCategory, ...categories];

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    if (category.length) {
      params && params.set('category', category);
      push(`${pathname}?${params.toString()}`, { scroll: false });
    }
  }, [category, pathname, push, searchParams]);

  const handleCategory = (e: ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  return (
    <select
      value={category}
      onChange={handleCategory}
      className="focus-visible:ring-ring w-22 h-14 bg-background-light px-4 capitalize text-title-light focus-visible:outline-none focus-visible:ring-1"
    >
      {allCategories.map(category => (
        <option
          key={category}
          value={category}
        >
          {category}
        </option>
      ))}
    </select>
  );
}

export default Categories;
