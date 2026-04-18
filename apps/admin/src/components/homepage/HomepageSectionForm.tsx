import { Collection, HomepagePublishStatus, HomepageSection, Product, canHomepageSectionBePublic } from '@rosna/shared'
import { FormEvent, useEffect, useState } from 'react'
import { HomepageSectionFormValues, saveHomepageSection, uploadHomepageSectionImage } from '../../data/adminRepository'
import { ImageUploader, StatusBadge, StatusSelector, TextInput, Textarea } from '../ui'
import { homepageSectionLabels } from './homepageLabels'

interface HomepageSectionFormProps {
  section: HomepageSection
  products: Product[]
  collections: Collection[]
  onSaved: () => void
}

const toFormValues = (section: HomepageSection): HomepageSectionFormValues => ({
  id: section.id,
  key: section.key,
  title: section.title,
  subtitle: section.subtitle || section.eyebrow || '',
  body: section.body,
  ctaLabel: section.ctaLabel ?? '',
  ctaHref: section.ctaHref ?? '',
  imageUrl: section.imageUrl ?? '',
  imagePath: section.imagePath,
  visibility: section.visibility ?? (section.isPublished ? 'public' : 'private'),
  status: section.status ?? (section.isPublished ? 'published' : 'draft'),
  sortOrder: section.sortOrder,
  linkedCollectionId: section.linkedCollectionId,
  linkedProductIds: section.linkedProductIds ?? [],
})

