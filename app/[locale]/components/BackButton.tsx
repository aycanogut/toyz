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
      className="focus-visible:ring-title-light inline-flex cursor-pointer items-center gap-2 border-0 bg-transparent p-0 focus-visible:ring-2 focus-visible:outline-hidden"
    >
      <Icon
        name="arrow-left"
        className="text-title-light size-6"
      />
      <span className="font-grotesque text-title-light mb-1 bg-transparent text-xl font-bold capitalize lg:text-2xl">{t('back')}</span>
    </Button>
  );
}

export default BackButton;
