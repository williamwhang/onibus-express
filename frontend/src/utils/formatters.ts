export function normalizeText(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

export function formatDate(value: string) {
  if (!value) {
    return ''
  }

  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(`${value}T12:00:00`))
}

export function formatLongDate(value: string) {
  if (!value) {
    return ''
  }

  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(`${value}T12:00:00`))
}

export function generateTripCode(origin: string, destination: string, departureTime: string) {
  const routeCode = `${getLocationCode(origin)}${getLocationCode(destination)}`
  const normalizedTime = departureTime.replace(':', '')

  return `VGM-${normalizedTime}-${routeCode}`
}

export function generateCompanyCode(company: string, departureTime: string) {
  const normalizedCompany = normalizeText(company).replace(/\s+/g, '').toUpperCase()
  const companyCode = normalizedCompany.slice(0, 4).padEnd(4, 'X')
  const timeCode = departureTime.replace(':', '')

  return `${companyCode}${timeCode}`
}

function getLocationCode(value: string) {
  const words = normalizeText(value)
    .split(' ')
    .filter(Boolean)

  if (words.length === 0) {
    return 'XXX'
  }

  if (words.length === 1) {
    return words[0].slice(0, 3).toUpperCase()
  }

  return words
    .map((word, index) => (index === 0 ? word.slice(0, 2) : word.slice(0, 1)))
    .join('')
    .toUpperCase()
}
