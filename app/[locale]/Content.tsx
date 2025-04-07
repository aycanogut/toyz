import { Card } from '@/components';

interface ContentViewProps {
  content: ContentProps[];
}

function ContentView({ content }: ContentViewProps) {
  return (
    <section className="container flex flex-col gap-14 px-4 py-12 md:py-16 lg:py-20 xl:py-24">
      {content.length > 0 &&
        content.map(item => (
          <Card
            key={item.fields.id}
            title={item.fields.title}
            image={`https:${item.fields.image.fields.file.url}`}
            items={item.fields.details}
            slug={item.fields.slug}
          />
        ))}
    </section>
  );
}

export default ContentView;
