import Image from 'next/image';

import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Document, BLOCKS, INLINES } from '@contentful/rich-text-types';
import { getTranslations } from 'next-intl/server';

import { ContentLabels, Icon } from '@/components';
import { getEntryBySlug } from '@/contentful/client';
import { Link } from '@/i18n/routing';

import EmbedVideo from './EmbedVideo';
import ImageAsset from './ImageAsset';
import ScrollProgressAnimation from './ScrollProgressAnimation';
import SocialMediaShare from './SocialMediaShare';

async function getData(slug: string, locale: Locale): Promise<ContentProps> {
  const response = await getEntryBySlug('content', slug, locale);

  return response as unknown as ContentProps;
}

async function ContentDetails(props: { params: Promise<{ slug: string; locale: Locale }> }) {
  const params = await props.params;
  const data = await getData(params.slug, params.locale);

  const t = await getTranslations('Content');

  return (
    <section className="lg:pt-2 lg:pb-24">
      <ScrollProgressAnimation />

      <span className="bg-background-light block h-20 lg:hidden" />
      <article>
        <div className="relative container h-56 w-full md:hidden">
          <Image
            src={`https:${data.fields.image.fields.file.url}`}
            alt={data.fields.title}
            fill
            className="object-cover"
          />
        </div>

        <header className="container space-y-6 px-4 pt-8 md:pb-8 lg:space-y-10 xl:px-0">
          <Link
            href="/"
            className="focus-visible:ring-title-light inline-flex items-center gap-2 p-2 focus-visible:ring-2 focus-visible:outline-hidden"
          >
            <Icon
              name="arrow-left"
              size={24}
              className="text-title-light"
            />
            <span className="font-grotesque text-title-light mb-1 bg-transparent text-xl font-bold capitalize lg:text-2xl">{t('back')}</span>
          </Link>

          <h1 className="font-grotesque text-title-light text-start text-2xl font-medium md:text-3xl lg:text-5xl lg:font-semibold">{data.fields.title}</h1>
          <div className="flex w-full flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <ContentLabels items={data.fields.details} />

            <SocialMediaShare
              title={data.fields.title}
              slug={params.slug}
              locale={params.locale}
            />
          </div>
        </header>

        <div className="container space-y-6 px-4 pb-12 md:space-y-10 xl:px-0">
          <div className="relative hidden h-80 w-full md:block lg:h-[22.3125rem]">
            <Image
              src={`https:${data.fields.image.fields.file.url}`}
              alt={data.fields.title}
              fill
              className="object-cover opacity-70 blur-xs"
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

          <div className="prose text-title-light md:prose-lg lg:prose-xl prose-headings:text-title-light prose-a:text-title-light prose-li:-my-5 min-w-full">
            {documentToReactComponents(data.fields.content as unknown as Document, {
              renderNode: {
                /**
                 * Converts Contentful embedded asset entry to an Image component
                 */
                [BLOCKS.EMBEDDED_ASSET]: node => {
                  const url = node.data?.target?.fields?.file?.url;
                  const title = node?.data?.target?.fields?.title;
                  const description = node?.data?.target?.fields?.description;

                  return (
                    url &&
                    title && (
                      <ImageAsset
                        title={title}
                        description={description}
                        url={url}
                      />
                    )
                  );
                },
                /**
                 * Converts Contentful embedded entry to a Video component
                 */
                [INLINES.EMBEDDED_ENTRY]: node => {
                  const description = node?.data?.target?.fields?.description;
                  const url = node?.data?.target?.fields?.url;

                  return (
                    <EmbedVideo
                      description={description}
                      url={url}
                    />
                  );
                },
                /**
                 * Converts Contentful hyperlink to a Next.js Link component
                 */
                [INLINES.HYPERLINK]: node => {
                  const { value } = node.content[0] as unknown as { value: string };

                  return (
                    <Link
                      href={node.data.uri}
                      target="_blank"
                    >
                      {value}
                    </Link>
                  );
                },
              },
            })}
          </div>
        </div>
      </article>
    </section>
  );
}

export default ContentDetails;
