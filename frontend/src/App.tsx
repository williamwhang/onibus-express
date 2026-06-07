import { useEffect, useRef, useState } from 'react'
import { trips as mockTrips } from './data/trips'
import { CheckoutPage } from './pages/CheckoutPage'
import { SearchPage } from './pages/SearchPage'
import type { SearchErrors, SearchFormValues } from './types/search'
import type { Trip } from './types/trip'
import { normalizeText } from './utils/formatters'

type View = 'search' | 'checkout'

const initialValues: SearchFormValues = {
  origin: '',
  destination: '',
  departure: '',
}

function App() {
  const searchTimeoutRef = useRef<number | null>(null)
  const [view, setView] = useState<View>('search')
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null)
  const [formValues, setFormValues] = useState<SearchFormValues>(initialValues)
  const [errors, setErrors] = useState<SearchErrors>({})
  const [loading, setLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [results, setResults] = useState<Trip[]>([])
  const [searchContext, setSearchContext] = useState<SearchFormValues | null>(null)

  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current !== null) {
        window.clearTimeout(searchTimeoutRef.current)
      }
    }
  }, [])

  function handleFieldChange(field: keyof SearchFormValues, value: string) {
    setFormValues((current) => ({
      ...current,
      [field]: value,
    }))

    setErrors((current) => {
      if (!current[field]) {
        return current
      }

      const next = { ...current }
      delete next[field]
      return next
    })
  }

  function validateForm(values: SearchFormValues) {
    const nextErrors: SearchErrors = {}

    if (!values.origin.trim()) {
      nextErrors.origin = 'Informe a origem'
    }

    if (!values.destination.trim()) {
      nextErrors.destination = 'Informe o destino'
    }

    if (!values.departure) {
      nextErrors.departure = 'Informe a data de partida'
    }

    return nextErrors
  }

  function handleSearch() {
    const nextErrors = validateForm(formValues)

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    if (searchTimeoutRef.current !== null) {
      window.clearTimeout(searchTimeoutRef.current)
    }

    setErrors({})
    setLoading(true)
    setHasSearched(true)
    setView('search')

    const searchOrigin = normalizeText(formValues.origin)
    const searchDestination = normalizeText(formValues.destination)
    const nextContext = {
      origin: formValues.origin.trim(),
      destination: formValues.destination.trim(),
      departure: formValues.departure,
    }

    searchTimeoutRef.current = window.setTimeout(() => {
      const filteredTrips = mockTrips.filter((trip) => {
        const normalizedOrigin = normalizeText(trip.origin)
        const normalizedDestination = normalizeText(trip.destination)

        return (
          normalizedOrigin.includes(searchOrigin) &&
          normalizedDestination.includes(searchDestination)
        )
      })

      setResults(filteredTrips)
      setSearchContext(nextContext)
      setLoading(false)
      searchTimeoutRef.current = null
    }, 600)
  }

  function handleClearSearch() {
    if (searchTimeoutRef.current !== null) {
      window.clearTimeout(searchTimeoutRef.current)
      searchTimeoutRef.current = null
    }

    setFormValues(initialValues)
    setErrors({})
    setLoading(false)
    setHasSearched(false)
    setResults([])
    setSearchContext(null)
    setSelectedTrip(null)
    setView('search')
  }

  function handleSelectTrip(trip: Trip) {
    setSelectedTrip(trip)
    setView('checkout')
  }

  function handleBackToResults() {
    setView('search')
  }

  if (view === 'checkout' && selectedTrip) {
    return (
      <CheckoutPage
        trip={selectedTrip}
        searchContext={searchContext}
        onBackToResults={handleBackToResults}
      />
    )
  }

  return (
    <SearchPage
      formValues={formValues}
      errors={errors}
      isLoading={loading}
      hasSearched={hasSearched}
      results={results}
      searchContext={searchContext}
      onFieldChange={handleFieldChange}
      onSearch={handleSearch}
      onClear={handleClearSearch}
      onSelectTrip={handleSelectTrip}
    />
  )
}

export default App
