import React, { useContext } from 'react'
import { CheckoutAccount, CheckoutSignUp, CheckoutGuest } from '.'
import { FormContext } from './CheckoutForm'

const CheckoutCustomer = () => {
  const { form, order } = useContext(FormContext)
  const isCatering = order.orderType === 'CATERING'
  const hasAccount = form.customer && form.customer.customer_id

  return hasAccount ? (
    <CheckoutAccount />
  ) : (
    <>
      <CheckoutSignUp />
      {!isCatering && <CheckoutGuest />}
    </>
  )
}

CheckoutCustomer.displayName = 'CheckoutCustomer'

export default CheckoutCustomer
