import React from 'react'
import propTypes from 'prop-types'
import { ButtonSubmit } from '../..'
import { FormError, FormInputs, FormSubmit, Input } from '../../inputs'
import useCartGuestForm from './useCartGuestForm'

const CartGuestForm = ({ loading, errMsg, cartId, joinCart }) => {
  const {
    submitRef,
    inputRef,
    fields,
    data,
    submitting,
    handleChange,
    handleSubmit,
  } = useCartGuestForm(loading, errMsg, cartId, joinCart)

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
