type ReservationLookupFormProps = {
  code: string
  error: string
  isSearching: boolean
  onCodeChange: (value: string) => void
  onSubmit: () => void
}

export function ReservationLookupForm({
  code,
  error,
  isSearching,
  onCodeChange,
  onSubmit,
}: ReservationLookupFormProps) {
  return (
    <section className="lookup-card">
      <div className="lookup-form-row">
        <div className="search-field-group lookup-field-group">
          <label
            htmlFor="reservation-code"
            className={`search-field ${error ? 'search-field--error' : ''}`}
          >
            <span className="search-field__label">Código da reserva</span>
            <input
              id="reservation-code"
              type="text"
              value={code}
              placeholder="Digite o código da reserva"
              aria-invalid={Boolean(error)}
              aria-describedby={error ? 'reservation-code-error' : undefined}
              onChange={(event) => onCodeChange(event.target.value.toUpperCase())}
            />
          </label>
          {error ? (
            <span id="reservation-code-error" className="search-field__error">
              {error}
            </span>
          ) : null}
        </div>

        <button
          type="button"
          className={`lookup-submit-button ${isSearching ? 'is-loading' : ''}`}
          onClick={onSubmit}
          disabled={isSearching}
          aria-busy={isSearching}
        >
          {isSearching ? <span className="button-spinner" aria-hidden="true" /> : null}
          {isSearching ? 'Consultando...' : 'Consultar reserva'}
        </button>
      </div>
    </section>
  )
}
