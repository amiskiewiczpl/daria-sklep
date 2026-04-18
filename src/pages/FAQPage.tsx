const FAQPage = () => {
  const faqs = [
    {
      question: 'What is the shipping time?',
      answer: 'Standard shipping arrives in 3-7 business days, and express delivery is available at checkout.'
    },
    {
      question: 'Can I return an item?',
      answer: 'Yes, returns are accepted within 14 days of delivery following our policies page.'
    },
    {
      question: 'How do I know my size?',
      answer: 'Size recommendations are included on every product card and product page for an easy fit experience.'
    }
  ]

  return (
    <div className="container mx-auto px-6 py-16 text-brand-default">
      <div className="max-w-4xl space-y-10">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-brand-muted">FAQ</p>
          <h1 className="text-4xl font-semibold">Frequently asked questions</h1>
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