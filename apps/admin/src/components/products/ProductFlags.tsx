import { Product } from '@rosna/shared'

const ProductFlags = ({ product }: { product: Product }) => {
  const flags = [
    product.isNew ? 'New' : null,
    product.isBestSeller ? 'Bestseller' : null,
    product.isFeatured ? 'Featured' : null,
    product.productionType === 'made_to_order' ? 'MTO' : null,
  ].filter(Boolean)

  if (!flags.length) return <span className="text-sm text-brand-muted">Brak</span>

  return (
    <div className="flex flex-wrap gap-1.5">
      {flags.map((flag) => (
        <span key={flag} className="rounded-full border border-brand-border bg-brand-background px-2.5 py-1 text-xs font-semibold text-brand-muted">
          {flag}
        </span>
      ))}
    </div>
  )
}

export default ProductFlags
