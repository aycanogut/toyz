export interface BandcampEmbed {
  src: string;
  width?: number;
  height?: number;
}

/**
 * Reads a pixel dimension from embed code, checking the inline `style` first and the HTML attribute second.
 *
 * @param {string} source - The raw embed code.
 * @param {'width' | 'height'} property - The dimension to read.
 * @returns {number | undefined} The value in px, or `undefined` when absent or not expressed in px (e.g. `100%`).
 */
function readPixels(source: string, property: 'width' | 'height'): number | undefined {
  const match = source.match(new RegExp(`${property}\\s*:\\s*(\\d+)px`, 'i')) ?? source.match(new RegExp(`${property}="(\\d+)"`, 'i'));

  return match ? Number(match[1]) : undefined;
}

/**
 * Parses a Bandcamp embed code (or its bare player URL) into a safe iframe `src` plus optional dimensions.
 * Bandcamp's player only accepts numeric album/track IDs, which are not part of the public page URL,
 * so editors paste the code from Bandcamp's Share/Embed dialog instead of a page link.
 *
 * @param {string | null | undefined} input - The `<iframe>` embed code or a `https://bandcamp.com/EmbeddedPlayer/...` URL.
 * @returns {BandcampEmbed | null} The player `src` (query string dropped) with `width`/`height` in px when the code declares them,
 * or `null` when the input is not an HTTPS Bandcamp album/track player.
 */
function parseBandcampEmbed(input: string | null | undefined): BandcampEmbed | null {
  if (!input) return null;

  const trimmed = input.trim();
  const rawSrc = trimmed.startsWith('<') ? trimmed.match(/src="([^"]+)"/i)?.[1] : trimmed;

  if (!rawSrc) return null;

  let url: URL;

  try {
    url = new URL(rawSrc);
  } catch {
    return null;
  }

  const isPlayer = url.protocol === 'https:' && url.hostname === 'bandcamp.com' && url.pathname.startsWith('/EmbeddedPlayer/');

  if (!isPlayer || !/\/(album|track)=\d+/.test(url.pathname)) return null;

  return {
    src: `${url.origin}${url.pathname}`,
    width: readPixels(trimmed, 'width'),
    height: readPixels(trimmed, 'height'),
  };
}

export default parseBandcampEmbed;
