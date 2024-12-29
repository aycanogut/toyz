import Image from 'next/image';

interface Props {
  title: string;
  description?: string;
  url: string;
}

function ImageAsset({ title, description, url }: Props) {
  return (
    <figure className="mx-auto flex flex-col text-center prose-figcaption:mt-2 prose-figcaption:text-base prose-figcaption:text-title-light">
      <Image
        src={`https:${url}`}
        alt={title}
        width={480}
        height={640}
        className="mx-auto object-contain"
      />
      {description && <figcaption>{description}</figcaption>}
    </figure>
  );
}

export default ImageAsset;
