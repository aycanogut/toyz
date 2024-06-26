'use client';

import * as Popover from '@radix-ui/react-popover';
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

import toyzConfig from 'toyzConfig';

import Button from './Button';
import Icon from './Icon';

const { baseUrl } = toyzConfig;

interface Props {
  title: string;
  slug: string;
  locale: string;
}

function SocialMediaShare({ title, slug, locale }: Props) {
  const shareUrl = `${baseUrl}/${locale}/content/${slug}`;

  const t = useTranslations('Content');

  // TODO: separate Popover to a new component, refactor classNames etc. and use it in also LanguageSwitcher
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Button
          appendIcon="share"
          iconSize={24}
          className="h-fit"
        >
          {t('share')}
        </Button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className="w-full bg-background-light p-10 shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] will-change-[transform,opacity] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.violet7)] data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=top]:animate-slideDownAndFade"
          sideOffset={16}
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
          <Popover.Close
            className="absolute right-1 top-1 inline-flex items-center justify-center text-white"
            aria-label="Close"
          >
            <Icon
              name="close"
              size={28}
            />
          </Popover.Close>
          <Popover.Arrow className="fill-white" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

export default SocialMediaShare;
