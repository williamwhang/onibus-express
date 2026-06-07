import type { Trip } from '../types/trip'
import { formatDate } from '../utils/formatters'
import { TripCard } from './TripCard'

type SearchContext = {
  origin: string
  destination: string
  departure: string
}

type SearchResultsProps = {
  loading: boolean
  hasSearched: boolean
  trips: Trip[]
  context: SearchContext | null
  onClear: () => void
  onSelectTrip: (trip: Trip) => void
}

export function SearchResults({
  loading,
  hasSearched,
  trips,
  context,
  onClear,
  onSelectTrip,
}: SearchResultsProps) {
  if (loading) {
    return (
      <div className="results-area" aria-live="polite" aria-busy="true">
        <div className="results-list">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="results-skeleton" />
          ))}
        </div>
      </div>
    )
  }

  if (!hasSearched || !context) {
    return <div className="results-area" aria-label="Área de resultados" />
  }

  return (
    <div className="results-area" aria-live="polite">
      <div className="search-context">
        <div className="search-context__group">
          <span className="context-chip">{context.origin}</span>
          <span className="context-chip">{context.destination}</span>
          <span className="context-chip">Somente ida</span>
          <span className="context-chip">{formatDate(context.departure)}</span>

          <button type="button" className="clear-search-button" onClick={onClear}>
            <span aria-hidden="true" className="clear-search-button__icon">
              ×
            </span>
            Limpar tudo
          </button>
        </div>
      </div>

      {trips.length > 0 ? (
        <>
          <div className="results-bar">
            <p className="results-count">
              {trips.length} {trips.length === 1 ? 'viagem encontrada' : 'viagens encontradas'}
            </p>
          </div>

          <div className="results-list">
            {trips.map((trip) => (
              <TripCard key={trip.id} trip={trip} onSelect={onSelectTrip} />
            ))}
          </div>
        </>
      ) : (
        <div className="empty-state">
          <h2>Nenhuma viagem encontrada</h2>
          <p>
            Não encontramos viagens para esse trecho na data selecionada. Tente
            alterar a origem, o destino ou escolher outra data.
          </p>
        </div>
      )}
    </div>
  )
}
