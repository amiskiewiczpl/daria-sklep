import { Link } from 'react-router-dom'
import { useCart } from '../hooks/useCart'

const Cart = () => {
  const { cart, removeFromCart, getTotal } = useCart()

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((item, index) => (
              <div key={index} className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center space-x-4">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-semibold">{item.product.name}</h3>
                    <p>Size: {item.selectedSize}, Color: {item.selectedColor}</p>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold">${item.product.price * item.quantity}</p>
                  <button
                    onClick={() => removeFromCart(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-right">
            <p className="text-xl font-bold">Total: ${getTotal()}</p>
            <Link
              to="/checkout"
              className="bg-black text-white px-8 py-3 rounded-lg inline-block mt-4"
            >
              Proceed to Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  )
}

export default Cart