import { Routes, Route } from 'react-router-dom'
import AnnouncementBar from './components/sections/AnnouncementBar'
import Header from './components/sections/Header'
import Footer from './components/sections/Footer'
import HomePage from './pages/HomePage'
import Products from './pages/Products'
import CategoryPage from './pages/CategoryPage'
import ProductPage from './pages/ProductPage'
import AboutPage from './pages/AboutPage'
import FAQPage from './pages/FAQPage'
import ContactPage from './pages/ContactPage'
import PoliciesPage from './pages/PoliciesPage'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-brand-background text-brand-default">
      <AnnouncementBar />
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/produkty" element={<Products />} />
          <Route path="/kategoria/:categoryName" element={<CategoryPage />} />
          <Route path="/produkt/:slug" element={<ProductPage />} />
          <Route path="/o-nas" element={<AboutPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/kontakt" element={<ContactPage />} />
          <Route path="/regulamin" element={<PoliciesPage />} />
          <Route path="/koszyk" element={<Cart />} />
          <Route path="/zamowienie" element={<Checkout />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App