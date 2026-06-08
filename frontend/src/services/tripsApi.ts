import type { Trip } from '../types/trip'

type BackendTrip = {
  id: number
  origin: string
  destination: string
  departureTime: string
  arrivalTime: string
  duration: string
  date: string
  price: number
  companyCode: string
  seatsAvailable: number
}

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5153'

export async function getTrips(): Promise<Trip[]> {
  const response = await fetch(`${API_BASE_URL}/api/viagens`)

  if (!response.ok) {
    throw new Error(`Failed to fetch trips: ${response.status}`)
  }

  const data = (await response.json()) as BackendTrip[]
  return data.map(mapTripFromApi)
}

function mapTripFromApi(trip: BackendTrip): Trip {
  return {
    id: trip.id,
    company: trip.companyCode,
    companyCode: trip.companyCode,
    category: '',
    origin: trip.origin,
    destination: trip.destination,
    departureTime: formatTime(trip.departureTime),
    arrivalTime: formatTime(trip.arrivalTime),
    duration: trip.duration,
    date: trip.date,
    price: trip.price,
    seats: trip.seatsAvailable,
  }
}

function formatTime(value: string) {
  const [hours = '00', minutes = '00'] = value.split(':')
  return `${hours}:${minutes}`
}
