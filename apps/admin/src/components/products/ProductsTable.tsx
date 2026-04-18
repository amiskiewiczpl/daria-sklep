import { Product, ProductPublishStatus, getNextProductPublishAction } from '@rosna/shared'
import { Link } from 'react-router-dom'
import { StatusBadge } from '../ui'
import ProductFlags from './ProductFlags'

interface ProductsTableProps {
  products: Product[]
  selectedIds: string[]
  busyProductId: string | null
  onSelectionChange: (ids: string[]) => void
  onChangeStatus: (productId: string, status: ProductPublishStatus) => void
  onDuplicate: (productId: string) => void
  onArchive: (productId: string) => void
}

const fallbackImage = 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=400&q=80'

const ProductsTable = ({
  products,
  selectedIds,
  busyProductId,
  onSelectionChange,
  onChangeStatus,
  onDuplicate,
  onArchive,
}: ProductsTableProps) => {
  const allVisibleSelected = products.length > 0 && products.every((product) => selectedIds.includes(product.id))

  const toggleAll = () => {
    if (allVisibleSelected) {
      onSelectionChange(selectedIds.filter((id) => !products.some((product) => product.id === id)))
      return
    }

    onSelectionChange(Array.from(new Set([...selectedIds, ...products.map((product) => product.id)])))
  }

  const toggleOne = (productId: string) => {
    onSelectionChange(selectedIds.includes(productId) ? selectedIds.filter((id) => id !== productId) : [...selectedIds, productId])
  }

  return (
    <div className="overflow-hidden rounded-lg border border-brand-border bg-white shadow-premium">
      <div className="hidden grid-cols-[44px_92px_minmax(220px,1.2fr)_0.8fr_0.7fr_0.7fr_1fr_0.8fr_1.1fr] gap-4 border-b border-brand-border bg-brand-background px-5 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-brand-accent xl:grid">
        <input type="checkbox" checked={allVisibleSelected} onChange={toggleAll} aria-label="Zaznacz widoczne produkty" />
        <span>Zdjecie</span>
        <span>Nazwa</span>
        <span>Kategoria</span>
        <span>Cena</span>
        <span>Status</span>
        <span>Flagi</span>
        <span>Updated</span>
        <span>Akcje</span>
      </div>

      <div className="hidden divide-y divide-brand-border xl:block">
        {products.map((product) => (
          <article
            key={product.id}
            className="grid grid-cols-[44px_92px_minmax(220px,1.2fr)_0.8fr_0.7fr_0.7fr_1fr_0.8fr_1.1fr] gap-4 px-5 py-5 text-sm xl:items-center"
          >
            <input
              type="checkbox"
              checked={selectedIds.includes(product.id)}
              onChange={() => toggleOne(product.id)}
              aria-label={`Zaznacz ${product.name}`}
            />
            <ProductThumb product={product} />
            <ProductName product={product} />
            <p className="text-brand-muted">{product.categoryLabel}</p>
            <p className="font-semibold">{formatPrice(product)}</p>
            <StatusBadge status={product.publishStatus ?? 'draft'} />
            <ProductFlags product={product} />
            <p className="text-brand-muted">{formatDate(product.updatedAt)}</p>
            <ProductActions
              product={product}
              busy={busyProductId === product.id}
              onChangeStatus={onChangeStatus}
              onDuplicate={onDuplicate}
              onArchive={onArchive}
            />
          </article>
        ))}
      </div>

      <div className="divide-y divide-brand-border xl:hidden">
        {products.map((product) => (
          <article key={product.id} className="p-5">
            <div className="flex gap-4">
              <input
                className="mt-1"
                type="checkbox"
                checked={selectedIds.includes(product.id)}
                onChange={() => toggleOne(product.id)}
                aria-label={`Zaznacz ${product.name}`}
              />
              <ProductThumb product={product} />
              <div className="min-w-0 flex-1">
                <ProductName product={product} />
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <StatusBadge status={product.publishStatus ?? 'draft'} />
                  <ProductFlags product={product} />
                </div>
              </div>
            </div>

            <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
              <InfoItem label="Kategoria" value={product.categoryLabel} />
              <InfoItem label="Cena" value={formatPrice(product)} />
              <InfoItem label="Produkcja" value={product.productionType === 'made_to_order' ? 'Made to order' : 'In stock'} />
              <InfoItem label="Updated" value={formatDate(product.updatedAt)} />
            </dl>

            <div className="mt-5">
              <ProductActions
                product={product}
                busy={busyProductId === product.id}
                onChangeStatus={onChangeStatus}
                onDuplicate={onDuplicate}
                onArchive={onArchive}
              />
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

const ProductThumb = ({ product }: { product: Product }) => (
  <img
    src={product.imageItems?.find((image) => image.isPrimary)?.url ?? product.images[0] ?? fallbackImage}
    alt={product.name}
    className="h-20 w-16 rounded-lg object-cover"
  />
)

const ProductName = ({ product }: { product: Product }) => (
  <div className="min-w-0">
    <h2 className="truncate font-semibold text-brand">{product.name}</h2>
    <p className="mt-1 truncate text-sm text-brand-muted">{product.slug}</p>
  </div>
)

const ProductActions = ({
  product,
  busy,
  onChangeStatus,
  onDuplicate,
  onArchive,
}: {
  product: Product
  busy: boolean
  onChangeStatus: (productId: string, status: ProductPublishStatus) => void
  onDuplicate: (productId: string) => void
  onArchive: (productId: string) => void
}) => (
  <div className="flex flex-wrap gap-2">
    <Link className="admin-button-secondary min-h-10 px-4 py-2" to={`/admin/products/${product.id}`}>
      Edit
    </Link>
    <Link className="admin-button-secondary min-h-10 px-4 py-2" to={`/admin/products/${product.id}?preview=1`}>
      Preview
    </Link>
    {getNextProductPublishAction(product.publishStatus) === 'hide' ? (
      <button className="admin-button-secondary min-h-10 px-4 py-2" type="button" disabled={busy} onClick={() => onChangeStatus(product.id, 'hidden')}>
        Hide
      </button>
    ) : (
      <button className="admin-button min-h-10 px-4 py-2" type="button" disabled={busy} onClick={() => onChangeStatus(product.id, 'published')}>
        Publish
      </button>
    )}
    <button className="admin-button-secondary min-h-10 px-4 py-2" type="button" disabled={busy} onClick={() => onChangeStatus(product.id, 'draft')}>
      Draft
    </button>
    <button className="admin-button-secondary min-h-10 px-4 py-2" type="button" disabled={busy} onClick={() => onArchive(product.id)}>
      Archive
    </button>
    <button className="admin-button-secondary min-h-10 px-4 py-2" type="button" disabled={busy} onClick={() => onDuplicate(product.id)}>
      Duplicate
    </button>
  </div>
)

const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-lg border border-brand-border bg-brand-background px-3 py-2">
    <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-accent">{label}</dt>
    <dd className="mt-1 text-brand-muted">{value}</dd>
  </div>
)

const formatPrice = (product: Product) => `${product.price.toLocaleString('pl-PL')} ${product.currency ?? 'PLN'}`

const formatDate = (value?: string) =>
  value
    ? new Intl.DateTimeFormat('pl-PL', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }).format(new Date(value))
    : '-'

export default ProductsTable
