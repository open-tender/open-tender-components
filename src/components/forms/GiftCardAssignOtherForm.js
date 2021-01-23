import React, { useRef, useState, useEffect } from 'react'
import propTypes from 'prop-types'
import { ButtonSubmit } from '../index'
import { FormError, FormInputs, FormSubmit, Input } from '../inputs'

const GiftCardAssignOtherForm = ({
  loading,
  error,
  giftCardId,
  assign,
  callback,
}) => {
  const submitRef = useRef()
  const inputRef = useRef()
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const errMsg = errors.form && !errors.email ? errors.form : null

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
    setEmail(evt.target.value)
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    setSubmitting(true)
    assign(giftCardId, email, callback)
    submitRef.current.blur()
  }

  return (
    <form id="gift-card-form" onSubmit={handleSubmit} noValidate>
      <FormError errMsg={errMsg} style={{ margin: '0 0 2rem' }} />
      <FormInputs>
        <Input
          ref={inputRef}
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
        <ButtonSubmit submitRef={submitRef} submitting={submitting || !email}>
          {submitting ? 'Submitting...' : 'Assign Gift Card'}
        </ButtonSubmit>
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
