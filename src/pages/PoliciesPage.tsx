import PageHeader from '../components/ui/PageHeader'

const policies = [
  {
    title: 'Dostawa',
    text: 'Zamówienia wysyłamy w ciągu 24 godzin w dni robocze. Darmowa dostawa obowiązuje przy zamówieniach powyżej 200 zł.',
  },
  {
    title: 'Zwroty',
    text: 'Zwroty przyjmujemy w ciągu 14 dni od dostawy. Produkt powinien być nieużywany i w oryginalnym stanie.',
  },
  {
    title: 'Obsługa klienta',
    text: 'Nasz zespół jest dostępny od poniedziałku do piątku. W pilnych sprawach napisz na hello@rosna.com.',
  },
]

const PoliciesPage = () => {
  return (
    <div className="section-shell text-brand">
      <div className="site-container">
        <PageHeader
          kicker="Regulamin"
          title="Dostawa, zwroty i obsługa klienta"
          lead="Najważniejsze zasady zakupów w jednym miejscu, ułożone czytelnie i bez przeładowania treścią."
        />

        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          {policies.map((policy) => (
            <section key={policy.title} className="premium-card p-7 text-center">
              <h2 className="text-xl font-semibold">{policy.title}</h2>
              <p className="mt-4 text-sm leading-7 text-brand-muted">{policy.text}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PoliciesPage
