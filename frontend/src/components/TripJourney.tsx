import type { ReactNode } from 'react'
import type { Trip } from '../types/trip'

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="12" cy="12" r="8" />
      <path d="M12 7.5v5l3.5 2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

function PeopleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true">
      <path d="M8 13.5c-2.2 0-4 1.6-4 3.5V19h8v-2c0-1.9-1.8-3.5-4-3.5Z" />
      <circle cx="8" cy="8.5" r="2.5" />
      <path d="M15.5 14.5c1.8.3 3.5 1.8 3.5 3.5V19h-5" strokeLinecap="round" />
      <path d="M14.5 6.5a2.4 2.4 0 1 1 0 4.8" strokeLinecap="round" />
    </svg>
  )
}

function getSeatsLabel(seats: number) {
  if (seats === 0) {
    return 'Esgotado'
  }

  if (seats === 1) {
    return '1 assento disponível'
  }

  return `${seats} assentos disponíveis`
}

type TripJourneyProps = {
  trip: Trip
  trailingContent?: ReactNode
  showSeats?: boolean
  companyContent?: ReactNode
  metadataExtras?: ReactNode
}

export function TripJourney({
  trip,
  trailingContent,
  showSeats = true,
  companyContent,
  metadataExtras,
}: TripJourneyProps) {
  const seatsClass = trip.seats < 10 ? 'trip-meta trip-meta--low' : 'trip-meta'

  return (
    <div className="trip-card__main">
      <div className="trip-card__left">
        <div className="trip-card__times">
          <div className="trip-time">
            <strong>{trip.departureTime}</strong>
            <span>{trip.origin}</span>
          </div>

          <div className="trip-route" aria-hidden="true">
            <span className="trip-route__line" />
            <span className="trip-route__duration">
              <ClockIcon />
              Duração: {trip.duration}
            </span>
            <span className="trip-route__line" />
          </div>

          <div className="trip-time">
            <strong>{trip.arrivalTime}</strong>
            <span>{trip.destination}</span>
          </div>
        </div>

        <div className="trip-card__meta">
          <span className="trip-meta trip-meta--company">
            <StarIcon />
            {companyContent ?? trip.company}
          </span>
          {metadataExtras}
          {showSeats ? (
            <span className={seatsClass}>
              <PeopleIcon />
              {getSeatsLabel(trip.seats)}
            </span>
          ) : null}
        </div>
      </div>

      {trailingContent ? <div className="trip-card__right">{trailingContent}</div> : null}
    </div>
  )
}
