import { useFormatter } from 'next-intl';

import { SearchResult } from '@/app/actions/searchArticles';
import Icon from '@/components/Icon';
import { Link } from '@/i18n/routing';

interface SearchResultItemProps {
  item: SearchResult;
  onClose: () => void;
}

function SearchResultItem({ item, onClose }: SearchResultItemProps) {
  const format = useFormatter();

  const formatDate = (date: string) => {
    const d = new Date(date);
    if (Number.isNaN(d.getTime())) return date;
    return format.dateTime(d, { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  return (
    <Link
      href={`/content/${item.slug}`}
      onClick={onClose}
      className="group flex items-start gap-4 py-5 transition-opacity hover:opacity-75"
    >
      {item.category && (
        <span className="bg-acid text-background font-heading tracking-meta mt-1 shrink-0 px-2 py-0.5 font-black uppercase">{item.category}</span>
      )}
      <div className="min-w-0 flex-1">
        <h5 className="font-heading text-title-light group-hover:text-acid text-lg leading-tight font-black uppercase transition-colors lg:text-2xl">
          {item.title}
        </h5>
        <div className="text-paper-muted font-heading tracking-meta mt-1 flex items-center gap-2 uppercase">
          <span>{item.author}</span>
          <span aria-hidden="true">·</span>
          <span>{formatDate(item.date)}</span>
        </div>
      </div>
      <Icon
        name="arrow-right"
        className="text-title-dark group-hover:text-acid mt-1 size-4 shrink-0 transition-colors lg:size-5"
        aria-hidden="true"
      />
    </Link>
  );
}

export default SearchResultItem;
