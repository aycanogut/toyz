import type { MetadataRoute } from 'next';

import toyzConfig from '@/toyzConfig';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/about', '/contact', '/search', '/content/'],
    },
    sitemap: `${toyzConfig.baseUrl}/sitemap.xml`,
  };
}
