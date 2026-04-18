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
      <div className="absolute right-0 top-0 h-full w-[280px] bg-white p-6 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="mb-8 inline-flex items-center rounded-full border border-brand-border px-4 py-2 text-sm text-brand-default"
        >
          Zamknij
        </button>
        <nav className="flex flex-col gap-5 text-lg font-medium text-brand-default">
          <Link to="/" onClick={onClose}>Strona główna</Link>
          <Link to="/produkty" onClick={onClose}>Oferta</Link>
          <Link to="/o-nas" onClick={onClose}>O nas</Link>
          <Link to="/faq" onClick={onClose}>FAQ</Link>
          <Link to="/kontakt" onClick={onClose}>Kontakt</Link>
          <Link to="/regulamin" onClick={onClose}>Regulamin</Link>
          <Link to="/koszyk" onClick={onClose} className="mt-4 text-brand-accent">
            Koszyk ({cartItemCount})
          </Link>
        </nav>
      </div>
    </div>
  )
}

export default MobileMenu