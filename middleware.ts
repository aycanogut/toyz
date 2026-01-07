import createMiddleware from 'next-intl/middleware';

import { routing } from '@/i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Root path'i exclude et - next.config.mjs'deki static redirect kullanılacak
  // Bu sayede middleware bypass edilir ve CPU kullanımı azalır
  // `.+` en az bir karakter gerektirir, bu yüzden root path `/` match etmez
  matcher: ['/((?!admin|api|monitoring|_next|_vercel|.*\\..*).+)'],
};
