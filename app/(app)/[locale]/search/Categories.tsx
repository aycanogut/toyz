'use client';

import { useEffect, useState } from 'react';

import { useSearchParams } from 'next/navigation';

import { useTranslations } from 'next-intl';

import Button from '@/components/Button';
import Popover from '@/components/Popover';
import { useRouter, usePathname } from '@/i18n/routing';
import { Category } from '@/payload-types';

interface CategoriesProps {
  categories: Category[];
}

function Categories({ categories }: CategoriesProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { push } = useRouter();

  const t = useTranslations('Search');
  const allCategoryLabel = t('category');

  const allCategories = [{ label: allCategoryLabel, value: '' }, ...categories.map(item => ({ label: item.name, value: item.slug }))];

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const paramCategory = params.get('category') ?? '';
    setSelectedCategory(paramCategory);
  }, [searchParams]);

  const selected = allCategories.find(item => item.value === selectedCategory);
  const buttonLabel = selected ? selected.label : allCategoryLabel;

  return (
    <Popover
      hasCloseIcon={false}
      rootProps={{
        open: isOpen,
        onOpenChange: setIsOpen,
      }}
      trigger={<Button>{buttonLabel}</Button>}
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
            key={category.value || 'all'}
            variant="secondary"
            className="font-grotesque border-none text-lg font-semibold text-white uppercase"
            onClick={() => {
              const params = new URLSearchParams(searchParams);

              if (!category.value) {
                params.delete('category');
              } else {
                params.set('category', category.value);
              }

              push(`${pathname}?${params.toString()}`, { scroll: false });

              setSelectedCategory(category.value);
              setIsOpen(false);
            }}
          >
            {category.label}
          </Button>
        ))}
      </div>
    </Popover>
  );
}

export default Categories;
