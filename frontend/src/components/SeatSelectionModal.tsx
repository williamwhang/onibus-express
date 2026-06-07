import { useEffect, useMemo, useState } from 'react'
import { Chip } from './Chip'
import { SeatMap } from './SeatMap'
import type { Trip } from '../types/trip'
import { getOccupiedSeats, getSeatCode } from '../utils/seats'

type SeatSelectionModalProps = {
  trip: Trip
  initialSeat: string | null
  onClose: () => void
  onConfirm: (seat: string) => void
}

function parseSeatCode(seatCode: string | null) {
  if (!seatCode) {
    return null
  }

  const numericSeat = Number.parseInt(seatCode, 10)
  return Number.isNaN(numericSeat) ? null : numericSeat
}

export function SeatSelectionModal({
  trip,
  initialSeat,
  onClose,
  onConfirm,
}: SeatSelectionModalProps) {
  const [temporarySelectedSeat, setTemporarySelectedSeat] = useState<number | null>(
    parseSeatCode(initialSeat),
  )

  const occupiedSeats = useMemo(() => {
    return getOccupiedSeats(trip.id).filter((seatNumber) => seatNumber !== temporarySelectedSeat)
  }, [temporarySelectedSeat, trip.id])

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [])

  function handleOverlayMouseDown(event: React.MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  function handleSelectSeat(seatNumber: number) {
    setTemporarySelectedSeat((current) => (current === seatNumber ? null : seatNumber))
  }

  function handleConfirm() {
    if (temporarySelectedSeat === null) {
      return
    }

    onConfirm(getSeatCode(temporarySelectedSeat))
  }

  return (
    <div className="modal-overlay" role="presentation" onMouseDown={handleOverlayMouseDown}>
      <div
        className="seat-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="seat-modal-title"
      >
        <div className="seat-modal__header">
          <h2 id="seat-modal-title">Selecionar assento</h2>
          <button
            type="button"
            className="seat-modal__close"
            aria-label="Fechar seleção de assento"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <div className="seat-modal__content">
          <div className="bus-area">
            <SeatMap
              occupiedSeats={occupiedSeats}
              selectedSeatNumber={temporarySelectedSeat}
              onToggleSeat={handleSelectSeat}
            />
          </div>

          <aside className="selected-panel">
            <div>
              <strong>Assento selecionado</strong>
              {temporarySelectedSeat === null ? (
                <p>Nenhum assento selecionado ainda.</p>
              ) : (
                <Chip variant="blue" className="selected-seat-chip">
                  {getSeatCode(temporarySelectedSeat)}
                </Chip>
              )}
            </div>

            <div className="modal-legend">
              <div className="legend-item">
                <span className="legend-box legend-box--free" />
                Livre
              </div>
              <div className="legend-item">
                <span className="legend-box legend-box--occupied" />
                Ocupado
              </div>
              <div className="legend-item">
                <span className="legend-box legend-box--selected" />
                Selecionado
              </div>
            </div>
          </aside>
        </div>

        <div className="seat-modal__footer">
          <button
            type="button"
            className="btn-confirm-seat"
            disabled={temporarySelectedSeat === null}
            onClick={handleConfirm}
          >
            Confirmar assento
          </button>
        </div>
      </div>
    </div>
  )
}
