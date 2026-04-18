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

export type ProductMaterial = 'len' | 'bawełna' | 'wiskoza' | 'bambus' | 'wełna'

export type ProductAvailability = 'in-stock' | 'made-to-order'
export type ProductPublishStatus = 'draft' | 'published' | 'archived' | 'hidden'
export type ProductStatus = ProductAvailability
export type SortOption = 'featured' | 'newest' | 'price-asc' | 'price-desc'

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

export type SizeRange = 'XXS-S' | 'M-L' | 'XL-XXL'
export type ProductLabel = 'nowość' | 'bestseller' | 'kolekcja'

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
  sortOrder: number
  isPrimary: boolean
}

export interface Product {
  id: string
  slug: string
  name: string
  description: string
  price: number
  category: ProductCategorySlug
  categoryLabel: string
  status: ProductAvailability
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
}

export interface ProductDraftInput {
  id?: string
  slug: string
  name: string
  description: string
  price: number
  category: ProductCategorySlug
  categoryLabel: string
  availability: ProductAvailability
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

export type HomepageSectionKey =
  | 'hero'
  | 'new_collection'
  | 'materials'
  | 'made_to_order'
  | 'story'
  | 'lookbook'
  | 'newsletter'

export interface HomepageSection {
  id: string
  key: HomepageSectionKey
  title: string
  eyebrow: string
  body: string
  ctaLabel?: string
  ctaHref?: string
  imageUrl?: string
  sortOrder: number
  isPublished: boolean
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

export interface AdminProfile {
  id: string
  email: string
  role: 'admin' | 'seller'
  fullName?: string
}
