import type { Passenger } from './passenger'
import type { Trip } from './trip'

export type Reservation = {
  code: string
  trip: Trip
  seat: string
  passenger: Passenger
}
