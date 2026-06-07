import { CheckoutSteps } from '../components/CheckoutSteps'
import { CheckoutTripSummary } from '../components/CheckoutTripSummary'
import { Container } from '../components/Container'
import { Header } from '../components/Header'
import { ReservationSidebar } from '../components/ReservationSidebar'
import { SeatSelectionModal } from '../components/SeatSelectionModal'
import type { SearchFormValues } from '../types/search'
import type { Trip } from '../types/trip'
import { useState } from 'react'

type CheckoutPageProps = {
  trip: Trip
  selectedSeat: string | null
  searchContext: SearchFormValues | null
  onSeatChange: (seat: string) => void
  onBackToResults: () => void
}

export function CheckoutPage({
  trip,
  selectedSeat,
  searchContext,
  onSeatChange,
  onBackToResults,
}: CheckoutPageProps) {
  const [isSeatModalOpen, setIsSeatModalOpen] = useState(false)

  return (
    <div className="app-shell">
      <Header
        action={
          <button type="button" className="header-back-link" onClick={onBackToResults}>
            <span aria-hidden="true">←</span>
            Voltar aos resultados
          </button>
        }
      />

      <main className="checkout-page">
        <Container>
          <CheckoutTripSummary trip={trip} searchContext={searchContext} />

          <div className="checkout-layout">
            <div className="checkout-layout__main">
              <CheckoutSteps
                selectedSeat={selectedSeat}
                onSeatClick={() => setIsSeatModalOpen(true)}
                onPassengerClick={() => console.log('TODO: abrir formulario do passageiro')}
              />
            </div>

            <ReservationSidebar trip={trip} selectedSeat={selectedSeat} />
          </div>
        </Container>
      </main>

      {isSeatModalOpen ? (
        <SeatSelectionModal
          trip={trip}
          initialSeat={selectedSeat}
          onClose={() => setIsSeatModalOpen(false)}
          onConfirm={(seat) => {
            onSeatChange(seat)
            setIsSeatModalOpen(false)
          }}
        />
      ) : null}
    </div>
  )
}
