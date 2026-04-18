import { products } from '../data/products'
import { productCategories } from '../data/productCategories'
import { Product, ProductCategorySlug } from '../types'

export interface CategorySummary {
  slug: ProductCategorySlug
  label: string
  path: string
}

export const getProducts = (): Product[] => products

export const getPublishedLocalProducts = (): Product[] =>
  products.filter((product) => product.publishStatus !== 'draft' && product.publishStatus !== 'hidden')

export const getProductBySlug = (slug?: string): Product | undefined =>
  products.find((product) => product.slug === slug)

export const getProductsByCategory = (categorySlug?: string): Product[] => {
  if (!categorySlug) {
    return []
  }

  return products.filter((product) => product.category === categorySlug)
}

export const getFeaturedProducts = (limit = 4): Product[] => {
  const featured = products.filter((product) => product.isBestSeller || product.isNew)
  return featured.length >= limit ? featured.slice(0, limit) : products.slice(0, limit)
}

export const getCategorySummaries = (): CategorySummary[] =>
  productCategories.map((category) => ({ slug: category.slug, label: category.label, path: category.path }))

export const getCategoryBySlug = (slug?: string): CategorySummary | undefined =>
  productCategories.find((category) => category.slug === slug)
