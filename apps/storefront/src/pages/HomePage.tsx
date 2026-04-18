import { Link } from 'react-router-dom'
import ProductCard from '../components/common/ProductCard'
import NewsletterSection from '../components/ui/NewsletterSection'
import { usePublishedProducts } from '../hooks/usePublishedProducts'

const heroImage =
  'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1600&q=85'

const collectionTiles = [
  {
    title: 'Lniana koszula',
    text: 'Miękka struktura, spokojna forma i proporcje gotowe do warstw.',
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=85',
    href: '/kategoria/koszule',
  },
  {
    title: 'Spodnie z lnu',
    text: 'Wysoki stan, swobodna linia i tkanina, która pracuje z ruchem.',
    image: 'https://images.unsplash.com/photo-1495121605193-b116b5b9c5d6?auto=format&fit=crop&w=900&q=85',
    href: '/kategoria/spodnie',
  },
  {
    title: 'Dzianina premium',
    text: 'Naturalne włókna, gładkie wykończenia i komfort przez cały dzień.',
    image: 'https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=900&q=85',
    href: '/kategoria/welna',
  },
  {
    title: 'Sukienki na zamówienie',
    text: 'Sylwetki szyte wolniej, z naciskiem na dopasowanie i detal.',
    image: 'https://images.unsplash.com/photo-1520962918057-4bf0ab08f3aa?auto=format&fit=crop&w=900&q=85',
    href: '/made-to-order',
  },
]

const materialTiles = [
  {
    title: 'Len',
    text: 'Oddychający, lekko nieregularny, pięknie układa się w prostych formach.',
  },
  {
    title: 'Wełna',
    text: 'Ciepła, sprężysta i trwała. Wybierana do modeli na wiele sezonów.',
  },
  {
    title: 'Wiskoza',
    text: 'Płynny chwyt, miękkość przy skórze i subtelny połysk w ruchu.',
  },
  {
    title: 'Bawełna',
    text: 'Codzienna baza z naturalnym wykończeniem i stabilną strukturą.',
  },
]

const processTiles = [
  {
    title: 'Konsultacja',
    text: 'Ustalamy sylwetkę, długości, tkaninę i sposób noszenia.',
  },
  {
    title: 'Konstrukcja',
    text: 'Model powstaje w rytmie małej pracowni, z kontrolą proporcji.',
  },
  {
    title: 'Dopasowanie',
    text: 'Ostatnie poprawki są podporządkowane wygodzie i czystej linii.',
  },
]

const lookbookTiles = [
  {
    title: 'Poranek w mieście',
    image: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=900&q=85',
  },
  {
    title: 'Naturalna warstwa',
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=900&q=85',
  },
  {
    title: 'Wieczorna prostota',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=85',
  },
]

const gridClassForCount = (count: number) => {
  if (count === 2) {
    return 'grid-cols-1 md:grid-cols-2'
  }

  if (count === 3) {
    return 'grid-cols-1 md:grid-cols-3'
  }

  if (count === 4) {
    return 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-4'
  }

  return 'adaptive-card-grid'
}

interface SectionHeaderProps {
  kicker: string
  title: string
  lead?: string
}

const SectionHeader = ({ kicker, title, lead }: SectionHeaderProps) => (
  <div className="section-heading">
    <p className="section-kicker">{kicker}</p>
    <h2 className="section-title">{title}</h2>
    {lead ? <p className="section-lead">{lead}</p> : null}
  </div>
)

interface EditorialCardProps {
  title: string
  text: string
  image?: string
  href?: string
}

const EditorialCard = ({ title, text, image, href }: EditorialCardProps) => {
  const content = (
    <article className="premium-card group flex flex-col">
      {image ? (
        <div className="aspect-[4/5] overflow-hidden bg-brand-background">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-[1.04]"
          />
        </div>
      ) : null}
      <div className="flex flex-1 flex-col p-6 text-center">
        <h3 className="text-xl font-semibold leading-snug">{title}</h3>
        <p className="line-clamp-3 mt-4 text-sm leading-7 text-brand-muted">{text}</p>
        {href ? (
          <span className="mt-auto inline-flex justify-center pt-7 text-sm font-semibold text-brand-accent">
            Zobacz więcej
          </span>
        ) : null}
      </div>
    </article>
  )

  return href ? <Link to={href}>{content}</Link> : content
}

