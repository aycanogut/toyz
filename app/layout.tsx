import { ReactNode } from 'react';

import type { Metadata } from 'next';

import Layout from '@/layout';
import { grotesque } from '@/theme';

import '@/theme/globals.css';

export const metadata: Metadata = {
  title: 'TOYZ',
  description: 'TOYZ',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html className={grotesque.variable}>
      <Layout>{children}</Layout>
    </html>
  );
}
