import ProductCard from '../components/common/ProductCard'
import { products } from '../data/products'

const Products = () => {
  return (
    <div className="container mx-auto px-6 py-16 text-brand-default">
      <div className="mb-10">
        <p className="text-sm uppercase tracking-[0.35em] text-brand-muted mb-2">Oferta</p>
        <h1 className="text-4xl font-semibold">Wszystkie produkty</h1>
        <p className="max-w-2xl text-brand-muted leading-relaxed">
          Przeglądaj pełną kolekcję Rosna. Znajdź wygodne legginsy, eleganckie spodnie i wyjątkowe modele premium.
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