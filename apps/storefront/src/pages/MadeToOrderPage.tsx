import ProductCard from '../components/common/ProductCard'
import PageHeader from '../components/ui/PageHeader'
import { getProducts } from '../utils/dataAdapter'

const steps = [
  {
    title: 'Konsultacja',
    text: 'Zaczynamy od sylwetki, długości, preferowanej tkaniny i sposobu noszenia ubrania.',
  },
  {
    title: 'Szycie',
    text: 'Model powstaje w krótkim procesie atelier, z kontrolą proporcji i jakości wykończenia.',
  },
  {
    title: 'Dopasowanie',
    text: 'Finalne poprawki służą temu, żeby ubranie pracowało z ciałem, a nie tylko dobrze wyglądało na wieszaku.',
  },
]

const MadeToOrderPage = () => {
  const products = getProducts().filter((product) => product.status === 'made-to-order')

  return (
    <div className="section-shell text-brand">
      <div className="site-container">
        <PageHeader
          kicker="Made to order"
          title="Produkty szyte na miarę"
          lead="Modele na zamówienie powstają wolniej, z naciskiem na materiał, proporcje i indywidualne dopasowanie."
        />

        <div className="mb-12 grid gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <article key={step.title} className="premium-card flex flex-col p-7 text-center">
              <h2 className="text-xl font-semibold">{step.title}</h2>
              <p className="mt-4 text-sm leading-7 text-brand-muted">{step.text}</p>
            </article>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default MadeToOrderPage
