import { Container } from '../components/Container'
import { Header } from '../components/Header'
import { SearchCard } from '../components/SearchCard'
import { SearchResults } from '../components/SearchResults'
import type { SearchErrors, SearchFormValues } from '../types/search'
import type { Trip } from '../types/trip'

type SearchPageProps = {
  formValues: SearchFormValues
  errors: SearchErrors
  isLoading: boolean
  hasSearched: boolean
  results: Trip[]
  searchContext: SearchFormValues | null
  onFieldChange: (field: keyof SearchFormValues, value: string) => void
  onSearch: () => void
  onClear: () => void
  onSelectTrip: (trip: Trip) => void
}

export function SearchPage({
  formValues,
  errors,
  isLoading,
  hasSearched,
  results,
  searchContext,
  onFieldChange,
  onSearch,
  onClear,
  onSelectTrip,
}: SearchPageProps) {
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
                onFieldChange={onFieldChange}
                onSearch={onSearch}
                isLoading={isLoading}
              />
            </div>

            <SearchResults
              loading={isLoading}
              hasSearched={hasSearched}
              trips={results}
              context={searchContext}
              onClear={onClear}
              onSelectTrip={onSelectTrip}
            />
          </Container>
        </section>
      </main>
    </div>
  )
}
