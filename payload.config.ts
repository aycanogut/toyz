import path from 'path';
import { fileURLToPath } from 'url';

import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { resendAdapter } from '@payloadcms/email-resend';
import { searchPlugin } from '@payloadcms/plugin-search';
import { BlocksFeature, lexicalEditor } from '@payloadcms/richtext-lexical';
import { s3Storage } from '@payloadcms/storage-s3';
import { buildConfig } from 'payload';
import sharp from 'sharp';

import { YouTubeBlock } from './app/(payload)/blocks/youtube';
import { Articles } from './app/(payload)/collections/articles';
import { Categories } from './app/(payload)/collections/categories';
import { EventMedia } from './app/(payload)/collections/event-media';
import { Events } from './app/(payload)/collections/events';
import { Media } from './app/(payload)/collections/media';
import { Subscribers } from './app/(payload)/collections/subscribers';
import { About } from './app/(payload)/globals/about';
import { Contact } from './app/(payload)/globals/contact';
import { EventsGlobal } from './app/(payload)/globals/events';
import { Home } from './app/(payload)/globals/home';
import { SearchPage } from './app/(payload)/globals/searchPage';
import { Slider } from './app/(payload)/globals/slider';
import { newArticleEmailTask } from './app/(payload)/jobs/newArticleEmailTask';
import toyzConfig from './toyzConfig';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  collections: [Articles, Media, Categories, Events, EventMedia, Subscribers],
  globals: [Home, Slider, About, Contact, SearchPage, EventsGlobal],
  secret: toyzConfig.payloadSecret || '',
  db: mongooseAdapter({
    url: toyzConfig.databaseUri || '',
    connectOptions: {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
    },
  }),
  plugins: [
    searchPlugin({
      collections: ['articles'],
    }),
    s3Storage({
      collections: {
        media: {
          generateFileURL: ({ filename }) => {
            return `https://cdn.toyzwebzine.com/${filename}`;
          },
          disableLocalStorage: true,
        },
        'event-media': {
          generateFileURL: ({ filename }) => {
            return `https://cdn.toyzwebzine.com/${filename}`;
          },
          disableLocalStorage: true,
        },
      },
      bucket: toyzConfig.r2BucketName,
      config: {
        credentials: {
          accessKeyId: toyzConfig.r2AccessKeyId,
          secretAccessKey: toyzConfig.r2SecretAccessKey,
        },
        region: 'auto',
        endpoint: toyzConfig.r2Endpoint,
      },
    }),
  ],
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [...defaultFeatures, BlocksFeature({ blocks: [YouTubeBlock] })],
  }),
  localization: {
    locales: ['en', 'tr'],
    defaultLocale: 'en',
  },
  upload: {
    limits: {
      fileSize: 1000000,
    },
  },
  admin: {
    livePreview: {
      url: 'http://localhost:3000',
      collections: ['articles'],
      globals: ['slider', 'about', 'contact'],
    },
  },
  email: resendAdapter({
    defaultFromAddress: toyzConfig.contactEmail,
    defaultFromName: toyzConfig.title,
    apiKey: toyzConfig.resendApiKey,
  }),
  jobs: {
    tasks: [newArticleEmailTask],
    autoRun: [
      {
        cron: '*/5 * * * *',
        limit: 50,
      },
    ],
    jobsCollectionOverrides: ({ defaultJobsCollection }) => ({
      ...defaultJobsCollection,
      admin: {
        ...defaultJobsCollection.admin,
        hidden: false,
        defaultColumns: ['taskSlug', 'completedAt', 'hasError', 'processing', 'totalTried'],
      },
    }),
  },
  routes: {
    admin: '/toyz-panel',
  },
});
