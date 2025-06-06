'use client';

import { useEffect, useState } from 'react';

import { useSearchParams } from 'next/navigation';

import { useTranslations } from 'next-intl';

import Button from '@/components/Button';
import Popover from '@/components/Popover';
import { useRouter, usePathname } from '@/i18n/routing';

interface Props {
  categories: string[];
}

function Categories({ categories }: Props) {
  const [category, setCategory] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { push } = useRouter();

  const t = useTranslations('Search');

  const allCategory = t('category');
  const allCategories = [allCategory, ...categories];

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const selectedCategory = params.get('category') ?? '';

    setCategory(selectedCategory);
  }, [searchParams]);

  return (
    <Popover
      hasCloseIcon={false}
      rootProps={{
        open: isOpen,
        onOpenChange: setIsOpen,
      }}
      trigger={<Button>{category || allCategory}</Button>}
      triggerProps={{
        className: 'min-w-40',
      }}
      contentProps={{
        className: 'w-[var(--radix-popover-trigger-width)]',
      }}
    >
      <div className="flex flex-col gap-2">
        {allCategories.map(selectedCategory => (
          <Button
            key={selectedCategory}
            variant="secondary"
            className="font-grotesque border-none text-lg font-semibold text-white uppercase"
            onClick={() => {
              const params = new URLSearchParams(searchParams);

              if (selectedCategory === allCategory) {
                params.delete('category');
              } else {
                params.set('category', selectedCategory);
              }

              push(`${pathname}?${params.toString()}`, { scroll: false });

              setCategory(selectedCategory);
              setIsOpen(false);
            }}
          >
            {selectedCategory}
          </Button>
        ))}
      </div>
    </Popover>
  );
}

export default Categories;
