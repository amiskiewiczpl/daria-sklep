import PageHeader from '../components/ui/PageHeader'
import { useCart } from '../hooks/useCart'
import { formatPrice } from '../utils/format'

const Checkout = () => {
  const { cart, getTotal, clearCart } = useCart()

  const handleCheckout = () => {
    clearCart()
    window.location.href = 'https://stripe.com/pay'
  }

  return (
    <div className="section-shell text-brand">
      <div className="site-container">
        <PageHeader kicker="Kasa" title="Sfinalizuj zamówienie" lead="Podsumowanie koszyka przed przejściem do zewnętrznej płatności." />

        <div className="mx-auto max-w-3xl rounded-lg border border-brand-border bg-white p-6 shadow-premium sm:p-8">
          <h2 className="mb-6 text-center text-xl font-semibold">Podsumowanie zamówienia</h2>
          <div className="space-y-4">
            {cart.length > 0 ? (
              cart.map((item, index) => (
                <div key={`${item.product.id}-${index}`} className="flex items-start justify-between gap-4 text-sm text-brand-muted sm:text-base">
                  <span>{item.product.name} x {item.quantity}</span>
                  <span className="font-semibold text-brand">{formatPrice(item.product.price * item.quantity)}</span>
                </div>
              ))
            ) : (
              <p className="text-center text-brand-muted">Koszyk jest pusty.</p>
            )}
          </div>
          <div className="mt-6 flex items-center justify-between border-t border-brand-border pt-6 text-lg font-semibold text-brand">
            <span>Razem</span>
            <span>{formatPrice(getTotal())}</span>
          </div>
          <button
            type="button"
            onClick={handleCheckout}
            disabled={cart.length === 0}
            className="mt-8 inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-brand px-6 py-3 text-sm font-semibold uppercase text-white transition hover:bg-brand-accent disabled:cursor-not-allowed disabled:bg-brand-muted"
          >
            Przejdź do płatności
          </button>
          <p className="mt-4 text-center text-sm leading-6 text-brand-muted">
            Płatność zostanie obsłużona przez zewnętrzny system, np. Stripe lub PayPal.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Checkout
