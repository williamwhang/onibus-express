import { Container } from '../components/Container'
import { Header } from '../components/Header'
import type { Reservation } from '../types/reservation'
import { formatCurrency } from '../utils/formatters'

type SuccessPageProps = {
  reservation: Reservation
  onNewSearch: () => void
}

function SuccessIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

export function SuccessPage({ reservation, onNewSearch }: SuccessPageProps) {
  const { trip, seat, passenger, code } = reservation

  return (
    <div className="app-shell">
      <Header />

      <main className="success-page">
        <Container>
          <div className="success-card">
            <div className="success-card__icon">
              <SuccessIcon />
            </div>

            <h1>Reserva confirmada!</h1>
            <p className="success-card__lead">Sua passagem foi reservada com sucesso.</p>

            <div className="success-card__code-box">
              <span className="success-card__code-label">CÓDIGO DA RESERVA</span>
              <strong>{code}</strong>
            </div>

            <div className="success-card__summary">
              <div className="success-card__summary-row">
                <span>Trecho</span>
                <strong>
                  {trip.origin} → {trip.destination}
                </strong>
              </div>
              <div className="success-card__summary-row">
                <span>Partida</span>
                <strong>{trip.departureTime}</strong>
              </div>
              <div className="success-card__summary-row">
                <span>Assento</span>
                <strong>{seat}</strong>
              </div>
              <div className="success-card__summary-row">
                <span>Passageiro</span>
                <strong>{passenger.fullName}</strong>
              </div>
              <div className="success-card__summary-row">
                <span>Total</span>
                <strong className="price-value">{formatCurrency(trip.price)}</strong>
              </div>
            </div>

            <button type="button" className="success-card__button" onClick={onNewSearch}>
              Fazer nova busca
            </button>
          </div>
        </Container>
      </main>
    </div>
  )
}
