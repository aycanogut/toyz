'use client';

import { ReactNode } from 'react';

import * as RadixPopover from '@radix-ui/react-popover';

import { cn } from '@/utils';

import Icon from './Icon';

const { Root, Trigger, Portal, Content, Close, Arrow } = RadixPopover;

interface Props {
  trigger: ReactNode;
  children: ReactNode;
  rootProps?: RadixPopover.PopoverProps;
  triggerProps?: RadixPopover.PopoverTriggerProps;
  portalProps?: RadixPopover.PopoverPortalProps;
  contentProps?: RadixPopover.PopoverContentProps;
  hasCloseIcon: boolean;
}

function Popover({ trigger, children, rootProps, triggerProps, portalProps, contentProps, hasCloseIcon }: Props) {
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
          {...contentProps}
          className={cn(
            contentProps?.className,
            '-ml-2 w-[var(--radix-popover-trigger-width)] bg-background-light p-0 data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=top]:animate-slideDownAndFade xl:-ml-0'
          )}
        >
          {children}
          {hasCloseIcon && (
            <Close
              className="absolute right-1 top-1 inline-flex items-center justify-center text-white"
              aria-label="Close"
            >
              <Icon
                name="close"
                size={28}
              />
            </Close>
          )}
          <Arrow className="fill-background-light" />
        </Content>
      </Portal>
    </Root>
  );
}

export default Popover;