import { AiOutlineTag, AiOutlineLoading3Quarters } from 'react-icons/ai';
import { RiArrowRightLine, RiUserLine, RiMenuLine, RiCalendarLine, RiCloseFill } from 'react-icons/ri';

const icons = [
  {
    label: 'hamburger',
    icon: RiMenuLine,
  },
  {
    label: 'close',
    icon: RiCloseFill,
  },
  {
    label: 'arrow-right',
    icon: RiArrowRightLine,
  },
  {
    label: 'calendar',
    icon: RiCalendarLine,
  },
  {
    label: 'tag',
    icon: AiOutlineTag,
  },
  {
    label: 'user',
    icon: RiUserLine,
  },
  {
    label: 'loading',
    icon: AiOutlineLoading3Quarters,
  },
] as const;

export default icons;
