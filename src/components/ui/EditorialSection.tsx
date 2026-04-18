interface EditorialSectionProps {
  title: string
  description: string
  highlight: string
  imageSrc: string
  imageAlt: string
}

const EditorialSection = ({ title, description, highlight, imageSrc, imageAlt }: EditorialSectionProps) => {
  return (
    <section className="section-shell">
      <div className="site-container grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="mx-auto max-w-xl text-center lg:mx-0 lg:text-left">
          <p className="section-kicker">Editorial</p>
          <h2 className="section-title">{title}</h2>
          <p className="mt-5 text-base leading-8 text-brand-muted">{description}</p>
          <div className="mt-8 rounded-lg border border-brand-border bg-white p-6 shadow-premium">
            <p className="mb-3 text-sm font-semibold uppercase text-brand-accent">{highlight}</p>
            <p className="leading-7 text-brand">Wyjątkowe materiały, czyste linie i niezawodny komfort.</p>
          </div>
        </div>
        <div className="overflow-hidden rounded-lg bg-white shadow-premium">
          <img src={imageSrc} alt={imageAlt} className="aspect-[4/5] w-full object-cover" />
        </div>
      </div>
    </section>
  )
}

export default EditorialSection
