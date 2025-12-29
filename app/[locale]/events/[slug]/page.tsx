import Image from 'next/image';
import { notFound } from 'next/navigation';

import { routing } from '@/i18n/routing';
import { Media } from '@/payload-types';
import getEvent from '@/services/event';
import getAllEventSlugs from '@/services/event-slugs';
import formatDate from '@/utils/formatDate';

import BackButton from '../../components/BackButton';
import ContentLabels from '../../components/ContentLabels';
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

export const dynamicParams = true;

async function EventDetails({ params }: EventDetailsProps) {
  const { locale, slug } = await params;

  const event = await getEvent(slug, locale);

  if (!event) {
    return notFound();
  }

  const { title, poster, details, gallery } = event;

  const posterMedia = poster as Media;
  const galleryItems = (gallery ?? []) as Media[];

  const formattedDate = formatDate(details.date, locale);

  console.log(formattedDate);

  return (
    <section className="pb-24 md:pb-28 lg:pb-32">
      <span className="bg-background block h-20 lg:hidden" />

      <article className="flex flex-col gap-8 md:gap-10 lg:gap-12">
        <div className="relative min-w-full">
          <div className="h-80 md:h-100 lg:h-160">
            <Image
              src={posterMedia.url ?? ''}
              alt={title}
              fill
              className="object-cover"
            />

            <header className="absolute inset-0 mx-auto flex size-full max-w-96 flex-col items-center justify-between p-4 md:mx-0 md:max-w-lg md:items-start md:p-5 lg:max-w-4xl lg:p-6">
              <div className="bg-background/80 size-auto p-2 md:p-3 lg:p-4">
                <h1 className="font-grotesque text-title-light max-w-3xl text-center text-2xl font-medium uppercase text-shadow-md md:text-start md:text-4xl lg:text-6xl lg:font-semibold">
                  {title}
                </h1>
              </div>

              <div className="bg-background/80 size-auto p-2 md:p-3 lg:p-4">
                <ContentLabels
                  rootProps={{
                    className: 'flex gap-8',
                  }}
                  iconProps={{
                    className: 'size-4 md:size-5 lg:size-6 mt-1.5',
                  }}
                  labelProps={{
                    className: 'text-base md:text-lg lg:text-2xl text-shadow-md',
                  }}
                  items={{
                    ...details,
                  }}
                />
              </div>
            </header>
          </div>

          <div className="absolute right-0 bottom-0 hidden md:block md:p-5 lg:p-6">
            <SocialMediaShare
              title={title}
              slug={slug}
              locale={locale}
            />
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-7xl justify-between px-4 lg:px-0">
          <BackButton />
        </div>

        {galleryItems.length > 0 && (
          <div className="mx-auto w-full max-w-7xl px-4 lg:px-0">
            <Gallery images={galleryItems} />
          </div>
        )}
      </article>
    </section>
  );
}

export default EventDetails;
