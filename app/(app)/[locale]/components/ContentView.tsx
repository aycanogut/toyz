import { Article, Category, Media } from '@/payload-types';

import ContentCard from './ContentCard';

interface ContentViewProps {
  articles: Article[];
}

function ContentView({ articles }: ContentViewProps) {
  return (
    <section className="bg-background relative z-20 px-4 py-12 md:py-16 lg:py-20 xl:py-24">
      <div className="container flex flex-col gap-14">
        {articles.length > 0 &&
          articles.map(item => {
            const media = item.images as Media;
            const category = item.details.category as Category;

            console.log(item);

            return (
              <ContentCard
                key={item.id}
                title={item.title}
                image={media.url ?? ''}
                details={{
                  date: item.details.date,
                  category: category.name,
                  categorySlug: category.slug,
                  author: item.details.author,
                }}
                slug={item.slug ?? ''}
              />
            );
          })}
      </div>
    </section>
  );
}

export default ContentView;
