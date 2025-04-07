import Image from 'next/image';

interface PageHeaderProps {
  image: {
    src: string;
    alt: string;
  };
  title: string;
}

function PageHeader({ image, title }: PageHeaderProps) {
  return (
    <>
      <span className="bg-background-light block h-20 md:h-24 lg:hidden" />

      <div className="relative h-[7.5rem] lg:h-[11.375rem]">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="object-cover"
        />

        <header className="relative container hidden h-full lg:block">
          <h1 className="font-grotesque text-title-light absolute top-1/4 left-4 text-[4rem] leading-[5.375rem] font-medium uppercase [text-shadow:_0_0_7px_rgb(0_0_0_/_100%)]">
            {title}
          </h1>
        </header>
      </div>
    </>
  );
}

export default PageHeader;
