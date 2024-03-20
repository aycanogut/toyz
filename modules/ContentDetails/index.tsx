import Image from 'next/image';

import { ContentLabels } from '@/components';

function ContentDetailsModule() {
  return (
    <section className="lg:pb-24 lg:pt-2">
      <div className="h-24 bg-background-light lg:hidden" />
      <article className="">
        <div className="container relative h-56 w-full md:hidden">
          <Image
            src="/assets/card/card.svg"
            alt="Obijuan GUANAHANI, now available on all streaming platforms"
            fill
            className="object-cover"
          />
        </div>

        <header className="container space-y-6 px-4 pt-8 md:pb-8 lg:space-y-10 xl:px-0">
          <h1 className=" text-start font-grotesque text-2xl font-medium text-title-light md:text-3xl lg:text-5xl lg:font-semibold">
            Obijuan GUANAHANI, now available on all streaming platforms
          </h1>

          <ContentLabels
            items={[
              {
                icon: 'calendar',
                label: '12.12.2023',
              },
              {
                icon: 'tag',
                label: '#music #electronic',
              },
              {
                icon: 'user',
                label: 'Aycan Öğüt',
              },
            ]}
          />
        </header>

        <div className="container space-y-6 px-4 md:space-y-10 xl:px-0">
          <div className="relative hidden h-80 w-full md:block lg:h-[22.3125rem]">
            <Image
              src="/assets/card/card.svg"
              alt="Obijuan GUANAHANI, now available on all streaming platforms"
              fill
              className="object-cover opacity-70 blur-sm"
            />

            <div className="absolute inset-0 m-auto h-[19.3125rem] w-[31.625rem]">
              <Image
                src="/assets/card/card.svg"
                alt="Obijuan GUANAHANI, now available on all streaming platforms"
                fill
                className="object-contain"
              />
            </div>
          </div>

          <div className="text-xl leading-8 text-title-light md:text-2xl lg:leading-9">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo
            inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
            fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit
            amet, consectetur, adipisci velit,Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
            aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas
            sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui
            dolorem ipsum quia dolor sit amet, consectetur, adipisci velit,
          </div>
        </div>
      </article>
    </section>
  );
}

export default ContentDetailsModule;
