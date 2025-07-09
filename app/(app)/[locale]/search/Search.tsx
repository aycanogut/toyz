'use client';

import { useState } from 'react';

import { useSearchParams } from 'next/navigation';

import { useTranslations } from 'next-intl';

import Button from '@/components/Button';
import Input from '@/components/Input';
import { useRouter, usePathname } from '@/i18n/routing';
import { Category } from '@/payload-types';

import Categories from './Categories';

interface SearchProps {
  categories: Category[];
}

function Search({ categories }: SearchProps) {
  const [searchValue, setSearchValue] = useState('');

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { push } = useRouter();

  const t = useTranslations('Search');

  const handleSubmit = () => {
    const params = new URLSearchParams(searchParams);

    if (searchValue.length) {
      params.set('query', searchValue);
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
          value={searchValue}
          placeholder={t('placeholder')}
          onChange={e => {
            setSearchValue(e.target.value);

            const params = new URLSearchParams(searchParams);

            if (e.target.value) {
              params.set('query', e.target.value);
            } else {
              params.delete('query');
            }

            push(`${pathname}?${params.toString()}`, { scroll: false });
          }}
          onKeyDown={e => {
            if (e.key === 'Enter') handleSubmit();
          }}
          className="pl-12"
          appendIconProps={{
            name: 'search',
            size: 24,
            className: 'absolute top-4 left-3  text-title-light',
          }}
        />

        {searchValue && (
          <Button
            className="text-title-light absolute top-0 right-0 bg-transparent hover:bg-transparent"
            appendIcon="close"
            iconSize={32}
            onClick={() => {
              setSearchValue('');

              const params = new URLSearchParams(searchParams);

              params.delete('query');
              params.delete('category');

              push(`${pathname}?${params.toString()}`, { scroll: false });
            }}
          />
        )}
      </div>
    </div>
  );
}

export default Search;
