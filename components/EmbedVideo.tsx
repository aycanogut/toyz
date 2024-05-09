interface Props {
  description?: string;
  url: string;
}

function EmbedVideo({ description, url }: Props) {
  return (
    <div className="flex flex-col justify-center">
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
      {description && <span className="mx-auto mt-2 text-sm">{description}</span>}
    </div>
  );
}

export default EmbedVideo;
