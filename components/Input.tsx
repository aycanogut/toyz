'use client';

import { InputHTMLAttributes, Ref, forwardRef } from 'react';

import { cn } from '@/utils';

import Icon, { IconProps } from './Icon';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  prependIconProps?: IconProps;
  appendIconProps?: IconProps;
}

type InputRef = Ref<HTMLInputElement>;

function Input(
  {
    className,
    type,
    placeholder,
    autoComplete = 'off',
    error,
    onKeyDown,
    prependIconProps,
    appendIconProps,
    'aria-label': ariaLabel,
    'aria-autocomplete': ariaAutocomplete = 'list',
    ...props
  }: Props,
  ref: InputRef
) {
  return (
    <div className="flex w-full flex-col gap-1">
      {ariaLabel && <label className="font-grotesque text-title-light mb-3 text-xl font-medium first-letter:capitalize lg:text-3xl">{ariaLabel}</label>}
      <div className="relative">
        {prependIconProps && <Icon {...prependIconProps} />}

        <input
          className={cn(
            'focus-visible:ring-primary-blue-100 bg-background-light text-title-light focus-visible:ring-title-light w-full border p-4 text-sm placeholder:text-sm placeholder:font-normal focus-visible:ring-2 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:bg-gray-100 disabled:opacity-40',
            prependIconProps && 'pl-11',
            className
          )}
          ref={ref}
          aria-label={ariaLabel}
          aria-autocomplete={ariaAutocomplete}
          autoComplete={autoComplete}
          placeholder={placeholder}
          type={type}
          onKeyDown={e => {
            if (onKeyDown) {
              onKeyDown(e);
            }

            if (e.currentTarget.value.length < 1 && e.code === 'Space') {
              e.preventDefault();
            }

            if (type === 'number') {
              const regex = new RegExp(/(^\d*$)|(Backspace|Tab|Delete|ArrowLeft|ArrowRight|ArrowUp|ArrowDown)/);
              return !e.key.match(regex) && e.preventDefault();
            }
          }}
          {...props}
        />

        {appendIconProps && <Icon {...appendIconProps} />}
      </div>

      {error && <span className="font-inter text-md text-red-500">{error}</span>}
    </div>
  );
}

export default forwardRef(Input);
