import { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react'

interface FieldShellProps {
  label: string
  error?: string
  helper?: string
  children: ReactNode
  className?: string
}

const FieldShell = ({ label, error, helper, children, className = '' }: FieldShellProps) => (
  <label className={`block ${className}`}>
    <span className="admin-label">{label}</span>
    {children}
    {helper ? <p className="mt-2 text-xs leading-5 text-brand-muted">{helper}</p> : null}
    {error ? <p className="mt-2 text-sm font-medium text-red-700">{error}</p> : null}
  </label>
)

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  error?: string
  helper?: string
}

export const TextInput = ({ label, error, helper, className = '', ...props }: TextInputProps) => (
  <FieldShell label={label} error={error} helper={helper}>
    <input className={`admin-input ${className}`} {...props} />
  </FieldShell>
)

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string
  error?: string
  helper?: string
}

export const Textarea = ({ label, error, helper, className = '', ...props }: TextareaProps) => (
  <FieldShell label={label} error={error} helper={helper}>
    <textarea className={`admin-input min-h-32 ${className}`} {...props} />
  </FieldShell>
)

type SelectOption = {
  label: string
  value: string
}

type SelectProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, 'children'> & {
  label: string
  error?: string
  helper?: string
  options: SelectOption[]
}

export const Select = ({ label, error, helper, options, className = '', ...props }: SelectProps) => (
  <FieldShell label={label} error={error} helper={helper}>
    <select className={`admin-input ${className}`} {...props}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </FieldShell>
)

interface MultiSelectProps {
  label: string
  values: string[]
  options: SelectOption[]
  onChange: (values: string[]) => void
  error?: string
  helper?: string
  className?: string
}

export const MultiSelect = ({ label, values, options, onChange, error, helper, className = '' }: MultiSelectProps) => {
  const toggleValue = (value: string) => {
    onChange(values.includes(value) ? values.filter((item) => item !== value) : [...values, value])
  }

  return (
    <div className={className}>
      <p className="admin-label">{label}</p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {options.map((option) => (
          <label key={option.value} className="inline-flex items-center gap-3 rounded-lg border border-brand-border bg-brand-background px-4 py-3 text-sm">
            <input type="checkbox" checked={values.includes(option.value)} onChange={() => toggleValue(option.value)} />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
      {helper ? <p className="mt-2 text-xs leading-5 text-brand-muted">{helper}</p> : null}
      {error ? <p className="mt-2 text-sm font-medium text-red-700">{error}</p> : null}
    </div>
  )
}

interface ToggleProps {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
  helper?: string
  disabled?: boolean
}

export const Toggle = ({ label, checked, onChange, helper, disabled }: ToggleProps) => (
  <label className="flex items-center justify-between gap-4 rounded-lg border border-brand-border bg-brand-background px-4 py-3 text-sm">
    <span>
      <span className="block font-semibold text-brand">{label}</span>
      {helper ? <span className="mt-1 block text-xs leading-5 text-brand-muted">{helper}</span> : null}
    </span>
    <button
      type="button"
      disabled={disabled}
      aria-pressed={checked}
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 rounded-full transition ${checked ? 'bg-brand-accent' : 'bg-brand-border'} disabled:opacity-60`}
    >
      <span className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${checked ? 'left-6' : 'left-1'}`} />
    </button>
  </label>
)
