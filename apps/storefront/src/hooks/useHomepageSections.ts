import { HomepageSection } from '@rosna/shared'
import { useEffect, useState } from 'react'
import { getPublishedHomepageSections } from '../services/storefrontRepository'

export const useHomepageSections = () => {
  const [sections, setSections] = useState<HomepageSection[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    getPublishedHomepageSections()
      .then((nextSections) => {
        if (!active) return
        setSections(nextSections)
        setError('')
      })
      .catch((loadError) => {
        if (!active) return
        setError(loadError instanceof Error ? loadError.message : 'Nie udalo sie pobrac sekcji homepage.')
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [])

  return { sections, loading, error }
}
