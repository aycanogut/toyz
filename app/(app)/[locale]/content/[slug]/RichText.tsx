import React, { HTMLAttributes } from 'react';

import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';
import { JSXConvertersFunction, RichText as RichTextWithoutBlocks } from '@payloadcms/richtext-lexical/react';

const jsxConverters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,

  // TODO: Some example of how to use custom components
  // myTextBlock: ({ node }) => <div style={{ backgroundColor: 'red' }}>{node.fields.text}</div>,
  // upload: ({ node }) => {
  //   const { url, alt } = node.value as Media;

  //   return (
  //     <ImageAsset
  //       url={url ?? ''}
  //       alt={alt ?? ''}
  //     />
  //   );
  // },
});

interface Props extends HTMLAttributes<HTMLDivElement> {
  data: SerializedEditorState;
}

function RichText({ data, ...props }: Props) {
  return (
    <RichTextWithoutBlocks
      data={data}
      converters={jsxConverters}
      {...props}
    />
  );
}

export default RichText;
