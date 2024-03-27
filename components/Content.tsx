import { Card } from '@/components';
import { getEntriesByType } from '@/contentful/client';

async function getData(): Promise<ContentProps[]> {
  const response = await getEntriesByType('content');

  return response as unknown as ContentProps[];
}

async function Content() {
  const data = await getData();

  return (
    <div className="container flex flex-col gap-12 px-4 py-12">
      {data.map(item => (
        <Card
          key={item.fields.id}
          title={item.fields.title}
          image={`https:${item.fields.image.fields.file.url}`}
          items={item.fields.details}
          slug={item.fields.slug}
        />
      ))}
    </div>
  );
}

export default Content;
