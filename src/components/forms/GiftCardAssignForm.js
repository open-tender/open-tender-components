import React, { useRef, useState, useEffect } from 'react'
import propTypes from 'prop-types'
import { ButtonSubmit } from '..'
import { FormError, FormInputs, FormSubmit, Input } from '../inputs'

const GiftCardAssignForm = ({ loading, error, assign, callback }) => {
  const submitRef = useRef(null)
  const inputRef = useRef(null)
  const [cardNumber, setCardNumber] = useState('')
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const errMsg = errors.form && !errors.card_number ? errors.form : null

  useEffect(() => {
    if (loading === 'idle') {
      setSubmitting(false)
      if (error) {
        setErrors(error)
        inputRef.current.focus()
      }
    }
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
      inputRef.current.focus()
    } else {
      assign(card_number, callback)
      submitRef.current.blur()
    }
  }

  return (
    <form id="gift-card-assign-form" onSubmit={handleSubmit} noValidate>
      <FormError errMsg={errMsg} style={{ margin: '0 0 2rem' }} />
      <FormInputs>
        <Input
          ref={inputRef}
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
        <ButtonSubmit submitRef={submitRef} submitting={submitting}>
          {submitting ? 'Submitting...' : 'Assign Gift Card'}
        </ButtonSubmit>
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
