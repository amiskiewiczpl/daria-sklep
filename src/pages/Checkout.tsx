import { useCart } from '../hooks/useCart'

const Checkout = () => {
  const { cart, getTotal, clearCart } = useCart()

  const handleCheckout = () => {
    // Placeholder for external checkout integration (e.g., Stripe Checkout)
    alert('Redirecting to external payment processor...')
    // In real implementation, redirect to Stripe or similar
    // window.location.href = 'https://checkout.stripe.com/pay/...'
    clearCart()
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <div className="bg-gray-100 p-8 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        {cart.map((item, index) => (
          <div key={index} className="flex justify-between mb-2">
            <span>{item.product.name} (x{item.quantity})</span>
            <span>${item.product.price * item.quantity}</span>
          </div>
        ))}
        <div className="border-t pt-4 mt-4">
          <div className="flex justify-between font-bold">
            <span>Total:</span>
            <span>${getTotal()}</span>
          </div>
        </div>
        <button
          onClick={handleCheckout}
          className="bg-black text-white px-8 py-3 rounded-lg mt-8 w-full"
        >
          Pay with External Processor
        </button>
        <p className="text-sm text-gray-600 mt-4">
          This will redirect to an external payment service.
        </p>
      </div>
    </div>
  )
}

export default Checkout