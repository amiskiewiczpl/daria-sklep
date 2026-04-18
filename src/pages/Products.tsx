import ProductCard from '../components/common/ProductCard'
import { products } from '../data/products'

const Products = () => {
  return (
    <div className="container mx-auto px-6 py-16 text-brand-default">
      <div className="mb-10">
        <p className="text-sm uppercase tracking-[0.35em] text-brand-muted mb-2">Shop</p>
        <h1 className="text-4xl font-semibold">All products</h1>
        <p className="max-w-2xl text-brand-muted leading-relaxed">
          Browse every piece in the Rosna collection. Filter your look through premium basics, outerwear, and accessories.
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default Products