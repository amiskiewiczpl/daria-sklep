const NewsletterSection = () => (
  <section className="rounded-lg border border-brand-border bg-brand-surface p-6 text-center shadow-premium sm:p-10">
    <p className="section-kicker">Newsletter</p>
    <h2 className="mx-auto max-w-3xl text-3xl font-semibold leading-tight sm:text-4xl">
      Nowości, zapowiedzi i limitowane serie
    </h2>
    <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-brand-muted">
      Zapisz się, aby otrzymywać pierwsze informacje o premierach, tkaninach i krótkich seriach Rosna.
    </p>

    <form className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
      <input
        type="email"
        placeholder="Twój e-mail"
        className="min-h-12 w-full max-w-md rounded-lg border border-brand-border bg-white px-5 py-3 text-sm text-brand focus:outline-none focus:ring-2 focus:ring-brand-accent"
      />
      <button
        type="submit"
        className="inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-brand px-8 py-3 text-sm font-semibold text-white transition hover:bg-brand-accent sm:w-auto"
      >
        Zapisz się
      </button>
    </form>
  </section>
)

export default NewsletterSection
