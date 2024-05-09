'use client';

import { useMediaQuery } from 'usehooks-ts';

interface Props {
  description?: string;
  url: string;
}

function EmbedVideo({ description, url }: Props) {
  const mobileScreen = useMediaQuery('(max-width: 768px)');

  return (
    <>
      <iframe
        src={url}
        title="Iframe video player"
        className="mx-auto"
        width={mobileScreen ? '100%' : 600}
        height={mobileScreen ? 250 : 400}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
      {description && <div className="mt-2 flex justify-center text-sm">{description}</div>}
    </>
  );
}

export default EmbedVideo;
