import { useParams, Link } from 'react-router-dom'
import { products } from '../data/products'
import ProductCard from '../components/common/ProductCard'

const CategoryPage = () => {
  const { categoryName } = useParams()
  const category = categoryName ? decodeURIComponent(categoryName) : ''
  const filteredProducts = products.filter((item) => item.category === category)

  return (
    <div className="container mx-auto px-6 py-16 text-brand-default">
      <div className="mb-10">
        <p className="text-sm uppercase tracking-[0.35em] text-brand-muted mb-2">Kategoria</p>
        <h1 className="text-4xl font-semibold">{category || 'Kolekcja'}</h1>
        <p className="text-brand-muted mt-4 max-w-2xl">
          Sprawdź pełną ofertę premium w kategorii {category}. Idealna do codziennych i bardziej formalnych stylizacji.
        </p>
      </div>
      {filteredProducts.length === 0 ? (
        <div className="rounded-[1.5rem] border border-brand-border bg-white p-10 shadow-premium">
          <p className="text-brand-default text-lg mb-4">Brak produktów w tej kategorii.</p>
          <Link to="/produkty" className="text-brand-accent font-semibold hover:underline">
            Powrót do wszystkich produktów
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}

export default CategoryPage