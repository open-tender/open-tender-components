import React, { useState, useEffect } from 'react'
import propTypes from 'prop-types'
import { Input, SubmitButton } from '..'
import { FormError, FormInputs, FormSubmit } from '../inputs'

const fields = [
  { label: 'First Name', name: 'first_name', type: 'text', required: true },
  { label: 'Last Name', name: 'last_name', type: 'text', required: true },
]

const CartGuestForm = ({ loading, errMsg, cartId, joinCart }) => {
  const [data, setData] = useState({ cart_id: cartId })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    return () => {
      setData({})
    }
  }, [])

  useEffect(() => {
    if (loading === 'idle') setSubmitting(false)
  }, [loading])

  const handleChange = (evt) => {
    const { id, value } = evt.target
    setData({ ...data, [id]: value })
  }

  const handleSubmit = () => {
    setSubmitting(true)
    joinCart(data)
  }

  return (
    <form id="cart-guest-form" noValidate>
      <FormError errMsg={errMsg} style={{ margin: '0 0 2rem' }} />
      <FormInputs>
        {fields.map((field) => (
          <Input
            key={field.name}
            label={field.label}
            name={field.name}
            type={field.type}
            value={data[field.name]}
            onChange={handleChange}
            required={field.required}
          />
        ))}
      </FormInputs>
      <FormSubmit>
        <SubmitButton onClick={handleSubmit} submitting={submitting} />
      </FormSubmit>
    </form>
  )
}

CartGuestForm.displayName = 'CartGuestForm'
CartGuestForm.propTypes = {
  loading: propTypes.string,
  errMsg: propTypes.string,
  cartId: propTypes.number,
  joinCart: propTypes.func,
}

export default CartGuestForm
