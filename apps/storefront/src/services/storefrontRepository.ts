import {
  HomepageSection,
  HomepageSectionItem,
  HomepagePublishStatus,
  Product,
  ProductCategorySlug,
  ProductMaterial,
  ProductPublishStatus,
  ShopFilters,
  canHomepageSectionBePublic,
  canProductBePublic,
  isPublicHomepageStatus,
} from '@rosna/shared'
import { getPublishedLocalProducts } from '../utils/dataAdapter'
import { isSupabaseConfigured, supabase } from '../lib/supabase'

type ProductImageRow = {
  id: string
  product_id: string
  url: string
  path: string
  alt_text: string
  image_type: 'packshot' | 'lifestyle' | 'detail'
  sort_order: number
  is_primary: boolean
}

type ProductVariantRow = {
  id: string
  color_name: string | null
  pattern_name: string | null
  sort_order: number
  is_active: boolean
}

type ProductRow = {
  id: string
  slug: string
  name: string
  short_description: string
  description: string
  price: number
  compare_at_price: number | null
  currency: string
  category_id: string
  collection_id: string | null
  production_type: 'in_stock' | 'made_to_order'
  lead_time_days: number | null
  status: ProductPublishStatus
  is_new: boolean
  is_bestseller: boolean
  is_featured: boolean
  sort_order: number
  created_at: string
  updated_at: string
  categories: { id: string; name: string; slug: string } | null
  collections: { id: string; name: string; slug: string } | null
  product_images: ProductImageRow[]
  product_sizes: Array<{ size_value: string; sort_order: number; is_available: boolean }>
  product_variants: ProductVariantRow[]
  product_materials: Array<{ materials: { slug: string } | null }>
  product_tags: Array<{ tags: { slug: string } | null }>
}

type HomepageSectionRow = {
  id: string
  section_key: HomepageSection['key']
  title: string
  subtitle: string | null
  body: string | null
  cta_label: string | null
  cta_href: string | null
  image_url: string | null
  image_path: string | null
  linked_collection_id: string | null
  sort_order: number
  status: HomepagePublishStatus
  visibility: 'public' | 'private'
  homepage_section_items: HomepageSectionItemRow[]
}

type HomepageSectionItemRow = {
  id: string
  section_id: string
  title: string
  subtitle: string | null
  body: string | null
  cta_label: string | null
  cta_href: string | null
  image_url: string | null
  image_path: string | null
  linked_product_id: string | null
  linked_category_id: string | null
  linked_collection_id: string | null
  sort_order: number
  status: HomepagePublishStatus
}

export interface ProductQueryFilters {
  categorySlug?: string
  categories?: string[]
  productionType?: 'in_stock' | 'made_to_order'
  onlyNew?: boolean
  onlyBestseller?: boolean
  onlyFeatured?: boolean
  search?: string
  materials?: string[]
  sizes?: string[]
  colors?: string[]
  patterns?: string[]
  statuses?: Array<'in-stock' | 'made-to-order'>
}

const productSelect = `
  *,
  categories!inner(id, name, slug),
  collections(id, name, slug),
  product_images(*),
  product_sizes(size_value, sort_order, is_available),
  product_variants(id, color_name, pattern_name, sort_order, is_active),
  product_materials(materials(slug)),
  product_tags(tags(slug))
`

const homepageSelect = `
  *,
  homepage_section_items(*)
`

const uniqueValues = (values: string[]) => Array.from(new Set(values.map((value) => value.trim()).filter(Boolean)))

const getLocalPublishedProducts = (filters: ProductQueryFilters = {}) =>
  applyClientFilters(
    getPublishedLocalProducts().filter((product) => !product.publishStatus || product.publishStatus === 'published'),
    filters,
  )

