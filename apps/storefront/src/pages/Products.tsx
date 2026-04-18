import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/common/ProductCard'
import FilterPanel from '../components/ui/FilterPanel'
import PageHeader from '../components/ui/PageHeader'
import { useProductListing } from '../hooks/useProductListing'
import { usePublishedProducts } from '../hooks/usePublishedProducts'
import {
  defaultFilters,
  formatFiltersToSearchParams,
  getActiveFilterCount,
  getFilterOptions,
  parseFiltersFromSearchParams,
  sortProducts,
} from '../utils/shopFilters'
import type { ShopFilters } from '../types'

const Products = () => {
  const { products: optionProducts, error: optionsError } = usePublishedProducts()
  const [searchParams, setSearchParams] = useSearchParams()
  const [filters, setFilters] = useState<ShopFilters>(defaultFilters)
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const { products, loading, error } = useProductListing(filters)
  const filterOptions = getFilterOptions(optionProducts.length ? optionProducts : products)

  useEffect(() => {
    const parsed = parseFiltersFromSearchParams(searchParams)
    setFilters(parsed)
  }, [searchParams])

  useEffect(() => {
    const nextParams = formatFiltersToSearchParams(filters)
    if (nextParams.toString() !== searchParams.toString()) {
      setSearchParams(nextParams, { replace: true })
    }
  }, [filters, searchParams, setSearchParams])

  const filteredProducts = useMemo(
    () => sortProducts(products, filters.sortBy),
    [products, filters]
  )

  const activeFilterCount = getActiveFilterCount(filters)

  return (
    <div className="section-shell text-brand">
      <div className="site-container">
        <PageHeader
          kicker="Oferta"
          title="Wszystkie produkty"
          lead="Pełna kolekcja Rosna: naturalne tkaniny, spokojne kroje i produkty projektowane do codziennej elegancji."
        />

        {error || optionsError ? <p className="mb-6 rounded-lg border border-brand-border bg-white p-4 text-center text-sm text-brand-muted shadow-premium">{error || optionsError}</p> : null}

        <div className="mb-8 flex flex-col items-center gap-4 rounded-lg border border-brand-border bg-white p-5 text-center shadow-premium lg:flex-row lg:justify-between lg:text-left">
          <div>
            <p className="text-sm text-brand-muted">{filteredProducts.length} produktów</p>
            <p className="text-xl font-semibold">Filtrowanie i sortowanie</p>
          </div>

          <div className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={() => setShowMobileFilters(true)}
              className="inline-flex min-h-12 items-center justify-center rounded-lg border border-brand-border bg-white px-5 py-3 text-sm font-semibold text-brand transition hover:border-brand-accent lg:hidden"
            >
              Filtry {activeFilterCount > 0 ? `(${activeFilterCount})` : ''}
            </button>

            <label className="flex min-h-12 items-center justify-center gap-3 rounded-lg border border-brand-border bg-white px-4 py-3 text-sm text-brand">
              Sortuj:
              <select
                value={filters.sortBy}
                onChange={(event) => setFilters({ ...filters, sortBy: event.target.value as ShopFilters['sortBy'] })}
                className="rounded-lg border border-brand-border bg-white px-3 py-2 text-sm"
              >
                <option value="featured">Polecane</option>
                <option value="newest">Najnowsze</option>
                <option value="price-asc">Cena rosnąco</option>
                <option value="price-desc">Cena malejąco</option>
              </select>
            </label>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[280px_1fr] xl:grid-cols-[300px_1fr]">
          <aside className="hidden lg:block">
            <FilterPanel
              filters={filters}
              options={filterOptions}
              onChange={setFilters}
              onClear={() => setFilters(defaultFilters)}
            />
          </aside>

          <main>
            {loading ? (
              <div className="rounded-lg border border-brand-border bg-white p-12 text-center text-brand-muted shadow-premium">
                Ładowanie produktów...
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="rounded-lg border border-brand-border bg-white p-12 text-center text-brand-muted shadow-premium">
                <p className="text-xl font-semibold text-brand">Brak wyników</p>
                <p className="mt-3">Zmień filtr lub wybierz inne kryteria, aby znaleźć produkt.</p>
              </div>
            )}
          </main>
        </div>
      </div>

      {showMobileFilters && (
        <div className="fixed inset-0 z-50 flex bg-black/40 lg:hidden">
          <div className="ml-auto h-full w-full max-w-md overflow-auto bg-white p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="section-kicker">Filtry</p>
                <p className="text-xl font-semibold">Dopasuj ofertę</p>
              </div>
              <button type="button" onClick={() => setShowMobileFilters(false)} className="text-sm font-semibold text-brand">
                Zamknij
              </button>
            </div>

            <FilterPanel
              filters={filters}
              options={filterOptions}
              onChange={setFilters}
              onClear={() => setFilters(defaultFilters)}
              isMobile
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default Products
