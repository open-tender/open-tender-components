/* eslint-disable no-undef */
/* eslint-disable no-console */
import React, { useState, useEffect, useContext } from 'react'
import styled from '@emotion/styled'
import { FormError, FormFieldset, FormInputs } from '../inputs'
import { FormContext } from './CheckoutForm'

const ApplePayButton = styled('button')`
  display: inline-block;
  -webkit-appearance: -apple-pay-button;
  -apple-pay-button-type: buy;
  -apple-pay-button-style: black;
`

const paymentSessionConfig = {
  countryCode: 'US',
  currencyCode: 'USD',
  supportedNetworks: ['visa', 'masterCard', 'amex', 'discover'],
  merchantCapabilities: ['supports3DS'],
  // total: { label: 'Your Merchant Name', amount: '10.00' },
}

// https://developer.apple.com/documentation/apple_pay_on_the_web/apple_pay_js_api/checking_for_apple_pay_availability
const checkApplePayWithActiveCard = () => {
  if (window.ApplePaySession) {
    const merchantIdentifier = 'merchant.opentender.app'
    const promise = ApplePaySession.canMakePaymentsWithActiveCard(
      merchantIdentifier
    )
    return promise
      .then((canMakePayments) => {
        console.log('canMakePayments', canMakePayments)
        const canPay = ApplePaySession.canMakePayments()
        console.log('canPay', canPay)
        return canMakePayments || canPay
      })
      .catch((err) => console.log('catch', err) || false)
  } else {
    return new Promise((resolve) => resolve(false))
  }
}

const validateSession = async (api, validationURL, callback) => {
  try {
    const { merchant_session } = await api.postApplePayValidate(validationURL)
    callback(merchant_session)
  } catch (err) {
    throw new Error(err.detail || err.message)
  }
}

const CheckoutApplePay = ({ label = 'Open Tender', amount = '10.00' }) => {
  const [showApplePay, setShowApplePay] = useState(false)
  const [errMsg, setErrMsg] = useState(null)
  const { api } = useContext(FormContext)
  const config = { ...paymentSessionConfig, total: { label, amount } }
  console.log('errMsg', errMsg)

  useEffect(() => {
    checkApplePayWithActiveCard().then((show) => setShowApplePay(show))
  }, [])

  const onClick = (evt) => {
    evt.preventDefault()
    const applePaySession = new ApplePaySession(6, config)
    applePaySession.begin()

    applePaySession.onvalidatemerchant = (evt) => {
      validateSession(api, evt.validationURL, (merchantSession) => {
        applePaySession.completeMerchantValidation(merchantSession)
      }).catch((err) => {
        applePaySession.abort()
        setErrMsg(err.detail || err.message)
      })
    }

    applePaySession.onpaymentauthorized = (evt) => {
      console.log('payment is happening')
      console.log(evt.payment)
    }
  }

  return showApplePay ? (
    <FormFieldset>
      <FormInputs>
        <FormError errMsg={errMsg} style={{ margin: '0 0 2rem' }} />
        {showApplePay && <ApplePayButton onClick={onClick} />}
      </FormInputs>
    </FormFieldset>
  ) : null
}

export default CheckoutApplePay
