import { ReactNode } from 'react'

interface FormSectionProps {
  eyebrow?: string
  title: string
  description?: string
  aside?: ReactNode
  children: ReactNode
  className?: string
}

const FormSection = ({ eyebrow, title, description, aside, children, className = '' }: FormSectionProps) => (
  <section className={`admin-card space-y-5 ${className}`}>
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="max-w-2xl">
        {eyebrow ? <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-accent">{eyebrow}</p> : null}
        <h2 className="mt-2 text-xl font-semibold tracking-tight text-brand">{title}</h2>
        {description ? <p className="mt-2 text-sm leading-6 text-brand-muted">{description}</p> : null}
      </div>
      {aside ? <div className="shrink-0">{aside}</div> : null}
    </div>
    {children}
  </section>
)

export default FormSection
