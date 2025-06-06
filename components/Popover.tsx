'use client';

import { ReactNode } from 'react';

import * as RadixPopover from '@radix-ui/react-popover';

import cn from '@/utils/cn';

import Icon from './Icon';

const { Root, Trigger, Portal, Content, Close, Arrow } = RadixPopover;

interface PopoverProps {
  trigger: ReactNode;
  children: ReactNode;
  rootProps?: RadixPopover.PopoverProps;
  triggerProps?: RadixPopover.PopoverTriggerProps;
  portalProps?: RadixPopover.PopoverPortalProps;
  contentProps?: RadixPopover.PopoverContentProps;
  hasCloseIcon: boolean;
  hasArrow?: boolean;
}

function Popover({ trigger, children, rootProps, triggerProps, portalProps, contentProps, hasCloseIcon, hasArrow = false }: PopoverProps) {
  const { className: contentClassName, ...restContentProps } = contentProps || {};

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
          className={cn(
            'bg-background-light data-[state=open]:data-[side=bottom]:animate-slide-up-and-fade data-[state=open]:data-[side=left]:animate-slide-right-and-fade data-[state=open]:data-[side=right]:animate-slide-left-and-fade data-[state=open]:data-[side=top]:animate-slide-down-and-fade -ml-2 p-0 xl:-ml-0',
            contentClassName
          )}
          {...restContentProps}
        >
          {children}
          {hasCloseIcon && (
            <Close
              className="absolute top-1 right-1 inline-flex items-center justify-center text-white"
              aria-label="Close"
            >
              <Icon
                name="close"
                size={28}
              />
            </Close>
          )}
          {hasArrow && <Arrow className="fill-background-light" />}
        </Content>
      </Portal>
    </Root>
  );
}

export default Popover;
