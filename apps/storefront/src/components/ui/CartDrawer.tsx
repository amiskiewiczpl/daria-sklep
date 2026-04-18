import { CartItem } from '../../types'
import { formatPrice } from '../../utils/format'

interface CartDrawerProps {
  items: CartItem[]
  onClose: () => void
}

const CartDrawer = ({ items, onClose }: CartDrawerProps) => {
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

  return (
    <aside className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-white p-6 shadow-2xl">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold uppercase text-brand-accent">Koszyk</p>
        <button type="button" onClick={onClose} className="rounded-lg border border-brand-border px-4 py-2 text-sm text-brand">
          Zamknij
        </button>
      </div>
      <div className="mt-8 flex-1 space-y-4 overflow-auto">
        {items.map((item, index) => (
          <article key={`${item.product.id}-${index}`} className="rounded-lg border border-brand-border p-4">
            <p className="font-semibold">{item.product.name}</p>
            <p className="mt-1 text-sm text-brand-muted">{item.quantity} x {formatPrice(item.product.price)}</p>
          </article>
        ))}
      </div>
      <div className="border-t border-brand-border pt-5">
        <div className="flex items-center justify-between text-lg font-semibold">
          <span>Razem</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>
    </aside>
  )
}

export default CartDrawer