const mapProduct = (row: ProductRow): Product => {
  const sortedImages = [...(row.product_images ?? [])].sort((a, b) => a.sort_order - b.sort_order)
  const activeVariants = [...(row.product_variants ?? [])].filter((variant) => variant.is_active).sort((a, b) => a.sort_order - b.sort_order)
  const materialSlugs = (row.product_materials ?? [])
    .map((item) => item.materials?.slug)
    .filter(Boolean) as ProductMaterial[]
  const categorySlug = row.categories?.slug ?? 'made-to-order'

  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    shortDescription: row.short_description,
    description: row.description,
    price: row.price,
    compareAtPrice: row.compare_at_price ?? undefined,
    currency: row.currency,
    categoryId: row.category_id,
    collectionId: row.collection_id ?? undefined,
    category: categorySlug as ProductCategorySlug,
    categoryLabel: row.categories?.name ?? 'Bez kategorii',
    status: row.production_type === 'made_to_order' ? 'made-to-order' : 'in-stock',
    productionType: row.production_type,
    leadTimeDays: row.lead_time_days ?? undefined,
    publishStatus: row.status,
    images: sortedImages.map((image) => image.url),
    imageItems: sortedImages.map((image) => ({
      id: image.id,
      productId: image.product_id,
      url: image.url,
      path: image.path,
      alt: image.alt_text,
      imageType: image.image_type,
      sortOrder: image.sort_order,
      isPrimary: image.is_primary,
    })),
    variants: activeVariants.map((variant) => ({
      id: variant.id,
      color: variant.color_name ?? 'Naturalny',
      pattern: variant.pattern_name ?? undefined,
      material: materialSlugs[0] ?? 'len',
      availableSizes: [],
      inStock: true,
    })),
    sizes: [...(row.product_sizes ?? [])]
      .filter((size) => size.is_available)
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((size) => size.size_value),
    colors: uniqueValues(activeVariants.map((variant) => variant.color_name).filter(Boolean) as string[]),
    materials: materialSlugs,
    tags: (row.product_tags ?? []).map((item) => item.tags?.slug).filter(Boolean) as Product['tags'],
    collection: row.collections?.slug,
    collectionLabel: row.collections?.name,
    isNew: row.is_new,
    isBestSeller: row.is_bestseller,
    isFeatured: row.is_featured,
    isMadeToOrder: row.production_type === 'made_to_order',
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

const mapHomepageSectionItem = (row: HomepageSectionItemRow): HomepageSectionItem => ({
  id: row.id,
  sectionId: row.section_id,
  title: row.title,
  subtitle: row.subtitle ?? undefined,
  body: row.body ?? undefined,
  ctaLabel: row.cta_label ?? undefined,
  ctaHref: row.cta_href ?? undefined,
  imageUrl: row.image_url ?? undefined,
  imagePath: row.image_path ?? undefined,
  linkedProductId: row.linked_product_id ?? undefined,
  linkedCategoryId: row.linked_category_id ?? undefined,
  linkedCollectionId: row.linked_collection_id ?? undefined,
  sortOrder: row.sort_order,
  status: row.status,
})

const mapHomepageSection = (row: HomepageSectionRow): HomepageSection => {
  const subtitle = row.subtitle ?? ''
  const items = [...(row.homepage_section_items ?? [])]
    .filter((item) => isPublicHomepageStatus(item.status))
    .sort((a, b) => a.sort_order - b.sort_order)
    .map(mapHomepageSectionItem)

  return {
    id: row.id,
    key: row.section_key,
    title: row.title,
    subtitle,
    eyebrow: subtitle,
    body: row.body ?? '',
    ctaLabel: row.cta_label ?? undefined,
    ctaHref: row.cta_href ?? undefined,
    imageUrl: row.image_url ?? undefined,
    imagePath: row.image_path ?? undefined,
    sortOrder: row.sort_order,
    isPublished: row.status === 'published' && row.visibility === 'public',
    status: row.status,
    visibility: row.visibility,
    linkedCollectionId: row.linked_collection_id ?? undefined,
    linkedProductIds: items.map((item) => item.linkedProductId).filter(Boolean) as string[],
    items,
  }
}

const applyProductQueryFilters = <T extends { eq: (column: string, value: unknown) => T; or: (filters: string) => T }>(
  query: T,
  filters: ProductQueryFilters,
) => {
  let nextQuery = query

  if (filters.categorySlug) {
    nextQuery = nextQuery.eq('categories.slug', filters.categorySlug)
  }

  if (filters.productionType) {
    nextQuery = nextQuery.eq('production_type', filters.productionType)
  }

  if (filters.onlyNew) {
    nextQuery = nextQuery.eq('is_new', true)
  }

  if (filters.onlyBestseller) {
    nextQuery = nextQuery.eq('is_bestseller', true)
  }

  if (filters.onlyFeatured) {
    nextQuery = nextQuery.eq('is_featured', true)
  }

  if (filters.search?.trim()) {
    const search = filters.search.trim()
    nextQuery = nextQuery.or(`name.ilike.%${search}%,slug.ilike.%${search}%`)
  }

  return nextQuery
}

const applyClientFilters = (products: Product[], filters: ProductQueryFilters) =>
  products.filter((product) => {
    if (filters.materials?.length && !product.materials.some((material) => filters.materials?.includes(material))) return false
    if (filters.sizes?.length && !product.sizes.some((size) => filters.sizes?.includes(size))) return false
    if (filters.colors?.length && !product.colors.some((color) => filters.colors?.includes(color))) return false
    if (filters.patterns?.length && !product.variants.some((variant) => variant.pattern && filters.patterns?.includes(variant.pattern))) return false
    if (filters.statuses?.length && !filters.statuses.includes(product.status)) return false
    if (filters.categories?.length && !filters.categories.includes(product.category)) return false
    return true
  })

export const getPublishedProducts = async (filters: ProductQueryFilters = {}): Promise<Product[]> => {
  if (!isSupabaseConfigured || !supabase) {
    return getLocalPublishedProducts(filters)
  }

  let query = supabase
    .from('products')
    .select(productSelect)
    .eq('status', 'published')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false })
    .order('sort_order', { foreignTable: 'product_images', ascending: true })

  query = applyProductQueryFilters(query, filters)

  const { data, error } = await query
  if (error) throw new Error(error.message)

  return applyClientFilters((data as ProductRow[]).map(mapProduct).filter(canProductBePublic), filters)
}

export const getPublishedProductsByShopFilters = async (filters: ShopFilters): Promise<Product[]> =>
  getPublishedProducts({
    materials: filters.materials,
    sizes: filters.sizes,
    colors: filters.colors,
    patterns: filters.patterns,
    statuses: filters.statuses,
    categories: filters.categories,
    onlyNew: filters.onlyNew,
  })

export const getPublishedProductBySlug = async (slug: string): Promise<Product | undefined> => {
  if (!isSupabaseConfigured || !supabase) {
    return getLocalPublishedProducts().find((product) => product.slug === slug)
  }

  const { data, error } = await supabase
    .from('products')
    .select(productSelect)
    .eq('status', 'published')
    .eq('slug', slug)
    .order('sort_order', { foreignTable: 'product_images', ascending: true })
    .maybeSingle()

  if (error) throw new Error(error.message)
  if (!data) return undefined

  const product = mapProduct(data as ProductRow)
  return canProductBePublic(product) ? product : undefined
}

export const getPublishedHomepageSections = async (): Promise<HomepageSection[]> => {
  if (!isSupabaseConfigured || !supabase) {
    return []
  }

  const { data, error } = await supabase
    .from('homepage_sections')
    .select(homepageSelect)
    .eq('status', 'published')
    .eq('visibility', 'public')
    .order('sort_order', { ascending: true })
    .order('sort_order', { foreignTable: 'homepage_section_items', ascending: true })

  if (error) throw new Error(error.message)

  return (data as HomepageSectionRow[]).map(mapHomepageSection).filter(canHomepageSectionBePublic)
}
