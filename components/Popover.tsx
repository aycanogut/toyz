'use client';

import { ReactNode } from 'react';

import * as RadixPopover from '@radix-ui/react-popover';

import Icon from './Icon';

const { Root, Trigger, Portal, Content, Close, Arrow } = RadixPopover;

interface Props {
  trigger: ReactNode;
  children: ReactNode;
  rootProps?: RadixPopover.PopoverProps;
  triggerProps?: RadixPopover.PopoverTriggerProps;
  portalProps?: RadixPopover.PopoverPortalProps;
  contentProps?: RadixPopover.PopoverContentProps;
}

function Popover({ trigger, children, rootProps, triggerProps, portalProps, contentProps }: Props) {
  return (
    <Root {...rootProps}>
      <Trigger
        asChild
        {...triggerProps}
      >
        {trigger}
      </Trigger>
      <Portal {...portalProps}>
        <Content
          sideOffset={8}
          collisionPadding={24}
          className="w-full bg-background-light p-10 shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] will-change-[transform,opacity] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.violet7)] data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=top]:animate-slideDownAndFade"
          {...contentProps}
        >
          {children}
          <Close
            className="absolute right-1 top-1 inline-flex items-center justify-center text-white"
            aria-label="Close"
          >
            <Icon
              name="close"
              size={28}
            />
          </Close>
          <Arrow className="fill-background-light" />
        </Content>
      </Portal>
    </Root>
  );
}

export default Popover;
