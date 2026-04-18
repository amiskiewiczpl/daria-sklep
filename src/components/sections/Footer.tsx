import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="border-t border-brand-border bg-white py-16 text-brand">
      <div className="site-container grid gap-10 text-center md:grid-cols-4 md:text-left">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold uppercase">Rosna</h3>
          <p className="text-sm leading-7 text-brand-muted">
            Polska marka premium oparta na naturalnych tkaninach, krótkich seriach i spokojnej elegancji.
          </p>
        </div>
        <div className="space-y-3">
          <h4 className="text-xs font-semibold uppercase text-brand-accent">Oferta</h4>
          <Link to="/sklep" className="block hover:text-brand-accent">Wszystkie produkty</Link>
          <Link to="/made-to-order" className="block hover:text-brand-accent">Made to order</Link>
          <Link to="/kategoria/spodnie" className="block hover:text-brand-accent">Spodnie</Link>
        </div>
        <div className="space-y-3">
          <h4 className="text-xs font-semibold uppercase text-brand-accent">Firma</h4>
          <Link to="/o-marce" className="block hover:text-brand-accent">O marce</Link>
          <Link to="/faq" className="block hover:text-brand-accent">FAQ</Link>
          <Link to="/polityki/dostawa" className="block hover:text-brand-accent">Polityki</Link>
        </div>
        <div className="space-y-3">
          <h4 className="text-xs font-semibold uppercase text-brand-accent">Wsparcie</h4>
          <p className="text-brand-muted">hello@rosna.com</p>
          <p className="text-brand-muted">+48 123 456 789</p>
          <p className="text-brand-muted">Newsletter przez Mailchimp lub ConvertKit</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
