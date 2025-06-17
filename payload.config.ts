import path from 'path';
import { fileURLToPath } from 'url';

import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob';
import { buildConfig } from 'payload';
import sharp from 'sharp';

import { Articles } from './app/(payload)/collections/articles';
import { Categories } from './app/(payload)/collections/categories';
import { Media } from './app/(payload)/collections/media';
import { About } from './app/(payload)/globals/about';
import { Contact } from './app/(payload)/globals/contact';
import { Slider } from './app/(payload)/globals/slider';
import toyzConfig from './toyzConfig';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  secret: toyzConfig.payloadSecret || '',
  db: mongooseAdapter({
    url: toyzConfig.databaseUri || '',
  }),
  plugins: [
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
  collections: [Articles, Media, Categories],
  globals: [Slider, About, Contact],
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
});
