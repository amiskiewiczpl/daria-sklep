import { ChangeEvent, ReactNode } from 'react'

interface ImageUploaderProps {
  label: string
  helper?: string
  accept?: string
  multiple?: boolean
  disabled?: boolean
  previewUrl?: string
  emptyLabel?: string
  action?: ReactNode
  onChange: (files: File[]) => void
}

const ImageUploader = ({
  label,
  helper,
  accept = 'image/jpeg,image/png,image/webp,image/avif',
  multiple = false,
  disabled,
  previewUrl,
  emptyLabel = 'Brak obrazu',
  action,
  onChange,
}: ImageUploaderProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(Array.from(event.target.files ?? []))
    event.target.value = ''
  }

  return (
    <div className="rounded-lg border border-brand-border bg-white p-4">
      <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_160px] sm:items-start">
        <label>
          <span className="admin-label">{label}</span>
          <input className="admin-input" type="file" accept={accept} multiple={multiple} disabled={disabled} onChange={handleChange} />
          {helper ? <p className="mt-2 text-xs leading-5 text-brand-muted">{helper}</p> : null}
          {action ? <div className="mt-4">{action}</div> : null}
        </label>
        <div className="rounded-lg border border-brand-border bg-brand-background p-2">
          {previewUrl ? (
            <img src={previewUrl} alt="" className="aspect-[4/5] w-full rounded-lg object-cover" />
          ) : (
            <div className="flex aspect-[4/5] items-center justify-center rounded-lg border border-dashed border-brand-border text-sm text-brand-muted">
              {emptyLabel}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ImageUploader
