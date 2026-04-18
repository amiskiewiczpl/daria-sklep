import { HomepageSection } from '@rosna/shared'
import { Link } from 'react-router-dom'
import ProductCard from '../components/common/ProductCard'
import NewsletterSection from '../components/ui/NewsletterSection'
import { useHomepageSections } from '../hooks/useHomepageSections'
import { usePublishedProducts } from '../hooks/usePublishedProducts'

const fallbackHeroImage =
  'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1600&q=85'

const collectionTiles = [
  {
    title: 'Lniana koszula',
    text: 'Miekka struktura, spokojna forma i proporcje gotowe do warstw.',
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=85',
    href: '/kategoria/koszule',
  },
  {
    title: 'Spodnie z lnu',
    text: 'Wysoki stan, swobodna linia i tkanina, ktora pracuje z ruchem.',
    image: 'https://images.unsplash.com/photo-1495121605193-b116b5b9c5d6?auto=format&fit=crop&w=900&q=85',
    href: '/kategoria/spodnie',
  },
  {
    title: 'Dzianina premium',
    text: 'Naturalne wlokna, gladkie wykonczenia i komfort przez caly dzien.',
    image: 'https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=900&q=85',
    href: '/kategoria/welna',
  },
  {
    title: 'Sukienki na zamowienie',
    text: 'Sylwetki szyte wolniej, z naciskiem na dopasowanie i detal.',
    image: 'https://images.unsplash.com/photo-1520962918057-4bf0ab08f3aa?auto=format&fit=crop&w=900&q=85',
    href: '/made-to-order',
  },
]

const materialTiles = [
  { title: 'Len', text: 'Oddychajacy, lekko nieregularny, pieknie uklada sie w prostych formach.' },
  { title: 'Welna', text: 'Ciepla, sprezysta i trwala. Wybierana do modeli na wiele sezonow.' },
  { title: 'Wiskoza', text: 'Plynny chwyt, miekkosc przy skorze i subtelny polysk w ruchu.' },
  { title: 'Bawelna', text: 'Codzienna baza z naturalnym wykonczeniem i stabilna struktura.' },
]

const processTiles = [
  { title: 'Konsultacja', text: 'Ustalamy sylwetke, dlugosci, tkanine i sposob noszenia.' },
  { title: 'Konstrukcja', text: 'Model powstaje w rytmie malej pracowni, z kontrola proporcji.' },
  { title: 'Dopasowanie', text: 'Ostatnie poprawki sa podporzadkowane wygodzie i czystej linii.' },
]

