import { ReactNode } from 'react'

interface EmptyStateProps {
  title: string
  description?: string
  action?: ReactNode
}

const EmptyState = ({ title, description, action }: EmptyStateProps) => (
  <div className="rounded-lg border border-dashed border-brand-border bg-white p-10 text-center">
    <h2 className="text-xl font-semibold text-brand">{title}</h2>
    {description ? <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-brand-muted">{description}</p> : null}
    {action ? <div className="mt-6 flex justify-center">{action}</div> : null}
  </div>
)

export default EmptyState
