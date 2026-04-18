import PageHeader from '../components/ui/PageHeader'
import NewsletterSection from '../components/ui/NewsletterSection'

const contactItems = [
  { title: 'Email', text: 'hello@rosna.com' },
  { title: 'Telefon', text: '+48 123 456 789' },
]

const ContactPage = () => {
  return (
    <div className="section-shell text-brand">
      <div className="site-container">
        <PageHeader
          kicker="Kontakt"
          title="Skontaktuj się z nami"
          lead="Pomożemy dobrać rozmiar, wyjaśnimy proces made to order i odpowiemy na pytania o zamówienie."
        />

        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
          {contactItems.map((item) => (
            <article key={item.title} className="premium-card p-8 text-center">
              <h2 className="text-xl font-semibold">{item.title}</h2>
              <p className="mt-4 text-brand-muted">{item.text}</p>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-10 max-w-4xl">
          <NewsletterSection />
        </div>
      </div>
    </div>
  )
}

export default ContactPage
