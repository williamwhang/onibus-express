export type SearchFormValues = {
  origin: string
  destination: string
  departure: string
}

export type SearchErrors = Partial<Record<keyof SearchFormValues, string>>
