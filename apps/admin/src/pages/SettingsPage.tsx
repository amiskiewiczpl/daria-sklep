import { useAuth } from '../auth'
import { AdminPageHeader } from '../components/ui'

const SettingsPage = () => {
  const { profile, signOut } = useAuth()

  return (
    <div>
      <AdminPageHeader
        eyebrow="System"
        title="Ustawienia"
        description="Podstawowe informacje o sesji admina, konfiguracji dostepu i zasadach publikacji."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="admin-card">
          <h2 className="text-xl font-semibold">Konto</h2>
          <dl className="mt-6 space-y-4 text-sm">
            <div className="flex justify-between gap-4 border-b border-brand-border pb-3">
              <dt className="text-brand-muted">Email</dt>
              <dd className="font-semibold">{profile?.email}</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-brand-border pb-3">
              <dt className="text-brand-muted">Rola</dt>
              <dd className="font-semibold">{profile?.role}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-brand-muted">Nazwa</dt>
              <dd className="font-semibold">{profile?.fullName ?? 'Brak'}</dd>
            </div>
          </dl>
          <button className="admin-button-secondary mt-8" type="button" onClick={signOut}>
            Wyloguj
          </button>
        </section>

        <section className="admin-card">
          <h2 className="text-xl font-semibold">Zasady dostepu MVP</h2>
          <div className="mt-6 space-y-4 text-sm leading-6 text-brand-muted">
            <p>Storefront jest publiczny i pobiera tylko rekordy z wartością status = published oraz visibility = public.</p>
            <p>Panel admina wymaga sesji Supabase Auth i profilu z rola admin, editor albo seller.</p>
            <p>Operacje zapisu powinny byc blokowane przez RLS dla kont bez roli w tabeli admin_profiles.</p>
          </div>
        </section>
      </div>
    </div>
  )
}

export default SettingsPage
