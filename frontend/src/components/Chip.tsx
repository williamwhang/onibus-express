import type { ReactNode } from 'react'

type ChipProps = {
  children: ReactNode
  variant?: 'neutral' | 'blue'
  className?: string
}

export function Chip({ children, variant = 'neutral', className = '' }: ChipProps) {
  const classes = ['chip', `chip--${variant}`, className].filter(Boolean).join(' ')

  return <span className={classes}>{children}</span>
}
