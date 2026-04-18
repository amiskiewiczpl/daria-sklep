import { Product, ProductDraftInput } from '@rosna/shared'
import { FormEvent, useMemo, useState } from 'react'
import { moveImage, saveProduct, setPrimaryImage, uploadProductImage } from '../data/adminRepository'

const categories: ProductDraftInput['category'][] = [
  'legginsy',
  'spodnie',
  'koszule',
  'koszulki',
  'torby',
  'gorsety',
  'spodnice',
  'sukienki',
  'welna',
  'made-to-order',
]

const materials: ProductDraftInput['materials'][number][] = ['len', 'bawełna', 'wiskoza', 'bambus', 'wełna']
const publishStatuses: ProductDraftInput['publishStatus'][] = ['draft', 'published', 'archived', 'hidden']

const splitValue = (value: string) =>
  value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)

const ProductEditor = ({ product, onSaved }: { product?: Product; onSaved: () => void }) => {
  const [form, setForm] = useState<ProductDraftInput>(() => ({
    id: product?.id,
    slug: product?.slug ?? '',
    name: product?.name ?? '',
    description: product?.description ?? '',
    price: product?.price ?? 0,
    category: product?.category ?? 'spodnie',
    categoryLabel: product?.categoryLabel ?? 'Spodnie',
    availability: product?.status ?? 'in-stock',
    publishStatus: product?.publishStatus ?? 'draft',
    sizes: product?.sizes ?? ['XXS', 'XS', 'S', 'M', 'L', 'XL'],
    colors: product?.colors ?? [],
    materials: product?.materials ?? ['len'],
    tags: product?.tags ?? [],
    isNew: product?.isNew ?? false,
    isBestSeller: product?.isBestSeller ?? false,
    isFeatured: product?.isFeatured ?? false,
    isMadeToOrder: product?.isMadeToOrder ?? false,
  }))
  const [files, setFiles] = useState<FileList | null>(null)
  const [message, setMessage] = useState('')
  const [saving, setSaving] = useState(false)

  const imageCount = useMemo(() => product?.imageItems?.length ?? 0, [product])

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setSaving(true)
    setMessage('')

    try {
      const productId = await saveProduct(form)

      if (files) {
        await Promise.all(Array.from(files).map((file, index) => uploadProductImage(productId, file, imageCount + index)))
      }

      setMessage('Produkt zapisany.')
      onSaved()
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Nie udało się zapisać produktu.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="admin-card space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase text-brand-accent">Produkt</p>
          <h2 className="mt-2 text-2xl font-semibold">{product ? 'Edycja produktu' : 'Nowy produkt'}</h2>
        </div>
        <button type="submit" className="admin-button" disabled={saving}>
          {saving ? 'Zapisywanie...' : 'Zapisz produkt'}
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label>
          <span className="admin-label">Nazwa</span>
          <input className="admin-input" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} required />
        </label>
        <label>
          <span className="admin-label">Slug</span>
          <input className="admin-input" value={form.slug} onChange={(event) => setForm({ ...form, slug: event.target.value })} required />
        </label>
        <label>
          <span className="admin-label">Cena</span>
          <input className="admin-input" type="number" min={0} value={form.price} onChange={(event) => setForm({ ...form, price: Number(event.target.value) })} required />
        </label>
        <label>
          <span className="admin-label">Kategoria</span>
          <select className="admin-input" value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value as ProductDraftInput['category'], categoryLabel: event.target.value })}>
            {categories.map((category) => <option key={category} value={category}>{category}</option>)}
          </select>
        </label>
        <label>
          <span className="admin-label">Dostępność</span>
          <select className="admin-input" value={form.availability} onChange={(event) => setForm({ ...form, availability: event.target.value as ProductDraftInput['availability'] })}>
            <option value="in-stock">Dostępny od ręki</option>
            <option value="made-to-order">Made to order</option>
          </select>
        </label>
        <label>
          <span className="admin-label">Status publikacji</span>
          <select className="admin-input" value={form.publishStatus} onChange={(event) => setForm({ ...form, publishStatus: event.target.value as ProductDraftInput['publishStatus'] })}>
            {publishStatuses.map((status) => <option key={status} value={status}>{status}</option>)}
          </select>
        </label>
      </div>

      <label>
        <span className="admin-label">Opis</span>
        <textarea className="admin-input min-h-32" value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} required />
      </label>

      <div className="grid gap-4 md:grid-cols-3">
        <label>
          <span className="admin-label">Rozmiary, po przecinku</span>
          <input className="admin-input" value={form.sizes.join(', ')} onChange={(event) => setForm({ ...form, sizes: splitValue(event.target.value) })} />
        </label>
        <label>
          <span className="admin-label">Kolory, po przecinku</span>
          <input className="admin-input" value={form.colors.join(', ')} onChange={(event) => setForm({ ...form, colors: splitValue(event.target.value) })} />
        </label>
        <label>
          <span className="admin-label">Tagi, po przecinku</span>
          <input className="admin-input" value={form.tags.join(', ')} onChange={(event) => setForm({ ...form, tags: splitValue(event.target.value) })} />
        </label>
      </div>

      <div>
        <p className="admin-label">Materiały</p>
        <div className="flex flex-wrap gap-3">
          {materials.map((material) => (
            <label key={material} className="inline-flex items-center gap-2 rounded-lg border border-brand-border bg-brand-background px-4 py-3 text-sm">
              <input
                type="checkbox"
                checked={form.materials.includes(material)}
                onChange={(event) => {
                  const next = event.target.checked
                    ? [...form.materials, material]
                    : form.materials.filter((item) => item !== material)
                  setForm({ ...form, materials: next })
                }}
              />
              {material}
            </label>
          ))}
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-4">
        {[
          ['isNew', 'New'],
          ['isBestSeller', 'Bestseller'],
          ['isFeatured', 'Featured'],
          ['isMadeToOrder', 'Made to order'],
        ].map(([key, label]) => (
          <label key={key} className="inline-flex items-center justify-center gap-2 rounded-lg border border-brand-border bg-brand-background px-4 py-3 text-sm">
            <input
              type="checkbox"
              checked={Boolean(form[key as keyof ProductDraftInput])}
              onChange={(event) => setForm({ ...form, [key]: event.target.checked })}
            />
            {label}
          </label>
        ))}
      </div>

      <label>
        <span className="admin-label">Upload zdjęć</span>
        <input className="admin-input" type="file" accept="image/*" multiple onChange={(event) => setFiles(event.target.files)} />
      </label>

      {product?.imageItems?.length ? (
        <div>
          <p className="admin-label">Zdjęcia produktu</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {product.imageItems.map((image) => (
              <article key={image.id} className="rounded-lg border border-brand-border bg-brand-background p-3">
                <img src={image.url} alt={image.alt} className="aspect-[4/5] w-full rounded-lg object-cover" />
                <div className="mt-3 grid grid-cols-3 gap-2">
                  <button type="button" className="admin-button-secondary px-2" onClick={() => moveImage(image, -1).then(onSaved)}>↑</button>
                  <button type="button" className="admin-button-secondary px-2" onClick={() => moveImage(image, 1).then(onSaved)}>↓</button>
                  <button type="button" className="admin-button-secondary px-2" onClick={() => setPrimaryImage(product.id, image.id).then(onSaved)}>
                    {image.isPrimary ? 'Main' : 'Set'}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      ) : null}

      {message ? <p className="rounded-lg border border-brand-border bg-brand-background p-3 text-sm text-brand-muted">{message}</p> : null}
    </form>
  )
}

export default ProductEditor
