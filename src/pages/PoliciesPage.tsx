const PoliciesPage = () => {
  return (
    <div className="container mx-auto px-6 py-16 text-brand-default">
      <div className="max-w-4xl space-y-10">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-brand-muted">Regulamin</p>
          <h1 className="text-4xl font-semibold">Dostawa, zwroty i obsługa klienta</h1>
        </div>
        <div className="space-y-6">
          <section className="rounded-[1.5rem] border border-brand-border bg-white p-8 shadow-premium">
            <h2 className="text-2xl font-semibold mb-3">Dostawa</h2>
            <p className="text-brand-muted leading-relaxed">
              Zamówienia wysyłamy w ciągu 24 godzin w dni robocze. Darmowa dostawa obowiązuje przy zamówieniach powyżej 200 zł.
            </p>
          </section>
          <section className="rounded-[1.5rem] border border-brand-border bg-white p-8 shadow-premium">
            <h2 className="text-2xl font-semibold mb-3">Zwroty</h2>
            <p className="text-brand-muted leading-relaxed">
              Zwroty przyjmujemy w ciągu 14 dni od dostawy. Towar powinien być nieużywany i w oryginalnym stanie, aby otrzymać pełny zwrot.
            </p>
          </section>
          <section className="rounded-[1.5rem] border border-brand-border bg-white p-8 shadow-premium">
            <h2 className="text-2xl font-semibold mb-3">Obsługa klienta</h2>
            <p className="text-brand-muted leading-relaxed">
              Nasz zespół jest dostępny od poniedziałku do piątku. W pilnych sprawach napisz na hello@rosna.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

export default PoliciesPage