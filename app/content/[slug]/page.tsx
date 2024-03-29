import Image from 'next/image';

import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

import { ContentLabels } from '@/components';
import { getEntryBySlug } from '@/contentful/client';
import { cn } from '@/utils';

async function getData(slug: string): Promise<ContentProps> {
  const response = await getEntryBySlug('content', slug);

  return response as unknown as ContentProps;
}

async function ContentDetails({ params }: { params: { slug: string } }) {
  const data = await getData(params.slug);

  return (
    <section className="lg:pb-24 lg:pt-2">
      <div className="h-24 bg-background-light lg:hidden" />
      <article>
        <div className="container relative h-56 w-full md:hidden">
          <Image
            src={`https:${data.fields.image.fields.file.url}`}
            alt={data.fields.title}
            fill
            className="object-cover"
          />
        </div>

        <header className="container space-y-6 px-4 pt-8 md:pb-8 lg:space-y-10 xl:px-0">
          <h1 className=" text-start font-grotesque text-2xl font-medium text-title-light md:text-3xl lg:text-5xl lg:font-semibold">{data.fields.title}</h1>

          <ContentLabels items={data.fields.details} />
        </header>

        <div className="container space-y-6 px-4 md:space-y-10 xl:px-0">
          <div className="relative hidden h-80 w-full md:block lg:h-[22.3125rem]">
            <Image
              src={`https:${data.fields.image.fields.file.url}`}
              alt={data.fields.title}
              fill
              className="object-cover opacity-70 blur-sm"
            />

            <div className="absolute inset-0 m-auto h-[19.3125rem] w-[31.625rem]">
              <Image
                src={`https:${data.fields.image.fields.file.url}`}
                alt={data.fields.title}
                fill
                className="object-contain"
              />
            </div>
          </div>

          <div className={cn('text-xl leading-8 text-title-light md:text-2xl lg:leading-9', 'rich-text-renderer')}>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any  */}
            {documentToReactComponents(data.fields.content as any)}
          </div>
        </div>
      </article>
    </section>
  );
}

export default ContentDetails;
