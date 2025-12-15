import React, { HTMLAttributes } from 'react';

import Image from 'next/image';

import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';
import { JSXConvertersFunction, RichText as RichTextWithoutBlocks } from '@payloadcms/richtext-lexical/react';

import { Media } from '@/payload-types';

import Video from './Video';

const jsxConverters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,

  blocks: {
    youtube: ({ node }: { node: { fields: { videoId: string; title: string } } }) => {
      const { videoId, title } = node.fields;

      if (title) {
        return (
          <figure className="mx-auto aspect-video max-w-200">
            <Video
              videoId={videoId}
              title={title}
            />
            <figcaption className="font-grotesque text-title-light mt-2 max-w-3xl text-center text-base leading-5 lg:text-lg">{title}</figcaption>
          </figure>
        );
      }

      <Video
        videoId={videoId}
        title={title}
      />;
    },
  },

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
          />
          <figcaption className="font-grotesque text-title-light mt-2 max-w-3xl text-center text-base leading-5 lg:text-lg">{credits}</figcaption>
        </figure>
      );
    }

    return (
      <Image
        src={url}
        alt={alt ?? ''}
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
