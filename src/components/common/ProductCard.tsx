import { Link } from 'react-router-dom'
import { Product } from '../../types'

interface ProductCardProps {
  product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={product.images[0]}
        alt={product.name}
        className="w-full h-64 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-gray-600">{product.description}</p>
        <p className="text-xl font-bold mt-2">${product.price}</p>
        <Link
          to={`/products/${product.id}`}
          className="mt-4 bg-black text-white px-4 py-2 rounded block text-center"
        >
          View Details
        </Link>
      </div>
    </div>
  )
}

export default ProductCard