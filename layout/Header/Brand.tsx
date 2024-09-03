import Image from 'next/image';

interface Props {
  src: string;
  alt: string;
  width: number;
  height: number;
}

function Brand({ src, alt, width, height }: Props) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
    />
  );
}

export default Brand;
