
import { GiHamburgerMenu } from 'react-icons/gi';

import {
  
  RiCloseFill,
} from 'react-icons/ri';

const icons = [
  {
    label: 'hamburger',
    icon: GiHamburgerMenu,
  },
  {
    label: 'close',
    icon: RiCloseFill,
  },
] as const;

export default icons;
