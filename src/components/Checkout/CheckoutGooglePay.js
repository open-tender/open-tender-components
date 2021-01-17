import React, { useState, useEffect, useContext } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import GooglePayButton from '@google-pay/button-react'
import { FormError } from '../inputs'
import { FormContext } from './CheckoutForm'
import { TendersContext } from './CheckoutTenders'

const GooglePayView = styled('div')`
  width: 100%;
  margin: 2rem 0 1rem;

  > div {
    width: 100%;
  }
`

const makePaymentRequest = (brand, amount) => {
  const { title, googlePayMerchantId, gatewayId } = brand
  return {
    apiVersion: 2,
    apiVersionMinor: 0,
    allowedPaymentMethods: [
      {
        type: 'CARD',
        parameters: {
          allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
          allowedCardNetworks: ['AMEX', 'DISCOVER', 'MASTERCARD', 'VISA'],
        },
        tokenizationSpecification: {
          type: 'PAYMENT_GATEWAY',
          parameters: {
            gateway: 'gatewayservices',
            gatewayMerchantId: gatewayId,
          },
        },
      },
    ],
    merchantInfo: {
      merchantId: googlePayMerchantId,
      merchantName: title,
    },
    transactionInfo: {
      totalPriceStatus: 'FINAL',
      totalPriceLabel: 'Total',
      totalPrice: amount,
      currencyCode: 'USD',
      countryCode: 'US',
    },
  }
}

const CheckoutGooglePay = ({ amount, error }) => {
  const [errMsg, setErrMsg] = useState(null)
  const { submitOrderApplePay, setCompletedOrder, brand } = useContext(
    FormContext
  )
  const { addTender, removeTender } = useContext(TendersContext)
  const paymentRequest = makePaymentRequest(brand, amount)
  console.log(paymentRequest)

  useEffect(() => {
    if (error) setErrMsg(error)
  }, [error])

  const onLoadPaymentData = (data) => {
    console.log(data)
    // const tender = {
    //   tender_type: 'GOOGLE_PAY',
    //   amount: amount,
    //   token: null,
    // }
    // addTender(tender)
    // submitOrderApplePay().then((order) => {
    //   if (order) {
    //     setCompletedOrder(order)
    //   } else {
    //     removeTender('GOOGLE_PAY')
    //   }
    // })
  }

  return (
    <GooglePayView>
      <FormError errMsg={errMsg} style={{ margin: '0 0 2rem' }} />
      <GooglePayButton
        environment="TEST"
        buttonSizeMode="fill"
        paymentRequest={paymentRequest}
        onLoadPaymentData={onLoadPaymentData}
      />
    </GooglePayView>
  )
}

CheckoutGooglePay.displayName = 'CheckoutGooglePay'
CheckoutGooglePay.propTypes = {
  amount: propTypes.string,
  error: propTypes.string,
}

export default CheckoutGooglePay
