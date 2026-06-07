import { CheckoutSteps } from '../components/CheckoutSteps'
import { CheckoutTripSummary } from '../components/CheckoutTripSummary'
import { Container } from '../components/Container'
import { Header } from '../components/Header'
import { ReservationSidebar } from '../components/ReservationSidebar'
import { SeatSelectionModal } from '../components/SeatSelectionModal'
import type { Passenger } from '../types/passenger'
import type { SearchFormValues } from '../types/search'
import type { Trip } from '../types/trip'
import { useState } from 'react'

type CheckoutPageProps = {
  trip: Trip
  selectedSeat: string | null
  passenger: Passenger | null
  searchContext: SearchFormValues | null
  onSeatChange: (seat: string) => void
  onPassengerChange: (passenger: Passenger) => void
  onBackToResults: () => void
}

export function CheckoutPage({
  trip,
  selectedSeat,
  passenger,
  searchContext,
  onSeatChange,
  onPassengerChange,
  onBackToResults,
}: CheckoutPageProps) {
  const [isSeatModalOpen, setIsSeatModalOpen] = useState(false)
  const [isPassengerFormOpen, setIsPassengerFormOpen] = useState(false)
  const canConfirmReservation = Boolean(selectedSeat && passenger)

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
                passenger={passenger}
                isPassengerFormOpen={isPassengerFormOpen}
                onSeatClick={() => setIsSeatModalOpen(true)}
                onPassengerClick={() => setIsPassengerFormOpen(true)}
                onPassengerCancel={() => setIsPassengerFormOpen(false)}
                onPassengerSave={(nextPassenger) => {
                  onPassengerChange(nextPassenger)
                  setIsPassengerFormOpen(false)
                }}
              />
            </div>

            <ReservationSidebar
              trip={trip}
              selectedSeat={selectedSeat}
              passenger={passenger}
              canConfirm={canConfirmReservation}
              onConfirm={() =>
                console.log('TODO: confirmar reserva', {
                  trip,
                  selectedSeat,
                  passenger,
                })
              }
            />
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
