import ProductCard from '../components/common/ProductCard'
import PageHeader from '../components/ui/PageHeader'
import { usePublishedProducts } from '../hooks/usePublishedProducts'

const steps = [
  {
    title: 'Konsultacja',
    text: 'Zaczynamy od sylwetki, dlugosci, preferowanej tkaniny i sposobu noszenia ubrania.',
  },
  {
    title: 'Szycie',
    text: 'Model powstaje w krotkim procesie atelier, z kontrola proporcji i jakosci wykonczenia.',
  },
  {
    title: 'Dopasowanie',
    text: 'Finalne poprawki sluza temu, zeby ubranie pracowalo z cialem, a nie tylko dobrze wygladalo na wieszaku.',
  },
]

const MadeToOrderPage = () => {
  const { products, loading, error } = usePublishedProducts({ productionType: 'made_to_order' })

  return (
    <div className="section-shell text-brand">
      <div className="site-container">
        <PageHeader
          kicker="Made to order"
          title="Produkty szyte na miare"
          lead="Modele na zamowienie powstaja wolniej, z naciskiem na material, proporcje i indywidualne dopasowanie."
        />

        <div className="mb-12 grid gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <article key={step.title} className="premium-card flex flex-col p-7 text-center">
              <h2 className="text-xl font-semibold">{step.title}</h2>
              <p className="mt-4 text-sm leading-7 text-brand-muted">{step.text}</p>
            </article>
          ))}
        </div>

        {error ? <p className="mb-6 rounded-lg border border-brand-border bg-white p-4 text-center text-sm text-brand-muted shadow-premium">{error}</p> : null}

        {loading ? (
          <div className="rounded-lg border border-brand-border bg-white p-12 text-center text-brand-muted shadow-premium">
            Ladowanie produktow...
          </div>
        ) : products.length ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-brand-border bg-white p-12 text-center text-brand-muted shadow-premium">
            Aktualnie brak opublikowanych produktow made to order.
          </div>
        )}
      </div>
    </div>
  )
}

export default MadeToOrderPage
