import { Link, useParams } from 'react-router-dom'
import ProductCard from '../components/common/ProductCard'
import PageHeader from '../components/ui/PageHeader'
import { getCategoryBySlug, getProductsByCategory } from '../utils/dataAdapter'

const CategoryPage = () => {
  const { slug } = useParams()
  const category = slug ? decodeURIComponent(slug) : ''
  const categoryData = getCategoryBySlug(category)
  const filteredProducts = getProductsByCategory(category)
  const label = categoryData?.label || category || 'Kolekcja'

  return (
    <div className="section-shell text-brand">
      <div className="site-container">
        <PageHeader
          kicker="Kategoria"
          title={label}
          lead={`Sprawdź pełną ofertę premium w kategorii ${label}. Każda karta pozostaje równa, czytelna i osadzona w tym samym gridzie.`}
        />

        {filteredProducts.length === 0 ? (
          <div className="mx-auto max-w-2xl rounded-lg border border-brand-border bg-white p-10 text-center shadow-premium">
            <p className="mb-5 text-lg font-semibold text-brand">Brak produktów w tej kategorii.</p>
            <Link to="/sklep" className="inline-flex min-h-12 items-center justify-center rounded-lg bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-accent">
              Powrót do sklepu
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default CategoryPage
