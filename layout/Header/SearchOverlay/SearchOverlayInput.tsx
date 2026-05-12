import { RefObject } from 'react';

import { useTranslations } from 'next-intl';

import Button from '@/components/Button';
import Icon from '@/components/Icon';

interface SearchOverlayInputProps {
  query: string;
  onChange: (value: string) => void;
  inputRef: RefObject<HTMLInputElement | null>;
}

function SearchOverlayInput({ query, onChange, inputRef }: SearchOverlayInputProps) {
  const t = useTranslations('Search');

  return (
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
          onChange={e => onChange(e.target.value)}
          placeholder={`${t('placeholder')}...`}
          className="font-heading text-title-light placeholder:text-title-dark w-full border-b-2 border-b-transparent bg-transparent pb-4 pl-11 text-3xl font-black uppercase focus:border-b-current focus:outline-none lg:pl-14 lg:text-5xl xl:text-6xl"
        />
        {query && (
          <Button
            onClick={() => onChange('')}
            variant="ghost"
            size="iconSm"
            className="text-title-dark hover:text-title-light absolute right-0"
            aria-label="Clear search"
          >
            <Icon
              name="close"
              className="size-5"
            />
          </Button>
        )}
      </div>
    </div>
  );
}

export default SearchOverlayInput;
