import type { Trip } from '../types/trip'
import type { Passenger } from '../types/passenger'
import { formatCurrency } from '../utils/formatters'

type ReservationSidebarProps = {
  trip: Trip
  selectedSeat: string | null
  passenger: Passenger | null
  canConfirm: boolean
  isConfirming: boolean
  onConfirm: () => void
}

export function ReservationSidebar({
  trip,
  selectedSeat,
  passenger,
  canConfirm,
  isConfirming,
  onConfirm,
}: ReservationSidebarProps) {
  return (
    <aside className="reservation-sidebar">
      <div className="reservation-sidebar__card">
        <div className="reservation-sidebar__header">
          <h2>Detalhes da reserva</h2>
          <span className="reservation-sidebar__eyebrow">Resumo</span>
        </div>

        <div className="reservation-sidebar__body">
          <div className="reservation-sidebar__row">
            <span>Assento</span>
            <strong>{selectedSeat ?? '—'}</strong>
          </div>

          <div className="reservation-sidebar__section">
            <span className="reservation-sidebar__section-title">Dados do passageiro</span>

            <div className="reservation-sidebar__detail-row">
              <span>Nome</span>
              <strong>{passenger?.fullName ?? '—'}</strong>
            </div>
            <div className="reservation-sidebar__detail-row">
              <span>CPF</span>
              <strong>{passenger?.cpf ?? '—'}</strong>
            </div>
            <div className="reservation-sidebar__detail-row">
              <span>E-mail</span>
              <strong>{passenger?.email ?? '—'}</strong>
            </div>
          </div>

          <div className="reservation-sidebar__row reservation-sidebar__row--total">
            <span>Total</span>
            <strong>{formatCurrency(trip.price)}</strong>
          </div>

          <button
            type="button"
            className={`reservation-sidebar__confirm ${isConfirming ? 'reservation-sidebar__confirm--loading' : ''}`}
            disabled={!canConfirm || isConfirming}
            aria-busy={isConfirming}
            onClick={onConfirm}
          >
            {isConfirming ? <span className="button-spinner" aria-hidden="true" /> : null}
            <span>{isConfirming ? 'Confirmando...' : 'Confirmar reserva'}</span>
          </button>
          {!canConfirm && !isConfirming ? (
            <p className="reservation-sidebar__hint">Preencha os dados para continuar</p>
          ) : null}
        </div>
      </div>
    </aside>
  )
}
