import { HomepageSection } from '@rosna/shared'
import { useCallback, useEffect, useState } from 'react'
import { listHomepageSections } from '../data/adminRepository'

export const useHomepageSections = () => {
  const [sections, setSections] = useState<HomepageSection[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      setSections(await listHomepageSections())
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Nie udalo sie pobrac sekcji homepage.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void refresh()
  }, [refresh])

  return { sections, loading, error, refresh }
}
