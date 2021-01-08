import React, { useState, useEffect } from 'react'
import propTypes from 'prop-types'
import { ButtonStyled, Input } from '../index'
import { FormError, FormInputs, FormSubmit } from '../inputs'

const GiftCardAssignOtherForm = ({
  loading,
  error,
  giftCardId,
  assign,
  callback,
}) => {
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const errMsg = errors.form && !errors.email ? errors.form : null

  useEffect(() => {
    if (loading === 'idle') setSubmitting(false)
    if (error) setErrors(error)
  }, [loading, error])

  const handleChange = (evt) => {
    setEmail(evt.target.value)
  }

  const handleSubmit = () => {
    setSubmitting(true)
    assign(giftCardId, email, callback)
  }

  return (
    <form id="gift-card-form" noValidate>
      <FormError errMsg={errMsg} style={{ margin: '0 0 2rem' }} />
      <FormInputs>
        <Input
          label="Email Address"
          name="email"
          type="email"
          value={email}
          onChange={handleChange}
          error={errors.email}
          required={true}
        />
      </FormInputs>
      <FormSubmit>
        <ButtonStyled onClick={handleSubmit} disabled={submitting || !email}>
          {submitting ? 'Submitting' : 'Assign Gift Card'}
        </ButtonStyled>
      </FormSubmit>
    </form>
  )
}

GiftCardAssignOtherForm.displayName = 'GiftCardAssignOtherForm'
GiftCardAssignOtherForm.propTypes = {
  loading: propTypes.string,
  error: propTypes.object,
  giftCardId: propTypes.number,
  assign: propTypes.func,
  callback: propTypes.func,
}

export default GiftCardAssignOtherForm
