import { Product, ShopFilters } from '@rosna/shared'
import { useEffect, useState } from 'react'
import { getPublishedProductsByShopFilters } from '../services/storefrontRepository'

export const useProductListing = (filters: ShopFilters) => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const filtersKey = JSON.stringify(filters)

  useEffect(() => {
    let active = true
    const parsedFilters = JSON.parse(filtersKey) as ShopFilters

    setLoading(true)
    getPublishedProductsByShopFilters(parsedFilters)
      .then((nextProducts) => {
        if (!active) return
        setProducts(nextProducts)
        setError('')
      })
      .catch((loadError) => {
        if (!active) return
        setError(loadError instanceof Error ? loadError.message : 'Nie udalo sie pobrac produktow.')
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [filtersKey])

  return { products, loading, error }
}
