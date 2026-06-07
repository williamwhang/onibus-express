import { Container } from './Container'

export function Header() {
  return (
    <header className="site-header">
      <Container className="site-header__inner">
        <div className="site-logo" aria-label="OniBus Express">
          OniBus <span>Express</span>
        </div>
      </Container>
    </header>
  )
}
