import { getLocale, getTranslations } from 'next-intl/server';

import Breadcrumbs from '@/components/Breadcrumbs';
import { Media } from '@/payload-types';
import getEventGlobal from '@/services/event-global';
import getEvents from '@/services/events';
import formatDate from '@/utils/formatDate';
import isUpcomingEvent from '@/utils/isUpcomingEvent';

import EventCard from './EventCard';

const TILT_CLASSES = ['lg:-rotate-1', 'lg:rotate-md'] as const;

async function Events() {
  const locale = await getLocale();
  const t = await getTranslations('Events');

  const [events, eventGlobal] = await Promise.all([getEvents(locale), getEventGlobal(locale)]);

  const upcoming = events.docs.filter(event => isUpcomingEvent(event.details.date));
  const past = events.docs.filter(event => !isUpcomingEvent(event.details.date)).reverse();

  const groups = [
    { key: 'upcoming', label: t('upcoming'), docs: upcoming },
    { key: 'past', label: t('past'), docs: past },
  ].filter(group => group.docs.length > 0);

  return (
    <section className="pb-24 md:pb-28 lg:pb-32">
      <span className="bg-background block h-20 md:h-24 lg:hidden" />

      <Breadcrumbs />

      <div className="mx-auto w-full max-w-7xl px-4 pt-6 sm:px-6 lg:px-8 lg:pt-14">
        <header className="border-title-light mb-8 border-b-2 pb-6 lg:mb-12 lg:pb-8">
          <h1 className="font-heading text-title-light text-5xl leading-none font-black tracking-tight uppercase md:text-6xl lg:text-8xl">
            {eventGlobal.title}
          </h1>
        </header>

        <div className="space-y-20 md:space-y-24 lg:space-y-28">
          {groups.map(group => (
            <section key={group.key}>
              <header className="flex items-center gap-3 md:gap-4">
                <h2 className="font-heading text-title-light text-2xl leading-none font-black uppercase md:text-3xl">{group.label}</h2>
                <span
                  aria-hidden="true"
                  className="bg-title-light h-0.5 flex-1"
                />
                <span className="font-heading text-acid tracking-label shrink-0 font-bold whitespace-nowrap uppercase">
                  {t('count', { count: group.docs.length })}
                </span>
              </header>

              <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 md:mt-8 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
                {group.docs.map((event, index) => (
                  <EventCard
                    key={event.id}
                    title={event.title}
                    slug={event.slug ?? ''}
                    poster={event.poster as Media}
                    date={formatDate(event.details.date, locale as Locale)}
                    location={event.details.location}
                    className={TILT_CLASSES[index % TILT_CLASSES.length]}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Events;
