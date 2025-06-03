import { Icon } from '@/components';
import formatDate from '@/utils/formatDate';
import { getLocale } from 'next-intl/server';

interface Props {
  items: {
    date: string;
    tag: string;
    author: string;
  };
}

async function ContentLabels({ items }: Props) {
  const locale = await getLocale();

  const computedItems = {
    ...items,
    date: formatDate(items.date, locale as Locale),
  };

  return (
    <div className="border-border-light flex w-full max-w-[28.625rem] flex-wrap gap-x-7 gap-y-2 border px-6 py-2 md:w-fit md:max-w-fit lg:py-6">
      {Object.entries(computedItems).map(([item, value]) => {
        return (
          <div
            className="flex items-center gap-2"
            key={item}
          >
            <Icon
              name={item as IconLabelProps}
              size={18}
              className="text-title-light mt-1"
            />
            <span className="font-grotesque text-title-light text-lg font-medium md:text-xl">{value}</span>
          </div>
        );
      })}
    </div>
  );
}

export default ContentLabels;
