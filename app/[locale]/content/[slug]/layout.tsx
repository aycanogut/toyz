import { ReactNode } from 'react';

import { Metadata } from 'next';

import toyzConfig from '@/toyzConfig';

export async function generateMetadata(props: {
  params: Promise<{
    locale: Locale;
    slug: string;
  }>;
}): Promise<Metadata> {
  return {};
  // const params = await props.params;

  // const title = data.fields.title;
  // const description = data.fields.description;
  // const image = `https:${data?.fields?.image?.fields?.file.url}`;
  // const applicationName = toyzConfig.title;
  // const keywords = data.fields.keywords.join(', ');
  // const openGraph = {
  //   siteName: toyzConfig.title,
  //   url: toyzConfig.baseUrl,
  //   type: 'article',
  // };
  // const authors = {
  //   name: data.fields.details.find(detail => detail.icon === 'user')?.label,
  // };

  // return {
  //   title,
  //   description,
  //   applicationName,
  //   keywords,
  //   openGraph: {
  //     images: [image],
  //     ...openGraph,
  //   },
  //   authors,
  // };
}

export default function ContentLayout({ children }: { children: ReactNode }) {
  return <section>{children}</section>;
}
