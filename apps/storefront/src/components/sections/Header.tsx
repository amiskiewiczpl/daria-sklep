import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../../hooks/useCart'
import MobileMenu from './MobileMenu'

const Header = () => {
  const { cart } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="border-b border-brand-border bg-white text-brand">
      <div className="site-container flex min-h-20 items-center justify-between">
        <Link to="/" className="text-2xl font-black uppercase text-brand">
          ROSNA
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          <Link to="/sklep" className="text-sm font-medium hover:text-brand-accent">Sklep</Link>
          <Link to="/made-to-order" className="text-sm font-medium hover:text-brand-accent">Made to order</Link>
          <Link to="/o-marce" className="text-sm font-medium hover:text-brand-accent">O marce</Link>
          <Link to="/faq" className="text-sm font-medium hover:text-brand-accent">FAQ</Link>
          <Link to="/kontakt" className="text-sm font-medium hover:text-brand-accent">Kontakt</Link>
          <Link to="/koszyk" className="text-sm font-semibold text-brand-accent">Koszyk ({cart.length})</Link>
        </nav>
        <button
          type="button"
          className="inline-flex min-h-11 items-center justify-center rounded-lg border border-brand-border px-4 py-2 text-sm font-medium text-brand md:hidden"
          onClick={() => setMenuOpen(true)}
        >
          Menu
        </button>
      </div>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} cartItemCount={cart.length} />
    </header>
  )
}

export default Header
