import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="border-t border-brand-border bg-white text-brand-default py-16">
      <div className="container mx-auto grid gap-8 md:grid-cols-4 px-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Rosna</h3>
          <p className="text-brand-muted leading-relaxed">
            A premium fashion showroom built as a refined online experience for modern elegance.
          </p>
        </div>
        <div className="space-y-3">
          <h4 className="text-sm uppercase tracking-[0.3em] text-brand-muted">Shop</h4>
          <Link to="/products" className="block hover:text-brand-accent">All Products</Link>
          <Link to="/category/Dresses" className="block hover:text-brand-accent">Dresses</Link>
          <Link to="/category/Outerwear" className="block hover:text-brand-accent">Outerwear</Link>
        </div>
        <div className="space-y-3">
          <h4 className="text-sm uppercase tracking-[0.3em] text-brand-muted">Company</h4>
          <Link to="/about" className="block hover:text-brand-accent">About</Link>
          <Link to="/faq" className="block hover:text-brand-accent">FAQ</Link>
          <Link to="/policies" className="block hover:text-brand-accent">Policies</Link>
        </div>
        <div className="space-y-3">
          <h4 className="text-sm uppercase tracking-[0.3em] text-brand-muted">Support</h4>
          <p className="text-brand-muted">hello@rosna.com</p>
          <p className="text-brand-muted">+48 123 456 789</p>
          <p className="text-brand-muted">External newsletter via Mailchimp or ConvertKit</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer