import { useEffect, useRef, useState } from 'react'
import { Chip } from './Chip'
import type { Reservation } from '../types/reservation'
import { formatCurrency, formatLongDate } from '../utils/formatters'

type ReservationSuccessCardProps = {
  reservation: Reservation
  onCancelReservation: () => void
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

function ClockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4l2.5 1.5" />
    </svg>
  )
}

function CopyIcon() {
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
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="14"
      height="14"
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function CancelIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="12"
      height="12"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  )
}

export function ReservationSuccessCard({
  reservation,
  onCancelReservation,
}: ReservationSuccessCardProps) {
  const [isCopied, setIsCopied] = useState(false)
  const copyTimeoutRef = useRef<number | null>(null)
  const travelDateValue = reservation.travelDate ?? reservation.createdAt.slice(0, 10)
  const travelDate = formatLongDate(travelDateValue)
  const statusLabel =
    reservation.status === 'Cancelada' ? 'Reserva cancelada' : 'Reserva confirmada'
  const title = reservation.status === 'Cancelada' ? 'Reserva cancelada' : 'Reserva confirmada'
  const subtitle =
    reservation.status === 'Cancelada'
      ? 'Sua reserva foi marcada como cancelada.'
      : 'Sua passagem foi reservada com sucesso'

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current !== null) {
        window.clearTimeout(copyTimeoutRef.current)
      }
    }
  }, [])

  async function handleCopyCode() {
    try {
      await navigator.clipboard.writeText(reservation.code)
      setIsCopied(true)

      if (copyTimeoutRef.current !== null) {
        window.clearTimeout(copyTimeoutRef.current)
      }

      copyTimeoutRef.current = window.setTimeout(() => {
        setIsCopied(false)
        copyTimeoutRef.current = null
      }, 2000)
    } catch {
      console.log('TODO: tratar fallback de cópia do código da reserva')
    }
  }

  return (
    <div className="reservation-success-card">
      <div className="reservation-success-card__header">
        <div className="reservation-success-card__icon">
          <SuccessIcon />
        </div>

        <div className="reservation-success-card__heading">
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>

        <span
          className={`reservation-success-card__badge ${
            reservation.status === 'Cancelada' ? 'reservation-success-card__badge--cancelled' : ''
          }`}
        >
          {statusLabel}
        </span>
      </div>

      <div className="reservation-success-card__body">
        <section className="reservation-success-card__section reservation-success-card__section--passenger">
          <div className="reservation-success-card__passenger-top">
            <div className="reservation-success-card__section-main">
              <span className="reservation-success-card__eyebrow">Dados do passageiro</span>
              <strong>{reservation.passenger.fullName}</strong>
              <p>{reservation.passenger.cpf}</p>
              <p>{reservation.passenger.email}</p>
            </div>

            <div className="reservation-success-card__payment-column">
              <div className="reservation-success-card__payment">
                <span>Total pago</span>
                <strong className="price-value">{formatCurrency(reservation.total)}</strong>
              </div>
            </div>
          </div>

          {reservation.status !== 'Cancelada' ? (
            <div className="reservation-success-card__cancel-row">
              <button
                type="button"
                className="reservation-success-card__cancel"
                onClick={onCancelReservation}
              >
                <CancelIcon />
                <span>Cancelar reserva</span>
              </button>
            </div>
          ) : (
            <div className="reservation-success-card__cancel-row">
              <span className="reservation-success-card__cancelled-label">Reserva cancelada</span>
            </div>
          )}
        </section>

        <section className="reservation-success-card__section">
          <span className="reservation-success-card__eyebrow">Horário</span>

          <div className="reservation-success-card__journey">
            <div className="reservation-success-card__time">
              <strong>{reservation.trip.departureTime}</strong>
              <span>{reservation.trip.origin}</span>
            </div>

            <div className="reservation-success-card__route">
              <span className="reservation-success-card__route-line" />
              <span className="reservation-success-card__route-duration">
                <ClockIcon />
                Duração: {reservation.trip.duration}
              </span>
              <span className="reservation-success-card__route-line" />
            </div>

            <div className="reservation-success-card__time reservation-success-card__time--arrival">
              <strong>{reservation.trip.arrivalTime}</strong>
              <span>{reservation.trip.destination}</span>
            </div>
          </div>

          <div className="reservation-success-card__chips">
            <Chip>{travelDate}</Chip>
            <Chip variant="blue">Assento {reservation.seat}</Chip>
          </div>
        </section>

        <section className="reservation-success-card__code">
          <div>
            <span className="reservation-success-card__eyebrow">Código da reserva</span>
            <strong>{reservation.code}</strong>
          </div>

          <button
            type="button"
            className={`reservation-success-card__copy ${
              isCopied ? 'reservation-success-card__copy--success' : ''
            }`}
            aria-label="Copiar código da reserva"
            onClick={handleCopyCode}
          >
            {isCopied ? <CheckIcon /> : <CopyIcon />}
            <span>{isCopied ? 'Copiado!' : 'Copiar'}</span>
          </button>
        </section>
      </div>
    </div>
  )
}
