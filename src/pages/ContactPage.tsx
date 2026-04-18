const ContactPage = () => {
  return (
    <div className="container mx-auto px-6 py-16 text-brand-default">
      <div className="max-w-3xl space-y-8">
        <p className="text-sm uppercase tracking-[0.35em] text-brand-muted">Contact</p>
        <h1 className="text-4xl font-semibold">Reach out to our customer care team</h1>
        <p className="text-brand-muted leading-relaxed">
          For product inquiries, order support, or styling guidance, please use the details below. We are available Monday through Friday.
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-[1.5rem] border border-brand-border bg-white p-8 shadow-premium">
            <h2 className="text-xl font-semibold mb-3">Email</h2>
            <p className="text-brand-muted">hello@rosna.com</p>
          </div>
          <div className="rounded-[1.5rem] border border-brand-border bg-white p-8 shadow-premium">
            <h2 className="text-xl font-semibold mb-3">Phone</h2>
            <p className="text-brand-muted">+48 123 456 789</p>
          </div>
        </div>
        <div className="rounded-[1.5rem] border border-brand-border bg-white p-8 shadow-premium">
          <h2 className="text-xl font-semibold mb-3">Newsletter and styling updates</h2>
          <p className="text-brand-muted leading-relaxed">
            Join our mailing list for new collection previews and early access to exclusive releases.
          </p>
          <div className="mt-6 space-y-4">
            <button className="w-full rounded-full bg-brand-default px-6 py-4 text-sm font-semibold text-white transition hover:bg-brand-accent">
              Subscribe with Mailchimp
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage