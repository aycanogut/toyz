'use client';

import { useSearchParams } from 'next/navigation';

import { useTranslations } from 'next-intl';

import { Input } from '@/components';
import { useRouter, usePathname } from '@/i18n/routing';

import Categories from './Categories';

interface Props {
  categories: string[];
}

function Search({ categories }: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { push } = useRouter();

  const t = useTranslations('Search');

  return (
    <div className="flex flex-col gap-5 pt-14 md:flex-row md:pt-16 lg:gap-4 lg:pt-0">
      <Categories categories={categories} />

      <div className="relative flex w-full items-center">
        <Input
          type="search"
          id="search"
          onChange={e => {
            const params = new URLSearchParams(searchParams);

            if (e.target.value.length) {
              params && params.set('query', e.target.value);
            } else {
              params.delete('query');
            }

            push(`${pathname}?${params.toString()}`, { scroll: false });
          }}
          defaultValue={searchParams.get('query')?.toString()}
          placeholder={t('placeholder')}
          className="pl-12"
          appendIconProps={{
            name: 'search',
            size: 24,
            className: 'absolute top-4 left-3  text-title-light',
          }}
        />
      </div>
    </div>
  );
}

export default Search;
