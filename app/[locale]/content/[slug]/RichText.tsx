import React, { HTMLAttributes } from 'react';

import Image from 'next/image';

import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';
import { JSXConvertersFunction, RichText as RichTextWithoutBlocks } from '@payloadcms/richtext-lexical/react';

import { Media } from '@/payload-types';

const jsxConverters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,

  blocks: {
    youtube: ({ node }: { node: { fields: { videoId: string; title: string } } }) => {
      const { videoId, title } = node.fields;

      if (title) {
        return (
          <figure className="mx-auto aspect-video max-w-200">
            <iframe
              key={videoId}
              src={`https://www.youtube.com/embed/${videoId}`}
              title={title ?? 'YouTube Video'}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="size-full"
            />
            <figcaption className="font-grotesque text-title-light mt-20 max-w-3xl text-center text-base leading-5 lg:text-lg">{title}</figcaption>
          </figure>
        );
      }

      <iframe
        key={videoId}
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title ?? 'YouTube Video'}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="size-full"
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
