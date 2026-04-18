import { Link } from 'react-router-dom'
import PageHeader from '../components/ui/PageHeader'
import { useCart } from '../hooks/useCart'
import { formatPrice } from '../utils/format'

const Cart = () => {
  const { cart, removeFromCart, getTotal } = useCart()

  return (
    <div className="section-shell text-brand">
      <div className="site-container">
        <PageHeader kicker="Koszyk" title="Twój koszyk" lead="Sprawdź produkty, rozmiary i kolory przed przejściem do płatności." />

        {cart.length === 0 ? (
          <div className="mx-auto max-w-2xl rounded-lg border border-brand-border bg-white p-10 text-center shadow-premium">
            <p className="mb-6 text-lg text-brand-muted">Twój koszyk jest pusty. Dodaj produkt, aby kontynuować.</p>
            <Link to="/sklep" className="inline-flex min-h-12 items-center justify-center rounded-lg bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-accent">
              Przejdź do sklepu
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 xl:grid-cols-[1.3fr_0.7fr]">
            <div className="space-y-5">
              {cart.map((item, index) => (
                <article key={`${item.product.id}-${index}`} className="rounded-lg border border-brand-border bg-white p-5 shadow-premium">
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                      <img src={item.product.images[0]} alt={item.product.name} className="h-24 w-24 rounded-lg object-cover" />
                      <div>
                        <h3 className="text-lg font-semibold">{item.product.name}</h3>
                        <p className="mt-1 text-sm text-brand-muted">Rozmiar: {item.selectedSize} · Kolor: {item.selectedColor}</p>
                        <p className="text-sm text-brand-muted">Ilość: {item.quantity}</p>
                      </div>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="text-lg font-semibold">{formatPrice(item.product.price * item.quantity)}</p>
                      <button onClick={() => removeFromCart(index)} className="mt-3 text-sm font-semibold text-brand-accent hover:underline">
                        Usuń
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <aside className="h-fit rounded-lg border border-brand-border bg-white p-8 text-center shadow-premium xl:sticky xl:top-28">
              <p className="section-kicker">Podsumowanie</p>
              <p className="mb-6 text-3xl font-semibold">{formatPrice(getTotal())}</p>
              <Link to="/zamowienie" className="inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-accent">
                Przejdź do kasy
              </Link>
            </aside>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart
