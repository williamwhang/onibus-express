import type { Passenger } from './passenger'
import type { Trip } from './trip'

export type Reservation = {
  code: string
  status: 'Confirmada' | 'Cancelada'
  trip: Trip
  seat: string
  passenger: Passenger
  total: number
  createdAt: string
  travelDate: string | null
}
