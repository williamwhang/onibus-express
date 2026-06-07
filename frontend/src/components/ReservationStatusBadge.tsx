import type { Reservation } from '../types/reservation'

type ReservationStatusBadgeProps = {
  status: Reservation['status']
}

export function ReservationStatusBadge({ status }: ReservationStatusBadgeProps) {
  const modifier = status === 'Cancelada' ? 'lookup-status-badge--canceled' : 'lookup-status-badge--confirmed'

  return <span className={`lookup-status-badge ${modifier}`}>{status}</span>
}
