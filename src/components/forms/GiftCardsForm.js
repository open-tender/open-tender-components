import React, { useRef, useState, useEffect, useMemo } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { CreditCardForm } from '.'
import { ButtonStyled, ButtonSubmit, Input, Text } from '..'
import {
  FormError,
  FormFieldset,
  FormLegend,
  FormInputs,
  FormRow,
  FormSubmit,
  Quantity,
  SelectOnly,
  Select,
} from '../inputs'

const initState = { amount: '10.00', quantity: 1, email: '' }

const amounts = ['10.00', '25.00', '50.00', '100.00', '500.00']

const options = amounts.map((i) => ({
  name: `$${parseFloat(i).toFixed(0)}`,
  value: i,
}))

const makeGiftCards = (giftCards) => {
  return giftCards.reduce((arr, card) => {
    const { amount, quantity, email } = card
    const giftCard = !email || !email.length ? { amount, quantity } : card
    return [...arr, giftCard]
  }, [])
}

const GiftCardsRow = styled('span')`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  > span {
    &:first-of-type {
      flex: 0 0 12rem;
      margin: 0 1rem 0 0;
      @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
        flex: 0 0 8rem;
      }
    }

    &:last-of-type {
      flex-grow: 1;
      margin: 0 0 0 1rem;
    }
  }
`

