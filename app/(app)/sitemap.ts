import type { MetadataRoute } from 'next';

import { routing } from '@/i18n/routing';
import toyzConfig from '@/toyzConfig';
import { getPayloadClient } from '@/utils/payloadClient';

const locales = routing.locales as ReadonlyArray<Locale>;

const staticRoutes: MetadataRoute.Sitemap = [
  {
    url: `${toyzConfig.baseUrl}/en`,
    lastModified: new Date(),
    alternates: {
      languages: {
        en: `${toyzConfig.baseUrl}/en`,
        tr: `${toyzConfig.baseUrl}/tr`,
      },
    },
  },
  {
    url: `${toyzConfig.baseUrl}/en/about`,
    lastModified: new Date(),
    alternates: {
      languages: {
        en: `${toyzConfig.baseUrl}/en/about`,
        tr: `${toyzConfig.baseUrl}/tr/about`,
      },
    },
  },
  {
    url: `${toyzConfig.baseUrl}/en/contact`,
    lastModified: new Date(),
    alternates: {
      languages: {
        en: `${toyzConfig.baseUrl}/en/contact`,
        tr: `${toyzConfig.baseUrl}/tr/contact`,
      },
    },
  },
  {
    url: `${toyzConfig.baseUrl}/en/search`,
    lastModified: new Date(),
    alternates: {
      languages: {
        en: `${toyzConfig.baseUrl}/en/search`,
        tr: `${toyzConfig.baseUrl}/tr/search`,
      },
    },
  },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayloadClient();
  const baseUrl = toyzConfig.baseUrl ?? '';

  const { docs } = await payload.find({
    collection: 'articles',
    select: {
      slug: true,
      updatedAt: true,
    },
  });

  const dynamicRoutes: MetadataRoute.Sitemap = docs
    .filter(doc => Boolean(doc.slug))
    .flatMap(doc => {
      const slug = doc.slug as string;
      const languages = locales.reduce<Record<string, string>>((acc, locale) => {
        acc[locale] = `${baseUrl}/${locale}/content/${slug}`;
        return acc;
      }, {});

      return locales.map(locale => ({
        url: languages[locale],
        lastModified: doc.updatedAt ? new Date(doc.updatedAt) : new Date(),
        alternates: {
          languages,
        },
      }));
    });

  return [...staticRoutes, ...dynamicRoutes];
}
