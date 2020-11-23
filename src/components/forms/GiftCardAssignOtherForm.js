import React, { useState, useRef, useEffect } from 'react'
import propTypes from 'prop-types'
import { Input } from '../index'

const GiftCardAssignOtherForm = ({
  loading,
  error,
  giftCardId,
  assign,
  callback,
}) => {
  const submitButton = useRef()
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (loading === 'idle') setSubmitting(false)
    if (error) setErrors(error)
  }, [loading, error])

  const handleChange = (evt) => {
    setEmail(evt.target.value)
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    setSubmitting(true)
    assign(giftCardId, email, callback)
    submitButton.current.blur()
  }

  return (
    <form
      id="gift-card-form"
      className="form"
      onSubmit={handleSubmit}
      noValidate
    >
      {errors.form && !errors.email && (
        <div className="form__error form__error--top ot-form-error">
          {errors.form}
        </div>
      )}
      <div className="form__inputs">
        <Input
          label="Email Address"
          name="email"
          type="email"
          value={email}
          onChange={handleChange}
          error={errors.email}
          required={true}
        />
      </div>
      <div className="form__submit">
        <button
          className="ot-btn"
          type="submit"
          disabled={submitting || !email}
          ref={submitButton}
        >
          {submitting ? 'Submitting' : 'Assign Gift Card'}
        </button>
      </div>
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
