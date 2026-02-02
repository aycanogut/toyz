import { PropsWithChildren } from 'react';

import Footer from './Footer';
import Header from './Header';

function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default Layout;
