import { HomepagePublishStatus, ProductPublishStatus, mapHomepageStatusToLabel, mapStatusToLabel } from '@rosna/shared'

const statusClassName: Record<ProductPublishStatus | HomepagePublishStatus, string> = {
  draft: 'border-brand-border bg-brand-background text-brand-muted',
  published: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  archived: 'border-stone-200 bg-stone-100 text-stone-600',
  hidden: 'border-amber-200 bg-amber-50 text-amber-700',
}

const StatusBadge = ({ status, kind = 'product' }: { status: ProductPublishStatus | HomepagePublishStatus; kind?: 'product' | 'homepage' }) => (
  <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${statusClassName[status]}`}>
    {kind === 'homepage' ? mapHomepageStatusToLabel(status as HomepagePublishStatus) : mapStatusToLabel(status as ProductPublishStatus)}
  </span>
)

export default StatusBadge
