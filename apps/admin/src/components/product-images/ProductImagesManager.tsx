import { ProductImage } from '@rosna/shared'
import ProductImageList from './ProductImageList'
import ProductImageUpload from './ProductImageUpload'

interface ProductImagesManagerProps {
  productId?: string
  images: ProductImage[]
  onChanged: () => void
}

const ProductImagesManager = ({ productId, images, onChanged }: ProductImagesManagerProps) => {
  if (!productId) {
    return (
      <section className="admin-card space-y-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-accent">Zdjecia</p>
          <h2 className="mt-2 text-xl font-semibold">Galeria produktu</h2>
        </div>
        <p className="rounded-lg border border-dashed border-brand-border bg-brand-background p-6 text-sm leading-6 text-brand-muted">
          Najpierw zapisz produkt jako draft. Po zapisaniu produkt dostanie ID, a zdjecia beda mogly trafic do Supabase Storage
          w strukturze products/product-id/nazwa-pliku.
        </p>
      </section>
    )
  }

  const sortedImages = [...images].sort((a, b) => a.sortOrder - b.sortOrder)
  const nextSortOrder = sortedImages.length ? Math.max(...sortedImages.map((image) => image.sortOrder)) + 10 : 0

  return (
    <section className="admin-card space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-accent">Zdjecia</p>
        <h2 className="mt-2 text-xl font-semibold">Galeria produktu</h2>
        <p className="mt-2 text-sm leading-6 text-brand-muted">
          Wgraj wiele zdjec, ustaw alt text, typ zdjecia, kolejnosc i jedno zdjecie glowne.
        </p>
      </div>

      <ProductImageUpload
        productId={productId}
        nextSortOrder={nextSortOrder}
        hasPrimaryImage={sortedImages.some((image) => image.isPrimary)}
        onUploaded={onChanged}
      />
      <ProductImageList productId={productId} images={sortedImages} onChanged={onChanged} />
    </section>
  )
}

export default ProductImagesManager
