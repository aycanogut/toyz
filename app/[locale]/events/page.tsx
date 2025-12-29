import Image from 'next/image';

import { getLocale } from 'next-intl/server';

import { Link } from '@/i18n/routing';
import { Media } from '@/payload-types';
import getEventGlobal from '@/services/event-global';
import getEvents from '@/services/events';

async function Events() {
  const locale = await getLocale();

  const events = await getEvents(locale);
  const event = await getEventGlobal(locale);

  const media = event.image as Media;

  if (!media) return null;

  return (
    <section>
      <span className="bg-background block h-20 md:h-24 lg:hidden" />

      <div className="relative h-30 lg:h-45.5">
        <Image
          src={media.url ?? ''}
          alt={media.alt ?? ''}
          fill
          className="object-cover"
        />
      </div>

      <div className="container flex flex-col gap-2 p-4 pt-4 pb-14 lg:gap-8 lg:pt-10 lg:pb-28">
        <header>
          <h1 className="font-grotesque text-title-light text-2xl leading-10 font-medium uppercase lg:text-6xl">{event.title}</h1>
        </header>

        <div className="font-grotesque text-title-light space-y-4 text-xl lg:space-y-6 lg:text-3xl lg:leading-10">{event.description}</div>

        <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {events.docs.map(event => {
            const poster = event.poster as Media;

            return (
              <Link
                key={event.id}
                href={`/events/${event.slug}`}
                className="group relative aspect-3/4 w-full transition-transform hover:scale-101"
              >
                <Image
                  src={poster.url ?? ''}
                  alt={poster.alt ?? event.title}
                  className="object-cover"
                  fill
                />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Events;
