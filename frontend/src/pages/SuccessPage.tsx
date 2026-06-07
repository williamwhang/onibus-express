import { useEffect, useState } from 'react'
import { Container } from '../components/Container'
import { Header } from '../components/Header'
import { AppButton } from '../components/AppButton'
import { ReservationSuccessCard } from '../components/ReservationSuccessCard'
import type { Reservation } from '../types/reservation'

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
  const [showCancelConfirm, setShowCancelConfirm] = useState(false)

  useEffect(() => {
    if (reservation.status === 'Cancelada') {
      setShowCancelConfirm(false)
    }
  }, [reservation.status])

  return (
    <div className="app-shell">
      <Header />

      <main className="success-page">
        <Container>
          <div className="success-layout">
            <ReservationSuccessCard
              reservation={reservation}
              onCancelReservation={() => setShowCancelConfirm(true)}
              showCancelConfirm={showCancelConfirm}
              onCancelDismiss={() => setShowCancelConfirm(false)}
              onCancelConfirm={() => {
                onCancelReservation()
                setShowCancelConfirm(false)
              }}
            />

            <aside className="success-actions-panel">
              <span className="success-actions-panel__title">O QUE DESEJA FAZER?</span>

              <AppButton
                className="success-page__action success-page__action--primary"
                onClick={onNewSearch}
                variant="outlineDanger"
              >
                Fazer nova busca
              </AppButton>
              <AppButton
                className="success-page__action success-page__action--secondary"
                onClick={onConsultReservation}
                variant="graphite"
              >
                Consultar reserva
              </AppButton>
            </aside>
          </div>
        </Container>
      </main>
    </div>
  )
}
