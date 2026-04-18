const AboutPage = () => {
  return (
    <div className="container mx-auto px-6 py-16 text-brand-default">
      <div className="max-w-3xl space-y-8">
        <p className="text-sm uppercase tracking-[0.35em] text-brand-muted">About Rosna</p>
        <h1 className="text-4xl font-semibold">A premium fashion destination built for timeless elegance.</h1>
        <p className="text-brand-muted leading-relaxed">
          Rosna is born from a vision of elevated everyday dressing. We curate high-quality silhouettes, refined materials, and understated color palettes to create clothing that feels effortless and luxurious.
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-[1.5rem] border border-brand-border bg-white p-8 shadow-premium">
            <h2 className="text-xl font-semibold mb-3">Craftsmanship</h2>
            <p className="text-brand-muted leading-relaxed">
              Every collection is selected for its fabric quality and contemporary tailoring, so each piece performs beautifully in work, travel and social evenings.
            </p>
          </div>
          <div className="rounded-[1.5rem] border border-brand-border bg-white p-8 shadow-premium">
            <h2 className="text-xl font-semibold mb-3">Sustainability</h2>
            <p className="text-brand-muted leading-relaxed">
              We emphasize responsible sourcing and small batch editions to reduce waste and deliver garments with lasting style.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutPage