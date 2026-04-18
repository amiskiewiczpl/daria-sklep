import {
  AdminProductFormValues,
  Category,
  Collection,
  HomepagePublishStatus,
  HomepageSection,
  HomepageSectionItem,
  HomepageSectionKey,
  Material,
  Product,
  ProductImage,
  ProductImageType,
  ProductPublishStatus,
} from '@rosna/shared'
import { supabase } from '../lib/supabase'

export const PRODUCT_IMAGES_BUCKET = 'product-images'
export const PRODUCT_IMAGE_MAX_SIZE_BYTES = 8 * 1024 * 1024
export const PRODUCT_IMAGE_ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/avif'] as const

export interface ProductImageUploadInput {
  productId: string
  file: File
  altText: string
  imageType: ProductImageType
  sortOrder: number
  isPrimary?: boolean
}

export interface ProductImageMetadataInput {
  altText: string
  imageType: ProductImageType
}

export const HOMEPAGE_IMAGES_BUCKET = 'homepage-images'

export interface HomepageSectionFormValues {
  id: string
  key: HomepageSectionKey
  title: string
  subtitle: string
  body: string
  ctaLabel: string
  ctaHref: string
  imageUrl: string
  imagePath?: string
  visibility: 'public' | 'private'
  status: HomepagePublishStatus
  sortOrder: number
  linkedCollectionId?: string
  linkedProductIds: string[]
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
  product_materials: Array<{ material_id: string; sort_order: number; materials: MaterialRow | null }>
  product_tags: Array<{ tags: { name: string; slug: string } | null }>
}

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

type CategoryRow = {
  id: string
  name: string
  slug: string
  description: string | null
  sort_order: number
  is_active: boolean
}

type CollectionRow = CategoryRow

