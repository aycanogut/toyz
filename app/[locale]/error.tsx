'use client';

import { useTranslations } from 'next-intl';

import Button from '@/components/Button';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const t = useTranslations('Error');

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4 px-12 md:gap-8 lg:p-40">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 360 145"
      >
        <text
          x="50%"
          y="50%"
          dominant-baseline="middle"
          text-anchor="middle"
          font-family="Arial, sans-serif"
          font-weight="bold"
          font-size="150"
          fill="#373737"
        >
          500
        </text>
      </svg>
      <h1 className="font-grotesque text-title-light text-4xl md:text-6xl lg:text-7xl">{error?.message ?? t('500')}</h1>
      <Button onClick={reset}>{t('try-again')}</Button>
    </div>
  );
}
