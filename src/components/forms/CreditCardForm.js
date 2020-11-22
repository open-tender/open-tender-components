import React, { useState, useRef, useEffect } from 'react'
import propTypes from 'prop-types'
import {
  getCardType,
  makeAcctNumber,
  validateCreditCard,
} from '@open-tender/js'
import { Input } from '../index'

const fields = [
  {
    label: 'Card Number',
    placeholder: '#### #### #### ####',
    name: 'acct',
    type: 'text',
  },
  { label: 'Expiration', placeholder: 'MMYY', name: 'exp', type: 'number' },
  { label: 'CVV', placeholder: '###', name: 'cvv', type: 'number' },
  { label: 'Zip Code', placeholder: '#####', name: 'zip', type: 'number' },
]

const CreditCardForm = ({
  windowRef,
  loading,
  error,
  addCard,
  callback,
  submitText = 'Add New Card',
  submittingText = 'Authorizing Card...',
}) => {
  const submitButton = useRef()
  const formRef = useRef()
  const [data, setData] = useState({})
  const [cardType, setCardType] = useState('OTHER')
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (loading === 'idle') setSubmitting(false)
    if (error) setErrors(error)
  }, [loading, error])

  const handleChange = (evt) => {
    let { id, checked, value } = evt.target
    if (id === 'acct') {
      const currentType = getCardType(value.replace(/\s/g, ''))
      setCardType(currentType)
      value = makeAcctNumber(value, currentType)
    } else if (id === 'exp') {
      value = value.slice(0, 4)
    } else if (id === 'cvv') {
      value = value.slice(0, 4)
    } else if (id === 'zip') {
      value = value.slice(0, 5)
    } else if (id === 'save') {
      value = checked
    }
    setData({ ...data, [id]: value })
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    setErrors({})
    const { card, errors } = validateCreditCard(data, cardType)
    if (errors) {
      setErrors(errors)
      if (windowRef) windowRef.current.scrollTop = 0
    } else {
      setSubmitting(true)
      addCard(card, callback)
    }
    submitButton.current.blur()
  }

  return (
    <form
      id="credit-card-form"
      className="form"
      onSubmit={handleSubmit}
      ref={formRef}
      noValidate
    >
      {errors.form && (
        <div className="form__error form__error--top ot-form-error">
          {errors.form}
        </div>
      )}
      <div className="form__inputs">
        {fields.map((field) => (
          <Input
            key={field.name}
            label={field.label}
            name={field.name}
            type={field.type}
            value={data[field.name]}
            placeholder={field.placeholder}
            onChange={handleChange}
            error={errors[field.name]}
            required={field.required}
          />
        ))}
      </div>
      <div className="form__submit">
        <button
          className="ot-btn"
          type="submit"
          disabled={submitting}
          ref={submitButton}
        >
          {submitting ? submittingText : submitText}
        </button>
      </div>
    </form>
  )
}

CreditCardForm.displayName = 'CreditCardForm'
CreditCardForm.propTypes = {
  windowRef: propTypes.shape({ current: propTypes.any }),
  loading: propTypes.string,
  error: propTypes.object,
  addCard: propTypes.func,
  callback: propTypes.func,
  submitText: propTypes.string,
  submittingText: propTypes.string,
}

export default CreditCardForm
