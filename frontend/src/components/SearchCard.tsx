const fields = [
  { id: 'origin', label: 'Origem', placeholder: 'Cidade de origem' },
  { id: 'destination', label: 'Destino', placeholder: 'Cidade de destino' },
  { id: 'departure', label: 'Partida', placeholder: 'Selecione a data' },
] as const

export function SearchCard() {
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
          {fields.map((field) => (
            <label key={field.id} className="search-field">
              <span className="search-field__label">{field.label}</span>
              <input
                id={field.id}
                name={field.id}
                type={field.id === 'departure' ? 'date' : 'text'}
                placeholder={field.placeholder}
                aria-label={field.label}
              />
            </label>
          ))}

          <button type="button" className="search-button">
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
            Buscar
          </button>
        </div>
      </div>
    </div>
  )
}
