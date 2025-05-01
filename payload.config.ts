import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { buildConfig } from 'payload';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { Articles } from './app/(payload)/collections/articles';
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
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  editor: lexicalEditor(),
  collections: [Articles, Media],
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
