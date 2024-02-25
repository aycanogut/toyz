import { PropsWithChildren } from 'react';

import Header from './Header';

function Layout({ children }: PropsWithChildren) {
  return (
    <body>
      <Header />
      <main>{children}</main>
    </body>
  );
}

export default Layout;
