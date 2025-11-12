import path from 'path';
import { fileURLToPath } from 'url';

import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { resendAdapter } from '@payloadcms/email-resend';
import { searchPlugin } from '@payloadcms/plugin-search';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob';
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
  }),
  plugins: [
    searchPlugin({
      collections: ['articles'],
    }),
    vercelBlobStorage({
      collections: {
        media: true,
      },

      token: toyzConfig.vercelBlobReadWriteToken,
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
