import { ProductImage, ProductImageType } from '@rosna/shared'
import { useState } from 'react'
import {
  deleteProductImage,
  moveImage,
  setPrimaryImage,
  updateProductImageMetadata,
} from '../../data/adminRepository'

interface ProductImageListProps {
  productId: string
  images: ProductImage[]
  onChanged: () => void
}

const imageTypes: ProductImageType[] = ['packshot', 'lifestyle', 'detail']

const ProductImageList = ({ productId, images, onChanged }: ProductImageListProps) => {
  const [savingImageId, setSavingImageId] = useState<string | null>(null)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const runImageAction = async (imageId: string, action: () => Promise<void>, successText: string) => {
    setSavingImageId(imageId)
    setMessage(null)

    try {
      await action()
      setMessage({ type: 'success', text: successText })
      onChanged()
    } catch (error) {
      setMessage({ type: 'error', text: error instanceof Error ? error.message : 'Nie udalo sie zapisac zmian zdjecia.' })
    } finally {
      setSavingImageId(null)
    }
  }

  if (!images.length) {
    return (
      <p className="rounded-lg border border-dashed border-brand-border bg-brand-background p-6 text-sm text-brand-muted">
        Produkt nie ma jeszcze zdjec. Zapisz produkt jako draft, a potem wgraj pierwsze zdjecia.
      </p>
    )
  }

  return (
    <section className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {images.map((image, index) => (
          <ProductImageCard
            key={image.id}
            productId={productId}
            image={image}
            images={images}
            index={index}
            isBusy={savingImageId === image.id}
            onAction={runImageAction}
          />
        ))}
      </div>

      {message ? (
        <p className={`rounded-lg border p-3 text-sm ${message.type === 'success' ? 'border-emerald-200 bg-emerald-50 text-emerald-800' : 'border-red-200 bg-red-50 text-red-800'}`}>
          {message.text}
        </p>
      ) : null}
    </section>
  )
}

interface ProductImageCardProps {
  productId: string
  image: ProductImage
  images: ProductImage[]
  index: number
  isBusy: boolean
  onAction: (imageId: string, action: () => Promise<void>, successText: string) => Promise<void>
}

const ProductImageCard = ({ productId, image, images, index, isBusy, onAction }: ProductImageCardProps) => {
  const [altText, setAltText] = useState(image.alt)
  const [imageType, setImageType] = useState<ProductImageType>(image.imageType ?? 'packshot')

  return (
    <article className="rounded-lg border border-brand-border bg-white p-3">
      <div className="relative overflow-hidden rounded-lg bg-brand-background">
        <img src={image.url} alt={image.alt} className="aspect-[4/5] w-full object-cover" />
        {image.isPrimary ? (
          <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-xs font-semibold text-brand shadow-premium">Glowne</span>
        ) : null}
      </div>

      <div className="mt-4 space-y-3">
        <label className="block">
          <span className="admin-label">Alt text</span>
          <input className="admin-input" value={altText} onChange={(event) => setAltText(event.target.value)} />
        </label>
        <label className="block">
          <span className="admin-label">Typ zdjecia</span>
          <select className="admin-input" value={imageType} onChange={(event) => setImageType(event.target.value as ProductImageType)}>
            {imageTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            className="admin-button-secondary px-2"
            disabled={isBusy || index === 0}
            onClick={() => onAction(image.id, () => moveImage(productId, images, image.id, -1), 'Kolejnosc zdjec zostala zmieniona.')}
          >
            W gore
          </button>
          <button
            type="button"
            className="admin-button-secondary px-2"
            disabled={isBusy || index === images.length - 1}
            onClick={() => onAction(image.id, () => moveImage(productId, images, image.id, 1), 'Kolejnosc zdjec zostala zmieniona.')}
          >
            W dol
          </button>
          <button
            type="button"
            className="admin-button-secondary px-2"
            disabled={isBusy || image.isPrimary}
            onClick={() => onAction(image.id, () => setPrimaryImage(productId, image.id), 'Zdjecie glowne zostalo ustawione.')}
          >
            Ustaw glowne
          </button>
          <button
            type="button"
            className="admin-button-secondary px-2"
            disabled={isBusy}
            onClick={() => onAction(image.id, () => deleteProductImage(image), 'Zdjecie zostalo usuniete.')}
          >
            Usun
          </button>
        </div>

        <button
          type="button"
          className="admin-button w-full"
          disabled={isBusy}
          onClick={() => onAction(image.id, () => updateProductImageMetadata(image.id, { altText, imageType }), 'Metadane zdjecia zostaly zapisane.')}
        >
          {isBusy ? 'Zapisywanie...' : 'Zapisz alt i typ'}
        </button>
      </div>
    </article>
  )
}

export default ProductImageList
