import { Product } from '../../types'
import ProductCard from '../common/ProductCard'

interface ProductGridProps {
  products: Product[]
  columns?: 'two' | 'three' | 'four'
}

const ProductGrid = ({ products, columns = 'three' }: ProductGridProps) => {
  const gridClasses = {
    two: 'grid-cols-1 md:grid-cols-2',
    three: 'grid-cols-1 md:grid-cols-3',
    four: 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-4',
  }

  return (
    <section className="section-shell">
      <div className="site-container">
        <div className={`grid gap-6 ${gridClasses[columns]}`}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProductGrid
