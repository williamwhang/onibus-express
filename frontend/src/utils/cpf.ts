export function maskCpf(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 11)

  if (digits.length <= 3) {
    return digits
  }

  if (digits.length <= 6) {
    return `${digits.slice(0, 3)}.${digits.slice(3)}`
  }

  if (digits.length <= 9) {
    return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`
  }

  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`
}

export function validateCpf(value: string) {
  const digits = value.replace(/\D/g, '')

  if (digits.length !== 11 || /^(\d)\1{10}$/.test(digits)) {
    return false
  }

  let sum = 0
  for (let index = 0; index < 9; index += 1) {
    sum += Number(digits[index]) * (10 - index)
  }

  let firstCheck = (sum * 10) % 11
  if (firstCheck === 10) {
    firstCheck = 0
  }

  if (firstCheck !== Number(digits[9])) {
    return false
  }

  sum = 0
  for (let index = 0; index < 10; index += 1) {
    sum += Number(digits[index]) * (11 - index)
  }

  let secondCheck = (sum * 10) % 11
  if (secondCheck === 10) {
    secondCheck = 0
  }

  return secondCheck === Number(digits[10])
}
