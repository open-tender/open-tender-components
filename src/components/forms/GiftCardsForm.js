import React, { useState, useRef, useEffect } from 'react'
import propTypes, { object } from 'prop-types'
import { CreditCardForm } from '.'
import { Input } from '../index'
import Button from '../Button'
import { Error } from '../Inputs'

const initState = { amount: '10.00', quantity: 1, email: '' }

const amounts = ['10.00', '25.00', '50.00', '100.00', '500.00']

const options = amounts.map((i) => ({
  name: `$${parseFloat(i).toFixed(0)}`,
  value: i,
}))

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

const InputEmail = ({ label, name, value, onChange, disabled, error }) => (
  <span className="input gift-cards__input__email">
    <input
      aria-label={label}
      id={name}
      name={name}
      type="email"
      autoComplete={null}
      value={value || ''}
      placeholder="enter email address (optional)"
      disabled={disabled}
      onChange={onChange}
    />
    {error ? <Error error={error} /> : null}
  </span>
)

InputEmail.displayName = 'InputEmail'
InputEmail.propTypes = {
  label: propTypes.string,
  name: propTypes.string,
  value: propTypes.string,
  onChange: propTypes.func,
  disabled: propTypes.bool,
  error: propTypes.string,
}

const Quantity = ({ name, quantity, update, classes = '', iconMap = {} }) => {
  const handleAdjust = (evt) => {
    const value = parseInt(evt.target.value)
    const quantity = isNaN(value) || value < 1 ? '' : value
    update(quantity)
  }

  const handleIncrement = (evt) => {
    evt.preventDefault()
    update(quantity + 1)
    evt.target.blur()
  }

  const handleDecrement = (evt) => {
    evt.preventDefault()
    if (quantity > 0) update(quantity - 1)
    evt.target.blur()
  }

  return (
    <div className={`quantity ot-bg-color-secondary ${classes}`}>
      <button
        className="quantity__decrease ot-color-body"
        onClick={handleDecrement}
        disabled={quantity === 0}
        aria-label={`Decrease ${name} quantity`}
      >
        {iconMap.minus || '-'}
      </button>
      <label className={`label ${classes}`}>
        <input
          type="number"
          value={quantity}
          onChange={handleAdjust}
          aria-label={`${name} quantity`}
          className="ot-input-quantity ot-font-size-small"
        />
      </label>
      <button
        className="quantity__increase ot-color-body"
        onClick={handleIncrement}
        aria-label={`Increase ${name} quantity`}
      >
        {iconMap.plus || '+'}
      </button>
    </div>
  )
}

Quantity.displayName = 'Quantity'
Quantity.propTypes = {
  name: propTypes.string,
  quantity: propTypes.number,
  update: propTypes.func,
  classes: propTypes.string,
  iconMap: propTypes.object,
}

const makeGiftCards = (giftCards) => {
  return giftCards.reduce((arr, card) => {
    const { amount, quantity, email } = card
    const giftCard = !email || !email.length ? { amount, quantity } : card
    return [...arr, giftCard]
  }, [])
}

