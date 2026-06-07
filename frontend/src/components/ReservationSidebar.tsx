import type { Trip } from '../types/trip'
import { formatCurrency } from '../utils/formatters'

type ReservationSidebarProps = {
  trip: Trip
  selectedSeat: string | null
}

export function ReservationSidebar({ trip, selectedSeat }: ReservationSidebarProps) {
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
          <div className="reservation-sidebar__row">
            <span>Passageiro</span>
            <strong>—</strong>
          </div>
          <div className="reservation-sidebar__row reservation-sidebar__row--total">
            <span>Total</span>
            <strong>{formatCurrency(trip.price)}</strong>
          </div>

          <button type="button" className="reservation-sidebar__confirm" disabled>
            Confirmar reserva
          </button>
          <p className="reservation-sidebar__hint">Preencha os dados para continuar</p>
        </div>
      </div>
    </aside>
  )
}
