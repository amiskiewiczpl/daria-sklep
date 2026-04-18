import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <div className="container mx-auto px-6 py-24 text-center text-brand-default">
      <p className="text-sm uppercase tracking-[0.35em] text-brand-muted mb-4">404</p>
      <h1 className="text-5xl font-semibold mb-6">Page not found</h1>
      <p className="text-brand-muted mb-8">The link you followed may be broken, or the page has been removed.</p>
      <Link
        to="/"
        className="inline-flex items-center justify-center rounded-full bg-brand-default px-8 py-4 text-sm font-semibold text-white transition hover:bg-brand-accent"
      >
        Return to homepage
      </Link>
    </div>
  )
}

export default NotFoundPage