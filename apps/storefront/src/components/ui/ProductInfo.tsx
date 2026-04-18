import { Product } from '../../types'
import { formatPrice } from '../../utils/format'
import MaterialBadge from './MaterialBadge'

interface ProductInfoProps {
  product: Product
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  return (
    <section className="space-y-6 rounded-lg border border-brand-border bg-white p-6 shadow-premium sm:p-8">
      <div className="text-center lg:text-left">
        <p className="section-kicker">{product.categoryLabel}</p>
        <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">{product.name}</h1>
        <p className="mt-5 text-3xl font-semibold">{formatPrice(product.price)}</p>
      </div>
      <p className="text-center text-base leading-8 text-brand-muted lg:text-left">{product.description}</p>
      <div className="flex flex-wrap justify-center gap-3 lg:justify-start">
        {product.materials.map((material) => (
          <MaterialBadge key={material} material={material} />
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-brand-border bg-brand-background p-4 text-center">
          <p className="text-xs font-semibold uppercase text-brand-accent">Kolekcja</p>
          <p className="mt-2 font-semibold text-brand">{product.collectionLabel || product.collection}</p>
        </div>
        <div className="rounded-lg border border-brand-border bg-brand-background p-4 text-center">
          <p className="text-xs font-semibold uppercase text-brand-accent">Status</p>
          <p className="mt-2 font-semibold text-brand">
            {product.status === 'made-to-order' ? 'Szyte na zamówienie' : 'Dostępny od ręki'}
          </p>
        </div>
      </div>
    </section>
  )
}

export default ProductInfo