type MaterialRow = CategoryRow & {
  care_notes: string | null
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
  homepage_section_items?: HomepageSectionItemRow[]
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

export interface DashboardStats {
  totalProducts: number
  publishedProducts: number
  draftProducts: number
  hiddenProducts: number
  mediaItems: number
  homepageSections: number
}

const toCategory = (row: CategoryRow): Category => ({
  id: row.id,
  name: row.name,
  slug: row.slug,
  description: row.description ?? undefined,
  sortOrder: row.sort_order,
  isActive: row.is_active,
})

const toCollection = (row: CollectionRow): Collection => ({
  id: row.id,
  name: row.name,
  slug: row.slug,
  description: row.description ?? undefined,
  sortOrder: row.sort_order,
  isActive: row.is_active,
})

const toMaterial = (row: MaterialRow): Material => ({
  id: row.id,
  name: row.name,
  slug: row.slug,
  description: row.description ?? undefined,
  careNotes: row.care_notes ?? undefined,
  sortOrder: row.sort_order,
  isActive: row.is_active,
})

const toProductImage = (row: ProductImageRow): ProductImage => ({
  id: row.id,
  productId: row.product_id,
  url: row.url,
  path: row.path,
  alt: row.alt_text,
  imageType: row.image_type,
  sortOrder: row.sort_order,
  isPrimary: row.is_primary,
})

const toProduct = (row: ProductRow): Product => {
  const imageItems = [...(row.product_images ?? [])].sort((a, b) => a.sort_order - b.sort_order).map(toProductImage)
  const categorySlug = row.categories?.slug ?? 'made-to-order'
  const activeVariants = [...(row.product_variants ?? [])].filter((variant) => variant.is_active).sort((a, b) => a.sort_order - b.sort_order)
  const colors = uniqueValues(activeVariants.map((variant) => variant.color_name).filter(Boolean) as string[])
  const materialSlugs = (row.product_materials ?? [])
    .map((item) => item.materials?.slug)
    .filter(Boolean) as Product['materials']

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
    category: categorySlug as Product['category'],
    categoryLabel: row.categories?.name ?? 'Bez kategorii',
    status: row.production_type === 'made_to_order' ? 'made-to-order' : 'in-stock',
    productionType: row.production_type,
    leadTimeDays: row.lead_time_days ?? undefined,
    publishStatus: row.status,
    images: imageItems.map((image) => image.url),
    imageItems,
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
    colors,
    materials: materialSlugs,
    tags: (row.product_tags ?? [])
      .map((item) => item.tags?.slug)
      .filter(Boolean) as Product['tags'],
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

const productSelect = `
  *,
  categories(id, name, slug),
  collections(id, name, slug),
  product_images(*),
  product_sizes(size_value, sort_order, is_available),
  product_variants(id, color_name, pattern_name, sort_order, is_active),
  product_materials(material_id, sort_order, materials(id, name, slug, description, care_notes, sort_order, is_active)),
  product_tags(tags(name, slug))
`

const toHomepageSectionItem = (row: HomepageSectionItemRow): HomepageSectionItem => ({
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

const toHomepageSection = (row: HomepageSectionRow): HomepageSection => {
  const subtitle = row.subtitle ?? ''
  const items = [...(row.homepage_section_items ?? [])].sort((a, b) => a.sort_order - b.sort_order).map(toHomepageSectionItem)

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
    visibility: row.visibility,
    status: row.status,
    linkedCollectionId: row.linked_collection_id ?? undefined,
    linkedProductIds: items.map((item) => item.linkedProductId).filter(Boolean) as string[],
    items,
  }
}

export const listCategories = async (): Promise<Category[]> => {
  const { data, error } = await supabase.from('categories').select('*').order('sort_order', { ascending: true })

  if (error) throw new Error(error.message)
  return (data as CategoryRow[]).map(toCategory)
}

export const listCollections = async (): Promise<Collection[]> => {
  const { data, error } = await supabase.from('collections').select('*').order('sort_order', { ascending: true })

  if (error) throw new Error(error.message)
  return (data as CollectionRow[]).map(toCollection)
}

export const listMaterials = async (): Promise<Material[]> => {
  const { data, error } = await supabase.from('materials').select('*').order('sort_order', { ascending: true })

  if (error) throw new Error(error.message)
  return (data as MaterialRow[]).map(toMaterial)
}

export const listAdminProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select(productSelect)
    .order('updated_at', { ascending: false })

  if (error) throw new Error(error.message)
  return (data as ProductRow[]).map(toProduct)
}

export const getAdminProduct = async (id: string): Promise<Product> => {
  const { data, error } = await supabase.from('products').select(productSelect).eq('id', id).single()

  if (error) throw new Error(error.message)
  return toProduct(data as ProductRow)
}

export const saveProduct = async (input: AdminProductFormValues): Promise<string> => {
  const payload = {
    slug: input.slug,
    name: input.name,
    short_description: input.shortDescription,
    description: input.description,
    price: input.price,
    compare_at_price: input.compareAtPrice ?? null,
    currency: input.currency,
    category_id: input.categoryId,
    collection_id: input.collectionId || null,
    production_type: input.productionType,
    lead_time_days: input.productionType === 'made_to_order' ? input.leadTimeDays ?? 21 : null,
    status: input.status,
    is_new: input.isNew,
    is_bestseller: input.isBestSeller,
    is_featured: input.isFeatured,
    sort_order: input.sortOrder,
  }

  const query = input.id
    ? supabase.from('products').update(payload).eq('id', input.id).select('id').single()
    : supabase.from('products').insert(payload).select('id').single()

  const { data, error } = await query
  if (error) throw new Error(error.message)

  const productId = data.id as string
  await syncProductSizes(productId, input.sizes)
  await syncProductMaterials(productId, input.materials)
  await syncProductTags(productId, input.tags)
  await syncProductVariants(productId, input.colors, input.patterns)

  return productId
}

export const updateProductStatus = async (productId: string, status: ProductPublishStatus): Promise<void> => {
  const { error } = await supabase.from('products').update({ status }).eq('id', productId)
  if (error) throw new Error(error.message)
}

export const publishProduct = (productId: string): Promise<void> => updateProductStatus(productId, 'published')
export const hideProduct = (productId: string): Promise<void> => updateProductStatus(productId, 'hidden')
export const moveProductToDraft = (productId: string): Promise<void> => updateProductStatus(productId, 'draft')

export const softDeleteProduct = async (productId: string): Promise<void> => {
  await updateProductStatus(productId, 'archived')
}

export const duplicateProduct = async (productId: string): Promise<string> => {
  const { data, error } = await supabase.from('products').select(productSelect).eq('id', productId).single()
  if (error) throw new Error(error.message)

  const source = data as ProductRow
  const duplicateSlug = await buildDuplicateSlug(source.slug)
  const { data: createdProduct, error: createError } = await supabase
    .from('products')
    .insert({
      slug: duplicateSlug,
      name: `${source.name} copy`,
      short_description: source.short_description,
      description: source.description,
      price: source.price,
      compare_at_price: source.compare_at_price,
      currency: source.currency,
      category_id: source.category_id,
      collection_id: source.collection_id,
      production_type: source.production_type,
      lead_time_days: source.lead_time_days,
      status: 'draft',
      is_new: false,
      is_bestseller: false,
      is_featured: false,
      sort_order: source.sort_order + 10,
    })
    .select('id')
    .single()

  if (createError) throw new Error(createError.message)

  const nextProductId = createdProduct.id as string
  await syncProductSizes(
    nextProductId,
    [...(source.product_sizes ?? [])].sort((a, b) => a.sort_order - b.sort_order).map((size) => size.size_value),
  )
  await syncProductMaterials(
    nextProductId,
    [...(source.product_materials ?? [])].sort((a, b) => a.sort_order - b.sort_order).map((item) => item.material_id),
  )
  await syncProductTags(
    nextProductId,
    (source.product_tags ?? []).map((item) => item.tags?.name).filter(Boolean) as string[],
  )
  await syncProductVariants(
    nextProductId,
    uniqueValues((source.product_variants ?? []).map((variant) => variant.color_name).filter(Boolean) as string[]),
    uniqueValues((source.product_variants ?? []).map((variant) => variant.pattern_name).filter(Boolean) as string[]),
  )

  return nextProductId
}

export const deleteProductImage = async (image: ProductImage): Promise<void> => {
  const { error: storageError } = await supabase.storage.from(PRODUCT_IMAGES_BUCKET).remove([image.path])
  if (storageError) throw new Error(storageError.message)

  const { error } = await supabase.from('product_images').delete().eq('id', image.id)
  if (error) throw new Error(error.message)
}

export const uploadProductImage = async (input: ProductImageUploadInput): Promise<ProductImage> => {
  validateProductImageFile(input.file)

  const path = buildProductImagePath(input.productId, input.file)
  const { error: uploadError } = await supabase.storage.from(PRODUCT_IMAGES_BUCKET).upload(path, input.file, {
    cacheControl: '31536000',
    contentType: input.file.type,
    upsert: false,
  })

  if (uploadError) throw new Error(uploadError.message)

  const { data: publicUrlData } = supabase.storage.from(PRODUCT_IMAGES_BUCKET).getPublicUrl(path)
  const { data: imageData, error } = await supabase.from('product_images').insert({
    product_id: input.productId,
    path,
    url: publicUrlData.publicUrl,
    alt_text: input.altText,
    image_type: input.imageType,
    sort_order: input.sortOrder,
    is_primary: Boolean(input.isPrimary),
  }).select('*').single()

  if (error) {
    await supabase.storage.from(PRODUCT_IMAGES_BUCKET).remove([path])
    throw new Error(error.message)
  }

  return toProductImage(imageData as ProductImageRow)
}

export const setPrimaryImage = async (productId: string, imageId: string): Promise<void> => {
  const { error: resetError } = await supabase.from('product_images').update({ is_primary: false }).eq('product_id', productId)
  if (resetError) throw new Error(resetError.message)

  const { error } = await supabase.from('product_images').update({ is_primary: true }).eq('id', imageId)
  if (error) throw new Error(error.message)
}

export const updateProductImageMetadata = async (imageId: string, input: ProductImageMetadataInput): Promise<void> => {
  const { error } = await supabase
    .from('product_images')
    .update({
      alt_text: input.altText,
      image_type: input.imageType,
    })
    .eq('id', imageId)

  if (error) throw new Error(error.message)
}

export const reorderProductImages = async (productId: string, orderedImageIds: string[]): Promise<void> => {
  const tempUpdates = orderedImageIds.map((imageId, index) =>
    supabase
      .from('product_images')
      .update({ sort_order: 100000 + index })
      .eq('id', imageId)
      .eq('product_id', productId),
  )
  const tempResults = await Promise.all(tempUpdates)
  const tempError = tempResults.find((result) => result.error)?.error
  if (tempError) throw new Error(tempError.message)

  const finalUpdates = orderedImageIds.map((imageId, index) =>
    supabase
      .from('product_images')
      .update({ sort_order: index * 10 })
      .eq('id', imageId)
      .eq('product_id', productId),
  )
  const finalResults = await Promise.all(finalUpdates)
  const finalError = finalResults.find((result) => result.error)?.error
  if (finalError) throw new Error(finalError.message)
}

export const moveImage = async (productId: string, images: ProductImage[], imageId: string, direction: -1 | 1): Promise<void> => {
  const currentIndex = images.findIndex((image) => image.id === imageId)
  const nextIndex = currentIndex + direction

  if (currentIndex < 0 || nextIndex < 0 || nextIndex >= images.length) {
    return
  }

  const nextImages = [...images]
  const [movedImage] = nextImages.splice(currentIndex, 1)
  nextImages.splice(nextIndex, 0, movedImage)

  await reorderProductImages(productId, nextImages.map((image) => image.id))
}

export const listMediaItems = async (): Promise<ProductImage[]> => {
  const { data, error } = await supabase.from('product_images').select('*').order('created_at', { ascending: false })
  if (error) throw new Error(error.message)
  return (data as ProductImageRow[]).map(toProductImage)
}

export const listHomepageSections = async (): Promise<HomepageSection[]> => {
  const { data, error } = await supabase
    .from('homepage_sections')
    .select('*, homepage_section_items(*)')
    .order('sort_order', { ascending: true })
    .order('sort_order', { foreignTable: 'homepage_section_items', ascending: true })
  if (error) throw new Error(error.message)

  return (data as HomepageSectionRow[]).map(toHomepageSection)
}

export const saveHomepageSection = async (section: HomepageSectionFormValues): Promise<void> => {
  const { error } = await supabase
    .from('homepage_sections')
    .update({
      title: section.title,
      subtitle: section.subtitle,
      body: section.body,
      cta_label: section.ctaLabel || null,
      cta_href: section.ctaHref || null,
      image_url: section.imageUrl || null,
      image_path: section.imagePath ?? null,
      sort_order: section.sortOrder,
      visibility: section.visibility,
      status: section.status,
      linked_collection_id: section.linkedCollectionId || null,
    })
    .eq('id', section.id)

  if (error) throw new Error(error.message)

  await syncHomepageSectionProductItems(section)
}

export const updateHomepageSectionStatus = async (sectionId: string, status: HomepagePublishStatus): Promise<void> => {
  const { error } = await supabase.from('homepage_sections').update({ status }).eq('id', sectionId)
  if (error) throw new Error(error.message)
}

export const publishHomepageSection = (sectionId: string): Promise<void> => updateHomepageSectionStatus(sectionId, 'published')
export const hideHomepageSection = (sectionId: string): Promise<void> => updateHomepageSectionStatus(sectionId, 'hidden')
export const moveHomepageSectionToDraft = (sectionId: string): Promise<void> => updateHomepageSectionStatus(sectionId, 'draft')

export const reorderHomepageSections = async (sections: Pick<HomepageSection, 'id' | 'sortOrder'>[]): Promise<void> => {
  const tempResults = await Promise.all(
    sections.map((section, index) =>
      supabase.from('homepage_sections').update({ sort_order: 100000 + index }).eq('id', section.id),
    ),
  )
  const tempError = tempResults.find((result) => result.error)?.error
  if (tempError) throw new Error(tempError.message)

  const finalResults = await Promise.all(
    sections.map((section, index) =>
      supabase.from('homepage_sections').update({ sort_order: index * 10 + 10 }).eq('id', section.id),
    ),
  )
  const finalError = finalResults.find((result) => result.error)?.error
  if (finalError) throw new Error(finalError.message)
}

export const uploadHomepageSectionImage = async (sectionKey: HomepageSectionKey, file: File): Promise<{ url: string; path: string }> => {
  validateProductImageFile(file)

  const path = buildHomepageImagePath(sectionKey, file)
  const { error: uploadError } = await supabase.storage.from(HOMEPAGE_IMAGES_BUCKET).upload(path, file, {
    cacheControl: '31536000',
    contentType: file.type,
    upsert: false,
  })

  if (uploadError) throw new Error(uploadError.message)

  const { data } = supabase.storage.from(HOMEPAGE_IMAGES_BUCKET).getPublicUrl(path)
  return { url: data.publicUrl, path }
}

export const getDashboardStats = async (): Promise<DashboardStats> => {
  const [products, images, sections] = await Promise.all([listAdminProducts(), listMediaItems(), listHomepageSections()])

  return {
    totalProducts: products.length,
    publishedProducts: products.filter((product) => product.publishStatus === 'published').length,
    draftProducts: products.filter((product) => product.publishStatus === 'draft').length,
    hiddenProducts: products.filter((product) => product.publishStatus === 'hidden').length,
    mediaItems: images.length,
    homepageSections: sections.length,
  }
}

const syncProductSizes = async (productId: string, sizes: string[]) => {
  await supabase.from('product_sizes').delete().eq('product_id', productId)
  if (!sizes.length) return

  const { error } = await supabase.from('product_sizes').insert(
    sizes.map((size, index) => ({
      product_id: productId,
      size_value: size,
      size_label: size,
      sort_order: index * 10,
      is_available: true,
    })),
  )
  if (error) throw new Error(error.message)
}

const syncProductMaterials = async (productId: string, materialIds: string[]) => {
  await supabase.from('product_materials').delete().eq('product_id', productId)
  if (!materialIds.length) return

  const { error } = await supabase.from('product_materials').insert(
    materialIds.map((materialId, index) => ({
      product_id: productId,
      material_id: materialId,
      sort_order: index * 10,
    })),
  )
  if (error) throw new Error(error.message)
}

const syncProductTags = async (productId: string, tags: string[]) => {
  await supabase.from('product_tags').delete().eq('product_id', productId)
  const uniqueTags = uniqueValues(tags)
  if (!uniqueTags.length) return

  const tagIds = await Promise.all(uniqueTags.map(upsertTag))
  const { error } = await supabase.from('product_tags').insert(tagIds.map((tagId) => ({ product_id: productId, tag_id: tagId })))
  if (error) throw new Error(error.message)
}

const syncProductVariants = async (productId: string, colors: string[], patterns: string[]) => {
  await supabase.from('product_variants').delete().eq('product_id', productId)

  const cleanColors = uniqueValues(colors)
  const cleanPatterns = uniqueValues(patterns)
  const rows = buildVariantRows(productId, cleanColors, cleanPatterns)

  if (!rows.length) return

  const { error } = await supabase.from('product_variants').insert(rows)
  if (error) throw new Error(error.message)
}

const buildVariantRows = (productId: string, colors: string[], patterns: string[]) => {
  if (!colors.length && !patterns.length) return []

  const baseColors = colors.length ? colors : [null]
  const basePatterns = patterns.length ? patterns : [null]

  return baseColors.flatMap((color, colorIndex) =>
    basePatterns.map((pattern, patternIndex) => ({
      product_id: productId,
      color_name: color,
      pattern_name: pattern,
      stock_quantity: 0,
      is_active: true,
      sort_order: colorIndex * 100 + patternIndex * 10,
    })),
  )
}

const upsertTag = async (name: string): Promise<string> => {
  const slug = name.toLowerCase().trim().replace(/\s+/g, '-')
  const { data, error } = await supabase.from('tags').upsert({ name, slug }, { onConflict: 'slug' }).select('id').single()
  if (error) throw new Error(error.message)
  return data.id as string
}

const uniqueValues = (values: string[]) => Array.from(new Set(values.map((value) => value.trim()).filter(Boolean)))

const buildDuplicateSlug = async (slug: string): Promise<string> => {
  const baseSlug = `${slug}-copy`
  const { data, error } = await supabase.from('products').select('slug').ilike('slug', `${baseSlug}%`)
  if (error) throw new Error(error.message)

  const existingSlugs = new Set((data ?? []).map((row) => row.slug as string))
  if (!existingSlugs.has(baseSlug)) return baseSlug

  let index = 2
  while (existingSlugs.has(`${baseSlug}-${index}`)) {
    index += 1
  }

  return `${baseSlug}-${index}`
}

const syncHomepageSectionProductItems = async (section: HomepageSectionFormValues): Promise<void> => {
  await supabase.from('homepage_section_items').delete().eq('section_id', section.id)

  if (!section.linkedProductIds.length) return

  const rows = section.linkedProductIds.map((productId, index) => ({
    section_id: section.id,
    title: section.title,
    subtitle: section.subtitle || null,
    body: null,
    cta_label: section.ctaLabel || null,
    cta_href: section.ctaHref || null,
    image_url: null,
    image_path: null,
    linked_product_id: productId,
    linked_category_id: null,
    linked_collection_id: section.linkedCollectionId || null,
    sort_order: index * 10,
    status: section.status,
  }))

  const { error } = await supabase.from('homepage_section_items').insert(rows)
  if (error) throw new Error(error.message)
}

export const validateProductImageFile = (file: File): void => {
  if (!PRODUCT_IMAGE_ALLOWED_TYPES.includes(file.type as typeof PRODUCT_IMAGE_ALLOWED_TYPES[number])) {
    throw new Error(`Nieprawidlowy typ pliku: ${file.name}. Dozwolone: JPG, PNG, WEBP, AVIF.`)
  }

  if (file.size > PRODUCT_IMAGE_MAX_SIZE_BYTES) {
    throw new Error(`Plik ${file.name} jest za duzy. Maksymalny rozmiar to 8 MB.`)
  }
}

export const buildProductImagePath = (productId: string, file: File): string => {
  const extension = getSafeImageExtension(file)
  const safeBaseName = file.name
    .replace(/\.[^.]+$/, '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 50) || 'image'

  return `products/${productId}/${Date.now()}-${crypto.randomUUID()}-${safeBaseName}.${extension}`
}

const buildHomepageImagePath = (sectionKey: HomepageSectionKey, file: File): string => {
  const extension = getSafeImageExtension(file)
  const safeBaseName = file.name
    .replace(/\.[^.]+$/, '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 50) || 'image'

  return `sections/${sectionKey}/${Date.now()}-${crypto.randomUUID()}-${safeBaseName}.${extension}`
}

const getSafeImageExtension = (file: File) => {
  const extensionByType: Record<string, string> = {
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp',
    'image/avif': 'avif',
  }

  return extensionByType[file.type] ?? 'jpg'
}
