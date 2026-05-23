import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const series = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/series' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    status: z.enum(['ongoing', 'complete', 'coming-soon']),
    order: z.number(),
  }),
});

const installments = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/installments' }),
  schema: z.object({
    title: z.string(),
    series: z.string(),
    installment: z.number(),
    publishedAt: z.coerce.date(),
    slug: z.string(),
    dateline: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { series, installments };
