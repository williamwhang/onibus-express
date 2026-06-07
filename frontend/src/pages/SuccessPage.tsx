import { Container } from '../components/Container'
import { Header } from '../components/Header'
import { ReservationSuccessCard } from '../components/ReservationSuccessCard'
import type { Reservation } from '../types/reservation'

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="14"
      height="14"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <line x1="16.5" y1="16.5" x2="22" y2="22" />
    </svg>
  )
}

function DocumentIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="14"
      height="14"
      aria-hidden="true"
    >
      <path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9Z" />
      <path d="M14 2v7h7" />
      <path d="M9 13h6M9 17h6" />
    </svg>
  )
}

type SuccessPageProps = {
  reservation: Reservation
  onNewSearch: () => void
  onConsultReservation: () => void
  onCancelReservation: () => void
}

export function SuccessPage({
  reservation,
  onNewSearch,
  onConsultReservation,
  onCancelReservation,
}: SuccessPageProps) {
  return (
    <div className="app-shell">
      <Header />

      <main className="success-page">
        <Container>
          <div className="success-layout">
            <ReservationSuccessCard
              reservation={reservation}
              onCancelReservation={onCancelReservation}
            />

            <aside className="success-actions-panel">
              <span className="success-actions-panel__title">O QUE DESEJA FAZER?</span>

              <button
                type="button"
                className="success-page__action success-page__action--primary"
                onClick={onNewSearch}
              >
                <SearchIcon />
                <span>Fazer nova busca</span>
              </button>
              <button
                type="button"
                className="success-page__action success-page__action--secondary"
                onClick={onConsultReservation}
              >
                <DocumentIcon />
                <span>Consultar reserva</span>
              </button>
            </aside>
          </div>
        </Container>
      </main>
    </div>
  )
}
