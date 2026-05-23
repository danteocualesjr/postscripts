export const site = {
  title: 'Postscripts',
  tagline: 'Serial fiction, in letters',
  author: 'Dante O. Cuales, Jr.',
  email: 'dante@nativestack.ai',
  /** Set PUBLIC_SITE_URL at build time for production share previews. */
  url: import.meta.env.PUBLIC_SITE_URL ?? '',
} as const;

export function siteOrigin(fallbackOrigin: string): string {
  return site.url || fallbackOrigin;
}
