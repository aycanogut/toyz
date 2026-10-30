import { describe, expect, it, vi } from 'vitest';

const { cacheCalls } = vi.hoisted(() => ({
  cacheCalls: new Map<unknown, { keyParts: string[]; options: { revalidate?: number; tags?: string[] } }>(),
}));

vi.mock('next/cache', () => ({
  unstable_cache: (fn: unknown, keyParts: string[], options: { revalidate?: number; tags?: string[] }) => {
    cacheCalls.set(fn, { keyParts, options });
    return fn;
  },
}));

vi.mock('@/utils/payloadClient', () => ({
  getPayloadClient: vi.fn(),
}));

import getAbout from '@/services/about';
import getArticle from '@/services/article';
import getArticles from '@/services/articles';
import getCategories from '@/services/categories';
import getContact from '@/services/contact';
import getEvent from '@/services/event';
import getEventGlobal from '@/services/event-global';
import getEvents from '@/services/events';
import getHome from '@/services/home';
import getRandomArticles from '@/services/randomArticles';
import getSitemap from '@/services/sitemap';
import getSitemapEvents from '@/services/sitemap-events';
import getSlider from '@/services/slider';

const HOUR = 3600;
const DAY = 86400;

// Every cached service needs a tag, otherwise CMS hooks cannot invalidate it.
describe('service cache configuration', () => {
  it.each([
    { name: 'about', service: getAbout, revalidate: DAY, tags: ['about'] },
    { name: 'article', service: getArticle, revalidate: HOUR, tags: ['article'] },
    { name: 'articles', service: getArticles, revalidate: HOUR, tags: ['articles'] },
    { name: 'categories', service: getCategories, revalidate: HOUR, tags: ['categories'] },
    { name: 'contact', service: getContact, revalidate: DAY, tags: ['contact'] },
    { name: 'event', service: getEvent, revalidate: HOUR, tags: ['event'] },
    { name: 'event-global', service: getEventGlobal, revalidate: DAY, tags: ['events-global'] },
    { name: 'events', service: getEvents, revalidate: HOUR, tags: ['events'] },
    { name: 'home', service: getHome, revalidate: DAY, tags: ['home'] },
    { name: 'randomArticles', service: getRandomArticles, revalidate: HOUR, tags: ['articles'] },
    { name: 'sitemap', service: getSitemap, revalidate: HOUR, tags: ['sitemap'] },
    { name: 'sitemap-events', service: getSitemapEvents, revalidate: HOUR, tags: ['sitemap-events'] },
    { name: 'slider', service: getSlider, revalidate: DAY, tags: ['slider'] },
  ])('$name uses revalidate $revalidate with tags $tags', ({ service, revalidate, tags }) => {
    expect(cacheCalls.get(service)?.options).toEqual({ revalidate, tags });
  });
});
