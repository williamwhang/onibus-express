import type { Reservation } from '../types/reservation'

export function generateReservationCode() {
  const numericCode = Math.floor(10000 + Math.random() * 90000)

  return `ONB-${numericCode}`
}

const RESERVATIONS_STORAGE_KEY = 'onibus-express:reservations'

export function getReservations() {
  if (typeof window === 'undefined') {
    return [] as Reservation[]
  }

  const storedValue = window.localStorage.getItem(RESERVATIONS_STORAGE_KEY)

  if (!storedValue) {
    return [] as Reservation[]
  }

  try {
    const parsed = JSON.parse(storedValue)
    return Array.isArray(parsed) ? (parsed as Reservation[]) : []
  } catch {
    return [] as Reservation[]
  }
}

export function saveReservation(reservation: Reservation) {
  if (typeof window === 'undefined') {
    return
  }

  const reservations = getReservations()
  const nextReservations = [reservation, ...reservations.filter((item) => item.code !== reservation.code)]

  window.localStorage.setItem(RESERVATIONS_STORAGE_KEY, JSON.stringify(nextReservations))
}

export function updateReservationStatus(
  code: string,
  status: Reservation['status'],
) {
  if (typeof window === 'undefined') {
    return
  }

  const nextReservations = getReservations().map((reservation) =>
    reservation.code === code ? { ...reservation, status } : reservation,
  )

  window.localStorage.setItem(RESERVATIONS_STORAGE_KEY, JSON.stringify(nextReservations))
}
