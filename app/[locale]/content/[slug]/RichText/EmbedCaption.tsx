import { ReactNode } from 'react';

interface EmbedCaptionProps {
  title?: string;
  children: ReactNode;
}

function EmbedCaption({ title, children }: EmbedCaptionProps) {
  if (!title) return children;

  return (
    <figure className="mx-auto max-w-200">
      {children}
      <figcaption className="font-fira text-title-light mt-2 max-w-3xl text-center leading-5 lg:text-lg">{title}</figcaption>
    </figure>
  );
}

export default EmbedCaption;
