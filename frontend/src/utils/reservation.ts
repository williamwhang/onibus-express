import type { Reservation } from '../types/reservation'

const LEGACY_RESERVATIONS_STORAGE_KEY = 'onibus-express:reservations'
const RESERVATIONS_STORAGE_KEY = 'onibus-express-reservations'

export function generateReservationCode() {
  const numericCode = Math.floor(10000 + Math.random() * 90000)

  return `ONB-${numericCode}`
}

export function normalizeReservationCode(value: string) {
  return value.trim().toUpperCase()
}

function readReservationsFromStorage(storageKey: string) {
  const storedValue = window.localStorage.getItem(storageKey)

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

export function getReservations() {
  if (typeof window === 'undefined') {
    return [] as Reservation[]
  }

  const reservations = readReservationsFromStorage(RESERVATIONS_STORAGE_KEY)

  if (reservations.length > 0) {
    return reservations
  }

  return readReservationsFromStorage(LEGACY_RESERVATIONS_STORAGE_KEY)
}

export function saveReservation(reservation: Reservation) {
  if (typeof window === 'undefined') {
    return
  }

  const reservations = getReservations()
  const normalizedCode = normalizeReservationCode(reservation.code)
  const nextReservations = [
    { ...reservation, code: normalizedCode },
    ...reservations.filter((item) => normalizeReservationCode(item.code) !== normalizedCode),
  ]

  window.localStorage.setItem(RESERVATIONS_STORAGE_KEY, JSON.stringify(nextReservations))
}

export function findReservationByCode(code: string) {
  if (typeof window === 'undefined') {
    return undefined
  }

  const normalizedCode = normalizeReservationCode(code)

  return getReservations().find(
    (reservation) => normalizeReservationCode(reservation.code) === normalizedCode,
  )
}

export function updateReservationStatus(code: string, status: Reservation['status']) {
  if (typeof window === 'undefined') {
    return undefined
  }

  const normalizedCode = normalizeReservationCode(code)
  let updatedReservation: Reservation | undefined

  const nextReservations = getReservations().map((reservation) => {
    if (normalizeReservationCode(reservation.code) !== normalizedCode) {
      return reservation
    }

    updatedReservation = { ...reservation, status }
    return updatedReservation
  })

  window.localStorage.setItem(RESERVATIONS_STORAGE_KEY, JSON.stringify(nextReservations))

  return updatedReservation
}
