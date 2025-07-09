import { IconBaseProps } from 'react-icons';

import icons from '@/theme/icons';

export interface IconProps extends IconBaseProps {
  name: IconLabelProps;
}

function Icon({ name, className, ...props }: IconProps) {
  const selectedIcon = icons.find(icon => icon.label === name);

  if (!selectedIcon) return null;

  const IconElement = selectedIcon.icon;

  return (
    <IconElement
      name={name}
      className={className}
      {...props}
    />
  );
}

export default Icon;
