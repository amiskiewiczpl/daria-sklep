import { Link } from 'react-router-dom'
import ProductCard from '../components/common/ProductCard'
import { products } from '../data/products'

const uniqueCategories = Array.from(new Set(products.map((product) => product.category)))
const featuredProducts = products.slice(0, 4)

const HomePage = () => {
  return (
    <div className="bg-brand-background text-brand-default">
      <section className="bg-white shadow-premium rounded-b-[2rem] pb-16">
        <div className="container mx-auto px-6 py-20 text-center">
          <p className="text-sm uppercase tracking-[0.4em] text-brand-muted mb-4">Rosna Edition</p>
          <h1 className="text-5xl md:text-6xl font-black leading-tight mb-6">
            Elegancka moda w polskim wydaniu.
          </h1>
          <p className="max-w-2xl mx-auto text-brand-muted text-lg mb-8">
            Odkryj starannie wyselekcjonowane produkty Rosna. Komfortowe zakupy, polski styl i niewymuszone piękno.
          </p>
          <Link
            to="/produkty"
            className="inline-flex items-center justify-center rounded-full bg-brand-default px-8 py-4 text-sm font-semibold text-white transition hover:bg-brand-accent"
          >
            Zobacz kolekcję
          </Link>
        </div>
      </section>

      <section className="container mx-auto px-6 py-16">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-brand-muted mb-2">Kategorie</p>
            <h2 className="text-3xl font-semibold">Stwórz styl w kilku prostych krokach.</h2>
          </div>
          <Link to="/produkty" className="text-sm font-semibold text-brand-default underline-offset-4 hover:underline">
            Przeglądaj całą ofertę
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {uniqueCategories.map((category) => (
            <Link
              key={category}
              to={`/kategoria/${encodeURIComponent(category)}`}
              className="group rounded-[1.5rem] border border-brand-border bg-white p-8 shadow-premium transition hover:-translate-y-1"
            >
              <p className="text-sm uppercase tracking-[0.3em] text-brand-muted mb-4">{category}</p>
              <h3 className="text-2xl font-semibold transition group-hover:text-brand-accent">{category}</h3>
            </Link>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-6 py-16">
        <div className="mb-10 text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-brand-muted mb-2">Wybrane produkty</p>
          <h2 className="text-3xl font-semibold">Bestsellery z tej edycji</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default HomePage