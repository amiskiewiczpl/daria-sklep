import { Category, Collection, Material } from '@rosna/shared'
import { useCallback, useEffect, useState } from 'react'
import { listCategories, listCollections, listMaterials } from '../data/adminRepository'

export const useProductOptions = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const [collections, setCollections] = useState<Collection[]>([])
  const [materials, setMaterials] = useState<Material[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const [categoryData, collectionData, materialData] = await Promise.all([
        listCategories(),
        listCollections(),
        listMaterials(),
      ])
      setCategories(categoryData)
      setCollections(collectionData)
      setMaterials(materialData)
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Nie udalo sie pobrac slownikow produktu.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void refresh()
  }, [refresh])

  return { categories, collections, materials, loading, error, refresh }
}
