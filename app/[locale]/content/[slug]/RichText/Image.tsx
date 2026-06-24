import NextImage from 'next/image';

interface ImageProps {
  src: string;
  alt: string;
}

function Image({ src, alt }: ImageProps) {
  return (
    <NextImage
      src={src}
      alt={alt ?? ''}
      width={800}
      height={600}
      className="mx-auto"
    />
  );
}

export default Image;
