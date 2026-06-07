import type { ButtonHTMLAttributes, ReactNode } from 'react'

type AppButtonProps = {
  children: ReactNode
  isLoading?: boolean
  variant?: 'graphite' | 'outlineDanger' | 'primaryDanger'
} & ButtonHTMLAttributes<HTMLButtonElement>

export function AppButton({
  children,
  className = '',
  disabled,
  isLoading = false,
  type = 'button',
  variant = 'graphite',
  ...props
}: AppButtonProps) {
  const classes = [
    'app-button',
    `app-button--${variant}`,
    isLoading ? 'app-button--loading' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      {...props}
    >
      {isLoading ? <span className="button-spinner" aria-hidden="true" /> : null}
      <span>{children}</span>
    </button>
  )
}
