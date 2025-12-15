import type { MetadataRoute } from 'next';

import { routing } from '@/i18n/routing';
import getSitemap from '@/services/sitemap';
import toyzConfig from '@/toyzConfig';

const locales = routing.locales as ReadonlyArray<Locale>;

const staticRoutes: MetadataRoute.Sitemap = [
  {
    url: `${toyzConfig.baseUrl}/en`,
    lastModified: new Date(),
    alternates: {
      languages: {
        en: `${toyzConfig.baseUrl}/en`,
        tr: `${toyzConfig.baseUrl}/tr`,
        'x-default': `${toyzConfig.baseUrl}/en`,
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
        'x-default': `${toyzConfig.baseUrl}/en/about`,
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
        'x-default': `${toyzConfig.baseUrl}/en/contact`,
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
        'x-default': `${toyzConfig.baseUrl}/en/search`,
      },
    },
  },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getSitemap();
  const baseUrl = toyzConfig.baseUrl ?? '';

  const dynamicRoutes: MetadataRoute.Sitemap = articles
    .filter(doc => Boolean(doc.slug))
    .flatMap(doc => {
      const slug = doc.slug as string;
      const languages: Record<string, string> = {
        ...locales.reduce<Record<string, string>>((acc, locale) => {
          acc[locale] = `${baseUrl}/${locale}/content/${slug}`;
          return acc;
        }, {}),
        'x-default': `${baseUrl}/en/content/${slug}`,
      };

      return locales.map(locale => ({
        url: `${baseUrl}/${locale}/content/${slug}`,
        lastModified: doc.updatedAt ? new Date(doc.updatedAt) : new Date(),
        alternates: {
          languages,
        },
      }));
    });

  return [...staticRoutes, ...dynamicRoutes];
}
