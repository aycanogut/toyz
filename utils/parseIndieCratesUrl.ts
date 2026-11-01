/**
 * Converts an Indie Crates crate link (or its embed URL / iframe code) into the crate's embed player URL.
 *
 * @param {string | null | undefined} input - A crate link like `https://indiecrates.com/crates/{user}/{slug}`, its `/embed` URL, or the `<iframe>` embed code.
 * @returns {string | null} `https://indiecrates.com/crates/{user}/{slug}/embed`, or `null` when the input is not an HTTPS Indie Crates crate.
 */
function parseIndieCratesUrl(input: string | null | undefined): string | null {
  if (!input) return null;

  const trimmed = input.trim();
  const rawUrl = trimmed.startsWith('<') ? trimmed.match(/src="([^"]+)"/i)?.[1] : trimmed;

  if (!rawUrl) return null;

  let url: URL;

  try {
    url = new URL(rawUrl);
  } catch {
    return null;
  }

  if (url.protocol !== 'https:' || !['indiecrates.com', 'www.indiecrates.com'].includes(url.hostname)) return null;

  const match = url.pathname.match(/^\/crates\/([\w.-]+)\/([\w.-]+)(?:\/embed)?\/?$/);

  if (!match) return null;

  return `https://indiecrates.com/crates/${match[1]}/${match[2]}/embed`;
}

export default parseIndieCratesUrl;
