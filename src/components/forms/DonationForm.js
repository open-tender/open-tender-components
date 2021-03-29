import React, { useRef, useState, useEffect, useMemo } from 'react'
import propTypes from 'prop-types'
import ReCAPTCHA from 'react-google-recaptcha'
import { makeNumeric, validateCreditCard } from '@open-tender/js'
import { CreditCardInputs } from '.'
import { ButtonStyled, ButtonSubmit, Input } from '..'
import {
  FormError,
  FormFieldset,
  FormInputs,
  FormLegend,
  FormSubmit,
  Select,
} from '../inputs'

const handleAmountError = (error) => {
  if (!error) return null
  return error.includes('money') ? 'Amount must be a positive number' : error
}

const DonationForm = ({
  purchase,
  reset,
  setAlert,
  loading,
  error,
  success,
  donation,
  windowRef,
  customer,
  creditCards = [],
  recaptchaKey = null,
}) => {
  const submitRef = useRef(null)
  const inputRef = useRef(null)
  const recaptchaRef = useRef(null)
  const [amount, setAmount] = useState('')
  const [email, setEmail] = useState('')
  const [isNewCard, setIsNewCard] = useState(true)
  const [creditCard, setCreditCard] = useState({})
  const [creditCardOptions, setCreditCardOptions] = useState([])
  const [cardType, setCardType] = useState(null)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const errMsg =
    errors.form && errors.form.includes('parameters')
      ? 'There are one or more errors below'
      : errors.form || null
  const newCardErrors = useMemo(
    () =>
      errors
        ? Object.entries(errors)
            .filter(([key]) => key !== 'form')
            .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {})
        : {},
    [errors]
  )

  useEffect(() => {
    if (loading === 'idle') {
      setSubmitting(false)
      setAlert({ type: 'close' })
      if (error) {
        if (recaptchaRef.current) recaptchaRef.current.reset()
        setErrors(error)
        inputRef.current.focus()
        if (windowRef) windowRef.current.scrollTop = 0
      } else if (success) {
        if (windowRef) windowRef.current.scrollTop = 0
      }
    }
  }, [loading, error, setAlert, windowRef, success])

  useEffect(() => {
    if (creditCards.length) {
      const options = creditCards.map((i) => ({
        name: `${i.card_type_name} ending in ${i.last4}`,
        value: i.customer_card_id,
      }))
      setCreditCardOptions(options)
      const defaultCard = creditCards.length
        ? { customer_card_id: creditCards[0].customer_card_id }
        : {}
      setCreditCard(defaultCard)
      setIsNewCard(false)
    }
  }, [creditCards])

  useEffect(() => {
    if (customer) setEmail(customer.email)
  }, [customer])

  const handleAmount = (evt) => {
    const cleanValue = makeNumeric(evt.target.value)
    setAmount(cleanValue)
  }

  const handleEmail = (evt) => {
    setEmail(evt.target.value)
  }

  const handleCreditCard = (evt) => {
    const customerCardId = parseInt(evt.target.value)
    setCreditCard({ customer_card_id: customerCardId })
  }

  const purchaseWithCaptcha = (credit_card) => {
    const alert = {
      type: 'working',
      args: { text: 'Submitting your contribution...' },
    }
    if (recaptchaKey) {
      try {
        const token = recaptchaRef.current.getValue()
        if (!token) {
          setSubmitting(false)
          setErrors({ form: 'Please complete the recaptcha before submitting' })
          if (windowRef) windowRef.current.scrollTop = 0
        } else {
          setSubmitting(true)
          setAlert(alert)
          purchase({ token, amount, email, credit_card })
        }
      } catch (err) {
        setSubmitting(false)
        setErrors({ form: 'Please complete the recaptcha before submitting' })
        if (windowRef) windowRef.current.scrollTop = 0
      }
    } else {
      setSubmitting(true)
      setAlert(alert)
      purchase({ amount, email, credit_card })
    }
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    if (!amount || !email) {
      setErrors({ form: 'Both amount and email are required' })
      inputRef.current.focus()
      if (windowRef) windowRef.current.scrollTop = 0
    } else {
      if (isNewCard) {
        const { card, errors } = validateCreditCard(creditCard, cardType)
        if (errors) {
          setErrors({
            ...errors,
            form: 'There are one or more credit card errors below',
          })
          setSubmitting(false)
          if (windowRef) windowRef.current.scrollTop = 0
        } else {
          purchaseWithCaptcha(card)
        }
      } else {
        // purchase({ amount, email, credit_card: creditCard })
        purchaseWithCaptcha(creditCard)
      }
      submitRef.current.blur()
    }
  }

  const handleReset = () => {
    setErrors({})
    reset()
  }

  return success ? (
    <FormFieldset>
      <FormLegend
        as="div"
        title="Success! Please check your email for your receipt."
        subtitle={`Thanks for your contribution of $${donation.amount}. We really
            appreciate it.`}
      />
      <FormSubmit>
        <ButtonStyled onClick={handleReset}>
          Make Another Contribution
        </ButtonStyled>
      </FormSubmit>
    </FormFieldset>
  ) : (
    <>
      <form id="donation-form" onSubmit={handleSubmit} noValidate>
        <FormError errMsg={errMsg} style={{ margin: '0 0 2rem' }} />
        <FormFieldset>
          <FormLegend
            as="div"
            title="Enter an amount and an email address"
            subtitle="We'll send a receipt to the email address you enter below."
          />
          <FormInputs>
            <Input
              ref={inputRef}
              label="Contribution Amount"
              name="amount"
              type="text"
              pattern="[0-9]*"
              value={amount}
              onChange={handleAmount}
              error={handleAmountError(errors.amount)}
              required={true}
            />
            <Input
              label="Your Email"
              name="email"
              type="email"
              value={email}
              onChange={handleEmail}
              error={errors.email}
              required={true}
              disabled={customer ? true : false}
            />
          </FormInputs>
        </FormFieldset>
        <FormFieldset>
          {!isNewCard && creditCards.length ? (
            <>
              <FormLegend
                as="div"
                title="Add your payment information"
                subtitle="Choose an existing credit card or add new one from your
                  account page."
              />
              <FormInputs>
                <Select
                  label="Choose Card"
                  name="credit_card"
                  value={creditCard.customer_card_id}
                  onChange={handleCreditCard}
                  error={errors.credit_card}
                  required={true}
                  options={creditCardOptions}
                />
              </FormInputs>
            </>
          ) : (
            <>
              <FormLegend
                as="div"
                title="Add your payment information"
                subtitle="Choose an existing credit card or add new one from your
                  account page."
              />
              <CreditCardInputs
                data={creditCard}
                update={setCreditCard}
                setCardType={setCardType}
                errors={newCardErrors}
              />
            </>
          )}
          {recaptchaKey && (
            <ReCAPTCHA ref={recaptchaRef} sitekey={recaptchaKey} />
          )}
          <FormSubmit style={{ margin: '3rem 0 0' }}>
            <ButtonSubmit submitRef={submitRef} submitting={submitting}>
              {submitting ? 'Submitting...' : 'Submit Contribution'}
            </ButtonSubmit>
          </FormSubmit>
        </FormFieldset>
      </form>
    </>
  )
}

DonationForm.displayName = 'DonationForm'
DonationForm.propTypes = {
  purchase: propTypes.func,
  reset: propTypes.func,
  setAlert: propTypes.func,
  loading: propTypes.string,
  error: propTypes.object,
  success: propTypes.bool,
  donation: propTypes.object,
  customer: propTypes.object,
  creditCards: propTypes.array,
  windowRef: propTypes.oneOfType([
    propTypes.func,
    propTypes.shape({ current: propTypes.instanceOf(Element) }),
  ]),
  recaptchaKey: propTypes.string,
}

export default DonationForm
