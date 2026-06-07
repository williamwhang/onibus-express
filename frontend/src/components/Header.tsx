import type { ReactNode } from 'react'
import { Container } from './Container'

type HeaderProps = {
  action?: ReactNode
}

export function Header({ action }: HeaderProps) {
  return (
    <header className="site-header">
      <Container className="site-header__inner">
        <div className="site-logo" aria-label="OniBus Express">
          OniBus <span>Express</span>
        </div>
        {action ? <div className="site-header__action">{action}</div> : null}
      </Container>
    </header>
  )
}
