import React, { useState, useRef, useEffect } from 'react'
import propTypes from 'prop-types'
import { CreditCardForm } from '.'
import { Input } from '../index'

const initState = { amount: '10.00', quantity: 1, email: '' }

const amounts = ['10.00', '25.00', '50.00', '100.00', '500.00']

const options = amounts.map((i) => ({ name: `$${i}`, value: i }))

const Select = ({ label, name, value, onChange, disabled, options }) => (
  <span className="input gift-cards__input__amount select__wrapper">
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
}

const InputEmail = ({ label, name, value, onChange, disabled }) => (
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
  </span>
)

InputEmail.displayName = 'InputEmail'
InputEmail.propTypes = {
  label: propTypes.string,
  name: propTypes.string,
  value: propTypes.string,
  onChange: propTypes.func,
  disabled: propTypes.bool,
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

const GiftCardsForm = ({
  purchase,
  success,
  loading,
  error,
  iconMap,
  creditCards = [],
}) => {
  const submitButton = useRef()
  const [cards, setCards] = useState([initState])
  const [email, setEmail] = useState(null)
  const [isNewCard, setIsNewCard] = useState(creditCards.length ? false : true)
  const [creditCard, setCreditCard] = useState(null)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (loading === 'idle') setSubmitting(false)
    if (error) setErrors(error)
  }, [loading, error])

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

  const handleSubmitNewCard = (card) => {
    purchase({ credit_card: card, email, cards })
  }

  const handleSubmit = (evt, card) => {
    evt.preventDefault()
    setSubmitting(true)
    purchase({ credit_card: card, email, cards })
    submitButton.current.blur()
  }

  return success ? (
    <div className="gift-cards__success">
      <p className="ot-bold ot-color-success">
        Success! Please check your email for your receipt and assigned gift
        cards.
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
            {errors.form}
          </div>
        )}
        <div className="gift-cards__section">
          <div className="gift-cards__section__header">
            <p className="gift-cards__section__header__title ot-heading ot-font-size-h4">
              Enter your email address for your receipt
            </p>
            <p className="gift-cards__section__header__subtitle ot-font-size-small">
              {"We'll"} send a receipt and your purchased gift card numbers to
              the email address you enter below.
            </p>
          </div>
          <div className="form__inputs">
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
                  error={errors[`email-${index}`]}
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
        {!isNewCard && (
          <div className="gift-cards__section">
            <div className="gift-cards__section__header">
              <p className="gift-cards__section__header__title ot-heading ot-font-size-h4">
                Add your payment information
              </p>
              <p className="gift-cards__section__header__subtitle ot-font-size-small">
                Choose an existing credit card or add new one.
              </p>
            </div>
            <div className="form__submit">
              <button
                className="ot-btn"
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
            <CreditCardForm
              loading={loading}
              error={error}
              addCard={handleSubmitNewCard}
              submitText="Purchase Gift Cards"
            />
          </div>
        </div>
      )}
    </>
  )
}

GiftCardsForm.displayName = 'GiftCardsForm'
GiftCardsForm.propTypes = {
  purchase: propTypes.func,
  success: propTypes.bool,
  loading: propTypes.string,
  error: propTypes.object,
  creditCards: propTypes.array,
  iconMap: propTypes.object,
}

export default GiftCardsForm
