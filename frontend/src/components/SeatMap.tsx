import { getSeatCode } from '../utils/seats'

type SeatMapProps = {
  occupiedSeats: number[]
  selectedSeatNumber: number | null
  onToggleSeat: (seatNumber: number) => void
}

const SEAT_ROWS = [
  { label: 'A', seats: [1, 5, 9, 13, 17, 21, 25, 29, 33, 37, 41] },
  { label: 'B', seats: [2, 6, 10, 14, 18, 22, 26, 30, 34, 38, 42] },
  { label: 'C', seats: [3, 7, 11, 15, 19, 23, 27, 31, 35, 39, 43] },
  { label: 'D', seats: [4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44] },
] as const

export function SeatMap({ occupiedSeats, selectedSeatNumber, onToggleSeat }: SeatMapProps) {
  const occupiedSeatsSet = new Set(occupiedSeats)

  return (
    <div className="bus-shell">
      <div className="bus-steering" aria-hidden="true">
        <span />
      </div>

      <div className="seat-grid">
        <div className="seat-lanes" role="grid" aria-label="Mapa de assentos do ônibus">
          {SEAT_ROWS.map((row) => (
            <div
              key={row.label}
              className={`seat-lane ${row.label === 'C' ? 'lane-c' : ''}`}
              role="row"
            >
              <span className="lane-label">{row.label}</span>

              {row.seats.map((seatNumber) => {
                const isOccupied = occupiedSeatsSet.has(seatNumber)
                const isSelected = selectedSeatNumber === seatNumber
                const seatClassName = `seat ${isOccupied ? 'ocup' : isSelected ? 'sel' : 'livre'}`

                return (
                  <button
                    key={seatNumber}
                    type="button"
                    role="gridcell"
                    className={seatClassName}
                    disabled={isOccupied}
                    aria-pressed={isSelected}
                    aria-label={
                      isOccupied
                        ? `Assento ${getSeatCode(seatNumber)} ocupado`
                        : `Selecionar assento ${getSeatCode(seatNumber)}`
                    }
                    onClick={() => onToggleSeat(seatNumber)}
                  >
                    {isOccupied ? '×' : seatNumber}
                  </button>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
