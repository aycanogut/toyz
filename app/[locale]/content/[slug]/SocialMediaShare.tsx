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

import { Button, Popover } from '@/components';
import toyzConfig from 'toyzConfig';

const { baseUrl } = toyzConfig;

interface Props {
  title: string;
  slug: string;
  locale: string;
}

function SocialMediaShare({ title, slug, locale }: Props) {
  const shareUrl = `${baseUrl}/${locale}/content/${slug}`;

  const t = useTranslations('Content');

  return (
    <Popover
      hasCloseIcon
      contentProps={{
        className: 'p-10',
      }}
      trigger={
        <Button
          appendIcon="share"
          iconSize={24}
          className="h-fit"
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
