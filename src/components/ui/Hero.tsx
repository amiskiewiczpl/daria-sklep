import { Link } from 'react-router-dom'

interface HeroProps {
  title: string
  subtitle: string
  ctaLabel: string
  ctaHref: string
  secondaryLabel?: string
  secondaryHref?: string
}

const Hero = ({ title, subtitle, ctaLabel, ctaHref, secondaryLabel, secondaryHref }: HeroProps) => {
  return (
    <section className="section-shell bg-brand-background text-brand">
      <div className="site-container text-center">
        <p className="section-kicker">Rosna Premium</p>
        <h1 className="mx-auto max-w-4xl text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">{title}</h1>
        <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-brand-muted sm:text-lg">{subtitle}</p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link to={ctaHref} className="inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-brand px-8 py-3 text-sm font-semibold text-white transition hover:bg-brand-accent sm:w-auto">
            {ctaLabel}
          </Link>
          {secondaryLabel && secondaryHref ? (
            <Link to={secondaryHref} className="inline-flex min-h-12 w-full items-center justify-center rounded-lg border border-brand-border bg-white px-8 py-3 text-sm font-semibold text-brand transition hover:border-brand-accent hover:text-brand-accent sm:w-auto">
              {secondaryLabel}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  )
}

export default Hero
