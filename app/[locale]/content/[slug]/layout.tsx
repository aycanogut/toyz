import { ReactNode } from 'react';

import { Metadata } from 'next';

import { getEntryBySlug } from '@/contentful/client';
import toyzConfig from '@/toyzConfig';

async function getData(slug: string, locale: Locale): Promise<ContentProps> {
  const response = await getEntryBySlug('content', slug, locale);

  return response as unknown as ContentProps;
}

export async function generateMetadata({
  params,
}: {
  params: {
    locale: Locale;
    slug: string;
  };
}): Promise<Metadata> {
  const data = await getData(params.slug, params.locale);

  const title = data.fields.title;
  const description = data.fields.description;
  const image = `https:${data?.fields?.image?.fields?.file.url}`;
  const applicationName = toyzConfig.title;
  const keywords = data.fields.keywords.join(', ');
  const openGraph = {
    siteName: toyzConfig.title,
    url: toyzConfig.baseUrl,
    type: 'article',
  };
  const authors = {
    name: data.fields.details.find(detail => detail.icon === 'user')?.label,
  };

  return {
    title,
    description,
    applicationName,
    keywords,
    openGraph: {
      images: [image],
      ...openGraph,
    },
    authors,
  };
}

export default function ContentLayout({ children }: { children: ReactNode }) {
  return <section>{children}</section>;
}
