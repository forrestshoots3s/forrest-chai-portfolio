import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    dek: z.string(),
    type: z.enum(['product', 'research']),
    year: z.string(),
    period: z.string().optional(),
    order: z.number(),
    featuredHome: z.boolean().default(false),
    featured: z.boolean().default(false),
    badge: z.string(),
    stack: z.array(z.string()),
    cardBullets: z.array(z.string()).optional(),
    role: z.string().optional(),
    result: z.string().optional(),
    paper: z.string().optional(),
    external: z
      .object({
        label: z.string(),
        href: z.string(),
      })
      .optional(),
  }),
});

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    dek: z.string().optional(),
    date: z.coerce.date(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects, posts };
