import path from 'path';
import { fileURLToPath } from 'url';

import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { resendAdapter } from '@payloadcms/email-resend';
import { searchPlugin } from '@payloadcms/plugin-search';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { s3Storage } from '@payloadcms/storage-s3';
import { buildConfig } from 'payload';
import sharp from 'sharp';

import { Articles } from './app/(payload)/collections/articles';
import { Categories } from './app/(payload)/collections/categories';
import { Media } from './app/(payload)/collections/media';
import { About } from './app/(payload)/globals/about';
import { Contact } from './app/(payload)/globals/contact';
import { Home } from './app/(payload)/globals/home';
import { SearchPage } from './app/(payload)/globals/searchPage';
import { Slider } from './app/(payload)/globals/slider';
import toyzConfig from './toyzConfig';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  collections: [Articles, Media, Categories],
  globals: [Home, Slider, About, Contact, SearchPage],
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
            return `https://pub-cd16781be9924a9487a27c25c2aca029.r2.dev/${filename}`;
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
  editor: lexicalEditor(),
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
});
