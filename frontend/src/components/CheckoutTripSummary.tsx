import type { Trip } from '../types/trip'
import type { SearchFormValues } from '../types/search'
import { formatLongDate, generateCompanyCode } from '../utils/formatters'
import { Chip } from './Chip'
import { TripJourney } from './TripJourney'

type CheckoutTripSummaryProps = {
  trip: Trip
  searchContext: SearchFormValues | null
}

export function CheckoutTripSummary({ trip, searchContext }: CheckoutTripSummaryProps) {
  const companyCode = generateCompanyCode(trip.company, trip.departureTime)

  return (
    <section className="checkout-trip-banner">
      <div className="checkout-banner-card">
        <div className="checkout-banner-card__header">
          <h2>VIAGEM SELECIONADA</h2>
          <Chip variant="blue" className="checkout-banner-card__tag">
            Somente ida
          </Chip>
        </div>

        <div className="checkout-banner-card__body">
          <TripJourney
            trip={trip}
            showSeats={false}
            companyContent={companyCode}
            metadataExtras={
              <>
                {searchContext?.departure ? (
                  <span className="trip-meta trip-meta--code">
                    <Chip>{formatLongDate(searchContext.departure)}</Chip>
                  </span>
                ) : null}
              </>
            }
          />
        </div>
      </div>
    </section>
  )
}
