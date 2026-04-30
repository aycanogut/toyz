import React, { HTMLAttributes } from 'react';

import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';
import { JSXConvertersFunction, RichText as RichTextWithoutBlocks } from '@payloadcms/richtext-lexical/react';

import { Media } from '@/payload-types';
import cn from '@/utils/cn';
import { slugifyHeading } from '@/utils/extractHeadings';

import Image from './Image';
import Video from './Video';

const jsxConverters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,

  heading: ({ node, nodesToJSX, converters }) => {
    const tag = (node.tag as string) ?? 'h2';
    const children = nodesToJSX({ nodes: node.children ?? [], converters });
    const rawText = tag === 'h2' ? (node.children ?? []).reduce((acc: string, c: unknown) => acc + ((c as { text?: string }).text ?? ''), '') : '';
    const id = tag === 'h2' ? slugifyHeading(rawText) || undefined : undefined;
    const Tag = tag as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

    return (
      <Tag
        id={id}
        className={cn({ 'scroll-mt-4': !!id })}
      >
        {children}
      </Tag>
    );
  },

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
            <figcaption className="font-fira text-title-light mt-2 max-w-3xl text-center leading-5 lg:text-lg">{title}</figcaption>
          </figure>
        );
      }

      return (
        <Video
          videoId={videoId}
          title={title}
        />
      );
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
          <figcaption className="font-fira text-title-light mt-2 max-w-3xl text-center leading-5 lg:text-lg">{credits}</figcaption>
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
