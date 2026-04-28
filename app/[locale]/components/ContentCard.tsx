import Image from 'next/image';

import { useFormatter, useTranslations } from 'next-intl';

import { Link } from '@/i18n/routing';
import cn from '@/utils/cn';

interface ContentCardProps {
  title: string;
  description?: string;
  image: string;
  imageAlt?: string;
  date: string;
  author: string;
  category?: string;
  categorySlug?: string;
  readTimeMinutes?: number;
  slug: string;
  index: number;
}

const ACCENT_CLASSES = ['bg-acid', 'bg-blood text-title-light', 'bg-acid', 'bg-amber', 'bg-acid', 'bg-blood text-title-light'] as const;

const TILT_CLASSES = ['lg:-rotate-1', 'lg:rotate-md', 'lg:-rotate-sm'] as const;

function ContentCard({ title, description, image, imageAlt, date, author, category, categorySlug, readTimeMinutes, slug, index }: ContentCardProps) {
  const t = useTranslations('Meta');

  const format = useFormatter();

  const flipped = index % 2 === 1;

  const accent = ACCENT_CLASSES[index % ACCENT_CLASSES.length];

  const tilt = TILT_CLASSES[index % TILT_CLASSES.length];

  const formattedDate = (() => {
    const d = new Date(date);

    if (Number.isNaN(d.getTime())) return date;

    return format.dateTime(d, { day: '2-digit', month: '2-digit', year: 'numeric' });
  })();

  return (
    <article
      className={cn(
        'border-paper-muted grid items-center gap-8 border-b border-dashed py-8',
        'lg:gap-10 lg:py-10',
        flipped ? 'lg:grid-cols-card-flip' : 'lg:grid-cols-card'
      )}
    >
      <Link
        href={`/content/${slug}`}
        className={cn('group relative block aspect-16/10 w-full lg:aspect-auto lg:h-72', flipped && 'lg:order-2', tilt)}
      >
        <div className="border-title-light xerox-shadow-hard relative h-full w-full overflow-hidden border-4 lg:border-6">
          <Image
            src={image}
            alt={imageAlt ?? title}
            fill
            sizes="(min-width: 1024px) 460px, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="xerox-halftone" />
        </div>
        <div
          aria-hidden="true"
          className="absolute -top-2.5 left-2/5 h-6 w-16 -rotate-4 bg-white/55 shadow-md"
        />
      </Link>

      <div className={cn(flipped ? 'lg:order-1 lg:pr-2' : 'lg:order-2 lg:pl-2')}>
        {category && (
          <Link
            href={categorySlug ? `?category=${categorySlug}` : '#'}
            scroll={false}
            className={cn('font-heading text-background tracking-meta mb-3 inline-block px-2.5 py-1 font-black uppercase', accent)}
          >
            {category}
          </Link>
        )}
        <Link
          href={`/content/${slug}`}
          className="block"
        >
          <h2 className="font-heading text-title-light hover:text-acid mb-3 text-3xl font-black uppercase transition-colors md:text-4xl lg:text-5xl">
            {title}
          </h2>
        </Link>
        {description && <p className="font-fira text-title-dark mb-4 leading-relaxed md:text-lg">{description}</p>}
        <div className="font-heading text-paper-muted tracking-label flex flex-wrap items-center gap-3 text-sm uppercase">
          <span className="text-title-light font-bold">{author}</span>
          <span aria-hidden="true">·</span>
          <span>{formattedDate}</span>
          {readTimeMinutes != null && (
            <>
              <span aria-hidden="true">·</span>
              <span>{t('read-time', { count: readTimeMinutes })}</span>
            </>
          )}
        </div>
      </div>
    </article>
  );
}

export default ContentCard;
