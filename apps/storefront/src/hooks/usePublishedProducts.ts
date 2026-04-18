import { Product } from '@rosna/shared'
import { useEffect, useState } from 'react'
import { getPublishedProducts } from '../services/storefrontRepository'

export const usePublishedProducts = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    getPublishedProducts()
      .then((nextProducts) => {
        if (active) {
          setProducts(nextProducts)
          setError('')
        }
      })
      .catch((loadError) => {
        if (active) {
          setError(loadError instanceof Error ? loadError.message : 'Nie udało się pobrać produktów.')
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false)
        }
      })

    return () => {
      active = false
    }
  }, [])

  return { products, loading, error }
}
