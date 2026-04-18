import { z } from 'zod'

export const productPublishStatusSchema = z.enum(['draft', 'published', 'archived', 'hidden'])
export const homepagePublishStatusSchema = z.enum(['draft', 'published', 'hidden'])
export const productProductionTypeSchema = z.enum(['in_stock', 'made_to_order'])
export const productImageTypeSchema = z.enum(['packshot', 'lifestyle', 'detail'])
export const homepageSectionKeySchema = z.enum([
  'announcement_bar',
  'hero',
  'new_collection',
  'materials',
  'bestsellers',
  'made_to_order',
  'story',
  'lookbook',
  'newsletter',
])

export const slugSchema = z
  .string()
  .trim()
  .min(2, 'Slug musi miec minimum 2 znaki.')
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug moze zawierac male litery, cyfry i myslniki.')

export const productBaseSchema = z.object({
  name: z.string().trim().min(3, 'Nazwa musi miec minimum 3 znaki.'),
  slug: slugSchema,
  shortDescription: z.string().trim().min(8).max(240),
  description: z.string().trim().min(20),
  price: z.number().min(0),
  compareAtPrice: z.number().min(0).optional(),
  currency: z.string().trim().length(3).default('PLN'),
  categoryId: z.string().uuid(),
  collectionId: z.string().uuid().optional(),
  productionType: productProductionTypeSchema,
  leadTimeDays: z.number().int().min(0).optional(),
  status: productPublishStatusSchema,
  isNew: z.boolean().default(false),
  isBestSeller: z.boolean().default(false),
  isFeatured: z.boolean().default(false),
  sortOrder: z.number().int().min(0).default(0),
  sizes: z.array(z.string().trim().min(1)).default([]),
  colors: z.array(z.string().trim().min(1)).default([]),
  patterns: z.array(z.string().trim().min(1)).default([]),
  materials: z.array(z.string().uuid()).default([]),
  tags: z.array(z.string().trim().min(1)).default([]),
})

export const homepageSectionSchema = z.object({
  id: z.string().uuid(),
  key: homepageSectionKeySchema,
  title: z.string().trim().min(1),
  subtitle: z.string().trim().optional().default(''),
  body: z.string().trim().optional().default(''),
  ctaLabel: z.string().trim().optional(),
  ctaHref: z.string().trim().optional(),
  imageUrl: z.string().url().optional(),
  imagePath: z.string().optional(),
  sortOrder: z.number().int().min(0),
  visibility: z.enum(['public', 'private']).default('public'),
  status: homepagePublishStatusSchema.default('draft'),
  linkedCollectionId: z.string().uuid().optional(),
  linkedProductIds: z.array(z.string().uuid()).default([]),
})

export type ProductBaseInput = z.infer<typeof productBaseSchema>
export type HomepageSectionInput = z.infer<typeof homepageSectionSchema>
