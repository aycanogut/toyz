import { PropsWithChildren } from 'react';

import { Toaster } from 'sonner';

import Header from './Header';

function Layout({ children }: PropsWithChildren) {
  return (
    <body className="bg-background">
      <Header />
      <main>{children}</main>
      <Toaster theme="dark" />
    </body>
  );
}

export default Layout;
