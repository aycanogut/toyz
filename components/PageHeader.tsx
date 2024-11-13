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
      <span className="block h-20 bg-background-light md:h-24 lg:hidden" />

      <div className="relative h-[7.5rem] lg:h-[11.375rem]">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="object-cover"
        />

        <header className="container relative hidden h-full lg:block">
          <h1 className="absolute left-4 top-1/4 font-grotesque text-[4rem] font-medium uppercase leading-[5.375rem] text-title-light [text-shadow:_0_0_7px_rgb(0_0_0_/_100%)]">
            {title}
          </h1>
        </header>
      </div>
    </>
  );
}

export default PageHeader;
