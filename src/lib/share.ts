export function buildTweetUrl(url: string, text: string): string {
  const params = new URLSearchParams({ url, text });
  return `https://twitter.com/intent/tweet?${params.toString()}`;
}

export function buildShareText(title: string, seriesTitle: string): string {
  return `${title} · ${seriesTitle}`;
}

export function resolveCanonicalUrl(pathname: string, site?: string | URL, origin?: string): string {
  const base = site ?? origin ?? 'http://localhost:4321';
  return new URL(pathname, base).href;
}
