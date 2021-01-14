/* eslint-disable no-undef */
/* eslint-disable no-console */
import React, { useState, useEffect, useContext } from 'react'
import styled from '@emotion/styled'
import { FormFieldset, FormInputs } from '../inputs'
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

const validateSession = async (api, validationURL, callback) => {
  console.log(api)
  console.log(validationURL)
  try {
    const { merchant_session } = await api.postApplePayValidate(validationURL)
    callback(merchant_session)
  } catch (err) {
    console.log(err)
  }
  // const headers = {
  //   Accept: 'application/json',
  //   'Content-Type': 'application/json',
  //   // 'Access-Control-Allow-Origin': '*',
  // }
  // const options = {
  //   method: 'POST',
  //   headers: headers,
  //   body: JSON.stringify({ validationURL }),
  // }
  // const response = await fetch(apiValidateUrl, options)
  // const { ok, status, statusText } = response
  // console.log(ok, status, statusText)
  // try {
  //   response.json().then((parsed) => {
  //     console.log(parsed)
  //     callback(response.data)
  //   })
  // } catch (err) {
  //   console.log(err)
  // }
}

const CheckoutApplePay = ({ label = 'Open Tender', amount = '10.00' }) => {
  const [showApplePay, setShowApplePay] = useState(false)
  const { api } = useContext(FormContext)
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
        validateSession(api, evt.validationURL, (merchantSession) => {
          console.log(merchantSession)
          applePaySession.completeMerchantValidation(merchantSession)
        })
      } catch (err) {
        console.log(err)
      }
    }
    applePaySession.onpaymentauthorized = (evt) => {
      console.log('payment is happening')
      console.log(evt.payment)
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
