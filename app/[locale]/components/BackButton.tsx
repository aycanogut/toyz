'use client';

import { useTranslations } from 'next-intl';

import Button from '@/components/Button';
import Icon from '@/components/Icon';
import { useRouter } from '@/i18n/routing';

function BackButton() {
  const { back } = useRouter();

  const t = useTranslations('Content');

  return (
    <Button
      onClick={back}
      className="focus-visible:ring-title-light group inline-flex cursor-pointer items-center gap-2 border-0 bg-transparent p-0 hover:bg-transparent focus-visible:ring-2 focus-visible:outline-hidden"
    >
      <Icon
        name="arrow-left"
        className="text-title-light group-hover:text-title-dark size-6 transition-colors"
      />
      <span className="font-grotesque text-title-light group-hover:text-title-dark mb-1 bg-transparent text-xl font-bold capitalize transition-colors lg:text-2xl">
        {t('back')}
      </span>
    </Button>
  );
}

export default BackButton;
