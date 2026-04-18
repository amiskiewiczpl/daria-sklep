import { Product, ProductMaterial, ProductStatus, ProductCategorySlug, SortOption, ShopFilters, ShopFilterOptions } from '../types'

const normalizeValues = (values: string | string[] | null): string[] => {
  if (!values) return []
  if (Array.isArray(values)) return values.filter(Boolean)
  return values.split(',').filter(Boolean)
}

const unique = <T extends string>(items: T[]): T[] => Array.from(new Set(items))

export const defaultFilters: ShopFilters = {
  categories: [],
  materials: [],
  sizes: [],
  statuses: [],
  colors: [],
  patterns: [],
  onlyNew: false,
  sortBy: 'featured',
}

export const parseFiltersFromSearchParams = (searchParams: URLSearchParams): ShopFilters => ({
  categories: normalizeValues(searchParams.getAll('category').length ? searchParams.getAll('category') : searchParams.get('category')) as ProductCategorySlug[],
  materials: normalizeValues(searchParams.getAll('material').length ? searchParams.getAll('material') : searchParams.get('material')) as ProductMaterial[],
  sizes: normalizeValues(searchParams.getAll('size').length ? searchParams.getAll('size') : searchParams.get('size')),
  statuses: normalizeValues(searchParams.getAll('status').length ? searchParams.getAll('status') : searchParams.get('status')) as ProductStatus[],
  colors: normalizeValues(searchParams.getAll('color').length ? searchParams.getAll('color') : searchParams.get('color')),
  patterns: normalizeValues(searchParams.getAll('pattern').length ? searchParams.getAll('pattern') : searchParams.get('pattern')),
  onlyNew: searchParams.get('new') === 'true',
  sortBy: (searchParams.get('sort') || 'featured') as SortOption,
})

export const formatFiltersToSearchParams = (filters: ShopFilters): URLSearchParams => {
  const params = new URLSearchParams()

  filters.categories.forEach((category) => params.append('category', category))
  filters.materials.forEach((material) => params.append('material', material))
  filters.sizes.forEach((size) => params.append('size', size))
  filters.statuses.forEach((status) => params.append('status', status))
  filters.colors.forEach((color) => params.append('color', color))
  filters.patterns.forEach((pattern) => params.append('pattern', pattern))

  if (filters.onlyNew) params.set('new', 'true')
  if (filters.sortBy && filters.sortBy !== 'featured') params.set('sort', filters.sortBy)

  return params
}

export const filterProducts = (products: Product[], filters: ShopFilters): Product[] =>
  products.filter((product) => {
    if (filters.categories.length && !filters.categories.includes(product.category)) return false
    if (filters.materials.length && !product.materials.some((material) => filters.materials.includes(material))) return false
    if (filters.sizes.length && !product.sizes.some((size) => filters.sizes.includes(size))) return false
    if (filters.statuses.length && !filters.statuses.includes(product.status)) return false
    if (filters.colors.length && !product.colors.some((color) => filters.colors.includes(color))) return false
    if (
      filters.patterns.length &&
      !product.variants.some((variant) => variant.pattern && filters.patterns.includes(variant.pattern))
    ) {
      return false
    }
    if (filters.onlyNew && !product.isNew) return false
    return true
  })

export const sortProducts = (products: Product[], sortBy: SortOption): Product[] => {
  const sorted = [...products]

  switch (sortBy) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price)
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price)
    case 'newest':
      return sorted.sort((a, b) => Number(b.isNew) - Number(a.isNew))
    case 'featured':
    default:
      return sorted.sort((a, b) => Number(b.isBestSeller) - Number(a.isBestSeller) || Number(b.isNew) - Number(a.isNew))
  }
}

export const getFilterOptions = (products: Product[]): ShopFilterOptions => ({
  categories: unique(products.map((product) => product.category)),
  materials: unique(products.flatMap((product) => product.materials)),
  sizes: unique(products.flatMap((product) => product.sizes)),
  statuses: unique(products.map((product) => product.status)),
  colors: unique(products.flatMap((product) => product.colors)),
  patterns: unique(products.flatMap((product) => product.variants.map((variant) => variant.pattern)).filter((value): value is string => Boolean(value))),
})

export const getActiveFilterCount = (filters: ShopFilters) =>
  filters.categories.length +
  filters.materials.length +
  filters.sizes.length +
  filters.statuses.length +
  filters.colors.length +
  filters.patterns.length +
  (filters.onlyNew ? 1 : 0)
