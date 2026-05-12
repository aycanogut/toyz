import { useState, useCallback, useEffect, useTransition } from 'react';

import { searchArticles, SearchResult } from '@/app/actions/searchArticles';

function useSearch() {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [results, setResults] = useState<SearchResult[] | null>(null);
  const [isPending, startTransition] = useTransition();

  const doSearch = useCallback((q: string, cat: string) => {
    if (!q && !cat) {
      setResults(null);
      return;
    }

    startTransition(async () => {
      const data = await searchArticles(q, cat || undefined);
      setResults(data);
    });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      doSearch(query, selectedCategory);
    }, 300);

    return () => clearTimeout(timer);
  }, [query, selectedCategory, doSearch]);

  const toggleCategory = (slug: string) => {
    setSelectedCategory(prev => (prev === slug ? '' : slug));
  };

  const reset = useCallback(() => {
    setQuery('');
    setSelectedCategory('');
    setResults(null);
  }, []);

  return { query, setQuery, selectedCategory, setSelectedCategory, toggleCategory, results, isPending, reset };
}

export default useSearch;
