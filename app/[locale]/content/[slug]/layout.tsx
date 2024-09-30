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

// TODO: Update production URL
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await getData(params.slug, params.locale);

  const title = data.fields.title;
  const description = data.fields.description;
  const image = `https:${data?.fields?.image?.fields?.file.url}`;
  const applicationName = 'TOYZ';
  const keywords =
    params.locale === 'en'
      ? 'search page, toyz, counter-culture, webzine, graffiti, skateboarding, punk rock, art, cinema, photography '
      : 'arama sayfası,  toyz, karşı kültür, webzine, graffiti, kaykay, punk rock, sanat, sinema, fotoğrafçılık';
  const openGraph = {
    siteName: 'TOYZ',
    url: 'https://toyz-swart.vercel.app/',
    type: 'website',
  };
  const authors = {
    name: 'Aycan Öğüt',
    url: 'https://aycan.dev',
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

export default function ContentLayout({ children }: { children: React.ReactNode }) {
  return <section>{children}</section>;
}
