import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { products } from '../data/products'
import { useCart } from '../hooks/useCart'
import { formatPrice } from '../utils/format'

const ProductPage = () => {
  const { slug } = useParams()
  const product = products.find((item) => item.slug === slug)
  const { addToCart } = useCart()
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] ?? '')
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] ?? '')
  const [quantity, setQuantity] = useState(1)

  if (!product) {
    return (
      <div className="container mx-auto px-6 py-16 text-brand-default">
        <p className="text-2xl font-semibold mb-4">Produkt nie znaleziony</p>
        <p className="text-brand-muted">Wybierz inny produkt z naszej kolekcji.</p>
      </div>
    )
  }

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedColor)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="container mx-auto px-6 py-16 text-brand-default">
      <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] items-start">
        <div className="rounded-[2rem] overflow-hidden shadow-premium bg-white">
          <img src={product.images[0]} alt={product.name} className="w-full object-cover h-[520px]" />
        </div>
        <div className="space-y-8">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-brand-muted mb-3">{product.categoryLabel}</p>
            <h1 className="text-4xl font-semibold mb-4">{product.name}</h1>
            <p className="text-brand-muted leading-relaxed">{product.description}</p>
          </div>
          <div className="rounded-[1.5rem] border border-brand-border bg-white p-8 shadow-premium">
            <p className="text-3xl font-bold mb-3">{formatPrice(product.price)}</p>
            <div className="grid gap-6">
              <div>
                <label className="text-sm uppercase tracking-[0.3em] text-brand-muted mb-2 block">Rozmiar</label>
                <select
                  value={selectedSize}
                  onChange={(event) => setSelectedSize(event.target.value)}
                  className="w-full rounded-xl border border-brand-border px-4 py-3"
                >
                  {product.sizes.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm uppercase tracking-[0.3em] text-brand-muted mb-2 block">Kolor</label>
                <select
                  value={selectedColor}
                  onChange={(event) => setSelectedColor(event.target.value)}
                  className="w-full rounded-xl border border-brand-border px-4 py-3"
                >
                  {product.colors.map((color) => (
                    <option key={color} value={color}>
                      {color}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm uppercase tracking-[0.3em] text-brand-muted mb-2 block">Ilość</label>
                <input
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(event) => setQuantity(Number(event.target.value))}
                  className="w-24 rounded-xl border border-brand-border px-4 py-3"
                />
              </div>
              <button
                onClick={handleAddToCart}
                className="rounded-full bg-brand-default px-6 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-white transition hover:bg-brand-accent"
              >
                Dodaj do koszyka
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductPage