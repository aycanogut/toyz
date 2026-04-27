'use client';

import { useState, useEffect, useCallback, useRef, useTransition } from 'react';

import { AnimatePresence, motion } from 'motion/react';
import { useFormatter, useTranslations } from 'next-intl';

import { searchArticles, SearchResult } from '@/app/actions/searchArticles';
import Icon from '@/components/Icon';
import { Link } from '@/i18n/routing';
import { Category } from '@/payload-types';
import cn from '@/utils/cn';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
}

function SearchOverlay({ isOpen, onClose, categories }: SearchOverlayProps) {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isPending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);
  const t = useTranslations('Search');
  const format = useFormatter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 150);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      setQuery('');
      setSelectedCategory('');
      setResults([]);
      setHasSearched(false);
    }
  }, [isOpen]);

  const doSearch = useCallback((q: string, cat: string) => {
    if (!q && !cat) {
      setResults([]);
      setHasSearched(false);
      return;
    }

    startTransition(async () => {
      const data = await searchArticles(q, cat || undefined);
      setResults(data);
      setHasSearched(true);
    });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      doSearch(query, selectedCategory);
    }, 300);

    return () => clearTimeout(timer);
  }, [query, selectedCategory, doSearch]);

  const handleCategoryToggle = (slug: string) => {
    setSelectedCategory(prev => (prev === slug ? '' : slug));
  };

  const handleClose = () => {
    onClose();
  };

  const formatDate = (date: string) => {
    const d = new Date(date);
    if (Number.isNaN(d.getTime())) return date;
    return format.dateTime(d, { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  const showResults = query || selectedCategory;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          className="fixed inset-0 z-200 overflow-y-auto bg-background/90 backdrop-blur-sm"
        >
          {/* Top bar */}
          <div className="border-title-light flex items-center justify-between border-b-2 px-4 py-4 lg:px-8 lg:py-5">
            <span className="font-heading text-title-dark text-xs tracking-eyebrow uppercase lg:text-sm">
              TOYZ* / {t('title').toUpperCase()}
            </span>
            <div className="flex items-center gap-3">
              <button
                onClick={handleClose}
                className="font-heading text-title-dark hover:text-title-light hidden text-xs tracking-eyebrow uppercase transition-colors lg:block"
              >
                ESC
              </button>
              <button
                onClick={handleClose}
                className="border-title-light text-title-light hover:bg-title-light hover:text-background flex size-9 items-center justify-center border-2 transition-colors lg:size-10"
                aria-label="Close search"
              >
                <Icon
                  name="close"
                  className="size-4"
                />
              </button>
            </div>
          </div>

          {/* Search input area */}
          <div className="px-4 pt-10 pb-6 lg:px-8 lg:pt-14">
            <div className="relative flex items-center">
              <Icon
                name="search"
                className="text-acid absolute left-0 size-7 shrink-0 lg:size-9"
                aria-hidden="true"
              />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder={t('placeholder') + '...'}
                className="font-heading text-title-light placeholder:text-title-dark w-full border-b-2 border-b-transparent bg-transparent pb-4 pl-11 text-3xl font-black uppercase focus:border-b-current focus:outline-none lg:pl-14 lg:text-5xl xl:text-6xl"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="text-title-dark hover:text-title-light absolute right-0 transition-colors"
                  aria-label="Clear search"
                >
                  <Icon
                    name="close"
                    className="size-5"
                  />
                </button>
              )}
            </div>
          </div>

          {/* Popular topics — always visible so users can change category while viewing results */}
          <div className="px-4 py-6 lg:px-8 lg:py-8">
            <p className="text-paper-muted font-heading mb-5 text-[10px] tracking-eyebrow uppercase lg:text-xs">
              {t('popular-topics')}
            </p>
            <div className="flex flex-wrap gap-x-5 gap-y-2 lg:gap-x-8 lg:gap-y-3">
              <button
                onClick={() => setSelectedCategory('')}
                className={cn(
                  'font-heading text-xl font-black uppercase tracking-tight transition-colors lg:text-3xl',
                  selectedCategory === '' ? 'text-acid' : 'text-title-light hover:text-acid'
                )}
              >
                {t('category')}
              </button>
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryToggle(cat.slug ?? '')}
                  className={cn(
                    'font-heading text-xl font-black uppercase tracking-tight transition-colors lg:text-3xl',
                    selectedCategory === cat.slug ? 'text-acid' : 'text-title-light hover:text-acid'
                  )}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Results */}
          {showResults && (
            <div className="px-4 pb-16 lg:px-8">
              {isPending ? (
                <div className="text-paper-muted font-heading py-8 text-xs tracking-eyebrow uppercase">...</div>
              ) : hasSearched && results.length === 0 ? (
                <p className="font-heading text-title-dark py-8 text-xl font-bold uppercase">{t('result')}</p>
              ) : (
                <div className="divide-paper-faint flex flex-col divide-y">
                  {results.map(item => (
                    <Link
                      key={item.id}
                      href={`/content/${item.slug}`}
                      onClick={handleClose}
                      className="group flex items-start gap-4 py-5 transition-opacity hover:opacity-75"
                    >
                      {item.category && (
                        <span className="bg-acid text-background font-heading mt-1 shrink-0 px-2 py-0.5 text-[10px] font-black tracking-[0.16em] uppercase">
                          {item.category}
                        </span>
                      )}
                      <div className="min-w-0 flex-1">
                        <h3 className="font-heading text-title-light group-hover:text-acid text-lg font-black uppercase leading-tight transition-colors lg:text-2xl">
                          {item.title}
                        </h3>
                        <div className="text-paper-muted font-heading mt-1 flex items-center gap-2 text-[10px] tracking-[0.16em] uppercase">
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
                  ))}
                </div>
              )}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default SearchOverlay;
