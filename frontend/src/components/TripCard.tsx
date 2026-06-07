import type { Trip } from '../types/trip'
import { formatCurrency } from '../utils/formatters'

type TripCardProps = {
  trip: Trip
  onSelect: (trip: Trip) => void
}

export function TripCard({ trip, onSelect }: TripCardProps) {
  const seatsClass = trip.seats <= 5 ? 'trip-meta trip-meta--low' : 'trip-meta'

  return (
    <article className="trip-card">
      <div className="trip-card__main">
        <div className="trip-card__left">
          <div className="trip-card__times">
            <div className="trip-time">
              <strong>{trip.departureTime}</strong>
              <span>{trip.origin}</span>
            </div>

            <div className="trip-route" aria-hidden="true">
              <span className="trip-route__line" />
              <span className="trip-route__duration">{trip.duration}</span>
              <span className="trip-route__line" />
            </div>

            <div className="trip-time">
              <strong>{trip.arrivalTime}</strong>
              <span>{trip.destination}</span>
            </div>
          </div>

          <div className="trip-card__meta">
            <span className="trip-meta">{trip.company}</span>
            <span className="trip-meta">{trip.category}</span>
            <span className={seatsClass}>
              {trip.seats} {trip.seats === 1 ? 'vaga' : 'vagas'}
            </span>
          </div>
        </div>

        <div className="trip-card__right">
          <div className="trip-price">
            <span>A partir de</span>
            <strong>{formatCurrency(trip.price)}</strong>
          </div>

          <button type="button" className="trip-select-button" onClick={() => onSelect(trip)}>
            Selecionar
          </button>
        </div>
      </div>
    </article>
  )
}
