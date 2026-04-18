import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../../hooks/useCart'
import MobileMenu from './MobileMenu'

const Header = () => {
  const { cart } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="bg-white border-b border-brand-border">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/" className="text-2xl font-black tracking-[0.2em] text-brand-default">
          ROSNA
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          <Link to="/produkty" className="text-sm font-medium text-brand-default hover:text-brand-accent">
            Oferta
          </Link>
          <Link to="/o-nas" className="text-sm font-medium text-brand-default hover:text-brand-accent">
            O nas
          </Link>
          <Link to="/faq" className="text-sm font-medium text-brand-default hover:text-brand-accent">
            FAQ
          </Link>
          <Link to="/kontakt" className="text-sm font-medium text-brand-default hover:text-brand-accent">
            Kontakt
          </Link>
          <Link to="/regulamin" className="text-sm font-medium text-brand-default hover:text-brand-accent">
            Regulamin
          </Link>
          <Link to="/koszyk" className="text-sm font-semibold text-brand-accent">
            Koszyk ({cart.length})
          </Link>
        </nav>
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full border border-brand-border px-4 py-2 text-sm font-medium text-brand-default md:hidden"
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