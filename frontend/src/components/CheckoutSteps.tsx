function SeatIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M8.5 11V8.2A2.2 2.2 0 0 1 10.7 6h1.6a2.2 2.2 0 0 1 2.2 2.2V11" />
      <path d="M7 11h8a2.5 2.5 0 0 1 2.5 2.5V18H7v-7Z" />
      <path d="M7 18v1.3M17.5 18v1.3" />
    </svg>
  )
}

function PassengerIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true">
      <circle cx="12" cy="8" r="3" />
      <path d="M6.5 18a5.5 5.5 0 0 1 11 0" strokeLinecap="round" />
    </svg>
  )
}

type CheckoutStepsProps = {
  selectedSeat: string | null
  onSeatClick: () => void
  onPassengerClick: () => void
}

export function CheckoutSteps({
  selectedSeat,
  onSeatClick,
  onPassengerClick,
}: CheckoutStepsProps) {
  const hasSeat = Boolean(selectedSeat)

  return (
    <section className="checkout-main-card">
      <div className="checkout-main-card__header">
        <h2>Detalhes do passageiro</h2>
      </div>

      <div className={`checkout-step-row ${hasSeat ? 'checkout-step-row--done' : ''}`}>
        <div className="checkout-step-row__index">{hasSeat ? '✓' : '1'}</div>
        <div className="checkout-step-row__icon">
          <SeatIcon />
        </div>
        <div className="checkout-step-row__content">
          <strong>Assento</strong>
          <span className={hasSeat ? 'checkout-step-row__status--done' : ''}>
            {selectedSeat ?? 'Não selecionado'}
          </span>
        </div>
        <button type="button" className="checkout-step-button" onClick={onSeatClick}>
          {hasSeat ? 'Alterar' : 'Selecionar assento'}
        </button>
      </div>

      <div className="checkout-step-row">
        <div className="checkout-step-row__index">2</div>
        <div className="checkout-step-row__icon">
          <PassengerIcon />
        </div>
        <div className="checkout-step-row__content">
          <strong>Dados do passageiro</strong>
          <span>Não informado</span>
        </div>
        <button type="button" className="checkout-step-button" onClick={onPassengerClick}>
          Preencher
        </button>
      </div>
    </section>
  )
}
