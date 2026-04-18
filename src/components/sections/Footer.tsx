import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="border-t border-brand-border bg-white text-brand-default py-16">
      <div className="container mx-auto grid gap-8 md:grid-cols-4 px-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Rosna</h3>
          <p className="text-brand-muted leading-relaxed">
            Rosna to sklep modowy premium z polskimi kolekcjami i eleganckimi zestawami.
          </p>
        </div>
        <div className="space-y-3">
          <h4 className="text-sm uppercase tracking-[0.3em] text-brand-muted">Oferta</h4>
          <Link to="/produkty" className="block hover:text-brand-accent">Wszystkie produkty</Link>
          <Link to="/kategoria/legginsy" className="block hover:text-brand-accent">Legginsy</Link>
          <Link to="/kategoria/spodnie" className="block hover:text-brand-accent">Spodnie</Link>
        </div>
        <div className="space-y-3">
          <h4 className="text-sm uppercase tracking-[0.3em] text-brand-muted">Firma</h4>
          <Link to="/o-nas" className="block hover:text-brand-accent">O nas</Link>
          <Link to="/faq" className="block hover:text-brand-accent">FAQ</Link>
          <Link to="/regulamin" className="block hover:text-brand-accent">Regulamin</Link>
        </div>
        <div className="space-y-3">
          <h4 className="text-sm uppercase tracking-[0.3em] text-brand-muted">Wsparcie</h4>
          <p className="text-brand-muted">hello@rosna.com</p>
          <p className="text-brand-muted">+48 123 456 789</p>
          <p className="text-brand-muted">Newsletter przez Mailchimp lub ConvertKit</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer