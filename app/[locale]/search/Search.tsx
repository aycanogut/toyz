'use client';

import { useState } from 'react';

import { useSearchParams } from 'next/navigation';

import { useTranslations } from 'next-intl';

import { Button, Input } from '@/components';
import { useRouter, usePathname } from '@/i18n';

import Categories from './Categories';

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
        <Input
          type="search"
          id="search"
          onChange={e => setSearchValue(e.target.value)}
          defaultValue={searchParams.get('query')?.toString()}
          placeholder={t('placeholder')}
          onKeyDown={e => {
            e.key === 'Enter' && handleSubmit();
          }}
          className="pl-12"
          appendIconProps={{
            name: 'search',
            size: 24,
            className: 'absolute top-4 left-3  text-title-light',
          }}
        />
      </div>

      <Button onClick={handleSubmit}>{t('search')}</Button>
    </div>
  );
}

export default Search;
