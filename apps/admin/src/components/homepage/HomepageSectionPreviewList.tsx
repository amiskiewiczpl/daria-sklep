import { HomepageSection, canHomepageSectionBePublic } from '@rosna/shared'
import { StatusBadge } from '../ui'
import { homepageSectionLabels } from './homepageLabels'

interface HomepageSectionPreviewListProps {
  sections: HomepageSection[]
  selectedId: string | null
  onSelect: (sectionId: string) => void
  onMove: (sectionId: string, direction: -1 | 1) => void
}

const HomepageSectionPreviewList = ({ sections, selectedId, onSelect, onMove }: HomepageSectionPreviewListProps) => (
  <aside className="admin-card h-fit space-y-4">
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-accent">Sekcje</p>
      <h2 className="mt-2 text-xl font-semibold">Preview listy</h2>
    </div>

    <div className="space-y-3">
      {sections.map((section, index) => (
        <article
          key={section.id}
          className={`rounded-lg border p-4 transition ${
            selectedId === section.id ? 'border-brand-accent bg-brand-accent/10' : 'border-brand-border bg-brand-background'
          }`}
        >
          <button type="button" className="block w-full text-left" onClick={() => onSelect(section.id)}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold">{homepageSectionLabels[section.key]}</p>
                <p className="mt-1 line-clamp-1 text-sm text-brand-muted">{section.title}</p>
              </div>
              <StatusBadge kind="homepage" status={section.status ?? 'draft'} />
            </div>
            <p className="mt-3 text-xs text-brand-muted">
              {canHomepageSectionBePublic(section) ? 'Widoczna publicznie' : 'Niewidoczna w storefront'}
            </p>
          </button>

          <div className="mt-3 grid grid-cols-2 gap-2">
            <button type="button" className="admin-button-secondary min-h-10 px-3 py-2" disabled={index === 0} onClick={() => onMove(section.id, -1)}>
              W gore
            </button>
            <button
              type="button"
              className="admin-button-secondary min-h-10 px-3 py-2"
              disabled={index === sections.length - 1}
              onClick={() => onMove(section.id, 1)}
            >
              W dol
            </button>
          </div>
        </article>
      ))}
    </div>
  </aside>
)

export default HomepageSectionPreviewList
