/* eslint-disable no-undef */
import React, { useState, useEffect, useContext } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { FormError } from '../inputs'
import { FormContext } from './CheckoutForm'
import { TendersContext } from './CheckoutTenders'
// import { ButtonStyled } from '..'

const ApplePayView = styled('div')`
  margin: 1.5rem 0;
`

const ApplePayButton = styled('button')`
  display: inline-block;
  -webkit-appearance: -apple-pay-button;
  -apple-pay-button-type: plain;
  -apple-pay-button-style: black;
  width: 100%;
  height: 4.5rem;
`

const paymentSessionConfig = {
  countryCode: 'US',
  currencyCode: 'USD',
  supportedNetworks: ['visa', 'masterCard', 'amex', 'discover'],
  merchantCapabilities: ['supports3DS'],
  // total: { label: 'Your Merchant Name', amount: '10.00' },
}

// https://developer.apple.com/documentation/apple_pay_on_the_web/apple_pay_js_api/checking_for_apple_pay_availability
const checkApplePayWithActiveCard = (setChecking) => {
  if (window.ApplePaySession) {
    setChecking(true)
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
      .catch(() => false)
      .finally(() => setChecking(false))
  } else {
    return new Promise((resolve) => resolve(false))
  }
}

const validateSession = async (api, validationURL, callback) => {
  try {
    const host = window.location.hostname
    const { merchant_session } = await api.postApplePayValidate(
      host,
      validationURL
    )
    callback(merchant_session)
  } catch (err) {
    throw new Error(err.detail || err.message)
  }
}

// const submitToken = async (api, token, callback) => {
//   try {
//     const response = await api.postApplePayToken(token)
//     callback(response)
//   } catch (err) {
//     throw new Error(err.detail || err.message)
//   }
// }

const CheckoutApplePay = ({ label = 'Open Tender', amount, error }) => {
  const [checking, setChecking] = useState(false)
  const [showApplePay, setShowApplePay] = useState(false)
  const [errMsg, setErrMsg] = useState(null)
  const { api, submitOrderApplePay, setCompletedOrder } = useContext(
    FormContext
  )
  const { addTender, removeTender } = useContext(TendersContext)
  const config = { ...paymentSessionConfig, total: { label, amount } }
  const show = checking || showApplePay || errMsg

  useEffect(() => {
    checkApplePayWithActiveCard(setChecking).then((show) =>
      setShowApplePay(show)
    )
  }, [])

  useEffect(() => {
    if (error) {
      removeTender('APPLE_PAY')
      setErrMsg(error)
    }
  }, [error, removeTender])

  // const onClickTest = (evt) => {
  //   if (evt) evt.preventDefault()
  //   const tender = {
  //     tender_type: 'APPLE_PAY',
  //     amount: amount,
  //     token: null,
  //   }
  //   addTender(tender)
  //   submitOrderApplePay().then((order) => {
  //     if (order) {
  //       setCompletedOrder(order)
  //     }
  //   })
  // }

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
      const tender = {
        tender_type: 'APPLE_PAY',
        amount: amount,
        token: evt.payment.token,
      }
      addTender(tender)
      submitOrderApplePay().then((order) => {
        if (order) {
          applePaySession.completePayment(ApplePaySession.STATUS_SUCCESS)
          setCompletedOrder(order)
        } else {
          applePaySession.completePayment(ApplePaySession.STATUS_FAILURE)
        }
      })
      //   submitToken(api, evt.payment.token, () => {
      //     applePaySession.completePayment(ApplePaySession.STATUS_SUCCESS)
      //   }).catch((err) => {
      //     applePaySession.completePayment(ApplePaySession.STATUS_FAILURE)
      //     setErrMsg(err.detail || err.message)
      //   })
    }
  }

  return show ? (
    <ApplePayView>
      <FormError errMsg={errMsg} style={{ margin: '0 0 2rem' }} />
      {/* <ButtonStyled onClick={() => onClickTest()}>Test Apple Pay</ButtonStyled> */}
      {checking && <p>Checking for Apple Pay support...</p>}
      {showApplePay && <ApplePayButton onClick={onClick} />}
    </ApplePayView>
  ) : null
}

CheckoutApplePay.displayName = 'CheckoutApplePay'
CheckoutApplePay.propTypes = {
  label: propTypes.string,
  amount: propTypes.string,
  error: propTypes.string,
}

export default CheckoutApplePay
