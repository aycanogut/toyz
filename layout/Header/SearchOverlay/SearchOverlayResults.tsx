import { useTranslations } from 'next-intl';

import { SearchResult } from '@/app/actions/searchArticles';

import SearchResultItem from './SearchResultItem';

interface SearchOverlayResultsProps {
  results: SearchResult[] | null;
  isPending: boolean;
  onClose: () => void;
}

function SearchOverlayResults({ results, isPending, onClose }: SearchOverlayResultsProps) {
  const t = useTranslations('Search');

  if (isPending) {
    return <div className="text-paper-muted font-heading tracking-eyebrow py-8 uppercase">...</div>;
  }

  if (results !== null && results.length === 0) {
    return <p className="font-heading text-title-dark py-8 text-xl font-bold uppercase">{t('result')}</p>;
  }

  if (!results) return null;

  return (
    <div className="divide-paper-faint flex flex-col divide-y">
      {results.map(item => (
        <SearchResultItem
          key={item.id}
          item={item}
          onClose={onClose}
        />
      ))}
    </div>
  );
}

export default SearchOverlayResults;
