export type ProductCategorySlug =
  | 'legginsy'
  | 'spodnie'
  | 'koszule'
  | 'koszulki'
  | 'torby'
  | 'gorsety'
  | 'spodnice'
  | 'sukienki'
  | 'welna'
  | 'made-to-order'

export type ProductMaterial = 'len' | 'bawelna' | 'bawełna' | 'wiskoza' | 'bambus' | 'welna' | 'wełna'
export type ProductAvailability = 'in-stock' | 'made-to-order'
export type ProductPublishStatus = 'draft' | 'published' | 'archived' | 'hidden'
export type HomepagePublishStatus = 'draft' | 'published' | 'hidden'
export type ProductStatus = ProductAvailability
export type ProductContentStatus = ProductPublishStatus
export type ProductProductionType = 'in_stock' | 'made_to_order'
export type ProductImageType = 'packshot' | 'lifestyle' | 'detail'
export type SortOption = 'featured' | 'newest' | 'price-asc' | 'price-desc'

export type HomepageSectionKey =
  | 'announcement_bar'
  | 'hero'
  | 'new_collection'
  | 'materials'
  | 'bestsellers'
  | 'made_to_order'
  | 'story'
  | 'lookbook'
  | 'newsletter'

export type HomepageSectionType = HomepageSectionKey
export type SizeRange = 'XXS-S' | 'M-L' | 'XL-XXL'
export type ProductLabel = 'nowość' | 'nowosc' | 'bestseller' | 'kolekcja'
export type AdminRole = 'admin' | 'editor' | 'seller'
export type HomepageVisibility = 'public' | 'private'

export interface ShopFilters {
  categories: ProductCategorySlug[]
  materials: ProductMaterial[]
  sizes: string[]
  statuses: ProductAvailability[]
  colors: string[]
  patterns: string[]
  onlyNew: boolean
  sortBy: SortOption
}

export interface ShopFilterOptions {
  categories: ProductCategorySlug[]
  materials: ProductMaterial[]
  sizes: string[]
  statuses: ProductAvailability[]
  colors: string[]
  patterns: string[]
}

export interface ProductVariant {
  id: string
  color: string
  pattern?: string
  material: ProductMaterial
  availableSizes: SizeRange[]
  priceModifier?: number
  leadTimeDays?: number
  inStock: boolean
  images?: string[]
}

export interface ProductImage {
  id: string
  productId: string
  url: string
  path: string
  alt: string
  imageType?: ProductImageType
  sortOrder: number
  isPrimary: boolean
}

export interface Product {
  id: string
  slug: string
  name: string
  shortDescription?: string
  description: string
  price: number
  compareAtPrice?: number
  currency?: string
  categoryId?: string
  collectionId?: string
  category: ProductCategorySlug
  categoryLabel: string
  status: ProductAvailability
  productionType?: ProductProductionType
  leadTimeDays?: number
  publishStatus?: ProductPublishStatus
  images: string[]
  imageItems?: ProductImage[]
  variants: ProductVariant[]
  sizes: string[]
  colors: string[]
  materials: ProductMaterial[]
  tags: ProductLabel[]
  collection?: string
  collectionLabel?: string
  isNew: boolean
  isBestSeller: boolean
  isFeatured?: boolean
  isMadeToOrder?: boolean
  createdAt?: string
  updatedAt?: string
}

export interface ProductDraftInput {
  id?: string
  slug: string
  name: string
  shortDescription?: string
  description: string
  price: number
  compareAtPrice?: number
  currency?: string
  categoryId?: string
  collectionId?: string
  category: ProductCategorySlug
  categoryLabel: string
  availability: ProductAvailability
  productionType?: ProductProductionType
  leadTimeDays?: number
  publishStatus: ProductPublishStatus
  sizes: string[]
  colors: string[]
  materials: ProductMaterial[]
  tags: string[]
  isNew: boolean
  isBestSeller: boolean
  isFeatured: boolean
  isMadeToOrder: boolean
}

export interface HomepageSection {
  id: string
  key: HomepageSectionKey
  title: string
  subtitle: string
  eyebrow: string
  body: string
  ctaLabel?: string
  ctaHref?: string
  imageUrl?: string
  imagePath?: string
  sortOrder: number
  isPublished: boolean
  visibility?: HomepageVisibility
  status?: HomepagePublishStatus
  linkedCollectionId?: string
  linkedProductIds?: string[]
  items?: HomepageSectionItem[]
}

export interface HomepageSectionItem {
  id: string
  sectionId: string
  title: string
  subtitle?: string
  body?: string
  ctaLabel?: string
  ctaHref?: string
  imageUrl?: string
  imagePath?: string
  linkedProductId?: string
  linkedCategoryId?: string
  linkedCollectionId?: string
  sortOrder: number
  status: HomepagePublishStatus
}

export interface CartItem {
  product: Product
  selectedVariantId?: string
  selectedSize: string
  selectedColor: string
  selectedMaterial?: ProductMaterial
  quantity: number
}

export interface Cart {
  items: CartItem[]
  total: number
}

export interface AdminUser {
  id: string
  email: string
  role: AdminRole
  fullName?: string
  avatarUrl?: string | null
  isActive?: boolean
}

export type AdminProfile = AdminUser

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  sortOrder: number
  isActive: boolean
}

export interface Collection {
  id: string
  name: string
  slug: string
  description?: string
  sortOrder: number
  isActive: boolean
}

export interface Material {
  id: string
  name: string
  slug: string
  description?: string
  careNotes?: string
  sortOrder: number
  isActive: boolean
}

export interface AdminProductFormValues {
  id?: string
  name: string
  slug: string
  shortDescription: string
  description: string
  price: number
  compareAtPrice?: number
  currency: string
  categoryId: string
  collectionId?: string
  productionType: ProductProductionType
  leadTimeDays?: number
  status: ProductPublishStatus
  isNew: boolean
  isBestSeller: boolean
  isFeatured: boolean
  sortOrder: number
  sizes: string[]
  colors: string[]
  patterns: string[]
  materials: string[]
  tags: string[]
}
