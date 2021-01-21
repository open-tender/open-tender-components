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

  &:nth-of-type(2) {
    margin: -1rem 0 1rem;
  }

  > div {
    width: 100%;

    button {
      min-height: 4.5rem;
    }
  }
`

const makePaymentRequest = (brand, amount) => {
  const { title, googlePayMerchantId, gatewayId } = brand
  if (!googlePayMerchantId || !gatewayId) return null
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
  const { submitOrderPay, setCompletedOrder, brand } = useContext(FormContext)
  const { addTender, removeTender } = useContext(TendersContext)
  const paymentRequest = makePaymentRequest(brand, amount)
  const nonZero = parseFloat(amount) > 0

  useEffect(() => {
    if (error) setErrMsg(error)
  }, [error])

  const onLoadPaymentData = (data) => {
    const tender = {
      tender_type: 'GOOGLE_PAY',
      amount: amount,
      token: data.paymentMethodData,
    }
    addTender(tender)
    submitOrderPay(true).then((order) => {
      if (order) {
        setCompletedOrder(order)
      } else {
        removeTender('GOOGLE_PAY')
      }
    })
  }

  return nonZero && paymentRequest ? (
    <GooglePayView>
      <FormError errMsg={errMsg} style={{ margin: '0 0 2rem' }} />
      <GooglePayButton
        environment="PRODUCTION"
        buttonSizeMode="fill"
        buttonType="plain"
        paymentRequest={paymentRequest}
        onLoadPaymentData={onLoadPaymentData}
      />
    </GooglePayView>
  ) : null
}

CheckoutGooglePay.displayName = 'CheckoutGooglePay'
CheckoutGooglePay.propTypes = {
  amount: propTypes.string,
  error: propTypes.string,
}

export default CheckoutGooglePay
