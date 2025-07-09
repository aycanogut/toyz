'use client';

import { useTranslations } from 'next-intl';
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TelegramShareButton,
  TelegramIcon,
  TwitterShareButton,
  TwitterIcon,
} from 'react-share';

import Button from '@/components/Button';
import Popover from '@/components/Popover';
import toyzConfig from 'toyzConfig';

const { baseUrl } = toyzConfig;

interface SocialMediaShare {
  title: string;
  slug: string;
  locale: string;
}

function SocialMediaShare({ title, slug, locale }: SocialMediaShare) {
  const shareUrl = `${baseUrl}/${locale}/content/${slug}`;

  const t = useTranslations('Content');

  return (
    <Popover
      hasCloseIcon
      hasArrow
      contentProps={{
        className: 'flex p-10',
      }}
      trigger={
        <Button
          appendIcon="share"
          iconSize={24}
          className="h-fit cursor-pointer"
        >
          {t('share')}
        </Button>
      }
    >
      <div className="space-x-3">
        <TwitterShareButton
          title={title}
          url={shareUrl}
        >
          <TwitterIcon size={44} />
        </TwitterShareButton>
        <FacebookShareButton
          title={title}
          url={shareUrl}
        >
          <FacebookIcon size={44} />
        </FacebookShareButton>
        <WhatsappShareButton
          title={title}
          url={shareUrl}
        >
          <WhatsappIcon size={44} />
        </WhatsappShareButton>
        <TelegramShareButton
          title={title}
          url={shareUrl}
        >
          <TelegramIcon size={44} />
        </TelegramShareButton>
      </div>
    </Popover>
  );
}

export default SocialMediaShare;
