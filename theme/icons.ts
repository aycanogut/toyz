import { AiOutlineTag, AiOutlineLoading3Quarters, AiOutlineInstagram } from 'react-icons/ai';
import { PiEnvelopeSimple } from 'react-icons/pi';
import {
  RiShareBoxLine,
  RiSearchLine,
  RiArrowRightLine,
  RiArrowLeftLine,
  RiUserLine,
  RiMenuLine,
  RiCalendarLine,
  RiCloseFill,
  RiArrowDownLine,
} from 'react-icons/ri';

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
    label: 'arrow-left',
    icon: RiArrowLeftLine,
  },
  {
    label: 'arrow-down',
    icon: RiArrowDownLine,
  },
  {
    label: 'date',
    icon: RiCalendarLine,
  },
  {
    label: 'category',
    icon: AiOutlineTag,
  },
  {
    label: 'author',
    icon: RiUserLine,
  },
  {
    label: 'loading',
    icon: AiOutlineLoading3Quarters,
  },
  {
    label: 'search',
    icon: RiSearchLine,
  },
  {
    label: 'share',
    icon: RiShareBoxLine,
  },
  {
    label: 'instagram',
    icon: AiOutlineInstagram,
  },
  {
    label: 'envelope',
    icon: PiEnvelopeSimple,
  },
] as const;

export default icons;
