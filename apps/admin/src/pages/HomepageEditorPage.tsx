import { HomepageEditor } from '../components/homepage'
import { AdminPageHeader, LoadingState } from '../components/ui'
import { useHomepageSections } from '../hooks/useHomepageSections'
import { useProductOptions } from '../hooks/useProductOptions'
import { useProducts } from '../hooks/useProducts'

const HomepageEditorPage = () => {
  const { sections, loading, error, refresh } = useHomepageSections()
  const { products, loading: productsLoading, error: productsError } = useProducts()
  const { collections, loading: optionsLoading, error: optionsError } = useProductOptions()

  if (loading || productsLoading || optionsLoading) return <LoadingState label="Ladowanie edytora homepage..." />

  return (
    <div>
      <AdminPageHeader
        eyebrow="Content"
        title="Homepage"
        description="Edytowalne sekcje strony glownej. Storefront powinien pobierac tylko sekcje publiczne i opublikowane."
      />
      {error || productsError || optionsError ? (
        <p className="mb-6 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          {error ?? productsError ?? optionsError}
        </p>
      ) : null}
      <HomepageEditor sections={sections} products={products} collections={collections} onSaved={refresh} />
    </div>
  )
}

export default HomepageEditorPage
