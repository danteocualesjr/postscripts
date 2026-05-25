import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const series = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/series' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    status: z.enum(['ongoing', 'complete', 'coming-soon']),
    author: z.string().optional(),
    order: z.number(),
  }),
});

const installments = defineCollection({
  // Only numbered story files (e.g. 01-the-first-note.md). Scratch files like
  // 00-drafts.md in the same folder are ignored by the site.
  loader: glob({
    pattern: ['**/[0-9][1-9]-*.md', '**/[1-9][0-9]-*.md'],
    base: './src/content/installments',
  }),
  schema: z.object({
    title: z.string(),
    series: z.string(),
    installment: z.number(),
    publishedAt: z.coerce.date(),
    dateline: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { series, installments };
