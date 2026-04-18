import PageHeader from '../components/ui/PageHeader'

const values = [
  {
    title: 'Rzemiosło',
    text: 'Wybieramy materiały, które dobrze się starzeją, a każdy model projektujemy z naciskiem na proporcje i wykończenie.',
  },
  {
    title: 'Odpowiedzialność',
    text: 'Pracujemy w krótkich seriach i unikamy nadprodukcji. Kolekcje mają uzupełniać garderobę, nie tworzyć nadmiaru.',
  },
  {
    title: 'Spokój formy',
    text: 'Minimalistyczne linie, naturalne barwy i tekstury są ważniejsze niż sezonowe dekoracje.',
  },
]

const AboutPage = () => {
  return (
    <div className="section-shell text-brand">
      <div className="site-container">
        <PageHeader
          kicker="O Rosna"
          title="Polska marka dla nowoczesnej elegancji."
          lead="Rosna powstała z potrzeby tworzenia ubrań spokojnych, wygodnych i dopracowanych. Projektujemy rzeczy, które nie dominują sylwetki, tylko ją porządkują."
        />

        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          {values.map((item) => (
            <article key={item.title} className="premium-card flex flex-col p-7 text-center">
              <h2 className="text-xl font-semibold">{item.title}</h2>
              <p className="mt-4 text-sm leading-7 text-brand-muted">{item.text}</p>
            </article>
          ))}
        </div>

        <section className="mx-auto mt-12 max-w-4xl rounded-lg border border-brand-border bg-white p-8 text-center shadow-premium sm:p-10">
          <p className="section-kicker">Atelier</p>
          <h2 className="text-3xl font-semibold leading-tight">Mniej bodźców, więcej jakości.</h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-brand-muted">
            Każda kolekcja jest budowana wokół kilku mocnych form, naturalnych tkanin i palety, która łatwo łączy się z codzienną garderobą.
          </p>
        </section>
      </div>
    </div>
  )
}

export default AboutPage
