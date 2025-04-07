import { Icon } from '@/components';

interface Props {
  items: ContentLabelsProps[];
}

function ContentLabels({ items }: Props) {
  return (
    <div className="border-border-light flex w-full max-w-[28.625rem] flex-wrap gap-x-7 gap-y-2 border px-6 py-2 md:w-fit md:max-w-fit lg:py-6">
      {items.map(item => (
        <div
          className="flex items-center gap-2"
          key={item.icon}
        >
          <Icon
            name={item.icon}
            size={18}
            className="text-title-light mt-1"
          />
          <span className="font-grotesque text-title-light text-lg font-medium md:text-xl">{item.label}</span>
        </div>
      ))}
    </div>
  );
}

export default ContentLabels;
