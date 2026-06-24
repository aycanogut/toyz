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
      sizes="(min-width: 768px) 800px, 100vw"
      className="mx-auto h-auto w-full max-w-200"
    />
  );
}

export default Image;
