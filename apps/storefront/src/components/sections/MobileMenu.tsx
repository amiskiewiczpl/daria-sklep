import { Link } from 'react-router-dom'

interface MobileMenuProps {
  open: boolean
  onClose: () => void
  cartItemCount: number
}

const MobileMenu = ({ open, onClose, cartItemCount }: MobileMenuProps) => {
  if (!open) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm">
      <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-white p-6 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="mb-8 inline-flex min-h-11 items-center rounded-lg border border-brand-border px-4 py-2 text-sm text-brand"
        >
          Zamknij
        </button>
        <nav className="flex flex-col gap-5 text-lg font-medium text-brand">
          <Link to="/" onClick={onClose}>Strona główna</Link>
          <Link to="/sklep" onClick={onClose}>Sklep</Link>
          <Link to="/made-to-order" onClick={onClose}>Made to order</Link>
          <Link to="/o-marce" onClick={onClose}>O marce</Link>
          <Link to="/faq" onClick={onClose}>FAQ</Link>
          <Link to="/kontakt" onClick={onClose}>Kontakt</Link>
          <Link to="/polityki/dostawa" onClick={onClose}>Polityki</Link>
          <Link to="/koszyk" onClick={onClose} className="mt-4 text-brand-accent">
            Koszyk ({cartItemCount})
          </Link>
        </nav>
      </div>
    </div>
  )
}

export default MobileMenu
