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
  const articles = await getSitemap();
  const baseUrl = toyzConfig.baseUrl ?? '';

  const dynamicRoutes: MetadataRoute.Sitemap = articles
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
