import { Icon } from '@/components';

interface Props {
  items: ArticleDetailsProps[];
}

function ArticleDetails({ items }: Props) {
  return (
    <div className="border-border-light flex w-full flex-wrap gap-x-7 gap-y-2 border px-6 py-2">
      {items.map(item => (
        <div
          className="flex items-center gap-2"
          key={item.icon}
        >
          <Icon
            name={item.icon}
            size={20}
            className="mt-1 text-title-light"
          />
          <span className="font-grotesque text-xl font-medium text-title-light">{item.label}</span>
        </div>
      ))}
    </div>
  );
}

export default ArticleDetails;
