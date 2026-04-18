import { ReactNode } from 'react'

interface PageHeaderProps {
  eyebrow?: string
  title: string
  description?: string
  actions?: ReactNode
}

const PageHeader = ({ eyebrow, title, description, actions }: PageHeaderProps) => (
  <header className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
    <div className="max-w-3xl">
      {eyebrow ? <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-accent">{eyebrow}</p> : null}
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-brand">{title}</h1>
      {description ? <p className="mt-3 max-w-2xl text-sm leading-6 text-brand-muted">{description}</p> : null}
    </div>
    {actions ? <div className="flex flex-wrap items-center gap-3">{actions}</div> : null}
  </header>
)

export default PageHeader
