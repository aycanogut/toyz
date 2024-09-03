import Image from 'next/image';
import Link from 'next/link';

import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Document, BLOCKS, INLINES } from '@contentful/rich-text-types';

import { ContentLabels } from '@/components';
import { getEntryBySlug } from '@/contentful/client';
import { Locale } from '@/i18n';

import EmbedVideo from './EmbedVideo';
import ImageAsset from './ImageAsset';
import SocialMediaShare from './SocialMediaShare';

async function getData(slug: string, locale: Locale): Promise<ContentProps> {
  const response = await getEntryBySlug('content', slug, locale);

  return response as unknown as ContentProps;
}

async function ContentDetails({ params }: { params: { slug: string; locale: Locale } }) {
  const data = await getData(params.slug, params.locale);

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
          <h1 className="text-start font-grotesque text-2xl font-medium text-title-light md:text-3xl lg:text-5xl lg:font-semibold">{data.fields.title}</h1>

          <div className="flex w-full flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <ContentLabels items={data.fields.details} />

            <SocialMediaShare
              title={data.fields.title}
              slug={params.slug}
              locale={params.locale}
            />
          </div>
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

          <div className="prose min-w-full text-title-light md:prose-lg lg:prose-xl prose-headings:text-title-light prose-a:text-title-light prose-li:-my-5">
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
                  const url = node?.data?.target?.fields?.url ?? '';

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
