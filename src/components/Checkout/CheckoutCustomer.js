import React, { useContext } from 'react'
import { CheckoutAccount, CheckoutSignUp, CheckoutGuest } from '.'
import { FormWrapper } from '../inputs'
import { FormContext } from './CheckoutForm'

const CheckoutCustomer = () => {
  const { form, order } = useContext(FormContext)
  const isCatering = order.orderType === 'CATERING'
  const hasAccount = form.customer && form.customer.customer_id

  return (
    <FormWrapper>
      {hasAccount ? (
        <CheckoutAccount />
      ) : (
        <>
          <CheckoutSignUp />
          {!isCatering && <CheckoutGuest />}
        </>
      )}
    </FormWrapper>
  )
}

CheckoutCustomer.displayName = 'CheckoutCustomer'

export default CheckoutCustomer
