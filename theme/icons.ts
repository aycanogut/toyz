import { AiOutlineTag, AiOutlineLoading3Quarters, AiOutlineInstagram } from 'react-icons/ai';
import { IoLocationSharp } from 'react-icons/io5';
import { PiEnvelopeSimple, PiCamera } from 'react-icons/pi';
import {
  RiShareBoxLine,
  RiSearchLine,
  RiArrowRightLine,
  RiArrowLeftLine,
  RiArrowDownLine,
  RiArrowUpLine,
  RiUserLine,
  RiMenuLine,
  RiCalendarLine,
  RiCloseFill,
  RiFacebookFill,
  RiWhatsappFill,
  RiTelegramFill,
  RiRedditFill,
  RiBlueskyFill,
  RiMastodonFill,
  RiLinkM,
  RiCheckLine,
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
    label: 'arrow-up',
    icon: RiArrowUpLine,
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
  {
    label: 'camera',
    icon: PiCamera,
  },
  {
    label: 'location',
    icon: IoLocationSharp,
  },
  {
    label: 'facebook',
    icon: RiFacebookFill,
  },
  {
    label: 'whatsapp',
    icon: RiWhatsappFill,
  },
  {
    label: 'telegram',
    icon: RiTelegramFill,
  },
  {
    label: 'reddit',
    icon: RiRedditFill,
  },
  {
    label: 'bluesky',
    icon: RiBlueskyFill,
  },
  {
    label: 'mastodon',
    icon: RiMastodonFill,
  },
  {
    label: 'link',
    icon: RiLinkM,
  },
  {
    label: 'check',
    icon: RiCheckLine,
  },
] as const;

export default icons;
