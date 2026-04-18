const PoliciesPage = () => {
  return (
    <div className="container mx-auto px-6 py-16 text-brand-default">
      <div className="max-w-4xl space-y-10">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-brand-muted">Policies</p>
          <h1 className="text-4xl font-semibold">Shipping, returns and order support</h1>
        </div>
        <div className="space-y-6">
          <section className="rounded-[1.5rem] border border-brand-border bg-white p-8 shadow-premium">
            <h2 className="text-2xl font-semibold mb-3">Shipping</h2>
            <p className="text-brand-muted leading-relaxed">
              All orders are shipped within 24 hours on business days. Free standard shipping is available on all orders over $200.
            </p>
          </section>
          <section className="rounded-[1.5rem] border border-brand-border bg-white p-8 shadow-premium">
            <h2 className="text-2xl font-semibold mb-3">Returns</h2>
            <p className="text-brand-muted leading-relaxed">
              Returns are accepted within 14 days of delivery. Items must be unused and in original condition for a full refund.
            </p>
          </section>
          <section className="rounded-[1.5rem] border border-brand-border bg-white p-8 shadow-premium">
            <h2 className="text-2xl font-semibold mb-3">Customer support</h2>
            <p className="text-brand-muted leading-relaxed">
              Our support team is available Monday through Friday. For urgent questions, please contact hello@rosna.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

export default PoliciesPage