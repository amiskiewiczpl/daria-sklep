import { HomepageSection } from '@rosna/shared'
import { useState } from 'react'
import { saveHomepageSection } from '../data/adminRepository'

const HomepageEditor = ({ sections, onSaved }: { sections: HomepageSection[]; onSaved: () => void }) => {
  const [drafts, setDrafts] = useState(sections)
  const [message, setMessage] = useState('')

  const updateSection = (id: string, patch: Partial<HomepageSection>) => {
    setDrafts((current) => current.map((section) => (section.id === id ? { ...section, ...patch } : section)))
  }

  const saveAll = async () => {
    setMessage('')
    await Promise.all(drafts.map(saveHomepageSection))
    setMessage('Sekcje homepage zapisane.')
    onSaved()
  }

  return (
    <section className="admin-card space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase text-brand-accent">Homepage</p>
          <h2 className="mt-2 text-2xl font-semibold">Sekcje strony głównej</h2>
        </div>
        <button type="button" className="admin-button" onClick={saveAll}>Zapisz sekcje</button>
      </div>

      <div className="grid gap-5">
        {drafts.map((section) => (
          <article key={section.id} className="rounded-lg border border-brand-border bg-brand-background p-5">
            <div className="mb-4 flex items-center justify-between gap-4">
              <p className="font-semibold">{section.key}</p>
              <label className="inline-flex items-center gap-2 text-sm">
                <input type="checkbox" checked={section.isPublished} onChange={(event) => updateSection(section.id, { isPublished: event.target.checked })} />
                Published
              </label>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <label>
                <span className="admin-label">Eyebrow</span>
                <input className="admin-input" value={section.eyebrow} onChange={(event) => updateSection(section.id, { eyebrow: event.target.value })} />
              </label>
              <label>
                <span className="admin-label">Tytuł</span>
                <input className="admin-input" value={section.title} onChange={(event) => updateSection(section.id, { title: event.target.value })} />
              </label>
              <label className="md:col-span-2">
                <span className="admin-label">Treść</span>
                <textarea className="admin-input min-h-28" value={section.body} onChange={(event) => updateSection(section.id, { body: event.target.value })} />
              </label>
              <label>
                <span className="admin-label">CTA label</span>
                <input className="admin-input" value={section.ctaLabel ?? ''} onChange={(event) => updateSection(section.id, { ctaLabel: event.target.value })} />
              </label>
              <label>
                <span className="admin-label">CTA href</span>
                <input className="admin-input" value={section.ctaHref ?? ''} onChange={(event) => updateSection(section.id, { ctaHref: event.target.value })} />
              </label>
              <label className="md:col-span-2">
                <span className="admin-label">Image URL</span>
                <input className="admin-input" value={section.imageUrl ?? ''} onChange={(event) => updateSection(section.id, { imageUrl: event.target.value })} />
              </label>
            </div>
          </article>
        ))}
      </div>

      {message ? <p className="rounded-lg border border-brand-border bg-brand-background p-3 text-sm text-brand-muted">{message}</p> : null}
    </section>
  )
}

export default HomepageEditor
