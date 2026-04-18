import { ReactNode } from 'react'
import { DangerButton, SecondaryButton } from './buttons'

interface ConfirmDialogProps {
  open: boolean
  title: string
  description?: string
  confirmLabel?: string
  cancelLabel?: string
  children?: ReactNode
  danger?: boolean
  loading?: boolean
  onConfirm: () => void
  onCancel: () => void
}

const ConfirmDialog = ({
  open,
  title,
  description,
  confirmLabel = 'Potwierdz',
  cancelLabel = 'Anuluj',
  children,
  danger = false,
  loading,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) => {
  if (!open) return null

  const ConfirmButton = danger ? DangerButton : SecondaryButton

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-4 py-6">
      <section className="w-full max-w-md rounded-lg border border-brand-border bg-white p-6 shadow-premium">
        <h2 className="text-xl font-semibold tracking-tight text-brand">{title}</h2>
        {description ? <p className="mt-3 text-sm leading-6 text-brand-muted">{description}</p> : null}
        {children ? <div className="mt-4">{children}</div> : null}
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <SecondaryButton type="button" onClick={onCancel} disabled={loading}>
            {cancelLabel}
          </SecondaryButton>
          <ConfirmButton type="button" onClick={onConfirm} disabled={loading}>
            {loading ? 'Przetwarzanie...' : confirmLabel}
          </ConfirmButton>
        </div>
      </section>
    </div>
  )
}

export default ConfirmDialog
