type SearchField = 'origin' | 'destination' | 'departure'

type SearchCardProps = {
  values: Record<SearchField, string>
  errors: Partial<Record<SearchField, string>>
  isLoading: boolean
  onFieldChange: (field: SearchField, value: string) => void
  onSearch: () => void
}

const fields: Array<{
  id: SearchField
  label: string
  placeholder: string
  type: 'text' | 'date'
}> = [
  { id: 'origin', label: 'Origem', placeholder: 'Cidade de origem', type: 'text' },
  { id: 'destination', label: 'Destino', placeholder: 'Cidade de destino', type: 'text' },
  { id: 'departure', label: 'Partida', placeholder: 'Selecione a data', type: 'date' },
]

export function SearchCard({
  values,
  errors,
  isLoading,
  onFieldChange,
  onSearch,
}: SearchCardProps) {
  return (
    <div className="search-card">
      <div className="search-tabs" role="tablist" aria-label="Tipo de viagem">
        <button
          type="button"
          className="search-tab search-tab--disabled"
          aria-selected="false"
          disabled
        >
          Ida e volta
        </button>
        <button type="button" className="search-tab search-tab--active" aria-selected="true">
          Somente ida
        </button>
      </div>

      <div className="search-card__body">
        <div className="search-form" role="group" aria-label="Busca de passagens">
          {fields.map((field) => {
            const error = errors[field.id]

            return (
              <div key={field.id} className="search-field-group">
                <label className={`search-field ${error ? 'search-field--error' : ''}`}>
                  <span className="search-field__label">{field.label}</span>
                  <input
                    id={field.id}
                    name={field.id}
                    type={field.type}
                    value={values[field.id]}
                    placeholder={field.placeholder}
                    aria-label={field.label}
                    aria-invalid={Boolean(error)}
                    aria-describedby={error ? `${field.id}-error` : undefined}
                    onChange={(event) => onFieldChange(field.id, event.target.value)}
                  />
                </label>
                {error ? (
                  <span id={`${field.id}-error`} className="search-field__error">
                    {error}
                  </span>
                ) : null}
              </div>
            )
          })}

          <button type="button" className="search-button" onClick={onSearch} disabled={isLoading}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.3"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" />
              <line x1="16.5" y1="16.5" x2="22" y2="22" />
            </svg>
            {isLoading ? 'Buscando...' : 'Buscar'}
          </button>
        </div>
      </div>
    </div>
  )
}
