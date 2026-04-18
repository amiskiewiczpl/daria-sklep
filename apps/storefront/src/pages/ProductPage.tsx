import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AddToCartBar from '../components/ui/AddToCartBar'
import ProductGallery from '../components/ui/ProductGallery'
import ProductInfo from '../components/ui/ProductInfo'
import SizeSelector from '../components/ui/SizeSelector'
import { useCart } from '../hooks/useCart'
import { useProductBySlug } from '../hooks/useProductBySlug'

const ProductPage = () => {
  const { slug } = useParams()
  const { product, loading, error } = useProductBySlug(slug)
  const { addToCart } = useCart()
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0] ?? '')
      setSelectedColor(product.colors[0] ?? '')
    }
  }, [product])

  if (loading) {
    return (
      <div className="section-shell text-brand">
        <div className="site-container">
          <div className="mx-auto max-w-2xl rounded-lg border border-brand-border bg-white p-10 text-center text-brand-muted shadow-premium">
            Ładowanie produktu...
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="section-shell text-brand">
        <div className="site-container">
          <div className="mx-auto max-w-2xl rounded-lg border border-brand-border bg-white p-10 text-center shadow-premium">
            <p className="mb-4 text-2xl font-semibold">Produkt nie znaleziony</p>
            <p className="text-brand-muted">{error || 'Wybierz inny produkt z naszej kolekcji.'}</p>
          </div>
        </div>
      </div>
    )
  }

  const handleAddToCart = (quantity: number) => {
    addToCart(product, quantity, selectedSize, selectedColor)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="section-shell text-brand">
      <div className="site-container">
        <div className="grid items-start gap-10 lg:grid-cols-[1.08fr_0.92fr]">
          <ProductGallery images={product.images} />

          <div className="space-y-6">
            <ProductInfo product={product} />

            <section className="rounded-lg border border-brand-border bg-white p-6 shadow-premium sm:p-8">
              <SizeSelector sizes={product.sizes} selectedSize={selectedSize} onChange={setSelectedSize} />

              <div className="mt-8">
                <p className="section-kicker">Kolor</p>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      className={`min-h-12 rounded-lg border px-4 py-3 text-sm font-medium transition ${
                        selectedColor === color
                          ? 'border-brand-accent bg-brand-accent/10 text-brand'
                          : 'border-brand-border bg-white text-brand hover:border-brand-accent'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            </section>

            <AddToCartBar price={product.price} stockStatus={product.status} onAdd={handleAddToCart} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductPage
