import { HTMLAttributes } from 'react';

import Image from 'next/image';

import Icon from '@/components/Icon';
import { Link } from '@/i18n/routing';
import { Media } from '@/payload-types';
import cn from '@/utils/cn';

interface EventCardProps extends HTMLAttributes<HTMLAnchorElement> {
  title: string;
  slug: string;
  poster: Media;
  date: string;
  location: string;
}

function EventCard({ title, slug, poster, date, location, className, ...props }: EventCardProps) {
  return (
    <Link
      href={`/events/${slug}`}
      className={cn('group relative block', className)}
      {...props}
    >
      <article>
        <div
          aria-hidden="true"
          className="absolute -top-2.5 left-2/5 z-10 h-6 w-16 -rotate-4 bg-white/55 shadow-md"
        />

        <div className="border-title-light xerox-shadow-hard relative aspect-3/4 w-full overflow-hidden border-4">
          <Image
            src={poster.url ?? ''}
            alt={poster.alt ?? title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="xerox-halftone" />

        <div className="mt-3 space-y-1.5">
          <h5 className="font-heading text-title-light group-hover:text-acid text-lg leading-tight font-black uppercase transition-colors md:text-xl">
            {title}
          </h5>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5">
              <Icon
                name="date"
                className="text-paper-muted mt-0.5 size-4"
              />
              <span className="font-heading tracking-label text-paper-muted text-base uppercase">{date}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <Icon
                name="location"
                className="text-paper-muted mt-0.5 size-4"
              />
              <span className="font-heading tracking-label text-paper-muted text-base uppercase">{location}</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default EventCard;
