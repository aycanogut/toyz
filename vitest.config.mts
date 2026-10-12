import { resolve } from 'path';
import { fileURLToPath } from 'url';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  plugins: [react()],
  test: {
    exclude: ['**/node_modules/**'],
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    projects: [
      {
        extends: true,
        test: {
          name: 'node',
          environment: 'node',
          include: ['tests/unit/**/*.test.ts', 'tests/integration/**/*.test.ts'],
        },
      },
      {
        extends: true,
        test: {
          name: 'dom',
          environment: 'happy-dom',
          include: ['tests/components/**/*.test.tsx'],
        },
      },
    ],
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './'),
    },
  },
});
