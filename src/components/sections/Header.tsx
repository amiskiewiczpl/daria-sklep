import { Link } from 'react-router-dom'
import { useCart } from '../../hooks/useCart'

const Header = () => {
  const { cart } = useCart()

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-gray-800">
          Rosna
        </Link>
        <nav className="space-x-4">
          <Link to="/" className="text-gray-600 hover:text-gray-800">Home</Link>
          <Link to="/products" className="text-gray-600 hover:text-gray-800">Products</Link>
          <Link to="/cart" className="text-gray-600 hover:text-gray-800">
            Cart ({cart.length})
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header