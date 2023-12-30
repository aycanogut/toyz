import { Darker_Grotesque } from 'next/font/google';

const grotesque = Darker_Grotesque({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  variable: '--font-grotesque',
});

export default grotesque;
