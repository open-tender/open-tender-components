import styled from '@emotion/styled'
import React, { useState, useEffect } from 'react'
import { FormFieldset, FormInputs } from '../inputs'

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

// const checkApplePay = () => {
//   if (window.ApplePaySession) {
//     console.log('canMakePayments', window.ApplePaySession.canMakePayments())
//     return window.ApplePaySession.canMakePayments()
//   } else {
//     return false
//   }
// }

const apiUrl = process.env.REACT_APP_API_URL
const apiValidateUrl = apiUrl + '/validate-apple-pay'
const apiPayUrl = apiUrl + '/pay-apple-pay'

const validateSession = async (validationURL, callback) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    // 'Access-Control-Allow-Origin': '*',
  }
  const options = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({ validationURL }),
  }
  const response = await fetch(apiValidateUrl, options)
  callback(response.data)
}

const CheckoutApplePay = ({ label = 'Open Tender', amount = '10.00' }) => {
  const [showApplePay, setShowApplePay] = useState(false)
  const config = { ...paymentSessionConfig, total: { label, amount } }

  useEffect(() => {
    checkApplePayWithActiveCard().then((show) => setShowApplePay(show))
  }, [])

  const onClick = (evt) => {
    evt.preventDefault()
    const applePaySession = new ApplePaySession(6, config)
    applePaySession.begin()
    applePaySession.onvalidatemerchant = (evt) => {
      // const validationURL = evt.validationURL
      console.log('evt.validationURL', evt.validationURL)
      try {
        validateSession(evt.validationURL, (merchantSession) => {
          console.log(merchantSession)
          // applePaySession.completeMerchantValidation(merchantSession)
        })
      } catch (err) {
        console.log(err)
      }
    }
  }

  return showApplePay ? (
    <FormFieldset>
      <FormInputs>
        {showApplePay && <ApplePayButton onClick={onClick} />}
      </FormInputs>
    </FormFieldset>
  ) : null
}

export default CheckoutApplePay
