import { Route, Routes } from 'react-router-dom'
import AboutPage from './pages/AboutPage'
import Cart from './pages/Cart'
import CategoryPage from './pages/CategoryPage'
import Checkout from './pages/Checkout'
import ContactPage from './pages/ContactPage'
import FAQPage from './pages/FAQPage'
import HomePage from './pages/HomePage'
import MadeToOrderPage from './pages/MadeToOrderPage'
import NotFoundPage from './pages/NotFoundPage'
import PoliciesPage from './pages/PoliciesPage'
import PolicyPage from './pages/PolicyPage'
import ProductPage from './pages/ProductPage'
import Products from './pages/Products'

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/sklep" element={<Products />} />
      <Route path="/kategoria/:slug" element={<CategoryPage />} />
      <Route path="/produkt/:slug" element={<ProductPage />} />
      <Route path="/made-to-order" element={<MadeToOrderPage />} />
      <Route path="/o-marce" element={<AboutPage />} />
      <Route path="/faq" element={<FAQPage />} />
      <Route path="/kontakt" element={<ContactPage />} />
      <Route path="/polityki" element={<PoliciesPage />} />
      <Route path="/polityki/:slug" element={<PolicyPage />} />
      <Route path="/koszyk" element={<Cart />} />
      <Route path="/zamowienie" element={<Checkout />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default Router
