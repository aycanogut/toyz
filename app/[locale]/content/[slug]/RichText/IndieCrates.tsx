import parseIndieCratesUrl from '@/utils/parseIndieCratesUrl';

interface IndieCratesProps {
  url: string;
  title?: string;
}

function IndieCrates({ url, title }: IndieCratesProps) {
  const src = parseIndieCratesUrl(url);

  if (!src) return null;

  return (
    <iframe
      key={src}
      src={src}
      title={title || 'Indie Crates player'}
      loading="lazy"
      allow="autoplay; encrypted-media"
      className="block h-38 w-full border-0"
    />
  );
}

export default IndieCrates;
