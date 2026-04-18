const FAQPage = () => {
  const faqs = [
    {
      question: 'Jaki jest czas dostawy?',
      answer: 'Standardowa dostawa trwa 3-7 dni roboczych. Dostępna jest też opcja ekspresowa przy kasie.'
    },
    {
      question: 'Czy mogę zwrócić produkt?',
      answer: 'Tak, zwroty przyjmujemy w ciągu 14 dni od dostawy zgodnie z zasadami opisanymi w regulaminie.'
    },
    {
      question: 'Jak dobrać rozmiar?',
      answer: 'Wskazówki dotyczące rozmiaru znajdują się przy każdym produkcie i pomagają wybrać najlepsze dopasowanie.'
    }
  ]

  return (
    <div className="container mx-auto px-6 py-16 text-brand-default">
      <div className="max-w-4xl space-y-10">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-brand-muted">FAQ</p>
          <h1 className="text-4xl font-semibold">Najczęściej zadawane pytania</h1>
        </div>
        <div className="space-y-6">
          {faqs.map((item) => (
            <div key={item.question} className="rounded-[1.5rem] border border-brand-border bg-white p-8 shadow-premium">
              <h2 className="text-xl font-semibold mb-3">{item.question}</h2>
              <p className="text-brand-muted leading-relaxed">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FAQPage