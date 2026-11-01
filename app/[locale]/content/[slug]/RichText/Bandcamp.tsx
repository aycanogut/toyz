import parseBandcampEmbed from '@/utils/parseBandcampEmbed';

const DEFAULT_HEIGHT = 120;

interface BandcampProps {
  embedCode: string;
  title?: string;
}

function Bandcamp({ embedCode, title }: BandcampProps) {
  const embed = parseBandcampEmbed(embedCode);

  if (!embed) return null;

  return (
    <iframe
      key={embed.src}
      src={embed.src}
      title={title || 'Bandcamp player'}
      loading="lazy"
      className="mx-auto block w-full border-0"
      style={{ maxWidth: embed.width, height: embed.height ?? DEFAULT_HEIGHT }}
    />
  );
}

export default Bandcamp;
