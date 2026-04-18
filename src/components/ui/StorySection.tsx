const StorySection = () => (
  <section className="section-shell">
    <div className="site-container">
      <div className="grid gap-8 rounded-lg border border-brand-border bg-white p-8 shadow-premium lg:grid-cols-[1.05fr_0.95fr]">
        <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-left">
          <p className="section-kicker">Historia Rosna</p>
          <h2 className="section-title">Ponadczasowa elegancja, stworzona z myślą o ciele i codzienności</h2>
          <p className="mt-5 text-base leading-8 text-brand-muted">
            Nasze kolekcje łączą klasyczne sylwetki z nowoczesnymi detalami. Każdy model powstaje w limitowanej serii, aby zapewnić spokojny charakter i dobre dopasowanie.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-brand-border bg-brand-background p-5">
              <p className="text-sm font-semibold uppercase text-brand-accent">Rzemiosło</p>
              <p className="mt-3 text-sm leading-7 text-brand-muted">Wyselekcjonowane tkaniny, ręczne wykończenia i staranne szycie.</p>
            </div>
            <div className="rounded-lg border border-brand-border bg-brand-background p-5">
              <p className="text-sm font-semibold uppercase text-brand-accent">Wizja</p>
              <p className="mt-3 text-sm leading-7 text-brand-muted">Minimalistyczne formy, trwały styl i odpowiedzialna produkcja.</p>
            </div>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          <div className="rounded-lg bg-brand-background p-6">
            <p className="text-sm font-semibold uppercase text-brand-accent">Ekskluzywna linia</p>
            <p className="mt-5 text-xl font-semibold">Limitowana edycja sezonowa</p>
          </div>
          <div className="rounded-lg bg-brand-background p-6">
            <p className="text-sm font-semibold uppercase text-brand-accent">Wybór projektantki</p>
            <p className="mt-5 text-xl font-semibold">Pierwsze spojrzenie na kolekcję</p>
          </div>
        </div>
      </div>
    </div>
  </section>
)

export default StorySection
