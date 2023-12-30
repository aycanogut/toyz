import { LinkHTMLAttributes } from 'react';

import Image from 'next/image';
import Link from 'next/link';

interface Props extends LinkHTMLAttributes<HTMLAnchorElement> {
  src: string;
}

function BrandLogo({ src, className }: Props) {
  return (
    <Link
      href="/"
      className={className}
    >
      <Image
        src={src}
        alt="Brand Logo"
        fill
        className="contain"
      />
    </Link>
  );
}

export default BrandLogo;
