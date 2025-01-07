import { Nabla, Darker_Grotesque } from 'next/font/google';

const grotesque = Darker_Grotesque({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-grotesque',
});

const nabla = Nabla({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
  variable: '--font-nabla',
});

export { grotesque, nabla };
