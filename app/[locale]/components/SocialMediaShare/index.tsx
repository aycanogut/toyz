'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';

import Icon from '@/components/Icon';
import cn from '@/utils/cn';
import toyzConfig from 'toyzConfig';

import socialLinks from './socialLinks';

const { baseUrl } = toyzConfig;

interface SocialMediaShareProps {
  title: string;
  slug: string;
  locale: string;
  type?: 'content' | 'events';
  className?: string;
}

function SocialMediaShare({ title, slug, locale, type, className }: SocialMediaShareProps) {
  const [copied, setCopied] = useState(false);

  const t = useTranslations('Content');

  const shareUrl = `${baseUrl}/${locale}/${type}/${slug}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className={cn('bg-background/80 flex items-center gap-1 p-1.5 md:gap-2 md:p-2.5 lg:gap-3 lg:p-3', className)}>
      {socialLinks.map(link => (
        <a
          key={link.name}
          href={link.getUrl(shareUrl, title)}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            'flex size-8 items-center justify-center bg-white/10 text-white transition-all duration-200 hover:scale-110 active:scale-95 md:size-8 lg:size-10',
            link.hoverColor
          )}
          aria-label={t(link.translationKey)}
        >
          <Icon
            name={link.name as IconLabelProps}
            className="size-4 md:size-6"
          />
        </a>
      ))}

      <button
        onClick={handleCopyLink}
        className={cn(
          'flex size-8 items-center justify-center bg-white/10 text-white transition-all duration-200 hover:scale-110 active:scale-95 md:size-8 lg:size-10',
          'hover:bg-title-light hover:text-background cursor-pointer',
          copied && 'bg-green-500 hover:bg-green-500'
        )}
        aria-label={t('copy-link')}
      >
        <Icon
          name={copied ? 'check' : 'link'}
          className="size-4 md:size-6"
        />
      </button>
    </div>
  );
}

export default SocialMediaShare;
