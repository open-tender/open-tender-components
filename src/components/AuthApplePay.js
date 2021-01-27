import React, { useState, useEffect } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { handleRespError } from '@open-tender/js'
import { FormError } from './inputs'

const ApplePayView = styled('div')`
  margin: 2rem 0 1rem;

  > span > p {
    margin: 0;
  }
`

const ApplePayButton = styled('button')`
  display: inline-block;
  -webkit-appearance: -apple-pay-button;
  -apple-pay-button-type: plain;
  -apple-pay-button-style: black;
  width: 100%;
  height: 4.5rem;
`

const ApplePayChecking = styled('div')`
  width: 100%;
  padding: 0 0 1rem;
  text-align: center;
  font-size: ${(props) => props.theme.fonts.sizes.small};
  color: ${(props) => props.theme.colors.primary};

  > div {
    display: inline-block;
    margin: 0 0 1rem;
  }
`

const paymentSessionConfig = {
  countryCode: 'US',
  currencyCode: 'USD',
  supportedNetworks: ['visa', 'masterCard', 'amex', 'discover'],
  merchantCapabilities: ['supports3DS'],
  // total: { label: 'Your Merchant Name', amount: '10.00' },
}

// https://developer.apple.com/documentation/apple_pay_on_the_web/apple_pay_js_api/checking_for_apple_pay_availability
const checkApplePayWithActiveCard = (applePayMerchantId, setChecking) => {
  if (applePayMerchantId && window.ApplePaySession) {
    setChecking(true)
    const promise = ApplePaySession.canMakePaymentsWithActiveCard(
      applePayMerchantId
    )
    return promise
      .then((canMakePayments) => {
        const canPay = ApplePaySession.canMakePayments()
        console.log(canMakePayments, canPay)
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

const processPayment = async (api, token, amount, customerId) => {
  try {
    return await api.postApplePayPayment(token, amount, customerId)
  } catch (err) {
    const error = handleRespError(err)
    throw new Error(error.detail)
  }
}

const AuthApplePay = ({
  api,
  spinner,
  brand,
  customerId,
  amount = '0.00',
  message = 'Add new card via Apple Pay or enter a new card manually below.',
  callback,
}) => {
  const [checking, setChecking] = useState(false)
  const [showApplePay, setShowApplePay] = useState(false)
  const [errMsg, setErrMsg] = useState(null)
  const { title: label, applePayMerchantId } = brand
  const config = { ...paymentSessionConfig, total: { label, amount } }
  const show = checking || showApplePay || errMsg

  useEffect(() => {
    checkApplePayWithActiveCard(applePayMerchantId, setChecking).then((show) =>
      setShowApplePay(show)
    )
  }, [applePayMerchantId])

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
      const token = evt.payment.token
      processPayment(api, token, amount, customerId)
        .then(() => {
          applePaySession.completePayment(ApplePaySession.STATUS_SUCCESS)
          if (callback) callback()
        })
        .catch((err) => {
          applePaySession.completePayment(ApplePaySession.STATUS_FAILURE)
          setErrMsg(err.detail || err.message)
        })
    }
  }

  return show ? (
    <ApplePayView>
      <FormError errMsg={errMsg} style={{ margin: '0 0 2rem' }} />
      {checking ? (
        <ApplePayChecking>
          {spinner}
          <p>Checking for Apple Pay support...</p>
        </ApplePayChecking>
      ) : showApplePay ? (
        <>
          {!!message && <p>{message}</p>}
          <ApplePayButton onClick={onClick} />
        </>
      ) : null}
    </ApplePayView>
  ) : null
}

AuthApplePay.displayName = 'AuthApplePay'
AuthApplePay.propTypes = {
  api: propTypes.object,
  brand: propTypes.object,
  customerId: propTypes.number,
  spinner: propTypes.element,
  amount: propTypes.string,
  message: propTypes.string,
  callback: propTypes.func,
}

export default AuthApplePay
