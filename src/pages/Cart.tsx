import { Link } from 'react-router-dom'
import { useCart } from '../hooks/useCart'
import { formatPrice } from '../utils/format'

const Cart = () => {
  const { cart, removeFromCart, getTotal } = useCart()

  return (
    <div className="container mx-auto px-6 py-16 text-brand-default">
      <div className="mb-10">
        <p className="text-sm uppercase tracking-[0.35em] text-brand-muted mb-2">Koszyk</p>
        <h1 className="text-4xl font-semibold">Twój koszyk</h1>
      </div>
      {cart.length === 0 ? (
        <div className="rounded-[1.5rem] border border-brand-border bg-white p-10 shadow-premium">
          <p className="text-lg text-brand-muted">Twój koszyk jest pusty. Dodaj produkt, aby kontynuować.</p>
        </div>
      ) : (
        <div className="grid gap-10 xl:grid-cols-[1.3fr_0.7fr]">
          <div className="space-y-6">
            {cart.map((item, index) => (
              <div key={index} className="flex flex-col gap-4 rounded-[1.5rem] border border-brand-border bg-white p-6 shadow-premium md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="h-24 w-24 rounded-3xl object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{item.product.name}</h3>
                    <p className="text-brand-muted">Rozmiar: {item.selectedSize} • Kolor: {item.selectedColor}</p>
                    <p className="text-brand-muted">Ilość: {item.quantity}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold">{formatPrice(item.product.price * item.quantity)}</p>
                  <button
                    onClick={() => removeFromCart(index)}
                    className="mt-3 text-sm font-medium text-brand-accent hover:underline"
                  >
                    Usuń
                  </button>
                </div>
              </div>
            ))}
          </div>
          <aside className="rounded-[1.5rem] border border-brand-border bg-white p-8 shadow-premium">
            <p className="text-sm uppercase tracking-[0.35em] text-brand-muted mb-4">Podsumowanie zamówienia</p>
            <p className="text-3xl font-semibold mb-6">{formatPrice(getTotal())}</p>
            <Link
              to="/zamowienie"
              className="inline-flex w-full items-center justify-center rounded-full bg-brand-default px-6 py-4 text-sm font-semibold text-white transition hover:bg-brand-accent"
            >
              Przejdź do kasy
            </Link>
          </aside>
        </div>
      )}
    </div>
  )
}

export default Cart