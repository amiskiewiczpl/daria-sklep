import { HomepageSection, Product } from '@rosna/shared'
import { products as fallbackProducts } from '../data/products'
import { isSupabaseConfigured, supabase } from '../lib/supabase'

interface ProductRow {
  id: string
  slug: string
  name: string
  description: string
  price: number
  category: Product['category']
  category_label: string
  availability: Product['status']
  publish_status: Product['publishStatus']
  sizes: string[]
  colors: string[]
  materials: Product['materials']
  tags: Product['tags']
  collection: string | null
  collection_label: string | null
  is_new: boolean
  is_bestseller: boolean
  is_featured: boolean
  is_made_to_order: boolean
  product_images: Array<{
    id: string
    url: string
    path: string
    alt: string
    sort_order: number
    is_primary: boolean
  }>
}

interface HomepageSectionRow {
  id: string
  section_key: HomepageSection['key']
  title: string
  eyebrow: string
  body: string
  cta_label: string | null
  cta_href: string | null
  image_url: string | null
  sort_order: number
  is_published: boolean
}

const mapProduct = (row: ProductRow): Product => {
  const sortedImages = [...(row.product_images ?? [])].sort((a, b) => a.sort_order - b.sort_order)

  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    description: row.description,
    price: row.price,
    category: row.category,
    categoryLabel: row.category_label,
    status: row.availability,
    publishStatus: row.publish_status,
    images: sortedImages.map((image) => image.url),
    imageItems: sortedImages.map((image) => ({
      id: image.id,
      productId: row.id,
      url: image.url,
      path: image.path,
      alt: image.alt,
      sortOrder: image.sort_order,
      isPrimary: image.is_primary,
    })),
    variants: [],
    sizes: row.sizes,
    colors: row.colors,
    materials: row.materials,
    tags: row.tags,
    collection: row.collection ?? undefined,
    collectionLabel: row.collection_label ?? undefined,
    isNew: row.is_new,
    isBestSeller: row.is_bestseller,
    isFeatured: row.is_featured,
    isMadeToOrder: row.is_made_to_order,
  }
}

const mapHomepageSection = (row: HomepageSectionRow): HomepageSection => ({
  id: row.id,
  key: row.section_key,
  title: row.title,
  eyebrow: row.eyebrow,
  body: row.body,
  ctaLabel: row.cta_label ?? undefined,
  ctaHref: row.cta_href ?? undefined,
  imageUrl: row.image_url ?? undefined,
  sortOrder: row.sort_order,
  isPublished: row.is_published,
})

export const getPublishedProducts = async (): Promise<Product[]> => {
  if (!isSupabaseConfigured || !supabase) {
    return fallbackProducts.filter((product) => product.publishStatus !== 'draft' && product.publishStatus !== 'hidden')
  }

  const { data, error } = await supabase
    .from('products')
    .select('*, product_images(*)')
    .eq('publish_status', 'published')
    .order('created_at', { ascending: false })
    .order('sort_order', { foreignTable: 'product_images', ascending: true })

  if (error) {
    throw new Error(error.message)
  }

  return (data as ProductRow[]).map(mapProduct)
}

export const getPublishedProductBySlug = async (slug: string): Promise<Product | undefined> => {
  const products = await getPublishedProducts()
  return products.find((product) => product.slug === slug)
}

export const getPublishedHomepageSections = async (): Promise<HomepageSection[]> => {
  if (!isSupabaseConfigured || !supabase) {
    return []
  }

  const { data, error } = await supabase
    .from('homepage_sections')
    .select('*')
    .eq('is_published', true)
    .order('sort_order', { ascending: true })

  if (error) {
    throw new Error(error.message)
  }

  return (data as HomepageSectionRow[]).map(mapHomepageSection)
}
