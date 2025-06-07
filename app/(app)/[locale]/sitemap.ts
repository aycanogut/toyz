import type { MetadataRoute } from 'next';

import toyzConfig from '@/toyzConfig';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // TODO: sluglari cekip maple

  // const dynamicPages = data.map(item => {
  //   return {
  //     url: `${toyzConfig.baseUrl}/en/${item.fields.slug}`,
  //     lastModified: new Date(),
  //     alternates: {
  //       languages: {
  //         en: `${toyzConfig.baseUrl}/en/${item.fields.slug}`,
  //         tr: `${toyzConfig.baseUrl}/tr/${item.fields.slug}`,
  //       },
  //     },
  //   };
  // });

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
    // ...dynamicPages,
  ];
}
