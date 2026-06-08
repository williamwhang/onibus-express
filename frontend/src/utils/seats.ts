const seatLetters = ['A', 'B', 'C', 'D'] as const
const DEFAULT_OCCUPIED_SEATS = [6, 7, 17, 18, 27, 34, 35, 36, 43] as const

export function getSeatCode(seatNumber: number) {
  const suffix = seatLetters[(seatNumber - 1) % seatLetters.length]
  return `${seatNumber}${suffix}`
}

export function getOccupiedSeats(_tripId: string | number) {
  return [...DEFAULT_OCCUPIED_SEATS]
}
