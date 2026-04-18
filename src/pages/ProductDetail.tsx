import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { products } from '../data/products'
import { useCart } from '../hooks/useCart'

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>()
  const product = products.find(p => p.id === id)
  const { addToCart } = useCart()
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [quantity, setQuantity] = useState(1)

  if (!product) {
    return <div>Produkt nie znaleziony</div>
  }

  const handleAddToCart = () => {
    if (selectedSize && selectedColor) {
      addToCart(product, quantity, selectedSize, selectedColor)
      alert('Dodano do koszyka!')
    } else {
      alert('Wybierz rozmiar i kolor')
    }
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-96 object-cover rounded-lg"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-2xl font-bold mb-4">{product.price} zł</p>

          <div className="mb-4">
            <label className="block mb-2">Rozmiar:</label>
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="border p-2 rounded"
            >
              <option value="">Wybierz rozmiar</option>
              {product.sizes.map(size => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-2">Kolor:</label>
            <select
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              className="border p-2 rounded"
            >
              <option value="">Wybierz kolor</option>
              {product.colors.map(color => (
                <option key={color} value={color}>{color}</option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-2">Ilość:</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="border p-2 rounded w-20"
            />
          </div>

          <button
            onClick={handleAddToCart}
            className="bg-black text-white px-8 py-3 rounded-lg"
          >
            Dodaj do koszyka
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail