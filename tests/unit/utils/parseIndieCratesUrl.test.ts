import { describe, expect, it } from 'vitest';

import parseIndieCratesUrl from '@/utils/parseIndieCratesUrl';

const EMBED_SRC = 'https://indiecrates.com/crates/getmusic/hip-hop/embed';

describe('parseIndieCratesUrl', () => {
  it('builds the embed URL from a crate link', () => {
    expect(parseIndieCratesUrl('https://indiecrates.com/crates/getmusic/hip-hop')).toBe(EMBED_SRC);
    expect(parseIndieCratesUrl('https://www.indiecrates.com/crates/getmusic/hip-hop?autoplay=1')).toBe(EMBED_SRC);
  });

  it('accepts the embed URL and the iframe code', () => {
    expect(parseIndieCratesUrl(EMBED_SRC)).toBe(EMBED_SRC);
    expect(parseIndieCratesUrl(`<iframe src="${EMBED_SRC}" width="100%" height="152"></iframe>`)).toBe(EMBED_SRC);
  });

  it('rejects other hosts and paths', () => {
    expect(parseIndieCratesUrl('https://evil.com/crates/a/b')).toBeNull();
    expect(parseIndieCratesUrl('https://indiecrates.com/crates')).toBeNull();
    expect(parseIndieCratesUrl('not a url')).toBeNull();
    expect(parseIndieCratesUrl(null)).toBeNull();
  });
});
