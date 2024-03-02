import { Icon } from '@/components';

interface Props {
  items: ContentLabelsProps[];
}

function ContentLabels({ items }: Props) {
  return (
    <div className="border-border-light flex w-full flex-wrap gap-x-7 gap-y-2 border px-6 py-2 md:w-fit lg:py-6">
      {items.map(item => (
        <div
          className="flex items-center gap-2"
          key={item.icon}
        >
          <Icon
            name={item.icon}
            size={18}
            className="mt-1 text-title-light"
          />
          <span className="font-grotesque text-lg font-medium text-title-light md:text-xl">{item.label}</span>
        </div>
      ))}
    </div>
  );
}

export default ContentLabels;