const HomepageSectionForm = ({ section, products, collections, onSaved }: HomepageSectionFormProps) => {
  const [form, setForm] = useState<HomepageSectionFormValues>(() => toFormValues(section))
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  useEffect(() => {
    setForm(toFormValues(section))
    setMessage(null)
  }, [section])

  const updateForm = (patch: Partial<HomepageSectionFormValues>) => {
    setForm((current) => ({ ...current, ...patch }))
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setSaving(true)
    setMessage(null)

    try {
      await saveHomepageSection(form)
      setMessage({ type: 'success', text: 'Sekcja homepage zostala zapisana.' })
      onSaved()
    } catch (error) {
      setMessage({ type: 'error', text: error instanceof Error ? error.message : 'Nie udalo sie zapisac sekcji.' })
    } finally {
      setSaving(false)
    }
  }

  const uploadImage = async (file: File) => {
    setUploading(true)
    setMessage(null)

    try {
      const uploaded = await uploadHomepageSectionImage(form.key, file)
      updateForm({ imageUrl: uploaded.url, imagePath: uploaded.path })
      setMessage({ type: 'success', text: 'Obraz sekcji zostal wgrany. Zapisz sekcje, aby utrwalic zmiane.' })
    } catch (error) {
      setMessage({ type: 'error', text: error instanceof Error ? error.message : 'Nie udalo sie wgrac obrazu.' })
    } finally {
      setUploading(false)
    }
  }

  const toggleProduct = (productId: string) => {
    updateForm({
      linkedProductIds: form.linkedProductIds.includes(productId)
        ? form.linkedProductIds.filter((id) => id !== productId)
        : [...form.linkedProductIds, productId],
    })
  }

  const isPublicPreview = canHomepageSectionBePublic(form)

  return (
    <form onSubmit={handleSubmit} className="admin-card space-y-6">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-accent">{form.key}</p>
          <h2 className="mt-2 text-2xl font-semibold">{homepageSectionLabels[form.key]}</h2>
        </div>
        <button type="submit" className="admin-button" disabled={saving}>
          {saving ? 'Zapisywanie...' : 'Zapisz sekcje'}
        </button>
      </div>

      <section className="rounded-lg border border-brand-border bg-brand-background p-4">
        <div className="flex flex-wrap items-center gap-3">
          <StatusBadge kind="homepage" status={form.status} />
          <span className="text-sm text-brand-muted">
            {isPublicPreview ? 'Po zapisie sekcja bedzie widoczna publicznie.' : 'Preview admina: sekcja nie bedzie widoczna w storefront.'}
          </span>
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-2">
        <TextInput label="Title" value={form.title} onChange={(event) => updateForm({ title: event.target.value })} required />
        <TextInput label="Subtitle" value={form.subtitle} onChange={(event) => updateForm({ subtitle: event.target.value })} />
        <TextInput label="CTA label" value={form.ctaLabel} onChange={(event) => updateForm({ ctaLabel: event.target.value })} />
        <TextInput label="CTA href" value={form.ctaHref} onChange={(event) => updateForm({ ctaHref: event.target.value })} />
        <StatusSelector
          kind="homepage"
          value={form.status}
          onChange={(status: HomepagePublishStatus) => updateForm({ status })}
        />
        <label>
          <span className="admin-label">Widocznosc</span>
          <select className="admin-input" value={form.visibility} onChange={(event) => updateForm({ visibility: event.target.value as HomepageSectionFormValues['visibility'] })}>
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </label>
        <label>
          <span className="admin-label">Kolejnosc</span>
          <input className="admin-input" type="number" min={0} value={form.sortOrder} onChange={(event) => updateForm({ sortOrder: Number(event.target.value) })} />
        </label>
        <label>
          <span className="admin-label">Powiazana kolekcja</span>
          <select className="admin-input" value={form.linkedCollectionId ?? ''} onChange={(event) => updateForm({ linkedCollectionId: event.target.value || undefined })}>
            <option value="">Brak</option>
            {collections.map((collection) => (
              <option key={collection.id} value={collection.id}>
                {collection.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <Textarea label="Body" value={form.body} onChange={(event) => updateForm({ body: event.target.value })} />

      <section className="rounded-lg border border-brand-border bg-white p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-accent">Preview admina</p>
        <h3 className="mt-3 text-2xl font-semibold text-brand">{form.title || homepageSectionLabels[form.key]}</h3>
        {form.subtitle ? <p className="mt-2 text-sm text-brand-accent">{form.subtitle}</p> : null}
        {form.body ? <p className="mt-3 max-w-2xl text-sm leading-6 text-brand-muted">{form.body}</p> : null}
        {form.ctaLabel ? <p className="mt-4 text-sm font-semibold text-brand">{form.ctaLabel} -&gt; {form.ctaHref || '#'}</p> : null}
      </section>

      <TextInput label="Image URL" value={form.imageUrl} onChange={(event) => updateForm({ imageUrl: event.target.value, imagePath: undefined })} />
      <ImageUploader
        label="Upload obrazu"
        helper="JPG, PNG, WEBP lub AVIF. Po uploadzie zapisz sekcje."
        previewUrl={form.imageUrl}
        disabled={uploading}
        onChange={(files) => {
          const file = files[0]
          if (!file) return
          void uploadImage(file)
        }}
      />

      <section>
        <div className="mb-3 flex items-center justify-between gap-3">
          <div>
            <p className="admin-label mb-1">Powiazane produkty</p>
            <p className="text-sm text-brand-muted">Opcjonalne dla bestsellery, lookbook, nowa kolekcja i podobnych sekcji.</p>
          </div>
          <p className="text-sm text-brand-muted">{form.linkedProductIds.length} wybrane</p>
        </div>
        <div className="grid max-h-80 gap-2 overflow-y-auto rounded-lg border border-brand-border bg-brand-background p-3 md:grid-cols-2">
          {products.map((product) => (
            <label key={product.id} className="flex items-center gap-3 rounded-lg bg-white px-3 py-2 text-sm">
              <input type="checkbox" checked={form.linkedProductIds.includes(product.id)} onChange={() => toggleProduct(product.id)} />
              <span className="min-w-0">
                <span className="block truncate font-semibold">{product.name}</span>
                <span className="block truncate text-xs text-brand-muted">{product.slug}</span>
              </span>
            </label>
          ))}
        </div>
      </section>

      {message ? (
        <p className={`rounded-lg border p-3 text-sm ${message.type === 'success' ? 'border-emerald-200 bg-emerald-50 text-emerald-800' : 'border-red-200 bg-red-50 text-red-800'}`}>
          {message.text}
        </p>
      ) : null}
    </form>
  )
}

export default HomepageSectionForm
