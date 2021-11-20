import React, { useMemo } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import ReCAPTCHA from 'react-google-recaptcha'
import { CreditCardInputs } from '..'
import { ButtonStyled, ButtonSubmit, Input } from '../..'
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
} from '../../inputs'
import useGiftCardForm from './useGiftCardsForm'

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
  customer = {},
  creditCards = [],
  recaptchaKey = null,
}) => {
  const amounts = ['10.00', '25.00', '50.00', '100.00', '500.00']
  const options = amounts.map((i) => ({
    name: `$${parseFloat(i).toFixed(0)}`,
    value: i,
  }))
  const initState = { amount: '10.00', quantity: 1, email: '' }
  const {
    formRef,
    inputRef,
    submitRef,
    recaptchaRef,
    setCardType,
    creditCardOptions,
    handleName,
    handleEmail,
    handleChange,
    handleQuantity,
    handleAddAnother,
    handleCreditCard,
    handleSubmit,
    handleReset,
    name,
    email,
    cards,
    isNewCard,
    creditCard,
    setCreditCard,
    errors,
    submitting,
  } = useGiftCardForm(
    purchase,
    reset,
    loading,
    error,
    success,
    setAlert,
    customer,
    creditCards,
    recaptchaKey,
    initState
  )
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
                subtitle="Please enter your payment info below."
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
          <FormSubmit>
            <ButtonSubmit submitRef={submitRef} submitting={submitting}>
              {submitting ? 'Submitting...' : 'Purchase Gift Cards'}
            </ButtonSubmit>
          </FormSubmit>
        </FormFieldset>
      </form>
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
  recaptchaKey: propTypes.string,
}

export default GiftCardsForm
