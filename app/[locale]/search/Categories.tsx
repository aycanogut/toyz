'use client';

import { useEffect, useState } from 'react';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';

import { useTranslations } from 'next-intl';

import { Popover, Button } from '@/components';

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

  return (
    <Popover
      hasCloseIcon={false}
      trigger={<Button>{category || allCategory}</Button>}
      triggerProps={{
        className: 'min-w-40',
      }}
      contentProps={{
        className: 'w-[var(--radix-popover-trigger-width)]',
      }}
    >
      <div className="flex flex-col gap-2">
        {allCategories.map(category => (
          <Button
            key={category}
            variant="secondary"
            className="border-none font-grotesque text-lg font-semibold uppercase text-white"
            onClick={() => setCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>
    </Popover>
  );
}

export default Categories;
