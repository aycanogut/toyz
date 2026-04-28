import { useTranslations } from 'next-intl';

import Button from '@/components/Button';
import Icon from '@/components/Icon';

interface SearchOverlayHeaderProps {
  onClose: () => void;
}

function SearchOverlayHeader({ onClose }: SearchOverlayHeaderProps) {
  const t = useTranslations('Search');

  return (
    <div className="border-title-light flex items-center justify-between border-b-2 px-4 py-4 lg:px-8 lg:py-5">
      <span className="font-heading text-title-dark tracking-eyebrow uppercase lg:text-lg">TOYZ* / {t('title').toUpperCase()}</span>
      <div className="flex items-center gap-3">
        <Button
          onClick={onClose}
          variant="ghost"
          className="font-heading text-title-dark hover:text-title-light tracking-eyebrow hidden p-0 lg:block"
        >
          ESC
        </Button>
        <Button
          onClick={onClose}
          variant="outline"
          size="iconSm"
          className="lg:size-10"
          aria-label="Close search"
        >
          <Icon
            name="close"
            className="size-4"
          />
        </Button>
      </div>
    </div>
  );
}

export default SearchOverlayHeader;
