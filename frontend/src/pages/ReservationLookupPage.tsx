import { useEffect, useRef, useState } from 'react'
import { Header } from '../components/Header'
import { Container } from '../components/Container'
import { ReservationLookupForm } from '../components/ReservationLookupForm'
import { ReservationLookupResult } from '../components/ReservationLookupResult'
import type { Reservation } from '../types/reservation'
import {
  findReservationByCode,
  normalizeReservationCode,
  updateReservationStatus,
} from '../utils/reservation'

type ReservationLookupPageProps = {
  currentReservation: Reservation | null
  onBackToSearch: () => void
  onBackToSuccess?: () => void
  onNewSearch: () => void
  onReservationCanceled: (reservation: Reservation) => void
}

export function ReservationLookupPage({
  currentReservation,
  onBackToSearch,
  onBackToSuccess,
  onNewSearch,
  onReservationCanceled,
}: ReservationLookupPageProps) {
  const searchTimeoutRef = useRef<number | null>(null)
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [searchedCode, setSearchedCode] = useState('')
  const [result, setResult] = useState<Reservation | null>(null)
  const [hasSearched, setHasSearched] = useState(false)
  const [showCancelConfirm, setShowCancelConfirm] = useState(false)

  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current !== null) {
        window.clearTimeout(searchTimeoutRef.current)
      }
    }
  }, [])

  useEffect(() => {
    setCode('')
    setSearchedCode('')
    setResult(null)
    setHasSearched(false)
    setShowCancelConfirm(false)
  }, [])

  function handleCodeChange(value: string) {
    setCode(value)
    setShowCancelConfirm(false)

    if (error) {
      setError('')
    }
  }

  function handleSearch() {
    const normalizedCode = normalizeReservationCode(code)

    if (!normalizedCode) {
      setError('Informe o código da reserva')
      return
    }

    setError('')
    setIsSearching(true)
    setSearchedCode(normalizedCode)
    setShowCancelConfirm(false)

    if (searchTimeoutRef.current !== null) {
      window.clearTimeout(searchTimeoutRef.current)
    }

    searchTimeoutRef.current = window.setTimeout(() => {
      const reservation = findReservationByCode(normalizedCode)
      setResult(reservation ?? null)
      setHasSearched(true)
      setIsSearching(false)
      searchTimeoutRef.current = null
    }, 400)
  }

  function handleClearLookup() {
    if (searchTimeoutRef.current !== null) {
      window.clearTimeout(searchTimeoutRef.current)
      searchTimeoutRef.current = null
    }

    setCode('')
    setSearchedCode('')
    setResult(null)
    setHasSearched(false)
    setError('')
    setIsSearching(false)
    setShowCancelConfirm(false)
  }

  function handleCancelConfirm() {
    if (!result) {
      return
    }

    const updatedReservation = updateReservationStatus(result.code, 'Cancelada')

    if (!updatedReservation) {
      return
    }

    setResult(updatedReservation)
    setShowCancelConfirm(false)
    onReservationCanceled(updatedReservation)
  }

  const notFound = hasSearched && !result
  const backLabel = currentReservation ? 'Voltar para reserva' : 'Voltar para busca'
  const handleBack = currentReservation && onBackToSuccess ? onBackToSuccess : onBackToSearch

  return (
    <div className="app-shell">
      <Header
        action={
          <button type="button" className="header-back-link" onClick={handleBack}>
            <span aria-hidden="true">←</span>
            {backLabel}
          </button>
        }
      />

      <main className="lookup-page">
        <Container>
          <header className="lookup-page-header">
            <div className="lookup-page-copy">
              <h1 className="lookup-page-title">Consultar reserva</h1>
              <p className="lookup-page-subtitle">
                Digite o código da reserva para visualizar os detalhes da sua passagem.
              </p>
            </div>

            <button
              type="button"
              className="lookup-new-search-button"
              onClick={onNewSearch}
            >
              Fazer nova busca
            </button>
          </header>

          <ReservationLookupForm
            code={code}
            error={error}
            isSearching={isSearching}
            onCodeChange={handleCodeChange}
            onSubmit={handleSearch}
          />

          {searchedCode ? (
            <div className="search-context lookup-active-filters">
              <div className="search-context__group">
                <span className="context-chip">{searchedCode}</span>

                <button
                  type="button"
                  className="clear-search-button"
                  onClick={handleClearLookup}
                >
                  <span aria-hidden="true" className="clear-search-button__icon">
                    ×
                  </span>
                  Limpar busca
                </button>
              </div>
            </div>
          ) : null}

          <ReservationLookupResult
            reservation={result}
            isNotFound={notFound}
            showCancelConfirm={showCancelConfirm}
            onCancelClick={() => setShowCancelConfirm(true)}
            onCancelDismiss={() => setShowCancelConfirm(false)}
            onCancelConfirm={handleCancelConfirm}
          />
        </Container>
      </main>
    </div>
  )
}
