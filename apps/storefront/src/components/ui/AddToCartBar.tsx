import { useState } from 'react'
import { formatPrice } from '../../utils/format'

interface AddToCartBarProps {
  price: number
  onAdd: (quantity: number) => void
  stockStatus: 'in-stock' | 'made-to-order'
}

const AddToCartBar = ({ price, onAdd, stockStatus }: AddToCartBarProps) => {
  const [quantity, setQuantity] = useState(1)

  return (
    <section className="rounded-lg border border-brand-border bg-white p-6 shadow-premium">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-center sm:text-left">
          <p className="section-kicker">Cena</p>
          <p className="text-3xl font-semibold">{formatPrice(price)}</p>
          <p className="mt-2 max-w-md text-sm leading-6 text-brand-muted">
            {stockStatus === 'made-to-order'
              ? 'Produkt szyty na zamówienie. Realizacja 14-21 dni.'
              : 'Dostępny do natychmiastowej wysyłki.'}
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <label className="inline-flex min-h-12 items-center justify-center gap-3 rounded-lg border border-brand-border bg-brand-background px-4 py-3 text-sm text-brand">
            Ilość
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(event) => setQuantity(Number(event.target.value))}
              className="w-16 rounded-lg border border-brand-border bg-white px-3 py-2 text-right text-sm"
            />
          </label>
          <button
            type="button"
            onClick={() => onAdd(quantity)}
            className="inline-flex min-h-12 items-center justify-center rounded-lg bg-brand px-8 py-3 text-sm font-semibold text-white transition hover:bg-brand-accent"
          >
            Dodaj do koszyka
          </button>
        </div>
      </div>
    </section>
  )
}

export default AddToCartBar
