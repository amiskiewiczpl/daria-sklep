import {
  HomepageSection,
  HomepagePublishStatus,
  Product,
  ProductProductionType,
  ProductPublishStatus,
  SortOption,
} from './domain'

export const slugify = (value: string): string =>
  value
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

export const formatPrice = (amount: number, currency = 'PLN', locale = 'pl-PL'): string =>
  new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: Number.isInteger(amount) ? 0 : 2,
  }).format(amount)

export const productStatusLabels: Record<ProductPublishStatus, string> = {
  draft: 'Wersja robocza',
  published: 'Opublikowany',
  archived: 'Archiwum',
  hidden: 'Ukryty',
}

export const homepageStatusLabels: Record<HomepagePublishStatus, string> = {
  draft: 'Wersja robocza',
  published: 'Opublikowana',
  hidden: 'Ukryta',
}

export const productStatusDescriptions: Record<ProductPublishStatus, string> = {
  draft: 'Nie jest widoczny w storefront. Mozna go bezpiecznie edytowac.',
  published: 'Widoczny publicznie w storefront.',
  hidden: 'Nie jest widoczny publicznie, ale pozostaje aktywny w adminie.',
  archived: 'Wycofany z pracy operacyjnej. Nie jest widoczny publicznie.',
}

export const homepageStatusDescriptions: Record<HomepagePublishStatus, string> = {
  draft: 'Sekcja robocza. Nie jest widoczna publicznie.',
  published: 'Sekcja moze byc widoczna publicznie, jesli visibility = public.',
  hidden: 'Sekcja ukryta bez usuwania tresci.',
}

export const productionTypeLabels: Record<ProductProductionType, string> = {
  in_stock: 'In stock',
  made_to_order: 'Made to order',
}

export const mapStatusToLabel = (status: ProductPublishStatus): string => productStatusLabels[status]
export const mapHomepageStatusToLabel = (status: HomepagePublishStatus): string => homepageStatusLabels[status]

export const productPublishStatuses: ProductPublishStatus[] = ['draft', 'published', 'hidden', 'archived']
export const homepagePublishStatuses: HomepagePublishStatus[] = ['draft', 'published', 'hidden']

export const isPublicProductStatus = (status?: ProductPublishStatus): boolean => status === 'published'
export const isPublicHomepageStatus = (status?: HomepagePublishStatus): boolean => status === 'published'
export const canProductBePublic = (product: Pick<Product, 'publishStatus'>): boolean => isPublicProductStatus(product.publishStatus)
export const canHomepageSectionBePublic = (
  section: Pick<HomepageSection, 'status' | 'visibility'>,
): boolean => isPublicHomepageStatus(section.status) && section.visibility === 'public'

export const getNextProductPublishAction = (status?: ProductPublishStatus): 'publish' | 'hide' =>
  status === 'published' ? 'hide' : 'publish'

export const sortBySortOrder = <T extends { sortOrder?: number }>(items: T[]): T[] =>
  [...items].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))

export const sortProducts = (products: Product[], sortBy: SortOption): Product[] => {
  const sorted = [...products]

  switch (sortBy) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price)
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price)
    case 'newest':
      return sorted.sort((a, b) => new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime())
    case 'featured':
    default:
      return sorted.sort(
        (a, b) =>
          Number(Boolean(b.isFeatured)) - Number(Boolean(a.isFeatured)) ||
          Number(Boolean(b.isBestSeller)) - Number(Boolean(a.isBestSeller)) ||
          Number(Boolean(b.isNew)) - Number(Boolean(a.isNew)) ||
          (a.name > b.name ? 1 : -1),
      )
  }
}

export const sortHomepageSections = (sections: HomepageSection[]): HomepageSection[] => sortBySortOrder(sections)

export const uniqueStrings = (items: string[]): string[] => Array.from(new Set(items.map((item) => item.trim()).filter(Boolean)))
