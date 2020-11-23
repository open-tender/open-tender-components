import React, { useState, useRef, useEffect } from 'react'
import propTypes from 'prop-types'
import { Input } from '../index'

const GiftCardAssignForm = ({ loading, error, assign, callback }) => {
  const submitButton = useRef()
  const [cardNumber, setCardNumber] = useState('')
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (loading === 'idle') setSubmitting(false)
    if (error) setErrors(error)
  }, [loading, error])

  const handleChange = (evt) => {
    setCardNumber(evt.target.value)
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    setSubmitting(true)
    const card_number = parseInt(cardNumber)
    if (isNaN(card_number)) {
      setErrors({ card_number: 'Card numbers must be all digits' })
    } else {
      assign(card_number, callback)
    }
    submitButton.current.blur()
  }

  return (
    <form
      id="gift-card-form"
      className="form"
      onSubmit={handleSubmit}
      noValidate
    >
      {errors.form && !errors.card_number && (
        <div className="form__error form__error--top ot-form-error">
          {errors.form}
        </div>
      )}
      <div className="form__inputs">
        <Input
          label="Card Number"
          name="card_number"
          type="number"
          value={cardNumber}
          onChange={handleChange}
          error={errors.card_number}
          required={true}
        />
      </div>
      <div className="form__submit">
        <button
          className="ot-btn"
          type="submit"
          disabled={submitting}
          ref={submitButton}
        >
          {submitting ? 'Submitting' : 'Assign Gift Card'}
        </button>
      </div>
    </form>
  )
}

GiftCardAssignForm.displayName = 'GiftCardAssignForm'
GiftCardAssignForm.propTypes = {
  loading: propTypes.string,
  error: propTypes.object,
  assign: propTypes.func,
  callback: propTypes.func,
}

export default GiftCardAssignForm
