import {
  Product,
  ProductCategorySlug,
  ProductLabel,
  ProductMaterial,
  SizeRange,
} from '../types'

export const buildCategoryUrl = (category: ProductCategorySlug) => `/kategoria/${category}`
export const buildProductUrl = (slug: string) => `/produkt/${slug}`

export const filterByCategory = (products: Product[], category: ProductCategorySlug) =>
  products.filter((product) => product.category === category)

export const filterByStatus = (products: Product[], status: 'in-stock' | 'made-to-order') =>
  products.filter((product) => product.status === status)

export const filterByMaterial = (products: Product[], material: ProductMaterial) =>
  products.filter((product) => product.materials.includes(material))

export const filterBySizeRange = (products: Product[], sizeRange: SizeRange) =>
  products.filter((product) =>
    product.variants.some((variant) => variant.availableSizes.includes(sizeRange))
  )

export const filterByLabel = (products: Product[], label: ProductLabel) =>
  products.filter((product) => product.tags.includes(label))

export const filterByCollection = (products: Product[], collection: string) =>
  products.filter((product) => product.collection === collection)

export const sortByLowestPrice = (products: Product[]) =>
  [...products].sort((a, b) => a.price - b.price)

export const sortByHighestPrice = (products: Product[]) =>
  [...products].sort((a, b) => b.price - a.price)

export const sortByNewest = (products: Product[]) =>
  [...products].sort((a, b) => Number(b.isNew) - Number(a.isNew))

export const sortByBestSeller = (products: Product[]) =>
  [...products].sort((a, b) => Number(b.isBestSeller) - Number(a.isBestSeller))

export const uniqueMaterials = (products: Product[]) =>
  Array.from(new Set(products.flatMap((product) => product.materials)))

export const uniqueCategories = (products: Product[]) =>
  Array.from(new Set(products.map((product) => product.category)))
