import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <div className="section-shell text-brand">
      <div className="site-container">
        <div className="mx-auto max-w-2xl rounded-lg border border-brand-border bg-white p-10 text-center shadow-premium">
          <p className="section-kicker">404</p>
          <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">Strona nie została znaleziona</h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-brand-muted">Link jest nieaktywny lub strona została przeniesiona.</p>
          <Link to="/" className="mt-8 inline-flex min-h-12 items-center justify-center rounded-lg bg-brand px-7 py-3 text-sm font-semibold text-white transition hover:bg-brand-accent">
            Powrót do strony głównej
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage
