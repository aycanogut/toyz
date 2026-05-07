import Image from 'next/image';

import { getLocale } from 'next-intl/server';

import Breadcrumbs from '@/components/Breadcrumbs';
import Icon from '@/components/Icon';
import { Link } from '@/i18n/routing';
import { Media } from '@/payload-types';
import getEventGlobal from '@/services/event-global';
import getEvents from '@/services/events';
import cn from '@/utils/cn';
import formatDate from '@/utils/formatDate';

const TILT_CLASSES = ['lg:-rotate-1', 'lg:rotate-md'] as const;

async function Events() {
  const locale = await getLocale();

  const [events, eventGlobal] = await Promise.all([getEvents(locale), getEventGlobal(locale)]);

  return (
    <section className="pb-24 md:pb-28 lg:pb-32">
      <span className="bg-background block h-20 md:h-24 lg:hidden" />

      <Breadcrumbs />

      <div className="mx-auto w-full max-w-7xl px-4 pt-6 sm:px-6 lg:px-8 lg:pt-14">
        <header className="border-title-light mb-8 border-b-2 pb-6 lg:mb-12 lg:pb-8">
          <h1 className="font-heading text-title-light text-6xl leading-none font-black tracking-tight uppercase lg:text-8xl">{eventGlobal.title}</h1>
        </header>

        <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
          {events.docs.map((event, index) => {
            const poster = event.poster as Media;
            const tilt = TILT_CLASSES[index % TILT_CLASSES.length];

            return (
              <Link
                key={event.id}
                href={`/events/${event.slug}`}
                className={cn('group relative block', tilt)}
              >
                <div
                  aria-hidden="true"
                  className="absolute -top-2.5 left-2/5 z-10 h-6 w-16 -rotate-4 bg-white/55 shadow-md"
                />

                <div className="border-title-light xerox-shadow-hard relative aspect-3/4 w-full overflow-hidden border-4">
                  <Image
                    src={poster.url ?? ''}
                    alt={poster.alt ?? event.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="xerox-halftone" />

                <div className="mt-3 space-y-1.5">
                  <h5 className="font-heading text-title-light group-hover:text-acid text-lg leading-tight font-black uppercase transition-colors md:text-xl">
                    {event.title}
                  </h5>

                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-1.5">
                      <Icon
                        name="date"
                        className="text-paper-muted mt-0.5 size-4"
                      />
                      <span className="font-heading tracking-label text-paper-muted text-base uppercase">
                        {formatDate(event.details.date, locale as Locale)}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <Icon
                        name="location"
                        className="text-paper-muted mt-0.5 size-4"
                      />
                      <span className="font-heading tracking-label text-paper-muted text-base uppercase">{event.details.location}</span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Events;
