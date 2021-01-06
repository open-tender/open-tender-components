import React, { useContext } from 'react'
import { CheckoutAccount, CheckoutSignUp, CheckoutGuest } from '.'
import { FormContext } from './CheckoutForm'

const CheckoutCustomer = () => {
  const formContext = useContext(FormContext)
  const { form } = formContext
  const hasAccount = form.customer && form.customer.customer_id

  return hasAccount ? (
    <CheckoutAccount />
  ) : (
    <>
      <CheckoutSignUp />
      <CheckoutGuest />
    </>
  )
}

CheckoutCustomer.displayName = 'CheckoutCustomer'

export default CheckoutCustomer
