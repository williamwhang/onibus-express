import { ReservationDetailsCard } from './ReservationDetailsCard'
import type { Reservation } from '../types/reservation'

type ReservationSuccessCardProps = {
  reservation: Reservation
  onCancelReservation: () => void
  showCancelConfirm: boolean
  onCancelDismiss: () => void
  onCancelConfirm: () => void
}

export function ReservationSuccessCard({
  reservation,
  onCancelReservation,
  showCancelConfirm,
  onCancelDismiss,
  onCancelConfirm,
}: ReservationSuccessCardProps) {
  const title = reservation.status === 'Cancelada' ? 'Reserva cancelada' : 'Reserva confirmada'
  const subtitle =
    reservation.status === 'Cancelada'
      ? 'Sua reserva foi marcada como cancelada.'
      : 'Sua passagem foi reservada com sucesso'

  return (
    <ReservationDetailsCard
      reservation={reservation}
      title={title}
      subtitle={subtitle}
      onCancelReservation={reservation.status === 'Confirmada' ? onCancelReservation : undefined}
      showCancelConfirm={showCancelConfirm}
      onCancelDismiss={onCancelDismiss}
      onCancelConfirm={onCancelConfirm}
    />
  )
}
