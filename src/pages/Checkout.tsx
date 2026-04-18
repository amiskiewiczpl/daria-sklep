import { useCart } from '../hooks/useCart'
import { formatPrice } from '../utils/format'

const Checkout = () => {
  const { cart, getTotal, clearCart } = useCart()

  const handleCheckout = () => {
    clearCart()
    window.location.href = 'https://stripe.com/pay'
  }

  return (
    <div className="container mx-auto px-6 py-16 text-brand-default">
      <div className="mb-10">
        <p className="text-sm uppercase tracking-[0.35em] text-brand-muted mb-2">Kasa</p>
        <h1 className="text-4xl font-semibold">Sfinalizuj zamówienie</h1>
      </div>
      <div className="rounded-[1.5rem] border border-brand-border bg-white p-8 shadow-premium">
        <h2 className="text-xl font-semibold mb-6">Podsumowanie zamówienia</h2>
        <div className="space-y-4">
          {cart.map((item, index) => (
            <div key={index} className="flex justify-between text-brand-muted">
              <span>{item.product.name} x{item.quantity}</span>
              <span>{formatPrice(item.product.price * item.quantity)}</span>
            </div>
          ))}
        </div>
        <div className="mt-6 border-t border-brand-border pt-6 text-lg font-semibold text-brand-default flex items-center justify-between">
          <span>Razem</span>
          <span>{formatPrice(getTotal())}</span>
        </div>
        <button
          onClick={handleCheckout}
          className="mt-8 w-full rounded-full bg-brand-default px-6 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-white transition hover:bg-brand-accent"
        >
          Przejdź do płatności
        </button>
        <p className="mt-4 text-sm text-brand-muted">
          Płatność zostanie obsłużona przez zewnętrzny system, np. Stripe lub PayPal.
        </p>
      </div>
    </div>
  )
}

export default Checkout