import { useTranslations } from 'next-intl';

import Button from '@/components/Button';
import { Category } from '@/payload-types';
import cn from '@/utils/cn';

interface SearchOverlayCategoriesProps {
  categories: Category[];
  selectedCategory: string;
  onToggle: (slug: string) => void;
  onReset: () => void;
}

function SearchOverlayCategories({ categories, selectedCategory, onToggle, onReset }: SearchOverlayCategoriesProps) {
  const t = useTranslations('Search');

  return (
    <div className="px-4 py-6 lg:px-8 lg:py-8">
      <p className="text-paper-muted font-heading tracking-eyebrow mb-5 text-[10px] uppercase lg:text-xs">{t('popular-topics')}</p>
      <div className="flex flex-wrap gap-x-5 gap-y-2 lg:gap-x-8 lg:gap-y-3">
        <Button
          onClick={onReset}
          variant="ghost"
          className={cn('font-heading p-0 text-xl font-black tracking-tight lg:text-3xl', selectedCategory === '' && 'text-acid hover:text-acid')}
        >
          {t('category')}
        </Button>
        {categories.map(cat => (
          <Button
            key={cat.id}
            onClick={() => onToggle(cat.slug ?? '')}
            variant="ghost"
            className={cn('font-heading p-0 text-xl font-black tracking-tight lg:text-3xl', selectedCategory === cat.slug && 'text-acid hover:text-acid')}
          >
            {cat.name}
          </Button>
        ))}
      </div>
    </div>
  );
}

export default SearchOverlayCategories;