const lookbookTiles = [
  {
    title: 'Poranek w miescie',
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

const fallbackSections: Record<string, Pick<HomepageSection, 'title' | 'subtitle' | 'body' | 'ctaLabel' | 'ctaHref' | 'imageUrl'>> = {
  hero: {
    subtitle: 'Rosna premium',
    title: 'Naturalne tkaniny, spokojna forma, precyzyjne dopasowanie.',
    body: 'Kolekcje Rosna powstaja z mysla o garderobie, ktora zostaje na dluzej: minimalistycznej, miekkiej w dotyku i dopracowanej w proporcjach.',
    ctaLabel: 'Zobacz kolekcje',
    ctaHref: '/sklep',
    imageUrl: fallbackHeroImage,
  },
  new_collection: {
    subtitle: 'Nowa kolekcja',
    title: 'Cztery spokojne filary sezonu',
    body: 'Kazdy element ma wlasna fakture, ale wszystkie pracuja w jednej, uporzadkowanej garderobie.',
  },
  materials: {
    subtitle: 'Materialy',
    title: 'Filozofia zaczyna sie od tkaniny',
    body: 'Wybieramy naturalne wlokna, wywazona gramature i faktury, ktore nie potrzebuja mocnej dekoracji.',
  },
  bestsellers: {
    subtitle: 'Bestsellery',
    title: 'Najczesciej wybierane formy',
    body: 'Produkty z rowna wysokoscia kart, stabilnym obrazem i CTA wyrownanym do dolnej krawedzi.',
  },
  made_to_order: {
    subtitle: 'Made to order',
    title: 'Szycie wolniej, blizej ciala i potrzeb.',
    body: 'Modele na zamowienie powstaja po konsultacji wymiarow, tkaniny i sposobu noszenia. To proces dla osob, ktore oczekuja spokoju, precyzji i pelnej kontroli nad detalem.',
    ctaLabel: 'Przejdz do made to order',
    ctaHref: '/made-to-order',
  },
  story: {
    subtitle: 'Historia marki',
    title: 'Rosna porzadkuje garderobe zamiast ja zageszczac.',
    body: 'Projektujemy krotkie serie oparte na powtarzalnych proporcjach, spokojnych kolorach i detalach, ktore maja znaczenie dopiero z bliska. Mniej bodzcow, wiecej jakosci.',
  },
  lookbook: {
    subtitle: 'Lookbook',
    title: 'Sylwetki w naturalnym swietle',
    body: 'Editorialowy rytm obrazow, stale proporcje i wysrodkowany grid bez przypadkowych przesuniec.',
  },
}

const gridClassForCount = (count: number) => {
  if (count === 2) return 'grid-cols-1 md:grid-cols-2'
  if (count === 3) return 'grid-cols-1 md:grid-cols-3'
  if (count === 4) return 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-4'
  return 'adaptive-card-grid'
}

const SectionHeader = ({ section }: { section: Pick<HomepageSection, 'subtitle' | 'title' | 'body'> }) => (
  <div className="section-heading">
    <p className="section-kicker">{section.subtitle}</p>
    <h2 className="section-title">{section.title}</h2>
    {section.body ? <p className="section-lead">{section.body}</p> : null}
  </div>
)

const EditorialCard = ({ title, text, image, href }: { title: string; text: string; image?: string; href?: string }) => {
  const content = (
    <article className="premium-card group flex flex-col">
      {image ? (
        <div className="aspect-[4/5] overflow-hidden bg-brand-background">
          <img src={image} alt={title} className="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-[1.04]" />
        </div>
      ) : null}
      <div className="flex flex-1 flex-col p-6 text-center">
        <h3 className="text-xl font-semibold leading-snug">{title}</h3>
        <p className="line-clamp-3 mt-4 text-sm leading-7 text-brand-muted">{text}</p>
        {href ? <span className="mt-auto inline-flex justify-center pt-7 text-sm font-semibold text-brand-accent">Zobacz wiecej</span> : null}
      </div>
    </article>
  )

  return href ? <Link to={href}>{content}</Link> : content
}

const HomePage = () => {
  const { products, loading: productsLoading, error: productsError } = usePublishedProducts()
  const { sections, loading: sectionsLoading, error: sectionsError } = useHomepageSections()
  const getSection = (key: string) => sections.find((section) => section.key === key) ?? fallbackSections[key]
  const hero = getSection('hero')
  const newCollection = getSection('new_collection')
  const materials = getSection('materials')
  const bestsellersSection = getSection('bestsellers')
  const madeToOrder = getSection('made_to_order')
  const story = getSection('story')
  const lookbook = getSection('lookbook')
  const bestsellers = products.filter((product) => product.isBestSeller || product.isNew || product.isFeatured).slice(0, 4)
  const madeToOrderProducts = products.filter((product) => product.status === 'made-to-order' || product.isMadeToOrder).slice(0, 2)
  const pageError = productsError || sectionsError

  return (
    <div className="bg-brand-background text-brand">
      <section className="section-shell">
        <div className="site-container">
          <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="mx-auto max-w-xl text-center lg:mx-0 lg:text-left">
              <p className="section-kicker">{hero.subtitle}</p>
              <h1 className="text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">{hero.title}</h1>
              <p className="mx-auto mt-6 max-w-lg text-base leading-8 text-brand-muted lg:mx-0">{hero.body}</p>
              {pageError ? <p className="mt-5 rounded-lg border border-brand-border bg-white p-3 text-sm text-brand-muted">{pageError}</p> : null}
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
                <Link to={hero.ctaHref || '/sklep'} className="inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-brand px-7 py-3 text-sm font-semibold text-white transition hover:bg-brand-accent sm:w-auto">
                  {hero.ctaLabel || 'Zobacz kolekcje'}
                </Link>
                <Link to="/o-marce" className="inline-flex min-h-12 w-full items-center justify-center rounded-lg border border-brand-border bg-white px-7 py-3 text-sm font-semibold text-brand transition hover:border-brand-accent hover:text-brand-accent sm:w-auto">
                  Poznaj marke
                </Link>
              </div>
            </div>
            <div className="mx-auto w-full max-w-2xl overflow-hidden rounded-lg bg-white shadow-premium">
              <img src={hero.imageUrl || fallbackHeroImage} alt="Modelka w minimalistycznej stylizacji Rosna" className="aspect-[4/5] w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {sectionsLoading ? <div className="site-container py-6 text-center text-sm text-brand-muted">Ladowanie sekcji homepage...</div> : null}

      <section className="section-shell">
        <div className="site-container">
          <SectionHeader section={newCollection} />
          <div className={`grid gap-6 ${gridClassForCount(collectionTiles.length)}`}>
            {collectionTiles.map((tile) => <EditorialCard key={tile.title} {...tile} />)}
          </div>
        </div>
      </section>

      <section className="section-shell bg-white">
        <div className="site-container">
          <SectionHeader section={materials} />
          <div className={`grid gap-6 ${gridClassForCount(materialTiles.length)}`}>
            {materialTiles.map((tile) => <EditorialCard key={tile.title} {...tile} />)}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="site-container">
          <SectionHeader section={bestsellersSection} />
          {productsLoading ? (
            <div className="premium-card p-10 text-center text-brand-muted">Ladowanie produktow...</div>
          ) : bestsellers.length ? (
            <div className={`grid gap-6 ${gridClassForCount(bestsellers.length)}`}>
              {bestsellers.map((product) => <ProductCard key={product.id} product={product} />)}
            </div>
          ) : (
            <div className="premium-card p-10 text-center text-brand-muted">Brak opublikowanych produktow do pokazania.</div>
          )}
        </div>
      </section>

      <section className="section-shell bg-white">
        <div className="site-container">
          <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="mx-auto max-w-xl text-center lg:mx-0 lg:text-left">
              <p className="section-kicker">{madeToOrder.subtitle}</p>
              <h2 className="section-title">{madeToOrder.title}</h2>
              <p className="mt-5 text-base leading-8 text-brand-muted">{madeToOrder.body}</p>
              <Link to={madeToOrder.ctaHref || '/made-to-order'} className="mt-8 inline-flex min-h-12 items-center justify-center rounded-lg bg-brand px-7 py-3 text-sm font-semibold text-white transition hover:bg-brand-accent">
                {madeToOrder.ctaLabel || 'Przejdz do made to order'}
              </Link>
            </div>
            <div className={`grid gap-6 ${gridClassForCount(madeToOrderProducts.length)}`}>
              {madeToOrderProducts.map((product) => <ProductCard key={product.id} product={product} />)}
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="site-container">
          <div className="mx-auto max-w-4xl text-center">
            <p className="section-kicker">{story.subtitle}</p>
            <h2 className="section-title">{story.title}</h2>
            <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-brand-muted">{story.body}</p>
          </div>
        </div>
      </section>

      <section className="section-shell bg-white">
        <div className="site-container">
          <SectionHeader section={{ subtitle: 'Proces', title: 'Trzy kroki pracy z forma', body: 'Uklad trzech kafli pozostaje trojkolumnowy na desktopie i nie tworzy samotnej karty w nowym rzedzie.' }} />
          <div className={`grid gap-6 ${gridClassForCount(processTiles.length)}`}>
            {processTiles.map((tile) => <EditorialCard key={tile.title} {...tile} />)}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="site-container">
          <SectionHeader section={lookbook} />
          <div className={`grid gap-6 ${gridClassForCount(lookbookTiles.length)}`}>
            {lookbookTiles.map((tile) => (
              <article key={tile.title} className="premium-card group">
                <div className="aspect-[3/4] overflow-hidden bg-brand-background">
                  <img src={tile.image} alt={tile.title} className="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-[1.04]" />
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
