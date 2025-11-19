import React, { HTMLAttributes } from 'react';

import Image from 'next/image';

import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';
import { JSXConvertersFunction, RichText as RichTextWithoutBlocks } from '@payloadcms/richtext-lexical/react';

import { Media } from '@/payload-types';

const jsxConverters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,

  upload: ({ node }) => {
    const media = node.value as Media;

    if (!media || !media.url) return null;

    const { url, alt, credits } = media;

    if (credits) {
      return (
        <figure className="flex flex-col items-center justify-center">
          <Image
            src={url}
            alt={alt ?? ''}
            width={800}
            height={600}
            className="mx-auto"
          />
          <figcaption className="font-grotesque text-title-light mt-2 max-w-3xl text-center text-base leading-5 lg:text-lg">{credits}</figcaption>
        </figure>
      );
    }

    return (
      <Image
        src={url}
        alt={alt ?? ''}
        width={800}
        height={600}
        className="mx-auto"
      />
    );
  },
});

interface RichTextProps extends HTMLAttributes<HTMLDivElement> {
  data: SerializedEditorState;
}

function RichText({ data, ...props }: RichTextProps) {
  return (
    <RichTextWithoutBlocks
      data={data}
      converters={jsxConverters}
      {...props}
    />
  );
}

export default RichText;
