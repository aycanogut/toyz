import type { MetadataRoute } from 'next';

import toyzConfig from '@/toyzConfig';

// TODO: try to add dynamic content
export default function sitemap(): MetadataRoute.Sitemap {
  return [
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
}
