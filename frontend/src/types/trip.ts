export type Trip = {
  id: string | number
  company: string
  companyCode?: string
  category: string
  origin: string
  destination: string
  departureTime: string
  arrivalTime: string
  duration: string
  date?: string
  price: number
  seats: number
}
