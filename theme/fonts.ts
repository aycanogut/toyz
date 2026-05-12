import { DM_Sans, Fira_Code } from 'next/font/google';

const grotesque = Fira_Code({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '700'],
  variable: '--font-fira',
});

const display = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '700', '900'],
  variable: '--font-heading',
});

export { grotesque, display };
