import { Metadata } from 'next';

import { getEntryBySlug } from '@/contentful/client';
import { Locale } from '@/i18n';

type Props = {
  params: {
    slug: string;
    locale: Locale;
  };
};

async function getData(slug: string, locale: Locale): Promise<ContentProps> {
  const response = await getEntryBySlug('content', slug, locale);

  return response as unknown as ContentProps;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await getData(params.slug, params.locale);

  const title = data.fields.title;
  const description = data.fields.description;
  const image = `https:${data?.fields?.image?.fields?.file.url}`;

  return {
    title,
    description,
    openGraph: {
      images: [image],
    },
  };
}

export default function ContentLayout({ children }: { children: React.ReactNode }) {
  return <section>{children}</section>;
}
