import { getCollection, type CollectionEntry } from 'astro:content';

export type SeriesEntry = CollectionEntry<'series'>;
export type InstallmentEntry = CollectionEntry<'installments'>;

/** URL slug derived from filename (e.g. `02-the-second-note.md` → `the-second-note`). */
export function getInstallmentSlug(entry: InstallmentEntry): string {
  const filename = entry.id.split('/').pop() ?? entry.id;
  return filename.replace(/\.md$/, '').replace(/^\d+-/, '');
}

export async function getAllSeries(): Promise<SeriesEntry[]> {
  const all = await getCollection('series');
  return all.sort((a, b) => a.data.order - b.data.order);
}

export async function getSeriesBySlug(slug: string): Promise<SeriesEntry | undefined> {
  const all = await getAllSeries();
  return all.find((entry) => entry.data.slug === slug);
}

export async function getPublishedInstallments(
  seriesSlug?: string,
): Promise<InstallmentEntry[]> {
  const all = await getCollection('installments', ({ data }) => !data.draft);

  const filtered = seriesSlug
    ? all.filter((entry) => entry.data.series === seriesSlug)
    : all;

  return filtered.sort((a, b) => a.data.installment - b.data.installment);
}

export async function getInstallment(
  seriesSlug: string,
  installmentSlug: string,
): Promise<InstallmentEntry | undefined> {
  const installments = await getPublishedInstallments(seriesSlug);
  return installments.find((entry) => getInstallmentSlug(entry) === installmentSlug);
}

const STATUS_LABELS: Record<SeriesEntry['data']['status'], string> = {
  ongoing: 'Ongoing',
  complete: 'Complete',
  'coming-soon': 'Coming Soon',
};

export function formatSeriesStatus(status: SeriesEntry['data']['status']): string {
  return STATUS_LABELS[status];
}

/** Format a calendar date from frontmatter (parsed as UTC midnight). */
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

/** ISO date for `<time datetime>` from frontmatter (parsed as UTC midnight). */
export function formatDateTimeAttr(date: Date): string {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
