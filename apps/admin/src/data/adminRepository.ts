import { HomepageSection, Product, ProductDraftInput, ProductImage } from '@rosna/shared'
import { supabase } from '../lib/supabase'

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
    product_id: string
    url: string
    path: string
    alt: string
    sort_order: number
    is_primary: boolean
  }>
}

const toProduct = (row: ProductRow): Product => {
  const imageItems: ProductImage[] = [...(row.product_images ?? [])]
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((image) => ({
      id: image.id,
      productId: image.product_id,
      url: image.url,
      path: image.path,
      alt: image.alt,
      sortOrder: image.sort_order,
      isPrimary: image.is_primary,
    }))

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
    images: imageItems.map((image) => image.url),
    imageItems,
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

export const listAdminProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('*, product_images(*)')
    .order('updated_at', { ascending: false })
    .order('sort_order', { foreignTable: 'product_images', ascending: true })

  if (error) {
    throw new Error(error.message)
  }

  return (data as ProductRow[]).map(toProduct)
}

export const saveProduct = async (input: ProductDraftInput): Promise<string> => {
  const payload = {
    slug: input.slug,
    name: input.name,
    description: input.description,
    price: input.price,
    category: input.category,
    category_label: input.categoryLabel,
    availability: input.availability,
    publish_status: input.publishStatus,
    sizes: input.sizes,
    colors: input.colors,
    materials: input.materials,
    tags: input.tags,
    is_new: input.isNew,
    is_bestseller: input.isBestSeller,
    is_featured: input.isFeatured,
    is_made_to_order: input.isMadeToOrder,
    updated_at: new Date().toISOString(),
  }

  const query = input.id
    ? supabase.from('products').update(payload).eq('id', input.id).select('id').single()
    : supabase.from('products').insert(payload).select('id').single()

  const { data, error } = await query

  if (error) {
    throw new Error(error.message)
  }

  return data.id as string
}

export const uploadProductImage = async (productId: string, file: File, sortOrder: number): Promise<void> => {
  const extension = file.name.split('.').pop() || 'jpg'
  const path = `${productId}/${crypto.randomUUID()}.${extension}`
  const { error: uploadError } = await supabase.storage.from('product-images').upload(path, file, {
    cacheControl: '31536000',
    upsert: false,
  })

  if (uploadError) {
    throw new Error(uploadError.message)
  }

  const { data } = supabase.storage.from('product-images').getPublicUrl(path)
  const { error } = await supabase.from('product_images').insert({
    product_id: productId,
    path,
    url: data.publicUrl,
    alt: file.name,
    sort_order: sortOrder,
    is_primary: sortOrder === 0,
  })

  if (error) {
    throw new Error(error.message)
  }
}

export const setPrimaryImage = async (productId: string, imageId: string): Promise<void> => {
  const { error: resetError } = await supabase.from('product_images').update({ is_primary: false }).eq('product_id', productId)

  if (resetError) {
    throw new Error(resetError.message)
  }

  const { error } = await supabase.from('product_images').update({ is_primary: true, sort_order: 0 }).eq('id', imageId)

  if (error) {
    throw new Error(error.message)
  }
}

export const moveImage = async (image: ProductImage, direction: -1 | 1): Promise<void> => {
  const nextSortOrder = Math.max(0, image.sortOrder + direction)
  const { error } = await supabase.from('product_images').update({ sort_order: nextSortOrder }).eq('id', image.id)

  if (error) {
    throw new Error(error.message)
  }
}

export const listHomepageSections = async (): Promise<HomepageSection[]> => {
  const { data, error } = await supabase.from('homepage_sections').select('*').order('sort_order', { ascending: true })

  if (error) {
    throw new Error(error.message)
  }

  return data.map((row) => ({
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
  }))
}

export const saveHomepageSection = async (section: HomepageSection): Promise<void> => {
  const { error } = await supabase
    .from('homepage_sections')
    .update({
      title: section.title,
      eyebrow: section.eyebrow,
      body: section.body,
      cta_label: section.ctaLabel,
      cta_href: section.ctaHref,
      image_url: section.imageUrl,
      sort_order: section.sortOrder,
      is_published: section.isPublished,
      updated_at: new Date().toISOString(),
    })
    .eq('id', section.id)

  if (error) {
    throw new Error(error.message)
  }
}
