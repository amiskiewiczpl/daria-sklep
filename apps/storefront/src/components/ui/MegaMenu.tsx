import { Link } from 'react-router-dom'

const items = [
  { label: 'Nowa kolekcja', to: '/sklep' },
  { label: 'Made to order', to: '/made-to-order' },
  { label: 'O marce', to: '/o-marce' },
]

const MegaMenu = () => (
  <div className="rounded-lg border border-brand-border bg-white p-8 shadow-premium">
    <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
      <div>
        <p className="section-kicker">Kolekcje</p>
        <div className="space-y-4">
          {items.map((item) => (
            <Link key={item.to} to={item.to} className="block text-lg font-semibold text-brand transition hover:text-brand-accent">
              {item.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <article className="rounded-lg border border-brand-border bg-brand-background p-6">
          <p className="section-kicker">Edytorial</p>
          <h3 className="text-2xl font-semibold">Naturalne tkaniny</h3>
          <p className="mt-3 text-sm leading-7 text-brand-muted">Len, wełna, wiskoza i bawełna w spokojnych proporcjach.</p>
        </article>
        <article className="rounded-lg border border-brand-border bg-brand-background p-6">
          <p className="section-kicker">Atelier</p>
          <h3 className="text-2xl font-semibold">Krótkie serie</h3>
          <p className="mt-3 text-sm leading-7 text-brand-muted">Mniej modeli, więcej kontroli nad detalem i dopasowaniem.</p>
        </article>
      </div>
    </div>
  </div>
)

export default MegaMenu
