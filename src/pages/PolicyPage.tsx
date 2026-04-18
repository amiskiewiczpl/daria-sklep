import { Link, useParams } from 'react-router-dom'
import PageHeader from '../components/ui/PageHeader'

const policyContent: Record<string, { title: string; content: string }> = {
  dostawa: {
    title: 'Dostawa',
    content: 'Wszystkie zamówienia wysyłamy w ciągu 24 godzin w dni robocze. Darmowa dostawa obowiązuje przy zamówieniach powyżej 200 zł.',
  },
  zwroty: {
    title: 'Zwroty',
    content: 'Zwroty przyjmujemy w ciągu 14 dni od dostawy. Towar musi być nieużywany i zapakowany w oryginalne opakowanie.',
  },
  wsparcie: {
    title: 'Wsparcie klienta',
    content: 'Nasz zespół jest dostępny od poniedziałku do piątku. W razie pytań napisz na hello@rosna.com.',
  },
}

const PolicyPage = () => {
  const { slug } = useParams()
  const policy = slug ? policyContent[slug] : undefined

  if (!policy) {
    return (
      <div className="section-shell text-brand">
        <div className="site-container">
          <div className="mx-auto max-w-2xl rounded-lg border border-brand-border bg-white p-10 text-center shadow-premium">
            <p className="mb-4 text-2xl font-semibold">Nie znaleziono polityki</p>
            <p className="mb-6 text-brand-muted">Sprawdź dostępne zasady lub wróć do strony głównej.</p>
            <Link to="/" className="inline-flex min-h-12 items-center justify-center rounded-lg bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-accent">
              Strona główna
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="section-shell text-brand">
      <div className="site-container">
        <PageHeader kicker="Polityka" title={policy.title} lead={policy.content} />

        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
          {Object.entries(policyContent).map(([key, item]) => (
            <Link key={key} to={`/polityki/${key}`} className="premium-card p-6 text-center text-brand">
              <p className="section-kicker">Polityka</p>
              <h2 className="text-lg font-semibold">{item.title}</h2>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PolicyPage
