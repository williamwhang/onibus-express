import { useEffect, useState } from 'react'
import type { Passenger } from '../types/passenger'
import { maskCpf, validateCpf } from '../utils/cpf'

type PassengerFormProps = {
  initialPassenger: Passenger | null
  onCancel: () => void
  onSave: (passenger: Passenger) => void
}

type PassengerFormErrors = Partial<Record<keyof Passenger, string>>

const initialValues: Passenger = {
  fullName: '',
  cpf: '',
  email: '',
}

export function PassengerForm({ initialPassenger, onCancel, onSave }: PassengerFormProps) {
  const [values, setValues] = useState<Passenger>(initialPassenger ?? initialValues)
  const [errors, setErrors] = useState<PassengerFormErrors>({})

  useEffect(() => {
    setValues(initialPassenger ?? initialValues)
    setErrors({})
  }, [initialPassenger])

  function handleChange(field: keyof Passenger, value: string) {
    const nextValue = field === 'cpf' ? maskCpf(value) : value

    setValues((current) => ({
      ...current,
      [field]: nextValue,
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

  function validate() {
    const nextErrors: PassengerFormErrors = {}

    if (values.fullName.trim().split(/\s+/).filter(Boolean).length < 2) {
      nextErrors.fullName = 'Informe o nome completo'
    }

    if (!validateCpf(values.cpf)) {
      nextErrors.cpf = 'CPF inválido'
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      nextErrors.email = 'E-mail inválido'
    }

    return nextErrors
  }

  function handleSubmit() {
    const nextErrors = validate()

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    onSave({
      fullName: values.fullName.trim(),
      cpf: values.cpf,
      email: values.email.trim(),
    })
  }

  return (
    <div className="passenger-form">
      <div className="passenger-form__inner">
        <div className="passenger-form__field">
          <label className="passenger-form__label" htmlFor="passenger-full-name">
            Nome completo
          </label>
          <input
            id="passenger-full-name"
            className={`passenger-form__input ${errors.fullName ? 'passenger-form__input--error' : ''}`}
            type="text"
            placeholder="Ex: João da Silva"
            value={values.fullName}
            onChange={(event) => handleChange('fullName', event.target.value)}
          />
          {errors.fullName ? (
            <span className="passenger-form__error">{errors.fullName}</span>
          ) : null}
        </div>

        <div className="passenger-form__field">
          <label className="passenger-form__label" htmlFor="passenger-cpf">
            CPF
          </label>
          <input
            id="passenger-cpf"
            className={`passenger-form__input ${errors.cpf ? 'passenger-form__input--error' : ''}`}
            type="text"
            inputMode="numeric"
            placeholder="000.000.000-00"
            value={values.cpf}
            onChange={(event) => handleChange('cpf', event.target.value)}
          />
          {errors.cpf ? <span className="passenger-form__error">{errors.cpf}</span> : null}
        </div>

        <div className="passenger-form__field">
          <label className="passenger-form__label" htmlFor="passenger-email">
            E-mail
          </label>
          <input
            id="passenger-email"
            className={`passenger-form__input ${errors.email ? 'passenger-form__input--error' : ''}`}
            type="email"
            placeholder="seu@email.com"
            value={values.email}
            onChange={(event) => handleChange('email', event.target.value)}
          />
          {errors.email ? <span className="passenger-form__error">{errors.email}</span> : null}
        </div>

        <div className="passenger-form__actions">
          <button type="button" className="passenger-form__cancel" onClick={onCancel}>
            Cancelar
          </button>
          <button type="button" className="passenger-form__save" onClick={handleSubmit}>
            Salvar dados
          </button>
        </div>
      </div>
    </div>
  )
}
