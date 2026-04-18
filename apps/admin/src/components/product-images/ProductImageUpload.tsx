import { ProductImageType } from '@rosna/shared'
import { ChangeEvent, DragEvent, useMemo, useState } from 'react'
import {
  ProductImageUploadInput,
  PRODUCT_IMAGE_ALLOWED_TYPES,
  PRODUCT_IMAGE_MAX_SIZE_BYTES,
  uploadProductImage,
  validateProductImageFile,
} from '../../data/adminRepository'

interface QueuedImage {
  id: string
  file: File
  previewUrl: string
  altText: string
  imageType: ProductImageType
}

interface ProductImageUploadProps {
  productId: string
  nextSortOrder: number
  hasPrimaryImage: boolean
  onUploaded: () => void
}

const imageTypes: ProductImageType[] = ['packshot', 'lifestyle', 'detail']

const ProductImageUpload = ({ productId, nextSortOrder, hasPrimaryImage, onUploaded }: ProductImageUploadProps) => {
  const [queuedImages, setQueuedImages] = useState<QueuedImage[]>([])
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [uploading, setUploading] = useState(false)

  const allowedTypesLabel = useMemo(
    () => PRODUCT_IMAGE_ALLOWED_TYPES.map((type) => type.replace('image/', '').toUpperCase()).join(', '),
    [],
  )

  const queueFiles = (files: File[]) => {
    setMessage(null)

    try {
      files.forEach(validateProductImageFile)
      setQueuedImages((current) => [
        ...current,
        ...files.map((file) => ({
          id: crypto.randomUUID(),
          file,
          previewUrl: URL.createObjectURL(file),
          altText: buildDefaultAltText(file),
          imageType: 'packshot' as ProductImageType,
        })),
      ])
    } catch (error) {
      setMessage({ type: 'error', text: error instanceof Error ? error.message : 'Nie udalo sie dodac plikow.' })
    }
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    queueFiles(Array.from(event.target.files ?? []))
    event.target.value = ''
  }

  const handleDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault()
    queueFiles(Array.from(event.dataTransfer.files ?? []))
  }

  const updateQueuedImage = (id: string, patch: Partial<QueuedImage>) => {
    setQueuedImages((current) => current.map((item) => (item.id === id ? { ...item, ...patch } : item)))
  }

  const removeQueuedImage = (id: string) => {
    setQueuedImages((current) => {
      const removed = current.find((item) => item.id === id)
      if (removed) URL.revokeObjectURL(removed.previewUrl)
      return current.filter((item) => item.id !== id)
    })
  }

  const uploadQueuedImages = async () => {
    setUploading(true)
    setMessage(null)

    try {
      const uploads: ProductImageUploadInput[] = queuedImages.map((item, index) => ({
        productId,
        file: item.file,
        altText: item.altText.trim() || buildDefaultAltText(item.file),
        imageType: item.imageType,
        sortOrder: nextSortOrder + index * 10,
        isPrimary: !hasPrimaryImage && index === 0,
      }))

      await Promise.all(uploads.map(uploadProductImage))
      queuedImages.forEach((item) => URL.revokeObjectURL(item.previewUrl))
      setQueuedImages([])
      setMessage({ type: 'success', text: 'Zdjecia zostaly zapisane.' })
      onUploaded()
    } catch (error) {
      setMessage({ type: 'error', text: error instanceof Error ? error.message : 'Nie udalo sie przeslac zdjec.' })
    } finally {
      setUploading(false)
    }
  }

  return (
    <section className="space-y-5">
      <label
        className="flex min-h-44 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-brand-border bg-brand-background px-6 py-8 text-center transition hover:border-brand-accent hover:bg-white"
        onDragOver={(event) => event.preventDefault()}
        onDrop={handleDrop}
      >
        <span className="text-sm font-semibold text-brand">Przeciagnij zdjecia tutaj albo wybierz pliki</span>
        <span className="mt-2 max-w-lg text-sm leading-6 text-brand-muted">
          Dozwolone: {allowedTypesLabel}. Maksymalny rozmiar jednego pliku: {PRODUCT_IMAGE_MAX_SIZE_BYTES / 1024 / 1024} MB.
          Sciezka storage: products/{productId}/timestamp-uuid-nazwa.ext.
        </span>
        <input className="sr-only" type="file" accept={PRODUCT_IMAGE_ALLOWED_TYPES.join(',')} multiple onChange={handleInputChange} />
      </label>

      {queuedImages.length ? (
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {queuedImages.map((item) => (
              <article key={item.id} className="rounded-lg border border-brand-border bg-white p-3">
                <img src={item.previewUrl} alt={item.altText} className="aspect-[4/5] w-full rounded-lg object-cover" />
                <label className="mt-4 block">
                  <span className="admin-label">Alt text</span>
                  <input className="admin-input" value={item.altText} onChange={(event) => updateQueuedImage(item.id, { altText: event.target.value })} />
                </label>
                <label className="mt-3 block">
                  <span className="admin-label">Typ zdjecia</span>
                  <select
                    className="admin-input"
                    value={item.imageType}
                    onChange={(event) => updateQueuedImage(item.id, { imageType: event.target.value as ProductImageType })}
                  >
                    {imageTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </label>
                <button type="button" className="admin-button-secondary mt-3 w-full" onClick={() => removeQueuedImage(item.id)}>
                  Usun z kolejki
                </button>
              </article>
            ))}
          </div>
          <button type="button" className="admin-button" disabled={uploading} onClick={uploadQueuedImages}>
            {uploading ? 'Wgrywanie...' : `Wgraj zdjecia (${queuedImages.length})`}
          </button>
        </div>
      ) : null}

      {message ? (
        <p className={`rounded-lg border p-3 text-sm ${message.type === 'success' ? 'border-emerald-200 bg-emerald-50 text-emerald-800' : 'border-red-200 bg-red-50 text-red-800'}`}>
          {message.text}
        </p>
      ) : null}
    </section>
  )
}

const buildDefaultAltText = (file: File) =>
  file.name
    .replace(/\.[^.]+$/, '')
    .replace(/[-_]+/g, ' ')
    .trim()

export default ProductImageUpload
