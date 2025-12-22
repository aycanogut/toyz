interface VideoProps {
  videoId: string;
  title: string;
}

function Video({ videoId, title }: VideoProps) {
  return (
    <iframe
      key={videoId}
      src={`https://www.youtube.com/embed/${videoId}`}
      title={title ?? 'YouTube Video'}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      className="aspect-video size-full"
    />
  );
}

export default Video;
