import { z } from 'zod'

const textListSchema = z.array(z.string().trim().min(1))

export const productFormSchema = z
  .object({
    id: z.string().uuid().optional(),
    name: z.string().trim().min(3, 'Nazwa musi miec minimum 3 znaki.').max(140, 'Nazwa jest za dluga.'),
    slug: z
      .string()
      .trim()
      .min(3, 'Slug musi miec minimum 3 znaki.')
      .max(160, 'Slug jest za dlugi.')
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug moze zawierac male litery, cyfry i myslniki.'),
    shortDescription: z
      .string()
      .trim()
      .min(12, 'Krotki opis musi miec minimum 12 znakow.')
      .max(240, 'Krotki opis powinien miec maksymalnie 240 znakow.'),
    description: z.string().trim().min(40, 'Pelny opis musi miec minimum 40 znakow.'),
    price: z.number('Cena jest wymagana.').min(0, 'Cena nie moze byc ujemna.'),
    compareAtPrice: z.number().min(0, 'Cena porownawcza nie moze byc ujemna.').optional(),
    currency: z.string().trim().length(3, 'Waluta powinna byc kodem ISO, np. PLN.'),
    categoryId: z.string().uuid('Wybierz kategorie.'),
    collectionId: z.string().uuid('Wybierz poprawna kolekcje.').optional(),
    materials: z.array(z.string().uuid()).min(1, 'Wybierz przynajmniej jeden material.'),
    sizes: textListSchema,
    colors: textListSchema,
    patterns: textListSchema,
    productionType: z.enum(['in_stock', 'made_to_order']),
    leadTimeDays: z.number().int('Lead time musi byc liczba calkowita.').min(0, 'Lead time nie moze byc ujemny.').optional(),
    status: z.enum(['draft', 'published', 'archived', 'hidden']),
    isNew: z.boolean(),
    isBestSeller: z.boolean(),
    isFeatured: z.boolean(),
    sortOrder: z.number().int().min(0),
    tags: textListSchema,
  })
  .superRefine((value, context) => {
    if (value.productionType === 'made_to_order' && (!value.leadTimeDays || value.leadTimeDays < 1)) {
      context.addIssue({
        code: 'custom',
        path: ['leadTimeDays'],
        message: 'Dla made to order podaj lead time wiekszy od 0.',
      })
    }

    if (value.compareAtPrice && value.compareAtPrice < value.price) {
      context.addIssue({
        code: 'custom',
        path: ['compareAtPrice'],
        message: 'Cena przed promocja nie moze byc nizsza niz cena produktu.',
      })
    }
  })

export type ProductFormValues = z.infer<typeof productFormSchema>

export const splitListValue = (value: string) =>
  value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)

export const joinListValue = (value: string[]) => value.join(', ')
