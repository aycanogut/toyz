import { describe, expect, it } from 'vitest';

import parseBandcampEmbed from '@/utils/parseBandcampEmbed';

const EMBED_CODE =
  '<iframe style="border: 0; width: 350px; height: 470px;" src="https://bandcamp.com/EmbeddedPlayer/album=1536701931/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/transparent=true/" seamless><a href="https://artist.bandcamp.com/album/x">X</a></iframe>';

describe('parseBandcampEmbed', () => {
  it('extracts src and dimensions from the embed code', () => {
    expect(parseBandcampEmbed(EMBED_CODE)).toEqual({
      src: 'https://bandcamp.com/EmbeddedPlayer/album=1536701931/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/transparent=true/',
      width: 350,
      height: 470,
    });
  });

  it('accepts a bare track player URL', () => {
    expect(parseBandcampEmbed('https://bandcamp.com/EmbeddedPlayer/track=42/size=small/')).toEqual({
      src: 'https://bandcamp.com/EmbeddedPlayer/track=42/size=small/',
      width: undefined,
      height: undefined,
    });
  });

  it('rejects page URLs, other hosts and empty input', () => {
    expect(parseBandcampEmbed('https://artist.bandcamp.com/album/x')).toBeNull();
    expect(parseBandcampEmbed('https://evil.com/EmbeddedPlayer/album=1/')).toBeNull();
    expect(parseBandcampEmbed('http://bandcamp.com/EmbeddedPlayer/album=1/')).toBeNull();
    expect(parseBandcampEmbed('')).toBeNull();
    expect(parseBandcampEmbed(undefined)).toBeNull();
  });
});
