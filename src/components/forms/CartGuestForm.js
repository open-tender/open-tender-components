import React, { useRef, useState, useEffect } from 'react'
import propTypes from 'prop-types'
import { ButtonSubmit } from '..'
import { FormError, FormInputs, FormSubmit, Input } from '../inputs'

const fields = [
  { label: 'First Name', name: 'first_name', type: 'text', required: true },
  { label: 'Last Name', name: 'last_name', type: 'text', required: true },
]

const CartGuestForm = ({ loading, errMsg, cartId, joinCart }) => {
  const submitRef = useRef()
  const inputRef = useRef()
  const [data, setData] = useState({ cart_id: cartId })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    return () => {
      setData({})
    }
  }, [])

  useEffect(() => {
    if (loading === 'idle') {
      setSubmitting(false)
      if (errMsg) {
        inputRef.current.focus()
      }
    }
  }, [loading, errMsg])

  const handleChange = (evt) => {
    const { id, value } = evt.target
    setData({ ...data, [id]: value })
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    setSubmitting(true)
    joinCart(data)
    submitRef.current.blur()
  }

  return (
    <form id="cart-guest-form" onSubmit={handleSubmit} noValidate>
      <FormError errMsg={errMsg} style={{ margin: '0 0 2rem' }} />
      <FormInputs>
        {fields.map((field, index) => (
          <Input
            ref={index === 0 ? inputRef : null}
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
        <ButtonSubmit submitRef={submitRef} submitting={submitting}>
          {submitting ? 'Submitting...' : 'Submit'}
        </ButtonSubmit>
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
