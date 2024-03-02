import { Card } from '@/components';

import mockData from './mockData';

function Content() {
  return (
    <div className="container flex flex-col gap-12 px-4 py-12">
      {mockData.map(item => (
        <Card
          key={item.id}
          title={item.title}
          image={item.image}
          items={item.items}
        />
      ))}
    </div>
  );
}

export default Content;
