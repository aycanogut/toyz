import { DM_Sans, Roboto_Condensed } from 'next/font/google';

const grotesque = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '700', '900'],
  variable: '--font-grotesque',
});

const display = Roboto_Condensed({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '700', '900'],
  variable: '--font-heading',
});

export { grotesque, display };
