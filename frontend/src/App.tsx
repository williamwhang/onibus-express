import { useEffect, useRef, useState } from 'react'
import { trips as mockTrips } from './data/trips'
import { CheckoutPage } from './pages/CheckoutPage'
import { ReservationLookupPage } from './pages/ReservationLookupPage'
import { SearchPage } from './pages/SearchPage'
import { SuccessPage } from './pages/SuccessPage'
import { getTrips } from './services/tripsApi'
import type { Passenger } from './types/passenger'
import type { Reservation } from './types/reservation'
import type { SearchErrors, SearchFormValues } from './types/search'
import type { Trip } from './types/trip'
import { normalizeText } from './utils/formatters'
import {
  generateReservationCode,
  saveReservation,
  updateReservationStatus,
} from './utils/reservation'

type View = 'search' | 'checkout' | 'success' | 'lookup'

const initialValues: SearchFormValues = {
  origin: '',
  destination: '',
  departure: '',
}

function App() {
  const searchTimeoutRef = useRef<number | null>(null)
  const confirmationTimeoutRef = useRef<number | null>(null)
  const [view, setView] = useState<View>('search')
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null)
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null)
  const [passenger, setPassenger] = useState<Passenger | null>(null)
  const [reservation, setReservation] = useState<Reservation | null>(null)
  const [isConfirmingReservation, setIsConfirmingReservation] = useState(false)
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

      if (confirmationTimeoutRef.current !== null) {
        window.clearTimeout(confirmationTimeoutRef.current)
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

    searchTimeoutRef.current = window.setTimeout(async () => {
      let availableTrips = mockTrips

      try {
        availableTrips = await getTrips()
      } catch (error) {
        console.warn('Unable to load trips from API, using mock data instead.', error)
      }

      const filteredTrips = availableTrips.filter((trip) => {
        const normalizedOrigin = normalizeText(trip.origin)
        const normalizedDestination = normalizeText(trip.destination)
        const matchesDate = !trip.date || trip.date === nextContext.departure

        return (
          normalizedOrigin.includes(searchOrigin) &&
          normalizedDestination.includes(searchDestination) &&
          matchesDate
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
    setSelectedSeat(null)
    setPassenger(null)
    setReservation(null)
    setIsConfirmingReservation(false)
    setView('search')
  }

  function handleSelectTrip(trip: Trip) {
    setSelectedTrip(trip)
    setSelectedSeat(null)
    setPassenger(null)
    setReservation(null)
    setView('checkout')
  }

  function handleBackToResults() {
    setView('search')
  }

  function handleConfirmReservation() {
    if (!selectedTrip || !selectedSeat || !passenger || isConfirmingReservation) {
      return
    }

    setIsConfirmingReservation(true)

    confirmationTimeoutRef.current = window.setTimeout(() => {
      const nextReservation: Reservation = {
        code: generateReservationCode(),
        status: 'Confirmada',
        trip: selectedTrip,
        seat: selectedSeat,
        passenger,
        total: selectedTrip.price,
        createdAt: new Date().toISOString(),
        travelDate: searchContext?.departure ?? null,
      }

      saveReservation(nextReservation)
      setReservation(nextReservation)
      setIsConfirmingReservation(false)
      setView('success')
      confirmationTimeoutRef.current = null
    }, 1000)
  }

  function handleConsultReservation() {
    setView('lookup')
  }

  function handleCancelReservation() {
    if (!reservation) {
      return
    }

    const nextReservation: Reservation = {
      ...reservation,
      status: 'Cancelada',
    }

    updateReservationStatus(reservation.code, 'Cancelada')
    setReservation(nextReservation)
  }

  function handleLookupReservationCanceled(updatedReservation: Reservation) {
    if (reservation?.code === updatedReservation.code) {
      setReservation(updatedReservation)
    }
  }

  if (view === 'success' && reservation) {
    return (
      <SuccessPage
        reservation={reservation}
        onNewSearch={handleClearSearch}
        onConsultReservation={handleConsultReservation}
        onCancelReservation={handleCancelReservation}
      />
    )
  }

  if (view === 'lookup') {
    return (
      <ReservationLookupPage
        currentReservation={reservation}
        onBackToSearch={handleClearSearch}
        onBackToSuccess={reservation ? () => setView('success') : undefined}
        onNewSearch={handleClearSearch}
        onReservationCanceled={handleLookupReservationCanceled}
      />
    )
  }

  if (view === 'checkout' && selectedTrip) {
    return (
      <CheckoutPage
        trip={selectedTrip}
        selectedSeat={selectedSeat}
        passenger={passenger}
        searchContext={searchContext}
        isConfirmingReservation={isConfirmingReservation}
        onSeatChange={setSelectedSeat}
        onPassengerChange={setPassenger}
        onBackToResults={handleBackToResults}
        onConfirmReservation={handleConfirmReservation}
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
