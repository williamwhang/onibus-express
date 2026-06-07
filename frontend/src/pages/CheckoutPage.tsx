import { CheckoutSteps } from '../components/CheckoutSteps'
import { CheckoutTripSummary } from '../components/CheckoutTripSummary'
import { Container } from '../components/Container'
import { Header } from '../components/Header'
import { ReservationSidebar } from '../components/ReservationSidebar'
import type { SearchFormValues } from '../types/search'
import type { Trip } from '../types/trip'

type CheckoutPageProps = {
  trip: Trip
  searchContext: SearchFormValues | null
  onBackToResults: () => void
}

export function CheckoutPage({
  trip,
  searchContext,
  onBackToResults,
}: CheckoutPageProps) {
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
                onSeatClick={() => console.log('TODO: abrir selecao de assento')}
                onPassengerClick={() => console.log('TODO: abrir formulario do passageiro')}
              />
            </div>

            <ReservationSidebar trip={trip} />
          </div>
        </Container>
      </main>
    </div>
  )
}
