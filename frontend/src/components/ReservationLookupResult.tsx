import type { Reservation } from '../types/reservation'
import { EmptyState } from './EmptyState'
import { ReservationDetailsCard } from './ReservationDetailsCard'

type ReservationLookupResultProps = {
  reservation: Reservation | null
  isNotFound: boolean
  showCancelConfirm: boolean
  onCancelClick: () => void
  onCancelDismiss: () => void
  onCancelConfirm: () => void
}

export function ReservationLookupResult({
  reservation,
  isNotFound,
  showCancelConfirm,
  onCancelClick,
  onCancelDismiss,
  onCancelConfirm,
}: ReservationLookupResultProps) {
  if (isNotFound) {
    return (
      <EmptyState
        className="lookup-empty-state"
        title="Reserva não encontrada"
        description="Verifique se o código foi digitado corretamente e tente novamente."
      />
    )
  }

  if (!reservation) {
    return null
  }

  return (
    <div className="lookup-result-card">
      <ReservationDetailsCard
        reservation={reservation}
        title="Reserva encontrada"
        subtitle="Confira os detalhes da sua passagem."
        onCancelReservation={reservation.status === 'Confirmada' ? onCancelClick : undefined}
        showCancelConfirm={showCancelConfirm}
        onCancelDismiss={onCancelDismiss}
        onCancelConfirm={onCancelConfirm}
        showCopyButton={false}
      />
    </div>
  )
}
