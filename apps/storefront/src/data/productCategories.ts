import { ProductCategorySlug } from '../types'

export interface ProductCategory {
  slug: ProductCategorySlug
  label: string
  path: string
}

export const productCategories: ProductCategory[] = [
  { slug: 'legginsy', label: 'Legginsy', path: '/kategoria/legginsy' },
  { slug: 'spodnie', label: 'Spodnie', path: '/kategoria/spodnie' },
  { slug: 'koszule', label: 'Koszule', path: '/kategoria/koszule' },
  { slug: 'koszulki', label: 'Koszulki', path: '/kategoria/koszulki' },
  { slug: 'torby', label: 'Torby', path: '/kategoria/torby' },
  { slug: 'gorsety', label: 'Gorsety', path: '/kategoria/gorsety' },
  { slug: 'spodnice', label: 'Spódnice', path: '/kategoria/spodnice' },
  { slug: 'sukienki', label: 'Sukienki', path: '/kategoria/sukienki' },
  { slug: 'welna', label: 'Wełna', path: '/kategoria/welna' },
  { slug: 'made-to-order', label: 'Made to order', path: '/kategoria/made-to-order' },
]
