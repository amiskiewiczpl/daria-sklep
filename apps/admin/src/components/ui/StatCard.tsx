interface StatCardProps {
  label: string
  value: number | string
  helper?: string
}

const StatCard = ({ label, value, helper }: StatCardProps) => (
  <article className="admin-card">
    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-accent">{label}</p>
    <p className="mt-4 text-3xl font-semibold tracking-tight text-brand">{value}</p>
    {helper ? <p className="mt-2 text-sm text-brand-muted">{helper}</p> : null}
  </article>
)

export default StatCard
