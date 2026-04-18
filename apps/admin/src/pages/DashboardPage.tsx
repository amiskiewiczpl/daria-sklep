import { Link } from 'react-router-dom'
import { AdminPageHeader, LoadingState, StatCard } from '../components/ui'
import { useDashboardStats } from '../hooks/useDashboardStats'

const DashboardPage = () => {
  const { stats, loading, error } = useDashboardStats()

  if (loading) return <LoadingState label="Ladowanie dashboardu..." />

  return (
    <div>
      <AdminPageHeader
        eyebrow="Rosna admin"
        title="Dashboard"
        description="Szybki przeglad katalogu, publikacji i mediow. Panel jest przygotowany pod codzienna prace sprzedawcy bez przeladowania interfejsu."
        actions={
          <>
            <Link className="admin-button-secondary" to="/admin/homepage">
              Edytuj homepage
            </Link>
            <Link className="admin-button" to="/admin/products/new">
              Dodaj produkt
            </Link>
          </>
        }
      />

      {error ? <p className="mb-6 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">{error}</p> : null}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Produkty" value={stats?.totalProducts ?? 0} helper="Wszystkie statusy" />
        <StatCard label="Published" value={stats?.publishedProducts ?? 0} helper="Widoczne w storefront" />
        <StatCard label="Draft / Hidden" value={`${stats?.draftProducts ?? 0} / ${stats?.hiddenProducts ?? 0}`} helper="Robocze i ukryte" />
        <StatCard label="Media" value={stats?.mediaItems ?? 0} helper={`${stats?.homepageSections ?? 0} sekcji homepage`} />
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-3">
        {[
          ['Produkty', 'Zarzadzaj cenami, statusami, kategoriami, materialami i galeria.', '/admin/products'],
          ['Homepage', 'Edytuj sekcje strony glownej publikowane w storefront.', '/admin/homepage'],
          ['Media', 'Przejrzyj zdjecia produktowe przechowywane w Supabase Storage.', '/admin/media'],
        ].map(([title, description, href]) => (
          <Link key={href} to={href} className="admin-card block transition hover:-translate-y-1 hover:shadow-premium-hover">
            <h2 className="text-lg font-semibold">{title}</h2>
            <p className="mt-3 text-sm leading-6 text-brand-muted">{description}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default DashboardPage