const HomePage = () => {
  const { products } = usePublishedProducts()
  const bestsellers = products.filter((product) => product.isBestSeller || product.isNew || product.isFeatured).slice(0, 4)
  const madeToOrderProducts = products.filter((product) => product.status === 'made-to-order' || product.isMadeToOrder).slice(0, 2)

  return (
    <div className="bg-brand-background text-brand">
      <section className="section-shell">
        <div className="site-container">
          <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="mx-auto max-w-xl text-center lg:mx-0 lg:text-left">
              <p className="section-kicker">Rosna premium</p>
              <h1 className="text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
                Naturalne tkaniny, spokojna forma, precyzyjne dopasowanie.
              </h1>
              <p className="mx-auto mt-6 max-w-lg text-base leading-8 text-brand-muted lg:mx-0">
                Kolekcje Rosna powstają z myślą o garderobie, która zostaje na dłużej:
                minimalistycznej, miękkiej w dotyku i dopracowanej w proporcjach.
              </p>
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
                <Link
                  to="/sklep"
                  className="inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-brand px-7 py-3 text-sm font-semibold text-white transition hover:bg-brand-accent sm:w-auto"
                >
                  Zobacz kolekcję
                </Link>
                <Link
                  to="/o-marce"
                  className="inline-flex min-h-12 w-full items-center justify-center rounded-lg border border-brand-border bg-white px-7 py-3 text-sm font-semibold text-brand transition hover:border-brand-accent hover:text-brand-accent sm:w-auto"
                >
                  Poznaj markę
                </Link>
              </div>
            </div>
            <div className="mx-auto w-full max-w-2xl overflow-hidden rounded-lg bg-white shadow-premium">
              <img src={heroImage} alt="Modelka w minimalistycznej stylizacji Rosna" className="aspect-[4/5] w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="site-container">
          <SectionHeader
            kicker="Nowa kolekcja"
            title="Cztery spokojne filary sezonu"
            lead="Każdy element ma własną fakturę, ale wszystkie pracują w jednej, uporządkowanej garderobie."
          />
          <div className={`grid gap-6 ${gridClassForCount(collectionTiles.length)}`}>
            {collectionTiles.map((tile) => (
              <EditorialCard key={tile.title} {...tile} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell bg-white">
        <div className="site-container">
          <SectionHeader
            kicker="Materiały"
            title="Filozofia zaczyna się od tkaniny"
            lead="Wybieramy naturalne włókna, wyważoną gramaturę i faktury, które nie potrzebują mocnej dekoracji."
          />
          <div className={`grid gap-6 ${gridClassForCount(materialTiles.length)}`}>
            {materialTiles.map((tile) => (
              <EditorialCard key={tile.title} {...tile} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="site-container">
          <SectionHeader
            kicker="Bestsellery"
            title="Najczęściej wybierane formy"
            lead="Produkty z równą wysokością kart, stabilnym obrazem i CTA wyrównanym do dolnej krawędzi."
          />
          <div className={`grid gap-6 ${gridClassForCount(bestsellers.length)}`}>
            {bestsellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell bg-white">
        <div className="site-container">
          <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="mx-auto max-w-xl text-center lg:mx-0 lg:text-left">
              <p className="section-kicker">Made to order</p>
              <h2 className="section-title">Szycie wolniej, bliżej ciała i potrzeb.</h2>
              <p className="mt-5 text-base leading-8 text-brand-muted">
                Modele na zamówienie powstają po konsultacji wymiarów, tkaniny i sposobu noszenia.
                To proces dla osób, które oczekują spokoju, precyzji i pełnej kontroli nad detalem.
              </p>
              <Link
                to="/made-to-order"
                className="mt-8 inline-flex min-h-12 items-center justify-center rounded-lg bg-brand px-7 py-3 text-sm font-semibold text-white transition hover:bg-brand-accent"
              >
                Przejdź do made to order
              </Link>
            </div>
            <div className={`grid gap-6 ${gridClassForCount(madeToOrderProducts.length)}`}>
              {madeToOrderProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="site-container">
          <div className="mx-auto max-w-4xl text-center">
            <p className="section-kicker">Historia marki</p>
            <h2 className="section-title">Rosna porządkuje garderobę zamiast ją zagęszczać.</h2>
            <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-brand-muted">
              Projektujemy krótkie serie oparte na powtarzalnych proporcjach, spokojnych kolorach
              i detalach, które mają znaczenie dopiero z bliska. Mniej bodźców, więcej jakości.
            </p>
          </div>
        </div>
      </section>

      <section className="section-shell bg-white">
        <div className="site-container">
          <SectionHeader
            kicker="Proces"
            title="Trzy kroki pracy z formą"
            lead="Układ trzech kafli pozostaje trójkolumnowy na desktopie i nie tworzy samotnej karty w nowym rzędzie."
          />
          <div className={`grid gap-6 ${gridClassForCount(processTiles.length)}`}>
            {processTiles.map((tile) => (
              <EditorialCard key={tile.title} {...tile} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="site-container">
          <SectionHeader
            kicker="Lookbook"
            title="Sylwetki w naturalnym świetle"
            lead="Editorialowy rytm obrazów, stałe proporcje i wyśrodkowany grid bez przypadkowych przesunięć."
          />
          <div className={`grid gap-6 ${gridClassForCount(lookbookTiles.length)}`}>
            {lookbookTiles.map((tile) => (
              <article key={tile.title} className="premium-card group">
                <div className="aspect-[3/4] overflow-hidden bg-brand-background">
                  <img
                    src={tile.image}
                    alt={tile.title}
                    className="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-[1.04]"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold">{tile.title}</h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell bg-white">
        <div className="site-container">
          <NewsletterSection />
        </div>
      </section>
    </div>
  )
}

export default HomePage
