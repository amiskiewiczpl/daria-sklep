import { ProductImage } from '@rosna/shared'
import { useCallback, useEffect, useState } from 'react'
import { listMediaItems } from '../data/adminRepository'

export const useMediaItems = () => {
  const [items, setItems] = useState<ProductImage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      setItems(await listMediaItems())
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Nie udalo sie pobrac mediow.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void refresh()
  }, [refresh])

  return { items, loading, error, refresh }
}
