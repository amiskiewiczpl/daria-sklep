import { deleteProductImage } from '../data/adminRepository'
import { useMediaItems } from '../hooks/useMediaItems'
import { AdminPageHeader, EmptyState, LoadingState } from '../components/ui'

const MediaManagerPage = () => {
  const { items, loading, error, refresh } = useMediaItems()

  if (loading) return <LoadingState label="Ladowanie mediow..." />

  return (
    <div>
      <AdminPageHeader
        eyebrow="Assets"
        title="Media"
        description="Przeglad zdjec produktowych zapisanych w bucket product-images. Upload odbywa sie w formularzu produktu, zeby zdjecie od razu mialo relacje z produktem."
      />

      {error ? <p className="mb-6 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">{error}</p> : null}

      {items.length ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((image) => (
            <article key={image.id} className="admin-card p-3">
              <img src={image.url} alt={image.alt} className="aspect-[4/5] w-full rounded-lg object-cover" />
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="truncate text-sm font-semibold">{image.alt}</p>
                  {image.isPrimary ? (
                    <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                      Glowne
                    </span>
                  ) : null}
                </div>
                <p className="break-all text-xs leading-5 text-brand-muted">{image.path}</p>
                <button className="admin-button-secondary w-full" type="button" onClick={() => deleteProductImage(image).then(refresh)}>
                  Usun zdjecie
                </button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <EmptyState title="Brak mediow" description="Dodaj zdjecia w edycji produktu, aby pojawily sie w bibliotece." />
      )}
    </div>
  )
}

export default MediaManagerPage
