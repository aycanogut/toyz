import { PropsWithChildren } from 'react';

import Header from './Header';

function Layout({ children }: PropsWithChildren) {
  return (
    <body className="bg-background">
      <Header />
      <main>{children}</main>
    </body>
  );
}

export default Layout;
