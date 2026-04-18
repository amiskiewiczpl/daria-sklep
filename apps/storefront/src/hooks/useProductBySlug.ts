import { Product } from '@rosna/shared'
import { useEffect, useState } from 'react'
import { getPublishedProductBySlug } from '../services/storefrontRepository'

export const useProductBySlug = (slug?: string) => {
  const [product, setProduct] = useState<Product | undefined>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    if (!slug) {
      setProduct(undefined)
      setLoading(false)
      return () => {
        active = false
      }
    }

    setLoading(true)
    getPublishedProductBySlug(slug)
      .then((nextProduct) => {
        if (!active) return
        setProduct(nextProduct)
        setError('')
      })
      .catch((loadError) => {
        if (!active) return
        setError(loadError instanceof Error ? loadError.message : 'Nie udalo sie pobrac produktu.')
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [slug])

  return { product, loading, error }
}
