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
      <span className="bg-background block h-20 md:h-24 lg:hidden" />

      <div className="relative h-30 lg:h-45.5">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="object-cover"
        />

        <div className="from-background-light/50 via-background-light/20 to-background-light/50 absolute inset-0 bg-linear-to-b" />

        <header className="relative container hidden h-full lg:block">
          <h1 className="font-grotesque text-title-light absolute top-1/4 left-4 text-[4rem] leading-21.5 font-medium uppercase [text-shadow:0_0_7px_rgb(0_0_0/100%)]">
            {title}
          </h1>
        </header>
      </div>
    </>
  );
}

export default PageHeader;
