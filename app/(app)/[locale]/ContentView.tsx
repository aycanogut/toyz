import { Card } from '@/components';
import { Article, Media } from '@/payload-types';

interface ContentViewProps {
  articles: Article[];
}

function ContentView({ articles }: ContentViewProps) {
  return (
    <section className="bg-background relative z-20 px-4 py-12 md:py-16 lg:py-20 xl:py-24">
      <div className="container flex flex-col gap-14">
        {articles.length > 0 &&
          articles.map(item => {
            const media = item.images[0] as Media;

            return (
              <Card
                key={item.id}
                title={item.title}
                image={media.url ?? ''}
                details={item.details}
                slug={item.slug ?? ''}
              />
            );
          })}
      </div>
    </section>
  );
}

export default ContentView;
