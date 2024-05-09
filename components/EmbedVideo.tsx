interface Props {
  description?: string;
  url: string;
}

function EmbedVideo({ description, url }: Props) {
  return (
    <>
      <iframe
        src={url}
        title="Iframe video player"
        className="mx-auto"
        width={600}
        height={400}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
      {description && <div className="mt-2 flex justify-center text-sm">{description}</div>}
    </>
  );
}

export default EmbedVideo;
