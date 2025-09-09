import { getLocale } from 'next-intl/server';

import Icon from '@/components/Icon';
import { Link } from '@/i18n/routing';
import formatDate from '@/utils/formatDate';

export interface ContentLabelItem {
  date: string;
  category: string;
  categorySlug: string;
  author: string;
}

interface ContentLabelProps {
  items: ContentLabelItem;
}

async function ContentLabels({ items }: ContentLabelProps) {
  const locale = await getLocale();

  const computedItems = {
    ...items,
    date: formatDate(items.date, locale as Locale),
  };

  const { categorySlug, ...displayItems } = computedItems;

  return (
    <div className="border-border-light flex w-full max-w-[28.625rem] flex-wrap gap-x-7 gap-y-2 border px-6 py-2 md:w-fit md:max-w-fit lg:py-6">
      {Object.entries(displayItems).map(([item, value]) => {
        return item === 'category' ? (
          <Link
            key={item}
            href={`/search?category=${categorySlug}`}
            className="flex items-center gap-2"
          >
            <Icon
              name={item as IconLabelProps}
              className="text-title-light mt-1 size-5"
            />
            <span className="font-grotesque text-title-light text-lg font-medium md:text-xl">{value}</span>
          </Link>
        ) : (
          <div
            className="flex items-center gap-2"
            key={item}
          >
            <Icon
              name={item as IconLabelProps}
              className="text-title-light mt-1 size-5"
            />
            <span className="font-grotesque text-title-light text-lg font-medium md:text-xl">{value}</span>
          </div>
        );
      })}
    </div>
  );
}

export default ContentLabels;
