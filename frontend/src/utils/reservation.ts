export function generateReservationCode() {
  const numericCode = Math.floor(10000 + Math.random() * 90000)

  return `ONB-${numericCode}`
}
