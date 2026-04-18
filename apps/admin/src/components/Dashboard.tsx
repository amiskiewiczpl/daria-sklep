import { Product } from '@rosna/shared'
import { useEffect, useState } from 'react'
import { listAdminProducts, listHomepageSections } from '../data/adminRepository'
import { supabase } from '../lib/supabase'
import HomepageEditor from './HomepageEditor'
import ProductEditor from './ProductEditor'
import type { HomepageSection } from '@rosna/shared'

const Dashboard = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [sections, setSections] = useState<HomepageSection[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>()
  const [view, setView] = useState<'products' | 'homepage'>('products')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadData = async () => {
    setLoading(true)
    setError('')

    try {
      const [nextProducts, nextSections] = await Promise.all([listAdminProducts(), listHomepageSections()])
      setProducts(nextProducts)
      setSections(nextSections)
      setSelectedProduct((current) => nextProducts.find((product) => product.id === current?.id))
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Nie udało się pobrać danych.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <div className="min-h-screen bg-brand-background text-brand">
      <header className="border-b border-brand-border bg-white">
        <div className="admin-container flex min-h-20 items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase text-brand-accent">Rosna</p>
            <h1 className="text-2xl font-semibold">Panel sprzedawcy</h1>
          </div>
          <button className="admin-button-secondary" type="button" onClick={() => supabase.auth.signOut()}>
            Wyloguj
          </button>
        </div>
      </header>

      <main className="admin-container py-10">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="inline-flex rounded-lg border border-brand-border bg-white p-1 shadow-premium">
            <button className={view === 'products' ? 'admin-button' : 'admin-button-secondary border-0'} type="button" onClick={() => setView('products')}>
              Produkty
            </button>
            <button className={view === 'homepage' ? 'admin-button' : 'admin-button-secondary border-0'} type="button" onClick={() => setView('homepage')}>
              Homepage
            </button>
          </div>
          <button className="admin-button-secondary" type="button" onClick={loadData}>
            Odśwież dane
          </button>
        </div>

        {error ? <p className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</p> : null}
        {loading ? <p className="admin-card text-center text-brand-muted">Ładowanie danych...</p> : null}

        {!loading && view === 'products' ? (
          <div className="grid gap-8 lg:grid-cols-[340px_1fr]">
            <aside className="admin-card h-fit">
              <div className="mb-5 flex items-center justify-between gap-4">
                <h2 className="text-xl font-semibold">Produkty</h2>
                <button type="button" className="text-sm font-semibold text-brand-accent" onClick={() => setSelectedProduct(undefined)}>
                  Nowy
                </button>
              </div>
              <div className="space-y-3">
                {products.map((product) => (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() => setSelectedProduct(product)}
                    className={`w-full rounded-lg border p-4 text-left transition ${
                      selectedProduct?.id === product.id ? 'border-brand-accent bg-brand-accent/10' : 'border-brand-border bg-white hover:border-brand-accent'
                    }`}
                  >
                    <p className="font-semibold">{product.name}</p>
                    <p className="mt-1 text-sm text-brand-muted">{product.publishStatus} · {product.price} zł</p>
                  </button>
                ))}
              </div>
            </aside>
            <ProductEditor product={selectedProduct} onSaved={loadData} />
          </div>
        ) : null}

        {!loading && view === 'homepage' ? <HomepageEditor sections={sections} onSaved={loadData} /> : null}
      </main>
    </div>
  )
}

export default Dashboard
