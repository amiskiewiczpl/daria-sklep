import { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
}

const baseClassName =
  'inline-flex min-h-11 items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60'

export const PrimaryButton = ({ className = '', children, ...props }: ButtonProps) => (
  <button className={`${baseClassName} bg-brand text-white hover:bg-brand-accent ${className}`} {...props}>
    {children}
  </button>
)

export const SecondaryButton = ({ className = '', children, ...props }: ButtonProps) => (
  <button
    className={`${baseClassName} border border-brand-border bg-white text-brand hover:border-brand-accent hover:text-brand-accent ${className}`}
    {...props}
  >
    {children}
  </button>
)

export const DangerButton = ({ className = '', children, ...props }: ButtonProps) => (
  <button
    className={`${baseClassName} border border-red-200 bg-red-50 text-red-800 hover:border-red-300 hover:bg-red-100 ${className}`}
    {...props}
  >
    {children}
  </button>
)
