const LoadingState = ({ label = 'Ladowanie danych...' }: { label?: string }) => (
  <div className="admin-card flex min-h-48 items-center justify-center text-sm text-brand-muted">{label}</div>
)

export default LoadingState