const GiftCardsForm = ({
  purchase,
  reset,
  loading,
  error,
  success,
  purchasedCards,
  iconMap,
  customer = {},
  creditCards = [],
}) => {
  const submitButton = useRef()
  const url = window.location.origin
  const [name, setName] = useState(customer ? customer.first_name : null)
  const [email, setEmail] = useState(customer ? customer.email : null)
  const [cards, setCards] = useState([initState])
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

  const handleName = (evt) => {
    setName(evt.target.value)
  }

  const handleEmail = (evt) => {
    setEmail(evt.target.value)
  }

  const handleChange = (evt) => {
    const { id, value } = evt.target
    const [field, index] = id.split('-')
    const newCards = cards.map((card, idx) => {
      return idx === parseInt(index) ? { ...card, [field]: value } : card
    })
    setCards(newCards)
  }

  const handleQuantity = (index, quantity) => {
    const newCards =
      quantity > 0
        ? cards.map((card, idx) => {
            return idx === parseInt(index)
              ? { ...card, quantity: quantity }
              : card
          })
        : cards.filter((i, idx) => idx !== index)
    setCards(newCards)
  }

  const handleAddAnother = (evt) => {
    evt.preventDefault()
    setCards([...cards, initState])
    evt.target.blur()
  }

  const handleCreditCard = (evt) => {
    const customerCardId = parseInt(evt.target.value)
    setCreditCard({ customer_card_id: customerCardId })
  }

  const handleSubmitNewCard = (card) => {
    setErrors({})
    const gift_cards = makeGiftCards(cards)
    purchase({ credit_card: card, name, email, url, gift_cards })
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    const { first_name: name, email } = customer || {}
    if (!name || !email) {
      setErrors({ form: 'Both name and email are required' })
      window.scroll(0, 0)
    } else {
      setErrors({})
      setSubmitting(true)
      const gift_cards = makeGiftCards(cards)
      purchase({ credit_card: creditCard, name, email, url, gift_cards })
      submitButton.current.blur()
    }
  }

  const handleReset = (evt) => {
    evt.preventDefault()
    setCards([initState])
    setErrors({})
    reset()
    evt.target.blur()
  }

  return success ? (
    <div className="gift-cards__section">
      <div className="gift-cards__section__header">
        <p className="gift-cards__section__header__title ot-heading ot-font-size-h4">
          Success! Please check your email for your receipt and assigned gift
          cards.
        </p>
        <p className="gift-cards__section__header__subtitle ot-font-size-small">
          Below is the list of gift cards you purchased.
        </p>
      </div>
      {purchasedCards && (
        <table className="gift-cards__table">
          <thead>
            <tr className="ot-border-color ot-color-headings">
              <th>Card Number</th>
              <th>Recipient</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {purchasedCards.map((i) => (
              <tr key={i.card_number} className="ot-border-color">
                <td>{i.card_number}</td>
                <td>{i.email || 'none'}</td>
                <td>${i.balance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <p>
        <Button
          text="Purchase more gift cards"
          onClick={handleReset}
          classes="ot-btn ot-btn--secondary"
        />
      </p>
    </div>
  ) : (
    <>
      <form
        id="gift-cards-form"
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
        {!customer && (
          <div className="gift-cards__section">
            <div className="gift-cards__section__header">
              <p className="gift-cards__section__header__title ot-heading ot-font-size-h4">
                Enter your name and email address for your receipt
              </p>
              <p className="gift-cards__section__header__subtitle ot-font-size-small">
                {"We'll"} send a receipt and your purchased gift card numbers to
                the email address you enter below.
              </p>
            </div>
            <div className="form__inputs">
              <Input
                label="Your Name"
                name="name"
                type="text"
                value={name}
                onChange={handleName}
                error={errors.name}
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
              />
            </div>
          </div>
        )}
        <div className="gift-cards__section">
          <div className="gift-cards__section__header">
            <p className="gift-cards__section__header__title ot-heading ot-font-size-h4">
              Add your gift cards
            </p>
            <p className="gift-cards__section__header__subtitle ot-font-size-small">
              You can purchase one or more gift cards and optionally enter an
              email address to gift the gift card to someone else (the recipient
              will receive an email notification, and the card will
              automatically be added to their account if they have one or create
              a new one).
            </p>
          </div>
          <div className="gift-cards__inputs">
            {cards.map((card, index) => (
              <div
                key={`card-${index}`}
                className="gift-cards__input ot-border-color"
              >
                <Select
                  label={`Gift card ${index} amount`}
                  name={`amount-${index}`}
                  value={card.amount}
                  onChange={handleChange}
                  error={errors[`amount-${index}`]}
                  required={true}
                  options={options}
                  className="gift-cards__input__amount"
                />
                <Quantity
                  name={`Gift card ${index}`}
                  quantity={card.quantity}
                  update={(quantity) => handleQuantity(index, quantity)}
                  iconMap={iconMap}
                />
                <InputEmail
                  label={`Gift card ${index} email recipient`}
                  name={`email-${index}`}
                  type="email"
                  value={card.email}
                  onChange={handleChange}
                  error={errors[`gift_cards.${index}.email`]}
                  required={true}
                  disabled={submitting}
                />
              </div>
            ))}
            <div className="gift-cards__add-another">
              <button
                className="ot-btn ot-btn--secondary"
                type="button"
                disabled={submitting}
                onClick={handleAddAnother}
              >
                Add Another
              </button>
            </div>
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
                {submitting ? 'Submitting...' : 'Purchase Gift Cards'}
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
            {name && email ? (
              <CreditCardForm
                loading={loading}
                error={newCardError}
                addCard={handleSubmitNewCard}
                submitText="Purchase Gift Cards"
                submittingText="Submitting..."
              />
            ) : (
              <p className="ot-color-error">
                Please enter your name & email before adding your payment
                information.
              </p>
            )}
          </div>
        </div>
      )}
    </>
  )
}

GiftCardsForm.displayName = 'GiftCardsForm'
GiftCardsForm.propTypes = {
  purchase: propTypes.func,
  reset: propTypes.func,
  loading: propTypes.string,
  error: propTypes.object,
  success: propTypes.bool,
  purchasedCards: propTypes.array,
  iconMap: propTypes.object,
  customer: propTypes.object,
  creditCards: propTypes.array,
}

export default GiftCardsForm
