import { useEffect, useRef, useState } from 'react'
import { Container } from './components/Container'
import { Header } from './components/Header'
import { SearchCard } from './components/SearchCard'
import { SearchResults } from './components/SearchResults'
import { trips as mockTrips } from './data/trips'
import type { Trip } from './types/trip'
import { normalizeText } from './utils/formatters'

type SearchFormValues = {
  origin: string
  destination: string
  departure: string
}

type SearchErrors = Partial<Record<keyof SearchFormValues, string>>

const initialValues: SearchFormValues = {
  origin: '',
  destination: '',
  departure: '',
}

function App() {
  const searchTimeoutRef = useRef<number | null>(null)
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

    const searchOrigin = normalizeText(formValues.origin)
    const searchDestination = normalizeText(formValues.destination)
    const searchValues = {
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
      setSearchContext(searchValues)
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
  }

  function handleSelectTrip(trip: Trip) {
    console.log('TODO: avancar para o checkout na proxima etapa', trip)
  }

  return (
    <div className="app-shell">
      <Header />
      <main>
        <section className="hero-section">
          <Container className="hero-content">
            <h1>Reserve sua passagem de ônibus</h1>
            <p>Compare horários e preços das melhores empresas do Brasil</p>
          </Container>
        </section>

        <section className="search-section">
          <Container>
            <div className="search-card-wrapper">
              <SearchCard
                values={formValues}
                errors={errors}
                onFieldChange={handleFieldChange}
                onSearch={handleSearch}
                isLoading={loading}
              />
            </div>

            <SearchResults
              loading={loading}
              hasSearched={hasSearched}
              trips={results}
              context={searchContext}
              onClear={handleClearSearch}
              onSelectTrip={handleSelectTrip}
            />
          </Container>
        </section>
      </main>
    </div>
  )
}

export default App
