import { Link } from 'react-router-dom'
import { Product } from '../../types'
import { formatPrice } from '../../utils/format'

interface ProductCardProps {
  product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="rounded-[1.5rem] border border-brand-border bg-white shadow-premium overflow-hidden transition hover:-translate-y-1">
      <img
        src={product.images[0]}
        alt={product.name}
        className="w-full h-72 object-cover"
      />
      <div className="px-6 py-5">
        <p className="text-xs uppercase tracking-[0.35em] text-brand-muted mb-3">{product.category}</p>
        <h3 className="text-xl font-semibold mb-3">{product.name}</h3>
        <p className="text-brand-muted mb-4">{product.description}</p>
        <div className="flex items-center justify-between gap-4">
          <span className="text-lg font-semibold">{formatPrice(product.price)}</span>
          <Link
            to={`/product/${product.id}`}
            className="rounded-full bg-brand-default px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-accent"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ProductCard