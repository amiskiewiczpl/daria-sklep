const AboutPage = () => {
  return (
    <div className="container mx-auto px-6 py-16 text-brand-default">
      <div className="max-w-3xl space-y-8">
        <p className="text-sm uppercase tracking-[0.35em] text-brand-muted">O Rosna</p>
        <h1 className="text-4xl font-semibold">Polska marka dla nowoczesnej elegancji.</h1>
        <p className="text-brand-muted leading-relaxed">
          Rosna powstała z pasji do podkreślania codziennego stylu poprzez wygodne fasony, dopracowane tkaniny i ponadczasowe barwy.
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-[1.5rem] border border-brand-border bg-white p-8 shadow-premium">
            <h2 className="text-xl font-semibold mb-3">Rękodzieło</h2>
            <p className="text-brand-muted leading-relaxed">
              Wybieramy kolekcje ze szczególną dbałością o jakość materiałów i wykończenie, by ubrania służyły przez długi czas.
            </p>
          </div>
          <div className="rounded-[1.5rem] border border-brand-border bg-white p-8 shadow-premium">
            <h2 className="text-xl font-semibold mb-3">Odpowiedzialność</h2>
            <p className="text-brand-muted leading-relaxed">
              Stawiamy na świadome wybory i limitowane serie, aby ograniczyć marnotrawstwo i zachować trwały design.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutPage