import PageHeader from '../components/ui/PageHeader'

const faqs = [
  {
    question: 'Jaki jest czas dostawy?',
    answer: 'Standardowa dostawa trwa 3-7 dni roboczych. Produkty made to order mają osobny czas realizacji podany przy produkcie.',
  },
  {
    question: 'Czy mogę zwrócić produkt?',
    answer: 'Tak, zwroty przyjmujemy w ciągu 14 dni od dostawy zgodnie z zasadami opisanymi w regulaminie.',
  },
  {
    question: 'Jak dobrać rozmiar?',
    answer: 'Wskazówki dotyczące rozmiaru znajdują się przy każdym produkcie. Przy modelach na zamówienie pomagamy dobrać proporcje indywidualnie.',
  },
]

const FAQPage = () => {
  return (
    <div className="section-shell text-brand">
      <div className="site-container">
        <PageHeader
          kicker="FAQ"
          title="Najczęściej zadawane pytania"
          lead="Krótko i konkretnie: dostawa, zwroty, rozmiary oraz proces szycia na zamówienie."
        />

        <div className="mx-auto grid max-w-4xl gap-6">
          {faqs.map((item) => (
            <article key={item.question} className="premium-card p-8 text-center sm:text-left">
              <h2 className="text-xl font-semibold">{item.question}</h2>
              <p className="mt-4 text-sm leading-7 text-brand-muted">{item.answer}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FAQPage
