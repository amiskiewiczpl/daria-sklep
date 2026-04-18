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

export type ProductStatus = 'in-stock' | 'made-to-order'

export type SortOption = 'featured' | 'newest' | 'price-asc' | 'price-desc'

export interface ShopFilters {
  categories: ProductCategorySlug[]
  materials: ProductMaterial[]
  sizes: string[]
  statuses: ProductStatus[]
  colors: string[]
  patterns: string[]
  onlyNew: boolean
  sortBy: SortOption
}

export interface ShopFilterOptions {
  categories: ProductCategorySlug[]
  materials: ProductMaterial[]
  sizes: string[]
  statuses: ProductStatus[]
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

export interface Product {
  id: string
  slug: string
  name: string
  description: string
  price: number
  category: ProductCategorySlug
  categoryLabel: string
  status: ProductStatus
  images: string[]
  variants: ProductVariant[]
  sizes: string[]
  colors: string[]
  materials: ProductMaterial[]
  tags: ProductLabel[]
  collection?: string
  collectionLabel?: string
  isNew: boolean
  isBestSeller: boolean
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
