import { Collection, HomepageSection, Product } from '@rosna/shared'
import { useEffect, useMemo, useState } from 'react'
import { reorderHomepageSections } from '../../data/adminRepository'
import HomepageSectionForm from './HomepageSectionForm'
import HomepageSectionPreviewList from './HomepageSectionPreviewList'

interface HomepageEditorProps {
  sections: HomepageSection[]
  products: Product[]
  collections: Collection[]
  onSaved: () => void
}

const HomepageEditor = ({ sections, products, collections, onSaved }: HomepageEditorProps) => {
  const orderedSections = useMemo(() => [...sections].sort((a, b) => a.sortOrder - b.sortOrder), [sections])
  const [selectedId, setSelectedId] = useState<string | null>(orderedSections[0]?.id ?? null)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  useEffect(() => {
    if (!selectedId && orderedSections[0]?.id) {
      setSelectedId(orderedSections[0].id)
    }
  }, [orderedSections, selectedId])

  const selectedSection = orderedSections.find((section) => section.id === selectedId) ?? orderedSections[0]

  const moveSection = async (sectionId: string, direction: -1 | 1) => {
    setMessage(null)
    const currentIndex = orderedSections.findIndex((section) => section.id === sectionId)
    const nextIndex = currentIndex + direction

    if (currentIndex < 0 || nextIndex < 0 || nextIndex >= orderedSections.length) return

    const nextSections = [...orderedSections]
    const [movedSection] = nextSections.splice(currentIndex, 1)
    nextSections.splice(nextIndex, 0, movedSection)

    try {
      await reorderHomepageSections(nextSections.map((section, index) => ({ id: section.id, sortOrder: index * 10 + 10 })))
      setMessage({ type: 'success', text: 'Kolejnosc sekcji zostala zapisana.' })
      onSaved()
    } catch (error) {
      setMessage({ type: 'error', text: error instanceof Error ? error.message : 'Nie udalo sie zmienic kolejnosci.' })
    }
  }

  if (!selectedSection) {
    return <p className="admin-card text-sm text-brand-muted">Brak sekcji homepage do edycji.</p>
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[360px_minmax(0,1fr)]">
      <div className="space-y-4">
        <HomepageSectionPreviewList sections={orderedSections} selectedId={selectedSection.id} onSelect={setSelectedId} onMove={(id, direction) => void moveSection(id, direction)} />
        {message ? (
          <p className={`rounded-lg border p-3 text-sm ${message.type === 'success' ? 'border-emerald-200 bg-emerald-50 text-emerald-800' : 'border-red-200 bg-red-50 text-red-800'}`}>
            {message.text}
          </p>
        ) : null}
      </div>
      <HomepageSectionForm section={selectedSection} products={products} collections={collections} onSaved={onSaved} />
    </div>
  )
}

export default HomepageEditor
