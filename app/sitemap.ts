import type { MetadataRoute } from 'next';

import { routing } from '@/i18n/routing';
import getSitemap from '@/services/sitemap';
import getSitemapEvents from '@/services/sitemap-events';
import toyzConfig from '@/toyzConfig';

const locales = routing.locales as ReadonlyArray<Locale>;

const staticPaths = ['', '/about', '/contact', '/search', '/events'];

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
  const events = await getSitemapEvents();
  const baseUrl = toyzConfig.baseUrl ?? '';

  const articleRoutes: MetadataRoute.Sitemap = articles
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

  const eventRoutes: MetadataRoute.Sitemap = events
    .filter(doc => Boolean(doc.slug))
    .flatMap(doc => {
      const slug = doc.slug as string;
      const languages: Record<string, string> = {
        ...locales.reduce<Record<string, string>>((acc, locale) => {
          acc[locale] = `${baseUrl}/${locale}/events/${slug}`;
          return acc;
        }, {}),
        'x-default': `${baseUrl}/en/events/${slug}`,
      };

      return locales.map(locale => ({
        url: `${baseUrl}/${locale}/events/${slug}`,
        lastModified: doc.updatedAt ? new Date(doc.updatedAt) : new Date(),
        alternates: {
          languages,
        },
      }));
    });

  return [...staticRoutes, ...articleRoutes, ...eventRoutes];
}
