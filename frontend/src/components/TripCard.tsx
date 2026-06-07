import type { Trip } from '../types/trip'
import { formatCurrency } from '../utils/formatters'
import { TripJourney } from './TripJourney'

type TripCardProps = {
  trip: Trip
  onSelect: (trip: Trip) => void
}

export function TripCard({ trip, onSelect }: TripCardProps) {
  return (
    <article className="trip-card">
      <TripJourney
        trip={trip}
        trailingContent={
          <>
            <div className="trip-price">
              <span>A partir de</span>
              <strong>{formatCurrency(trip.price)}</strong>
            </div>

            <button type="button" className="trip-select-button" onClick={() => onSelect(trip)}>
              Selecionar
            </button>
          </>
        }
      />
    </article>
  )
}
