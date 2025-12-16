import type { MetadataRoute } from 'next';

import { routing } from '@/i18n/routing';
import getSitemap from '@/services/sitemap';
import toyzConfig from '@/toyzConfig';

const locales = routing.locales as ReadonlyArray<Locale>;


const staticPaths = ['', '/about', '/contact', '/search'];

const staticRoutes: MetadataRoute.Sitemap = staticPaths.flatMap(path => {
  const languages: Record<string, string> = {
    en: `${toyzConfig.baseUrl}/en${path}`,
    tr: `${toyzConfig.baseUrl}/tr${path}`,
    'x-default': `${toyzConfig.baseUrl}/en${path}`,
  };

  return locales.map(locale => ({
    url: `${toyzConfig.baseUrl}/${locale}${path}`,
    lastModified: new Date(),
    alternates: {
      languages,
    },
  }));
});

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
