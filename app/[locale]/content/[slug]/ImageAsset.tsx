'use client';

import { EasyZoomOnHover } from 'easy-magnify';
interface Props {
  title: string;
  description?: string;
  url: string;
}

function ImageAsset({ title, description, url }: Props) {
  return (
    <figure className="flex flex-col items-center text-center prose-figcaption:mt-2 prose-figcaption:text-base prose-figcaption:text-title-light">
      <EasyZoomOnHover
        delayTimer={2000}
        mainImage={{
          src: `https:${url}`,
          alt: title,
          width: 480,
          height: 640,
        }}
        zoomImage={{
          src: `https:${url}`,
          alt: title,
        }}
      />
      {description && <figcaption>{description}</figcaption>}
    </figure>
  );
}

export default ImageAsset;
