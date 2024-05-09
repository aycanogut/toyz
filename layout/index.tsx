import { PropsWithChildren } from 'react';

import Header from './Header';

function Layout({ children }: PropsWithChildren) {
  return (
    <body className="w-full bg-background-dark">
      <Header />
      <main>{children}</main>
    </body>
  );
}

export default Layout;
