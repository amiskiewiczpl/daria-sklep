import { Link } from 'react-router-dom'
import ProductCard from '../components/common/ProductCard'
import { products } from '../data/products'

const Home = () => {
  const featuredProducts = products.slice(0, 3)

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gray-100 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Rosna</h1>
          <p className="text-xl mb-8">Premium fashion for the discerning woman</p>
          <Link
            to="/products"
            className="bg-black text-white px-8 py-3 rounded-lg text-lg"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home