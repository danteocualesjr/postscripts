import { getCollection, type CollectionEntry } from 'astro:content';

export type SeriesEntry = CollectionEntry<'series'>;
export type InstallmentEntry = CollectionEntry<'installments'>;

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
  return installments.find((entry) => entry.data.slug === installmentSlug);
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}
