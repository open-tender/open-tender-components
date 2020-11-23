import React, { useState, useRef, useEffect } from 'react'
import propTypes from 'prop-types'
import { CreditCardForm } from '.'
import { Input } from '../index'
import Button from '../Button'

const Select = ({
  label,
  name,
  value,
  onChange,
  disabled,
  options,
  className = '',
}) => (
  <span className={`input select__wrapper ${className}`}>
    <select
      aria-label={label}
      id={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
    >
      {options ? (
        options.map((option, index) => (
          <option key={`${option.value}-${index}`} value={option.value}>
            {option.name}
          </option>
        ))
      ) : (
        <option>loading...</option>
      )}
    </select>
    <span className="select__arrow ot-color-headings" />
  </span>
)

Select.displayName = 'Select'
Select.propTypes = {
  label: propTypes.string,
  name: propTypes.string,
  value: propTypes.string,
  onChange: propTypes.func,
  disabled: propTypes.bool,
  options: propTypes.array,
  className: propTypes.string,
}

const handleAmountError = (error) => {
  if (!error) return null
  return error.includes('money') ? 'Amount must be a positive number' : error
}

const DonationForm = ({
  purchase,
  reset,
  loading,
  error,
  success,
  donation,
  customer = {},
  creditCards = [],
}) => {
  const submitButton = useRef()
  const [amount, setAmount] = useState('')
  const [email, setEmail] = useState(customer ? customer.email : '')
  const [isNewCard, setIsNewCard] = useState(true)
  const [creditCard, setCreditCard] = useState(null)
  const [creditCardOptions, setCreditCardOptions] = useState([])
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const newCardError = error
    ? Object.entries(error)
        .filter(([key]) => key !== 'form')
        .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {})
    : null

  useEffect(() => {
    if (loading === 'idle') setSubmitting(false)
    if (error) setErrors(error)
  }, [loading, error])

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

  const handleAmount = (evt) => {
    setAmount(evt.target.value)
  }

  const handleEmail = (evt) => {
    setEmail(evt.target.value)
  }

  const handleCreditCard = (evt) => {
    const customerCardId = parseInt(evt.target.value)
    setCreditCard({ customer_card_id: customerCardId })
  }

  const handleSubmitNewCard = (card) => {
    setErrors({})
    purchase({ amount, email, credit_card: card })
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    const { email } = customer || {}
    if (!amount || !email) {
      setErrors({ form: 'Both amount and email are required' })
      window.scroll(0, 0)
    } else {
      setSubmitting(true)
      purchase({ amount, email, credit_card: creditCard })
      submitButton.current.blur()
    }
  }

  const handleReset = (evt) => {
    evt.preventDefault()
    reset()
    evt.target.blur()
  }

  return success ? (
    <div className="gift-cards__section">
      <div className="gift-cards__section__header">
        <p className="gift-cards__section__header__title ot-heading ot-font-size-h4">
          Success! Please check your email for your receipt.
        </p>
        <p className="gift-cards__section__header__subtitle ot-font-size-small">
          Thanks for your contribution of ${donation.amount}. We really
          appreciate it.
        </p>
      </div>
      <p>
        <Button
          text="Make Another Contribution"
          onClick={handleReset}
          classes="ot-btn"
        />
      </p>
    </div>
  ) : (
    <>
      <form
        id="donation-form"
        className="form"
        onSubmit={handleSubmit}
        noValidate
      >
        {errors.form && (
          <div className="form__error form__error--top ot-form-error">
            {errors.form.includes('parameters')
              ? 'There are one or more errors below'
              : errors.form}
          </div>
        )}
        <div className="gift-cards__section">
          <div className="gift-cards__section__header">
            <p className="gift-cards__section__header__title ot-heading ot-font-size-h4">
              Enter an amount and an email address
            </p>
            <p className="gift-cards__section__header__subtitle ot-font-size-small">
              {"We'll"} send a receipt to the email address you enter below.
            </p>
          </div>
          <div className="form__inputs">
            <Input
              label="Contribution Amount"
              name="amount"
              type="number"
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
          </div>
        </div>
        {!isNewCard && creditCards.length && (
          <div className="gift-cards__section">
            <div className="gift-cards__section__header">
              <p className="gift-cards__section__header__title ot-heading ot-font-size-h4">
                Add your payment information
              </p>
              <p className="gift-cards__section__header__subtitle ot-font-size-small">
                Choose an existing credit card or add new one from your account
                page.
              </p>
            </div>
            <Select
              label="Choose existing credit card"
              name="credit_card"
              value={creditCard.customer_card_id}
              onChange={handleCreditCard}
              error={errors.credit_card}
              required={true}
              options={creditCardOptions}
            />
            <div className="form__submit gift-cards__submit">
              <button
                className="ot-btn ot-btn--big"
                type="submit"
                disabled={submitting}
                ref={submitButton}
              >
                {submitting ? 'Submitting...' : 'Submit Contribution'}
              </button>
            </div>
          </div>
        )}
      </form>
      {isNewCard && (
        <div className="gift-cards__section">
          <div className="gift-cards__section__header">
            <p className="gift-cards__section__header__title ot-heading ot-font-size-h4">
              Add your payment information
            </p>
            <p className="gift-cards__section__header__subtitle ot-font-size-small">
              Please enter your payment info below.
            </p>
          </div>
          <div className="gift-cards__new-card">
            {amount && email ? (
              <CreditCardForm
                loading={loading}
                error={newCardError}
                addCard={handleSubmitNewCard}
                submitText="Submit Contribution"
                submittingText="Submitting..."
              />
            ) : (
              <p className="ot-color-error">
                Please enter an amount & email address before adding your
                payment information.
              </p>
            )}
          </div>
        </div>
      )}
    </>
  )
}

DonationForm.displayName = 'DonationForm'
DonationForm.propTypes = {
  purchase: propTypes.func,
  reset: propTypes.func,
  loading: propTypes.string,
  error: propTypes.object,
  success: propTypes.bool,
  donation: propTypes.object,
  customer: propTypes.object,
  creditCards: propTypes.array,
}

export default DonationForm
