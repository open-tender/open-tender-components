import React, { useRef, useState, useEffect } from 'react'
import propTypes from 'prop-types'
import { Input } from '../index'
import SubmitButton from './SubmitButton'

const fields = [
  { label: 'First Name', name: 'first_name', type: 'text', required: true },
  { label: 'Last Name', name: 'last_name', type: 'text', required: true },
]

const CartGuestForm = ({ loading, error, cartId, joinCart }) => {
  const [data, setData] = useState({ cart_id: cartId })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const submitButton = useRef()

  useEffect(() => {
    return () => {
      setData({})
      setErrors({})
    }
  }, [])

  useEffect(() => {
    if (loading === 'idle') setSubmitting(false)
    if (error) setErrors(error)
  }, [loading, error])

  const handleChange = (evt) => {
    const { id, value } = evt.target
    setData({ ...data, [id]: value })
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    setErrors({})
    setSubmitting(true)
    joinCart(data)
    submitButton.current.blur()
  }

  return (
    <form id="signup-form" className="form" onSubmit={handleSubmit} noValidate>
      {error && (
        <div className="form__error form__error--top ot-form-error">
          There are one or more errors below.
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
            onChange={handleChange}
            error={errors ? errors[field.name] : ''}
            required={field.required}
          />
        ))}
      </div>
      <div className="form__submit">
        <SubmitButton submitRef={submitButton} submitting={submitting} />
      </div>
    </form>
  )
}

CartGuestForm.displayName = 'CartGuestForm'
CartGuestForm.propTypes = {
  loading: propTypes.string,
  error: propTypes.object,
  cartId: propTypes.number,
  joinCart: propTypes.func,
}

export default CartGuestForm
