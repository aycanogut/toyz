'use client';

import { useState } from 'react';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';

import { useTranslations } from 'next-intl';

import { Button, Categories, Icon } from '@/components';

interface Props {
  categories: string[];
}

function Search({ categories }: Props) {
  const [searchValue, setSearchValue] = useState('');

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { push } = useRouter();

  const t = useTranslations('Search');

  const handleSubmit = () => {
    const params = new URLSearchParams(searchParams);

    if (searchValue.length) {
      params && params.set('query', searchValue);
    } else {
      params.delete('query');
    }

    push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex flex-col gap-5 pt-14 md:flex-row md:pt-16 lg:gap-4 lg:pt-0">
      <Categories categories={categories} />

      <div className="relative flex w-full items-center">
        <Icon
          name="search"
          size={24}
          className="absolute left-4 text-title-light"
        />
        <input
          type="search"
          id="search"
          onChange={e => setSearchValue(e.target.value)}
          defaultValue={searchParams.get('query')?.toString()}
          className="focus-visible:ring-ring w-full bg-background-light p-4 pl-12 text-title-light focus-visible:outline-none focus-visible:ring-1"
          placeholder={t('placeholder')}
          onKeyDown={e => {
            e.key === 'Enter' && handleSubmit();
          }}
        />
      </div>

      <Button onClick={handleSubmit}>{t('search')}</Button>
    </div>
  );
}

export default Search;
