import Image from 'next/image';
import { notFound } from 'next/navigation';

import { getTranslations } from 'next-intl/server';

import Icon from '@/components/Icon';
import { routing } from '@/i18n/routing';
import { EventMedia, Media } from '@/payload-types';
import getEvent from '@/services/event';
import getAllEventSlugs from '@/services/event-slugs';
import formatDate from '@/utils/formatDate';

import Breadcrumbs from '../../components/Breadcrumbs';
import SocialMediaShare from '../../components/SocialMediaShare';

import Gallery from './Gallery';

interface EventDetailsProps {
  params: Promise<{ slug: string; locale: Locale }>;
}

export async function generateStaticParams() {
  const allEventsPromises = routing.locales.map(async locale => {
    const events = await getAllEventSlugs(locale);

    return events
      .filter(event => event.slug)
      .map(event => ({
        locale,
        slug: event.slug!,
      }));
  });

  const results = await Promise.all(allEventsPromises);

  return results.flat();
}

export const dynamicParams = false;

async function EventDetails({ params }: EventDetailsProps) {
  const { locale, slug } = await params;

  const t = await getTranslations('Events');

  const event = await getEvent(slug, locale);

  if (!event) {
    return notFound();
  }

  const { title, poster, details, gallery } = event;

  const posterMedia = poster as Media;
  const galleryItems = (gallery?.docs ?? []) as EventMedia[];
  const formattedDate = formatDate(details.date, locale);

  return (
    <section className="pb-24 md:pb-28 lg:pb-32">
      <span className="bg-background block h-20 lg:hidden" />

      <Breadcrumbs currentPageTitle={title} />

      <article>
        {/* Hero */}
        <div className="relative h-80 w-full overflow-hidden md:h-100 lg:h-120">
          <Image
            src={posterMedia.url ?? ''}
            alt={title}
            fill
            priority
            className="xerox-img object-cover"
          />
          <div className="xerox-halftone opacity-30" />

          {/* Gradient overlay — title in lower portion, meta strip at very bottom */}
          <div className="from-background via-background/50 absolute inset-0 flex flex-col justify-end bg-linear-to-t to-transparent">
            {/* Title */}
            <div className="mx-auto w-full max-w-7xl px-4 xl:px-0">
              <h1 className="event-title-shadow font-heading text-blood py-3 text-4xl leading-[0.9] font-black tracking-tight uppercase md:py-8 md:text-6xl lg:text-8xl">
                {title}
              </h1>
            </div>

            {/* Meta strip — date / location / social */}
            <div className="border-title-light/20 mx-auto w-full max-w-7xl border-t">
              <div className="flex items-center justify-between px-4 py-3 md:py-8 xl:px-0">
                <div className="flex items-center gap-5">
                  <div className="flex items-center gap-2">
                    <Icon
                      name="date"
                      className="text-paper-muted size-4 shrink-0"
                    />
                    <span className="font-heading tracking-label text-acid text-base font-bold uppercase">{formattedDate}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Icon
                      name="location"
                      className="text-paper-muted size-4 shrink-0"
                    />
                    <span className="font-heading tracking-label text-title-light text-base uppercase">{details.location}</span>
                  </div>
                </div>

                <SocialMediaShare
                  title={title}
                  slug={slug}
                  locale={locale}
                  type="event"
                  className="bg-transparent! p-0!"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Gallery */}
        {galleryItems.length > 0 && (
          <div className="mx-auto mt-8 w-full max-w-7xl px-4 xl:px-0">
            <div className="border-title-light mb-6 flex items-center gap-4 border-b-2 pb-4">
              <span className="font-heading text-title-light tracking-meta font-black uppercase md:text-lg"> {t('gallery')}</span>
              <span className="bg-title-light h-px flex-1" />
              <span className="font-heading tracking-label text-paper-muted text-base uppercase">{t('photos', { count: galleryItems.length })}</span>
            </div>

            <Gallery
              images={galleryItems}
              eventTitle={title}
              eventDate={formattedDate}
              eventLocation={details.location}
            />
          </div>
        )}
      </article>
    </section>
  );
}

export default EventDetails;
