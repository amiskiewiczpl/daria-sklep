interface MaterialBadgeProps {
  material: string
}

const MaterialBadge = ({ material }: MaterialBadgeProps) => {
  return (
    <span className="rounded-lg border border-brand-border bg-brand-background px-3 py-2 text-xs font-semibold uppercase text-brand-accent">
      {material}
    </span>
  )
}

export default MaterialBadge
