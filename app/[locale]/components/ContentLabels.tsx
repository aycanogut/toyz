import { HTMLAttributes } from 'react';

import { getLocale } from 'next-intl/server';

import Icon from '@/components/Icon';
import { Link } from '@/i18n/routing';
import cn from '@/utils/cn';
import formatDate from '@/utils/formatDate';

export interface ContentLabelItem {
  date: string;
  category?: string;
  categorySlug?: string;
  author?: string;
  location?: string;
}

interface ContentLabelsProps {
  rootProps?: HTMLAttributes<HTMLDivElement>;
  iconProps?: HTMLAttributes<SVGElement>;
  labelProps?: HTMLAttributes<HTMLSpanElement>;
  items: ContentLabelItem;
}

async function ContentLabels({ rootProps, iconProps, labelProps, items }: ContentLabelsProps) {
  const locale = await getLocale();

  const computedItems = {
    ...items,
    date: formatDate(items.date, locale as Locale),
  };

  const { categorySlug, ...displayItems } = computedItems;

  return (
    <div className={rootProps?.className}>
      {Object.entries(displayItems).map(([item, value]) => {
        return item === 'category' ? (
          <Link
            key={item}
            href={`/search?category=${categorySlug}`}
            className="flex h-full items-center gap-2"
          >
            <Icon
              name={item as IconLabelProps}
              className={cn(`text-title-light`, iconProps?.className)}
            />
            <span className={cn('font-grotesque text-title-light font-medium whitespace-nowrap', labelProps?.className)}>{value}</span>
          </Link>
        ) : (
          <div
            className="flex h-full items-center gap-2"
            key={item}
          >
            <Icon
              name={item as IconLabelProps}
              className={cn(`text-title-light`, iconProps?.className)}
            />
            <span className={cn('font-grotesque text-title-light font-medium whitespace-nowrap', labelProps?.className)}>{value}</span>
          </div>
        );
      })}
    </div>
  );
}

export default ContentLabels;
