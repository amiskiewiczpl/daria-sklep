import { Link } from 'react-router-dom'
import { Product } from '../../types'
import { formatPrice } from '../../utils/format'
import { buildProductUrl } from '../../utils/productHelpers'

interface ProductCardProps {
  product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <article className="premium-card group flex flex-col">
      <div className="aspect-[4/5] overflow-hidden bg-brand-background">
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-[1.04]"
        />
      </div>
      <div className="flex flex-1 flex-col px-5 py-5 sm:px-6">
        <p className="mb-3 text-xs font-semibold uppercase text-brand-accent">{product.categoryLabel}</p>
        <h3 className="mb-3 text-xl font-semibold leading-snug">{product.name}</h3>
        <p className="line-clamp-3 text-sm leading-7 text-brand-muted">{product.description}</p>
        <div className="mt-auto flex items-center justify-between gap-4 pt-6">
          <span className="text-lg font-semibold">{formatPrice(product.price)}</span>
          <Link
            to={buildProductUrl(product.slug)}
            className="inline-flex min-h-11 items-center justify-center rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-accent"
          >
            Zobacz
          </Link>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
