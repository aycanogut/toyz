'use client';

import { useRef } from 'react';

import { AnimatePresence, motion } from 'motion/react';

import { Category } from '@/payload-types';

import SearchOverlayCategories from './SearchOverlayCategories';
import SearchOverlayHeader from './SearchOverlayHeader';
import SearchOverlayInput from './SearchOverlayInput';
import SearchOverlayResults from './SearchOverlayResults';
import useOverlayBehavior from './hooks/useOverlayBehavior';
import useSearch from './hooks/useSearch';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
}

function SearchOverlay({ isOpen, onClose, categories }: SearchOverlayProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const { query, setQuery, selectedCategory, setSelectedCategory, toggleCategory, results, isPending, reset } = useSearch();

  useOverlayBehavior({ isOpen, onClose, inputRef, reset });

  const showResults = query || selectedCategory;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          className="bg-background/90 fixed inset-0 z-200 overflow-y-auto backdrop-blur-sm"
        >
          <SearchOverlayHeader onClose={onClose} />
          <SearchOverlayInput
            query={query}
            onChange={setQuery}
            inputRef={inputRef}
          />
          <SearchOverlayCategories
            categories={categories}
            selectedCategory={selectedCategory}
            onToggle={toggleCategory}
            onReset={() => setSelectedCategory('')}
          />
          {showResults && (
            <div className="px-4 pb-16 lg:px-8">
              <SearchOverlayResults
                results={results}
                isPending={isPending}
                onClose={onClose}
              />
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default SearchOverlay;
