import React, { useState, useEffect } from 'react'
import propTypes from 'prop-types'
import { ButtonStyled } from '..'
import { FormError, FormInputs, FormSubmit, Input } from '../inputs'

const GiftCardAssignForm = ({ loading, error, assign, callback }) => {
  const [cardNumber, setCardNumber] = useState('')
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const errMsg = errors.form && !errors.card_number ? errors.form : null

  useEffect(() => {
    if (loading === 'idle') setSubmitting(false)
    if (error) setErrors(error)
  }, [loading, error])

  const handleChange = (evt) => {
    setCardNumber(evt.target.value)
  }

  const handleSubmit = () => {
    setSubmitting(true)
    const card_number = parseInt(cardNumber)
    if (isNaN(card_number)) {
      setErrors({ card_number: 'Card numbers must be all digits' })
    } else {
      assign(card_number, callback)
    }
  }

  return (
    <form id="gift-card-assign-form" noValidate>
      <FormError errMsg={errMsg} style={{ margin: '0 0 2rem' }} />
      <FormInputs>
        <Input
          label="Card Number"
          name="card_number"
          type="number"
          value={cardNumber}
          onChange={handleChange}
          error={errors.card_number}
          required={true}
        />
      </FormInputs>
      <FormSubmit>
        <ButtonStyled onClick={handleSubmit} disabled={submitting}>
          {submitting ? 'Submitting' : 'Assign Gift Card'}
        </ButtonStyled>
      </FormSubmit>
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
