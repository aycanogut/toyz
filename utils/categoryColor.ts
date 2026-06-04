const ACCENTS = [
  'bg-acid text-background',
  'bg-blood text-title-light',
  'bg-amber text-title-darker',
  'bg-title-light text-background',
  'bg-social-reddit text-title-light',
  'bg-social-mastodon text-title-light',
] as const;

function categoryColor(colorIndex: number): string {
  return ACCENTS[colorIndex % ACCENTS.length];
}

export default categoryColor;