const GiftCardsForm = ({
  purchase,
  reset,
  loading,
  error,
  success,
  purchasedCards,
  setAlert,
  iconMap,
  windowRef,
  customer = {},
  creditCards = [],
}) => {
  const submitRef = useRef(null)
  const inputRef = useRef(null)
  const formRef = useRef(null)
  const url = window.location.origin
  const [name, setName] = useState(customer ? customer.first_name : null)
  const [email, setEmail] = useState(customer ? customer.email : null)
  const [cards, setCards] = useState([initState])
  const [isNewCard, setIsNewCard] = useState(true)
  const [creditCard, setCreditCard] = useState(null)
  const [creditCardOptions, setCreditCardOptions] = useState([])
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const newCardError = useMemo(
    () =>
      error
        ? Object.entries(error)
            .filter(([key]) => key !== 'form')
            .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {})
        : null,
    [error]
  )

  const errMsg =
    errors.form && errors.form.includes('parameters')
      ? 'There are one or more errors below'
      : errors.form || null

  useEffect(() => {
    if (loading === 'idle') {
      setSubmitting(false)
      setAlert({ type: 'close' })
      if (error) {
        setErrors(error)
        const inputs = formRef.current.querySelectorAll('input, select')
        if (inputs.length) inputs[0].focus()
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

  const handleAddAnother = () => {
    setCards([...cards, initState])
  }

  const handleCreditCard = (evt) => {
    const customerCardId = parseInt(evt.target.value)
    setCreditCard({ customer_card_id: customerCardId })
  }

  const handleSubmitNewCard = (card) => {
    setErrors({})
    setSubmitting(true)
    const alert = {
      type: 'working',
      args: { text: 'Submitting your purchase...' },
    }
    setAlert(alert)
    const gift_cards = makeGiftCards(cards)
    purchase({ credit_card: card, name, email, url, gift_cards })
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    const { first_name: name, email } = customer || {}
    if (!name || !email) {
      setErrors({ form: 'Both name and email are required' })
      inputRef.current.focus()
      if (windowRef) windowRef.current.scrollTop = 0
    } else {
      setErrors({})
      setSubmitting(true)
      const alert = {
        type: 'working',
        args: { text: 'Submitting your purchase...' },
      }
      setAlert(alert)
      const gift_cards = makeGiftCards(cards)
      purchase({ credit_card: creditCard, name, email, url, gift_cards })
      submitRef.current.blur()
    }
  }

  const handleReset = () => {
    setCards([initState])
    setErrors({})
    reset()
  }

  return success ? (
    <FormFieldset>
      <FormLegend
        as="div"
        title="Success! Please check your email for your receipt and assigned gift
          cards."
        subtitle="Below is the list of gift cards you purchased."
      />
      {purchasedCards && (
        <table style={{ margin: '0 0 3rem' }}>
          <thead>
            <tr>
              <th>Card Number</th>
              <th>Recipient</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {purchasedCards.map((i) => (
              <tr key={i.card_number}>
                <td>{i.card_number}</td>
                <td>{i.email || 'none'}</td>
                <td>${i.balance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <FormSubmit>
        <ButtonStyled onClick={handleReset}>
          Purchase More Gift Cards
        </ButtonStyled>
      </FormSubmit>
    </FormFieldset>
  ) : (
    <>
      <form
        id="gift-cards-form"
        ref={formRef}
        onSubmit={handleSubmit}
        noValidate
      >
        <FormError errMsg={errMsg} style={{ margin: '0 0 2rem' }} />
        {!customer && (
          <FormFieldset>
            <FormLegend
              as="div"
              title="Enter your name and email address"
              subtitle="We'll send a receipt and your purchased gift card numbers to
                the email address you enter below."
            />
            <FormInputs>
              <Input
                ref={inputRef}
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
            </FormInputs>
          </FormFieldset>
        )}
        <FormFieldset>
          <FormLegend
            as="div"
            title="Add your gift cards"
            subtitle="You can purchase one or more gift cards and optionally enter an
                email address to gift the gift card to someone else (the
                recipient will receive an email notification, and the card will
                automatically be added to their account if they have one or
                create a new one)."
          />
          <FormInputs>
            {cards.map((card, index) => (
              <FormRow
                key={`card-${index}`}
                as="div"
                input={
                  <GiftCardsRow>
                    <SelectOnly
                      label={`Gift card ${index} amount`}
                      name={`amount-${index}`}
                      value={card.amount}
                      onChange={handleChange}
                      error={errors[`amount-${index}`]}
                      required={true}
                      options={options}
                    />
                    <Quantity
                      id={`gift-card-quantity-${index}`}
                      name={`Gift card ${index}`}
                      quantity={card.quantity}
                      update={(quantity) => handleQuantity(index, quantity)}
                      iconMap={iconMap}
                    />
                    <span>
                      <input
                        aria-label={`Gift card ${index} email recipient`}
                        id={`email-${index}`}
                        name={`email-${index}`}
                        type="email"
                        autoComplete={null}
                        value={card.email}
                        placeholder="enter email address (optional)"
                        disabled={submitting}
                        onChange={handleChange}
                      />
                    </span>
                  </GiftCardsRow>
                }
                errMsg={errors[`gift_cards.${index}.email`]}
              />
            ))}
            <FormRow
              as="div"
              label={
                <ButtonStyled
                  onClick={handleAddAnother}
                  disabled={submitting}
                  color="secondary"
                >
                  Add Another
                </ButtonStyled>
              }
            />
          </FormInputs>
        </FormFieldset>
        {!isNewCard && creditCards.length && (
          <FormFieldset>
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
            <FormSubmit>
              <ButtonSubmit submitRef={submitRef} submitting={submitting}>
                {submitting ? 'Submitting...' : 'Purchase Gift Cards'}
              </ButtonSubmit>
            </FormSubmit>
          </FormFieldset>
        )}
      </form>
      {isNewCard && (
        <FormFieldset style={{ margin: '3rem 0 0' }}>
          <FormLegend
            as="div"
            title="Add your payment information"
            subtitle="Please enter your payment info below."
          />
          {name && email ? (
            <CreditCardForm
              loading={loading}
              error={newCardError}
              addCard={handleSubmitNewCard}
              submitText="Purchase Gift Cards"
              submittingText="Submitting..."
            />
          ) : (
            <FormInputs>
              <Text as="p" color="error">
                Please enter your name & email before adding your payment
                information.
              </Text>
            </FormInputs>
          )}
        </FormFieldset>
      )}
    </>
  )
}

GiftCardsForm.displayName = 'GiftCardsForm'
GiftCardsForm.propTypes = {
  purchase: propTypes.func,
  setAlert: propTypes.func,
  reset: propTypes.func,
  loading: propTypes.string,
  error: propTypes.object,
  success: propTypes.bool,
  purchasedCards: propTypes.array,
  iconMap: propTypes.object,
  customer: propTypes.object,
  creditCards: propTypes.array,
  windowRef: propTypes.oneOfType([
    propTypes.func,
    propTypes.shape({ current: propTypes.instanceOf(Element) }),
  ]),
}

export default GiftCardsForm
